---
title: Storage Destinations (S3, R2, B2 & Local)
description: Configure off-site backup storage destinations using rclone for Amazon S3, Cloudflare R2, Backblaze B2, and local server folders.
---

Nitrobase uploads and downloads backups through a pinned `rclone` container (`rclone/rclone:1.71.1`), supporting both off-site object storage and local server folders. Storing backups off-site ensures you can recover even if a server is completely lost.

## Supported Destination Drivers

| Driver | Description | Key Configuration Fields |
| :--- | :--- | :--- |
| **Cloudflare R2** | S3-compatible object storage with zero egress fees (recommended). | Cloudflare Account ID (32 hex chars), Bucket, Prefix (optional), Access Key ID, Secret Access Key. |
| **S3-compatible** | Amazon S3, MinIO, RustFS, Wasabi, DigitalOcean Spaces, and other S3 APIs. | Endpoint URL, Region (optional), Bucket, Prefix, Access Key ID, Secret Access Key, Path-style URLs (default on), Private/plain-HTTP endpoint toggle. |
| **Backblaze B2** | Backblaze B2 native API. | Bucket, Prefix (optional), Application Key ID, Application Key. |
| **Server folder (`local`)** | Folder on the app's server under `BACKUP_LOCAL_ROOT` (default `/var/backups/nitrobase`). | Optional subfolder path. Simple for quick local rollbacks, but lost if the server fails—pair with an off-site destination. |

## Adding & Testing a Destination

1. Navigate to **Data → Destinations → Add destination** (`destination.manage` permission).
2. Choose a driver and enter the credentials (all secret fields are encrypted at rest with AES-256-GCM Format v3).
3. For S3-compatible endpoints, HTTPS on a public host is required by default (SSRF guard); enable **Private or plain-HTTP endpoint** only when targeting a private LAN/self-hosted S3 (such as MinIO or RustFS on your network).
4. Click **Test** to verify the destination end-to-end: Nitrobase runs three checks—**Write a test file**, **Read it back**, and **Delete it**—and reports specific error categories (`auth`, `not_found`, `permission`, `network`, `tls`).
