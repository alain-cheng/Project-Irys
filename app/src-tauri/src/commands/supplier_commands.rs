use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::supplier::{NewSupplier, Supplier, UpdateSupplier};
use crate::services::supplier_service;

#[tauri::command]
pub async fn add_supplier(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    supplier: NewSupplier,
) -> Result<Supplier, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "suppliers.create", None)
        .await
        .map_err(|e| e.to_string())?;
    supplier_service::add_supplier(pool.inner(), &audit, supplier)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_supplier_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<Supplier>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "suppliers.view", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    supplier_service::get_supplier_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_suppliers(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<Supplier>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "suppliers.view", None)
        .await
        .map_err(|e| e.to_string())?;
    supplier_service::get_all_suppliers(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_supplier(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    supplier: UpdateSupplier,
) -> Result<Option<Supplier>, String> {
    let audit =
        auth_service::authorize(pool.inner(), session.inner(), "suppliers.update", Some(id))
            .await
            .map_err(|e| e.to_string())?;
    supplier_service::update_supplier(pool.inner(), &audit, id, supplier)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_supplier_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    let audit =
        auth_service::authorize(pool.inner(), session.inner(), "suppliers.delete", Some(id))
            .await
            .map_err(|e| e.to_string())?;
    supplier_service::delete_supplier_by_id(pool.inner(), &audit, id)
        .await
        .map_err(|e| e.to_string())
}
