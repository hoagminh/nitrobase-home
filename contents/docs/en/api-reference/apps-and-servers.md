---
title: REST API Endpoints
description: Complete reference of Nitrobase /api/v1 endpoints for servers, apps, templates, backups, monitoring, and jobs.
---

All endpoints below are relative to `https://<your-panel>/api/v1` and require `Authorization: Bearer nbk_...`. Every endpoint is also automatically exposed as an MCP tool (except SSE streaming).

## Servers & Monitoring

| Method | Path | Permission | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/servers` | `server.view` | List the team's servers. |
| `GET` | `/servers/{serverId}` | `server.view` | Get details for one server. |
| `GET` | `/servers/{serverId}/health` | `server.view` | Latest health snapshot (CPU, memory, disk, load), app/database counts, and alert thresholds. |
| `GET` | `/servers/{serverId}/metrics/{range}` | `monitoring.view` | Binned metric history over `range` (`1h`, `24h`, or `7d`). |

## Templates

| Method | Path | Permission | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/templates` | `app.view` | List deployable templates, editable inputs, requirements, and `advanced` flags. |
| `GET` | `/templates/{templateId}/versions` | `app.view` | List stable versions and `defaultRef` for a template. |

## Apps

| Method | Path | Permission | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/apps` | `app.view` | List the team's apps. |
| `POST` | `/apps/preflight` | `app.deploy` | Read-only pre-flight check for a new marketplace app (`{ ok, checks }`). |
| `POST` | `/apps` | `app.deploy` | Create and deploy a marketplace template app (runs pre-flight first; returns `{ appId, deploymentId }`). |
| `GET` | `/apps/{appId}` | `app.view` | Get app overview (domains, services; secrets masked). |
| `GET` | `/apps/{appId}/env` | `app.view` | Get `.env` text and variable metadata with all secret values masked. |
| `POST` | `/apps/{appId}/logs` | `app.view` | Read the last `tail` container log lines (optionally filtered by `service` and `timestamps`), with secrets masked. |
| `GET` | `/apps/{appId}/deployments` | `app.view` | List the app's last 50 deployments (newest first). |
| `POST` | `/apps/{appId}/deploy` | `app.deploy` | Without `version`: redeploy pinned commit. With `version`: update to it (optional `backupFirst`, `confirmDowngrade`). |
| `POST` | `/apps/{appId}/redeploy` | `app.deploy` | Redeploy the app at its pinned commit. |
| `POST` | `/apps/{appId}/start` | `app.deploy` | Start the stopped app, or one `service` (`{ service? }`). |
| `POST` | `/apps/{appId}/stop` | `app.deploy` | Stop the app (data kept), or one `service` (`{ service? }`). |
| `POST` | `/apps/{appId}/restart` | `app.deploy` | Restart the app, or one `service` (`{ service? }`). |

## Backups & Jobs

| Method | Path | Permission | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/apps/{appId}/backups` | `backup.view` | List an app's backups (newest first). |
| `POST` | `/apps/{appId}/backups` | `backup.create` | Start an immediate backup (`{ destinationId? }`; defaults to schedule's destination). |
| `GET` | `/backups/destinations` | `backup.view` | List team backup destinations (`{ id, name, type }`, no credentials). |
| `GET` | `/jobs` | `server.view` | List recent team jobs (deploys, backups, server actions). |
| `GET` | `/jobs/{jobId}` | `server.view` | Get status and details of a single job. |
| `GET` | `/jobs/{jobId}/stream` | `server.view` | Stream live job logs via Server-Sent Events (SSE). |

## Example Requests

```bash
# List apps
curl -H "Authorization: Bearer $TOKEN" https://panel.example.com/api/v1/apps

# Trigger a redeploy (returns { "deploymentId": "..." })
curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://panel.example.com/api/v1/apps/<appId>/redeploy

# Read last 100 masked log lines
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"tail": 100}' \
  https://panel.example.com/api/v1/apps/<appId>/logs
```
