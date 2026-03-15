from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db
from app.models.conversation import AIConversation
from app.models.module import Module
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage
from app.core.config import settings
from app.core.security import get_current_user_id

router = APIRouter(prefix="/chat", tags=["chat"])


def _get_module_context(module_id: str | None, db: Session) -> str:
    if not module_id:
        return "You are DorjeX AI Tutor, an expert AI learning assistant."
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        return "You are DorjeX AI Tutor, an expert AI learning assistant."
    return (
        f"You are DorjeX AI Tutor helping a student learn Module {module.id}: '{module.title}' "
        f"(Level {module.level}). Provide clear, educational responses related to this AI module. "
        f"Be encouraging and use examples to explain concepts."
    )


@router.post("/message", response_model=ChatResponse)
async def send_message(
    body: ChatRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    # Get or create conversation
    conv = None
    if body.conversation_id:
        conv = db.query(AIConversation).filter(
            AIConversation.id == body.conversation_id,
            AIConversation.user_id == user_id,
        ).first()

    if not conv:
        conv = AIConversation(user_id=user_id, module_id=body.module_id, messages=[])
        db.add(conv)
        db.flush()

    now = datetime.now(timezone.utc).isoformat()
    conv.messages.append({"role": "user", "content": body.message, "timestamp": now})

    # Call OpenAI
    reply = await _call_openai(body.message, conv.messages[:-1], body.module_id, db)

    conv.messages.append({"role": "assistant", "content": reply, "timestamp": datetime.now(timezone.utc).isoformat()})
    db.commit()

    return ChatResponse(
        conversation_id=conv.id,
        reply=reply,
        messages=[ChatMessage(**m) for m in conv.messages],
    )


async def _call_openai(message: str, history: list, module_id: str | None, db: Session) -> str:
    if not settings.OPENAI_API_KEY:
        return (
            "AI Tutor is currently unavailable (no API key configured). "
            "Please check back later or contact your instructor."
        )
    try:
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        system_prompt = _get_module_context(module_id, db)
        messages = [{"role": "system", "content": system_prompt}]
        for m in history[-10:]:  # last 10 messages for context
            messages.append({"role": m["role"], "content": m["content"]})
        messages.append({"role": "user", "content": message})

        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception:
        # Never expose internal error details to client
        return "Sorry, AI Tutor is temporarily unavailable. Please try again later."


@router.get("/history/{conversation_id}", response_model=ChatResponse)
def get_history(
    conversation_id: str,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    conv = db.query(AIConversation).filter(
        AIConversation.id == conversation_id,
        AIConversation.user_id == user_id,
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return ChatResponse(
        conversation_id=conv.id,
        reply="",
        messages=[ChatMessage(**m) for m in conv.messages],
    )
