use crate::auth::AuthSession;
use crate::services::auth_service;
use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::sales_order_detail::{
    NewSalesOrderDetail, SalesOrderDetail, UpdateSalesOrderDetail,
};
use crate::services::sales_order_detail_service;

#[tauri::command]
pub async fn add_sales_order_detail(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    sales_order_detail: NewSalesOrderDetail,
) -> Result<SalesOrderDetail, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.create")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::add_sales_order_detail(pool.inner(), sales_order_detail)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_sales_order_detail_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<Option<SalesOrderDetail>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.view")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::get_sales_order_detail_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_sales_order_details(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Vec<SalesOrderDetail>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.view")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::get_all_sales_order_details(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_sales_order_details_by_sales_order_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    sales_order_id: i32,
) -> Result<Vec<SalesOrderDetail>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.view")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::get_sales_order_details_by_sales_order_id(
        pool.inner(),
        sales_order_id,
    )
    .await
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_sales_order_detail(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
    sales_order_detail: UpdateSalesOrderDetail,
) -> Result<Option<SalesOrderDetail>, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.update")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::update_sales_order_detail(pool.inner(), id, sales_order_detail)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_sales_order_detail_by_id(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    id: i32,
) -> Result<bool, String> {
    auth_service::require_permission(pool.inner(), session.inner(), "so_details.delete")
        .await
        .map_err(|e| e.to_string())?;
    sales_order_detail_service::delete_sales_order_detail_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
