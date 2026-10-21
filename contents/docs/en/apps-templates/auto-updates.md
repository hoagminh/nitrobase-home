---
title: Automated Updates & Rollback
description: Automatic semver version checking, safe pre-update backups, and health check rollbacks.
---

SaaSBase periodically checks upstream registries for newer template releases and Git branch commits.

## Safe Update Pipeline
1. **Pre-Update Backup:** Takes an automatic snapshot of the app's persistent volumes.
2. **Deploy New Version:** Pulls the new image and updates configuration.
3. **Health Check Verification:** Waits for the container to become healthy.
4. **Automatic Rollback:** If the health check fails, the previous container version and backup are restored automatically.
