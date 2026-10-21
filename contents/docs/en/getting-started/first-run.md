---
title: First-Run Setup & Administrator Creation
description: Claiming your instance administrator account or restoring from an existing backup on first launch.
---

When you access a fresh SaaSBase installation for the first time at `http://<server-ip>:3000`, you will be greeted by the **First-Run Wizard**.

## Security Safeguards

To prevent malicious actors from scanning the internet and taking over fresh installations, SaaSBase implements two primary defenses:

1. **Setup Token Protection:** If SaaSBase was installed via `scripts/install.sh`, you must enter the one-time **Setup Token** printed in your terminal during installation. Without this token, account creation is locked.
2. **Local Host Warning:** In manual or development installations without a `SETUP_TOKEN` configured, the registration page will display a prominent security notice: *The first person to open this page will become the instance administrator.*

## Option A: Registering the Administrator

1. Open `http://<server-ip>:3000` in your browser.
2. Enter your **Setup Token** (if prompted).
3. Fill in the administrator registration form:
   * **Admin Email:** Used for security notifications and team ownership.
   * **Password:** Minimum 10 characters.
4. Click **Complete Setup**. You will be logged in immediately to the SaaSBase dashboard.

## Option B: Restoring From a Backup

If you are migrating an existing SaaSBase instance to a new server:

1. On the first-run screen, click **Restore from a backup**.
2. Provide your **Setup Token**.
3. Upload your encrypted SaaSBase self-backup file (`saasbase/<date>.tar.gz.enc`).
4. Enter the SHA-256 checksum and the original `ENCRYPTION_KEY` from your old server.
5. SaaSBase will:
   * Verify file integrity against the SHA-256 hash.
   * Decrypt and inspect the manifest.
   * Stream and import the database dump under a non-superuser role in a single transaction.
   * Re-encrypt credentials using the new server's key.
   * Boot up in a **Paused** state to guard against split-brain scenarios.
