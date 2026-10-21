---
title: Moving Apps Between Servers
description: Migrate live applications and persistent data between VPS nodes with zero data loss.
---

Need to upgrade to a larger server or switch hosting providers?

Under **App -> Settings -> Move to another server**:
1. The app is stopped and backed up on the source server.
2. The encrypted archive is transferred to the target server via your configured S3/R2 storage destination.
3. The app is restored and verified on the target server.
4. Traefik routes and DNS records are updated automatically.
