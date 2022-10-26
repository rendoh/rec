use tauri::State;

use super::{
    handlers,
    schemas::{CreateTask, Task, UpdateTask},
};

#[tauri::command]
pub async fn find_all(pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<Task>, String> {
    let tasks = handlers::find_all(&pool).await.map_err(|e| e.to_string())?;

    Ok(tasks)
}

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
pub async fn update(
    pool: State<'_, sqlx::SqlitePool>,
    id: i32,
    payload: UpdateTask,
) -> Result<Task, String> {
    let task = handlers::update(&pool, id, payload)
        .await
        .map_err(|e| e.to_string())?;

    Ok(task)
}

#[tauri::command]
pub async fn delete(pool: State<'_, sqlx::SqlitePool>, id: i32) -> Result<(), String> {
    handlers::delete(&pool, id).await.map_err(|e| e.to_string())
}
