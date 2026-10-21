---
title: Kiến trúc mã nguồn & Tiêu chuẩn code
description: Cấu trúc thư mục, server functions, tiêu chuẩn Biome linter và quy tắc đa ngôn ngữ Lingui.
---

## Cấu trúc thư mục
```text
src/
  features/<feature>/   # Logic tính năng (ví dụ: apps.server.ts, apps.query.ts)
  components/           # Giao diện Mantine UI
  routes/               # File-based routes của TanStack
  server/               # Nitro plugins, scheduler, dịch vụ kết nối SSH/Docker
templates/              # Các mẫu ứng dụng marketplace (template.toml)
drizzle/                # File SQL migrations
```

## Tiêu chuẩn mã nguồn
* **Linter & Formatter:** [Biome](https://biomejs.dev/). Chạy `bun run check`.
* **Đa ngôn ngữ:** [Lingui](https://lingui.dev/). Mọi chuỗi hiển thị đều phải qua hàm `i18n._()`.
