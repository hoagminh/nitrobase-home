---
title: API Authentication
description: Generating scoped API tokens (sbk_...) and authenticating requests to the SaaSBase REST API.
---

SaaSBase exposes a REST API at `/api/v1`.

## Generating a Token
1. Go to **Settings -> API tokens**.
2. Click **Create Token**.
3. Choose **Personal Token** (acts with your user permissions) or **Team Token** (scoped permissions).
4. Copy your token (starts with prefix `sbk_`). Tokens are hashed and never shown again.

## Using the Token
Pass the token in the `Authorization` HTTP header:
```bash
curl -H "Authorization: Bearer sbk_your_token_here" \
  https://panel.example.com/api/v1/apps
```
