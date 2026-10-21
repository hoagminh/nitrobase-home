---
title: Disaster Recovery & Split-Brain Guard
description: Recovering your entire infrastructure on a new machine and understanding split-brain protection.
---

## Split-Brain Guard
When a SaaSBase database is restored onto a new host, the panel boots into a **Paused** state. In this state:
* Interrupted jobs are not resumed.
* Cron backup schedules are suspended.
* New deployments are locked.

This prevents the new machine and the old machine from simultaneously controlling the same target servers and causing data corruption. Instance administrators will see a banner: **"This database was moved — resume here"**.

## Restoring via CLI
```bash
# 1. Decrypt backup archive
openssl enc -d -aes-256-cbc -pbkdf2 -md sha256 -iter 200000 \
  -pass env:ENCRYPTION_KEY -in backup.tar.gz.enc | tar -xzf -

# 2. Restore into clean PostgreSQL container
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U saasbase -d saasbase < saasbase-backup/saasbase.sql
```
