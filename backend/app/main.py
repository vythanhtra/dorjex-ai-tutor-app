import sys
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.database import Base, engine
from app.routers import auth, modules, lessons, progress, quizzes, chat

# --- Safety guard: refuse to start in production with default JWT secret ---
if settings.APP_ENV == "production" and settings.JWT_SECRET == "change-me-in-production":
    sys.exit(
        "FATAL: JWT_SECRET is set to the default value. "
        "Set a secure random JWT_SECRET before running in production."
    )

# Create tables
Base.metadata.create_all(bind=engine)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Hide docs in production
docs_url = None if settings.APP_ENV == "production" else "/docs"
redoc_url = None if settings.APP_ENV == "production" else "/redoc"

app = FastAPI(
    title="DorjeX AI Tutor API",
    description="Backend API for DorjeX AI Tutor — AI-powered learning platform with 23 modules",
    version="1.0.0",
    docs_url=docs_url,
    redoc_url=redoc_url,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# --- Security headers middleware ---
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        if settings.APP_ENV == "production":
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response


app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

# Routers
app.include_router(auth.router, prefix="/api")
app.include_router(modules.router, prefix="/api")
app.include_router(lessons.router, prefix="/api")
app.include_router(progress.router, prefix="/api")
app.include_router(quizzes.router, prefix="/api")
app.include_router(chat.router, prefix="/api")


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/")
async def root():
    return {"message": "DorjeX AI Tutor API"}
