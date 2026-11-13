use chrono::{Local, NaiveDate};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SalesOrder {
    pub id: i32,
    pub customer_id: Option<i32>,
    pub order_date: NaiveDate,
    pub remarks: Option<String>,
    pub order_status_id: i32,
    pub total: f64,
    pub salesman: Option<i32>,
    pub po_number: Option<String>,
    pub term_code: Option<i32>,
    pub shipper_id: Option<i32>,
    pub user: Option<i32>,
    pub employee_id: Option<i32>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSalesOrder {
    pub customer_id: Option<i32>,
    #[serde(default = "default_today")]
    pub order_date: NaiveDate,
    pub remarks: Option<String>,
    #[serde(default)]
    pub order_status_id: i32,
    #[serde(default)]
    pub total: f64,
    pub salesman: Option<i32>,
    pub po_number: Option<String>,
    pub term_code: Option<i32>,
    pub shipper_id: Option<i32>,
    pub user: Option<i32>,
    pub employee_id: Option<i32>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateSalesOrder {
    pub customer_id: Option<i32>,
    pub order_date: NaiveDate,
    pub remarks: Option<String>,
    pub order_status_id: i32,
    pub total: f64,
    pub salesman: Option<i32>,
    pub po_number: Option<String>,
    pub term_code: Option<i32>,
    pub shipper_id: Option<i32>,
    pub user: Option<i32>,
    pub employee_id: Option<i32>,
    pub notes: Option<String>,
}

fn default_today() -> NaiveDate {
    Local::now().date_naive()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};

    fn full_payload() -> Value {
        json!({
            "customerId": 2,
            "orderDate": "2026-11-13",
            "remarks": "Test",
            "orderStatusId": 5,
            "total": 6.25,
            "salesman": 7,
            "poNumber": "Test",
            "termCode": 9,
            "shipperId": 10,
            "user": 11,
            "employeeId": 12,
            "notes": "Test"
        })
    }

    #[test]
    fn creation_uses_existing_defaults() {
        let before = Local::now().date_naive();
        let record: NewSalesOrder = serde_json::from_value(json!({})).unwrap();
        let after = Local::now().date_naive();
        assert!(record.order_date >= before && record.order_date <= after);
        assert_eq!(record.order_status_id, 0);
        assert_eq!(record.total, 0.0);
        assert_eq!(record.term_code, None);
    }

    #[test]
    fn nullable_fields_accept_null_in_creation_and_update() {
        let mut payload = full_payload();
        for field in [
            "customerId",
            "remarks",
            "salesman",
            "poNumber",
            "termCode",
            "shipperId",
            "user",
            "employeeId",
            "notes",
        ] {
            payload[field] = Value::Null;
        }
        let new: NewSalesOrder = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateSalesOrder = serde_json::from_value(payload).unwrap();
        assert_eq!(new.customer_id, None);
        assert_eq!(update.customer_id, None);
        assert_eq!(new.remarks, None);
        assert_eq!(update.remarks, None);
        assert_eq!(new.salesman, None);
        assert_eq!(update.salesman, None);
        assert_eq!(new.po_number, None);
        assert_eq!(update.po_number, None);
        assert_eq!(new.term_code, None);
        assert_eq!(update.term_code, None);
        assert_eq!(new.shipper_id, None);
        assert_eq!(update.shipper_id, None);
        assert_eq!(new.user, None);
        assert_eq!(update.user, None);
        assert_eq!(new.employee_id, None);
        assert_eq!(update.employee_id, None);
        assert_eq!(new.notes, None);
        assert_eq!(update.notes, None);
    }

    #[test]
    fn update_requires_every_non_nullable_field() {
        for field in ["orderDate", "orderStatusId", "total"] {
            let mut payload = full_payload();
            payload.as_object_mut().unwrap().remove(field);
            assert!(
                serde_json::from_value::<UpdateSalesOrder>(payload).is_err(),
                "Missing {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_null_for_non_nullable_fields() {
        for field in ["orderDate", "orderStatusId", "total"] {
            let mut payload = full_payload();
            payload[field] = Value::Null;
            assert!(
                serde_json::from_value::<NewSalesOrder>(payload.clone()).is_err(),
                "Null {field}"
            );
            assert!(
                serde_json::from_value::<UpdateSalesOrder>(payload).is_err(),
                "Null {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_invalid_types_and_dates() {
        for (field, invalid_value) in [
            ("customerId", json!("1")),
            ("total", json!("10.50")),
            ("orderDate", json!("2026-02-30")),
        ] {
            let mut payload = full_payload();
            payload[field] = invalid_value;
            assert!(serde_json::from_value::<NewSalesOrder>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateSalesOrder>(payload).is_err());
        }
    }

    #[test]
    fn contract_preserves_camel_case_fields_and_values() {
        let mut payload = full_payload();
        let new: NewSalesOrder = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateSalesOrder = serde_json::from_value(payload.clone()).unwrap();
        assert_eq!(new.customer_id, update.customer_id);
        assert_eq!(new.order_date, update.order_date);
        assert_eq!(new.remarks, update.remarks);
        assert_eq!(new.order_status_id, update.order_status_id);
        assert_eq!(new.total, update.total);
        assert_eq!(new.salesman, update.salesman);
        assert_eq!(new.po_number, update.po_number);
        assert_eq!(new.term_code, update.term_code);
        assert_eq!(new.shipper_id, update.shipper_id);
        assert_eq!(new.user, update.user);
        assert_eq!(new.employee_id, update.employee_id);
        assert_eq!(new.notes, update.notes);
        let record = SalesOrder {
            id: 42,
            customer_id: update.customer_id,
            order_date: update.order_date,
            remarks: update.remarks,
            order_status_id: update.order_status_id,
            total: update.total,
            salesman: update.salesman,
            po_number: update.po_number,
            term_code: update.term_code,
            shipper_id: update.shipper_id,
            user: update.user,
            employee_id: update.employee_id,
            notes: update.notes,
        };
        payload["id"] = json!(42);
        assert_eq!(serde_json::to_value(record).unwrap(), payload);
    }
}
