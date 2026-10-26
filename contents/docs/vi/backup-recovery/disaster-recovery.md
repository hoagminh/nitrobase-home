---
title: Phục hồi thảm họa & Chống xung đột Split-Brain
description: Khôi phục toàn bộ hệ sinh thái trên máy chủ mới và cơ chế bảo vệ Split-Brain.
---

## Cơ chế chống xung đột Split-Brain
Khi cơ sở dữ liệu Nitrobase được khôi phục sang máy chủ mới, hệ thống sẽ tự động khởi động ở trạng thái **Tạm dừng (Paused)**:
* Các tác vụ dở dang không tự động chạy lại.
* Lịch sao lưu tự động tạm thời dừng.
* Khóa việc triển khai ứng dụng mới.

Cơ chế này ngăn việc cả 2 máy chủ (cũ và mới) cùng điều khiển một hạ tầng gây hư hại dữ liệu. Quản trị viên chỉ cần bấm **"This database was moved — resume here"** để chính thức bàn giao quyền điều khiển.

## Khôi phục thủ công qua Terminal
```bash
# 1. Giải mã file sao lưu
openssl enc -d -aes-256-cbc -pbkdf2 -md sha256 -iter 200000 \
  -pass env:ENCRYPTION_KEY -in backup.tar.gz.enc | tar -xzf -

# 2. Nạp dữ liệu vào container Postgres
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U nitrobase -d nitrobase < nitrobase-backup/nitrobase.sql
```
