---
title: Realtime Job Logs Streaming (SSE)
description: Stream build and deployment logs in real-time using Server-Sent Events (SSE).
---

SaaSBase provides a streaming endpoint for monitoring active jobs:

```http
GET /api/v1/jobs/{jobId}/stream
Accept: text/event-stream
```

```bash
curl -N -H "Authorization: Bearer $TOKEN" \
  https://panel.example.com/api/v1/jobs/job_123/stream
```
