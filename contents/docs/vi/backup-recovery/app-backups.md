---
title: Sao lưu App & Lập lịch tự động
description: Thiết lập lịch trình sao lưu tự động cho ứng dụng và database kèm chính sách lưu giữ.
---

## Cấu hình sao lưu tự động
1. Mở Ứng dụng hoặc Cơ sở dữ liệu của bạn trên dashboard.
2. Chuyển tới tab **Backups**.
3. Chọn **Điểm lưu trữ (Destination)**.
4. Đặt tần suất sao lưu theo cú pháp cron (ví dụ: `0 2 * * *` cho mỗi ngày lúc 2:00 sáng).
5. Cài đặt **Số bản lưu giữ (Retention)** (ví dụ: giữ lại 7 bản gần nhất).

## Cơ chế bù lịch sao lưu (BACKUP_CATCH_UP)
Nếu máy chủ của bạn bị tắt hoặc khởi động lại đúng vào giờ chạy backup theo lịch, SaaSBase sẽ tự động phát hiện và kích hoạt ngay 1 bản backup bù khi hệ thống khởi động lại.
