---
title: Các Endpoint REST API
description: Tài liệu đầy đủ các endpoint /api/v1 của Nitrobase cho máy chủ, ứng dụng, template, sao lưu, giám sát và job.
---

Tất cả các đường dẫn dưới đây nằm dưới `https://<panel-cua-ban>/api/v1` và yêu cầu header `Authorization: Bearer nbk_...`. Mọi endpoint đều tự động xuất ra thành công cụ MCP tương ứng (ngoại trừ endpoint stream SSE).

## Máy chủ & Giám sát

| Phương thức | Đường dẫn | Quyền yêu cầu | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/servers` | `server.view` | Liệt kê danh sách máy chủ của đội ngũ. |
| `GET` | `/servers/{serverId}` | `server.view` | Lấy chi tiết một máy chủ. |
| `GET` | `/servers/{serverId}/health` | `server.view` | Trạng thái sức khỏe mới nhất (CPU, RAM, đĩa, load), số ứng dụng/DB và ngưỡng cảnh báo. |
| `GET` | `/servers/{serverId}/metrics/{range}` | `monitoring.view` | Lịch sử chỉ số theo khung thời gian `range` (`1h`, `24h` hoặc `7d`). |

## Templates

| Phương thức | Đường dẫn | Quyền yêu cầu | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/templates` | `app.view` | Liệt kê template khả dụng, biến đầu vào, yêu cầu và cờ `advanced`. |
| `GET` | `/templates/{templateId}/versions` | `app.view` | Liệt kê các phiên bản ổn định và `defaultRef` của một template. |

## Ứng dụng (Apps)

| Phương thức | Đường dẫn | Quyền yêu cầu | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/apps` | `app.view` | Liệt kê các ứng dụng của đội ngũ. |
| `POST` | `/apps/preflight` | `app.deploy` | Kiểm tra pre-flight chỉ đọc cho ứng dụng marketplace mới (`{ ok, checks }`). |
| `POST` | `/apps` | `app.deploy` | Tạo và triển khai ứng dụng từ template marketplace (chạy pre-flight trước; trả về `{ appId, deploymentId }`). |
| `GET` | `/apps/{appId}` | `app.view` | Xem tổng quan ứng dụng (tên miền, service; bí mật được che). |
| `GET` | `/apps/{appId}/env` | `app.view` | Lấy nội dung `.env` và metadata biến với mọi giá trị bí mật đã được che. |
| `POST` | `/apps/{appId}/logs` | `app.view` | Đọc `tail` dòng log container cuối cùng (tùy chọn lọc theo `service`, `timestamps`), đã che bí mật. |
| `GET` | `/apps/{appId}/deployments` | `app.view` | Liệt kê 50 lần triển khai gần nhất của ứng dụng (mới nhất trước). |
| `POST` | `/apps/{appId}/deploy` | `app.deploy` | Không truyền `version`: triển khai lại commit hiện tại. Có `version`: cập nhật sang phiên bản đó (tùy chọn `backupFirst`, `confirmDowngrade`). |
| `POST` | `/apps/{appId}/redeploy` | `app.deploy` | Triển khai lại ứng dụng ở commit đang ghim. |
| `POST` | `/apps/{appId}/start` | `app.deploy` | Khởi động ứng dụng đang dừng, hoặc một `service` (`{ service? }`). |
| `POST` | `/apps/{appId}/stop` | `app.deploy` | Dừng ứng dụng (giữ nguyên dữ liệu), hoặc một `service` (`{ service? }`). |
| `POST` | `/apps/{appId}/restart` | `app.deploy` | Khởi động lại ứng dụng, hoặc một `service` (`{ service? }`). |

## Sao lưu & Jobs

| Phương thức | Đường dẫn | Quyền yêu cầu | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/apps/{appId}/backups` | `backup.view` | Liệt kê các bản sao lưu của ứng dụng (mới nhất trước). |
| `POST` | `/apps/{appId}/backups` | `backup.create` | Tạo bản sao lưu ngay (`{ destinationId? }`; mặc định dùng đích của lịch sao lưu). |
| `GET` | `/backups/destinations` | `backup.view` | Liệt kê điểm lưu trữ sao lưu (`{ id, name, type }`, không chứa khóa bí mật). |
| `GET` | `/jobs` | `server.view` | Liệt kê các job gần đây của đội ngũ (deploy, backup, thao tác máy chủ). |
| `GET` | `/jobs/{jobId}` | `server.view` | Xem trạng thái và chi tiết của một job. |
| `GET` | `/jobs/{jobId}/stream` | `server.view` | Stream log job trực tiếp qua Server-Sent Events (SSE). |

## Ví dụ gọi API

```bash
# Liệt kê ứng dụng
curl -H "Authorization: Bearer $TOKEN" https://panel.example.com/api/v1/apps

# Kích hoạt triển khai lại (trả về { "deploymentId": "..." })
curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://panel.example.com/api/v1/apps/<appId>/redeploy

# Đọc 100 dòng log mới nhất (đã che bí mật)
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"tail": 100}' \
  https://panel.example.com/api/v1/apps/<appId>/logs
```
