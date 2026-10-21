---
title: Storage Destinations (S3, R2, B2)
description: Configure remote offsite backup storage destinations including AWS S3, Cloudflare R2, and Backblaze B2.
---

SaaSBase supports multi-cloud storage destinations for backups. Storing backups off-server ensures that you can recover your entire infrastructure even if a physical server is lost.

## Supported Providers
* **Cloudflare R2:** Zero egress fees (Highly recommended).
* **Amazon S3:** Standard AWS object storage.
* **Backblaze B2:** Cost-effective S3-compatible cloud storage.
* **Local Server Folder:** Stored on the local host filesystem for quick rollback.

## Adding a Destination
Navigate to **Data -> Destinations -> Add Destination**.
* **Type:** S3 Compatible
* **Bucket Name:** e.g. `my-saasbase-backups`
* **Endpoint:** e.g. `https://<account-id>.r2.cloudflarestorage.com`
* **Access Key ID & Secret Access Key** (Encrypted at rest using HKDF).
