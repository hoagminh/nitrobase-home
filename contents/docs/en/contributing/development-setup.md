---
title: Development Environment Setup
description: How to clone the repo, run PostgreSQL on port 5443, apply migrations, and start the Bun dev server.
---

## Quickstart for Contributors

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/saasbase/saasbase.git
cd saasbase
bun install
```

2. Copy the development environment file:
```bash
cp .env.example .env.local
```

3. Start development PostgreSQL (runs on port **5443**):
```bash
docker compose up -d postgres
```

4. Run Drizzle database migrations:
```bash
bun run db:migrate
```

5. Start the Vite/Nitro dev server:
```bash
bun run dev
```
The panel is now accessible at `http://localhost:3000`.
