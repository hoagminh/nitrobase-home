---
title: Cloudflare Tunnel Integration
description: Publish apps without opening ports 80 or 443 using Cloudflare Tunnel and Traefik's isolated tunnel entrypoint.
---

A managed server can publish its apps through a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) instead of exposing public ports `80` and `443`. Nitrobase only requires the tunnel connector token—it never calls the Cloudflare API or stores Cloudflare account credentials.

## Setup Steps

1. In the **Cloudflare Zero Trust** dashboard, go to **Networks → Tunnels**, create a remotely managed tunnel (`cloudflared`), and copy its connector token.
2. In Nitrobase, open **Server → Settings → Cloudflare Tunnel**:
   - Paste the connector token (stored in `/etc/nitrobase/tunnel/cloudflared.env` with `0600` permissions and encrypted in PostgreSQL).
   - Enable the tunnel.
   - Optionally enable **Tunnel only** mode so Traefik does not bind public ports `80`/`443` on the host firewall.
3. In Cloudflare Zero Trust, add a **Public Hostname** for each domain pointing to the service:
   ```text
   http://nitrobase-traefik:8081
   ```
4. In Nitrobase, mark the domain as **Via Cloudflare Tunnel** in the app's **Domains** tab.

## Network Isolation Architecture

Nitrobase isolates tunnel traffic on a dedicated private Docker network (`nitrobase-tunnel`, default subnet `172.31.254.0/29`) shared **only** by `nitrobase-traefik` (bound to `172.31.254.2:8081`) and `nitrobase-cloudflared`:

- App containers on `nitrobase-network` cannot reach the tunnel entrypoint.
- Tunnel-routed domains are attached exclusively to the private `:8081` entrypoint, so nobody can bypass Cloudflare Access or WAF by sending requests directly to the server's public IP on port `80`/`443`.
- Nitrobase probes `cloudflared`'s internal `/ready` metrics endpoint (`CLOUDFLARED_METRICS_PORT`, default `20241`) to report live tunnel connector status.

:::tip[Zero Open Web Ports]
With **Tunnel only** enabled, you can block ports `80` and `443` completely in your VPS firewall—only outbound connections from `cloudflared` are needed.
:::
