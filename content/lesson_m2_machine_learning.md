# M2 – Machine Learning

## Mục tiêu học:
- Nắm khái niệm cơ bản về Machine Learning (ML), học có giám sát và không giám sát.
- Phân biệt Regression vs Classification, hiểu các thuật toán hiện đại.
- Hiểu rủi ro đạo đức trong dữ liệu huấn luyện và liên kết với Federated Learning.

## Nội dung chính:
### 1. Khái niệm Machine Learning
- **ML là gì?**: Học từ dữ liệu để dự đoán hoặc ra quyết định mà không cần lập trình rõ ràng.
- **Học có giám sát**: Dữ liệu có nhãn (VD: dự đoán giá nhà, phân loại email spam).
- **Học không giám sát**: Dữ liệu không có nhãn (VD: phân cụm khách hàng).
- **Federated Learning**: Huấn luyện mô hình trên dữ liệu phân tán, bảo vệ quyền riêng tư (liên kết với M16).

### 2. Thuật toán cơ bản và hiện đại
- **Linear Regression**: Dự đoán giá trị liên tục (VD: giá nhà).
- **KNN (K-Nearest Neighbors)**: Phân loại dựa trên láng giềng gần nhất.
- **Gradient Boosting (XGBoost)**: Tăng hiệu suất dự đoán (VD: phân loại bệnh).
- **Đường học**: Input → Feature engineering → Training → Prediction.

### 3. Ứng dụng thực tiễn
- **Dự đoán điểm thi**: Dựa trên giờ học và dữ liệu lịch sử.
- **Phân loại email**: Spam/not spam.
- **Y tế**: Phân loại bệnh dựa trên dữ liệu hình ảnh (liên kết với M13).

### 4. Đạo đức trong ML
- **Rủi ro**: Thiên vị trong dữ liệu (VD: mô hình phân loại email thiên vị ngôn ngữ).
- **Nguyên tắc ISO/IEC 42001**: Minh bạch, công bằng.
- **Ví dụ**: Một mô hình dự đoán tín dụng thiên vị dựa trên khu vực địa lý.

## Bài tập gợi ý:
1. **Dự đoán đơn giản** (L1): Dùng Linear Regression để dự đoán điểm thi dựa trên giờ học (mô tả cách thực hiện).
2. **Phân loại** (L2): Mô tả cách dùng KNN để phân loại email spam/not spam từ dữ liệu mẫu.
3. **Phản xạ đạo đức** (L3): Phân tích rủi ro thiên vị trong mô hình dự đoán tín dụng. Đề xuất cách giảm thiên vị (VD: kiểm tra dữ liệu huấn luyện).
4. **Tư duy chuyên gia** (L4): So sánh XGBoost và Linear Regression trong dự đoán y tế. Làm thế nào để tích hợp Federated Learning vào mô hình này?

## Tài liệu tham khảo:
- “Machine Learning Yearning” – Andrew Ng.
- UNESCO AI Ethics (2021).
- Liên kết với M16 (Federated Learning), M17 (AI Governance).