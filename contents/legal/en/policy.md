---
title: "Privacy Policy"
description: "Learn how the Nitrobase website handles visitor data and how the self-hosted Nitrobase software keeps your infrastructure data strictly on your own servers."
lastUpdated: "2026-11-27"
---

## 1. Overview

This Privacy Policy describes how data is handled across:

1. **The Nitrobase Website** (`https://nitrobase.app`), including our marketing pages, documentation, and public installer script (`https://nitrobase.app/install.sh`).
2. **The Self-Hosted Nitrobase Software** (`github.com/AydenGroup/nitrobase`), which you download and run on your own servers under the **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**.

Because Nitrobase is a **100% self-hosted** control panel, there is no hosted Nitrobase Cloud service collecting your server credentials, databases, or application data.

## 2. Self-Hosted Nitrobase Software (Your Servers, Your Data)

When you install and run Nitrobase on your own VPS or local machine:

- **No Telemetry or Phone-Home:** Nitrobase does **not** send usage analytics, server IP addresses, account details, deployment logs, or crash reports back to us.
- **Complete Local Ownership:** Every panel user account, team, SSH key, server password, environment variable, database record, monitoring metric, audit log, and backup archive resides exclusively on infrastructure you control.
- **Software Encryption at Rest:** Stored secrets in your panel's PostgreSQL database and app `env.enc` backup members are encrypted on your server using authenticated **AES-256-GCM** with **HKDF-SHA256** (Format `v3:`) derived from your own `ENCRYPTION_KEY`. Portable panel self-backup archives (`.tar.gz.enc`) are encrypted with OpenSSL **AES-256-CBC** (PBKDF2-SHA256, 200,000 iterations) using your `ENCRYPTION_KEY`. We never have access to your `ENCRYPTION_KEY` or your encrypted data.

### Outbound Connections Made by Your Self-Hosted Instance

Your self-hosted Nitrobase instance only makes outbound network requests to external services required for features you use or configure—directly from your server to those third-party providers:

- **Release & template version checks:** Queries `RELEASE_REPO` (default `AydenGroup/nitrobase` on GitHub) and upstream template repositories on GitHub to check for newer releases. You can disable panel update checks by setting `UPDATE_CHECK_ENABLED=false` in `.env`, or point `RELEASE_REPO` / `RELEASE_API_URL` to your own Git server.
- **Container registries:** Pulls Docker images from GHCR (`ghcr.io`), Docker Hub, or registries declared in your apps/templates.
- **TLS & Domains:** Contacts Let's Encrypt (ACME) when issuing/renewing HTTPS certificates and `sslip.io` when using automatic free domains.
- **User-configured integrations:** Connects directly to the backup destinations (S3, Cloudflare R2, Backblaze B2), Git hosts, Cloudflare Tunnel, notification channels (SMTP, Discord, Slack, Telegram, Webhooks), or Cloud Sync providers (Supabase Cloud, Appwrite Cloud) that you explicitly configure.

Each third-party service you connect to is governed by its own privacy policy.

## 3. Information Handled by the Nitrobase Website (`https://nitrobase.app`)

When you visit `https://nitrobase.app` or download `https://nitrobase.app/install.sh`:

- **Standard Hosting & CDN Logs:** Our web hosting/CDN infrastructure (Cloudflare) may process standard HTTP request metadata—such as IP address, browser user agent, requested URL, and timestamp—for security, DDoS mitigation, and reliability.
- **Preferences:** Your browser stores lightweight local preferences (such as selected language `en`/`vi` and light/dark theme).
- **Voluntary Communications:** If you email us at `hoagminhit@gmail.com` or submit an inquiry or update subscription on the website, we use your contact details solely to respond to your message or share requested product updates.

## 4. How We Use Website Information

Information collected through `https://nitrobase.app` is used strictly to:

- Serve documentation, website content, and the installer script reliably and securely.
- Prevent abuse, automated attacks, and unauthorized disruption of our website infrastructure.
- Respond to support, security, licensing, or legal inquiries you send us.

We **never sell, rent, or trade** your personal information to third parties.

## 5. Data Retention & Your Rights

- **Self-Hosted Data:** You control retention, deletion, backups, and access for all data inside your own Nitrobase instance directly on your servers.
- **Website Communications:** Emails or inquiries sent to us are retained only as long as necessary to resolve your request or comply with legal obligations.
- **Your Privacy Rights:** Depending on your jurisdiction (including GDPR and CCPA), you may request access to, correction of, or deletion of any personal contact data you have shared with us via email.

## 6. Changes to This Policy

We may update this Privacy Policy from time to time to reflect changes in our website or legal requirements. Any updates will be posted on this page with an updated `Last updated` date.

## 7. Contact Us

If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:

- **Email:** hoagminhit@gmail.com
- **GitHub:** https://github.com/AydenGroup/nitrobase
- **Website:** https://nitrobase.app
