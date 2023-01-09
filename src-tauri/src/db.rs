use std::str::FromStr;

use sqlx::{
    migrate::MigrateError,
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    SqlitePool,
};
use tauri::AppHandle;

pub async fn setup_db(app_handle: AppHandle) -> Result<SqlitePool, sqlx::Error> {
    const DATABASE_FILE: &str = "database.db";
    let config_dir = app_handle
        .path_resolver()
        .app_config_dir()
        .expect("cannot get config dir");
    let database_file = config_dir.join(DATABASE_FILE);
    let db_exists = std::fs::metadata(&database_file).is_ok();

    if !db_exists {
        std::fs::create_dir(&config_dir).expect("cannot create db directory");
    }

    let database_dir_str = std::fs::canonicalize(&config_dir)
        .unwrap()
        .to_string_lossy()
        .replace('\\', "/");
    let database_url = format!("sqlite://{}/{}", database_dir_str, DATABASE_FILE);
    let sqlite_pool = create_pool(&database_url)
        .await
        .expect("cannot connect to db");

    if !db_exists {
        migrate(&sqlite_pool).await?
    }

    Ok(sqlite_pool)
}

async fn create_pool(database_url: &str) -> Result<SqlitePool, Box<dyn std::error::Error>> {
    let connection_options = SqliteConnectOptions::from_str(database_url)?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal)
        .synchronous(SqliteSynchronous::Normal);

    let sqlite_pool = SqlitePoolOptions::new()
        .connect_with(connection_options)
        .await?;

    Ok(sqlite_pool)
}

async fn migrate(pool: &SqlitePool) -> Result<(), MigrateError> {
    sqlx::migrate!("./migrations").run(pool).await
}
