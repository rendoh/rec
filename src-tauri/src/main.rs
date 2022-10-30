#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
mod task;
use tauri::Manager;

fn main() {
    use tauri::async_runtime::block_on;
    const DATABASE_DIR: &str = ".rec_app_db";
    const DATABASE_FILE: &str = "db.sqlite";
    let home_dir = directories::UserDirs::new()
        .map(|dirs| dirs.home_dir().to_path_buf())
        .expect("cannot access home directory");
    let database_dir = home_dir.join(DATABASE_DIR);
    let database_file = database_dir.join(DATABASE_FILE);
    let db_exists = std::fs::metadata(&database_file).is_ok();

    if !db_exists {
        std::fs::create_dir(&database_dir).expect("cannot create db directory");
    }

    let database_dir_str = std::fs::canonicalize(&database_dir)
        .unwrap()
        .to_string_lossy()
        .replace('\\', "/");
    let database_url = format!("sqlite://{}/{}", database_dir_str, DATABASE_FILE);
    let sqlite_pool = block_on(db::create_pool(&database_url)).expect("cannot connect to db");

    if !db_exists {
        block_on(db::migrate(&sqlite_pool)).expect("failed to migrate db");
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            task::commands::find_all,
            task::commands::create,
            task::commands::update,
            task::commands::delete,
            task::commands::find_recent_tasks,
        ])
        .setup(|app| {
            app.manage(sqlite_pool);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
