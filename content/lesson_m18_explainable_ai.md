# M18 – Explainable AI

## Mục tiêu học:
- Hiểu khái niệm Explainable AI (XAI) và vai trò trong tăng cường minh bạch, niềm tin vào AI (2025).
- Nắm các kỹ thuật XAI như SHAP, LIME, counterfactual explanations, và attention mechanisms.
- Phân tích rủi ro đạo đức (minh bạch, công bằng, trách nhiệm) và đề xuất giải pháp tuân thủ UNESCO AI Ethics, EU AI Act.

## Nội dung chính:
### 1. Khái niệm Explainable AI
- **Explainable AI là gì?**: XAI là tập hợp kỹ thuật và phương pháp giúp giải thích cách AI đưa ra quyết định, tăng minh bạch và trách nhiệm giải trình.
- **Tầm quan trọng**:
  - Tăng niềm tin công chúng (VD: y tế, tài chính).
  - Đáp ứng yêu cầu pháp lý (EU AI Act 2024).
- **So sánh với Black-box AI**:
  - Black-box: Mô hình không giải thích được (VD: deep neural networks).
  - XAI: Cung cấp explanations dễ hiểu (VD: SHAP, LIME).
- **Ví dụ thực tiễn**:
  - Y tế: Giải thích chẩn đoán ung thư (Google Health).
  - Tài chính: Giải thích từ chối vay (NIST Framework).
  - Pháp lý: Đảm bảo AI công bằng trong xét xử.

### 2. Kỹ thuật trong Explainable AI
- **SHAP (SHapley Additive exPlanations)**:
  - Đo lường đóng góp của mỗi feature (VD: “Tuổi tác đóng góp 30% vào chẩn đoán”).
  - Ứng dụng: Y tế, tài chính.
- **LIME (Local Interpretable Model-agnostic Explanations)**:
  - Tạo mô hình đơn giản để giải thích local predictions.
  - Ứng dụng: Phân loại hình ảnh, văn bản.
- **Counterfactual Explanations**:
  - Đề xuất thay đổi input để thay đổi output (VD: “Tăng thu nhập để được vay”).
  - Ứng dụng: Tài chính, pháp lý.
- **Attention Mechanisms**:
  - Giải thích LLMs qua attention weights (VD: Grok 3, GPT-4o).
  - Ứng dụng: NLP, multimodal AI.
- **Interactive XAI**:
  - Công cụ như What-If Tool (Google) cho phép người dùng tương tác.
- **XAI for Multimodal AI**:
  - SHAP mở rộng cho văn bản + hình ảnh (2025).

### 3. Ứng dụng thực tiễn
- **Y tế**: Giải thích chẩn đoán AI (Google Health, NVIDIA Clara).
- **Tài chính**: Minh bạch trong chấm điểm tín dụng.
- **Pháp lý**: Đảm bảo AI xét xử công bằng.
- **Quảng cáo**: Giải thích cá nhân hóa quảng cáo (Google Ads).

### 4. Đạo đức trong Explainable AI
- **Rủi ro**:
  - **Minh bạch giả**: Explanations không chính xác hoặc khó hiểu.
  - **Công bằng**: Explanations thiên vị (VD: ưu tiên một nhóm dân số).
  - **Trách nhiệm**: Ai chịu trách nhiệm nếu explanation sai?
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Explanations phải dễ hiểu.
  - Công bằng: Đảm bảo không thiên vị.
  - Trách nhiệm: Xác định trách nhiệm giải trình.
- **Nguyên tắc EU AI Act (2024)**:
  - High-risk AI phải cung cấp explanations dễ hiểu.
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một ngân hàng tại Mỹ (2025) sử dụng AI để từ chối đơn vay nhưng cung cấp explanations không rõ ràng (dựa trên SHAP), dẫn đến cáo buộc thiếu minh bạch và vi phạm NIST AI Risk Management Framework.

### 5. Liên kết với các mô-đun khác
- **M4**: Thiết kế prompt để yêu cầu explanations.
- **M9**: Kiểm định đạo đức XAI trong sandbox.
- **M12**: Tích hợp XAI vào sản phẩm.
- **M13**: XAI cho AI đa mô thức.
- **M15**: Tối ưu năng lượng trong XAI.
- **M16**: XAI trong Federated Learning.
- **M17**: Quản trị XAI theo EU AI Act.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một ứng dụng XAI bạn từng thấy (VD: giải thích chẩn đoán y tế). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt để yêu cầu AI giải thích quyết định chẩn đoán ung thư. So sánh đầu ra của SHAP và LIME.
3. **Phản xạ đạo đức** (L3):
   - Phân tích case study: Ngân hàng Mỹ cung cấp explanations không rõ ràng cho đơn vay. Điều này có vi phạm UNESCO AI Ethics không? Đề xuất cải thiện theo EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế hệ thống XAI cho chẩn đoán y tế. Mô tả cách tích hợp SHAP (M18) và giảm carbon footprint (M15). Phân tích rủi ro minh bạch giả và đề xuất giải pháp.

## Tài liệu tham khảo:
- “SHAP: A Unified Approach to Explainability” – Lundberg et al. (2017).
- “LIME: Local Interpretable Explanations” – Ribeiro et al. (2016).
- “Counterfactual Explanations for ML” – Wachter et al. (2024).
- “XAI for LLMs” – Google Research (2025).
- UNESCO AI Ethics (2021).
- EU AI Act (2024).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1**: “Explainable AI có thể giúp gì trong việc sử dụng AI an toàn?”
- **L2**: “So sánh cách SHAP và LIME giải thích quyết định AI.”
- **L3**: “Bạn có đồng ý rằng mọi AI cần cung cấp explanations dễ hiểu không? Tại sao?”
- **L4**: “Làm thế nào để cân bằng accuracy và explainability trong AI? Phản biện.”