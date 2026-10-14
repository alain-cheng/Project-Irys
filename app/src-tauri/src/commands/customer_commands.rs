use deadpool_tiberius::Pool;
use tauri::State;

use crate::services::customer_service;
use crate::models::customer::Customer;

/// Retrieves a customer from the database given by its unique id.
/// 
/// # Arguments
/// * `id` - A 32-bit integer representing the customer's unique identifier.
#[tauri::command]
pub async fn get_customer_by_id(
    pool: State<'_, Pool>,
    id: i32
) -> Result<Option<Customer>, String> {
    customer_service::get_customer_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

/// Retrieves all customers from the database
#[tauri::command]
pub async fn get_all_customers(pool: State<'_, Pool>) -> Result<Vec<Customer>, String> {
    customer_service::get_all_customers(pool.inner())
        .await
        .map_err(|e| e.to_string())
}