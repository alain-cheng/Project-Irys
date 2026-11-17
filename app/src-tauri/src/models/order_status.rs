use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OrderStatus {
    pub id: i32,
    pub status_name: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewOrderStatus {
    pub status_name: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateOrderStatus {
    pub status_name: String,
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn creation_and_update_accept_camel_case_status_names() {
        let new: NewOrderStatus = serde_json::from_value(json!({ "statusName": "OPEN" })).unwrap();
        let update: UpdateOrderStatus =
            serde_json::from_value(json!({ "statusName": "CLOSED" })).unwrap();

        assert_eq!(new.status_name, "OPEN");
        assert_eq!(update.status_name, "CLOSED");
    }

    #[test]
    fn payloads_require_a_string_status_name() {
        for payload in [
            json!({}),
            json!({ "statusName": null }),
            json!({ "statusName": 2 }),
            json!({ "status_name": "OPEN" }),
        ] {
            assert!(serde_json::from_value::<NewOrderStatus>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateOrderStatus>(payload).is_err());
        }
    }

    #[test]
    fn serialization_preserves_the_seeded_zero_id_and_camel_case_name() {
        let status = OrderStatus {
            id: 0,
            status_name: "UNSPECIFIED".to_owned(),
        };

        assert_eq!(
            serde_json::to_value(status).unwrap(),
            json!({ "id": 0, "statusName": "UNSPECIFIED" })
        );
    }
}
