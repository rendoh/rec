use tauri::State;

use crate::error::ApiError;

use super::{
    handlers,
    schemas::{CreateTask, FindTasks, Task, UpdateTask},
};

#[tauri::command]
pub async fn find_all(
    pool: State<'_, sqlx::SqlitePool>,
    payload: FindTasks,
) -> Result<Vec<Task>, ApiError> {
    handlers::find_all(&pool, payload).await
}

#[tauri::command]
pub async fn create(
    pool: State<'_, sqlx::SqlitePool>,
    payload: CreateTask,
) -> Result<Task, ApiError> {
    handlers::create(&pool, payload).await
}

#[tauri::command]
pub async fn update(
    pool: State<'_, sqlx::SqlitePool>,
    id: i32,
    payload: UpdateTask,
) -> Result<Task, ApiError> {
    handlers::update(&pool, id, payload).await
}

#[tauri::command]
pub async fn delete(pool: State<'_, sqlx::SqlitePool>, id: i32) -> Result<(), ApiError> {
    handlers::delete(&pool, id).await
}

#[tauri::command]
pub async fn find_recent_tasks(pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<String>, ApiError> {
    handlers::find_recent_tasks(&pool).await
}
