# M15 – Sustainable AI

## Mục tiêu học:
- Hiểu khái niệm Sustainable AI và vai trò trong giảm tác động môi trường của AI (2025).
- Nắm các kỹ thuật tối ưu hóa năng lượng như model compression, efficient architectures, và green data centers.
- Phân tích rủi ro đạo đức (môi trường, công bằng, minh bạch) và đề xuất giải pháp tuân thủ UNESCO AI Ethics, EU AI Act.

## Nội dung chính:
### 1. Khái niệm Sustainable AI
- **Sustainable AI là gì?**: AI được thiết kế và triển khai để giảm thiểu tác động môi trường (carbon footprint, năng lượng) và thúc đẩy công bằng xã hội.
- **Tác động môi trường của AI**:
  - Huấn luyện GPT-4: ~50 GWh, 6,000 tấn CO2 (2024).
  - AI đa mô thức (GPT-4o): Carbon footprint cao hơn do xử lý hình ảnh/video.
- **So sánh với Classical AI**:
  - Classical AI: Tốn năng lượng, thiếu báo cáo môi trường.
  - Sustainable AI: Tối ưu năng lượng, minh bạch emissions (VD: AI4Green).
- **Ví dụ thực tiễn**:
  - Google: Tối ưu cooling systems, giảm 40% năng lượng (2025).
  - Microsoft: Renewable energy forecasting cho data centers.
  - AI4Green: Giảm 50% emissions từ AI (EU, 2025).

### 2. Kỹ thuật tối ưu hóa năng lượng
- **Model Compression**:
  - Pruning: Loại bỏ neurons không cần thiết (VD: DistilBERT giảm 70% năng lượng).
  - Quantization: Giảm precision (VD: INT8 thay vì FP32).
  - Knowledge Distillation: Chuyển kiến thức từ large models sang small models.
- **Efficient Architectures**:
  - Sparse Transformers: Giảm memory usage 50%.
  - FlashAttention: Tăng tốc training, giảm năng lượng (2025).
- **Green Data Centers**:
  - NVIDIA DGX với renewable energy, giảm 30% carbon footprint.
  - Cooling optimization (Google, 40% năng lượng tiết kiệm).
- **Carbon Footprint Measurement**:
  - Tools: CodeCarbon, ML CO2 Impact calculator.
  - Báo cáo emissions theo EU AI Act (2024).

### 3. Ứng dụng thực tiễn
- **Năng lượng tái tạo**: AI dự báo sản lượng gió/mặt trời (Microsoft).
- **Nông nghiệp bền vững**: AI tối ưu tưới tiêu, giảm 20% nước (AI4Green).
- **Tối ưu hóa chuỗi cung ứng**: Giảm emissions vận tải (Google).
- **Y tế**: AI xanh trong chẩn đoán hình ảnh (NVIDIA).

### 4. Đạo đức trong Sustainable AI
- **Rủi ro**:
  - **Môi trường**: Emissions cao từ AI không tối ưu (VD: huấn luyện bằng than đá).
  - **Công bằng**: Chi phí xanh chỉ dành cho tập đoàn lớn?
  - **Minh bạch**: Thiếu báo cáo carbon footprint.
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Công khai emissions và phương pháp tối ưu.
  - Công bằng: Phân phối công nghệ xanh công bằng.
  - Trách nhiệm: Chịu trách nhiệm về tác động môi trường.
- **Nguyên tắc EU AI Act (2024)**:
  - Báo cáo carbon footprint cho high-risk AI systems.
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một công ty AI tại Trung Quốc (2025) sử dụng than đá để huấn luyện mô hình đa mô thức, gây 10,000 tấn CO2 mà không công khai dữ liệu.

### 5. Liên kết với các mô-đun khác
- **M4**: Thiết kế prompt tiết kiệm năng lượng.
- **M9**: Kiểm định đạo đức Sustainable AI trong sandbox.
- **M12**: Tích hợp AI xanh vào sản phẩm.
- **M13**: Tối ưu năng lượng cho AI đa mô thức.
- **M14**: Giảm carbon footprint trong Quantum AI.
- **M17**: Tuân thủ quản trị môi trường.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một ứng dụng Sustainable AI bạn từng thấy (VD: AI dự báo năng lượng tái tạo). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt để yêu cầu một mô hình AI tối ưu tưới tiêu nông nghiệp, giảm năng lượng. So sánh đầu ra với mô hình không tối ưu.
3. **Phản xạ đạo đức** (L3):
   - Phân tích case study: Công ty AI tại Trung Quốc gây 10,000 tấn CO2 khi huấn luyện mô hình. Điều này có vi phạm UNESCO AI Ethics không? Đề xuất cải thiện theo EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế một hệ thống AI xanh cho chẩn đoán y tế (kết hợp model compression và green data centers). Mô tả cách tích hợp AutoEval (M6) và báo cáo carbon footprint (M15). Phân tích rủi ro công bằng và đề xuất giải pháp.

## Tài liệu tham khảo:
- “Green AI: A Roadmap to Net Zero” – AI4Green (2025).
- “Carbon Footprint of Large Language Models” – Strubell et al. (2024).
- “Google’s AI for Data Center Cooling” – Google Sustainability (2025).
- UNESCO AI Ethics (2021).
- EU AI Act (2024).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1**: “Sustainable AI có thể giúp gì trong cuộc sống hàng ngày của bạn?”
- **L2**: “So sánh cách một mô hình AI xanh và không xanh tiêu thụ năng lượng.”
- **L3**: “Bạn có đồng ý rằng mọi mô hình AI cần báo cáo carbon footprint không? Tại sao?”
- **L4**: “Làm thế nào để cân bằng hiệu suất và tác động môi trường trong AI? Phản biện.”