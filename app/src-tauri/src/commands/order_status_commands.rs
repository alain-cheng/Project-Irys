use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::order_status::{NewOrderStatus, OrderStatus, UpdateOrderStatus};
use crate::services::order_status_service;

#[tauri::command]
pub async fn add_order_status(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    order_status: NewOrderStatus,
) -> Result<OrderStatus, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "statuses.create", None)
        .await
        .map_err(|e| e.to_string())?;
    order_status_service::add_order_status(pool.inner(), &audit, order_status)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_order_status_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<OrderStatus>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "statuses.view", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_status_service::get_order_status_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_order_statuses(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<OrderStatus>, String> {
    auth_service::authorize(pool.inner(), session.inner(), "statuses.view", None)
        .await
        .map_err(|e| e.to_string())?;
    order_status_service::get_all_order_statuses(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_order_status(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    order_status: UpdateOrderStatus,
) -> Result<Option<OrderStatus>, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "statuses.update", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_status_service::update_order_status(pool.inner(), &audit, id, order_status)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_order_status_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    let audit = auth_service::authorize(pool.inner(), session.inner(), "statuses.delete", Some(id))
        .await
        .map_err(|e| e.to_string())?;
    order_status_service::delete_order_status_by_id(pool.inner(), &audit, id)
        .await
        .map_err(|e| e.to_string())
}
