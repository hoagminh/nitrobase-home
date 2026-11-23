---
title: Stream log Job thời gian thực (SSE)
description: Theo dõi trực tiếp log triển khai, build và sao lưu qua Server-Sent Events (SSE) có hỗ trợ nối tiếp bằng Last-Event-ID.
---

Các endpoint tác động hệ thống như deploy, redeploy, start, stop, restart, tạo ứng dụng và sao lưu sẽ trả về ngay một mã job (`deploymentId`). Bạn có thể kiểm tra định kỳ qua `GET /api/v1/jobs/{jobId}` hoặc theo dõi log trực tiếp theo thời gian thực qua **Server-Sent Events (SSE)**.

## Endpoint

```http
GET /api/v1/jobs/{jobId}/stream
Authorization: Bearer nbk_...
Accept: text/event-stream
```

Yêu cầu quyền `server.view`.

## Ví dụ với `curl`

```bash
curl -N -H "Authorization: Bearer $TOKEN" \
  https://panel.example.com/api/v1/jobs/<jobId>/stream
```

## Hành vi của luồng sự kiện

- **Sự kiện `log`:** Phát ngay khi có dòng log mới (đệm bộ nhớ tối đa `JOB_MEMORY_LINES=2000` dòng và ghi theo lô vào PostgreSQL).
- **Sự kiện `complete`:** Gửi một lần khi job kết thúc (thành công, thất bại hoặc bị hủy), sau đó đóng kết nối.
- **Heartbeat giữ kết nối:** Gửi tín hiệu định kỳ mỗi `15s` (`SSE_HEARTBEAT_MS`) để proxy không ngắt kết nối trong quá trình kéo image hoặc build kéo dài.
- **Nối tiếp sau mất mạng:** Truyền header `Last-Event-ID` khi kết nối lại để tiếp tục nhận từ dòng log cuối cùng mà không bị mất nội dung.
