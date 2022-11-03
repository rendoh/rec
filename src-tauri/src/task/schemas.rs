use chrono::DateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::{Validate, ValidationError};

#[derive(Debug, Serialize, Deserialize, FromRow, Validate)]
pub struct Task {
    pub id: i32,
    #[validate(length(min = 1, max = 32))]
    pub title: String,
    #[validate(custom = "validate_datetime_format")]
    pub started_at: String,
    #[validate(custom = "validate_datetime_format")]
    pub ended_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct CreateTask {
    #[validate(length(
        min = 1,
        max = 32,
        message = "タイトルは1文字以上32文字以下である必要があります",
    ))]
    pub title: String,
    #[validate(custom(
        function = "validate_datetime_format",
        message = "不正な日付フォーマットです"
    ))]
    pub started_at: String,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
#[validate(schema(
    function = "validate_range",
    skip_on_field_errors = false,
    message = "不正な期間です"
))]
pub struct UpdateTask {
    #[validate(length(
        min = 1,
        max = 32,
        message = "タイトルは1文字以上32文字以下である必要があります",
    ))]
    pub title: Option<String>,
    #[validate(custom(
        function = "validate_datetime_format",
        message = "不正な日付フォーマットです"
    ))]
    pub started_at: Option<String>,
    #[validate(custom(
        function = "validate_datetime_format",
        message = "不正な日付フォーマットです"
    ))]
    pub ended_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FindTasks {
    pub from: Option<String>,
    pub to: Option<String>,
}

fn validate_datetime_format(value: &str) -> Result<(), ValidationError> {
    DateTime::parse_from_rfc3339(&value)
        .map_err(|_| ValidationError::new("invalid_date_format"))?;
    Ok(())
}

fn validate_range(update_task: &UpdateTask) -> Result<(), ValidationError> {
    let started_at = match &update_task.started_at {
        None => return Ok(()),
        Some(datetime) => DateTime::parse_from_rfc3339(&datetime)
            .map_err(|_| ValidationError::new("invalid_date_format"))?,
    };
    let ended_at = match &update_task.ended_at {
        None => return Ok(()),
        Some(datetime) => DateTime::parse_from_rfc3339(&datetime)
            .map_err(|_| ValidationError::new("invalid_date_format"))?,
    };

    let duration = ended_at - started_at;
    if duration.num_milliseconds() <= 0 {
        return Err(ValidationError::new("invalid_date_range"));
    }

    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_date_string_format() {
        let result = validate_datetime_format("2022-11-01T03:30:00.000Z");
        assert!(result.is_ok());

        let result = validate_datetime_format("A022-11-01T03:30:00.000Z");
        assert!(result.is_err());
    }

    #[test]
    fn validate_create_task() {
        let create_task = CreateTask {
            title: "valid title".to_string(),
            started_at: "2022-11-01T03:30:00.000Z".to_string(),
        };
        assert!(create_task.validate().is_ok());

        let create_task = CreateTask {
            title: "should return validation error, lorem ipsum dolor sit amet".to_string(),
            started_at: "2022-11-01T03:30:00.000Z".to_string(),
        };
        assert!(create_task.validate().is_err());

        let create_task = CreateTask {
            title: "".to_string(),
            started_at: "2022-11-01T03:30:00.000Z".to_string(),
        };
        assert!(create_task.validate().is_err());

        let create_task = CreateTask {
            title: "valid title".to_string(),
            started_at: "A022-11-01T03:30:00.000Z".to_string(),
        };
        assert!(create_task.validate().is_err());
    }

    #[test]
    fn validate_update_task() {
        let update_task = UpdateTask {
            title: Some("valid title".to_string()),
            started_at: None,
            ended_at: None,
        };
        assert!(update_task.validate().is_ok());

        let update_task = UpdateTask {
            title: None,
            started_at: Some("2022-11-01T03:30:00.000Z".to_string()),
            ended_at: None,
        };
        assert!(update_task.validate().is_ok());

        let update_task = UpdateTask {
            title: None,
            started_at: None,
            ended_at: Some("2022-11-01T03:30:00.000Z".to_string()),
        };
        assert!(update_task.validate().is_ok());

        let update_task = UpdateTask {
            title: None,
            started_at: Some("2022-11-01T03:30:00.000Z".to_string()),
            ended_at: Some("2022-11-01T03:31:00.000Z".to_string()),
        };
        assert!(update_task.validate().is_ok());

        let update_task = UpdateTask {
            title: None,
            started_at: Some("2022-11-01T03:31:00.000Z".to_string()),
            ended_at: Some("2022-11-01T03:30:00.000Z".to_string()),
        };
        assert!(update_task.validate().is_err());
    }
}
