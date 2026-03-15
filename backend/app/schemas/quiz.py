from pydantic import BaseModel
from datetime import datetime


class QuizOption(BaseModel):
    id: str
    text: str


class QuizQuestionResponse(BaseModel):
    id: str
    question_text: str
    options: list[QuizOption]
    order_index: int

    class Config:
        from_attributes = True


class QuizResponse(BaseModel):
    id: str
    module_id: str
    title: str
    passing_score: int
    questions: list[QuizQuestionResponse] = []

    class Config:
        from_attributes = True


class QuizAnswerItem(BaseModel):
    question_id: str
    answer: str


class QuizSubmitRequest(BaseModel):
    answers: list[QuizAnswerItem]


class QuizResultItem(BaseModel):
    question_id: str
    your_answer: str
    correct_answer: str
    is_correct: bool
    explanation: str


class QuizSubmitResponse(BaseModel):
    score: int
    passed: bool
    passing_score: int
    total_questions: int
    correct_count: int
    results: list[QuizResultItem]
    attempt_id: str
