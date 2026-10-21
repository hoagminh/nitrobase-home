---
title: Template Specification (template.toml)
description: How to write and contribute custom templates to the SaaSBase marketplace.
---

Every marketplace app in SaaSBase is defined by a declarative `template.toml` file in the `templates/` directory.

```toml
[meta]
id = "pocketbase"
name = "PocketBase"
description = "Open Source backend in 1 file"
version = "0.22.0"

[services.pocketbase]
image = "ghcr.io/muchobien/pocketbase:{{version}}"
ports = [8090]
volumes = ["pb_data:/pb_data"]

[env]
PB_ENCRYPTION_KEY = { type = "random_hex", bytes = 32 }
```
