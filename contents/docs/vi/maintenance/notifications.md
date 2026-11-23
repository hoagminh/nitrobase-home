---
title: Cảnh báo & Thông báo
description: Cấu hình kênh Email (SMTP), Discord, Slack, Telegram và Webhook ký HMAC-SHA256 kèm chống lặp và phân loại sự kiện.
---

Cấu hình các kênh thông báo tại **Settings → Notifications** (quyền `notification.manage`) để nhận cảnh báo tức thì về job, sao lưu, ngưỡng giám sát, chứng chỉ TLS, cập nhật và sự kiện bảo mật.

## Các kênh thông báo hỗ trợ

| Kênh | Cấu hình | Ghi chú |
| :--- | :--- | :--- |
| **Email (SMTP)** | Host, cổng (`587`/`465`), mã hóa (`STARTTLS`, `TLS` hoặc `None` trên mạng nội bộ), tài khoản, địa chỉ gửi/nhận. | Hỗ trợ danh sách nhiều người nhận cách nhau bằng dấu phẩy. |
| **Discord** | Discord Webhook URL của kênh. | Yêu cầu HTTPS công khai mặc định; có tùy chọn mạng nội bộ. |
| **Slack** | Slack Incoming Webhook URL. | Yêu cầu HTTPS công khai mặc định; có tùy chọn mạng nội bộ. |
| **Telegram** | Bot Token (từ `@BotFather`) và Chat ID dạng số hoặc `@channelname`. | Bot phải là thành viên của nhóm/kênh nhận tin. |
| **Webhook** | URL nhận JSON `POST` + khóa ký 64 ký tự hex tự sinh. | Ký bằng HMAC-SHA256 trong header `x-nitrobase-signature` (cùng `x-nitrobase-timestamp`, `x-nitrobase-event`, `x-nitrobase-delivery`). |

## Các nhóm sự kiện

Mỗi kênh cho phép tùy chọn đăng ký từng loại sự kiện:

- **Jobs:** Job triển khai thành công/thất bại, build Git thành công/thất bại, tác vụ định kỳ lỗi/bị bỏ qua, push webhook bị từ chối.
- **Sao lưu:** `backup.failed`, `backup.stale` (không có bản sao lưu thành công trong `BACKUP_STALE_DAYS`, mặc định 2 ngày).
- **Giám sát:** `alert.opened`, `alert.resolved`, `server.unreachable`, `server.reachable`.
- **Tên miền & Chứng chỉ:** `cert.expiring` (sắp hết hạn trong 14 ngày), `cert.error`.
- **Cập nhật:** `app.update_available`, `app.update_rolled_back`, `app.update_failed`.
- **Bảo mật (Quan trọng):** `security.new_login` (đăng nhập từ thiết bị/IP mới), `security.2fa_disabled` và `security.secret_revealed` (tùy chọn bật).

## Độ tin cậy & Chống bão cảnh báo

- **Thử lại tự động:** Giao hàng thất bại sẽ thử lại tối đa `4` lần (`NOTIFY_MAX_ATTEMPTS`) với thời gian chờ tăng dần từ `5s`.
- **Chống lặp & Giới hạn tần suất:** Các sự kiện trùng `(event, subject)` trên cùng một kênh được gộp trong `30` phút (`NOTIFY_DEDUPE_WINDOW_MS`), tối đa `30` lần gửi/giờ mỗi kênh (`NOTIFY_RATE_LIMIT`).
- **Ưu tiên sự kiện bảo mật:** Các sự kiện bảo mật (`security.new_login`, `security.2fa_disabled`, `security.secret_revealed`) **không bao giờ** bị gộp hay giới hạn tần suất để bão cảnh báo không thể che khuất sự cố bảo mật.
- **Ngôn ngữ thông báo:** Cấu hình qua `NOTIFY_LOCALE` (mặc định `en`, hỗ trợ `vi`). Lịch sử gửi lưu trong `30` ngày.
