use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::supplier::{NewSupplier, Supplier, UpdateSupplier};
use crate::services::supplier_service;

#[tauri::command]
pub async fn add_supplier(
    pool: State<'_, Pool>,
    supplier: NewSupplier,
) -> Result<Supplier, String> {
    supplier_service::add_supplier(pool.inner(), supplier)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_supplier_by_id(
    pool: State<'_, Pool>,
    id: i32,
) -> Result<Option<Supplier>, String> {
    supplier_service::get_supplier_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_suppliers(pool: State<'_, Pool>) -> Result<Vec<Supplier>, String> {
    supplier_service::get_all_suppliers(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_supplier(
    pool: State<'_, Pool>,
    id: i32,
    supplier: UpdateSupplier,
) -> Result<Option<Supplier>, String> {
    supplier_service::update_supplier(pool.inner(), id, supplier)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_supplier_by_id(pool: State<'_, Pool>, id: i32) -> Result<bool, String> {
    supplier_service::delete_supplier_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
