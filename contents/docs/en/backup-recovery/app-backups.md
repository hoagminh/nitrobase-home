---
title: App Backups & Schedules
description: Set up automated backup schedules for applications and databases with retention policies.
---

## Configuring Automated Backups
1. Open your App or Database in the dashboard.
2. Navigate to the **Backups** tab.
3. Choose your **Storage Destination**.
4. Set your backup frequency using standard cron syntax (e.g. `0 2 * * *` for daily at 2:00 AM).
5. Specify **Retention Count** (e.g. keep the last 7 daily backups).

## Backup Catch-Up (BACKUP_CATCH_UP)
If your server was offline or rebooting when a scheduled backup was supposed to run, Nitrobase detects the missed schedule and runs a single catch-up backup immediately upon startup.
