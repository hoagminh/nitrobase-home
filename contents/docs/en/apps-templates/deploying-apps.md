---
title: Deploying Marketplace Apps
description: Deploy curated open-source templates including Supabase, Appwrite, PocketBase, n8n, Plausible, Umami, and RustFS.
---

Nitrobase ships with a built-in marketplace of curated open-source templates defined under `templates/`. Each template generates strong secrets automatically, passes through Nitrobase's compose security policy, and comes with app-aware backup and health-check configuration.

## Available Marketplace Templates

| Template | Category | Description |
| :--- | :--- | :--- |
| **Supabase** | Backend | Full Postgres platform: database, GoTrue Auth, PostgREST, Realtime, Storage, Edge Functions, and Studio. Supports importing from and exporting to Supabase Cloud. |
| **Appwrite** | Backend | Auth, databases, storage, messaging, realtime, and Appwrite Console (note: Functions/Sites runtime executor is disabled for host security because it requires Docker socket access). Supports Appwrite Cloud import/export. |
| **PocketBase** | Backend | Single-binary backend built from verified official release checksums: realtime SQLite database, auth, file storage, and Admin UI (`/_/`). |
| **Standalone Database** | Database | Managed PostgreSQL, MySQL, MariaDB, Valkey, or MongoDB with web console, connection strings, and app linking. |
| **n8n** | Automation | Workflow automation with 400+ integrations, code steps, and AI agents on Postgres (owner account and encryption key managed automatically). |
| **Plausible** | Analytics | Privacy-first web analytics on ClickHouse and PostgreSQL (official CE version branches). |
| **Umami** | Analytics | Cookie-free web analytics on PostgreSQL (default admin password automatically rotated on first boot). |
| **RustFS** | Storage | Apache-2.0 S3-compatible object storage with S3 API on the primary domain and web console on `console.<domain>`. |
| **From Git Repository** | Custom | Build and deploy your own code from a Git branch using Dockerfile, Railpack, or Static site builders. |
| **Custom Compose** | Custom | Paste any `docker-compose.yml` and deploy it under the same safety policy and backup engine. |

## Deployment Flow

1. Go to **Apps → New App** and select a template.
2. Pick a ready **Server** and choose a **Version** (pinned to a commit SHA at deploy time for reproducible redeploys).
3. Configure optional **Custom domain** (leave empty for an automatic free `*.sslip.io` HTTPS domain) and editable environment variables.
4. Nitrobase runs a **Pre-flight check** validating server readiness, disk/RAM limits, ports, domain availability, and compose policy before creating anything.
5. Click **Deploy**. Nitrobase writes `/etc/nitrobase/apps/<folder>/`, pulls images, starts containers, attaches routed services to `nitrobase-network`, runs HTTP health & stability checks, and displays generated credentials in the app's **Credentials** panel.

## Post-Deploy Features

- **Environment Editor:** Edit variables with automatic secret masking; `initial_only` variables freeze after first deploy; `rotatable` secrets can be regenerated (with optional post-rotation SQL hooks) and redeployed in one click.
- **Resource Limits:** Override per-service memory limits, soft reservations, and CPU cores.
- **Published Ports:** Opt-in host port publishing for templates that declare `[[ports]]` (off by default, configured under **Settings → Published ports**).
- **Scheduled Tasks:** Run recurring cron jobs inside any app container (**Tasks** tab, up to 20 tasks per app, minimum 5-minute interval).
