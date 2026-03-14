```markdown
# M23: AI Agents (Tác nhân AI)

## Giới thiệu
Chào mừng bạn đến với mô-đun **M23: AI Agents**, nơi bạn sẽ khám phá cách các tác nhân AI (AI Agents) hoạt động như những thực thể thông minh, tự động hóa các tác vụ phức tạp. Khác với các mô hình ngôn ngữ truyền thống, AI Agents kết hợp lý luận, hành động và trí nhớ để giải quyết các vấn đề thực tế. Mô-đun này sẽ tập trung vào kiến trúc, phương pháp ReAct/Planning, và các guardrails đảm bảo an toàn và đạo đức.

## Nội dung chi tiết

### 1. Kiến trúc của AI Agents
- **Agent**: Trung tâm của hệ thống, chịu trách nhiệm ra quyết định dựa trên đầu vào.
- **Tool**: Các công cụ hỗ trợ (VD: API, công cụ tìm kiếm) mà agent sử dụng.
- **Memory**: Bộ nhớ ngắn hạn và dài hạn để lưu trữ ngữ cảnh và học hỏi từ kinh nghiệm.
- Ví dụ: Một agent hỗ trợ khách hàng có thể dùng tool để kiểm tra đơn hàng và memory để ghi nhớ yêu cầu trước đó.

### 2. ReAct và Planning
- **ReAct (Reasoning + Acting)**: Kết hợp lý luận (lập kế hoạch) và hành động (thực thi). Agent phân tích tình huống, lập kế hoạch, rồi thực hiện.
  - Ví dụ: Agent y tế phân tích triệu chứng, lập kế hoạch hỏi thêm, và đề xuất giải pháp.
- **Planning**: Quy trình lập kế hoạch chi tiết trước khi hành động, tối ưu cho tác vụ phức tạp.
  - Ví dụ: Agent quản lý lịch trình lên kế hoạch cho cả tuần dựa trên lịch họp.

### 3. Guardrails (Rào cản an toàn)
- Đảm bảo agent hoạt động trong giới hạn đạo đức và an toàn.
- Các rào cản bao gồm:
  - **An toàn dữ liệu**: Bảo vệ thông tin cá nhân (tuân thủ GDPR, Nghị định 13/2023).
  - **Đạo đức AI**: Tránh đưa ra lời khuyên sai lệch (theo UNESCO AI Ethics).
  - Ví dụ: Agent y tế từ chối kê đơn thuốc nếu không có thông tin đầy đủ.

### 4. Ứng dụng thực tế
- **Hỗ trợ khách hàng**: Agent tự động trả lời câu hỏi, xử lý khiếu nại.
- **Y tế**: Hỗ trợ chẩn đoán sơ bộ, nhắc nhở uống thuốc.
- **Giáo dục**: Cá nhân hóa bài học (tương tự DorjeX | AI Tutor).

## Ví dụ thực tế
Giả sử bạn là một agent hỗ trợ khách hàng:
- **Đầu vào**: "Tôi muốn đổi hàng vì sản phẩm lỗi."
- **Quy trình**:
  1. Agent dùng tool kiểm tra đơn hàng (memory: ID #123).
  2. ReAct: Lý luận rằng cần xác nhận lỗi, lập kế hoạch gửi email.
  3. Hành động: Gửi email yêu cầu ảnh lỗi, tuân thủ guardrails (không tiết lộ thông tin cá nhân).
- **Kết quả**: Khách hàng nhận email và giải pháp trong 5 phút.

## Câu hỏi thực hành
1. Hãy mô tả kiến trúc cơ bản của một AI Agent (agent, tool, memory).
2. So sánh ReAct và Planning trong một tình huống cụ thể (VD: quản lý lịch trình).
3. Đưa ra một guardrail để bảo vệ quyền riêng tư trong agent y tế.
   - **Lưu ý**: Kiểm tra câu trả lời của bạn với `quiz_m23.yaml` để tự đánh giá.

## Tài liệu tham khảo
- Xem thêm về ReAct: [Tài liệu ReAct](https://arxiv.org/abs/2210.03629).
- Hướng dẫn guardrails: [UNESCO AI Ethics](https://en.unesco.org/ai-ethics).

## Lưu ý
- Hoàn thành quiz M23 (`quiz_m23.yaml`) với điểm ≥80% để nhận chứng chỉ.
- Báo cáo bất kỳ lỗi nào qua `feedback_form_macro.yaml`.
```