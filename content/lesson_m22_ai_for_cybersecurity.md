# M22: AI for Cybersecurity (AI An ninh mạng)

## Mục tiêu học tập
Sau bài học này, bạn sẽ:
- Hiểu cách AI được ứng dụng trong an ninh mạng (phát hiện mối đe dọa, bảo mật mạng, phản ứng sự cố).
- Biết cách sử dụng các thuật toán AI (machine learning, deep learning) để phát hiện tấn công mạng.
- Nhận thức được các vấn đề đạo đức khi sử dụng AI trong an ninh mạng (quyền riêng tư, minh bạch).
- Thực hành xây dựng một mô hình AI đơn giản để phát hiện bất thường trong dữ liệu mạng bằng Python.
- Phản xạ về các tình huống đạo đức liên quan đến AI an ninh mạng (liên kết với M9).

## Nội dung bài học

### 1. Tổng quan về AI trong an ninh mạng
- **AI an ninh mạng là gì?**
  - AI được sử dụng để tự động hóa phát hiện mối đe dọa, phân tích hành vi, và phản ứng với các cuộc tấn công mạng.
  - Ví dụ: Phát hiện mã độc, giám sát lưu lượng mạng, dự đoán tấn công DDoS.
- **Ứng dụng chính**:
  - **Phát hiện bất thường (Anomaly Detection)**: Sử dụng machine learning để nhận diện hành vi bất thường.
  - **Phân loại mã độc (Malware Classification)**: Deep learning phân loại phần mềm độc hại.
  - **Phản ứng tự động (Automated Response)**: AI ra quyết định khắc phục (VD: chặn IP độc hại).
  - **Threat Intelligence**: Phân tích dữ liệu từ X, web để dự đoán mối đe dọa.
- **Xu hướng 2025**:
  - AI đối kháng (Adversarial AI) để kiểm tra lỗ hổng.
  - Tích hợp AI với blockchain để bảo mật giao dịch.
  - AI đa phương thức phân tích hình ảnh, văn bản, và log mạng.

### 2. Các thuật toán AI trong an ninh mạng
- **Machine Learning**:
  - **Supervised Learning**: Phân loại email lừa đảo (spam/phishing) bằng SVM, Random Forest.
  - **Unsupervised Learning**: Phát hiện bất thường bằng K-Means, Autoencoders.
- **Deep Learning**:
  - CNN: Phân tích hình ảnh mã độc (malware visualization).
  - RNN/LSTM: Dự đoán chuỗi tấn công dựa trên log mạng.
- **Reinforcement Learning**: Tối ưu hóa phản ứng tự động (VD: bot bảo mật).

### 3. Ví dụ thực tế
- **CrowdStrike (2025)**: Sử dụng AI để phát hiện ransomware trong thời gian thực.
- **Darktrace**: Hệ thống AI tự học giám sát mạng doanh nghiệp.
- **Palo Alto Networks**: Tích hợp AI vào firewall để chặn zero-day attacks.
- **Vụ việc đạo đức (2025)**: Một AI giám sát mạng thu thập dữ liệu người dùng mà không thông báo, vi phạm GDPR (xem case study `m22_cybersecurity_ethics` trong `sandbox_ethics_dual.yaml`).

### 4. Thực hành: Xây dựng mô hình phát hiện bất thường bằng Python
**Mô tả**: Sử dụng Isolation Forest để phát hiện bất thường trong dữ liệu mạng (log truy cập giả lập).

#### Yêu cầu
- Python 3.8+, thư viện: `scikit-learn`, `pandas`, `numpy`.
- Dữ liệu mẫu: Log truy cập mạng (tạo dữ liệu giả lập).

#### Code mẫu
```python
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# Tạo dữ liệu giả lập (log truy cập mạng)
np.random.seed(42)
normal_data = np.random.normal(loc=100, scale=10, size=(1000, 2))  # Lưu lượng bình thường
anomaly_data = np.random.normal(loc=200, scale=50, size=(50, 2))  # Lưu lượng bất thường
data = np.vstack([normal_data, anomaly_data])
df = pd.DataFrame(data, columns=['bytes_sent', 'bytes_received'])

# Huấn luyện Isolation Forest
model = IsolationForest(contamination=0.05, random_state=42)
df['anomaly'] = model.fit_predict(df)

# Kết quả: -1 (bất thường), 1 (bình thường)
df['anomaly'] = df['anomaly'].map({1: 'Normal', -1: 'Anomaly'})

# Trực quan hóa
plt.scatter(df['bytes_sent'], df['bytes_received'], c=df['anomaly'].map({'Normal': 'blue', 'Anomaly': 'red'}))
plt.xlabel('Bytes Sent')
plt.ylabel('Bytes Received')
plt.title('Phát hiện bất thường trong lưu lượng mạng')
plt.show()

# In số lượng bất thường
print(f"Số điểm bất thường: {len(df[df['anomaly'] == 'Anomaly'])}")
```

#### Hướng dẫn thực hành
1. Chạy code trên Google Colab hoặc môi trường Python local.
2. Tạo dữ liệu giả lập hoặc sử dụng dataset thực tế (VD: KDD Cup 1999).
3. Điều chỉnh tham số `contamination` để thay đổi ngưỡng phát hiện bất thường.
4. Ghi lại kết quả và thảo luận: Làm thế nào để cải thiện mô hình?

### 5. Phản xạ đạo đức (Liên kết với M9)
**Tình huống đạo đức** (từ `sandbox_ethics_dual.yaml`, case `m22_cybersecurity_ethics`):
- Một AI an ninh mạng giám sát lưu lượng mạng nhưng thu thập dữ liệu người dùng mà không thông báo, vi phạm GDPR.
- **Câu hỏi phản xạ**:
  1. Hành vi này có vi phạm quyền riêng tư theo UNESCO AI Ethics và GDPR không?
  2. Luật Việt Nam có yêu cầu thông báo thu thập dữ liệu không?
  3. Là kỹ sư AI, bạn sẽ cải thiện hệ thống như thế nào để đảm bảo đạo đức?

**Hướng dẫn**:
- Phản hồi theo 2 góc độ: (1) Quốc tế (UNESCO, GDPR); (2) Địa phương (luật Việt Nam).
- Đề xuất giải pháp: Minh bạch hóa thu thập dữ liệu, mã hóa dữ liệu người dùng, yêu cầu đồng thuận.

### 6. Bài tập cuối bài
1. **Lý thuyết**:
   - So sánh ưu/nhược điểm của Isolation Forest và Autoencoders trong phát hiện bất thường.
   - Tại sao AI đối kháng (Adversarial AI) quan trọng trong an ninh mạng?
2. **Thực hành**:
   - Sử dụng dataset KDD Cup 1999 (hoặc dữ liệu giả lập) để huấn luyện mô hình Random Forest phân loại tấn công mạng.
   - Báo cáo kết quả: Độ chính xác, recall, precision.
3. **Phản xạ đạo đức**:
   - Phân tích case study `m22_cybersecurity_ethics` và đề xuất quy trình thu thập dữ liệu hợp pháp.

### 7. Tài liệu tham khảo
- **Sách**: “Machine Learning for Cybersecurity Cookbook” (Emmanuel Tsukerman, 2020).
- **Nguồn online**:
  - EU AI Act (2024): https://eur-lex.europa.eu
  - UNESCO AI Ethics (2021): https://unesdoc.unesco.org
  - KDD Cup 1999 Dataset: http://kdd.ics.uci.edu
- **Công cụ**:
  - Scikit-learn: https://scikit-learn.org
  - TensorFlow: https://tensorflow.org

### 8. Quiz liên quan
- Xem `quiz_m22.yaml` (gợi ý: Tạo quiz với 5 câu hỏi về thuật toán, đạo đức, và ứng dụng thực tế).

## Lưu ý triển khai
- **Ngôn ngữ**: Bài học hỗ trợ tiếng Việt và tiếng Anh (tự động chuyển đổi theo input người dùng).
- **Phản xạ**: Sử dụng `reflex_macro.yaml` để trả lời theo mode (general, depth, expert).
- **Bảo mật**: Không tiết lộ code hoặc dữ liệu nhạy cảm trừ khi được yêu cầu rõ ràng (`systemfileguard`).