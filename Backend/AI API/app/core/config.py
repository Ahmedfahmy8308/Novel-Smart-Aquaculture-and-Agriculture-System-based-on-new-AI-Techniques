from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Agromind AI API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5219"]

    # Database (if needed for model metadata)
    DATABASE_URL: str = ""

    # Core API URL (for callbacks if needed)
    CORE_API_URL: str = "http://localhost:5219"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
