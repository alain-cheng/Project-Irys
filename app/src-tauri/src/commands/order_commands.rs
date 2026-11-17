use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::order::{NewOrder, Order, UpdateOrder};
use crate::services::order_service;

#[tauri::command]
pub async fn add_order(pool: State<'_, Pool>, order: NewOrder) -> Result<Order, String> {
    order_service::add_order(pool.inner(), order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_order_by_id(pool: State<'_, Pool>, id: i32) -> Result<Option<Order>, String> {
    order_service::get_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_orders(pool: State<'_, Pool>) -> Result<Vec<Order>, String> {
    order_service::get_all_orders(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_order(
    pool: State<'_, Pool>,
    id: i32,
    order: UpdateOrder,
) -> Result<Option<Order>, String> {
    order_service::update_order(pool.inner(), id, order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_order_by_id(pool: State<'_, Pool>, id: i32) -> Result<bool, String> {
    order_service::delete_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
