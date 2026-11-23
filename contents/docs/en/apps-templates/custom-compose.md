---
title: Custom Docker Compose Deployments
description: Deploy multi-container stacks using your own docker-compose.yml with automatic safety validation, Traefik routing, and volume backups.
---

When you need a multi-container stack that is not in the marketplace, use the **Custom compose** template (`source.type = "inline"`).

## How Custom Compose Works

1. Go to **Apps → New App → Custom compose**.
2. Paste your `docker-compose.yml` content and optional `.env` variables (stored encrypted in `apps.custom_spec_encrypted`).
3. Choose which service(s) and container port(s) Traefik should route to, and select the named volumes you want included in backups.
4. The deploy wizard analyses your compose file in real time and validates it against Nitrobase's **Compose Security Policy** before deploying.
5. After deployment, you can edit your compose file anytime under **App → Settings** with a diff preview and choose **Save** or **Save and redeploy**.

## Routing & Safety Rules

Custom compose apps go through the exact same rewrite and security pipeline as marketplace templates (with `[security]` allowlists empty):

- **Traefik routing:** Nitrobase strips any `traefik.*` or `com.docker.*` labels and generates a clean dynamic route file under `/etc/nitrobase/traefik/dynamic/app-<key>.yml`. Routed containers are attached to `nitrobase-network` by container name only after `docker compose up`.
- **Published ports:** Any `ports:` entries in your compose file are automatically stripped; HTTP/HTTPS traffic flows through Traefik.
- **Restart policy:** Services without an explicit `restart:` policy receive `APP_DEFAULT_RESTART` (`unless-stopped` by default) so they recover after a host reboot (while `restart: always` is normalized to `unless-stopped` so manual Stop persists).
- **Bind mounts:** Relative paths must stay inside the app folder (`/etc/nitrobase/apps/<folder>`). If your compose mounts config files that your app creates itself at runtime, list them under **Files the app creates itself** (`dataBinds`) in the wizard so Nitrobase does not treat an empty directory created by Docker as a missing file error.
- **Backups:** Scheduled and manual backups stop the app briefly and archive all selected named volumes into encrypted `.tar.zst` bundles.
