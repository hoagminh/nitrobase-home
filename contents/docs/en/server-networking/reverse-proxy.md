---
title: Reverse Proxy & Trusted Headers
description: Handling client IP addresses, X-Forwarded-For headers, and rate limiting behind proxies.
---

When SaaSBase runs behind a reverse proxy (such as Traefik or Cloudflare), incoming requests may appear to originate from the proxy's IP address.

## Configuring TRUST_PROXY

To ensure that rate limiters, audit logs, and security notifications capture the authentic client IP address:

1. Set `TRUST_PROXY=true` in your SaaSBase `.env`.
2. Configure `TRUSTED_PROXY_HOPS` (default is `1`).

```bash
TRUST_PROXY=true
TRUSTED_PROXY_HOPS=1
```
