from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_ENV: str = "development"
    APP_PORT: int = 8000
    DEBUG: bool = True

    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/dorjex"
    REDIS_URL: str = "redis://localhost:6379"

    JWT_SECRET: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440

    OPENAI_API_KEY: str = ""

    CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
