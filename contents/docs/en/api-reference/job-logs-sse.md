---
title: Realtime Job Logs Streaming (SSE)
description: Stream live deployment, build, and backup logs over Server-Sent Events (SSE) with Last-Event-ID resumption.
---

Mutating endpoints such as deploy, redeploy, start, stop, restart, create app, and backup return a job ID (`deploymentId`) immediately. You can either poll `GET /api/v1/jobs/{jobId}` or stream live logs in real time over **Server-Sent Events (SSE)**.

## Endpoint

```http
GET /api/v1/jobs/{jobId}/stream
Authorization: Bearer nbk_...
Accept: text/event-stream
```

Requires the `server.view` permission.

## Example with `curl`

```bash
curl -N -H "Authorization: Bearer $TOKEN" \
  https://panel.example.com/api/v1/jobs/<jobId>/stream
```

## Event Stream Behavior

- **`log` events:** Emitted as job log lines are produced (buffered in memory up to `JOB_MEMORY_LINES=2000` and flushed to PostgreSQL in batches).
- **`complete` event:** Sent once the job finishes (succeeded, failed, or cancelled), after which the stream closes.
- **Heartbeat:** Periodic keep-alive heartbeats every `15s` (`SSE_HEARTBEAT_MS`) prevent proxies from closing idle connections during long image pulls or builds.
- **Resumption:** Pass the `Last-Event-ID` header when reconnecting to resume from the last received log line without missing output.
