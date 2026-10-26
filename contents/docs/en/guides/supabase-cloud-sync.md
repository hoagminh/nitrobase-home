---
title: Supabase Cloud Sync
description: Import database schemas, storage files, and edge functions directly from hosted Supabase projects.
---

Migrate seamlessly from Supabase Cloud to your own infrastructure without dumping SQL manually.

1. Obtain your Supabase Cloud project connection string and service role key.
2. Add your project under **Settings -> Cloud Connections**.
3. Go to **Apps -> New App -> Import from Supabase Cloud**.
4. Nitrobase connects via session pooler with TLS verification, clones schemas, migrates storage buckets, and launches your self-hosted instance.
