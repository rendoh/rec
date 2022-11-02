use serde::Serialize;
use validator::ValidationErrors;

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("ValidationError: {0}")]
    ValidationError(ValidationErrors),
    #[error("DbError: {0}")]
    DbError(sqlx::Error),
}

impl Serialize for ApiError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Self::ValidationError(validation_errors) => validation_errors.serialize(serializer),
            Self::DbError(sqlx_error) => DbError::new(sqlx_error.to_string()).serialize(serializer),
        }
    }
}

#[derive(Debug, Serialize)]
struct DbError {
    message: String,
    code: String,
}

impl DbError {
    pub fn new(message: String) -> Self {
        Self {
            message,
            code: "dberror".to_string(),
        }
    }
}
