---
title: Kiến trúc tổng quan
description: Kiến trúc hệ thống mức cao của Nitrobase, các thành phần dịch vụ và luồng xử lý dữ liệu.
---

Nitrobase được thiết kế với trung tâm điều khiển (Control Plane) tinh gọn, giao tiếp với các máy chủ VPS được quản trị thông qua các giao thức an toàn.

## Sơ đồ kiến trúc tổng thể

```mermaid
flowchart TB
  subgraph Panel["Bảng điều khiển Nitrobase (Host / VPS)"]
    direction LR
    UI["Web UI (Mantine 9 + TanStack Router)"] <--> Nitro["Nitro Server (React 19, Bun)<br/>• Drizzle ORM + PostgreSQL<br/>• Job Queue & Lập lịch Croner<br/>• WebSocket xterm.js Web PTY"]
  end

  Panel -->|SSH2 / ed25519| Remote["Máy chủ VPS từ xa (Remote VPS)"]
  Panel -->|nsenter / Docker socket| Local["Localhost (Máy chủ chạy Nitrobase)"]

  subgraph Remote["Máy chủ VPS từ xa (Remote VPS)"]
    direction TB
    TR["Traefik v3 (Reverse Proxy + ACME SSL)"]
    TR --> Supabase["Bộ ngăn xếp Supabase<br/>(PostgreSQL Vector, GoTrue, Studio)"]
    TR --> Appwrite["Appwrite / Các mẫu ứng dụng khác"]
  end

  subgraph Local["Localhost (Máy chủ chạy Nitrobase)"]
    direction TB
    TL["Traefik v3 (Reverse Proxy + ACME SSL)"]
    TL --> App["Container Nitrobase"]
    TL --> DB["PostgreSQL 16 Engine"]
  end
```

## Các nguyên lý thiết kế cốt lõi

1. **Tiến trình đơn (Single-Instance In-Process):** Các background job, tác vụ cron và khóa server lock được vận hành trực tiếp trong tiến trình bộ nhớ của Nitrobase, đảm bảo không xung đột và không cần cài thêm Redis.
2. **Không cài đặt Agent nặng nề:** Các server từ xa chỉ chạy Docker và Traefik v3 tiêu chuẩn. Nitrobase không cài daemon chạy ngầm làm chậm máy chủ của bạn.
3. **An toàn kiểu dữ liệu toàn diện (Type Safety):** 100% mã nguồn TypeScript đồng bộ từ cơ sở dữ liệu (Drizzle ORM), Zod validation cho tới giao diện người dùng React 19.
