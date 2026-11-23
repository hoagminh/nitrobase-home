---
title: Nitrobase Self-Backup
description: Encrypted backups of the Nitrobase control panel database, manifest format, and scheduled off-site copies.
---

In addition to backing up your apps, Nitrobase backs up its own PostgreSQL control-plane database (servers, apps, encrypted credentials, domains, schedules, audit logs, and team configuration) under **Data → Backups** (requires `instance.manage` permission, available to Instance Administrators).

## What a Self-Backup Contains

Each self-backup is uploaded as `nitrobase/<date>-<id>.tar.gz.enc` along with a recorded SHA-256 checksum:

1. **PostgreSQL dump (`nitrobase.sql`):** Full logical dump created with `pg_dump` (`SELF_BACKUP_PG_DUMP`).
2. **Manifest:** Metadata including schema/app version, timestamp, and instance marker.
3. **Portable OpenSSL Encryption:** Gzipped tar archive encrypted using OpenSSL `aes-256-cbc` with PBKDF2-SHA256 (`SELF_BACKUP_PBKDF2_ITERATIONS=200000`) and your `ENCRYPTION_KEY`.

## Mandatory Pre-Upgrade Self-Backup

Whenever you trigger an in-panel Nitrobase upgrade under **Settings → Instance**, Nitrobase requires and takes a fresh self-backup to your chosen destination before pulling the new image or running database migrations.

:::caution[Keep Your ENCRYPTION_KEY Separate]
The self-backup archive is encrypted with `ENCRYPTION_KEY`, and the secrets inside the dumped database are also encrypted with `ENCRYPTION_KEY`. Store your `.env` (or `ENCRYPTION_KEY`) in a separate password manager—never in the same bucket as your backups.
:::
