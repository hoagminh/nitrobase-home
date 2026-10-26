---
title: Cài đặt thủ công bằng Docker Compose
description: Cách cài đặt Nitrobase thủ công bằng Git và Docker Compose dành cho môi trường tùy biến.
---

Nếu bạn muốn toàn quyền kiểm soát môi trường triển khai, chạy Nitrobase đằng sau một hệ thống proxy có sẵn hoặc dựng môi trường phát triển, bạn có thể cài đặt thủ công qua Git và Docker Compose.

## Điều kiện tiên quyết
* Đã cài đặt Docker 24.0+ và Docker Compose v2.24+ trên máy chủ.
* Công cụ dòng lệnh `openssl`.

## Các bước tiến hành

### 1. Clone mã nguồn
```bash
git clone https://github.com/nitrobase/nitrobase.git nitrobase
cd nitrobase
```

### 2. Thiết lập biến môi trường
Sao chép file mẫu:
```bash
cp .env.example .env
```

Sinh các khóa bảo mật 32-byte ngẫu nhiên:
```bash
sed -i "s|^ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$(openssl rand -hex 32)|" .env
sed -i "s|^SESSION_SECRET=.*|SESSION_SECRET=$(openssl rand -hex 32)|" .env
sed -i "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$(openssl rand -hex 32)|" .env
echo "NITROBASE_IMAGE=nitrobase" >> .env
echo "NITROBASE_VERSION=local" >> .env
chmod 600 .env
```

:::caution[Lưu giữ ENCRYPTION_KEY cẩn thận]
Hãy lưu trữ `ENCRYPTION_KEY` vào phần mềm quản lý mật khẩu bên ngoài máy chủ! Nếu mất khóa này, toàn bộ SSH key, mật khẩu và các bản backup mã hóa sẽ không thể giải mã.
:::

### 3. Khởi động các container
Nếu build trực tiếp từ mã nguồn:
```bash
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build
```

Hoặc sử dụng image chính thức đã đóng gói sẵn:
```bash
docker compose -f docker-compose.prod.yml up -d
```


## Bảng các biến môi trường cốt lõi

| Biến | Bắt buộc | Mô tả |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Có** | Chuỗi kết nối Postgres nội bộ (ví dụ: `postgresql://nitrobase:pass@postgres:5432/nitrobase`). |
| `ENCRYPTION_KEY` | **Có** | Chuỗi bí mật tối thiểu 32 ký tự để mã hóa dữ liệu nhạy cảm bằng chuẩn HKDF. |
| `SESSION_SECRET` | **Có** | Chuỗi bí mật tối thiểu 32 ký tự để ký và bảo vệ cookie phiên đăng nhập. |
| `APP_URL` | Không | Địa chỉ URL công khai của panel. Nếu bắt đầu bằng `https://`, cookie sẽ tự động có cờ `Secure`. |
| `TRUST_PROXY` | Không | Đặt thành `true` khi chạy sau Traefik hoặc Cloudflare để đọc IP thật của client. |
| `ACME_EMAIL` | Không | Email nhận thông báo gia hạn chứng chỉ Let's Encrypt. |
