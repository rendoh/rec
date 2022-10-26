use super::schemas::{CreateTask, Task};
use sqlx::{sqlite::SqlitePool, Error};

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
