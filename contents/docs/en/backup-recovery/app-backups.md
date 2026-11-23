---
title: App Backups & Schedules
description: Consistent database + volume backups (.tar.zst), automated schedules, retention policies, catch-up runs, and verified restores.
---

Every marketplace app, standalone database, and custom compose app can be backed up manually or on a recurring schedule, then restored in place or cloned as a brand-new app.

## What an App Backup Contains

App backups are built on the app's server by an isolated throwaway tools container (`nitrobase-backup-tools`, no network, no `MKNOD`) as a zstd-compressed archive (`.tar.zst`, `BACKUP_ZSTD_LEVEL=6`) and uploaded via `rclone`:

- `manifest.json`: App ID, template version, pinned commit SHA, and the SHA-256 checksum and byte size of every archive member.
- `env.enc`: The app's `.env` and service secrets, encrypted with `ENCRYPTION_KEY` (AES-256-GCM Format v3).
- `compose/docker-compose.yml`: The deployed compose file.
- `db/<file>`: Consistent database dump (e.g. `pg_dumpall`, `mysqldump`, `mariadb-dump`, Redis RDB, MongoDB archive) when the template or engine defines a database strategy.
- `files/<n>.tar` & `volumes/<n>.tar`: Configured bind `paths` and named Docker `volumes`.

When a template specifies both `stop` and a database dump, Nitrobase stops writer services first (leaving the database container running), dumps the database consistently, stops the database if configured, archives files/volumes, and restarts only the services that were running before the backup.

## Schedules, Retention & Catch-Up

1. Open an app or database and go to the **Backups** tab (`backup.policy.manage` permission).
2. Select a **Destination**, **Cron schedule** (default `0 3 * * *`, minimum interval `60` minutes via `BACKUP_MIN_INTERVAL_MINUTES`), and **Keep last** retention count (default `7`, max `1000`).
3. **Missed backup catch-up (`BACKUP_CATCH_UP=true`):** If Nitrobase was offline when a scheduled backup was due, it detects the missed run and catches up automatically on startup.
4. **Stale backup alerts:** Nitrobase checks enabled schedules daily (`BACKUP_STALE_CRON`, default `37 7 * * *`) and emits `backup.stale` if no successful backup occurred within `BACKUP_STALE_DAYS` (default `2` days).

## Restoring a Backup

Nitrobase verifies the archive's SHA-256 checksum, validates that it contains only regular files and expected members, checks every member against `manifest.json`, and then restores:

- **Restore in place:** Redeploys the app at the backed-up commit/version and loads the database dump and volumes before starting services.
- **Restore as a new app:** Creates a new app with its own folder and domains loaded with the backed-up data.
- **Download archive:** Download `.tar.zst` archives directly from the dashboard (`backup.download` permission; for databases, also requires `database.credentials.reveal`).
