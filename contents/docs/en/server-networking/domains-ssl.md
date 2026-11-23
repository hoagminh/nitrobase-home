---
title: Domains & SSL (Traefik v3)
description: Automatic free sslip.io HTTPS domains, custom domains with Let's Encrypt, DNS checks, and certificate monitoring.
---

Nitrobase uses **Traefik v3** (`nitrobase-traefik`) with flat dynamic route files under `/etc/nitrobase/traefik/dynamic/app-<key>.yml` so routing changes apply immediately with zero proxy restarts.

## Free Automatic Domains (`sslip.io`)

When you deploy a routed app without specifying a custom domain, Nitrobase automatically provisions a free `*.sslip.io` domain (configurable via `FREE_DOMAIN_PROVIDER`) pointing to the server's public IP, complete with an automatic Let's Encrypt HTTPS certificate.

## Adding Custom Domains

1. At your DNS provider, create an **A record** (or CNAME) pointing your domain (e.g. `app.example.com`) to your server's public IP address.
2. Open your app in Nitrobase, go to the **Domains** tab, and add the domain.
3. Nitrobase runs DNS checks, writes the updated Traefik dynamic route file, and Traefik automatically requests a TLS certificate from Let's Encrypt (`ACME_EMAIL`, defaulting to the instance administrator's email).
4. After deploying or changing routes, Nitrobase automatically re-checks domain reachability and TLS status after `DOMAIN_RECHECK_DELAY_MS` (default `20s`).

## Multi-Service & Path Routing

Templates can declare multiple routed services and path prefixes in `[[domains]]`:

- **Primary domain:** Assigned to the primary service (e.g. `app.example.com`).
- **Secondary subdomains:** Additional services receive `<subdomain>.<domain>` (for example, RustFS routes the S3 API on `app.example.com` and the console on `console.app.example.com`).
- **Path-based routing:** Services on the same host can be mounted under specific path prefixes (longest prefix wins)—for example, Appwrite routes console on `/`, API on `/v1`, and realtime on `/v1/realtime`.
- **Basic auth:** Templates can declare `basic_auth` middleware backed by bcrypt-hashed credentials (`0600` file).
- **Extra domain policies:** Some apps (such as auth-sensitive backends) warn or refuse extra domains on a service when sign-in only works on the primary domain.

## Certificate Expiry Monitoring

Nitrobase scans every managed domain's TLS certificate daily (`CERT_SCAN_CRON`, default `23 6 * * *`) and emits `cert.expiring` (within `CERT_EXPIRY_WARNING_DAYS`, default `14` days) or `cert.error` notification events if a renewal fails.

## Panel Domain (HTTPS for Nitrobase)

Configure a custom HTTPS domain for the Nitrobase panel itself either at install time (`--domain panel.example.com`) or later in **Settings → Instance → Panel domain**. Once enabled, set `PANEL_BIND=127.0.0.1:3000` in `.env` so plain HTTP is no longer exposed on the host.
