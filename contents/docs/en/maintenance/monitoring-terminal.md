---
title: Monitoring, Logs & Web Terminal
description: Live server and container telemetry, metric rollups, built-in alert rules, live log streaming, and xterm.js web terminals.
---

Nitrobase collects server and container telemetry directly over SSH or local host execution—no external Prometheus, Grafana, or host agents required.

## Server & Container Monitoring

- **Collection loop:** Polls every Ready server every `15s` (`MONITORING_INTERVAL_MS`, toggleable with `MONITORING_ENABLED=true`) for CPU, load average, memory, swap, disk usage, network I/O, and per-container stats/status.
- **Retention & rollups:** Raw samples are kept for `24` hours (`METRICS_RAW_RETENTION_HOURS`) and rolled up into `5`-minute buckets kept for `7` days (`METRICS_ROLLUP_RETENTION_DAYS`), powering `1h`, `24h`, and `7d` history charts.
- **Built-in alert rules:**
  - **Disk usage:** Opens at `85%` (`ALERT_DISK_PERCENT`), resolves below `80%` (`ALERT_HYSTERESIS_PERCENT=5`).
  - **Memory usage:** Opens at `90%` (`ALERT_MEMORY_PERCENT`), resolves below `85%`.
  - **Restart loops:** Triggers when a container restarts `3` times within `10` minutes (`ALERT_RESTART_LOOP_COUNT`, `ALERT_RESTART_LOOP_WINDOW_MINUTES`).
  - **OOM kills & stopped services:** Detected directly from container inspection.
  - **Server unreachable:** Triggers after `3` consecutive failed ticks (`ALERT_UNREACHABLE_FAILURES`).
  - **Proxy network self-heal:** Automatically repairs containers detached from `nitrobase-network`, or raises a `network_flap` alert after `3` consecutive repair attempts (`NETWORK_REPAIR_MAX_ATTEMPTS`).

## Live Container Logs

Stream real-time container stdout/stderr in the browser (`/api/apps/<appId>/logs`) or fetch masked tails via the REST API / MCP server (`POST /api/v1/apps/{appId}/logs`). Secret values are automatically redacted before leaving the server. Up to `4` concurrent log streams per user (`APP_LOG_STREAMS_PER_USER`) are supported.

## Interactive Web Terminal

Open a full interactive PTY terminal powered by **xterm.js** over WebSockets:

- **Server terminal** (`server.terminal` permission): Shell access directly on a managed VPS or Localhost.
- **Container terminal** (`app.terminal` permission): Interactive `docker exec` shell inside any running app container.
- **Security:** Sessions revalidate every `30s` (`SESSION_REVALIDATE_INTERVAL_MS`), close immediately if the user's session is revoked, disconnect after `30` minutes of inactivity (`TERMINAL_IDLE_TIMEOUT_MS`), and are recorded in the audit log.
