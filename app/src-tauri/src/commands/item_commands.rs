use deadpool_tiberius::Pool;
use tauri::State;

use crate::models::item::{Item, NewItem, UpdateItem};
use crate::services::item_service;

#[tauri::command]
pub async fn add_item(pool: State<'_, Pool>, item: NewItem) -> Result<Item, String> {
    item_service::add_item(pool.inner(), item)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_item_by_id(pool: State<'_, Pool>, id: i32) -> Result<Option<Item>, String> {
    item_service::get_item_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_items(pool: State<'_, Pool>) -> Result<Vec<Item>, String> {
    item_service::get_all_items(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_item(
    pool: State<'_, Pool>,
    id: i32,
    item: UpdateItem,
) -> Result<Option<Item>, String> {
    item_service::update_item(pool.inner(), id, item)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_item_by_id(pool: State<'_, Pool>, id: i32) -> Result<bool, String> {
    item_service::delete_item_by_id(pool.inner(), id)
        .await
        .map_err(|e| e.to_string())
}
