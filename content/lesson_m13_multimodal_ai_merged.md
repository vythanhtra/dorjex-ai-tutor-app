# M13 – Multimodal AI

## Mục tiêu học:
- Hiểu khái niệm và ứng dụng của AI đa mô thức (multimodal AI) trong xử lý văn bản, hình ảnh, âm thanh, và video.
- Nắm các kỹ thuật thiết kế và huấn luyện mô hình đa mô thức (VD: CLIP, Vision Transformer, text-to-image).
- Phân tích rủi ro đạo đức trong các ứng dụng đa mô thức và đề xuất giải pháp cải thiện.

## Nội dung chính:
### 1. Khái niệm Multimodal AI
- **Multimodal AI là gì?**: AI đa mô thức là các hệ thống xử lý và kết hợp nhiều loại dữ liệu (văn bản, hình ảnh, âm thanh, video) để tạo ra kết quả tích hợp, ví dụ: tạo hình ảnh từ văn bản hoặc phân tích video.
- **So sánh với AI đơn mô thức**:
  - **Đơn mô thức**: Xử lý một loại dữ liệu (VD: GPT chỉ xử lý văn bản).
  - **Đa mô thức**: Kết hợp nhiều loại dữ liệu (VD: GPT-4o, Grok 3 xử lý văn bản và hình ảnh).
- **Ví dụ thực tiễn**:
  - Tạo nội dung quảng cáo (DALL·E 3, MidJourney).
  - Phân tích video giám sát (kết hợp hình ảnh và âm thanh).
  - Chatbot đa mô thức (Grok 3 với voice mode trên ứng dụng iOS/Android).

### 2. Kiến trúc và kỹ thuật
- **CLIP (Contrastive Language-Image Pretraining)**:
  - Kết nối văn bản và hình ảnh thông qua học đối sánh.
  - Ứng dụng: Tìm kiếm hình ảnh bằng văn bản, phân loại hình ảnh.
- **Vision Transformer (ViT)**:
  - Áp dụng Transformer cho xử lý hình ảnh, thay thế CNN trong một số ứng dụng.
  - Ứng dụng: Nhận diện đối tượng, phân tích y tế (VD: chẩn đoán qua hình ảnh X-quang).
- **Text-to-Image/Video Models**:
  - Mô hình như DALL·E 3, Stable Diffusion, Sora.
  - Cơ chế: Diffusion models, GANs.
- **Multimodal Fusion**:
  - Kết hợp dữ liệu từ nhiều nguồn (VD: văn bản + hình ảnh để tạo mô tả video).
- **Huấn luyện**:
  - Dữ liệu đa mô thức: Cần bộ dữ liệu lớn (VD: LAION-5B).
  - Tối ưu hóa: Giảm năng lượng tiêu thụ (liên kết với M15 – Sustainable AI).

### 3. Ứng dụng thực tiễn
- **Quảng cáo**: Tạo nội dung hình ảnh/video từ văn bản (VD: tạo banner quảng cáo).
- **Giáo dục**: Chatbot đa mô thức giải thích bài học qua văn bản và hình ảnh.
- **Y tế**: Phân tích hình ảnh y khoa kết hợp với báo cáo văn bản.
- **Giám sát an ninh**: Phân tích video và âm thanh để phát hiện sự cố.

### 4. Đạo đức trong Multimodal AI
- **Rủi ro**:
  - **Deepfake**: Tạo nội dung giả mạo (VD: video giả).
  - **Quyền riêng tư**: Sử dụng hình ảnh/âm thanh người dùng mà không có sự đồng ý.
  - **Thiên vị**: Mô hình thiên vị dựa trên dữ liệu huấn luyện (VD: ưu tiên một số nhóm văn hóa).
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Gắn nhãn nội dung AI-generated.
  - Công bằng: Đảm bảo không thiên vị trong dữ liệu.
  - Trách nhiệm: Kiểm soát rủi ro deepfake.
- **Nguyên tắc ISO/IEC 42001**:
  - Giải thích rõ ràng: AI phải giải thích cách xử lý dữ liệu đa mô thức.
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một hệ thống AI đa mô thức tạo nội dung quảng cáo dựa trên hình ảnh người dùng mà không có sự đồng ý rõ ràng.

### 5. Liên kết với các mô-đun khác
- **M4 (Prompt Engineering)**: Thiết kế prompt đa mô thức.
- **M9 (Ethics Sandbox)**: Kiểm định đạo đức trong các ứng dụng đa mô thức.
- **M12 (GenAI Product Engineering)**: Tích hợp AI đa mô thức vào sản phẩm.
- **M15 (Sustainable AI)**: Tối ưu hóa năng lượng cho mô hình đa mô thức.
- **M17 (AI Governance)**: Đảm bảo tuân thủ EU AI Act trong triển khai.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một ứng dụng Multimodal AI bạn từng thấy (VD: tạo hình ảnh từ văn bản). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt đa mô thức để tạo mô tả hình ảnh từ văn bản (VD: “Mô tả một bức tranh về hoàng hôn trên biển”).
   - So sánh đầu ra của prompt zero-shot và few-shot.
3. **Phản xạ đạo đức** (L3):
   - Phân tích rủi ro đạo đức của một hệ thống AI tạo video quảng cáo (VD: deepfake, quyền riêng tư).
   - Đề xuất cải thiện dựa trên UNESCO AI Ethics và EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế một hệ thống Multimodal AI cho chẩn đoán y tế (kết hợp văn bản và hình ảnh X-quang).
   - Mô tả cách tích hợp AutoEval (M6) và giảm carbon footprint (M15).
   - Phân tích rủi ro đạo đức và đề xuất giải pháp.

## Tài liệu tham khảo:
- “CLIP: Connecting Text and Images” – Radford et al. (2021).
- UNESCO AI Ethics (2021).
- EU AI Act (2024).
- “Diffusion Models for Text-to-Image” – Rombach et al. (2022).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1 (Nhẹ nhàng)**: “Bạn nghĩ AI đa mô thức có thể giúp gì trong học tập hàng ngày?”
- **L2 (Dẫn dắt)**: “Hãy so sánh cách một chatbot văn bản và một chatbot đa mô thức trả lời câu hỏi về hình ảnh.”
- **L3 (Phản biện)**: “Bạn có đồng ý rằng AI đa mô thức cần gắn nhãn AI-generated để tránh deepfake không? Tại sao?”
- **L4 (Thách thức)**: “Làm thế nào để cân bằng hiệu suất và đạo đức trong một hệ thống AI tạo video? Hãy phản biện.”

---

# M13 – Multimodal AI

## Mục tiêu học:
- Hiểu khái niệm AI đa mô thức và vai trò trong thế hệ GenAI mới
- Biết các mô hình như CLIP, DALL·E, GPT-4o hoạt động thế nào
- Áp dụng để tạo nội dung kết hợp văn bản, hình ảnh, âm thanh

## Nội dung chính:
- Đa mô thức là gì? Text ↔ Image ↔ Audio ↔ Video
- Kiến trúc CLIP, Flamingo, GPT-4o, Gemini
- Tạo nội dung: từ mô tả → hình ảnh → lồng tiếng → hoạt họa

## Bài tập gợi ý:
- Dùng DALL·E tạo ảnh từ một prompt marketing
- So sánh phản hồi GPT-4 vs GPT-4o khi nhập hình ảnh
- Phân tích một deepfake trên TikTok – AI nào tạo ra nó?