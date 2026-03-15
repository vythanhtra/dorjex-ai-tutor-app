from pydantic import BaseModel, field_validator
from typing import Literal


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str
    timestamp: str | None = None


class ChatRequest(BaseModel):
    message: str
    module_id: str | None = None
    conversation_id: str | None = None

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty")
        if len(v) > 2000:
            raise ValueError("Message too long (max 2000 characters)")
        return v

    @field_validator("module_id")
    @classmethod
    def validate_module_id(cls, v: str | None) -> str | None:
        if v is not None and len(v) > 10:
            raise ValueError("Invalid module_id")
        return v


class ChatResponse(BaseModel):
    conversation_id: str
    reply: str
    messages: list[ChatMessage]
