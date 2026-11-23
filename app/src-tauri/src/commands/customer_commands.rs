use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::customer::{Customer, NewCustomer, UpdateCustomer};
use crate::services::customer_service;

/// Inserts a new customer into the database
///
/// # Arguments
/// * `customer` - a customer model containing the data for a new customer
#[tauri::command]
pub async fn add_customer(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    customer: NewCustomer,
) -> Result<Customer, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "customers.create")
        .await
        .map_err(|e| e.to_string())?;
    customer_service::add_customer(pool.inner(), customer)
        .await
        .map_err(|e| e.to_string())
}

/// Retrieves a customer from the database given by its unique id.
///
/// # Arguments
/// * `id` - A 32-bit integer representing the customer's unique identifier.
#[tauri::command]
pub async fn get_customer_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<Customer>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "customers.view")
        .await
        .map_err(|e| e.to_string())?;
    customer_service::get_customer_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

/// Retrieves all customers from the database
#[tauri::command]
pub async fn get_all_customers(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<Customer>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "customers.view")
        .await
        .map_err(|e| e.to_string())?;
    customer_service::get_all_customers(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

/// Removes a customer from the database given its id
///
/// # Arguments
/// * `id` - The unique identifier of the customer record to be deleted.
#[tauri::command]
pub async fn delete_customer_by_id(
    // oftentimes we probably dont want to delete a record from the database entirely, suggested to use an active flag instead
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "customers.delete")
        .await
        .map_err(|e| e.to_string())?;
    customer_service::delete_customer_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

/// Updates a customer record given its id
///
/// # Arguments
/// * `id` - Unique identifier of the customer record to be updated.
/// * `customer` - Customer model containing the updated records.
#[tauri::command]
pub async fn update_customer(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    customer: UpdateCustomer,
) -> Result<Option<Customer>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "customers.update")
        .await
        .map_err(|e| e.to_string())?;
    customer_service::update_customer(pool.inner(), id, customer)
        .await
        .map_err(|e| e.to_string())
}
