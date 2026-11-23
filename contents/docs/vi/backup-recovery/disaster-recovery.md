---
title: Khôi phục thảm họa & Chống Split-Brain
description: Khôi phục Nitrobase trên máy chủ mới từ bản tự sao lưu (qua giao diện hoặc CLI) và cơ chế bảo vệ Split-Brain.
---

Nếu máy chủ chạy bảng điều khiển Nitrobase gặp sự cố hoặc bạn cần chuyển panel sang máy mới, bạn có thể khôi phục toàn bộ control plane từ tệp **tự sao lưu** (`nitrobase/<date>-<id>.tar.gz.enc`) cùng `ENCRYPTION_KEY` cũ.

## Cách 1: Khôi phục trực tiếp qua giao diện (Khuyến nghị)

1. Cài một bản Nitrobase mới trên máy chủ mới (bằng script, Docker installer hoặc Docker Compose thủ công).
2. Mở trang **Khởi tạo ban đầu (First-Run Setup)** và chọn **Restore from a backup**.
3. Nhập **Setup Token** của máy mới, tải lên `nitrobase/<date>-<id>.tar.gz.enc`, điền mã **SHA-256** (hiển thị ở **Data → Backups**) và **`ENCRYPTION_KEY` cũ**.
4. Nitrobase kiểm tra checksum, giải mã gói lưu trữ (có giới hạn chống decompression bomb: tải lên tối đa `256 MB`, giải nén tối đa `2 GB`), nạp `nitrobase.sql` bằng role PostgreSQL không phải superuser (`nitrobase_restore`, chặn lệnh `COPY ... PROGRAM` hoặc lệnh superuser), chạy migration cho phiên bản hiện tại và mã hóa lại mọi bí mật bằng `ENCRYPTION_KEY` của máy mới.

## Cách 2: Khôi phục thủ công qua CLI

Nếu muốn khôi phục bằng dòng lệnh trên bản cài mới cấu hình **cùng** `ENCRYPTION_KEY` và `SESSION_SECRET`:

```bash
# 1. Kiểm tra toàn vẹn với mã SHA-256 ghi trong Data → Backups
sha256sum backup.tar.gz.enc

# 2. Giải mã và giải nén
export ENCRYPTION_KEY='<encryption-key-cu>'
openssl enc -d -aes-256-cbc -pbkdf2 -md sha256 -iter 200000 \
  -pass env:ENCRYPTION_KEY -in backup.tar.gz.enc | tar -xzf -

# 3. Khởi chạy PostgreSQL và nạp bản dump
docker compose -f docker-compose.prod.yml up -d postgres
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U nitrobase -d nitrobase < nitrobase-backup/nitrobase.sql

# 4. Khởi chạy bảng điều khiển
docker compose -f docker-compose.prod.yml up -d
```

## Cơ chế chống Split-Brain

Mỗi cơ sở dữ liệu Nitrobase lưu một `instance_id` đối chiếu với tệp đánh dấu trên volume dữ liệu của panel (`INSTANCE_MARKER_FILE`, mặc định `.data/instance-id`, có thể ghi đè qua `INSTANCE_ID`).

Khi khôi phục cơ sở dữ liệu sang một máy mới, tệp đánh dấu không khớp nên bảng điều khiển sẽ khởi động ở trạng thái **Tạm dừng (Paused)**:

- Không chạy job nền, lịch sao lưu, kiểm tra cập nhật hay vòng lặp giám sát.
- Không tác động lên các máy chủ đích trong khi bản Nitrobase cũ có thể vẫn đang chạy.

**Hãy tắt hẳn bản Nitrobase cũ trước**, sau đó đăng nhập bằng tài khoản Quản trị viên hệ thống và nhấn **"This database was moved — resume here"** để tiếp quản quyền điều khiển.
