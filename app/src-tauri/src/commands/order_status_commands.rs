use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::order_status::{NewOrderStatus, OrderStatus, UpdateOrderStatus};
use crate::services::order_status_service;

#[tauri::command]
pub async fn add_order_status(
    pool: State<'_, Pool>,
    order_status: NewOrderStatus,
) -> Result<OrderStatus, String> {
    order_status_service::add_order_status(pool.inner(), order_status)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_order_status_by_id(
    pool: State<'_, Pool>,
    id: i32,
) -> Result<Option<OrderStatus>, String> {
    order_status_service::get_order_status_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_order_statuses(pool: State<'_, Pool>) -> Result<Vec<OrderStatus>, String> {
    order_status_service::get_all_order_statuses(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_order_status(
    pool: State<'_, Pool>,
    id: i32,
    order_status: UpdateOrderStatus,
) -> Result<Option<OrderStatus>, String> {
    order_status_service::update_order_status(pool.inner(), id, order_status)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_order_status_by_id(pool: State<'_, Pool>, id: i32) -> Result<bool, String> {
    order_status_service::delete_order_status_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
