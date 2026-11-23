use anyhow::Context;
use deadpool_tiberius::Pool;

use crate::models::user::User;

pub(crate) struct Credentials {
    pub user_id: i32,
    pub password_hash: String,
    pub is_active: bool,
}

pub(crate) async fn credentials_by_username(
    pool: &Pool,
    username: &str,
) -> anyhow::Result<Option<Credentials>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let row = client
        .query(
            "SELECT UserId, PasswordHash, isActive FROM dbo.Users WHERE LOWER(Username) = @P1;",
            &[&username],
        )
        .await?
        .into_row()
        .await?;
    row.map(|row| {
        Ok(Credentials {
            user_id: row.try_get("UserId")?.context("Missing UserId")?,
            password_hash: row
                .try_get::<&str, _>("PasswordHash")?
                .context("Missing password hash")?
                .to_owned(),
            is_active: row
                .try_get("isActive")?
                .context("Missing activation state")?,
        })
    })
    .transpose()
}

/// Re-read active state and permissions so changes apply to existing sessions.
pub async fn get_active_user(pool: &Pool, id: i32) -> anyhow::Result<Option<User>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    let row = client
        .query(
            r#"SELECT u.UserId, u.EmployeeId, u.Username, u.RoleId, r.RoleName
           FROM dbo.Users AS u INNER JOIN dbo.Roles AS r ON r.Id = u.RoleId
           WHERE u.UserId = @P1 AND u.isActive = 1;"#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;
    let Some(row) = row else {
        return Ok(None);
    };
    let role_id: i32 = row.try_get("RoleId")?.context("Missing RoleId")?;
    let permissions = client
        .query(
            r#"SELECT DISTINCT p.PermissionCode FROM dbo.RolePermissions AS rp
           INNER JOIN dbo.Permissions AS p ON p.Id = rp.PermissionId
           WHERE rp.RoleId = @P1 ORDER BY p.PermissionCode;"#,
            &[&role_id],
        )
        .await?
        .into_first_result()
        .await?
        .into_iter()
        .map(|row| {
            Ok(row
                .try_get::<&str, _>("PermissionCode")?
                .context("Missing permission code")?
                .to_owned())
        })
        .collect::<anyhow::Result<Vec<_>>>()?;
    Ok(Some(User {
        user_id: row.try_get("UserId")?.context("Missing UserId")?,
        employee_id: row.try_get("EmployeeId")?,
        username: row
            .try_get::<&str, _>("Username")?
            .context("Missing username")?
            .to_owned(),
        role_id,
        role_name: row
            .try_get::<&str, _>("RoleName")?
            .context("Missing role name")?
            .to_owned(),
        permissions,
    }))
}

/// Temporary registration. The first user is Administrator; later users are Staff.
/// An exclusive transaction lock makes first-user assignment safe across app instances.
pub(crate) async fn register_user(
    pool: &Pool,
    username: &str,
    password_hash: &str,
) -> anyhow::Result<User> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;
    // Keep BEGIN/COMMIT in one parameterized SQL batch: SQL Server RPC calls
    // must finish with the same transaction count with which they started.
    let row = client.query(
        r#"SET XACT_ABORT ON;
        BEGIN TRY
            BEGIN TRANSACTION;
            DECLARE @UserCount bigint = (SELECT COUNT_BIG(*) FROM dbo.Users WITH (TABLOCKX, HOLDLOCK));
            IF EXISTS (SELECT 1 FROM dbo.Users WHERE LOWER(Username) = @P1)
                THROW 50001, 'Username is already in use.', 1;
            DECLARE @RoleName varchar(50) = CASE WHEN @UserCount = 0 THEN 'Administrator' ELSE 'Staff' END;
            DECLARE @RoleId int = (SELECT Id FROM dbo.Roles WHERE RoleName = @RoleName);
            IF @RoleId IS NULL
                THROW 50002, 'Roles are not initialized. Run the development database setup.', 1;
            DECLARE @Created TABLE (UserId int);
            INSERT INTO dbo.Users (Username, PasswordHash, RoleId, isActive)
                OUTPUT INSERTED.UserId INTO @Created
                VALUES (@P1, @P2, @RoleId, 1);
            COMMIT TRANSACTION;
            SELECT UserId FROM @Created;
        END TRY
        BEGIN CATCH
            IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
            THROW;
        END CATCH;"#,
        &[&username, &password_hash],
    ).await?.into_row().await?.context("Registered user ID was not returned")?;
    let id: i32 = row.try_get("UserId")?.context("Missing UserId")?;
    drop(client);
    get_active_user(pool, id)
        .await?
        .context("Registered user is unavailable")
}
