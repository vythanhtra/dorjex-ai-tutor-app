# M5 – Prompt nâng cao

## Mục tiêu học:
- Ứng dụng Chain of Thought (CoT), ReAct, Tree of Thoughts (ToT) trong thiết kế prompt.
- Thiết kế hệ thống phản xạ nhiều tầng với tích hợp đạo đức.
- Hiểu ứng dụng trong các lĩnh vực phức tạp (VD: y tế).

## Nội dung chính:
### 1. Chain of Thought (CoT)
- **CoT là gì?**: Hướng dẫn AI suy luận từng bước (VD: “Hãy giải bài toán này và giải thích từng bước”).
- **Ví dụ**: “Để tính 15% của 80, hãy: 1) Chuyển 15% thành 0.15, 2) Nhân 0.15 với 80 = 12.”

### 2. ReAct (Reasoning + Acting)
- **ReAct là gì?**: Kết hợp suy luận và hành động (VD: “Tìm thông tin về AI đa mô thức, sau đó tóm tắt”).
- **Ví dụ**: Prompt yêu cầu AI vừa phân tích vừa đưa ra giải pháp.

### 3. Tree of Thoughts (ToT)
- **ToT là gì?**: Tạo cây ý tưởng để khám phá nhiều hướng giải quyết (VD: “Liệt kê 3 cách tiếp cận để giải bài toán này”).
- **Ví dụ ứng dụng**: Chẩn đoán y tế với nhiều giả thuyết.

### 4. Đạo đức trong Prompt nâng cao
- **Rủi ro**: Prompt CoT/ReAct có thể dẫn đến kết luận sai lệch nếu không kiểm soát.
- **Nguyên tắc ISO/IEC 42001**: Giải thích rõ ràng, minh bạch.
- **Ví dụ**: Prompt chẩn đoán y tế cần đảm bảo không gây hại.

## Bài tập gợi ý:
1. **Viết prompt CoT** (L1): Viết prompt CoT để giải bài toán đơn giản (VD: tính diện tích hình tròn).
2. **Thiết kế ReAct** (L2): Viết prompt ReAct để phân tích và đề xuất giải pháp cho một vấn đề kinh doanh.
3. **Phản xạ đạo đức** (L3): Thiết kế prompt CoT cho chatbot y tế. Phân tích rủi ro đạo đức và đề xuất cải thiện.
4. **Tư duy chuyên gia** (L4): Thiết kế prompt ToT để giải quyết một bài toán chẩn đoán y tế với 3 giả thuyết. Làm thế nào để tích hợp đạo đức vào ToT?

## Tài liệu tham khảo:
- “Chain-of-Thought Prompting” – Wei et al. (2022).
- UNESCO AI Ethics (2021).
- Liên kết với M9 (Ethics Sandbox), M13 (Multimodal AI).