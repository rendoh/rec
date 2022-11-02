use crate::error::ApiError;

use super::schemas::{CreateTask, FindTasks, Task, UpdateTask};
use sqlx::{
    sqlite::{SqlitePool, SqliteRow},
    Row,
};
use validator::Validate;

pub async fn find_all(pool: &SqlitePool, payload: FindTasks) -> Result<Vec<Task>, ApiError> {
    sqlx::query_as::<_, Task>(
        r#"
SELECT
    tasks.id,
    tasks.title,
    strftime('%Y-%m-%dT%H:%M:%fZ', tasks.started_at, 'utc') AS started_at,
    strftime('%Y-%m-%dT%H:%M:%fZ', tasks.ended_at, 'utc') AS ended_at
FROM
    tasks
WHERE
    tasks.started_at BETWEEN $1 AND $2
ORDER BY
    tasks.started_at DESC"#,
    )
    .bind(
        payload
            .from
            .unwrap_or("1970-01-01T00:00:00.000Z".to_string()),
    )
    .bind(payload.to.unwrap_or("9999-12-31T23:59:59.999Z".to_string()))
    .fetch_all(pool)
    .await
    .map_err(ApiError::DbError)
}

pub async fn create(pool: &SqlitePool, payload: CreateTask) -> Result<Task, ApiError> {
    payload.validate().map_err(ApiError::ValidationError)?;

    // TODO validate range
    sqlx::query(
        r#"
UPDATE
    tasks
SET
    ended_at = datetime($1, 'localtime')
WHERE
    ended_at IS NULL"#,
    )
    .bind(&payload.started_at)
    .execute(pool)
    .await
    .map_err(ApiError::DbError)?;

    sqlx::query_as::<_, Task>(
        r#"
INSERT INTO
    tasks (title, started_at)
VALUES
    ($1, datetime($2, 'localtime'))
RETURNING
    id,
    title,
    strftime('%Y-%m-%dT%H:%M:%fZ', started_at, 'utc') AS started_at,
    strftime('%Y-%m-%dT%H:%M:%fZ', ended_at, 'utc') AS ended_at"#,
    )
    .bind(payload.title.trim())
    .bind(&payload.started_at)
    .fetch_one(pool)
    .await
    .map_err(ApiError::DbError)
}

pub async fn update(pool: &SqlitePool, id: i32, payload: UpdateTask) -> Result<Task, ApiError> {
    payload.validate().map_err(ApiError::ValidationError)?;

    sqlx::query_as::<_, Task>(
        r#"
UPDATE
    tasks
SET
    title = ifnull(
        $2,
        title
    ),
    started_at = ifnull(
        datetime($3, 'localtime'),
        started_at
    ),
    ended_at = ifnull(
        datetime($4, 'localtime'),
        ended_at
    )
WHERE
    id = $1
RETURNING
    id,
    title,
    strftime('%Y-%m-%dT%H:%M:%fZ', started_at, 'utc') AS started_at,
    strftime('%Y-%m-%dT%H:%M:%fZ', ended_at, 'utc') AS ended_at"#,
    )
    .bind(id)
    .bind(payload.title.map(|title| title.trim().to_string()))
    .bind(payload.started_at)
    .bind(payload.ended_at)
    .fetch_one(pool)
    .await
    .map_err(ApiError::DbError)
}

pub async fn delete(pool: &SqlitePool, id: i32) -> Result<(), ApiError> {
    sqlx::query(
        r#"
DELETE FROM
    tasks
WHERE
    id = $1"#,
    )
    .bind(id)
    .execute(pool)
    .await
    .map_err(ApiError::DbError)?;

    Ok(())
}

pub async fn find_recent_tasks(pool: &SqlitePool) -> Result<Vec<String>, ApiError> {
    let rows = sqlx::query(
        r#"
SELECT
    title,
    Max(started_at)
FROM
    tasks
GROUP BY
    title
ORDER BY
    started_at DESC
LIMIT
    6"#,
    )
    .map(|row: SqliteRow| row.try_get("title").unwrap())
    .fetch_all(pool)
    .await
    .map_err(ApiError::DbError)?;

    Ok(rows)
}
