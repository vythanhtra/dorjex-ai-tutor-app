# M16 – Federated Learning

## Mục tiêu học:
- Hiểu khái niệm Federated Learning và vai trò trong bảo mật dữ liệu, học phân tán (2025).
- Nắm các kỹ thuật như FedAvg, differential privacy, và secure multi-party computation.
- Phân tích rủi ro đạo đức (quyền riêng tư, thiên vị, minh bạch) và đề xuất giải pháp tuân thủ UNESCO AI Ethics, EU AI Act.

## Nội dung chính:
### 1. Khái niệm Federated Learning
- **Federated Learning là gì?**: Phương pháp học máy phân tán, huấn luyện mô hình trên dữ liệu cục bộ của client (VD: điện thoại, bệnh viện) mà không chia sẻ dữ liệu thô.
- **So sánh với Centralized Learning**:
  - Centralized: Dữ liệu tập trung trên server (rủi ro quyền riêng tư cao).
  - Federated: Dữ liệu ở lại client, chỉ gửi model updates (VD: Google Health).
- **Ví dụ thực tiễn**:
  - Y tế: Chẩn đoán ung thư qua FL (NVIDIA Clara).
  - Tài chính: Cá nhân hóa dịch vụ ngân hàng.
  - IoT: Cải thiện AI trên thiết bị edge (Apple’s Siri).

### 2. Kỹ thuật trong Federated Learning
- **Federated Averaging (FedAvg)**:
  - Tổng hợp trọng số mô hình từ các client (McMahan et al., 2017).
  - Ứng dụng: Google Keyboard, TensorFlow Federated.
- **Differential Privacy**:
  - Thêm nhiễu để bảo vệ dữ liệu cá nhân (VD: Apple’s FL).
  - Trade-off: Bảo mật vs. hiệu suất mô hình.
- **Secure Multi-Party Computation (SMPC)**:
  - Mã hóa model updates để bảo mật (Intel’s OpenFL).
- **Model Compression**:
  - Pruning, quantization để giảm communication costs (liên kết M15).
- **Handling Heterogeneous Data**:
  - FedProx, SCAFFOLD giải quyết dữ liệu không đồng nhất.
- **Frameworks**:
  - TensorFlow Federated, PySyft, FedML (2025).

### 3. Ứng dụng thực tiễn
- **Y tế**: Mô hình chẩn đoán phân tán (Google Health, NVIDIA Clara).
- **Tài chính**: Cá nhân hóa mà không chia sẻ dữ liệu khách hàng.
- **IoT**: AI trên điện thoại, xe tự hành (Apple, Tesla).
- **Quảng cáo**: Cá nhân hóa quảng cáo bảo mật (Google Ads).

### 4. Đạo đức trong Federated Learning
- **Rủi ro**:
  - **Quyền riêng tư**: Data leakage qua model updates (gradient inversion attacks).
  - **Thiên vị**: Dữ liệu client không đại diện (VD: chỉ từ một nhóm dân số).
  - **Minh bạch**: Thiếu công khai cách tổng hợp dữ liệu.
- **Nguyên tắc UNESCO AI Ethics (2021)**:
  - Minh bạch: Giải thích cách FL xử lý dữ liệu.
  - Công bằng: Đảm bảo dữ liệu đại diện.
  - Trách nhiệm: Kiểm soát rủi ro data leakage.
- **Nguyên tắc EU AI Act (2024)**:
  - Tuân thủ GDPR, báo cáo rủi ro quyền riêng tư.
- **Ví dụ case study** (từ sandbox_ethics_dual.yaml):
  - Một bệnh viện tại EU (2025) sử dụng FL để huấn luyện mô hình chẩn đoán ung thư nhưng không công khai cách tổng hợp dữ liệu, gây lo ngại về quyền riêng tư.

### 5. Liên kết với các mô-đun khác
- **M4**: Thiết kế prompt cho FL.
- **M9**: Kiểm định đạo đức FL trong sandbox.
- **M12**: Tích hợp FL vào sản phẩm.
- **M13**: FL cho AI đa mô thức.
- **M15**: Tối ưu năng lượng trong FL.
- **M17**: Tuân thủ quản trị AI.

## Bài tập gợi ý:
1. **Mô tả ứng dụng** (L1):
   - Mô tả một ứng dụng Federated Learning bạn từng thấy (VD: AI trên điện thoại). Giải thích cách nó hoạt động (100-150 từ).
2. **Thiết kế prompt** (L2):
   - Viết prompt để yêu cầu mô hình FL cá nhân hóa quảng cáo. So sánh đầu ra với centralized learning.
3. **Phản xạ đạo đức** (L3):
   - Phân tích case study: Bệnh viện EU sử dụng FL nhưng không công khai dữ liệu tổng hợp. Điều này có vi phạm UNESCO AI Ethics không? Đề xuất cải thiện theo EU AI Act.
4. **Tư duy chuyên gia** (L4):
   - Thiết kế hệ thống FL cho chẩn đoán y tế. Mô tả cách tích hợp differential privacy (M16) và giảm năng lượng (M15). Phân tích rủi ro thiên vị và đề xuất giải pháp.

## Tài liệu tham khảo:
- “Federated Learning: Collaborative ML without Centralized Data” – McMahan et al. (2017).
- “Advances in Differential Privacy for FL” – Dwork et al. (2024).
- “FedML: A Research Platform for FL” – FedML (2025).
- UNESCO AI Ethics (2021).
- EU AI Act (2024).

## Câu hỏi phản xạ (tích hợp macro_prompt_template_optin.yaml):
- **L1**: “Federated Learning có thể giúp gì trong cuộc sống hàng ngày của bạn?”
- **L2**: “So sánh cách Federated Learning và Centralized Learning bảo vệ dữ liệu.”
- **L3**: “Bạn có đồng ý rằng mọi mô hình FL cần công khai cách tổng hợp dữ liệu không? Tại sao?”
- **L4**: “Làm thế nào để cân bằng hiệu suất và quyền riêng tư trong FL? Phản biện.”