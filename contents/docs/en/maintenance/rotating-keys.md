---
title: Rotating ENCRYPTION_KEY
description: Command-line procedure for safely re-encrypting stored credentials with a new master key.
---

To rotate your master encryption key:

1. Stop the panel container:
```bash
docker compose -f docker-compose.prod.yml stop app
```

2. Execute the re-encryption script:
```bash
docker compose -f docker-compose.prod.yml run --rm \
  -e OLD_ENCRYPTION_KEY='<current-key>' \
  -e ENCRYPTION_KEY='<new-key>' \
  app bun scripts/rotate-encryption-key.ts
```

3. Update `ENCRYPTION_KEY` in your `.env` and add the old key to `ENCRYPTION_KEY_PREVIOUS` so existing backups can still be restored.
4. Restart the panel:
```bash
docker compose -f docker-compose.prod.yml up -d app
```
