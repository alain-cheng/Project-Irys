use serde::{Deserialize, Serialize};

#[derive(Serialize)]
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
}

#[derive(Deserialize)]
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
}