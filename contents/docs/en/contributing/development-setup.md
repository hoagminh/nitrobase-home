---
title: Development Environment Setup
description: Clone AydenGroup/nitrobase, start local PostgreSQL on port 5443, apply Drizzle migrations, and run the Bun dev server.
---

## Prerequisites

- [Bun](https://bun.sh) runtime
- Docker (for the local PostgreSQL 16 database)

## Local Setup

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/AydenGroup/nitrobase.git
   cd nitrobase
   bun install
   ```

2. **Create `.env.local` and generate secrets:**
   ```bash
   cp .env.example .env.local
   # Fill in ENCRYPTION_KEY and SESSION_SECRET (>= 32 chars each):
   # openssl rand -hex 32
   ```

3. **Start local PostgreSQL** (published on `127.0.0.1:5443`):
   ```bash
   docker compose up -d postgres
   ```

4. **Apply Drizzle database migrations:**
   ```bash
   bun run db:migrate
   ```

5. **Start the development server** (available at `http://localhost:3000`):
   ```bash
   bun run dev
   ```

## Common Commands

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start Vite + TanStack Start dev server with HMR |
| `bun run build` | Production build |
| `bun run typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `bun run check` | Biome lint and format check |
| `bun run test` | Run Vitest unit and template snapshot tests |
| `bun run i18n:extract && bun run i18n:compile` | Extract and compile Lingui translation catalogs |
| `bun run i18n:check` | Verify translation catalog completeness |
| `bun run db:generate` | Generate a new Drizzle SQL migration from `src/db/schema/` |
| `bun run db:migrate` | Apply pending migrations |
