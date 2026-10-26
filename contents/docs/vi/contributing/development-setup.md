---
title: Thiết lập môi trường phát triển (Dev)
description: Hướng dẫn chạy mã nguồn cục bộ với Bun, PostgreSQL cổng 5443, Drizzle ORM và Biome.
---

## Các bước thiết lập cho Contributor

1. Clone kho mã nguồn và cài đặt dependencies:
```bash
git clone https://github.com/nitrobase/nitrobase.git
cd nitrobase
bun install
```

2. Sao chép file cấu hình môi trường dev:
```bash
cp .env.example .env.local
```

3. Khởi động PostgreSQL dành cho dev (chạy trên cổng **5443**):
```bash
docker compose up -d postgres
```

4. Chạy migration cơ sở dữ liệu:
```bash
bun run db:migrate
```

5. Khởi chạy dev server:
```bash
bun run dev
```
Bảng điều khiển sẽ chạy tại `http://localhost:3000`.
