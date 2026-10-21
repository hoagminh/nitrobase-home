---
title: Codebase Architecture & Standards
description: Directory layout, TanStack React Start server functions, Biome linting, and Lingui i18n rules.
---

## Project Structure
```text
src/
  features/<feature>/   # Feature logic (e.g. apps.server.ts, apps.query.ts)
  components/           # Mantine UI components
  routes/               # TanStack file-based routes
  server/               # Nitro plugins, scheduler, services (SSH, Docker)
templates/              # Marketplace templates (template.toml)
drizzle/                # PostgreSQL schema migrations
```

## Coding Standards
* **Formatter & Linter:** [Biome](https://biomejs.dev/). Run `bun run check`.
* **Internationalization:** [Lingui](https://lingui.dev/). All user-visible strings must pass through `i18n._()`.
