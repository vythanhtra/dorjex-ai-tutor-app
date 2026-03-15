from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.quiz import Quiz, QuizQuestion
from app.models.progress import QuizAttempt
from app.schemas.quiz import QuizResponse, QuizSubmitRequest, QuizSubmitResponse, QuizResultItem
from app.core.security import get_current_user_id

router = APIRouter(prefix="/quizzes", tags=["quizzes"])


@router.get("/module/{module_id}", response_model=QuizResponse)
def get_quiz_by_module(
    module_id: str,
    _: str = Depends(get_current_user_id),  # require auth; correct_answer NOT in QuizResponse
    db: Session = Depends(get_db),
):
    quiz = db.query(Quiz).options(joinedload(Quiz.questions)).filter(Quiz.module_id == module_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found for this module")
    return quiz


@router.post("/module/{module_id}/submit", response_model=QuizSubmitResponse)
def submit_quiz(
    module_id: str,
    body: QuizSubmitRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    quiz = db.query(Quiz).options(joinedload(Quiz.questions)).filter(Quiz.module_id == module_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    answer_map = {a.question_id: a.answer for a in body.answers}
    results = []
    correct_count = 0

    for q in quiz.questions:
        your_answer = answer_map.get(q.id, "")
        is_correct = your_answer == q.correct_answer
        if is_correct:
            correct_count += 1
        results.append(QuizResultItem(
            question_id=q.id,
            your_answer=your_answer,
            correct_answer=q.correct_answer,
            is_correct=is_correct,
            explanation=q.explanation,
        ))

    total = len(quiz.questions)
    score = round(correct_count / total * 100) if total > 0 else 0
    passed = score >= quiz.passing_score

    attempt = QuizAttempt(
        user_id=user_id,
        quiz_id=quiz.id,
        score=score,
        answers=[{"question_id": a.question_id, "answer": a.answer} for a in body.answers],
        passed=passed,
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    return QuizSubmitResponse(
        score=score,
        passed=passed,
        passing_score=quiz.passing_score,
        total_questions=total,
        correct_count=correct_count,
        results=results,
        attempt_id=attempt.id,
    )
