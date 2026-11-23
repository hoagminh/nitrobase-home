---
title: Security & Encryption
description: Authenticated AES-256-GCM encryption at rest (Format v3), compose security policy, SSRF protections, and login hardening.
---

Security is built into every layer of Nitrobase—from authenticated encryption of stored secrets to strict Docker Compose sandboxing and login rate limiting.

## Secrets Encryption at Rest (Format v3)

All sensitive data stored in PostgreSQL—SSH private keys, server passwords, app environment variables, service secret files, database credentials, backup destination keys, cloud sync tokens, and notification secrets—is encrypted at rest using **Format v3**:

- **Algorithm:** `AES-256-GCM` (authenticated encryption with 12-byte random IV and pinned 16-byte authentication tag).
- **Key Derivation:** `HKDF-SHA256` deriving a 32-byte key from `ENCRYPTION_KEY` with fixed salt `nitrobase/secrets-at-rest` and info `aes-256-gcm/v3`.
- **Payload Format:** `v3:` + `base64(iv[12] || authTag[16] || ciphertext)`.
- **Tamper Detection:** Any modification, truncation, missing prefix, or wrong key causes GCM authentication to fail immediately.
- **Rotation Fallback:** During decryption, if the current `ENCRYPTION_KEY` fails GCM authentication, Nitrobase automatically tries each key in `ENCRYPTION_KEY_PREVIOUS` (comma-separated, newest first) so pre-rotation backup archives (`env.enc`) remain restorable.

:::note[Self-Backup Archive Encryption]
While database fields and app `env.enc` files use AES-256-GCM (Format v3), Nitrobase's portable **self-backup** archives (`.tar.gz.enc`) are encrypted with OpenSSL `aes-256-cbc -pbkdf2 -md sha256 -iter 200000` using `ENCRYPTION_KEY`, so you can decrypt them on any machine with standard `openssl`.
:::

## Docker Compose Security Policy

Every compose file—from marketplace templates, upstream GitHub repositories, or custom compose—is parsed, rewritten, and validated both at render time and again against the fully interpolated `docker compose config --format json` model on the server:

- **No host escapes:** Relative bind mounts, `env_file`, and build contexts are pinned inside `/etc/nitrobase/apps/<folder>`. Bind-mounting the app folder itself, `.env`, `custom.env`, `service-env/`, or `docker-compose.yml` is always rejected, and host paths are verified not to traverse symlinks.
- **No unsafe privileges by default:** `privileged`, `network_mode: host`, `pid/ipc/uts/userns_mode: host`, `cap_add`, `devices`, `security_opt`, Docker socket mounts, host paths outside the app folder, and external volumes/networks are rejected unless explicitly allowlisted in a template's `[security]` section (which triggers a confirmation warning in the deploy wizard).
- **Always blocked:** `container:` namespaces of other apps, `network_mode: bridge`, `device_cgroup_rules`, `cgroup_parent`, `runtime`, `sysctls`, `isolation`, `oom_kill_disable`, `use_api_socket`, `external_links`, `include`, remote build contexts, and `$` variable interpolation inside security-relevant fields.
- **No reserved labels or ports:** `traefik.*`, `com.docker.*`, and `nitrobase.*` labels are stripped/blocked, and published `ports` are stripped unless explicitly opt-in via template `[[ports]]` (with reserved host ports `22, 80, 443, 2375, 2376, 3000` always blocked).

## Secret Masking & Auditing

- **Automatic secret masking:** Environment variables marked `secret = true` in a template—as well as any variable whose name matches `SECRET_ENV_NAME_PATTERN` (`PASS|SECRET|TOKEN|PRIVATE|_KEY$|^KEY$|ENC_KEY|CRYPTO`) or whose value is a URL containing credentials—are masked in the UI, API responses, and container logs.
- **Audit trail:** Every administrative action, API/MCP call, and secret reveal is recorded in the team's audit log (retained for 365 days by default, exportable up to 50,000 rows).

## Account & Session Hardening

- **Passwords:** Hashed with `bcrypt` (`PASSWORD_BCRYPT_COST`, default `12`), minimum 8 characters.
- **Two-Factor Authentication (2FA):** TOTP with 10 single-use recovery codes (`TWO_FACTOR_RECOVERY_CODES`).
- **Rate limiting:** Built-in limits on failed logins (`LOGIN_RATE_PER_IP=20`, `LOGIN_RATE_PER_ACCOUNT=8` per 15 min), 2FA attempts (`6` per 15 min), registrations (`10` per 15 min), API requests (`120` per min), and webhooks (`30` per min).
- **SSRF protection:** Notification webhooks, SMTP hosts, S3 endpoints, and cloud sync connections block private/loopback/link-local addresses and plain HTTP unless explicitly opted in (e.g. `Private network` toggle on channels/S3).
