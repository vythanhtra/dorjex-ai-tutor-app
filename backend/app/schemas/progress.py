from pydantic import BaseModel
from datetime import datetime


class MarkCompleteRequest(BaseModel):
    lesson_id: str


class DashboardResponse(BaseModel):
    user_id: str
    total_modules: int
    completed_modules: int
    overall_percent: float
    current_module_id: str | None
    current_lesson_id: str | None
    recent_modules: list[dict]
