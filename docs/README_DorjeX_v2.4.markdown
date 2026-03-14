```markdown
# DorjeX | AI Tutor v2.4 – README

DorjeX | AI Tutor là một hệ thống học AI chiến lược theo phản xạ (Reflex-based AI Tutor), thiết kế bởi Vy Thanh Trà, dành cho người học từ cấp độ cơ bản đến nâng cao.

---

## Tính năng nổi bật

- **Học theo mô-đun (M1–M23)**: Từ Giới thiệu AI đến các ứng dụng AI nâng cao, bao gồm AI Agents
- **Tương thích đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Phản xạ đa tầng**: Dựa trên macro logic, routing YAML, sandbox đạo đức
- **Bảo mật hệ thống**: Bảo vệ tệp, kiểm soát phản hồi theo ngữ cảnh
- **Tone cá nhân hóa**: Điều chỉnh theo style người học (GenZ, mentor, professor...)
- **Chứng chỉ hoàn thành**: Cấp chứng chỉ PDF sau khi hoàn thành quiz (điểm ≥80%)
- **Chuẩn quốc tế**: OECD AI Literacy, EU AI Act, ISO/IEC 42001, UNESCO AI Ethics, GDPR, Nghị định 13/2023

---

## Cấu trúc mô-đun

| Mã   | Tên mô-đun                  | Nội dung chính |
|------|-----------------------------|----------------|
| M1   | Giới thiệu AI               | Khái niệm, các loại AI, so sánh ML/DL |
| M2   | Machine Learning            | Supervised vs Unsupervised, thuật toán cơ bản |
| M3   | Deep Learning               | CNN, RNN, Transformer |
| M4   | Prompt Engineering          | Kỹ thuật viết prompt hiệu quả |
| M5   | Advanced Prompting          | ToT, ReAct, reflex testing |
| M6   | Capstone & Sandbox          | AutoEval, Ethics Reflex Simulation |
| M7   | Prompt Engineering          | Zero-shot, CoT, ReAct, multimodal prompting |
| M8   | Role Simulation             | Nhập vai chiến lược, prompt theo vai trò |
| M9   | Ethics Sandbox & CoT        | Tư duy phản biện & kiểm định đạo đức |
| M10  | LLM Evaluation Criteria     | 24 tiêu chí đánh giá LLMs (OECD, ISO) |
| M11  | Python for AI               | Cơ bản lập trình Python cho AI/ML |
| M12  | Product Engineering         | Phát triển sản phẩm AI (GenAI apps) |
| M13  | Multimodal AI               | Xử lý văn bản, hình ảnh, âm thanh |
| M14  | Quantum AI                  | Kết hợp AI và tính toán lượng tử |
| M15  | Sustainable AI              | Tối ưu năng lượng, giảm carbon footprint |
| M16  | Federated Learning          | Học máy phân tán, bảo mật dữ liệu |
| M17  | AI Governance               | Quản trị AI theo ISO/IEC 42001, EU AI Act |
| M18  | Explainable AI              | Giải thích mô hình AI (SHAP, LIME) |
| M19  | AI for Healthcare           | Ứng dụng AI trong y tế, đạo đức dữ liệu |
| M20  | AI for Finance              | Phân tích tài chính, phát hiện gian lận |
| M21  | AI for Education            | Cá nhân hóa học tập, đạo đức giáo dục |
| M22  | AI for Cybersecurity        | Bảo mật mạng, phát hiện tấn công |
| M23  | AI Agents                   | Kiến trúc tác nhân AI, ReAct/Planning, guardrails |

---

## Thành phần hệ thống

- **Instruction**: `instruction_multilang_dorjex_ai_tutor_v2.4.md`
- **Routing**: `intent_router.yaml`, `module_content_map_UPDATED.yaml`
- **Macro**: `reflex_macro.yaml`, `macro_prompt_template_optin.yaml`
- **Tone & Style**: `tone_profile.yaml`
- **Sandbox**: `sandbox_profile.yaml`, `sandbox_ethics_dual.yaml`
- **Evaluation**: `lesson_m10_llm_evaluation.md`, `quiz_m_eval.yaml`
- **Protection & Logging**: `systemfileguard`, `macro_explainability_refusal.yaml`, `feedback_form_macro.yaml`, `certificate_data_protection.yaml`
- **Certificates**: `certificate_template.tex`
- **Extensions**: `instruction_extensions_note.markdown`, `lesson_m23_ai_agents.md`, `reflex_mapping_m23.yaml`, `quiz_m23.yaml`, `sandbox_alignment_m23.yaml`
- **Overview**: `lesson_m_overview.md`, `risk_notice_macro.yaml`, `capstone_realworld_mode.yaml`

---

## Cách sử dụng với GPT Builder

1. Upload toàn bộ các file YAML, MD, và TEX vào backend ZIP
2. Copy `instruction_multilang_dorjex_ai_tutor_v2.4.md` vào phần Instruction
3. GPT sẽ tự động phản xạ, điều hướng đúng mô-đun & ngôn ngữ người dùng
4. Bảo vệ tệp hệ thống, chỉ phản hồi khi được hỏi đúng tên
5. Hoàn thành quiz (điểm ≥80%) để nhận chứng chỉ PDF

---

## Liên hệ người thiết kế

> Vy Thanh Trà – AI Strategist & Reflex Architect  
> Email: contact@vythanhtra.ai
```