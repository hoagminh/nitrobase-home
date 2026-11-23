---
title: Quickstart on a Fresh VPS
description: Install Nitrobase on Ubuntu or Debian with the automated install script or on any OS with the Docker installer image.
---

Nitrobase provides two automated installation methods that produce the exact same layout (`/opt/nitrobase` with `.env` and `docker-compose.prod.yml`, compose project `nitrobase`, container `nitrobase_app`), so in-panel upgrades work identically for both.

## Option 1: Install Script (Ubuntu or Debian VPS)

Connect to a fresh **Ubuntu or Debian** VPS (`amd64` or `arm64`) and run:

```bash
curl -fsSL https://nitrobase.app/install.sh | sudo bash
```

If `nitrobase.app` is unreachable, use the copy in the repository:

```bash
curl -fsSL https://raw.githubusercontent.com/AydenGroup/nitrobase/main/scripts/install.sh | sudo bash
```

Each GitHub release also attaches its versioned `install.sh`, and any running Nitrobase panel serves its own version at `https://<panel>/api/install.sh`.

## Option 2: Docker Installer Image (Any OS with Docker)

On any machine with Docker (`amd64` or `arm64`), run the official installer image (Nitrobase is currently in beta, so `:beta` tracks the newest pre-release; `:latest` will track stable releases once published):

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/nitrobase:/opt/nitrobase \
  ghcr.io/aydengroup/nitrobase-installer:beta
```

:::note[Matching Mount Paths]
The install directory mount (`-v /opt/nitrobase:/opt/nitrobase`) **must use the exact same path on both sides** so Docker resolves the compose project folder on the host and in-panel upgrades can mount it later. For a custom folder, change both sides and pass `--dir`:
`-v /srv/nitrobase:/srv/nitrobase ... --dir /srv/nitrobase`.
:::

Both images are also mirrored on Docker Hub as `jimmyphong/nitrobase` and `jimmyphong/nitrobase-installer`, while GHCR (`ghcr.io/aydengroup/nitrobase`) remains the default source.

### Docker Desktop (macOS / Windows)

On macOS, `/opt` is not shared by Docker Desktop by default. Install under `$HOME/nitrobase` instead (on Windows, run from a WSL 2 shell):

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME/nitrobase:$HOME/nitrobase" \
  ghcr.io/aydengroup/nitrobase-installer:beta --dir "$HOME/nitrobase"
```

Note that on Docker Desktop, the *Localhost* server is Docker's Linux VM rather than your host OS.

## What the Installer Does

The installer is **idempotent**—re-running it keeps your secrets and database intact:

1. **Preflight checks:** Verifies root access, OS (`ubuntu`/`debian` on host), CPU, RAM (warns below ~1.8 GB), disk (warns below 5 GB, stops below 2 GB), and ports. Installs Docker CE from Docker's official apt repository if missing (asks first unless `--yes` is passed).
2. **Secret generation:** Creates `/opt/nitrobase/.env` with `0600` permissions containing generated `ENCRYPTION_KEY`, `SESSION_SECRET`, and `POSTGRES_PASSWORD`.
3. **One-time setup token:** Generates a 32-character hex `SETUP_TOKEN` and prints it to your terminal so nobody else can claim a fresh panel before you.
4. **Release channel:** When installing a pre-release and `.env` has no `RELEASE_CHANNEL`, sets `RELEASE_CHANNEL=prerelease` so the panel offers subsequent pre-releases.
5. **Starts services:** Downloads `docker-compose.prod.yml`, starts `nitrobase_postgres` and `nitrobase_app`, waits until `/api/health` is healthy (up to 300s), and prints next steps.

## Installer Options

Pass options after `sudo bash -s --` (script) or after the image name (Docker installer):

| Option | Description |
| :--- | :--- |
| `--version <v>` | Specific release to install (e.g. `0.1.0-beta.9`). Re-run to change versions. |
| `--dir <path>` | Install directory (default `/opt/nitrobase`). |
| `--panel-bind <addr:port>` | Host bind address (default `0.0.0.0:3000`; `127.0.0.1:3000` when `--domain` is set). |
| `--domain <host>` | Serve the panel over HTTPS via Traefik + Let's Encrypt; sets `APP_URL` and `TRUST_PROXY=true`. |
| `--repo <owner/name>` | Install releases from a fork (default `AydenGroup/nitrobase`). For Gitea/Forgejo, also pass `--api-url` and `--raw-url`. |
| `--image <name>` / `--compose-url <url>` | Override the panel image or compose file URL. |
| `--yes` | Do not prompt before installing Docker. |
| `--skip-resource-check` | Bypass RAM and disk minimums on small test machines. |
| `--uninstall` | Stop and remove containers while keeping data volumes and `.env`. |
| `--uninstall --purge` | Also delete data volumes and empty the install folder (requires typing `purge <dir>`, or setting `-e NITROBASE_PURGE_CONFIRM="purge <dir>"` non-interactively). |
| `--print-config` / `--help` | Print resolved configuration without making changes, or show help. |

## Adding Swap on a Small VPS

On a 1–2 GB VPS, adding a 2 GB swap file prevents sudden OOM container kills:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Accessing Your Panel

Once healthy, open `http://<server-ip>:3000` (or tunnel over SSH first: `ssh -L 3000:localhost:3000 root@<server-ip>`) and proceed to **First-Run Setup**.
