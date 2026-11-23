use anyhow::Context;
use argon2::{
    password_hash::{PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Algorithm, Argon2, Params, Version,
};
use deadpool_tiberius::Pool;
use rand_core::OsRng;

use crate::auth::AuthSession;
use crate::models::user::{LoginRequest, RegistrationRequest, User};
use crate::services::user_service;

fn argon2id() -> anyhow::Result<Argon2<'static>> {
    let params = Params::new(19 * 1024, 2, 1, None)
        .map_err(|_| anyhow::anyhow!("Invalid password hashing configuration"))?;
    Ok(Argon2::new(Algorithm::Argon2id, Version::V0x13, params))
}

fn hash_password(password: &str) -> anyhow::Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    argon2id()?
        .hash_password(password.as_bytes(), &salt)
        .map(|hash| hash.to_string())
        .map_err(|_| anyhow::anyhow!("Unable to hash password"))
}

fn verify_password(password: &str, encoded: &str) -> bool {
    PasswordHash::new(encoded)
        .ok()
        .filter(|hash| hash.algorithm.as_str() == "argon2id")
        .is_some_and(|hash| {
            Argon2::default()
                .verify_password(password.as_bytes(), &hash)
                .is_ok()
        })
}

fn normalize_username(username: &str) -> anyhow::Result<String> {
    let username = username.trim().to_ascii_lowercase();
    anyhow::ensure!(
        (3..=64).contains(&username.len())
            && username
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || b"._-".contains(&c)),
        "Username must be 3–64 characters using letters, numbers, dots, underscores, or hyphens."
    );
    Ok(username)
}

pub async fn register(pool: &Pool, request: RegistrationRequest) -> anyhow::Result<User> {
    let username = normalize_username(&request.username)?;
    anyhow::ensure!(
        (12..=128).contains(&request.password.chars().count()),
        "Password must contain 12–128 characters."
    );
    let hash =
        tauri::async_runtime::spawn_blocking(move || hash_password(&request.password)).await??;
    user_service::register_user(pool, &username, &hash).await
}

pub async fn login(
    pool: &Pool,
    session: &AuthSession,
    request: LoginRequest,
) -> anyhow::Result<User> {
    let revision = session.begin_login()?;
    let result = async {
        let username = normalize_username(&request.username)
            .map_err(|_| anyhow::anyhow!("Invalid username or password."))?;
        anyhow::ensure!(
            (1..=128).contains(&request.password.chars().count()),
            "Invalid username or password."
        );
        let credentials = user_service::credentials_by_username(pool, &username).await?;
        let encoded = credentials.as_ref().map(|user| user.password_hash.clone());
        let verified = tauri::async_runtime::spawn_blocking(move || -> anyhow::Result<bool> {
            match encoded {
                Some(hash) => Ok(verify_password(&request.password, &hash)),
                None => {
                    hash_password(&request.password)?;
                    Ok(false)
                }
            }
        })
        .await??;
        let credentials = credentials
            .filter(|user| verified && user.is_active)
            .context("Invalid username or password.")?;
        user_service::get_active_user(pool, credentials.user_id)
            .await?
            .context("Invalid username or password.")
    }
    .await;
    session.finish_login(
        revision,
        result.as_ref().ok().map(|user: &User| user.user_id),
    )?;
    result
}

pub async fn current_user(pool: &Pool, session: &AuthSession) -> anyhow::Result<Option<User>> {
    let Some(id) = session.user_id()? else {
        return Ok(None);
    };
    let user = user_service::get_active_user(pool, id).await?;
    if user.is_none() {
        session.clear_user(id)?;
    }
    Ok(user)
}

pub async fn require_permission(
    pool: &Pool,
    session: &AuthSession,
    permission: &str,
) -> anyhow::Result<()> {
    let user = current_user(pool, session)
        .await?
        .context("Authentication required. Please log in.")?;
    anyhow::ensure!(
        user.permissions.iter().any(|code| code == permission),
        "Permission denied: {permission}"
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn passwords_are_salted_argon2id_and_verify_correctly() {
        let first = hash_password("A sufficiently long password").unwrap();
        let second = hash_password("A sufficiently long password").unwrap();
        assert!(first.starts_with("$argon2id$v=19$m=19456,t=2,p=1$"));
        assert_ne!(first, second);
        assert!(first.len() <= 255);
        assert!(verify_password("A sufficiently long password", &first));
        assert!(!verify_password("Incorrect password", &first));
        assert!(!verify_password("anything", "malformed hash"));
    }

    #[test]
    fn usernames_are_normalized_and_validated() {
        assert_eq!(normalize_username(" Staff.One ").unwrap(), "staff.one");
        for name in ["", "ab", "has spaces", "name@example.com", "staff'--"] {
            assert!(normalize_username(name).is_err());
        }
    }

    /// Explicitly opt in after setup-dev.ps1. Requires an empty Users table and
    /// removes only the temporary accounts it creates, including on failed checks.
    #[test]
    #[ignore = "requires freshly seeded local IRYS_Dev SQL Server database"]
    fn local_database_auth_roundtrip() {
        tauri::async_runtime::block_on(async {
            use rand_core::RngCore;
            let pool = crate::config::database::create_connection_pool().unwrap();
            let mut client = pool.get().await.unwrap();
            let count: i64 = client
                .query("SELECT COUNT_BIG(*) AS n FROM dbo.Users;", &[])
                .await
                .unwrap()
                .into_row()
                .await
                .unwrap()
                .unwrap()
                .get("n")
                .unwrap();
            assert_eq!(
                count, 0,
                "Run this test against a fresh development database before creating real users."
            );
            drop(client);

            let suffix = OsRng.next_u64();
            let admin_name = format!("auth_test_admin_{suffix:x}");
            let staff_name = format!("auth_test_staff_{suffix:x}");
            let password = format!("Temporary test password {}", OsRng.next_u64());
            let result: anyhow::Result<()> = async {
                let session = AuthSession::default();
                require_permission(&pool, &session, "items.view").await.err().context("Signed-out access must fail")?;
                let admin = register(&pool, RegistrationRequest {
                    username: admin_name.to_uppercase(), password: password.clone(),
                }).await?;
                anyhow::ensure!(admin.role_name == "Administrator" && admin.username == admin_name);
                anyhow::ensure!(session.user_id()?.is_none(), "Registration must not log in automatically");
                let staff = register(&pool, RegistrationRequest {
                    username: staff_name.clone(), password: password.clone(),
                }).await?;
                anyhow::ensure!(staff.role_name == "Staff");
                let duplicate = register(&pool, RegistrationRequest {
                    username: admin_name.to_uppercase(), password: password.clone(),
                }).await.err().context("Duplicate usernames must fail")?;
                anyhow::ensure!(duplicate.to_string().contains("already in use"));
                let stored = user_service::credentials_by_username(&pool, &admin_name).await?.context("Registered credentials missing")?;
                anyhow::ensure!(stored.password_hash.starts_with("$argon2id$") && stored.password_hash != password);

                let wrong = login(&pool, &session, LoginRequest {
                    username: admin_name.clone(), password: "Incorrect test password".into(),
                }).await.err().context("Wrong passwords must fail")?;
                anyhow::ensure!(wrong.to_string() == "Invalid username or password.");
                anyhow::ensure!(session.user_id()?.is_none());
                let missing = login(&pool, &session, LoginRequest {
                    username: format!("auth_missing_{suffix:x}"), password: password.clone(),
                }).await.err().context("Unknown users must fail")?;
                anyhow::ensure!(missing.to_string() == wrong.to_string());
                login(&pool, &session, LoginRequest { username: admin_name.clone(), password: password.clone() }).await?;
                require_permission(&pool, &session, "items.delete").await?;
                session.logout()?;
                anyhow::ensure!(current_user(&pool, &session).await?.is_none());
                require_permission(&pool, &session, "items.view").await.err().context("Logout must remove access")?;

                login(&pool, &session, LoginRequest { username: staff_name.clone(), password: password.clone() }).await?;
                require_permission(&pool, &session, "items.create").await?;
                require_permission(&pool, &session, "items.delete").await.err().context("Staff cannot delete")?;
                // Changes to roles and activation must affect the next command, without a new login.
                let mut client = pool.get().await?;
                client.execute("UPDATE dbo.Users SET RoleId = (SELECT Id FROM dbo.Roles WHERE RoleName = 'Viewer') WHERE UserId = @P1;", &[&staff.user_id]).await?;
                drop(client);
                require_permission(&pool, &session, "items.view").await?;
                require_permission(&pool, &session, "items.create").await.err().context("Viewers cannot create")?;
                let mut client = pool.get().await?;
                client.execute("UPDATE dbo.Users SET isActive = 0 WHERE UserId = @P1;", &[&staff.user_id]).await?;
                drop(client);
                anyhow::ensure!(current_user(&pool, &session).await?.is_none());
                anyhow::ensure!(session.user_id()?.is_none());
                let inactive = login(&pool, &session, LoginRequest { username: staff_name.clone(), password: password.clone() })
                    .await.err().context("Inactive users cannot log in")?;
                anyhow::ensure!(inactive.to_string() == "Invalid username or password.");
                Ok(())
            }.await;
            // Always attempt cleanup before reporting the result. No credentials are printed.
            let mut client = pool.get().await.unwrap();
            client
                .execute(
                    "DELETE FROM dbo.Users WHERE Username IN (@P1, @P2);",
                    &[&admin_name, &staff_name],
                )
                .await
                .expect("Failed to clean up temporary authentication accounts");
            result.unwrap();
        });
    }
}
