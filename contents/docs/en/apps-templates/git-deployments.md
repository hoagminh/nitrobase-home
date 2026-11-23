---
title: Git Repository Deployments
description: Build and deploy applications from Git branches using Dockerfile, Railpack, or Static site builders with push webhooks.
---

Deploy your own web apps, APIs, and static sites directly from any Git repository (GitHub, GitLab, Gitea/Forgejo, or custom Git servers) with automatic builds on push.

## Supported Builders

Nitrobase can detect your builder automatically during wizard inspection (**Check repository**) or let you choose explicitly:

| Builder | Default Port | How It Works |
| :--- | :---: | :--- |
| **Dockerfile** | `3000` | Builds the `Dockerfile` in your repository with configurable Dockerfile path, build target, and build arguments. |
| **Railpack** | `3000` | Detects your language and framework (Node, Python, Go, PHP, Ruby, Java, Rust, etc.) using [Railpack](https://railpack.com) (`v0.40.1` + BuildKit frontend) and builds a production container image with no `Dockerfile` required. |
| **Static site** | `80` | Runs your build command in a build container (`node:22-alpine` by default) and serves the output folder with a lightweight static web server (`joseluisq/static-web-server`). |

## Deploying from Git

1. Go to **Apps → New App → From Git repository**.
2. Enter your repository URL (HTTPS or SSH). For private repositories over SSH, Nitrobase can generate a dedicated **Deploy Key** to add to your Git host.
3. Click **Check repository** to inspect branches and auto-detect the builder.
4. Select the target **Branch**, **Builder**, exposed container port, environment variables, and optional custom domain.
5. Click **Deploy**. Nitrobase clones the branch in an isolated throwaway container (`alpine/git`), builds the image via a dedicated per-server BuildKit builder (`nitrobase-builder`) with configurable memory/CPU/timeout limits (default `2048 MB` RAM, `2` CPUs, `20 min` timeout), and rolls out the new container with health checks.

## Push Webhooks (Auto-Deploy on Push)

Each Git app can enable a **Push Webhook** (`/api/hooks/git/<hookId>`) supporting GitHub, GitLab, Gitea/Forgejo, and generic HMAC-signed webhooks:

- **Debounce:** Rapid pushes are debounced (`WEBHOOK_DEBOUNCE_MS`, default `10s`) so only the latest commit builds.
- **Replay & Rate Protection:** Delivery IDs are checked against replays (7-day TTL) and rate-limited (`30` requests/min per IP and hook).
- **Build History & Rollback:** Nitrobase keeps the last `5` successful images per app by default (`GIT_KEEP_IMAGES`, configurable up to `50`) so you can roll back to a previous commit quickly.
- **Cache Pruning:** BuildKit cache is automatically pruned after each build to stay within `BUILD_CACHE_KEEP_MB` (default `4096 MB`).
