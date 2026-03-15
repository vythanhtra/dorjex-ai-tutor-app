from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.module import Module
from app.models.lesson import Lesson
from app.models.progress import UserProgress, QuizAttempt
from app.models.certificate import Certificate
from app.schemas.module import ModuleResponse, ModuleDetailResponse, LessonResponse, ModuleProgressInfo
from app.core.security import get_current_user_id

router = APIRouter(prefix="/modules", tags=["modules"])


@router.get("", response_model=list[ModuleResponse])
def list_modules(db: Session = Depends(get_db)):
    modules = db.query(Module).filter(Module.is_published == True).order_by(Module.order_index).all()
    result = []
    for m in modules:
        r = ModuleResponse.model_validate(m)
        r.lesson_count = len(m.lessons)
        result.append(r)
    return result


@router.get("/{module_id}", response_model=ModuleDetailResponse)
def get_module(module_id: str, db: Session = Depends(get_db)):
    module = db.query(Module).options(joinedload(Module.lessons)).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    r = ModuleDetailResponse.model_validate(module)
    r.lesson_count = len(module.lessons)
    return r


@router.get("/{module_id}/lessons", response_model=list[LessonResponse])
def get_module_lessons(module_id: str, db: Session = Depends(get_db)):
    lessons = db.query(Lesson).filter(Lesson.module_id == module_id).order_by(Lesson.order_index).all()
    return lessons


@router.get("/{module_id}/progress", response_model=ModuleProgressInfo)
def get_module_progress(
    module_id: str,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")

    total_lessons = len(module.lessons)
    completed = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.module_id == module_id,
        UserProgress.completed == True,
    ).count()

    percent = (completed / total_lessons * 100) if total_lessons > 0 else 0

    quiz_passed = False
    if module.quiz:
        attempt = db.query(QuizAttempt).filter(
            QuizAttempt.user_id == user_id,
            QuizAttempt.quiz_id == module.quiz.id,
            QuizAttempt.passed == True,
        ).first()
        quiz_passed = attempt is not None

    has_cert = db.query(Certificate).filter(
        Certificate.user_id == user_id,
        Certificate.module_id == module_id,
    ).first() is not None

    return ModuleProgressInfo(
        module_id=module_id,
        completed_lessons=completed,
        total_lessons=total_lessons,
        percent=round(percent, 1),
        quiz_passed=quiz_passed,
        has_certificate=has_cert,
    )
