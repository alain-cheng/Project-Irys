use serde::{Deserialize, Serialize};

/// Public profile. Password hashes never cross the IPC boundary.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub user_id: i32,
    pub employee_id: Option<i32>,
    pub username: String,
    pub role_id: i32,
    pub role_name: String,
    pub permissions: Vec<String>,
}

// No Debug implementation: credentials must not accidentally appear in logs.
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

/// Role, activation, and employee association are controlled by the backend.
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct RegistrationRequest {
    pub username: String,
    pub password: String,
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn registration_cannot_choose_authority() {
        for field in ["roleId", "isActive", "employeeId"] {
            let mut payload = json!({"username": "staff", "password": "a long test password"});
            payload[field] = json!(1);
            assert!(serde_json::from_value::<RegistrationRequest>(payload).is_err());
        }
    }

    #[test]
    fn public_user_has_no_password_fields() {
        let value = serde_json::to_value(User {
            user_id: 1,
            employee_id: None,
            username: "staff".into(),
            role_id: 2,
            role_name: "Staff".into(),
            permissions: vec!["items.view".into()],
        })
        .unwrap();
        assert_eq!(value["userId"], 1);
        assert!(value.get("password").is_none());
        assert!(value.get("passwordHash").is_none());
    }
}
