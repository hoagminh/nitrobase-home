---
title: Moving Apps Between Servers
description: Migrate live apps and standalone databases between managed servers with automatic verification and rollback.
---

Need to upgrade to a larger VPS, move to a different region, or switch hosting providers? Nitrobase can move any deployed app or standalone database between servers (`app.move` permission) with automatic rollback if anything fails.

## How Moving an App Works

Open **App → Settings → Move to another server**, pick the target ready server (and an off-site storage destination if needed to transfer the backup archive), and start the move job:

1. **Pre-flight & Backup:** Nitrobase verifies the target server is ready and takes a full consistent backup of the app (database dump + volumes + encrypted `.env` + pinned commit/version) on the source server.
2. **Restore on Target:** Restores the app onto the target server with the **same app ID, data, and environment variables**.
3. **Health Verification:** Starts the containers on the target server and waits for all health and stability checks to pass.
4. **Cutover & Cleanup:** Only after the target instance is confirmed healthy does Nitrobase remove the old copy from the source server.

## Failure Safety

If any step fails before cutover, Nitrobase deletes the partial copy on the target server and restarts the original app on the source server untouched.

## Domains & DNS After Moving

- **Free `*.sslip.io` domains:** Updated automatically to point to the target server's IP address.
- **Custom domains:** The move job log lists the exact DNS records (A/CNAME) you need to update at your DNS provider to point to the new server's IP.
