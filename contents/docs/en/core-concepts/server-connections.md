---
title: Server Connections (SSH & Localhost)
description: How Nitrobase connects to remote VPS nodes over SSH2 and manages the local host through nsenter.
---

Nitrobase supports two server connection modes—both execute the exact same Docker, Traefik, backup, and monitoring commands through a unified executor layer.

## 1. Remote Servers (SSH2)

Remote Linux servers are managed over **SSH2** (`ssh2` library):

- **Authentication:** SSH private key (Ed25519 or RSA, generated inside Nitrobase or imported under **Settings → SSH keys**) or password authentication. All private keys, passphrases, and passwords are encrypted at rest with AES-256-GCM (Format v3).
- **Host key verification:** Nitrobase verifies the server's SSH host key fingerprint (TOFU—Trust On First Use—with explicit verification on change) to guard against MITM attacks.
- **Timeouts & keepalive:** Configurable via `SSH_READY_TIMEOUT_MS` (default `10s`), `SSH_KEEPALIVE_MS` (`10s`), `COMMAND_TIMEOUT_MS` (`10m`), and `TERMINAL_IDLE_TIMEOUT_MS` (`30m`).
- **No resident agent:** Nitrobase executes commands, streams logs, collects metrics, and transfers files over SSH/SFTP without installing any background daemon on your VPS.

## 2. Localhost Server (Host Mode)

Every fresh Nitrobase installation automatically creates a **Localhost** server entry representing the machine the panel itself runs on.

- In `docker-compose.prod.yml`, `nitrobase_app` runs with `privileged: true` and `pid: host`.
- Controlled by `LOCAL_EXEC_MODE` (default `auto`):
  - `auto`: Detects whether Nitrobase is running inside a container (`/.dockerenv`, `/run/.containerenv`, or cgroup mountinfo) and uses `nsenter` into PID 1's namespaces to manage the host OS and Docker daemon directly—no SSH loopback required.
  - `container`: Always uses `nsenter`.
  - `host`: Executes commands directly on the host (used when running Nitrobase outside Docker, e.g. in development).

:::note[Docker Desktop on macOS / Windows]
When running Nitrobase on Docker Desktop, the *Localhost* server refers to Docker's internal Linux VM rather than your macOS or Windows host OS.
:::
