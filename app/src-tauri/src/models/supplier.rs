use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Supplier {
    pub id: i32,
    pub supplier_name: String,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    pub balance: f64,
    pub purchase_balance: f64,
    pub credit: f64,
    pub tin: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSupplier {
    pub supplier_name: String,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    #[serde(default)]
    pub balance: f64,
    #[serde(default)]
    pub purchase_balance: f64,
    #[serde(default)]
    pub credit: f64,
    pub tin: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateSupplier {
    pub supplier_name: String,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    pub balance: f64,
    pub purchase_balance: f64,
    pub credit: f64,
    pub tin: Option<String>,
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};

    fn supplier_payload() -> Value {
        json!({
            "supplierName": "Test Hardware Wholesale",
            "contactName": "Jane Doe",
            "contactTitle": "Sales Manager",
            "address": "123 Test Street",
            "city": "Marikina",
            "province": "Metro Manila",
            "zipCode": "1800",
            "phone": "09200000001",
            "fax": null,
            "balance": 1200.25,
            "purchaseBalance": 500.50,
            "credit": 100.75,
            "tin": "000-100-001-000"
        })
    }

    #[test]
    fn new_supplier_uses_zero_financial_and_nullable_defaults() {
        let supplier: NewSupplier = serde_json::from_value(json!({
            "supplierName": "Test Supplier"
        }))
        .unwrap();

        assert_eq!(supplier.supplier_name, "Test Supplier");
        assert_eq!(supplier.balance, 0.0);
        assert_eq!(supplier.purchase_balance, 0.0);
        assert_eq!(supplier.credit, 0.0);
        assert_eq!(supplier.contact_name, None);
        assert_eq!(supplier.zip_code, None);
        assert_eq!(supplier.tin, None);
    }

    #[test]
    fn supplier_payloads_accept_camel_case_fields_and_supplied_balances() {
        let new: NewSupplier = serde_json::from_value(supplier_payload()).unwrap();
        let update: UpdateSupplier = serde_json::from_value(supplier_payload()).unwrap();

        assert_eq!(new.supplier_name, "Test Hardware Wholesale");
        assert_eq!(new.contact_name.as_deref(), Some("Jane Doe"));
        assert_eq!(new.contact_title.as_deref(), Some("Sales Manager"));
        assert_eq!(new.zip_code.as_deref(), Some("1800"));
        assert_eq!(new.balance, 1200.25);
        assert_eq!(new.purchase_balance, 500.50);
        assert_eq!(new.credit, 100.75);
        assert_eq!(new.tin.as_deref(), Some("000-100-001-000"));
        assert_eq!(update.supplier_name, new.supplier_name);
        assert_eq!(update.contact_name, new.contact_name);
        assert_eq!(update.purchase_balance, new.purchase_balance);
        assert_eq!(update.zip_code, new.zip_code);
    }

    #[test]
    fn nullable_supplier_fields_accept_explicit_null() {
        let mut payload = supplier_payload();
        for field in [
            "contactName",
            "contactTitle",
            "address",
            "city",
            "province",
            "zipCode",
            "phone",
            "fax",
            "tin",
        ] {
            payload[field] = Value::Null;
        }
        let new: NewSupplier = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateSupplier = serde_json::from_value(payload).unwrap();

        assert_eq!(new.contact_name, None);
        assert_eq!(new.address, None);
        assert_eq!(new.zip_code, None);
        assert_eq!(new.fax, None);
        assert_eq!(new.tin, None);
        assert_eq!(update.contact_name, None);
        assert_eq!(update.address, None);
        assert_eq!(update.zip_code, None);
        assert_eq!(update.fax, None);
        assert_eq!(update.tin, None);
    }

    #[test]
    fn supplier_payloads_reject_missing_names_required_nulls_and_wrong_types() {
        let mut missing_name = supplier_payload();
        missing_name.as_object_mut().unwrap().remove("supplierName");
        assert!(serde_json::from_value::<NewSupplier>(missing_name.clone()).is_err());
        assert!(serde_json::from_value::<UpdateSupplier>(missing_name).is_err());

        for (field, value) in [
            ("supplierName", Value::Null),
            ("supplierName", json!(42)),
            ("balance", Value::Null),
            ("purchaseBalance", Value::Null),
            ("credit", Value::Null),
            ("purchaseBalance", json!("500.50")),
            ("zipCode", json!(1800)),
        ] {
            let mut payload = supplier_payload();
            payload[field] = value;
            assert!(serde_json::from_value::<NewSupplier>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateSupplier>(payload).is_err());
        }
    }

    #[test]
    fn update_supplier_requires_financial_values_instead_of_resetting_them() {
        for field in ["balance", "purchaseBalance", "credit"] {
            let mut payload = supplier_payload();
            payload.as_object_mut().unwrap().remove(field);
            assert!(serde_json::from_value::<UpdateSupplier>(payload).is_err());
        }
    }

    #[test]
    fn supplier_serializes_all_fields_as_camel_case_and_preserves_nulls() {
        let mut expected = supplier_payload();
        let update: UpdateSupplier = serde_json::from_value(expected.clone()).unwrap();
        let supplier = Supplier {
            id: 42,
            supplier_name: update.supplier_name,
            contact_name: update.contact_name,
            contact_title: update.contact_title,
            address: update.address,
            city: update.city,
            province: update.province,
            zip_code: update.zip_code,
            phone: update.phone,
            fax: update.fax,
            balance: update.balance,
            purchase_balance: update.purchase_balance,
            credit: update.credit,
            tin: update.tin,
        };

        expected["id"] = json!(42);
        assert_eq!(serde_json::to_value(supplier).unwrap(), expected);
    }
}
