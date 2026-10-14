use crate::config::database;

// declare modules here
mod commands;
mod config;
mod models;
mod services;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let db_connection_pool = database::create_connection_pool()
    .expect("Failed to configure SQL Server connection pool.");

  tauri::Builder::default()
    .manage(db_connection_pool)
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
        // register all commands here
        commands::customer_commands::get_customer_by_id,
        commands::customer_commands::get_all_customers,
        commands::customer_commands::add_customer
      ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}