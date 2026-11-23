---
title: Managing Servers & Bootstrap
description: Adding remote VPS nodes or Localhost, guided bootstrap with change preview, ownership markers, and resource limits.
---

Nitrobase can manage both the machine it runs on (*Localhost*) and any number of remote **Ubuntu or Debian** servers over SSH.

## Adding a Remote Server

1. Navigate to **Servers → Add Server**.
2. Enter the server details:
   - **Host IP / Hostname**
   - **SSH Port** (default `22`)
   - **Username** (default `root`)
   - **Authentication:** Select an SSH key (managed under **Settings → SSH keys**) or password authentication.
3. Test the connection to verify SSH reachability and host key fingerprint.

## Guided Server Bootstrap

Before touching your server, **Bootstrap** inspects the host and shows an explicit preview of every change it will make:

- **OS & packages:** Verifies Ubuntu or Debian (`/etc/os-release`) and installs missing base tools (`ca-certificates`, `curl`, `wget`, `git`, `jq`, `openssl`).
- **Docker Engine:** Installs `docker-ce`, `docker-ce-cli`, `containerd.io`, `docker-buildx-plugin`, and `docker-compose-plugin` from Docker's official apt repository if missing, and enables the `docker` service.
- **Directory layout:** Creates `/etc/nitrobase` (`apps/`, `traefik/dynamic/`, `traefik/acme/`, `logs/`, etc.).
- **Shared proxy network:** Creates the `nitrobase-network` Docker bridge network.
- **Traefik v3:** Starts the `nitrobase-traefik` container (`traefik:v3.6.25` by default) with dynamic file routing and Let's Encrypt ACME support.
- **Firewall & port checks:** Checks whether ports `80` and `443` are reachable/available (or skips public port checks when configured for Cloudflare Tunnel only).
- **Ownership marker:** Labels the Traefik container with `nitrobase.instance=<instanceId>` so two Nitrobase panels never accidentally manage and fight over the same server.

## Server Resource Limits

Under **Server → Settings → Resource limits**, administrators can require memory/CPU limits on every service deployed to that server. During app pre-flight, Nitrobase warns when the sum of configured memory or CPU limits across apps would exceed `RESOURCE_OVERCOMMIT_PERCENT` (default `100%`) of the server's hardware.
