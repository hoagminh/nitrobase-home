---
title: Stream log Job thời gian thực qua SSE
description: Theo dõi tiến trình build và log triển khai thời gian thực bằng Server-Sent Events.
---

Endpoint stream log triển khai theo thời gian thực:

```http
GET /api/v1/jobs/{jobId}/stream
Accept: text/event-stream
```

```bash
curl -N -H "Authorization: Bearer $TOKEN" \
  https://panel.domain-cua-ban.com/api/v1/jobs/job_123/stream
```
