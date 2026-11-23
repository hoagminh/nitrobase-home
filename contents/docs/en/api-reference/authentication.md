---
title: API Authentication
description: Creating personal and team API tokens (nbk_...), permission presets, expiration, and rate limits for REST and MCP.
---

Nitrobase exposes a team-scoped REST API at `/api/v1` and a Model Context Protocol (MCP) server at `/api/mcp`. Both use the same bearer API tokens prefixed with `nbk_`.

## Creating an API Token

1. Navigate to **Settings → API tokens**.
2. Click **Create token** (personal tokens act within your permissions; team tokens require `tokens.manage`).
3. Pick a **Preset** or select individual permissions, and set an expiration (maximum lifetime `API_TOKEN_MAX_TTL_DAYS`, default `365` days):
   - **Read-only:** Lists servers, apps, jobs, backups, and metrics; changes nothing.
   - **Deployer (CI):** `app.deploy` (plus implied views) — deploys, redeploys, restarts apps, and follows jobs.
   - **Backups operator:** `backup.create` (plus implied views) — triggers and lists backups.
   - **Admin:** All team permissions you hold.
   - **AI agent (read-only):** `server.view`, `app.view`, `backup.view`, `monitoring.view` — every read-only MCP tool except `preflight_app` (which requires `app.deploy`).
   - **AI agent (operator):** Read-only agent permissions plus `app.deploy` and `backup.create` — reads everything, creates, deploys, starts, stops, restarts, and backs up apps.
4. Copy the generated token (`nbk_...`). Tokens are shown **once** and stored only as a cryptographic hash.

## Authenticating Requests

Send the token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer nbk_your_token_here" \
  https://panel.example.com/api/v1/apps
```

## Rate Limiting & Auditing

- **Rate limit:** `120` requests per minute per token (or per client IP before auth), configurable via `API_RATE_LIMIT` and `API_RATE_WINDOW_MS`. Exceeding the limit returns HTTP `429`.
- **Audit log:** Every REST and MCP call is recorded in the team's audit log (MCP calls are tagged `channel: mcp`).
- **Status codes:** `401` (missing, invalid, revoked, or expired token), `403` (token lacks required permission), `404` (resource not found in token's team), `429` (rate limited).
