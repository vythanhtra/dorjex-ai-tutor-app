from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="DorjeX AI Tutor API",
    description="Backend API for DorjeX AI Tutor - AI-powered learning platform",
    version="1.0.0",
)

# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "dorjex-ai-tutor-backend"}


@app.get("/")
async def root():
    return {"message": "DorjeX AI Tutor API", "docs": "/docs"}
