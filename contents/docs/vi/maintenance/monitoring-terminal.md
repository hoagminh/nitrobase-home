---
title: Giám sát, Log & Web Terminal
description: Giám sát chỉ số máy chủ và container trực tiếp, nén dữ liệu lịch sử, luật cảnh báo tích hợp, stream log và Web Terminal xterm.js.
---

Nitrobase thu thập thông số máy chủ và container trực tiếp qua SSH hoặc thực thi cục bộ — không cần cài thêm Prometheus, Grafana hay agent ngoài.

## Giám sát máy chủ & Container

- **Vòng lặp thu thập:** Lấy mẫu mỗi `15s` trên mọi máy chủ sẵn sàng (`MONITORING_INTERVAL_MS`, bật/tắt qua `MONITORING_ENABLED=true`) gồm CPU, load average, RAM, swap, dung lượng đĩa, lưu lượng mạng và trạng thái/tài nguyên từng container.
- **Lưu trữ & gộp dữ liệu:** Mẫu thô lưu trong `24` giờ (`METRICS_RAW_RETENTION_HOURS`), sau đó gộp theo từng khung `5` phút và lưu trong `7` ngày (`METRICS_ROLLUP_RETENTION_DAYS`) để hiển thị biểu đồ `1h`, `24h` và `7d`.
- **Các luật cảnh báo tích hợp:**
  - **Ổ cứng đầy:** Mở cảnh báo ở `85%` (`ALERT_DISK_PERCENT`), tự đóng khi giảm xuống dưới `80%` (`ALERT_HYSTERESIS_PERCENT=5`).
  - **RAM cao:** Mở cảnh báo ở `90%` (`ALERT_MEMORY_PERCENT`), tự đóng dưới `85%`.
  - **Vòng lặp khởi động lại (Restart loop):** Kích hoạt khi container khởi động lại `3` lần trong `10` phút (`ALERT_RESTART_LOOP_COUNT`, `ALERT_RESTART_LOOP_WINDOW_MINUTES`).
  - **OOM kill & dịch vụ dừng:** Phát hiện trực tiếp từ trạng thái container.
  - **Mất kết nối máy chủ:** Kích hoạt sau `3` chu kỳ thu thập thất bại liên tiếp (`ALERT_UNREACHABLE_FAILURES`).
  - **Tự chữa lành mạng proxy:** Tự động gắn lại container bị tách khỏi `nitrobase-network`, hoặc phát cảnh báo `network_flap` sau `3` lần sửa liên tiếp (`NETWORK_REPAIR_MAX_ATTEMPTS`).

## Xem Log trực tiếp

Theo dõi stdout/stderr của container theo thời gian thực ngay trên trình duyệt (`/api/apps/<appId>/logs`) hoặc đọc log đã che bí mật qua REST API / MCP server (`POST /api/v1/apps/{appId}/logs`). Giá trị bí mật tự động bị che trước khi rời máy chủ. Hỗ trợ tối đa `4` luồng log đồng thời mỗi người dùng (`APP_LOG_STREAMS_PER_USER`).

## Web Terminal tương tác

Mở terminal PTY đầy đủ sử dụng **xterm.js** qua WebSocket:

- **Terminal máy chủ** (quyền `server.terminal`): Truy cập shell trực tiếp trên VPS từ xa hoặc Localhost.
- **Terminal container** (quyền `app.terminal`): Mở shell `docker exec` bên trong bất kỳ container ứng dụng nào đang chạy.
- **Bảo mật:** Xác thực lại phiên mỗi `30s` (`SESSION_REVALIDATE_INTERVAL_MS`), đóng ngay lập tức nếu phiên bị thu hồi, tự ngắt sau `30` phút không hoạt động (`TERMINAL_IDLE_TIMEOUT_MS`) và ghi nhận đầy đủ vào Audit Log.
