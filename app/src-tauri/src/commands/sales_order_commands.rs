use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::sales_order::{NewSalesOrder, SalesOrder, UpdateSalesOrder};
use crate::services::sales_order_service;

#[tauri::command]
pub async fn add_sales_order(
    pool: State<'_, Pool>,
    sales_order: NewSalesOrder,
) -> Result<SalesOrder, String> {
    sales_order_service::add_sales_order(pool.inner(), sales_order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_sales_order_by_id(
    pool: State<'_, Pool>,
    id: i32,
) -> Result<Option<SalesOrder>, String> {
    sales_order_service::get_sales_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_sales_orders(pool: State<'_, Pool>) -> Result<Vec<SalesOrder>, String> {
    sales_order_service::get_all_sales_orders(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_sales_order(
    pool: State<'_, Pool>,
    id: i32,
    sales_order: UpdateSalesOrder,
) -> Result<Option<SalesOrder>, String> {
    sales_order_service::update_sales_order(pool.inner(), id, sales_order)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_sales_order_by_id(pool: State<'_, Pool>, id: i32) -> Result<bool, String> {
    sales_order_service::delete_sales_order_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
