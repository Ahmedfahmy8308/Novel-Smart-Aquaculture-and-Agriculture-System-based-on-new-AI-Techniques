from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Agromind LLM API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5219"]

    # LLM model config
    MODEL_NAME: str = "meta-llama/Llama-3-8b"
    MODEL_PATH: str = ""

    # Core API URL
    CORE_API_URL: str = "http://localhost:5219"

    # Vector DB for RAG
    VECTOR_DB_URL: str = ""

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
