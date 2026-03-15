from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db
from app.models.lesson import Lesson
from app.models.module import Module
from app.models.progress import UserProgress
from app.models.quiz import QuizAttempt
from app.schemas.progress import MarkCompleteRequest, DashboardResponse
from app.core.security import get_current_user_id

router = APIRouter(prefix="/progress", tags=["progress"])


@router.post("/mark-complete")
def mark_complete(
    body: MarkCompleteRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.id == body.lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    prog = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.lesson_id == body.lesson_id,
    ).first()

    if prog:
        if not prog.completed:
            prog.completed = True
            prog.completed_at = datetime.now(timezone.utc)
        prog.last_viewed = datetime.now(timezone.utc)
    else:
        prog = UserProgress(
            user_id=user_id,
            module_id=lesson.module_id,
            lesson_id=body.lesson_id,
            completed=True,
            completed_at=datetime.now(timezone.utc),
        )
        db.add(prog)

    db.commit()
    return {"status": "ok", "lesson_id": body.lesson_id}


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    modules = db.query(Module).filter(Module.is_published == True).order_by(Module.order_index).all()
    total_modules = len(modules)
    completed_modules = 0
    current_module_id = None
    current_lesson_id = None
    recent_modules = []

    for module in modules:
        total_lessons = len(module.lessons)
        if total_lessons == 0:
            continue

        completed_count = db.query(UserProgress).filter(
            UserProgress.user_id == user_id,
            UserProgress.module_id == module.id,
            UserProgress.completed == True,
        ).count()

        percent = round(completed_count / total_lessons * 100, 1)

        if percent == 100:
            completed_modules += 1

        if percent > 0 and percent < 100 and current_module_id is None:
            current_module_id = module.id
            # Find first incomplete lesson
            completed_lesson_ids = [
                p.lesson_id for p in db.query(UserProgress).filter(
                    UserProgress.user_id == user_id,
                    UserProgress.module_id == module.id,
                    UserProgress.completed == True,
                ).all()
            ]
            for lesson in module.lessons:
                if lesson.id not in completed_lesson_ids:
                    current_lesson_id = lesson.id
                    break

        recent_modules.append({
            "id": module.id,
            "title": module.title,
            "level": module.level,
            "percent": percent,
            "completed_lessons": completed_count,
            "total_lessons": total_lessons,
        })

    overall_percent = round(completed_modules / total_modules * 100, 1) if total_modules > 0 else 0

    return DashboardResponse(
        user_id=user_id,
        total_modules=total_modules,
        completed_modules=completed_modules,
        overall_percent=overall_percent,
        current_module_id=current_module_id,
        current_lesson_id=current_lesson_id,
        recent_modules=recent_modules[:6],
    )
