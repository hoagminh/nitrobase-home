---
title: "Terms of Service"
description: "Website terms of use, FSL-1.1-ALv2 software license summary, third-party templates, and liability disclaimers for Nitrobase."
lastUpdated: "2026-11-27"
---

## 1. Scope & Agreement

These Terms of Service ("Terms") govern your use of the **Nitrobase** website (`https://nitrobase.app`), documentation, and public installer script (`https://nitrobase.app/install.sh`).

Your download, installation, modification, redistribution, and use of the **Nitrobase software** (`github.com/AydenGroup/nitrobase`) are governed by the **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)** included in [`LICENSE.md`](https://github.com/AydenGroup/nitrobase/blob/main/LICENSE.md). **If there is any conflict between these Terms and `LICENSE.md` regarding your rights to the Nitrobase software, `LICENSE.md` controls.**

## 2. Software License (`FSL-1.1-ALv2`)

Nitrobase is **fair source** software (Copyright © 2026 Jimmy Phong), released under `FSL-1.1-ALv2`:

- **Permitted Purposes:** Subject to the conditions in `LICENSE.md`, you may use, copy, modify, create derivative works, self-host, and redistribute Nitrobase for any purpose other than a Competing Use—including internal personal or company use, non-commercial education, non-commercial research, and professional services you provide to clients using Nitrobase.
- **No Competing Use:** You may **not** make Nitrobase available to others in a commercial product or service that substitutes for Nitrobase, substitutes for another product or service we offer using Nitrobase, or offers the same or substantially similar functionality as Nitrobase.
- **Future Conversion to Apache 2.0:** Each release of Nitrobase automatically becomes available under the **Apache License, Version 2.0** on the second anniversary of the date that release is made available.
- **Redistribution & Attribution:** Any redistributed copy, modification, or derivative work must include a copy of or link to `LICENSE.md` and preserve all copyright notices.
- **Patents & Trademarks:** `LICENSE.md` includes a patent license for Permitted Purposes (which terminates upon patent litigation against the software). Neither `LICENSE.md` nor these Terms grant any right to use the **Nitrobase** name, logo, or trademarks except as required to display license details and identify Nitrobase as the origin of the software.

## 3. Self-Hosted Infrastructure Responsibility

Nitrobase is self-hosted software that runs entirely on infrastructure you own or lease. You are solely responsible for:

- **Third-Party Hosting & Cloud Costs:** All VPS, bandwidth, storage (S3/R2/B2), DNS, and domain expenses with third-party providers.
- **Secrets & Access Control:** Safeguarding your `.env` file, `ENCRYPTION_KEY`, `SESSION_SECRET`, `SETUP_TOKEN`, SSH keys, `nbk_...` API/MCP tokens, team RBAC roles, and Two-Factor Authentication (2FA). If `ENCRYPTION_KEY` is lost, stored secrets and encrypted backups cannot be decrypted.
- **Backups & Disaster Recovery:** Configuring off-site backups, periodically testing restores, and verifying database migrations before upgrading production systems.
- **System Administration & Compliance:** Maintaining host OS security updates, firewall rules, and legal/regulatory compliance for the applications and data you host.

## 4. Third-Party Software & Templates

Nitrobase helps you deploy third-party applications, databases, and tools—including Supabase, Appwrite, PocketBase, PostgreSQL, MySQL, MariaDB, Valkey, MongoDB, n8n, Plausible, Umami, RustFS, Docker, Traefik, rclone, Railpack, and Cloudflare Tunnel.

- Each third-party project is governed by its **own license** (for example, Apache 2.0, MIT, PostgreSQL, BSD-3-Clause, GPL-2.0, AGPL, Sustainable Use License, or MongoDB's **SSPL-1.0**, which is not an OSI open-source license).
- You are responsible for reviewing and complying with the licenses and terms of every third-party template, container image, or cloud service (such as Supabase Cloud or Appwrite Cloud) that you deploy or connect to.

## 5. Acceptable Use of the Website

When using `https://nitrobase.app` and its distribution endpoints (such as `/install.sh`), you agree not to:

- Use the website in violation of applicable laws or regulations.
- Launch denial-of-service attacks, automated scraping abuse, or attempts to compromise or disrupt the website hosting infrastructure.
- Misrepresent your affiliation with Nitrobase or distribute modified installers pretending to be official Nitrobase releases.

Nothing in this section restricts any right expressly granted to you for the Nitrobase software under `FSL-1.1-ALv2` (or Apache 2.0 after the 2-year conversion date).

## 6. Intellectual Property

- **Nitrobase Software & Documentation:** Licensed under `FSL-1.1-ALv2` as specified in `LICENSE.md` (Copyright © 2026 Jimmy Phong).
- **Trademarks & Branding:** The Nitrobase name, logo, and brand assets remain the exclusive property of the Nitrobase copyright holder.
- **Your Applications & Data:** You retain 100% ownership and intellectual property rights in your own source code, databases, schemas, files, and deployments.

## 7. Disclaimer of Warranties

THE NITROBASE WEBSITE, DOCUMENTATION, INSTALLER SCRIPTS, TEMPLATES, AND SOFTWARE ARE PROVIDED **"AS IS"** AND **"AS AVAILABLE"**, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, UPTIME, OR NON-INFRINGEMENT.

## 8. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL NITROBASE, ITS COPYRIGHT HOLDER, CONTRIBUTORS, OR AFFILIATES HAVE ANY LIABILITY TO YOU ARISING OUT OF OR RELATED TO THE WEBSITE OR SOFTWARE, INCLUDING ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF DATA, PROFITS, OR SERVER DOWNTIME, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

## 9. Changes to These Terms

We may update these website Terms from time to time by posting a revised version on this page and updating the `Last updated` date. Changes to the software license for any already-released version of Nitrobase remain subject to the terms of `FSL-1.1-ALv2` (including its irrevocable 2-year conversion to Apache License 2.0).

## 10. Contact

If you have questions about these Terms or Nitrobase licensing, please contact us:

- **Email:** hoagminhit@gmail.com
- **GitHub:** https://github.com/AydenGroup/nitrobase
- **Website:** https://nitrobase.app
