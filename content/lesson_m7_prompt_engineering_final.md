# M7 – Prompt Engineering (Level: L1–L4)

## Mục tiêu học:
- Hiểu và áp dụng các kỹ thuật prompt engineering (zero-shot, few-shot, CoT, ToT, ReAct) để tối ưu hóa LLM.
- Nắm cấu hình LLM (temperature, top-K, top-P) và xu hướng 2025 (multimodal, sustainable AI, federated learning).
- Phân tích rủi ro đạo đức (thiên vị, quyền riêng tư) và tuân thủ EU AI Act, UNESCO AI Ethics, GDPR.

## Nội dung chính:
### 1. Khái niệm Prompt Engineering
- **Prompt Engineering là gì?**: Thiết kế prompt để dẫn dắt LLM tạo đầu ra chính xác, giảm hallucination.
- **Tầm quan trọng**: Tăng hiệu quả, đảm bảo đạo đức, tuân thủ pháp lý.

### 2. Kỹ thuật Prompt Engineering
- **Zero-shot, One-shot, Few-shot**: Phân loại movie review, JSON pizza order.
- **System, Role, Contextual**: JSON output, travel guide, retro games.
- **Advanced**: CoT, ToT, ReAct, self-consistency, automatic prompting.
- **Multimodal Prompting**: Kết hợp văn bản/hình ảnh (M13, VD: mô tả sản phẩm với ảnh).
- **Federated Learning Prompts**: Bảo mật dữ liệu với TensorFlow Federated (M16).

### 3. Cấu hình LLM
- **Temperature**: 0 (deterministic) đến 1 (creative).
- **Top-K, Top-P**: Điều chỉnh randomness.
- **Token Limit**: Tối ưu năng lượng, chi phí (M15).

### 4. Đạo đức trong Prompt Engineering
- **Rủi ro**: Thiên vị (VD: giáo dục, tài chính), minh bạch giả, data leakage.
- **Nguyên tắc**: UNESCO AI Ethics (minh bạch, công bằng), EU AI Act (explainability), GDPR (dữ liệu cá nhân).
- **Case studies**:
  - Prompt gây thiên vị trong AI giáo dục (M21): Đánh giá học sinh ưu tiên nhóm giàu có.
  - Prompt gây thiên vị trong AI tài chính (M20): Ưu tiên khách hàng giàu.
- **Từ chối hợp lý**: Từ chối prompt quảng cáo sai sự thật (VD: “Không thể tạo nội dung lừa đảo”).

## Bài thực hành gợi ý:
1. **Zero-shot** (L1): Viết prompt yêu cầu Grok 3 mô tả AI trong 50 từ.
2. **Few-shot** (L2): Thiết kế prompt JSON cho pizza order với 3 ví dụ.
3. **CoT** (L3): Giải bài toán tuổi với CoT, phân tích rủi ro thiên vị.
4. **ReAct** (L4): Xây dựng agent tìm thông tin với Vertex AI, tích hợp XAI (M18) và federated learning (M16).

## Câu hỏi phản xạ:
- **L1**: “Prompt engineering giúp gì trong tương tác AI?”
- **L2**: “So sánh zero-shot và few-shot. Khi nào dùng mỗi loại?”
- **L3**: “Bạn cảm thấy thế nào khi prompt không ra kết quả mong muốn? Làm sao cải thiện?”
- **L4**: “Phản biện: Prompt engineering có thể thay thế fine-tuning?”

## Tài liệu tham khảo:
- Google Prompting Guides (2024).
- Wei, J., et al., Chain of Thought Prompting (2023).
- EU AI Act (2024).
- TensorFlow Federated Guide (2025).

## Liên kết mô-đun:
- M4 (Prompt Engineering), M13 (Multimodal AI), M15 (Sustainable AI), M16 (Federated Learning), M18 (Explainable AI), M20 (AI for Finance), M21 (AI for Education).