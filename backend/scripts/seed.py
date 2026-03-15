"""
Seed script: migrate content from YAML/Markdown files into the database.
Run: python -m scripts.seed
"""
import os
import sys
import yaml
import re
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal, Base, engine
from app.models.module import Module
from app.models.lesson import Lesson
from app.models.quiz import Quiz, QuizQuestion

CONTENT_DIR = Path(__file__).parent.parent.parent / "content"

MODULE_META = {
    "M1":  ("Introduction to AI", "L1", 1, 1),
    "M2":  ("Machine Learning", "L1", 2, 2),
    "M3":  ("Deep Learning", "L1", 3, 2),
    "M4":  ("Prompt Engineering", "L1", 4, 2),
    "M5":  ("Advanced Prompting", "L2", 5, 2),
    "M6":  ("Capstone — AutoEval", "L2", 6, 3),
    "M7":  ("Prompt Engineering Final", "L2", 7, 2),
    "M8":  ("Role Simulation", "L2", 8, 2),
    "M9":  ("Ethics Sandbox", "L2", 9, 2),
    "M10": ("LLM Evaluation", "L2", 10, 3),
    "M11": ("Python for AI", "L2", 11, 4),
    "M12": ("Product Engineering", "L3", 12, 3),
    "M13": ("Multimodal AI", "L3", 13, 3),
    "M14": ("Quantum AI", "L3", 14, 3),
    "M15": ("Sustainable AI", "L3", 15, 2),
    "M16": ("Federated Learning", "L3", 16, 3),
    "M17": ("AI Governance", "L3", 17, 3),
    "M18": ("Explainable AI (XAI)", "L3", 18, 3),
    "M19": ("AI for Healthcare", "L3", 19, 3),
    "M20": ("AI for Finance", "L3", 20, 3),
    "M21": ("AI for Education", "L3", 21, 3),
    "M22": ("AI for Cybersecurity", "L3", 22, 3),
    "M23": ("AI Agents", "L4", 23, 4),
}

LESSON_FILE_MAP = {
    "M1": "lesson_m1_intro_ai.md",
    "M2": "lesson_m2_machine_learning.md",
    "M3": "lesson_m3_deep_learning.md",
    "M4": "lesson_m4_prompt_engineering.md",
    "M5": "lesson_m5_advanced_prompting.md",
    "M6": "lesson_m6_capstone_auto_eval.md",
    "M7": "lesson_m7_prompt_engineering_final.md",
    "M8": "lesson_m8_role_simulation.md",
    "M9": "lesson_m9_ethics_sandbox.md",
    "M10": "lesson_m10_llm_evaluation.md",
    "M11": "lesson_m11_python_for_ai.md",
    "M12": "lesson_m12_product_engineering.md",
    "M13": "lesson_m13_multimodal_ai_merged.md",
    "M14": "lesson_m14_quantum_ai.md",
    "M15": "lesson_m15_sustainable_ai.md",
    "M16": "lesson_m16_federated_learning.md",
    "M17": "lesson_m17_ai_governance.md",
    "M18": "lesson_m18_explainable_ai.md",
    "M19": "lesson_m19_ai_for_healthcare.md",
    "M20": "lesson_m20_ai_for_finance.md",
    "M21": "lesson_m21_ai_for_education.md",
    "M22": "lesson_m22_ai_for_cybersecurity.md",
    "M23": "lesson_m23_ai_agents.md",
}

QUIZ_FILE_MAP = {
    "M1": "quiz_m1.yaml",
    "M3": "quiz_m3.yaml",
    "M5": "quiz_m5.yaml",
    "M8": "quiz_m8.yaml",
    "M13": "quiz_m13.yaml",
    "M20": "quiz_m20.yaml",
    "M22": "quiz_m22.yaml",
    "M23": "quiz_m23.yaml",
}


def parse_lesson_sections(content: str) -> list[dict]:
    """Split markdown into lessons by H2 headings."""
    sections = re.split(r'\n## ', content)
    lessons = []
    for i, sec in enumerate(sections):
        if i == 0:
            # First section — use as intro lesson
            title_match = re.match(r'#+ (.+)', sec)
            title = title_match.group(1) if title_match else "Introduction"
            lessons.append({"title": title, "content": sec, "order_index": 0})
        else:
            lines = sec.split('\n')
            title = lines[0].strip()
            body = '## ' + sec
            lessons.append({"title": title, "content": body, "order_index": i})
    return lessons


def seed_modules(db):
    print("Seeding modules and lessons...")
    for module_id, (title, level, order, est_hours) in MODULE_META.items():
        existing = db.query(Module).filter(Module.id == module_id).first()
        if existing:
            print(f"  Module {module_id} already exists, skipping.")
            continue

        module = Module(
            id=module_id,
            title=title,
            level=level,
            order_index=order,
            estimated_hours=est_hours,
            description=f"Module {module_id}: {title} — comprehensive AI learning module.",
        )
        db.add(module)
        db.flush()

        # Load lesson content
        lesson_file = LESSON_FILE_MAP.get(module_id)
        if lesson_file:
            lesson_path = CONTENT_DIR / lesson_file
            if lesson_path.exists():
                content = lesson_path.read_text(encoding="utf-8")
                sections = parse_lesson_sections(content)
                for sec in sections[:5]:  # Max 5 lessons per module
                    lesson = Lesson(
                        module_id=module_id,
                        title=sec["title"][:255],
                        content=sec["content"],
                        order_index=sec["order_index"],
                        estimated_time=15,
                    )
                    db.add(lesson)
            else:
                # Fallback: create placeholder lesson
                lesson = Lesson(
                    module_id=module_id,
                    title=f"Introduction to {title}",
                    content=f"# {title}\n\nLesson content for {title} will be added here.",
                    order_index=0,
                    estimated_time=15,
                )
                db.add(lesson)

    db.commit()
    print("Modules and lessons seeded.")


def seed_quizzes(db):
    print("Seeding quizzes...")
    for module_id, quiz_file in QUIZ_FILE_MAP.items():
        quiz_path = CONTENT_DIR / quiz_file
        if not quiz_path.exists():
            print(f"  Quiz file {quiz_file} not found, skipping.")
            continue

        module = db.query(Module).filter(Module.id == module_id).first()
        if not module:
            print(f"  Module {module_id} not found, skipping quiz.")
            continue

        if db.query(Quiz).filter(Quiz.module_id == module_id).first():
            print(f"  Quiz for {module_id} already exists, skipping.")
            continue

        raw = quiz_path.read_text(encoding="utf-8")
        # Remove YAML comments
        raw = '\n'.join(l for l in raw.splitlines() if not l.startswith('#'))
        data = yaml.safe_load(raw)
        if not data:
            continue

        quiz = Quiz(
            module_id=module_id,
            title=data.get("description", f"Quiz — {module.title}")[:255],
            passing_score=data.get("passing_score", 80),
        )
        db.add(quiz)
        db.flush()

        for i, q in enumerate(data.get("questions", [])):
            options = []
            for opt_dict in q.get("options", []):
                for k, v in opt_dict.items():
                    options.append({"id": k, "text": str(v)})

            question = QuizQuestion(
                quiz_id=quiz.id,
                question_text=q.get("text", ""),
                options=options,
                correct_answer=q.get("correct", "a"),
                explanation=q.get("explanation", ""),
                order_index=i,
            )
            db.add(question)

    db.commit()
    print("Quizzes seeded.")


def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_modules(db)
        seed_quizzes(db)
        print("\nSeed complete!")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()
