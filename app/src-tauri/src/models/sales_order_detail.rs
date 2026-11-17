use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SalesOrderDetail {
    pub id: i32,
    pub sales_order_id: Option<i32>,
    pub quantity: i32,
    pub item_code: Option<i32>,
    pub unit_price: f64,
    pub amount: Option<f64>,
    pub invoiced: Option<i32>,
    pub is_closed: bool,
    pub s_disc1: Option<i32>,
    pub s_disc2: Option<i32>,
    pub s_disc3: Option<i32>,
    pub s_disc4: Option<i32>,
    pub s_disc5: Option<i32>,
    pub s_disc6: Option<i32>,
    pub s_disc7: Option<i32>,
    pub s_disc8: Option<i32>,
    pub s_disc9: Option<i32>,
    pub s_disc10: Option<i32>,
    pub s_disc_id: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSalesOrderDetail {
    pub sales_order_id: Option<i32>,
    pub quantity: i32,
    pub item_code: Option<i32>,
    pub unit_price: f64,
    pub amount: Option<f64>,
    #[serde(default = "default_optional_zero")]
    pub invoiced: Option<i32>,
    #[serde(default)]
    pub is_closed: bool,
    #[serde(default = "default_optional_zero")]
    pub s_disc1: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc2: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc3: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc4: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc5: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc6: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc7: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc8: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc9: Option<i32>,
    #[serde(default = "default_optional_zero")]
    pub s_disc10: Option<i32>,
    #[serde(default = "default_discount_id")]
    pub s_disc_id: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateSalesOrderDetail {
    pub sales_order_id: Option<i32>,
    pub quantity: i32,
    pub item_code: Option<i32>,
    pub unit_price: f64,
    pub amount: Option<f64>,
    pub invoiced: Option<i32>,
    pub is_closed: bool,
    pub s_disc1: Option<i32>,
    pub s_disc2: Option<i32>,
    pub s_disc3: Option<i32>,
    pub s_disc4: Option<i32>,
    pub s_disc5: Option<i32>,
    pub s_disc6: Option<i32>,
    pub s_disc7: Option<i32>,
    pub s_disc8: Option<i32>,
    pub s_disc9: Option<i32>,
    pub s_disc10: Option<i32>,
    pub s_disc_id: String,
}

fn default_optional_zero() -> Option<i32> {
    Some(0)
}

fn default_discount_id() -> String {
    "Net".to_owned()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};

    fn full_payload() -> Value {
        json!({
            "salesOrderId": 2,
            "quantity": 3,
            "itemCode": 4,
            "unitPrice": 5.25,
            "amount": 6.25,
            "invoiced": 7,
            "isClosed": true,
            "sDisc1": 9,
            "sDisc2": 10,
            "sDisc3": 11,
            "sDisc4": 12,
            "sDisc5": 13,
            "sDisc6": 14,
            "sDisc7": 15,
            "sDisc8": 16,
            "sDisc9": 17,
            "sDisc10": 18,
            "sDiscId": "Net"
        })
    }

    #[test]
    fn creation_uses_existing_defaults() {
        let record: NewSalesOrderDetail =
            serde_json::from_value(json!({ "quantity": 3, "unitPrice": 5.25 })).unwrap();
        assert_eq!(record.invoiced, Some(0));
        assert!(!record.is_closed);
        assert_eq!(record.s_disc1, Some(0));
        assert_eq!(record.s_disc2, Some(0));
        assert_eq!(record.s_disc3, Some(0));
        assert_eq!(record.s_disc4, Some(0));
        assert_eq!(record.s_disc5, Some(0));
        assert_eq!(record.s_disc6, Some(0));
        assert_eq!(record.s_disc7, Some(0));
        assert_eq!(record.s_disc8, Some(0));
        assert_eq!(record.s_disc9, Some(0));
        assert_eq!(record.s_disc10, Some(0));
        assert_eq!(record.s_disc_id, "Net");
    }

    #[test]
    fn nullable_fields_accept_null_in_creation_and_update() {
        let mut payload = full_payload();
        for field in [
            "salesOrderId",
            "itemCode",
            "amount",
            "invoiced",
            "sDisc1",
            "sDisc2",
            "sDisc3",
            "sDisc4",
            "sDisc5",
            "sDisc6",
            "sDisc7",
            "sDisc8",
            "sDisc9",
            "sDisc10",
        ] {
            payload[field] = Value::Null;
        }
        let new: NewSalesOrderDetail = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateSalesOrderDetail = serde_json::from_value(payload).unwrap();
        assert_eq!(new.sales_order_id, None);
        assert_eq!(update.sales_order_id, None);
        assert_eq!(new.item_code, None);
        assert_eq!(update.item_code, None);
        assert_eq!(new.amount, None);
        assert_eq!(update.amount, None);
        assert_eq!(new.invoiced, None);
        assert_eq!(update.invoiced, None);
        assert_eq!(new.s_disc1, None);
        assert_eq!(update.s_disc1, None);
        assert_eq!(new.s_disc2, None);
        assert_eq!(update.s_disc2, None);
        assert_eq!(new.s_disc3, None);
        assert_eq!(update.s_disc3, None);
        assert_eq!(new.s_disc4, None);
        assert_eq!(update.s_disc4, None);
        assert_eq!(new.s_disc5, None);
        assert_eq!(update.s_disc5, None);
        assert_eq!(new.s_disc6, None);
        assert_eq!(update.s_disc6, None);
        assert_eq!(new.s_disc7, None);
        assert_eq!(update.s_disc7, None);
        assert_eq!(new.s_disc8, None);
        assert_eq!(update.s_disc8, None);
        assert_eq!(new.s_disc9, None);
        assert_eq!(update.s_disc9, None);
        assert_eq!(new.s_disc10, None);
        assert_eq!(update.s_disc10, None);
    }

    #[test]
    fn update_requires_every_non_nullable_field() {
        for field in ["quantity", "unitPrice", "isClosed", "sDiscId"] {
            let mut payload = full_payload();
            payload.as_object_mut().unwrap().remove(field);
            assert!(
                serde_json::from_value::<UpdateSalesOrderDetail>(payload).is_err(),
                "Missing {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_null_for_non_nullable_fields() {
        for field in ["quantity", "unitPrice", "isClosed", "sDiscId"] {
            let mut payload = full_payload();
            payload[field] = Value::Null;
            assert!(
                serde_json::from_value::<NewSalesOrderDetail>(payload.clone()).is_err(),
                "Null {field}"
            );
            assert!(
                serde_json::from_value::<UpdateSalesOrderDetail>(payload).is_err(),
                "Null {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_invalid_types() {
        for (field, invalid_value) in [
            ("salesOrderId", json!("1")),
            ("unitPrice", json!("10.50")),
            ("isClosed", json!(1)),
        ] {
            let mut payload = full_payload();
            payload[field] = invalid_value;
            assert!(serde_json::from_value::<NewSalesOrderDetail>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateSalesOrderDetail>(payload).is_err());
        }
    }

    #[test]
    fn contract_preserves_camel_case_fields_and_values() {
        let mut payload = full_payload();
        let new: NewSalesOrderDetail = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateSalesOrderDetail = serde_json::from_value(payload.clone()).unwrap();
        assert_eq!(new.sales_order_id, update.sales_order_id);
        assert_eq!(new.quantity, update.quantity);
        assert_eq!(new.item_code, update.item_code);
        assert_eq!(new.unit_price, update.unit_price);
        assert_eq!(new.amount, update.amount);
        assert_eq!(new.invoiced, update.invoiced);
        assert_eq!(new.is_closed, update.is_closed);
        assert_eq!(new.s_disc1, update.s_disc1);
        assert_eq!(new.s_disc2, update.s_disc2);
        assert_eq!(new.s_disc3, update.s_disc3);
        assert_eq!(new.s_disc4, update.s_disc4);
        assert_eq!(new.s_disc5, update.s_disc5);
        assert_eq!(new.s_disc6, update.s_disc6);
        assert_eq!(new.s_disc7, update.s_disc7);
        assert_eq!(new.s_disc8, update.s_disc8);
        assert_eq!(new.s_disc9, update.s_disc9);
        assert_eq!(new.s_disc10, update.s_disc10);
        assert_eq!(new.s_disc_id, update.s_disc_id);
        let record = SalesOrderDetail {
            id: 42,
            sales_order_id: update.sales_order_id,
            quantity: update.quantity,
            item_code: update.item_code,
            unit_price: update.unit_price,
            amount: update.amount,
            invoiced: update.invoiced,
            is_closed: update.is_closed,
            s_disc1: update.s_disc1,
            s_disc2: update.s_disc2,
            s_disc3: update.s_disc3,
            s_disc4: update.s_disc4,
            s_disc5: update.s_disc5,
            s_disc6: update.s_disc6,
            s_disc7: update.s_disc7,
            s_disc8: update.s_disc8,
            s_disc9: update.s_disc9,
            s_disc10: update.s_disc10,
            s_disc_id: update.s_disc_id,
        };
        payload["id"] = json!(42);
        assert_eq!(serde_json::to_value(record).unwrap(), payload);
    }
}
