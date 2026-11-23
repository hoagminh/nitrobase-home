---
title: Sao lưu ứng dụng & Lịch trình
description: Sao lưu nhất quán cơ sở dữ liệu + volume (.tar.zst), lịch cron tự động, chính sách lưu giữ, chạy bù và khôi phục có xác minh.
---

Mọi ứng dụng marketplace, cơ sở dữ liệu độc lập và custom compose đều có thể sao lưu thủ công hoặc theo lịch định kỳ, sau đó khôi phục tại chỗ hoặc nhân bản thành một ứng dụng mới hoàn toàn.

## Cấu trúc một bản sao lưu ứng dụng

Bản sao lưu được tạo ngay trên máy chủ của ứng dụng bằng container công cụ cô lập dùng một lần (`nitrobase-backup-tools`, không mạng, không `MKNOD`) thành tệp nén zstd (`.tar.zst`, mức nén `BACKUP_ZSTD_LEVEL=6`) và tải lên qua `rclone`:

- `manifest.json`: App ID, phiên bản template, commit SHA đã ghim cùng mã SHA-256 và kích thước của từng thành phần.
- `env.enc`: Tệp `.env` và bí mật theo service của ứng dụng, mã hóa bằng `ENCRYPTION_KEY` (AES-256-GCM Format v3).
- `compose/docker-compose.yml`: File compose đang triển khai.
- `db/<file>`: Bản dump cơ sở dữ liệu nhất quán (`pg_dumpall`, `mysqldump`, `mariadb-dump`, Redis RDB, MongoDB archive) khi template hoặc DB engine có khai báo chiến lược database.
- `files/<n>.tar` & `volumes/<n>.tar`: Các thư mục bind `paths` và Docker named `volumes` đã cấu hình.

Khi template có cả `stop` và dump cơ sở dữ liệu, Nitrobase dừng các service ghi trước (giữ container database chạy), chụp dump nhất quán, dừng database nếu được cấu hình, nén tệp/volume, rồi khởi động lại đúng các service vốn đang chạy trước đó.

## Lịch sao lưu, Lưu giữ & Chạy bù

1. Mở ứng dụng hoặc cơ sở dữ liệu và vào tab **Backups** (quyền `backup.policy.manage`).
2. Chọn **Điểm lưu trữ (Destination)**, **Lịch Cron** (mặc định `0 3 * * *`, chu kỳ tối thiểu `60` phút theo `BACKUP_MIN_INTERVAL_MINUTES`) và số bản giữ lại **Keep last** (mặc định `7`, tối đa `1000`).
3. **Chạy bù khi bỏ lỡ (`BACKUP_CATCH_UP=true`):** Nếu Nitrobase bị tắt đúng lúc đến lịch sao lưu, hệ thống sẽ phát hiện và tự động chạy bù ngay khi khởi động lại.
4. **Cảnh báo sao lưu cũ:** Hàng ngày (`BACKUP_STALE_CRON`, mặc định `37 7 * * *`), Nitrobase kiểm tra các lịch đang bật và phát sự kiện `backup.stale` nếu quá `BACKUP_STALE_DAYS` (mặc định `2` ngày) không có bản sao lưu thành công.

## Khôi phục bản sao lưu

Nitrobase xác minh mã SHA-256 của tệp lưu trữ, kiểm tra danh sách tệp hợp lệ, đối chiếu từng thành phần với `manifest.json`, sau đó khôi phục:

- **Khôi phục tại chỗ:** Triển khai lại đúng phiên bản/commit trong bản sao lưu và nạp database dump cùng volume trước khi khởi chạy ứng dụng.
- **Khôi phục thành ứng dụng mới:** Tạo một ứng dụng mới với thư mục và tên miền riêng mang dữ liệu từ bản sao lưu.
- **Tải xuống tệp sao lưu:** Tải trực tiếp tệp `.tar.zst` từ giao diện (quyền `backup.download`; với cơ sở dữ liệu cần thêm `database.credentials.reveal`).
