use super::schemas::{CreateTask, FindTasks, Task, UpdateTask};
use sqlx::{
    sqlite::{SqlitePool, SqliteRow},
    Error, Row,
};

pub async fn find_all(pool: &SqlitePool, payload: FindTasks) -> Result<Vec<Task>, Error> {
    sqlx::query_as::<_, Task>(
        r#"
SELECT
    *
FROM
    tasks
WHERE
    started_at BETWEEN $1 AND $2
ORDER BY
    started_at ASC"#,
    )
    .bind(
        payload
            .from
            .unwrap_or("1970-01-01T00:00:00.000Z".to_string()),
    )
    .bind(payload.to.unwrap_or("9999-12-31T23:59:59.999Z".to_string()))
    .fetch_all(pool)
    .await
}

pub async fn create(pool: &SqlitePool, payload: CreateTask) -> Result<Task, Error> {
    sqlx::query(
        r#"
UPDATE
    tasks
SET
    ended_at = $1
WHERE
    ended_at IS NULL"#,
    )
    .bind(&payload.started_at)
    .execute(pool)
    .await?;

    sqlx::query_as::<_, Task>(
        r#"
INSERT INTO
    tasks (title, started_at)
VALUES
    ($1, $2)
RETURNING *"#,
    )
    .bind(payload.title)
    .bind(&payload.started_at)
    .fetch_one(pool)
    .await
}

pub async fn update(pool: &SqlitePool, id: i32, payload: UpdateTask) -> Result<Task, Error> {
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
        $3,
        started_at
    ),
    ended_at = ifnull(
        $4,
        ended_at
    )
WHERE
    id = $1
RETURNING *"#,
    )
    .bind(id)
    .bind(payload.title)
    .bind(payload.started_at)
    .bind(payload.ended_at)
    .fetch_one(pool)
    .await
}

pub async fn delete(pool: &SqlitePool, id: i32) -> Result<(), Error> {
    sqlx::query(
        r#"
DELETE FROM
    tasks
WHERE
    id = $1"#,
    )
    .bind(id)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn find_recent_tasks(pool: &SqlitePool) -> Result<Vec<String>, Error> {
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
    .await?;

    Ok(rows)
}
