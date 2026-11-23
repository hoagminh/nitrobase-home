---
title: Thiết lập môi trường phát triển
description: Clone AydenGroup/nitrobase, chạy PostgreSQL cục bộ trên cổng 5443, áp dụng migration Drizzle và khởi động Bun dev server.
---

## Yêu cầu

- Runtime [Bun](https://bun.sh)
- Docker (để chạy PostgreSQL 16 cục bộ)

## Thiết lập cục bộ

1. **Clone kho mã nguồn và cài đặt thư viện:**
   ```bash
   git clone https://github.com/AydenGroup/nitrobase.git
   cd nitrobase
   bun install
   ```

2. **Tạo `.env.local` và sinh các khóa bí mật:**
   ```bash
   cp .env.example .env.local
   # Điền ENCRYPTION_KEY và SESSION_SECRET (mỗi khóa >= 32 ký tự):
   # openssl rand -hex 32
   ```

3. **Khởi động PostgreSQL phát triển** (mở cổng tại `127.0.0.1:5443`):
   ```bash
   docker compose up -d postgres
   ```

4. **Chạy migration cơ sở dữ liệu Drizzle:**
   ```bash
   bun run db:migrate
   ```

5. **Khởi động máy chủ phát triển** (truy cập tại `http://localhost:3000`):
   ```bash
   bun run dev
   ```

## Các lệnh thường dùng

| Lệnh | Chức năng |
| :--- | :--- |
| `bun run dev` | Khởi chạy dev server Vite + TanStack Start với HMR |
| `bun run build` | Build bản production |
| `bun run typecheck` | Kiểm tra kiểu TypeScript (`tsc --noEmit`) |
| `bun run check` | Kiểm tra lint và format bằng Biome |
| `bun run test` | Chạy unit test và template snapshot test bằng Vitest |
| `bun run i18n:extract && bun run i18n:compile` | Trích xuất và biên dịch catalog đa ngôn ngữ Lingui |
| `bun run i18n:check` | Kiểm tra tính đầy đủ của catalog dịch thuật |
| `bun run db:generate` | Tạo SQL migration mới từ `src/db/schema/` |
| `bun run db:migrate` | Áp dụng các migration chưa chạy |
