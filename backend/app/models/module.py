from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Boolean, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Module(Base):
    __tablename__ = "modules"

    id: Mapped[str] = mapped_column(String(10), primary_key=True)  # "M1", "M2", ...
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    level: Mapped[str] = mapped_column(String(5), nullable=False, default="L1")  # L1-L4
    order_index: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    estimated_hours: Mapped[int] = mapped_column(Integer, default=1)
    thumbnail_url: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    lessons: Mapped[list["Lesson"]] = relationship("Lesson", back_populates="module", order_by="Lesson.order_index")
    quiz: Mapped["Quiz | None"] = relationship("Quiz", back_populates="module", uselist=False)
    progress: Mapped[list["UserProgress"]] = relationship("UserProgress", back_populates="module")
    certificates: Mapped[list["Certificate"]] = relationship("Certificate", back_populates="module")
