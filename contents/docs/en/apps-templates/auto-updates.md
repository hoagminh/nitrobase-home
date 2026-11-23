---
title: Automated Updates & Rollback
description: Scheduled update checks for templates, databases, and Git apps; backup-first updates; maintenance windows; and rollback modes.
---

Nitrobase monitors versioned apps (marketplace templates, standalone databases, and Git branches) for newer releases and provides one-click or automated backup-first updates with rollback protection.

## Update Checks

- Scheduled via `APP_UPDATE_CHECK_CRON` (default `41 */6 * * *`, every 6 hours) when `APP_UPDATE_CHECK_ENABLED=true`.
- Git branch tip checks can be toggled independently with `APP_UPDATE_CHECK_GIT=true`.
- Available updates appear with an **Update available** badge on the dashboard, sidebar, and app list, and trigger the `app.update_available` notification event.
- Bulk updates let you update up to `50` apps (`APP_UPDATE_BATCH_MAX`) in a single batch.

## Safe Update Pipeline

When an update runs:

1. **Pre-update backup:** Enabled by default (mandatory for automatic updates). Creates a full backup before modifying the app.
2. **Deploy new version:** Resolves the new release/commit, renders updated config/overlays, pulls or builds images, and restarts services.
3. **Readiness & stability verification:** Waits for HTTP health probes and ensures every container stays ready with no restarts over `APP_READY_STABLE_MS` (default `20s`, `3` consecutive samples) and does not hit `APP_DEPLOY_RESTART_LIMIT` (default `6` restarts).
4. **Automatic rollback on failure:** Behavior is determined by the template or database engine's `[updates].rollback` policy:
   - `redeploy` (default): Redeploys the previous pinned version/commit (data untouched).
   - `restore`: Restores the pre-update backup (used when a new version migrates data files irreversibly, such as MariaDB or Valkey forward upgrades). If no backup was taken, falls back to `manual` so old binaries are never started against migrated data.
   - `manual`: Leaves the app for operator intervention and emits `app.update_failed`.

## Automatic Updates & Maintenance Windows

Under an app's **Update policy** (`app.update_policy.manage` permission), you can opt in to automatically apply **patch** or **minor** semver releases (non-semver versions are never auto-applied):

- Automatic updates always take a backup first.
- New automatic updates only start inside the configured maintenance window: `APP_AUTO_UPDATE_CRON` (default `0 3 * * *`, daily at 03:00) for `APP_AUTO_UPDATE_WINDOW_MINUTES` (default `120` minutes).
