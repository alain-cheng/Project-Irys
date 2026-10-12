use anyhow::Context;
use deadpool_tiberius::Pool;

pub fn create_connection_pool() -> anyhow::Result<Pool> {
    crate::config::sql_server_manager()
        .create_pool()
        .context("Failed to create database connection pool")
}