---
title: Codebase Architecture & Standards
description: Tech stack, directory layout, database migrations, Lingui i18n conventions, and pull request checks.
---

## Tech Stack

- **Runtime:** Bun
- **Framework:** TanStack Start (React 19, Nitro) + TanStack Router & TanStack Query
- **Database:** PostgreSQL 16 + Drizzle ORM
- **UI:** Mantine 9, Lucide icons, React Compiler, Monaco Editor, xterm.js, Recharts
- **i18n:** Lingui (English source catalog, Vietnamese translation)
- **Infrastructure:** `ssh2`, Docker, Traefik v3, Cloudflare Tunnel, `@modelcontextprotocol/sdk`

## Project Layout

```text
src/
  features/<feature>/   # <x>.functions.ts (server functions), <x>.server.ts (logic), schema.ts, <x>.query.ts
  components/           # Mantine UI components by feature, plus ui/ primitives
  routes/               # Thin TanStack file-based routes (+ api/ routes: v1, mcp, webhooks, streams)
  config/               # Registries & settings: permissions, statuses, identifiers, database engines, server.ts
  db/schema/            # Drizzle ORM table definitions
  plugins/              # Template provider plugins (e.g. Supabase)
  server/
    api/                # REST v1 route registry, OpenAPI 3.1 generator, MCP server
    services/           # Executor (SSH/local), server bootstrap, template engine, monitoring, backups, cloud sync
    routes/             # Nitro routes (WebSocket terminal)
    plugins/            # Startup plugin (schedulers, recovery, catch-up)
  locales/              # Lingui catalogs (en.json, vi.json)
templates/              # App templates (template.toml + docker-compose.yml / overlay.yml)
drizzle/                # SQL migrations (0000_baseline.sql + incremental migrations)
scripts/                # install.sh, migrate.ts, rotate-encryption-key.ts, i18n & smoke scripts
```

## Database Migrations

The schema lives in `src/db/schema/*.ts`, and `drizzle/` begins from a baseline (`0000_baseline.sql`). After changing schema files, run `bun run db:generate` (commit both the generated SQL and snapshot) and `bun run db:migrate`. For custom SQL (triggers, data migrations), use `bunx drizzle-kit generate --custom --name <name>`.

## Code Quality & Standards

- **Linting & Formatting:** Biome (`bun run check`) and Stylelint for CSS.
- **Internationalization:** Every user-visible string must pass through Lingui (`i18n._(...)` or module-level `msg()`). Run `bun run i18n:extract && bun run i18n:compile` and `bun run i18n:check` after changing UI or template strings.
- **Commits:** Follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by Lefthook + Commitlint).
- **Pre-PR Checks:** Ensure `bun run typecheck`, `bun run check`, and `bun run test` all pass before opening a pull request.
