---
title: Rotating ENCRYPTION_KEY
description: Safely re-encrypt all stored credentials and secrets in PostgreSQL with a new master ENCRYPTION_KEY.
---

Because every stored secret in Nitrobase (SSH keys, server passwords, app env vars, database credentials, backup destination keys, cloud sync tokens, and notification secrets) is encrypted with `ENCRYPTION_KEY`, changing `.env` directly without migrating the database would render stored secrets unreadable.

Use the bundled `scripts/rotate-encryption-key.ts` script to re-encrypt all database secrets atomically.

## Rotation Procedure

1. **Generate a new 32-byte key** (save it in your password manager):
   ```bash
   openssl rand -hex 32
   ```

2. **Stop the panel container** so no writes occur during rotation:
   ```bash
   cd /opt/nitrobase
   docker compose -f docker-compose.prod.yml stop app
   ```

3. **Run the key rotation script** with `OLD_ENCRYPTION_KEY` set to your current key and `ENCRYPTION_KEY` set to the new key:
   ```bash
   docker compose -f docker-compose.prod.yml run --rm \
     -e OLD_ENCRYPTION_KEY='<current-key>' \
     -e ENCRYPTION_KEY='<new-key>' \
     app bun scripts/rotate-encryption-key.ts
   ```

4. **Update `.env`:**
   - Replace `ENCRYPTION_KEY` with the new key.
   - Add the old key to `ENCRYPTION_KEY_PREVIOUS` (comma-separated, newest first) so app backups (`env.enc`) created before the rotation can still be decrypted and restored until they age out:
     ```bash
     ENCRYPTION_KEY="<new-key>"
     ENCRYPTION_KEY_PREVIOUS="<current-key>"
     ```

5. **Start the panel again:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d app
   ```

:::note[Older Self-Backups]
Self-backup archives (`.tar.gz.enc`) taken before rotation remain encrypted with the old key. When decrypting an older self-backup manually with `openssl` or via First-Run Restore, supply the key that was active when that backup was created.
:::
