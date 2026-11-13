use chrono::{Local, NaiveDate};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Order {
    pub id: i32,
    pub customer_id: Option<i32>,
    pub invoice_number: Option<String>,
    pub employee_id: Option<i32>,
    pub order_date: NaiveDate,
    pub delivery_date: NaiveDate,
    pub is_paid: bool,
    pub due_date: NaiveDate,
    pub term_code: Option<i32>,
    pub total: f64,
    pub delivered_by: Option<i32>,
    pub packed_by: Option<i32>,
    pub order_status_id: i32,
    pub balance: f64,
    pub salesman: Option<i32>,
    pub user: Option<i32>,
    pub returns: f64,
    pub amount_paid: f64,
    pub bir: bool,
    pub shipper_id: Option<i32>,
    pub adjust: f64,
    pub order_profit: f64,
    pub order_free: f64,
    pub sales_order_id: Option<i32>,
    pub credits_applied: f64,
    pub consign: bool,
    pub dr_number: Option<String>,
    pub commission: f64,
    pub si_number: Option<String>,
    pub si_date: NaiveDate,
    pub si_customer: Option<String>,
    pub si_terms: Option<String>,
    pub si_balance: f64,
    pub si_net_amount: f64,
    pub si_agent: Option<String>,
    pub po_number: Option<String>,
    pub beginning_balance: f64,
    pub reference_number: Option<String>,
    pub w_tax: f64,
    pub cancelled: bool,
    pub warehouse_id: Option<i32>,
    pub rebate: f64,
    pub commission_paid: bool,
    pub commission_date: NaiveDate,
    pub no_commission: bool,
    pub commission_amount: f64,
    pub commission_fixed: f64,
    pub collector: Option<i32>,
    pub is_commission_computable: Option<bool>,
    pub date_paid: NaiveDate,
    pub collected_amount: f64,
    pub is_heavy: bool,
    pub err: Option<i32>,
    pub payment_mode_id: Option<i32>,
    pub driver: Option<i32>,
    pub helper: Option<i32>,
    pub truck: Option<String>,
    pub notes: Option<String>,
    pub pack_list: Option<String>,
    pub remarks: Option<String>,
    pub adjustment_remarks: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewOrder {
    pub customer_id: Option<i32>,
    pub invoice_number: Option<String>,
    pub employee_id: Option<i32>,
    #[serde(default = "default_today")]
    pub order_date: NaiveDate,
    #[serde(default = "default_legacy_date")]
    pub delivery_date: NaiveDate,
    #[serde(default)]
    pub is_paid: bool,
    #[serde(default = "default_today")]
    pub due_date: NaiveDate,
    pub term_code: Option<i32>,
    #[serde(default)]
    pub total: f64,
    pub delivered_by: Option<i32>,
    pub packed_by: Option<i32>,
    #[serde(default)]
    pub order_status_id: i32,
    #[serde(default)]
    pub balance: f64,
    pub salesman: Option<i32>,
    pub user: Option<i32>,
    #[serde(default)]
    pub returns: f64,
    #[serde(default)]
    pub amount_paid: f64,
    #[serde(default)]
    pub bir: bool,
    pub shipper_id: Option<i32>,
    #[serde(default)]
    pub adjust: f64,
    #[serde(default)]
    pub order_profit: f64,
    #[serde(default)]
    pub order_free: f64,
    pub sales_order_id: Option<i32>,
    #[serde(default)]
    pub credits_applied: f64,
    #[serde(default)]
    pub consign: bool,
    pub dr_number: Option<String>,
    #[serde(default)]
    pub commission: f64,
    pub si_number: Option<String>,
    #[serde(default = "default_legacy_date")]
    pub si_date: NaiveDate,
    pub si_customer: Option<String>,
    pub si_terms: Option<String>,
    #[serde(default)]
    pub si_balance: f64,
    #[serde(default)]
    pub si_net_amount: f64,
    pub si_agent: Option<String>,
    pub po_number: Option<String>,
    #[serde(default)]
    pub beginning_balance: f64,
    pub reference_number: Option<String>,
    #[serde(default)]
    pub w_tax: f64,
    #[serde(default)]
    pub cancelled: bool,
    pub warehouse_id: Option<i32>,
    #[serde(default)]
    pub rebate: f64,
    #[serde(default)]
    pub commission_paid: bool,
    #[serde(default = "default_legacy_date")]
    pub commission_date: NaiveDate,
    #[serde(default)]
    pub no_commission: bool,
    #[serde(default)]
    pub commission_amount: f64,
    #[serde(default)]
    pub commission_fixed: f64,
    pub collector: Option<i32>,
    pub is_commission_computable: Option<bool>,
    #[serde(default = "default_legacy_date")]
    pub date_paid: NaiveDate,
    #[serde(default)]
    pub collected_amount: f64,
    #[serde(default)]
    pub is_heavy: bool,
    pub err: Option<i32>,
    pub payment_mode_id: Option<i32>,
    pub driver: Option<i32>,
    pub helper: Option<i32>,
    pub truck: Option<String>,
    pub notes: Option<String>,
    pub pack_list: Option<String>,
    pub remarks: Option<String>,
    pub adjustment_remarks: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateOrder {
    pub customer_id: Option<i32>,
    pub invoice_number: Option<String>,
    pub employee_id: Option<i32>,
    pub order_date: NaiveDate,
    pub delivery_date: NaiveDate,
    pub is_paid: bool,
    pub due_date: NaiveDate,
    pub term_code: Option<i32>,
    pub total: f64,
    pub delivered_by: Option<i32>,
    pub packed_by: Option<i32>,
    pub order_status_id: i32,
    pub balance: f64,
    pub salesman: Option<i32>,
    pub user: Option<i32>,
    pub returns: f64,
    pub amount_paid: f64,
    pub bir: bool,
    pub shipper_id: Option<i32>,
    pub adjust: f64,
    pub order_profit: f64,
    pub order_free: f64,
    pub sales_order_id: Option<i32>,
    pub credits_applied: f64,
    pub consign: bool,
    pub dr_number: Option<String>,
    pub commission: f64,
    pub si_number: Option<String>,
    pub si_date: NaiveDate,
    pub si_customer: Option<String>,
    pub si_terms: Option<String>,
    pub si_balance: f64,
    pub si_net_amount: f64,
    pub si_agent: Option<String>,
    pub po_number: Option<String>,
    pub beginning_balance: f64,
    pub reference_number: Option<String>,
    pub w_tax: f64,
    pub cancelled: bool,
    pub warehouse_id: Option<i32>,
    pub rebate: f64,
    pub commission_paid: bool,
    pub commission_date: NaiveDate,
    pub no_commission: bool,
    pub commission_amount: f64,
    pub commission_fixed: f64,
    pub collector: Option<i32>,
    pub is_commission_computable: Option<bool>,
    pub date_paid: NaiveDate,
    pub collected_amount: f64,
    pub is_heavy: bool,
    pub err: Option<i32>,
    pub payment_mode_id: Option<i32>,
    pub driver: Option<i32>,
    pub helper: Option<i32>,
    pub truck: Option<String>,
    pub notes: Option<String>,
    pub pack_list: Option<String>,
    pub remarks: Option<String>,
    pub adjustment_remarks: Option<String>,
}

fn default_today() -> NaiveDate {
    Local::now().date_naive()
}

fn default_legacy_date() -> NaiveDate {
    NaiveDate::from_ymd_opt(1899, 12, 30).expect("Valid database sentinel date")
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};

    fn full_payload() -> Value {
        serde_json::from_str(
            r#"{
            "customerId": 2,
            "invoiceNumber": "Test",
            "employeeId": 4,
            "orderDate": "2026-11-13",
            "deliveryDate": "2026-11-13",
            "isPaid": true,
            "dueDate": "2026-11-13",
            "termCode": 9,
            "total": 10.25,
            "deliveredBy": 11,
            "packedBy": 12,
            "orderStatusId": 13,
            "balance": 14.25,
            "salesman": 15,
            "user": 16,
            "returns": 17.25,
            "amountPaid": 18.25,
            "bir": true,
            "shipperId": 20,
            "adjust": 21.25,
            "orderProfit": 22.25,
            "orderFree": 23.25,
            "salesOrderId": 24,
            "creditsApplied": 25.25,
            "consign": true,
            "drNumber": "DR260001",
            "commission": 28.25,
            "siNumber": "Test",
            "siDate": "2026-11-13",
            "siCustomer": "Test",
            "siTerms": "Test",
            "siBalance": 33.25,
            "siNetAmount": 34.25,
            "siAgent": "Test",
            "poNumber": "Test",
            "beginningBalance": 37.25,
            "referenceNumber": "Test",
            "wTax": 39.25,
            "cancelled": true,
            "warehouseId": 41,
            "rebate": 42.25,
            "commissionPaid": true,
            "commissionDate": "2026-11-13",
            "noCommission": true,
            "commissionAmount": 46.25,
            "commissionFixed": 47.25,
            "collector": 48,
            "isCommissionComputable": true,
            "datePaid": "2026-11-13",
            "collectedAmount": 51.25,
            "isHeavy": true,
            "err": 53,
            "paymentModeId": 54,
            "driver": 55,
            "helper": 56,
            "truck": "Test",
            "notes": "Test",
            "packList": "Test",
            "remarks": "Test",
            "adjustmentRemarks": "Test"
        }"#,
        )
        .unwrap()
    }

    #[test]
    fn creation_uses_existing_defaults() {
        let before = Local::now().date_naive();
        let record: NewOrder = serde_json::from_value(json!({})).unwrap();
        let after = Local::now().date_naive();
        assert!(record.order_date >= before && record.order_date <= after);
        assert_eq!(
            record.delivery_date,
            NaiveDate::from_ymd_opt(1899, 12, 30).unwrap()
        );
        assert!(!record.is_paid);
        assert!(record.due_date >= before && record.due_date <= after);
        assert_eq!(record.term_code, None);
        assert_eq!(record.total, 0.0);
        assert_eq!(record.order_status_id, 0);
        assert_eq!(record.balance, 0.0);
        assert_eq!(record.returns, 0.0);
        assert_eq!(record.amount_paid, 0.0);
        assert!(!record.bir);
        assert_eq!(record.adjust, 0.0);
        assert_eq!(record.order_profit, 0.0);
        assert_eq!(record.order_free, 0.0);
        assert_eq!(record.credits_applied, 0.0);
        assert!(!record.consign);
        assert_eq!(record.commission, 0.0);
        assert_eq!(
            record.si_date,
            NaiveDate::from_ymd_opt(1899, 12, 30).unwrap()
        );
        assert_eq!(record.si_balance, 0.0);
        assert_eq!(record.si_net_amount, 0.0);
        assert_eq!(record.beginning_balance, 0.0);
        assert_eq!(record.w_tax, 0.0);
        assert!(!record.cancelled);
        assert_eq!(record.rebate, 0.0);
        assert!(!record.commission_paid);
        assert_eq!(
            record.commission_date,
            NaiveDate::from_ymd_opt(1899, 12, 30).unwrap()
        );
        assert!(!record.no_commission);
        assert_eq!(record.commission_amount, 0.0);
        assert_eq!(record.commission_fixed, 0.0);
        assert_eq!(
            record.date_paid,
            NaiveDate::from_ymd_opt(1899, 12, 30).unwrap()
        );
        assert_eq!(record.collected_amount, 0.0);
        assert!(!record.is_heavy);
    }

    #[test]
    fn nullable_fields_accept_null_in_creation_and_update() {
        let mut payload = full_payload();
        for field in [
            "customerId",
            "invoiceNumber",
            "employeeId",
            "termCode",
            "deliveredBy",
            "packedBy",
            "salesman",
            "user",
            "shipperId",
            "salesOrderId",
            "drNumber",
            "siNumber",
            "siCustomer",
            "siTerms",
            "siAgent",
            "poNumber",
            "referenceNumber",
            "warehouseId",
            "collector",
            "isCommissionComputable",
            "err",
            "paymentModeId",
            "driver",
            "helper",
            "truck",
            "notes",
            "packList",
            "remarks",
            "adjustmentRemarks",
        ] {
            payload[field] = Value::Null;
        }
        let new: NewOrder = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateOrder = serde_json::from_value(payload).unwrap();
        assert_eq!(new.customer_id, None);
        assert_eq!(update.customer_id, None);
        assert_eq!(new.invoice_number, None);
        assert_eq!(update.invoice_number, None);
        assert_eq!(new.employee_id, None);
        assert_eq!(update.employee_id, None);
        assert_eq!(new.term_code, None);
        assert_eq!(update.term_code, None);
        assert_eq!(new.delivered_by, None);
        assert_eq!(update.delivered_by, None);
        assert_eq!(new.packed_by, None);
        assert_eq!(update.packed_by, None);
        assert_eq!(new.salesman, None);
        assert_eq!(update.salesman, None);
        assert_eq!(new.user, None);
        assert_eq!(update.user, None);
        assert_eq!(new.shipper_id, None);
        assert_eq!(update.shipper_id, None);
        assert_eq!(new.sales_order_id, None);
        assert_eq!(update.sales_order_id, None);
        assert_eq!(new.dr_number, None);
        assert_eq!(update.dr_number, None);
        assert_eq!(new.si_number, None);
        assert_eq!(update.si_number, None);
        assert_eq!(new.si_customer, None);
        assert_eq!(update.si_customer, None);
        assert_eq!(new.si_terms, None);
        assert_eq!(update.si_terms, None);
        assert_eq!(new.si_agent, None);
        assert_eq!(update.si_agent, None);
        assert_eq!(new.po_number, None);
        assert_eq!(update.po_number, None);
        assert_eq!(new.reference_number, None);
        assert_eq!(update.reference_number, None);
        assert_eq!(new.warehouse_id, None);
        assert_eq!(update.warehouse_id, None);
        assert_eq!(new.collector, None);
        assert_eq!(update.collector, None);
        assert_eq!(new.is_commission_computable, None);
        assert_eq!(update.is_commission_computable, None);
        assert_eq!(new.err, None);
        assert_eq!(update.err, None);
        assert_eq!(new.payment_mode_id, None);
        assert_eq!(update.payment_mode_id, None);
        assert_eq!(new.driver, None);
        assert_eq!(update.driver, None);
        assert_eq!(new.helper, None);
        assert_eq!(update.helper, None);
        assert_eq!(new.truck, None);
        assert_eq!(update.truck, None);
        assert_eq!(new.notes, None);
        assert_eq!(update.notes, None);
        assert_eq!(new.pack_list, None);
        assert_eq!(update.pack_list, None);
        assert_eq!(new.remarks, None);
        assert_eq!(update.remarks, None);
        assert_eq!(new.adjustment_remarks, None);
        assert_eq!(update.adjustment_remarks, None);
    }

    #[test]
    fn update_requires_every_non_nullable_field() {
        for field in [
            "orderDate",
            "deliveryDate",
            "isPaid",
            "dueDate",
            "total",
            "orderStatusId",
            "balance",
            "returns",
            "amountPaid",
            "bir",
            "adjust",
            "orderProfit",
            "orderFree",
            "creditsApplied",
            "consign",
            "commission",
            "siDate",
            "siBalance",
            "siNetAmount",
            "beginningBalance",
            "wTax",
            "cancelled",
            "rebate",
            "commissionPaid",
            "commissionDate",
            "noCommission",
            "commissionAmount",
            "commissionFixed",
            "datePaid",
            "collectedAmount",
            "isHeavy",
        ] {
            let mut payload = full_payload();
            payload.as_object_mut().unwrap().remove(field);
            assert!(
                serde_json::from_value::<UpdateOrder>(payload).is_err(),
                "Missing {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_null_for_non_nullable_fields() {
        for field in [
            "orderDate",
            "deliveryDate",
            "isPaid",
            "dueDate",
            "total",
            "orderStatusId",
            "balance",
            "returns",
            "amountPaid",
            "bir",
            "adjust",
            "orderProfit",
            "orderFree",
            "creditsApplied",
            "consign",
            "commission",
            "siDate",
            "siBalance",
            "siNetAmount",
            "beginningBalance",
            "wTax",
            "cancelled",
            "rebate",
            "commissionPaid",
            "commissionDate",
            "noCommission",
            "commissionAmount",
            "commissionFixed",
            "datePaid",
            "collectedAmount",
            "isHeavy",
        ] {
            let mut payload = full_payload();
            payload[field] = Value::Null;
            assert!(
                serde_json::from_value::<NewOrder>(payload.clone()).is_err(),
                "Null {field}"
            );
            assert!(
                serde_json::from_value::<UpdateOrder>(payload).is_err(),
                "Null {field}"
            );
        }
    }

    #[test]
    fn payloads_reject_invalid_types_and_dates() {
        for (field, invalid_value) in [
            ("customerId", json!("1")),
            ("total", json!("10.50")),
            ("isPaid", json!(1)),
            ("orderDate", json!("2026-02-30")),
        ] {
            let mut payload = full_payload();
            payload[field] = invalid_value;
            assert!(serde_json::from_value::<NewOrder>(payload.clone()).is_err());
            assert!(serde_json::from_value::<UpdateOrder>(payload).is_err());
        }
    }

    #[test]
    fn contract_preserves_camel_case_fields_and_values() {
        let mut payload = full_payload();
        let new: NewOrder = serde_json::from_value(payload.clone()).unwrap();
        let update: UpdateOrder = serde_json::from_value(payload.clone()).unwrap();
        assert_eq!(new.customer_id, update.customer_id);
        assert_eq!(new.invoice_number, update.invoice_number);
        assert_eq!(new.employee_id, update.employee_id);
        assert_eq!(new.order_date, update.order_date);
        assert_eq!(new.delivery_date, update.delivery_date);
        assert_eq!(new.is_paid, update.is_paid);
        assert_eq!(new.due_date, update.due_date);
        assert_eq!(new.term_code, update.term_code);
        assert_eq!(new.total, update.total);
        assert_eq!(new.delivered_by, update.delivered_by);
        assert_eq!(new.packed_by, update.packed_by);
        assert_eq!(new.order_status_id, update.order_status_id);
        assert_eq!(new.balance, update.balance);
        assert_eq!(new.salesman, update.salesman);
        assert_eq!(new.user, update.user);
        assert_eq!(new.returns, update.returns);
        assert_eq!(new.amount_paid, update.amount_paid);
        assert_eq!(new.bir, update.bir);
        assert_eq!(new.shipper_id, update.shipper_id);
        assert_eq!(new.adjust, update.adjust);
        assert_eq!(new.order_profit, update.order_profit);
        assert_eq!(new.order_free, update.order_free);
        assert_eq!(new.sales_order_id, update.sales_order_id);
        assert_eq!(new.credits_applied, update.credits_applied);
        assert_eq!(new.consign, update.consign);
        assert_eq!(new.dr_number, update.dr_number);
        assert_eq!(new.commission, update.commission);
        assert_eq!(new.si_number, update.si_number);
        assert_eq!(new.si_date, update.si_date);
        assert_eq!(new.si_customer, update.si_customer);
        assert_eq!(new.si_terms, update.si_terms);
        assert_eq!(new.si_balance, update.si_balance);
        assert_eq!(new.si_net_amount, update.si_net_amount);
        assert_eq!(new.si_agent, update.si_agent);
        assert_eq!(new.po_number, update.po_number);
        assert_eq!(new.beginning_balance, update.beginning_balance);
        assert_eq!(new.reference_number, update.reference_number);
        assert_eq!(new.w_tax, update.w_tax);
        assert_eq!(new.cancelled, update.cancelled);
        assert_eq!(new.warehouse_id, update.warehouse_id);
        assert_eq!(new.rebate, update.rebate);
        assert_eq!(new.commission_paid, update.commission_paid);
        assert_eq!(new.commission_date, update.commission_date);
        assert_eq!(new.no_commission, update.no_commission);
        assert_eq!(new.commission_amount, update.commission_amount);
        assert_eq!(new.commission_fixed, update.commission_fixed);
        assert_eq!(new.collector, update.collector);
        assert_eq!(
            new.is_commission_computable,
            update.is_commission_computable
        );
        assert_eq!(new.date_paid, update.date_paid);
        assert_eq!(new.collected_amount, update.collected_amount);
        assert_eq!(new.is_heavy, update.is_heavy);
        assert_eq!(new.err, update.err);
        assert_eq!(new.payment_mode_id, update.payment_mode_id);
        assert_eq!(new.driver, update.driver);
        assert_eq!(new.helper, update.helper);
        assert_eq!(new.truck, update.truck);
        assert_eq!(new.notes, update.notes);
        assert_eq!(new.pack_list, update.pack_list);
        assert_eq!(new.remarks, update.remarks);
        assert_eq!(new.adjustment_remarks, update.adjustment_remarks);
        let record = Order {
            id: 42,
            customer_id: update.customer_id,
            invoice_number: update.invoice_number,
            employee_id: update.employee_id,
            order_date: update.order_date,
            delivery_date: update.delivery_date,
            is_paid: update.is_paid,
            due_date: update.due_date,
            term_code: update.term_code,
            total: update.total,
            delivered_by: update.delivered_by,
            packed_by: update.packed_by,
            order_status_id: update.order_status_id,
            balance: update.balance,
            salesman: update.salesman,
            user: update.user,
            returns: update.returns,
            amount_paid: update.amount_paid,
            bir: update.bir,
            shipper_id: update.shipper_id,
            adjust: update.adjust,
            order_profit: update.order_profit,
            order_free: update.order_free,
            sales_order_id: update.sales_order_id,
            credits_applied: update.credits_applied,
            consign: update.consign,
            dr_number: update.dr_number,
            commission: update.commission,
            si_number: update.si_number,
            si_date: update.si_date,
            si_customer: update.si_customer,
            si_terms: update.si_terms,
            si_balance: update.si_balance,
            si_net_amount: update.si_net_amount,
            si_agent: update.si_agent,
            po_number: update.po_number,
            beginning_balance: update.beginning_balance,
            reference_number: update.reference_number,
            w_tax: update.w_tax,
            cancelled: update.cancelled,
            warehouse_id: update.warehouse_id,
            rebate: update.rebate,
            commission_paid: update.commission_paid,
            commission_date: update.commission_date,
            no_commission: update.no_commission,
            commission_amount: update.commission_amount,
            commission_fixed: update.commission_fixed,
            collector: update.collector,
            is_commission_computable: update.is_commission_computable,
            date_paid: update.date_paid,
            collected_amount: update.collected_amount,
            is_heavy: update.is_heavy,
            err: update.err,
            payment_mode_id: update.payment_mode_id,
            driver: update.driver,
            helper: update.helper,
            truck: update.truck,
            notes: update.notes,
            pack_list: update.pack_list,
            remarks: update.remarks,
            adjustment_remarks: update.adjustment_remarks,
        };
        payload["id"] = json!(42);
        assert_eq!(serde_json::to_value(record).unwrap(), payload);
    }
}
