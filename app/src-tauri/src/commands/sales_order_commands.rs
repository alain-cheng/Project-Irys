use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::sales_order::{NewSalesOrder, SalesOrder, UpdateSalesOrder};
use crate::services::sales_order_service;

#[tauri::command]
pub async fn add_sales_order(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    sales_order: NewSalesOrder,
) -> Result<SalesOrder, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "sales_orders.create", None)
        .await
        .map_err(|e| e.to_string())?;
    sales_order_service::add_sales_order(pool.inner(), &audit, sales_order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_sales_order_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<SalesOrder>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "sales_orders.view", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    sales_order_service::get_sales_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_sales_orders(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<SalesOrder>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "sales_orders.view", None)
        .await
        .map_err(|e| e.to_string())?;
    sales_order_service::get_all_sales_orders(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_sales_order(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    sales_order: UpdateSalesOrder,
) -> Result<Option<SalesOrder>, String> {
    let audit = auth_service::authorize(
        pool.inner(),
        session.inner(),
        "sales_orders.update",
        Some(id),
    )
    .await
    .map_err(|e| e.to_string())?;
    sales_order_service::update_sales_order(pool.inner(), &audit, id, sales_order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_sales_order_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    let audit = auth_service::authorize(
        pool.inner(),
        session.inner(),
        "sales_orders.delete",
        Some(id),
    )
    .await
    .map_err(|e| e.to_string())?;
    sales_order_service::delete_sales_order_by_id(pool.inner(), &audit, id)
        .await
        .map_err(|e| e.to_string())
}
