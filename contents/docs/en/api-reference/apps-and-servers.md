---
title: Apps & Servers Endpoints
description: Key endpoints for querying apps, triggering redeployments, and fetching server statuses.
---

## List All Apps
```http
GET /api/v1/apps
```

## Trigger App Redeployment
```http
POST /api/v1/apps/{appId}/redeploy
```

## List Managed Servers
```http
GET /api/v1/servers
```
