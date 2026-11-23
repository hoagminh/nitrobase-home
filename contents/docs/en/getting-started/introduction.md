---
title: Introduction to Nitrobase
description: Overview of Nitrobase, core capabilities, license, and hardware requirements.
---

**Nitrobase** is a self-hosted Platform-as-a-Service (PaaS) and Backend-as-a-Service (BaaS) control panel built for developers and teams who want click-to-deploy convenience on their own servers—without Kubernetes complexity or vendor lock-in.

Connect any Ubuntu or Debian VPS over SSH—or manage the machine Nitrobase runs on (*Localhost*)—and let Nitrobase set up Docker and Traefik v3. From there, deploy **Supabase**, **Appwrite**, **PocketBase**, **standalone databases** (PostgreSQL, MySQL, MariaDB, MongoDB, Valkey), **n8n**, **Plausible**, **Umami**, **RustFS**, custom `docker-compose.yml` stacks, or your own **Git repositories** with HTTPS, backups, monitoring, updates, and AI-agent MCP support built in.

## Key Highlights

- **Bring any VPS:** Add remote servers over SSH or bootstrap *Localhost*. Guided bootstrap previews every change before touching the host, and ownership markers prevent two panels from colliding over one server.
- **Backends, not just containers:** First-class templates for Supabase, Appwrite, and PocketBase with generated secrets, credentials panels, and app-aware database + volume backups.
- **Safe by default:** Every compose file—whether from a marketplace template or your own custom compose—passes through the same security policy (no host mounts outside the app folder, no privileged containers, no reserved labels or shared networks).
- **Operations included:** Automated backups to S3, Cloudflare R2, Backblaze B2, or a local server folder with verified restores; live server/container monitoring and alerts; one-click updates with automatic rollback; moving apps between servers; a web terminal and database consoles.
- **Automation & AI Agents:** Team-scoped REST API (`/api/v1`) with OpenAPI 3.1 and a stateless **MCP server** (`/api/mcp`) so AI agents like Claude Code and Cursor can inspect and operate your infrastructure safely.

## System Requirements

The Nitrobase panel and its PostgreSQL database use roughly **300 MB of RAM and 1 GB of disk**. The remaining capacity is for the apps you deploy (for example, a full Supabase stack typically uses 1–1.5 GB of RAM).

- **Operating System:** Ubuntu or Debian (`amd64` or `arm64`) for host bootstrap and the VPS install script. Any OS with Docker works with the Docker installer image.
- **RAM:** **2 GB recommended** (the installer warns below ~1.8 GB and continues). On small VPS instances, adding a 2 GB swap file prevents OOM kills during builds or spikes.
- **Disk:** **5 GB free recommended** (the installer warns below 5 GB and refuses below 2 GB). Use `--skip-resource-check` on small test machines where you know what fits.
- **One install per machine:** The containers (`nitrobase_app`, `nitrobase_postgres`) and volumes (`nitrobase_postgres_data`, `nitrobase_data`) use fixed names. The installer refuses to start a second install on the same host.
- **Ports (Standard Mode):**
  - `22` (SSH)
  - `80` & `443` (HTTP/HTTPS via Traefik v3)
  - `3000` (Nitrobase Web Panel; bind to `127.0.0.1:3000` once behind HTTPS)

:::tip[Tunnel-Only Advantage]
When publishing apps through **Cloudflare Tunnel** in **Tunnel only** mode, ports `80` and `443` can remain completely closed on your server firewall.
:::

## License

Nitrobase is **fair source**, released under the **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**. You may use, copy, modify, and self-host Nitrobase for any purpose—including inside your company and for clients—except to offer a competing product or service. Each release automatically converts to **Apache License 2.0** two years after publication.
