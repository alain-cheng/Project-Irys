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
        commands::customer_commands::add_customer,
        commands::customer_commands::get_customer_by_id,
        commands::customer_commands::get_all_customers,
        commands::customer_commands::update_customer,
        commands::customer_commands::delete_customer_by_id,
        commands::item_commands::add_item,
        commands::item_commands::get_item_by_id,
        commands::item_commands::get_all_items,
        commands::item_commands::update_item,
        commands::item_commands::delete_item_by_id,
        commands::supplier_commands::add_supplier,
        commands::supplier_commands::get_supplier_by_id,
        commands::supplier_commands::get_all_suppliers,
        commands::supplier_commands::update_supplier,
        commands::supplier_commands::delete_supplier_by_id,
        commands::order_commands::add_order,
        commands::order_commands::get_order_by_id,
        commands::order_commands::get_all_orders,
        commands::order_commands::update_order,
        commands::order_commands::delete_order_by_id,
        commands::sales_order_commands::add_sales_order,
        commands::sales_order_commands::get_sales_order_by_id,
        commands::sales_order_commands::get_all_sales_orders,
        commands::sales_order_commands::update_sales_order,
        commands::sales_order_commands::delete_sales_order_by_id,
        commands::sales_order_detail_commands::add_sales_order_detail,
        commands::sales_order_detail_commands::get_sales_order_detail_by_id,
        commands::sales_order_detail_commands::get_all_sales_order_details,
        commands::sales_order_detail_commands::update_sales_order_detail,
        commands::sales_order_detail_commands::delete_sales_order_detail_by_id
        
      ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
