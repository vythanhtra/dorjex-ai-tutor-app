import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Integer, Text, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    module_id: Mapped[str] = mapped_column(String(10), ForeignKey("modules.id"), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    passing_score: Mapped[int] = mapped_column(Integer, default=80)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    module: Mapped["Module"] = relationship("Module", back_populates="quiz")
    questions: Mapped[list["QuizQuestion"]] = relationship("QuizQuestion", back_populates="quiz", order_by="QuizQuestion.order_index")
    attempts: Mapped[list["QuizAttempt"]] = relationship("QuizAttempt", back_populates="quiz")


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    quiz_id: Mapped[str] = mapped_column(String, ForeignKey("quizzes.id"), nullable=False, index=True)
    question_text: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[list] = mapped_column(JSON, nullable=False)  # [{"id": "a", "text": "..."}, ...]
    correct_answer: Mapped[str] = mapped_column(String(10), nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False, default="")
    order_index: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    quiz: Mapped["Quiz"] = relationship("Quiz", back_populates="questions")
