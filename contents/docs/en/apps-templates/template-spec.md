---
title: Template Specification (template.toml)
description: Reference for authoring marketplace templates with template.toml, compose overlays, variable expressions, and backup strategies.
---

Every marketplace template lives in its own folder under `templates/<id>/` (`<id>` matching `^[a-z0-9-]+$`). Adding a template requires only adding its folder and an offline test fixture—no application code changes are needed.

```text
templates/<id>/
  template.toml        # Required: metadata, version source, variables, domains, health, backup, security
  docker-compose.yml   # Optional: used when source.path is not set
  overlay.yml          # Optional: deep-merged onto the compose file before Nitrobase transforms it
  logo.svg             # Optional: marketplace icon
```

## Example `template.toml`

```toml
id = "pocketbase"
name = "PocketBase"
description = "A one-file backend: realtime database, auth, file storage and admin dashboard."
category = "backend"
website = "https://pocketbase.io"
docs = "https://pocketbase.io/docs/"
tags = ["database", "auth"]
min_docker_version = "20.10"
notes = "Admin superuser is created on first start."

[source]
repo = "pocketbase/pocketbase"
versions = "releases"           # "releases" | "tags" | "commits" | "branches"
version_prefix = "v"
version_filter = '^v\d+\.\d+\.\d+$'
# Optional for fetching upstream compose files:
# path = "docker"
# compose = "docker-compose.yml"
# env_defaults = ".env.example"
# include = ["docker-compose.yml", { path = "init.sh", min_version = "2.4.0" }]
# min_version = "v0.23.0"

[variables.PB_ADMIN_EMAIL]
value = ""
type = "email"
editable = true
prefill = "account_email"
credential = true
group = "Admin"
description = "Superuser email address."

[variables.PB_ADMIN_PASSWORD]
value = "${password:24}"
type = "string"
min_length = 10
secret = true
credential = true
editable = true
rotatable = true
group = "Admin"
description = "Superuser password."

[[domains]]
service = "pocketbase"
port = 8090
primary = true
https = true
# Optional: subdomain, path_prefix, root_redirect, paths, basic_auth, extra_domains

[[links]]
label = "Admin console"
path = "/_/"

[resources.pocketbase]
memory_mb = 512

[health]
service = "pocketbase"
path = "/api/health"
port = 8090
timeout_seconds = 300

[backup]
paths = ["pb_data"]
stop = true

[updates]
rollback = "redeploy"           # "redeploy" | "restore" | "manual"
```

## Variable Expressions

Values in `[variables.<NAME>]` support `${...}` expressions (escape a literal `$` as `$$`). Variables resolve in dependency order and previous values are preserved on redeploy:

| Expression | Result |
| :--- | :--- |
| `${password:N}` | `N` random alphanumeric characters |
| `${base64:N}` / `${hex:N}` | `N` random bytes encoded as base64 or hex (`2N` chars) |
| `${uuid}` | Random UUID |
| `${jwt:SECRET_VAR:role[:issuer]}` | HS256 JWT (`exp: +10y`) signed with `SECRET_VAR` |
| `${bcrypt:VAR[:cost]}` | bcrypt hash of `VAR` (default cost `10`), regenerated when `VAR` changes |
| `${opaque_key:PREFIX:NAMESPACE}` | Checksummed opaque key (used for Supabase `sb_publishable_` / `sb_secret_` keys) |
| `${signing_keys:es256[:SECRET_VAR]}` | JSON array of ES256 (P-256) JWK pair + optional symmetric HS256 JWK |
| `${jwks:KEYS_VAR}` | Verification JWKS (`{"keys": [...]}`) stripped of private components |
| `${jwt_es256:KEYS_VAR:role[:issuer]}` | ES256 JWT signed with the first ES256 key in `KEYS_VAR` |
| `${OTHER_VAR}` | Value of another template variable |
| `${domain}`, `${url}` | App domain and `https://<domain>` |
| `${version}`, `${version_number}` | Selected ref and ref without `source.version_prefix` |
| `${app_id}`, `${app_name}`, `${folder}` | App identifiers |

Variables also support `initial_only = true` (frozen after first deploy), `min_version` (defined only from a specific upstream release onward), `permission` (extra team permission required to set it), and `[variables.<NAME>.on_rotate]` (optional post-rotation SQL step).

## Overlays, Rewrites & Security

- **Compose overlays:** Place `overlay.yml` in the template folder to deep-merge overrides onto an upstream compose file (`null` removes keys such as upstream `traefik` services). Version-gated overlays can be declared with `[[overlays]]` and `min_version`.
- **Published ports (`[[ports]]`):** Opt-in host ports that owners can enable under **Settings → Published ports**.
- **Backup configuration (`[backup]`):** Supports bind `paths`, named `volumes`, `stop` (`true`, `false`, or list of services), `reset`/`reset_volumes`, `[backup.database]` (`postgres`, `mysql`, `mariadb`, `sqlite`, or provider plugin strategy), and `[[backup.hooks]]` (`pre`/`post` commands).
- **Security allowlist (`[security]`):** Everything is denied by default. If a template requires extra privileges (`cap_add`, `host_paths`, `external`, etc.), you must declare them in `[security]` alongside a required `reason` shown to users in the marketplace and deploy wizard.
- **Localisation:** Write template text in plain English without `{` or `}` characters; `bun run i18n:extract` automatically collects template strings into Lingui catalogs via `scripts/lingui/template-extractor.ts`.

## Testing Templates

Every template needs an offline test fixture under `src/server/services/templates/__fixtures__/templates/<id>/` (`meta.json` plus `upstream/` or `spec.json`). Run `bun run test` to execute `shipped-templates.test.ts`, which renders every template, validates all routes/variables/volumes/policies, and verifies snapshots.
