# M17 – AI Governance

## Mục tiêu học:
- Hiểu khái niệm AI Governance và vai trò trong đảm bảo AI an toàn, minh bạch, và có trách nhiệm (2025).
- Nắm các khung pháp lý (EU AI Act, ISO/IEC 42001) và kỹ thuật quản trị (AI auditing, risk assessment).
- Phân tích rủi ro đạo đức (minh bạch, công bằng, trách nhiệm) và đề xuất giải pháp tuân thủ UNESCO AI Ethics.

## Nội dung chính:
### 1. Khái niệm AI Governance
- **AI Governance là gì?**: Quản lý và giám sát việc phát triển, triển khai AI để đảm bảo tuân thủ pháp lý, đạo đức, và an toàn.
- **Tầm quan trọng**:
  - Đảm bảo AI không gây hại (VD: thiên vị, vi phạm quyền riêng tư).
  - Tăng niềm tin công chúng (minh bạch, trách nhiệm giải trình).
- **So sánh với AI Development**:
  - Development: Tập trung vào xây dựng mô hình.
  - Governance: Giám sát toàn bộ vòng đời AI (từ thiết kế đến triển khai).
- **Ví dụ thực tiễn**:
  - EU AI Act: Phân loại AI theo rủi ro, yêu cầu báo cáo minh bạch.
  - NIST AI Risk Management: Auditing AI tại Mỹ (2025).
  - G7 AI Code of Conduct: Minh bạch toàn cầu.

### 2. Khung pháp lý và kỹ thuật
- **Khung pháp lý**:
  - **EU AI Act (2024)**: Quy định high-risk AI (y tế, tài chính) phải báo cáo rủi ro, tuân thủ GDPR.
  - **ISO/IEC 42001**: Tiêu chuẩn quản lý AI, yêu cầu minh bạch và đánh giá tác động.
  - **GDPR**: Bảo vệ quyền riêng tư trong AI.
- **Kỹ thuật quản trị**:
  - **AI Auditing**: Kiểm tra bias, fairness (Fairlearn, AI Fairness 360).
  - **Risk Assessment**: Đánh giá rủi ro quyền riêng tư, an ninh, môi trường (CodeCarbon).
  - **Explainability**: SHAP, LIME giải thích quyết định AI.
  - **Monitoring**: Theo dõi AI sau triển khai (VD: drift detection).
- **Tools**:
  - Fairlearn, SHAP, CodeCarbon, AI Fairness 360 (2025).

### 3. Ứng dụng thực tiễn
- **Y tế**: Quản trị AI chẩn đoán để đảm bảo công bằng, minh bạch (NVIDIA Clara).
- **Tài chính**: Đánh giá tín dụng AI tuân thủ EU AI Act.
- **An ninh**: Quản lý AI giám sát, tránh vi phạm quyền riêng tư.
- **Quảng cáo**: Đảm bảo AI cá nhân hóa không thiên vị.

### 4. Đạo đức trong AI Governance
- **Rủi ro**:
  - **Minh bạch**: Thiếu công khai phương pháp AI (VD: black-box models).
  - **Công bằng**: Thiên vị trong AI (VD: chấm điểm tín dụng).
  - **Trách nhiệm**: Ai chịu trách nhiệm khi AI gây hại?
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Công khai cách AI hoạt động.
  - Công bằng: Đảm bảo không thiên vị.
  - Trách nhiệm: Xác định trách nhiệm giải trình.
- **Nguyên tắc EU AI Act (2024)**:
  - Báo cáo rủi ro cho high-risk AI.
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một công ty công nghệ tại EU (2025) triển khai AI chấm điểm tín dụng nhưng không công khai phương pháp, dẫn đến cáo buộc thiên vị và vi phạm EU AI Act.

### 5. Liên kết với các mô-đun khác
- **M4**: Thiết kế prompt tuân thủ pháp lý.
- **M9**: Kiểm định đạo đức AI trong sandbox.
- **M12**: Tích hợp quản trị AI vào sản phẩm.
- **M13**: Quản trị AI đa mô thức.
- **M15**: Quản trị môi trường trong AI.
- **M16**: Quản trị dữ liệu trong FL.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một khung quản trị AI bạn từng nghe (VD: EU AI Act). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt để yêu cầu AI giải thích quyết định chấm điểm tín dụng. So sánh đầu ra với yêu cầu minh bạch của EU AI Act.
3. **Phản xạ đạo đức** (L3):
   - Phân tích case study: Công ty EU triển khai AI chấm điểm tín dụng không minh bạch. Điều này có vi phạm UNESCO AI Ethics không? Đề xuất cải thiện theo EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế hệ thống AI chẩn đoán y tế tuân thủ EU AI Act. Mô tả cách tích hợp AI auditing (M17) và giảm carbon footprint (M15). Phân tích rủi ro công bằng và đề xuất giải pháp.

## Tài liệu tham khảo:
- “EU AI Act: A Guide to Compliance” – European Commission (2024).
- “ISO/IEC 42001: AI Management Systems” – ISO (2023).
- “NIST AI Risk Management Framework” – NIST (2025).
- UNESCO AI Ethics (2021).
- “AI Auditing Tools” – arXiv (2024).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1**: “AI Governance có thể giúp gì trong việc sử dụng AI an toàn?”
- **L2**: “So sánh cách EU AI Act và NIST Framework quản trị AI.”
- **L3**: “Bạn có đồng ý rằng mọi AI cần công khai phương pháp để đảm bảo minh bạch không? Tại sao?”
- **L4**: “Làm thế nào để cân bằng hiệu suất và trách nhiệm giải trình trong AI? Phản biện.”