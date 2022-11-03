use serde::Serialize;
use validator::{ValidationErrors, ValidationErrorsKind};

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
            Self::ValidationError(validation_errors) => {
                Error::new(collect_validation_messages(validation_errors)).serialize(serializer)
            }
            Self::DbError(sqlx_error) => Error::new(vec![format!(
                "予期せぬエラーが発生しました: {}",
                sqlx_error.to_string()
            )])
            .serialize(serializer),
        }
    }
}

fn collect_validation_messages(validation_errors: &ValidationErrors) -> Vec<String> {
    validation_errors
        .errors()
        .clone()
        .into_values()
        .flat_map(|kind| match kind {
            ValidationErrorsKind::Field(errors) => errors
                .iter()
                .map(|error| {
                    if let Some(val) = &error.message {
                        val.to_string()
                    } else {
                        "".to_string()
                    }
                })
                .collect::<Vec<String>>(),
            ValidationErrorsKind::Struct(errors) => collect_validation_messages(&errors),
            ValidationErrorsKind::List(errors) => errors
                .into_values()
                .flat_map(|error| collect_validation_messages(&error))
                .collect::<Vec<String>>(),
        })
        .collect::<Vec<String>>()
}

#[derive(Debug, Serialize)]
struct Error {
    messages: Vec<String>,
}

impl Error {
    pub fn new(messages: Vec<String>) -> Self {
        Self { messages }
    }
}

#[cfg(test)]
mod test {
    use serde::Deserialize;
    use validator::Validate;

    use super::collect_validation_messages;

    #[derive(Debug, Validate, Deserialize)]
    struct SignupData {
        #[validate]
        contact_details: ContactDetails,
        #[validate]
        preferences: Vec<Preference>,
        #[validate(range(min = 18, max = 20, message = "range"))]
        age: u32,
    }

    #[derive(Debug, Validate, Deserialize)]
    struct ContactDetails {
        #[validate(email(message = "email"))]
        mail: String,
    }

    #[derive(Debug, Validate, Deserialize)]
    struct Preference {
        #[validate(length(min = 4, message = "min"))]
        name: String,
    }

    #[test]
    fn test_collect_errors() {
        let signup_data = SignupData {
            contact_details: ContactDetails {
                mail: "".to_string(),
            },
            preferences: vec![
                Preference {
                    name: "".to_string(),
                },
                Preference {
                    name: "".to_string(),
                },
            ],
            age: 1,
        };
        let messages = collect_validation_messages(&signup_data.validate().unwrap_err());
        assert!(messages.len() == 4);
    }
}
