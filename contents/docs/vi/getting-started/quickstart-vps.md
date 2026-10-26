---
title: Cài đặt nhanh trên VPS
description: Hướng dẫn chi tiết cài đặt Nitrobase trên Ubuntu hoặc Debian bằng script tự động.
---

Cách nhanh nhất để cài đặt Nitrobase trên một máy chủ VPS Ubuntu hoặc Debian mới là sử dụng script cài đặt tự động (`install.sh`).

## Cài đặt bằng 1 câu lệnh

Đăng nhập vào VPS của bạn qua SSH với quyền `root` và chạy lệnh:

```bash
curl -fsSL https://raw.githubusercontent.com/nitrobase/nitrobase/main/scripts/install.sh \
  | sudo bash -s -- --repo nitrobase/nitrobase
```

:::note[Kho mã nguồn tùy biến]
Thay thế `nitrobase/nitrobase` bằng kho lưu trữ GitHub của bạn nếu bạn triển khai từ fork riêng.
:::

## Các bước script tự động thực hiện

Script cài đặt có tính chất **idempotent** (chạy nhiều lần không gây lỗi) và thực hiện các tác vụ sau:

1. **Kiểm tra môi trường:** Xác thực quyền root, hệ điều hành (Ubuntu/Debian), dung lượng RAM (tối thiểu 2GB khuyến nghị), và kiểm tra cổng `3000`.
2. **Cài đặt Docker:** Tự động cài đặt Docker CE từ repository chính thức của Docker nếu máy chủ chưa có.
3. **Tạo bí mật mã hóa:** Tạo thư mục `/opt/nitrobase` với quyền `0600` chứa file `.env` gồm các khóa ngẫu nhiên 32-byte an toàn:
   * `ENCRYPTION_KEY`
   * `SESSION_SECRET`
   * `POSTGRES_PASSWORD`
4. **Tạo Setup Token dùng 1 lần:** Sinh mã `SETUP_TOKEN` và hiển thị trên terminal. Mã này bắt buộc phải nhập khi tạo tài khoản quản trị đầu tiên, chống việc người lạ truy cập chiếm quyền.
5. **Khởi chạy container:** Tải `docker-compose.prod.yml`, khởi động database Postgres và ứng dụng Nitrobase, kiểm tra trạng thái sức khỏe tại `/api/health`.

## Các cờ tùy chọn hữu ích

```bash
# Chỉ định thư mục cài đặt tùy chỉnh
bash install.sh --dir /data/nitrobase

# Chỉ bind cổng 3000 vào localhost (dành cho dùng SSH Tunnel hoặc Proxy)
bash install.sh --panel-bind 127.0.0.1:3000

# Gắn tên miền và tự động cấp SSL Let's Encrypt cho trang panel
bash install.sh --domain panel.domain-cua-ban.com

# Nâng cấp hoặc chỉ định phiên bản cụ thể
bash install.sh --version v1.2.0

# Gỡ cài đặt (giữ nguyên dữ liệu database và file .env)
bash install.sh --uninstall

# Gỡ bỏ hoàn toàn và xóa sạch toàn bộ dữ liệu
bash install.sh --uninstall --purge
```

## Truy cập Bảng điều khiển

Sau khi cài đặt xong, truy cập vào trình duyệt:

```text
http://<ip-may-chu-cua-ban>:3000
```

Chuyển sang phần **Khởi tạo ban đầu (First-Run Setup)** để kích hoạt tài khoản Admin bằng `SETUP_TOKEN`.
