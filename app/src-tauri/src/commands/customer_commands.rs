use deadpool_tiberius::Pool;
use tauri::State;

use crate::services::customer_service;
use crate::models::customer::Customer;

/// test function
#[tauri::command]
pub async fn get_customer(pool: State<'_, Pool>) -> Result<Option<Customer>, String> {
    customer_service::get_customer(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

/// Retrieves a customer from the database given by its unique id.
/// 
/// # Arguments
/// * `id` - A 32-bit integer representing the customer's unique identifier.
#[tauri::command]
pub async fn get_customer_by_id() {
    // todo
}

/// Retrieves all customers from the database
#[tauri::command]
pub async fn get_all_customers() {
    // todo
}