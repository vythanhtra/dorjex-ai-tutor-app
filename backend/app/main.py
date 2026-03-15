from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import Base, engine
from app.routers import auth, modules, lessons, progress, quizzes, chat

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DorjeX AI Tutor API",
    description="Backend API for DorjeX AI Tutor — AI-powered learning platform with 23 modules",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {"status": "ok", "service": "dorjex-ai-tutor-backend"}


@app.get("/")
async def root():
    return {"message": "DorjeX AI Tutor API", "docs": "/docs"}
