use deadpool_tiberius::Manager;
use tiberius::AuthMethod;

pub mod database;

pub fn sql_server_manager() -> Manager {
    Manager::new()
        .host("localhost")
        .port(1433)
        .database("IRYS_Dev")
        .authentication(AuthMethod::Integrated)
        .trust_cert() // for development only
}