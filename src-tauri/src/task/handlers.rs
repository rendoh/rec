use super::schemas::{CreateTask, Task, UpdateTask};
use sqlx::{sqlite::SqlitePool, Error};

pub async fn find_all(pool: &SqlitePool) -> Result<Vec<Task>, Error> {
    sqlx::query_as::<_, Task>(
        r#"
SELECT
    *
FROM
    tasks
ORDER BY
    started_at DESC"#,
    )
    .fetch_all(pool)
    .await
}

pub async fn create(pool: &SqlitePool, payload: CreateTask) -> Result<Task, Error> {
    sqlx::query_as::<_, Task>(
        r#"
INSERT INTO
    tasks (title, started_at)
VALUES
    ($1, $2)
RETURNING *"#,
    )
    .bind(payload.title)
    .bind(payload.started_at)
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
    id = $1"#,
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
