---
title: Manual Docker Compose Installation
description: How to install Nitrobase manually using Git and Docker Compose for custom environments.
---

If you prefer full control over your environment, want to run Nitrobase behind an existing reverse proxy, or are developing locally, you can install Nitrobase manually using Git and Docker Compose.

## Prerequisites
* Docker 24.0+ and Docker Compose v2.24+ installed on the host.
* OpenSSL CLI tool installed.


## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/nitrobase/nitrobase.git nitrobase
cd nitrobase
```

### 2. Configure Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env
```

Generate cryptographically secure 32-byte hex keys:
```bash
sed -i "s|^ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$(openssl rand -hex 32)|" .env
sed -i "s|^SESSION_SECRET=.*|SESSION_SECRET=$(openssl rand -hex 32)|" .env
sed -i "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$(openssl rand -hex 32)|" .env
echo "NITROBASE_IMAGE=nitrobase" >> .env
echo "NITROBASE_VERSION=local" >> .env
chmod 600 .env
```

:::caution[Backup Your Encryption Key]
Store your `ENCRYPTION_KEY` in a password manager outside of the server! If this key is lost, all stored credentials, SSH keys, and encrypted backups cannot be decrypted.
:::

### 3. Start the Stack
For building from the local checkout:
```bash
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build
```

Or to use pre-built official release images:
```bash
docker compose -f docker-compose.prod.yml up -d
```

## Core Environment Variables Reference

| Variable | Required | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | Postgres connection string (e.g., `postgresql://nitrobase:pass@postgres:5432/nitrobase`). |
| `ENCRYPTION_KEY` | **Yes** | 32+ character random key for encrypting secrets at rest with HKDF. |
| `SESSION_SECRET` | **Yes** | 32+ character random key for sealing session cookies. |
| `APP_URL` | No | Public URL of the panel. When starting with `https://`, session cookies receive the `Secure` flag. |
| `TRUST_PROXY` | No | Set to `true` when running behind Traefik or Cloudflare to read real client IP. |
| `ACME_EMAIL` | No | Email address used for Let's Encrypt certificate renewal notifications. |
