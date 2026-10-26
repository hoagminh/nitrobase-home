---
title: Nitrobase Self-Backup
description: Complete panel database backup, manifest archives, and OpenSSL encryption.
---

Nitrobase can take a self-backup of its own PostgreSQL database under **Data -> Backups -> Take Self-Backup**.

The backup bundle contains:
1. Complete PostgreSQL database dump via `pg_dump`.
2. Metadata manifest (schema version, timestamp, instance marker).
3. Encryption using OpenSSL AES-256-CBC PBKDF2 with your master `ENCRYPTION_KEY`.
