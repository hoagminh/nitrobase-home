---
title: Upgrading Nitrobase
description: Upgrade Nitrobase from the panel with automatic self-backup and health-check rollback, or from the command line.
---

Nitrobase checks for new releases every 6 hours (`UPDATE_CHECK_CRON`, default `23 */6 * * *`) against `RELEASE_REPO` (default `AydenGroup/nitrobase`). Set `RELEASE_CHANNEL=prerelease` to receive beta/pre-release updates, or `UPDATE_CHECK_ENABLED=false` to disable checks.

## Option 1: In-Panel Upgrade (Recommended)

Instance administrators can upgrade directly from **Settings → Instance**:

1. **Drain jobs:** Nitrobase waits until no jobs are running and refuses new jobs until the upgrade finishes.
2. **Mandatory self-backup:** Takes a fresh encrypted self-backup to your chosen destination before making any changes.
3. **Updater container:** Pulls the new image and launches a short-lived updater container (`nitrobase-updater` using `docker:28.5.1-cli`) through the host Docker socket. The updater backs up `.env` to `.env.before-upgrade`, updates `NITROBASE_VERSION`, and recreates `nitrobase_app`.
4. **Health check & rollback:** Waits up to `UPGRADE_HEALTH_TIMEOUT_SECONDS` (default `300s`) for `/api/health` to pass. If the new version fails to become healthy, the updater automatically restores the previous version.

:::caution[Database Migrations on Rollback]
While the panel container rolls back automatically on health-check failure, database schema migrations are not automatically reversed. If a newer version migrated PostgreSQL and then failed, restore the mandatory self-backup taken in step 2.
:::

## Option 2: Upgrade From the Shell

### Using the Docker Installer

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/nitrobase:/opt/nitrobase \
  ghcr.io/aydengroup/nitrobase-installer:beta --version <version>
```

### Using the Install Script

```bash
curl -fsSL https://nitrobase.app/install.sh | sudo bash -s -- --version <version>
```

### Manual Docker Compose

In your install directory, download the new release's `docker-compose.prod.yml`, update `NITROBASE_VERSION` in `.env`, and run:

```bash
docker compose -f docker-compose.prod.yml up -d
```
