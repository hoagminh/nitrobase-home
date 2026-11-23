---
title: "Deep Dive: Self-Hosting Supabase"
description: How Nitrobase deploys, secures, backs up, and operates the full self-hosted Supabase stack.
---

Nitrobase provides first-class support for self-hosting the complete **Supabase** stack directly from official `supabase/supabase` monthly releases (`v1.YY.MM`), which pin a tested set of container images.

## What Nitrobase Provisions

- **PostgreSQL + pgvector + Supavisor:** Full Postgres engine with extensions and connection pooling.
- **Kong API Gateway, GoTrue Auth, PostgREST, Realtime, Storage, Edge Functions, and Supabase Studio.**
- **Zero demo secrets:** Upstream `.env.example` provides defaults, and Nitrobase overrides every insecure demo secret with cryptographically generated values—including `POSTGRES_PASSWORD`, `JWT_SECRET`, HS256 `ANON_KEY`/`SERVICE_ROLE_KEY`, and Studio credentials.
- **Asymmetric ES256 API keys (v1.26.04+):** For Supabase `v1.26.04` and newer, Nitrobase automatically generates the new `SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`), `SUPABASE_SECRET_KEY` (`sb_secret_...`), ES256 `JWT_KEYS`/`JWT_JWKS`, and `ANON_KEY_ASYMMETRIC`/`SERVICE_ROLE_KEY_ASYMMETRIC`, and applies `overlay-api-keys.yml` to enable asymmetric JWT verification while keeping legacy keys working.

## Built-in Supabase Provider Plugin

Nitrobase's Supabase plugin adds dedicated management tabs directly on your Supabase app page:

- **Edge Functions:** Upload, edit, and deploy edge functions (up to `50` files and `1 MB` per function by default) and manage encrypted edge function secrets (`service-env/functions.env`, mode `0600`, up to `100` variables). Includes an HTTP invoke tester through the app's API gateway.
- **SQL Runner:** Execute SQL directly inside the Postgres container (`app.database` permission, `30s` statement timeout, audited).
- **Storage Repair:** Batch-check and repair storage file metadata (`SUPABASE_STORAGE_REPAIR_BATCH=1000`).
- **Backups:** Consistent `pg_dumpall` database dumps (taken after writer services stop) combined with storage volumes in a single `.tar.zst` archive.

## Resource Recommendations

A full Supabase stack typically consumes **1–1.5 GB of RAM** at rest, so a **2 GB+ RAM** VPS (with swap enabled) is recommended.
