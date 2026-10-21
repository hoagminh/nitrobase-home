---
title: Git Repository Deployments
description: Deploy custom applications directly from GitHub or custom Git repositories with Dockerfile builds.
---

In addition to templates, you can deploy your own proprietary web applications directly from Git repositories.

## Deploying from a Repository
1. Navigate to **Apps -> New App -> Git Repository**.
2. Enter your repository clone URL (HTTPS or SSH with deploy key).
3. Specify the target **Branch** (e.g. `main`).
4. Select build method: **Dockerfile** or **Nixpacks**.
5. Set environment variables and port mappings.
6. Click **Deploy**. SaaSBase clones the branch tip and streams the build log in real-time.
