---
title: First-Run Setup & Administrator Creation
description: Claiming your instance administrator account or restoring from an existing self-backup on first launch.
---

When you open a fresh Nitrobase installation at `http://<server-ip>:3000` (recommended over an SSH tunnel such as `ssh -L 3000:localhost:3000 root@<server-ip>` before HTTPS is configured), you are greeted by the **First-Run Setup** page.

## One-Time Setup Token

To prevent anyone who reaches a fresh panel on the internet from claiming it before you do, Nitrobase always requires a one-time **Setup Token** until the first account exists:

- **Installed with the script or Docker installer:** The installer generated a 32-character `SETUP_TOKEN`, saved it in `.env`, and printed it in your terminal.
- **Manual Compose install without `SETUP_TOKEN`:** Nitrobase automatically generates a one-time token at boot and logs it until the first account is created:
  ```bash
  docker compose logs app | grep "Setup token"
  ```

## Option A: Create the Instance Administrator

1. Open `http://<server-ip>:3000` (or `http://localhost:3000` via SSH tunnel).
2. Enter your **Setup Token**.
3. Enter your administrator email and password (**minimum 8 characters**).
4. Submit to create the first account. This account becomes the **Instance Administrator** and the **Owner** of the initial team.

## Option B: Restore from a Self-Backup

If you are moving an existing Nitrobase installation to a new server:

1. On the first-run screen, choose **Restore from a backup**.
2. Enter the **Setup Token**.
3. Upload the encrypted self-backup archive (`nitrobase/<date>-<id>.tar.gz.enc`, up to 256 MB by default).
4. Enter its **SHA-256 checksum** (shown in **Data → Backups**) and the **old `ENCRYPTION_KEY`** from the previous server.
5. Nitrobase verifies the checksum, decrypts the archive, loads the dump as an unprivileged PostgreSQL role (`nitrobase_restore`), runs any migrations for the current version, and re-encrypts secrets for the new server's `ENCRYPTION_KEY`.
6. The restored panel starts in a **Paused** state (split-brain guard) until an instance administrator confirms takeover.

## Post-Setup Checklist

After signing in, the dashboard's **Getting started** checklist guides you through:

1. **Get a server ready:** Bootstrap *Localhost* or add a remote VPS over SSH.
2. **Deploy your first app:** Pick a marketplace template, standalone database, Git repository, or custom compose file (a free `*.sslip.io` domain with HTTPS is provisioned automatically for routed apps).
3. **Add an off-site backup destination:** Configure S3, Cloudflare R2, or Backblaze B2 under **Data → Destinations** and attach a backup schedule.
4. **Harden the panel:** Configure a panel domain with HTTPS under **Settings → Instance**, enable **Two-Factor Authentication (2FA)**, and set up notification channels.
