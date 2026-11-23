---
title: Tự sao lưu Nitrobase (Self-Backup)
description: Sao lưu mã hóa cơ sở dữ liệu điều khiển của chính Nitrobase, định dạng manifest và mã hóa OpenSSL.
---

Ngoài sao lưu các ứng dụng, Nitrobase còn tự sao lưu cơ sở dữ liệu PostgreSQL của chính bảng điều khiển (máy chủ, ứng dụng, khóa đã mã hóa, tên miền, lịch trình, nhật ký kiểm toán và cấu hình đội ngũ) tại **Data → Backups** (yêu cầu quyền `instance.manage` dành cho Quản trị viên hệ thống).

## Thành phần của bản Self-Backup

Mỗi bản tự sao lưu được tải lên theo đường dẫn `nitrobase/<date>-<id>.tar.gz.enc` kèm mã kiểm tra SHA-256:

1. **Bản dump PostgreSQL (`nitrobase.sql`):** Bản dump logic đầy đủ tạo bằng `pg_dump` (`SELF_BACKUP_PG_DUMP`).
2. **Manifest:** Siêu dữ liệu gồm phiên bản schema/ứng dụng, thời điểm và định danh instance.
3. **Mã hóa OpenSSL phổ thông:** Gói tar.gz được mã hóa bằng OpenSSL `aes-256-cbc` với PBKDF2-SHA256 (`SELF_BACKUP_PBKDF2_ITERATIONS=200000`) sử dụng `ENCRYPTION_KEY`, cho phép giải mã độc lập trên mọi máy tính.

## Bắt buộc tự sao lưu trước khi nâng cấp

Mỗi khi bạn bấm nâng cấp Nitrobase ngay trong giao diện (**Settings → Instance**), hệ thống bắt buộc tạo một bản tự sao lưu mới tới điểm lưu trữ bạn chọn trước khi tải image mới hoặc chạy migration cơ sở dữ liệu.

:::caution[Lưu ENCRYPTION_KEY tách biệt]
Cả tệp tự sao lưu lẫn các bí mật bên trong cơ sở dữ liệu đều được mã hóa bằng `ENCRYPTION_KEY`. Hãy lưu `.env` (hoặc `ENCRYPTION_KEY`) trong trình quản lý mật khẩu riêng — không bao giờ lưu chung vào cùng bucket chứa bản sao lưu.
:::
