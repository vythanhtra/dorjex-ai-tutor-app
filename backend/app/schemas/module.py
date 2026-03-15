from pydantic import BaseModel
from datetime import datetime


class LessonSummary(BaseModel):
    id: str
    title: str
    order_index: int
    estimated_time: int

    class Config:
        from_attributes = True


class ModuleResponse(BaseModel):
    id: str
    title: str
    description: str
    level: str
    order_index: int
    is_published: bool
    estimated_hours: int
    thumbnail_url: str | None = None
    lesson_count: int = 0

    class Config:
        from_attributes = True


class ModuleDetailResponse(ModuleResponse):
    lessons: list[LessonSummary] = []


class LessonResponse(BaseModel):
    id: str
    module_id: str
    title: str
    content: str
    order_index: int
    estimated_time: int

    class Config:
        from_attributes = True


class ModuleProgressInfo(BaseModel):
    module_id: str
    completed_lessons: int
    total_lessons: int
    percent: float
    quiz_passed: bool
    has_certificate: bool
