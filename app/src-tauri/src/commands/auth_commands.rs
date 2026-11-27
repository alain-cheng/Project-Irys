use deadpool_tiberius::Pool;
use tauri::State;

use crate::auth::AuthSession;
use crate::models::user::{LoginRequest, RegistrationRequest, User};
use crate::services::auth_service;

#[tauri::command]
pub async fn register_user(
    pool: State<'_, Pool>,
    registration: RegistrationRequest,
) -> Result<User, String> {
    auth_service::register(pool.inner(), registration)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn login(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
    credentials: LoginRequest,
) -> Result<User, String> {
    auth_service::login(pool.inner(), session.inner(), credentials)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_current_user(
    pool: State<'_, Pool>,
    session: State<'_, AuthSession>,
) -> Result<Option<User>, String> {
    auth_service::current_user(pool.inner(), session.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn logout(pool: State<'_, Pool>, session: State<'_, AuthSession>) -> Result<(), String> {
    auth_service::logout(pool.inner(), session.inner())
        .await
        .map_err(|e| e.to_string())
}
