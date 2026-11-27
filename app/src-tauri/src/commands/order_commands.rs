use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::order::{NewOrder, Order, UpdateOrder};
use crate::services::order_service;

#[tauri::command]
pub async fn add_order(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    order: NewOrder,
) -> Result<Order, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "orders.create", None)
        .await
        .map_err(|e| e.to_string())?;
    order_service::add_order(pool.inner(), &audit, order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_order_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<Order>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "orders.view", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_service::get_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_orders(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<Order>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "orders.view", None)
        .await
        .map_err(|e| e.to_string())?;
    order_service::get_all_orders(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_order(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    order: UpdateOrder,
) -> Result<Option<Order>, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "orders.update", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_service::update_order(pool.inner(), &audit, id, order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_order_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "orders.delete", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_service::delete_order_by_id(pool.inner(), &audit, id)
        .await
        .map_err(|e| e.to_string())
}
