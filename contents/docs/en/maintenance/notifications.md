---
title: Alerts & Notifications
description: Configure Email (SMTP), Discord, Slack, Telegram, and HMAC-signed Webhook channels with deduplication and event subscriptions.
---

Configure notification channels under **Settings → Notifications** (`notification.manage` permission) to receive real-time alerts for jobs, backups, monitoring thresholds, TLS certificates, updates, and security events.

## Supported Channels

| Channel | Configuration | Notes |
| :--- | :--- | :--- |
| **Email (SMTP)** | Host, port (`587`/`465`), security (`STARTTLS`, `TLS`, or `None` on private network), credentials, from/to addresses. | Supports comma-separated recipient lists. |
| **Discord** | Discord channel Webhook URL. | Public HTTPS by default; optional private network toggle. |
| **Slack** | Slack Incoming Webhook URL. | Public HTTPS by default; optional private network toggle. |
| **Telegram** | Bot Token (from `@BotFather`) and numeric Chat ID or `@channelname`. | Bot must be a member of the target chat/channel. |
| **Webhook** | Endpoint URL + auto-generated 64-hex signing secret. | Sends a JSON `POST` signed with HMAC-SHA256 in the `x-nitrobase-signature` header (`x-nitrobase-timestamp`, `x-nitrobase-event`, `x-nitrobase-delivery`). |

## Event Categories

Each channel lets you choose which events to subscribe to:

- **Jobs:** Deployment/job failures & successes, Git build failures & deployments, scheduled task failures/skips, rejected push webhooks.
- **Backups:** `backup.failed`, `backup.stale` (no successful backup within `BACKUP_STALE_DAYS`, default 2 days).
- **Monitoring:** `alert.opened`, `alert.resolved`, `server.unreachable`, `server.reachable`.
- **Domains & certificates:** `cert.expiring` (within 14 days), `cert.error`.
- **Updates:** `app.update_available`, `app.update_rolled_back`, `app.update_failed`.
- **Security (Critical):** `security.new_login` (sign-in from a new device/IP), `security.2fa_disabled`, and `security.secret_revealed` (opt-in).

## Reliability & Storm Protection

- **Retries:** Failed deliveries retry up to `4` attempts (`NOTIFY_MAX_ATTEMPTS`) with exponential backoff starting at `5s`.
- **Deduplication & Rate Limiting:** Identical `(event, subject)` notifications on a channel are deduped for `30` minutes (`NOTIFY_DEDUPE_WINDOW_MS`), capped at `30` deliveries/hour per channel (`NOTIFY_RATE_LIMIT`).
- **Critical bypass:** Security events (`security.new_login`, `security.2fa_disabled`, `security.secret_revealed`) are **never** deduped or rate-limited so an alert storm can never hide a security incident.
- **Localization:** Notification messages use `NOTIFY_LOCALE` (default `en`, supports `vi`). Delivery history is retained for `30` days.
