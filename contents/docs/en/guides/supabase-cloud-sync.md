---
title: Cloud Sync (Supabase & Appwrite)
description: Import projects from and export apps to Supabase Cloud and Appwrite Cloud with TLS verification and pre-flight checks.
---

Nitrobase's **Cloud Sync** engine supports one-off **import** (cloud → self-hosted) and **export** (self-hosted → empty cloud project) for both **Supabase Cloud** and **Appwrite Cloud**.

## Supabase Cloud Sync

### 1. Configure Root CA Certificates (TLS `verify-full`)

Nitrobase connects to Supabase's session pooler using `sslmode=verify-full`. Place Supabase's root CA certificates (`prod-ca-2021.crt` and `prod-ca-2025.crt` from [`supabase/cli`](https://github.com/supabase/cli)) into `certs/supabase-root-ca.pem`, point `CLOUD_SYNC_SUPABASE_CA_FILE` at your CA bundle, or paste an extra PEM certificate in the connection form.

### 2. Add a Cloud Connection

Go to **Settings → Cloud connections → Add connection** and select **Supabase**:

- **Project reference:** The 20-letter reference from `https://<reference>.supabase.co`.
- **Personal access token:** From Supabase Account → Access tokens (reads project metadata, pooler settings, and edge functions via the Management API).
- **Database password:** From Project Settings → Database.
- **Storage S3 access key ID & secret (optional):** From Project Settings → Storage → S3 access keys (required to copy storage files via `rclone`).
- **Pooler host (optional):** Auto-detected from the project's session pooler settings when left empty.

Click **Test connection** to verify Management API, Database (pooler), and Storage (S3) access.

### 3. Import or Export

- **Import:** Go to **Apps → New App → Import from Supabase cloud** (`app.sync` permission). Nitrobase runs a pre-flight check (counting tables, rows, buckets, functions, Postgres version compatibility, and ensuring free disk ≥ `2.5×` total size), deploys a new self-hosted Supabase app, and copies:
  - **Database** (using a major-matched Postgres client image with the CVE-2025-8714 `\restrict` fix)
  - **Storage files** (parallel `rclone` transfers)
  - **Edge functions**
  - **pg_cron jobs:** Recreated `paused` by default (`CLOUD_SYNC_CRON_JOBS=paused`) so old URLs aren't called accidentally, or choose `active` / `skip`.
- **Export:** From an existing self-hosted Supabase app's **Cloud sync** tab, export database, storage files, and edge functions into an empty hosted Supabase project (with an option to stop writers during the copy for an exact snapshot).

## Appwrite Cloud Sync

Under **Settings → Cloud connections**, you can also connect an **Appwrite Cloud** project (`https://<region>.cloud.appwrite.io/v1`, Project ID, and a scoped temporary API key) to:

- **Import from Appwrite Cloud:** Creates a self-hosted Appwrite app with the **same Project ID** (so client apps only change the endpoint) and migrates **users and teams**, **databases**, **storage files**, **function settings & variables**, and **platforms**.
- **Export to Appwrite Cloud:** Exports those same resources into an empty Appwrite Cloud project (requires `migrations.read` and `migrations.write` scopes on the cloud API key).
