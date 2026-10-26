---
title: Quickstart on a Fresh VPS
description: Step-by-step instructions to install Nitrobase on Ubuntu or Debian using the automated installation script.
---

The fastest way to install Nitrobase on a brand new Ubuntu or Debian VPS is using the automated installer script (`install.sh`).

## 1-Command Installation

Connect to your server via SSH as `root` and run:

```bash
curl -fsSL https://raw.githubusercontent.com/nitrobase/nitrobase/main/scripts/install.sh \
  | sudo bash -s -- --repo nitrobase/nitrobase
```

:::note[Custom Repository]
Replace `nitrobase/nitrobase` with your own GitHub organization or Gitea/Forgejo repository if running from a private fork.
:::

## What the Installer Does Automatically

The installer script is completely **idempotent** and performs the following tasks:

1. **Environment Verification:** Checks root privileges, operating system compatibility, available CPU, RAM (recommends at least 2 GB), and ensures port `3000` is open.
2. **Docker Provisioning:** Installs Docker CE from Docker's official apt repository if not already installed.
3. **Secret Generation:** Creates `/opt/nitrobase` directory with permission `0600` holding cryptographically secure secrets:
   * `ENCRYPTION_KEY` (32 bytes hex)
   * `SESSION_SECRET` (32 bytes hex)
   * `POSTGRES_PASSWORD` (32 bytes hex)
4. **One-Time Setup Token:** Generates a secure `SETUP_TOKEN` and prints it to your terminal. This token is required to claim the administrator account on first login, preventing unauthorized takeover.
5. **Starts Container Services:** Pulls `docker-compose.prod.yml`, brings up the PostgreSQL and Nitrobase containers, and waits until the health check at `/api/health` passes.

## Useful Installation Options

```bash
# Specify a custom installation directory
bash install.sh --dir /data/nitrobase

# Bind panel to localhost only (recommended when using SSH Tunnel or reverse proxy)
bash install.sh --panel-bind 127.0.0.1:3000

# Attach custom domain with automated Let's Encrypt SSL
bash install.sh --domain panel.yourdomain.com

# Re-run installer to change or upgrade version
bash install.sh --version v1.2.0

# Uninstall Nitrobase (retains database and .env configuration)
bash install.sh --uninstall

# Full purge (uninstalls and deletes all database files permanently)
bash install.sh --uninstall --purge
```

## Accessing Your Panel

Once installation completes, open your browser and navigate to:

```text
http://<your-server-ip>:3000
```

Follow the **First-Run Setup** guide to claim your admin account using your `SETUP_TOKEN`.
