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