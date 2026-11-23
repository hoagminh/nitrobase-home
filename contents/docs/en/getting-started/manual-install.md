---
title: Manual Docker Compose Installation
description: Install Nitrobase manually using release artifacts or a local Git checkout with Docker Compose v2.
---

If you want complete control over your compose files or are building from a local checkout, you can run Nitrobase directly with Docker Compose v2.

## Prerequisites

- Docker Engine with Docker Compose v2 (`docker compose`).
- OpenSSL CLI (`openssl`) for generating random secrets.

## Option A: Official Release Artifacts

In an empty directory, download `docker-compose.prod.yml` and `.env.example` from the same release on [GitHub Releases](https://github.com/AydenGroup/nitrobase/releases):

```bash
mkdir nitrobase && cd nitrobase
VERSION=0.1.0-beta.9
BASE=https://github.com/AydenGroup/nitrobase/releases/download/v$VERSION
curl -fsSL -o compose.yaml "$BASE/docker-compose.prod.yml"
curl -fsSL -o .env "$BASE/env.example"

for key in ENCRYPTION_KEY SESSION_SECRET POSTGRES_PASSWORD; do
  sed -i.bak "s|^$key=.*|$key=$(openssl rand -hex 32)|" .env
done
sed -i.bak "s|^NITROBASE_VERSION=.*|NITROBASE_VERSION=$VERSION|" .env
rm -f .env.bak && chmod 600 .env

# For pre-releases, enable pre-release update checks:
case "$VERSION" in *-*) echo "RELEASE_CHANNEL=prerelease" >> .env ;; esac

docker compose up -d
docker compose logs app | grep "Setup token"
```

## Option B: Build from a Local Git Checkout

```bash
git clone https://github.com/AydenGroup/nitrobase.git && cd nitrobase
cp .env.example .env
for key in ENCRYPTION_KEY SESSION_SECRET POSTGRES_PASSWORD; do
  sed -i "s|^$key=.*|$key=$(openssl rand -hex 32)|" .env
done
sed -i 's|^NITROBASE_IMAGE=.*|NITROBASE_IMAGE=nitrobase|; s|^NITROBASE_VERSION=.*|NITROBASE_VERSION=local|' .env
chmod 600 .env

docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build
```

:::caution[Back Up Your ENCRYPTION_KEY]
Store `.env`—especially `ENCRYPTION_KEY`—in a password manager outside the server. Without `ENCRYPTION_KEY`, stored credentials, SSH keys, and encrypted backups cannot be decrypted.
:::

## Core Environment Variables

Any runtime setting defined in `src/config/server.ts` can be placed in `.env` (loaded via `env_file` in `docker-compose.prod.yml`). The server refuses to start if a required secret is missing, shorter than 32 characters, or a known placeholder.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | PostgreSQL connection string (in `docker-compose.prod.yml`, built automatically from `POSTGRES_PASSWORD`). |
| `ENCRYPTION_KEY` | **Yes** | At least 32 random characters. Encrypts all secrets at rest (AES-256-GCM + HKDF). |
| `ENCRYPTION_KEY_PREVIOUS` | No | Comma-separated previous encryption keys (newest first) kept after key rotation so older backups remain restorable. |
| `SESSION_SECRET` | **Yes** | At least 32 random characters. Seals session cookies. |
| `POSTGRES_PASSWORD` | **Yes*** | Used by `docker-compose.prod.yml` for the bundled `postgres:16-alpine` container (use hex). |
| `NITROBASE_VERSION` | **Yes*** | Image tag to run (e.g. `0.1.0-beta.9`). Updated automatically by in-panel upgrades. |
| `NITROBASE_IMAGE` | No | Panel image without tag (default `ghcr.io/aydengroup/nitrobase`). |
| `PANEL_BIND` | No | Host bind address and port (default `0.0.0.0:3000`). Set to `127.0.0.1:3000` once behind HTTPS. |
| `APP_URL` | No | Public URL of the panel (e.g. `https://panel.example.com`). Session cookies are marked `Secure` only when this starts with `https://`. |
| `TRUST_PROXY` | No | Set to `true` when behind Traefik or another reverse proxy so rate limits and audit logs see real client IPs (`TRUSTED_PROXY_HOPS`, default `1`). |
| `ACME_EMAIL` | No | Let's Encrypt registration email (defaults to the administrator's email). |
| `GITHUB_TOKEN` | No | Optional GitHub token to raise API rate limits when listing template versions. |
| `SETUP_TOKEN` | No | One-time token (min 16 chars) for initial admin signup or first-run restore. If omitted, Nitrobase generates one and prints it in logs. |
| `RELEASE_CHANNEL` | No | `stable` (default) or `prerelease` to receive beta/pre-release upgrade notifications. |

\* Required when using `docker-compose.prod.yml`.
