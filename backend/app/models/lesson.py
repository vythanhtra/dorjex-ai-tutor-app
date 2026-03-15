import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    module_id: Mapped[str] = mapped_column(String(10), ForeignKey("modules.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False, default="")
    order_index: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    estimated_time: Mapped[int] = mapped_column(Integer, default=15)  # minutes
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    module: Mapped["Module"] = relationship("Module", back_populates="lessons")
    progress: Mapped[list["UserProgress"]] = relationship("UserProgress", back_populates="lesson")
