---
title: Domains & SSL (Traefik v3)
description: Configuring custom domains, automatic Let's Encrypt certificates, and free sslip.io wildcards.
---

Nitrobase leverages **Traefik v3** to dynamically discover and route HTTP/HTTPS traffic to containers without restarting the proxy.

## Automatic Free Domains (sslip.io)
For quick testing and development, Nitrobase automatically assigns free wildcard subdomains powered by `sslip.io`:
```text
https://app-123.192.168.1.100.sslip.io
```

## Adding Custom Domains
1. In your DNS provider (Cloudflare, Namecheap, Route 53), add an **A record** pointing your domain to the server's public IP.
2. In Nitrobase, open your App, switch to the **Domains** tab, and enter your domain name (e.g. `api.example.com`).
3. Click **Save & Apply**. Traefik immediately requests a free TLS certificate from Let's Encrypt via ACME HTTP-01 challenge.
