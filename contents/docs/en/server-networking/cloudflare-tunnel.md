---
title: Cloudflare Tunnel Integration
description: Publish applications without opening ports 80/443 using Cloudflare Zero-Trust Tunnel.
---

A server can publish its applications through a **Cloudflare Tunnel** instead of open public ports. SaaSBase only requires the connector token—it never needs access to your Cloudflare account API.

## Setup Steps

1. In Cloudflare Zero Trust Dashboard, go to **Networks -> Tunnels -> Create a tunnel (cloudflared)**.
2. Copy the tunnel token.
3. In SaaSBase, open **Server -> Settings -> Cloudflare Tunnel**. Paste the token and enable **Tunnel only**.
4. In Cloudflare Dashboard, add a **Public Hostname** pointing to service:
   ```text
   http://saasbase-traefik:8081
   ```

:::tip[Zero Open Ports]
In Tunnel-Only mode, ports 80 and 443 can be completely blocked on your server firewall. Cloudflare terminates TLS and securely tunnels requests directly to Traefik's private entrypoint.
:::
