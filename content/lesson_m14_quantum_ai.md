# M14 – Quantum AI

## Mục tiêu học:
- Hiểu khái niệm Quantum AI và vai trò trong thế hệ AI mới (2025).
- Nắm các kỹ thuật Quantum Machine Learning (QML) như variational quantum circuits, quantum neural networks, và AI hỗ trợ quantum hardware.
- Phân tích rủi ro đạo đức (quyền riêng tư, an ninh, công bằng) và đề xuất giải pháp tuân thủ UNESCO AI Ethics, EU AI Act.

## Nội dung chính:
### 1. Khái niệm Quantum AI
- **Quantum AI là gì?**: Sự kết hợp giữa quantum computing (sử dụng qubit, superposition, entanglement) và AI (machine learning, optimization) để giải quyết các bài toán phức tạp nhanh hơn classical computing.
- **So sánh với Classical AI**:
  - Classical AI: Dựa trên bit (0 hoặc 1), hạn chế trong các bài toán high-dimensional (VD: hóa học lượng tử).
  - Quantum AI: Dựa trên qubit, tận dụng quantum phenomena để tăng tốc tính toán (VD: Pasqal’s 10,000-qubit system vào 2026).[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)
- **Ví dụ thực tiễn**:
  - Tối ưu hóa chuỗi cung ứng (Pasqal, IBM).[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)
  - Mô phỏng phản ứng hóa học (IonQ với AstraZeneca, speedup 20x).[](https://quantumcomputingreport.com/news/)
  - Quantum NLP (Quantinuum’s complex-valued word embeddings).[](https://www.quantinuum.com/blog/quantum-computers-will-make-ai-better)

### 2. Kiến trúc và kỹ thuật
- **Variational Quantum Circuits (VQC)**:
  - Quantum gates là tham số học được, mã hóa dữ liệu vào quantum states.
  - Ứng dụng: Tối ưu hóa, phân loại dữ liệu.[](https://www.ijert.org/quantum-computing-and-artificial-intelligence-progress-possibilities-and-gaps)
- **Quantum Neural Networks (QNN)**:
  - Tái thiết kế neural networks cho quantum (VD: Quantinuum’s Quantum NLP).[](https://www.quantinuum.com/blog/quantum-computers-will-make-ai-better)
  - Sử dụng complex-valued vectors thay vì real-valued vectors.
- **Quantum Error Correction (QEC)**:
  - AI hỗ trợ thiết kế QEC codes (neural networks, reinforcement learning).[](https://arxiv.org/html/2411.09131v1)
  - Ứng dụng: Pasqal, IBM cải thiện độ ổn định qubit.[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)
- **AI for Quantum**:
  - AI tối ưu hóa quantum circuits (VD: Google DeepMind giảm T-gate).[](https://developer.nvidia.com/blog/enabling-quantum-computing-with-ai/)
  - Mô phỏng quantum hardware (Google với NVIDIA CUDA-Q, 40-qubit simulations).[](https://nvidianews.nvidia.com/news/nvidia-supercharges-google-quantum-processor-design-with-simulation-of-quantum-device-physics)
- **Huấn luyện**:
  - Dữ liệu: Quantum feature spaces (high-dimensional states).[](https://www.ijert.org/quantum-computing-and-artificial-intelligence-progress-possibilities-and-gaps)
  - Hybrid quantum-classical: Kết hợp QPU với CPU/GPU (IonQ, NVIDIA).[](https://quantumcomputingreport.com/news/)

### 3. Ứng dụng thực tiễn
- **Hóa học lượng tử**: Mô phỏng phân tử (IonQ, IBM).[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)[](https://quantumcomputingreport.com/news/)
- **Tối ưu hóa**: Chuỗi cung ứng, tài chính (Pasqal).[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)
- **An ninh**: Phá mã lượng tử và quantum-resistant cryptography (Microsoft).[](https://news.microsoft.com/source/features/innovation/microsofts-majorana-1-chip-carves-new-path-for-quantum-computing/)
- **NLP**: Quantum word embeddings (Quantinuum).[](https://www.quantinuum.com/blog/quantum-computers-will-make-ai-better)
- **Y tế**: Thiết kế thuốc (IonQ với AstraZeneca).[](https://quantumcomputingreport.com/news/)

### 4. Đạo đức trong Quantum AI
- **Rủi ro**:
  - **Quyền riêng tư**: Dữ liệu nhạy cảm trong QML (VD: y tế, tài chính).
  - **An ninh**: Quantum computers đe dọa mã hóa hiện tại (quantum threat).[](https://jast-journal.springeropen.com/articles/10.1186/s40543-024-00416-6)
  - **Công bằng**: Quyền truy cập Quantum AI hạn chế (chỉ các tập đoàn lớn?).[](https://www.ijert.org/quantum-computing-and-artificial-intelligence-progress-possibilities-and-gaps)
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Giải thích cách Quantum AI xử lý dữ liệu.
  - Công bằng: Đảm bảo phân phối công bằng tài nguyên lượng tử.
  - Trách nhiệm: Kiểm soát rủi ro an ninh.
- **Nguyên tắc EU AI Act (2024)**:
  - Đảm bảo quản trị rủi ro cao trong Quantum AI (VD: phá mã).
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một công ty sử dụng Quantum AI để tối ưu hóa danh mục đầu tư tài chính, nhưng không công khai nguồn dữ liệu, gây lo ngại về quyền riêng tư và thiên vị.

### 5. Liên kết với các mô-đun khác
- **M4**: Thiết kế prompt cho QML.
- **M9**: Kiểm định đạo đức Quantum AI trong sandbox.
- **M12**: Tích hợp Quantum AI vào sản phẩm.
- **M15**: Tối ưu hóa năng lượng cho quantum hardware.
- **M17**: Tuân thủ quản trị AI trong Quantum AI.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một ứng dụng Quantum AI bạn từng nghe (VD: mô phỏng hóa học). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt để yêu cầu một mô hình QML tối ưu hóa chuỗi cung ứng. So sánh đầu ra classical và quantum-inspired.
3. **Phản xạ đạo đức** (L3):
   - Phân tích case study: Một công ty sử dụng Quantum AI để tối ưu hóa tài chính nhưng không công khai dữ liệu. Điều này có vi phạm UNESCO AI Ethics không? Đề xuất cải thiện theo EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế một hệ thống Quantum AI cho mô phỏng phân tử trong y tế. Mô tả cách tích hợp QEC (M14) và giảm carbon footprint (M15). Phân tích rủi ro an ninh và đề xuất giải pháp.

## Tài liệu tham khảo:
- “Quantum Computing and AI: Progress, Possibilities and Gaps” – Agarwal et al. (2025).[](https://www.ijert.org/quantum-computing-and-artificial-intelligence-progress-possibilities-and-gaps)
- “AI for Quantum Computing” – arXiv (2024).[](https://arxiv.org/html/2411.09131v1)
- “Pasqal’s 2025 Roadmap” – The Quantum Insider (2025).[](https://thequantuminsider.com/2025/05/16/quantum-computing-roadmaps-a-look-at-the-maps-and-predictions-of-major-quantum-players/)
- “Quantum NLP” – Quantinuum (2025).[](https://www.quantinuum.com/blog/quantum-computers-will-make-ai-better)
- UNESCO AI Ethics (2021).
- EU AI Act (2024).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1**: “Quantum AI có thể giúp gì trong công việc hàng ngày của bạn?”
- **L2**: “So sánh cách Quantum AI và Classical AI giải quyết một bài toán tối ưu hóa.”
- **L3**: “Bạn có đồng ý rằng Quantum AI cần khung đạo đức riêng vì rủi ro an ninh không? Tại sao?”
- **L4**: “Làm thế nào để cân bằng hiệu suất và công bằng trong Quantum AI? Phản biện.”