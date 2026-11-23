---
title: Reverse Proxy & Trusted Headers
description: Configuring TRUST_PROXY, TRUSTED_PROXY_HOPS, APP_URL, and HSTS security headers behind Traefik or Cloudflare.
---

When Nitrobase runs behind a reverse proxy—such as its own Traefik v3 panel route, an external proxy, or Cloudflare—incoming TCP connections originate from the proxy rather than the end user.

## Configuring `TRUST_PROXY` and `TRUSTED_PROXY_HOPS`

To ensure login rate limiting, API rate limits, audit logs, and security alerts (`security.new_login`) record the real client IP address:

```bash
APP_URL=https://panel.example.com
TRUST_PROXY=true
TRUSTED_PROXY_HOPS=1
```

- **`TRUST_PROXY` (default `false`):** Only enable this when **every** request to Nitrobase arrives through a trusted reverse proxy (e.g. after setting `PANEL_BIND=127.0.0.1:3000`). If plain direct access is open, clients could spoof `X-Forwarded-For`.
- **`TRUSTED_PROXY_HOPS` (default `1`, range `1–5`):** The number of trusted proxies in front of Nitrobase that append to `X-Forwarded-For`. Nitrobase reads the IP that many entries from the **right** and ignores anything further left sent by the client.
  - Behind Nitrobase's own Traefik panel route only: `TRUSTED_PROXY_HOPS=1`.
  - Behind Cloudflare + Traefik: `TRUSTED_PROXY_HOPS=2`.
- **`APP_URL`:** Set to your panel's public `https://` URL. Nitrobase marks session cookies `Secure` only when `APP_URL` starts with `https://`, and uses it for absolute links in invite URLs, notification messages, and the OpenAPI server URL.

## Security Headers Middleware (Traefik)

Nitrobase manages a shared `secure-headers` middleware in `/etc/nitrobase/traefik/dynamic/middlewares.yml` for routed apps, including HTTP Strict Transport Security (HSTS):

- `TRAEFIK_HSTS_SECONDS` (default `31536000` — 1 year)
- `TRAEFIK_HSTS_PRELOAD` (default `true`; set to `false` if any app domains might need plain HTTP in the future, since browser HSTS preload lists are difficult to undo)
