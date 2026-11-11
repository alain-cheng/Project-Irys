use serde::{Deserialize, Serialize};
use chrono::NaiveDate;

// - '//' marks optional fields, but not encouraged in frontend

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Customer {
    pub id: i32,
    pub company_name: Option<String>,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    pub alarm: bool,
    pub employee_id: Option<i32>, //
    pub price_lvl: i32,
    pub credit_limit: f64,
    pub balance: f64,
    pub credit: f64,
    pub inv_balance: f64,
    pub tin: Option<String>,
    pub area_code: Option<i32>, //
    pub customer_code: Option<String>,
    pub customer_area: Option<String>,
    pub customer_agent: Option<String>,
    pub agent_name: Option<String>,
    pub customer_type: Option<String>,
    pub start_date: NaiveDate,
    pub sm_code: Option<String>,
    pub term: Option<String>,
    pub term_code: Option<String>,
    pub p_type: Option<String>,
    pub remarks: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewCustomer {
    pub company_name: Option<String>,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    pub employee_id: Option<i32>,
    #[serde(default)]
    pub credit_limit: f64,
    pub tin: Option<String>,
    pub area_code: Option<i32>,
    pub customer_code: Option<String>,
    pub customer_area: Option<String>,
    pub customer_agent: Option<String>,
    pub agent_name: Option<String>,
    pub customer_type: Option<String>,
    pub sm_code: Option<String>,
    pub term: Option<String>,
    pub term_code: Option<String>,
    pub p_type: Option<String>,
    pub remarks: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateCustomer {
    pub company_name: Option<String>,
    pub contact_name: Option<String>,
    pub contact_title: Option<String>,
    pub address: Option<String>,
    pub city: Option<String>,
    pub province: Option<String>,
    pub zip_code: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
    #[serde(default)]
    pub alarm: bool,
    pub employee_id: Option<i32>, 
    #[serde(default = "default_price_lvl")]
    pub price_lvl: i32,
    #[serde(default)]
    pub credit_limit: f64,
    #[serde(default)]
    pub balance: f64,
    #[serde(default)]
    pub credit: f64,
    #[serde(default)]
    pub inv_balance: f64,
    pub tin: Option<String>,
    pub area_code: Option<i32>,
    pub customer_code: Option<String>,
    pub customer_area: Option<String>,
    pub customer_agent: Option<String>,
    pub agent_name: Option<String>,
    pub customer_type: Option<String>,
    pub start_date: Option<NaiveDate>,
    pub sm_code: Option<String>,
    pub term: Option<String>,
    pub term_code: Option<String>,
    pub p_type: Option<String>,
    pub remarks: Option<String>,
}

fn default_price_lvl() -> i32 {
    1
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};

    fn customer_payload() -> Value {
        json!({
            "companyName": "Test Hardware",
            "contactName": "Jane Doe",
            "contactTitle": "Manager",
            "address": "123 Test Street",
            "city": "Marikina",
            "province": "Metro Manila",
            "zipCode": "1800",
            "phone": "09123456789",
            "fax": null,
            "alarm": true,
            "employeeId": 3,
            "priceLvl": 2,
            "creditLimit": 5000.50,
            "balance": 1200.25,
            "credit": 100.75,
            "invBalance": 250.50,
            "tin": "000-100-001-000",
            "areaCode": 1,
            "customerCode": "CUS0042",
            "customerArea": "Metro",
            "customerAgent": "REP03",
            "agentName": "Test Agent",
            "customerType": "WHOLESALE",
            "startDate": "2026-01-15",
            "smCode": "TA",
            "term": "D",
            "termCode": "30",
            "pType": "C",
            "remarks": "Model test customer."
        })
    }

    #[test]
    fn new_customer_uses_zero_credit_limit_and_nullable_defaults() {
        let customer: NewCustomer = serde_json::from_value(json!({})).unwrap();

        assert_eq!(customer.credit_limit, 0.0);
        assert_eq!(customer.company_name, None);
        assert_eq!(customer.contact_name, None);
        assert_eq!(customer.employee_id, None);
        assert_eq!(customer.area_code, None);
        assert_eq!(customer.remarks, None);
    }

    #[test]
    fn new_customer_accepts_camel_case_fields() {
        let customer: NewCustomer = serde_json::from_value(customer_payload()).unwrap();

        assert_eq!(customer.company_name.as_deref(), Some("Test Hardware"));
        assert_eq!(customer.contact_name.as_deref(), Some("Jane Doe"));
        assert_eq!(customer.zip_code.as_deref(), Some("1800"));
        assert_eq!(customer.employee_id, Some(3));
        assert_eq!(customer.credit_limit, 5000.50);
        assert_eq!(customer.area_code, Some(1));
        assert_eq!(customer.customer_code.as_deref(), Some("CUS0042"));
        assert_eq!(customer.customer_type.as_deref(), Some("WHOLESALE"));
        assert_eq!(customer.sm_code.as_deref(), Some("TA"));
        assert_eq!(customer.term_code.as_deref(), Some("30"));
        assert_eq!(customer.p_type.as_deref(), Some("C"));
    }

    #[test]
    fn update_customer_uses_existing_financial_and_price_level_defaults() {
        let customer: UpdateCustomer = serde_json::from_value(json!({})).unwrap();

        assert!(!customer.alarm);
        assert_eq!(customer.price_lvl, 1);
        assert_eq!(customer.credit_limit, 0.0);
        assert_eq!(customer.balance, 0.0);
        assert_eq!(customer.credit, 0.0);
        assert_eq!(customer.inv_balance, 0.0);
        assert_eq!(customer.employee_id, None);
        assert_eq!(customer.area_code, None);
        assert_eq!(customer.start_date, None);
    }

    #[test]
    fn update_customer_preserves_supplied_values_and_parses_start_date() {
        let customer: UpdateCustomer = serde_json::from_value(customer_payload()).unwrap();

        assert!(customer.alarm);
        assert_eq!(customer.price_lvl, 2);
        assert_eq!(customer.credit_limit, 5000.50);
        assert_eq!(customer.balance, 1200.25);
        assert_eq!(customer.credit, 100.75);
        assert_eq!(customer.inv_balance, 250.50);
        assert_eq!(customer.employee_id, Some(3));
        assert_eq!(customer.area_code, Some(1));
        assert_eq!(customer.start_date, NaiveDate::from_ymd_opt(2026, 1, 15));
    }

    #[test]
    fn nullable_customer_fields_accept_explicit_null() {
        let payload = json!({
            "companyName": null,
            "employeeId": null,
            "areaCode": null,
            "remarks": null,
            "startDate": null
        });
        let new_customer: NewCustomer = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateCustomer = serde_json::from_value(payload).unwrap();

        assert_eq!(new_customer.company_name, None);
        assert_eq!(new_customer.employee_id, None);
        assert_eq!(new_customer.area_code, None);
        assert_eq!(new_customer.remarks, None);
        assert_eq!(update.company_name, None);
        assert_eq!(update.employee_id, None);
        assert_eq!(update.area_code, None);
        assert_eq!(update.remarks, None);
        assert_eq!(update.start_date, None);
    }

    #[test]
    fn customer_payloads_reject_invalid_scalar_types_and_required_nulls() {
        for payload in [
            json!({ "creditLimit": null }),
            json!({ "creditLimit": "5000" }),
            json!({ "employeeId": "3" }),
            json!({ "areaCode": 1.5 }),
        ] {
            assert!(serde_json::from_value::<NewCustomer>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateCustomer>(payload).is_err());
        }

        for field in ["alarm", "priceLvl", "balance", "credit", "invBalance"] {
            let mut payload = json!({});
            payload[field] = Value::Null;
            assert!(serde_json::from_value::<UpdateCustomer>(payload).is_err());
        }
    }

    #[test]
    fn update_customer_rejects_invalid_start_dates() {
        for start_date in ["2026-02-30", "not-a-date", ""] {
            assert!(serde_json::from_value::<UpdateCustomer>(json!({
                "startDate": start_date
            }))
            .is_err());
        }
    }

    #[test]
    fn customer_serializes_camel_case_fields_nulls_and_iso_date() {
        let mut expected = customer_payload();
        let update: UpdateCustomer = serde_json::from_value(expected.clone()).unwrap();
        let customer = Customer {
            id: 42,
            company_name: update.company_name,
            contact_name: update.contact_name,
            contact_title: update.contact_title,
            address: update.address,
            city: update.city,
            province: update.province,
            zip_code: update.zip_code,
            phone: update.phone,
            fax: update.fax,
            alarm: update.alarm,
            employee_id: update.employee_id,
            price_lvl: update.price_lvl,
            credit_limit: update.credit_limit,
            balance: update.balance,
            credit: update.credit,
            inv_balance: update.inv_balance,
            tin: update.tin,
            area_code: update.area_code,
            customer_code: update.customer_code,
            customer_area: update.customer_area,
            customer_agent: update.customer_agent,
            agent_name: update.agent_name,
            customer_type: update.customer_type,
            start_date: update.start_date.unwrap(),
            sm_code: update.sm_code,
            term: update.term,
            term_code: update.term_code,
            p_type: update.p_type,
            remarks: update.remarks,
        };

        expected["id"] = json!(42);
        assert_eq!(serde_json::to_value(customer).unwrap(), expected);
    }
}
