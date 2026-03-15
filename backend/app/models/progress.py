import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Integer, Boolean, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class UserProgress(Base):
    __tablename__ = "user_progress"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False, index=True)
    module_id: Mapped[str] = mapped_column(String(10), ForeignKey("modules.id"), nullable=False)
    lesson_id: Mapped[str] = mapped_column(String, ForeignKey("lessons.id"), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    last_viewed: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    time_spent: Mapped[int] = mapped_column(Integer, default=0)  # seconds

    user: Mapped["User"] = relationship("User", back_populates="progress")
    module: Mapped["Module"] = relationship("Module", back_populates="progress")
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="progress")


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False, index=True)
    quiz_id: Mapped[str] = mapped_column(String, ForeignKey("quizzes.id"), nullable=False, index=True)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    answers: Mapped[list] = mapped_column(JSON, nullable=False)  # [{"question_id": "...", "answer": "a"}, ...]
    passed: Mapped[bool] = mapped_column(Boolean, default=False)
    attempted_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="quiz_attempts")
    quiz: Mapped["Quiz"] = relationship("Quiz", back_populates="attempts")
