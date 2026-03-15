from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.lesson import Lesson
from app.schemas.module import LessonResponse
from app.core.security import get_current_user_id

router = APIRouter(prefix="/lessons", tags=["lessons"])


@router.get("/{lesson_id}", response_model=LessonResponse)
def get_lesson(
    lesson_id: str,
    _: str = Depends(get_current_user_id),  # require auth
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.get("/{lesson_id}/next", response_model=LessonResponse | None)
def get_next_lesson(
    lesson_id: str,
    _: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return db.query(Lesson).filter(
        Lesson.module_id == lesson.module_id,
        Lesson.order_index > lesson.order_index,
    ).order_by(Lesson.order_index).first()


@router.get("/{lesson_id}/previous", response_model=LessonResponse | None)
def get_previous_lesson(
    lesson_id: str,
    _: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return db.query(Lesson).filter(
        Lesson.module_id == lesson.module_id,
        Lesson.order_index < lesson.order_index,
    ).order_by(Lesson.order_index.desc()).first()
