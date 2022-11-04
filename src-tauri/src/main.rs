#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
mod error;
mod task;
use tauri::Manager;

fn main() {
    use tauri::async_runtime::block_on;

    tauri::Builder::default()
        .setup(|app| {
            let sqlite_pool =
                block_on(db::setup_db(app.app_handle())).expect("cannot create database");
            app.manage(sqlite_pool);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            task::commands::find_all,
            task::commands::create,
            task::commands::update,
            task::commands::delete,
            task::commands::find_recent_tasks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
