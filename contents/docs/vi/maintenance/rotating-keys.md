---
title: Xoay khóa ENCRYPTION_KEY
description: Quy trình dòng lệnh mã hóa lại an toàn toàn bộ khóa và thông tin bí mật trong PostgreSQL bằng ENCRYPTION_KEY mới.
---

Vì mọi bí mật lưu trong Nitrobase (khóa SSH, mật khẩu máy chủ, biến môi trường ứng dụng, mật khẩu cơ sở dữ liệu, khóa điểm sao lưu, token Cloud Sync và bí mật thông báo) đều được mã hóa bằng `ENCRYPTION_KEY`, việc đổi thẳng trong `.env` mà không chạy script chuyển đổi sẽ khiến dữ liệu cũ không giải mã được.

Sử dụng script tích hợp `scripts/rotate-encryption-key.ts` để mã hóa lại toàn bộ bí mật trong cơ sở dữ liệu một cách nguyên tử.

## Quy trình xoay khóa

1. **Tạo khóa 32-byte mới** (lưu ngay vào trình quản lý mật khẩu):
   ```bash
   openssl rand -hex 32
   ```

2. **Dừng container panel** để tránh ghi dữ liệu mới trong lúc xoay khóa:
   ```bash
   cd /opt/nitrobase
   docker compose -f docker-compose.prod.yml stop app
   ```

3. **Chạy script xoay khóa** với `OLD_ENCRYPTION_KEY` là khóa hiện tại và `ENCRYPTION_KEY` là khóa mới:
   ```bash
   docker compose -f docker-compose.prod.yml run --rm \
     -e OLD_ENCRYPTION_KEY='<khoa-hien-tai>' \
     -e ENCRYPTION_KEY='<khoa-moi>' \
     app bun scripts/rotate-encryption-key.ts
   ```

4. **Cập nhật file `.env`:**
   - Thay `ENCRYPTION_KEY` bằng khóa mới.
   - Thêm khóa cũ vào `ENCRYPTION_KEY_PREVIOUS` (cách nhau bởi dấu phẩy, mới nhất trước) để các bản sao lưu ứng dụng (`env.enc`) tạo trước khi xoay khóa vẫn giải mã và khôi phục được cho đến khi hết hạn lưu giữ:
     ```bash
     ENCRYPTION_KEY="<khoa-moi>"
     ENCRYPTION_KEY_PREVIOUS="<khoa-hien-tai>"
     ```

5. **Khởi động lại bảng điều khiển:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d app
   ```

:::note[Bản Self-Backup cũ]
Các tệp tự sao lưu (`.tar.gz.enc`) tạo trước khi xoay khóa vẫn giữ mã hóa theo khóa cũ. Khi giải mã thủ công bằng `openssl` hoặc khôi phục qua First-Run Restore, hãy cung cấp đúng khóa đang dùng tại thời điểm tạo bản sao lưu đó.
:::
