---
title: Disaster Recovery & Split-Brain Guard
description: Recovering Nitrobase on a new server from a self-backup (in-panel or via CLI) and understanding split-brain protection.
---

If the server hosting the Nitrobase panel fails or you need to migrate the panel to a new machine, you can recover your entire control plane from a **self-backup** (`nitrobase/<date>-<id>.tar.gz.enc`) plus your old `ENCRYPTION_KEY`.

## Option 1: Restore From the Panel (Recommended)

1. Install a fresh Nitrobase instance on the new machine (using the install script, Docker installer, or manual Compose).
2. Open the panel's **First-Run Setup** page and select **Restore from a backup**.
3. Enter the new instance's **Setup Token**, upload `nitrobase/<date>-<id>.tar.gz.enc`, and enter both its **SHA-256 checksum** (shown in **Data → Backups**) and the **old `ENCRYPTION_KEY`**.
4. Nitrobase verifies the checksum, decrypts the archive (with decompression-bomb limits of `2 GB` expanded / `256 MB` upload), loads `nitrobase.sql` using an unprivileged PostgreSQL role (`nitrobase_restore`, blocking `COPY ... PROGRAM` or superuser statements), runs any migrations for the new version, and re-encrypts all stored secrets with the new server's `ENCRYPTION_KEY`.

## Option 2: Manual CLI Restore

If you prefer to restore by hand on a fresh install configured with the **same** `ENCRYPTION_KEY` and `SESSION_SECRET`:

```bash
# 1. Verify integrity against the checksum recorded in Data → Backups
sha256sum backup.tar.gz.enc

# 2. Decrypt and extract
export ENCRYPTION_KEY='<your-old-encryption-key>'
openssl enc -d -aes-256-cbc -pbkdf2 -md sha256 -iter 200000 \
  -pass env:ENCRYPTION_KEY -in backup.tar.gz.enc | tar -xzf -

# 3. Start PostgreSQL and load the dump
docker compose -f docker-compose.prod.yml up -d postgres
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U nitrobase -d nitrobase < nitrobase-backup/nitrobase.sql

# 4. Start the panel
docker compose -f docker-compose.prod.yml up -d
```

## Split-Brain Guard

Every Nitrobase database stores an `instance_id` that is matched against a marker file on the panel's data volume (`INSTANCE_MARKER_FILE`, default `.data/instance-id`, overridable with `INSTANCE_ID`).

When a database is restored onto a new machine, the marker does not match, so the panel boots **Paused**:

- No background jobs, scheduled backups, app updates, or monitoring loops run.
- Managed servers are not touched while the old panel might still be running.

**Stop the old Nitrobase installation permanently first**, then sign in as an instance administrator and click **"This database was moved — resume here"** to take over ownership.
