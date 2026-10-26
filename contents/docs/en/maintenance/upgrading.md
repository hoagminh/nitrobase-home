---
title: Upgrading Nitrobase
description: Zero-downtime upgrades via short-lived updater container and automatic health check rollbacks.
---

Nitrobase includes an automated in-place upgrade mechanism under **Settings -> Instance -> Upgrade to vX**.

## How In-Place Upgrades Work
1. The panel takes an automatic self-backup before starting.
2. An isolated **Updater Container** is launched with access to the Docker socket.
3. The updater stops the old panel, runs database migrations, and brings up the new version.
4. It waits up to `UPGRADE_HEALTH_TIMEOUT_SECONDS` for the `/api/health` endpoint to answer.
5. If the new version fails health checks, it rolls back to the previous image automatically.
