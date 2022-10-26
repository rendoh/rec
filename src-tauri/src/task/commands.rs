use tauri::State;

use super::{
    handlers,
    schemas::{CreateTask, Task},
};

#[tauri::command]
pub async fn create(
    pool: State<'_, sqlx::SqlitePool>,
    payload: CreateTask,
) -> Result<Task, String> {
    let task = handlers::create(&pool, payload)
        .await
        .map_err(|e| e.to_string())?;

    Ok(task)
}

#[tauri::command]
pub async fn find_all(pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<Task>, String> {
    let tasks = handlers::find_all(&pool).await.map_err(|e| e.to_string())?;

    Ok(tasks)
}
