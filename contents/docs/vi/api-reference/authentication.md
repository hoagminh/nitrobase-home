---
title: Xác thực API
description: Tạo API token cá nhân và đội ngũ (nbk_...), các bộ quyền mẫu (preset), thời hạn và giới hạn tần suất cho REST và MCP.
---

Nitrobase cung cấp REST API theo phạm vi đội ngũ tại `/api/v1` và máy chủ Model Context Protocol (MCP) tại `/api/mcp`. Cả hai đều dùng chung Bearer API token có tiền tố `nbk_`.

## Tạo API Token

1. Vào **Settings → API tokens**.
2. Nhấn **Create token** (token cá nhân hoạt động trong giới hạn quyền của bạn; token đội ngũ yêu cầu quyền `tokens.manage`).
3. Chọn một **Preset** có sẵn hoặc tự chọn từng quyền, và đặt thời hạn (tối đa `API_TOKEN_MAX_TTL_DAYS`, mặc định `365` ngày):
   - **Read-only:** Chỉ đọc danh sách máy chủ, ứng dụng, job, sao lưu và chỉ số giám sát; không thay đổi dữ liệu.
   - **Deployer (CI):** `app.deploy` (kèm quyền xem tương ứng) — triển khai, triển khai lại, khởi động lại ứng dụng và theo dõi job.
   - **Backups operator:** `backup.create` (kèm quyền xem) — kích hoạt và liệt kê bản sao lưu.
   - **Admin:** Toàn bộ quyền trong đội ngũ mà bạn đang sở hữu.
   - **AI agent (read-only):** `server.view`, `app.view`, `backup.view`, `monitoring.view` — mọi công cụ MCP chỉ đọc ngoại trừ `preflight_app` (cần `app.deploy`).
   - **AI agent (operator):** Gồm quyền chỉ đọc của agent cộng thêm `app.deploy` và `backup.create` — đọc mọi thứ, tạo, triển khai, bật/tắt/khởi động lại và sao lưu ứng dụng.
4. Sao chép token vừa tạo (`nbk_...`). Token chỉ hiển thị **duy nhất một lần** và chỉ lưu dưới dạng mã băm.

## Xác thực yêu cầu

Gửi token trong header `Authorization`:

```bash
curl -H "Authorization: Bearer nbk_your_token_here" \
  https://panel.example.com/api/v1/apps
```

## Giới hạn tần suất & Nhật ký kiểm toán

- **Rate limit:** `120` yêu cầu mỗi phút cho mỗi token (hoặc theo IP trước khi xác thực), cấu hình qua `API_RATE_LIMIT` và `API_RATE_WINDOW_MS`. Vượt ngưỡng trả về HTTP `429`.
- **Audit log:** Mọi yêu cầu REST và MCP đều được ghi nhận trong nhật ký kiểm toán của đội ngũ (lời gọi MCP gắn nhãn `channel: mcp`).
- **Mã trạng thái:** `401` (thiếu, sai, đã thu hồi hoặc hết hạn token), `403` (token không đủ quyền), `404` (không tìm thấy tài nguyên trong đội ngũ), `429` (vượt giới hạn tần suất).
