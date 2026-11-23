---
title: Kiến trúc mã nguồn & Tiêu chuẩn
description: Công nghệ sử dụng, cấu trúc thư mục, migration cơ sở dữ liệu, quy ước Lingui i18n và tiêu chuẩn trước khi mở PR.
---

## Công nghệ cốt lõi

- **Runtime:** Bun
- **Framework:** TanStack Start (React 19, Nitro) + TanStack Router & TanStack Query
- **Cơ sở dữ liệu:** PostgreSQL 16 + Drizzle ORM
- **Giao diện:** Mantine 9, Lucide icons, React Compiler, Monaco Editor, xterm.js, Recharts
- **Đa ngôn ngữ:** Lingui (nguồn tiếng Anh, bản dịch tiếng Việt)
- **Hạ tầng:** `ssh2`, Docker, Traefik v3, Cloudflare Tunnel, `@modelcontextprotocol/sdk`

## Cấu trúc thư mục

```text
src/
  features/<feature>/   # <x>.functions.ts (server functions), <x>.server.ts (logic), schema.ts, <x>.query.ts
  components/           # Giao diện Mantine theo từng tính năng và thư mục ui/
  routes/               # Route TanStack gọn nhẹ (+ api/: v1, mcp, webhooks, streams)
  config/               # Các registry & cấu hình: permissions, statuses, identifiers, database engines, server.ts
  db/schema/            # Định nghĩa bảng Drizzle ORM
  plugins/              # Plugin mở rộng theo template (ví dụ Supabase)
  server/
    api/                # Danh mục REST v1, bộ sinh OpenAPI 3.1, máy chủ MCP
    services/           # Executor (SSH/local), bootstrap máy chủ, template engine, giám sát, sao lưu, cloud sync
    routes/             # Nitro routes (WebSocket terminal)
    plugins/            # Startup plugin (lập lịch, phục hồi job, catch-up)
  locales/              # Catalog Lingui (en.json, vi.json)
templates/              # Template ứng dụng (template.toml + docker-compose.yml / overlay.yml)
drizzle/                # SQL migrations (0000_baseline.sql + các thay đổi tiếp theo)
scripts/                # install.sh, migrate.ts, rotate-encryption-key.ts, script i18n & smoke test
```

## Migration cơ sở dữ liệu

Schema nằm trong `src/db/schema/*.ts`, và thư mục `drizzle/` bắt đầu từ bản nền `0000_baseline.sql`. Sau khi sửa schema, chạy `bun run db:generate` (commit cả file SQL lẫn snapshot) rồi chạy `bun run db:migrate`. Với SQL tùy biến (trigger, xử lý dữ liệu), dùng `bunx drizzle-kit generate --custom --name <name>`.

## Tiêu chuẩn mã nguồn

- **Lint & Format:** Biome (`bun run check`) và Stylelint cho CSS.
- **Đa ngôn ngữ (i18n):** Mọi chuỗi hiển thị cho người dùng phải đi qua Lingui (`i18n._(...)` hoặc `msg()` ở cấp module). Chạy `bun run i18n:extract && bun run i18n:compile` và `bun run i18n:check` sau khi sửa giao diện hoặc template.
- **Commit:** Tuân thủ [Conventional Commits](https://www.conventionalcommits.org/) (kiểm tra tự động bằng Lefthook + Commitlint).
- **Kiểm tra trước PR:** Đảm bảo `bun run typecheck`, `bun run check` và `bun run test` đều vượt qua trước khi mở Pull Request.
