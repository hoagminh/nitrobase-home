---
title: Standalone Databases
description: Deploy and manage PostgreSQL, MySQL, MariaDB, Valkey, and MongoDB with web consoles, connection strings, and private app linking.
---

Under **Data → Databases**, Nitrobase lets you deploy standalone database servers backed by official Docker images, complete with automated backups, in-browser query consoles, and private app linking.

## Supported Engines

| Engine | Default Version | Available Versions | Default Port | Console | User / DB Management | In-Place Upgrade Policy |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **PostgreSQL** | `18.6` | `18.6`, `17.11`, `16.15`, `15.19`, `14.24` | `5432` | SQL (`psql`) | Yes (with DB owners) | Patch within major (`redeploy` rollback) |
| **MySQL** | `8.4.11` | `8.4.11`, `9.7.2` | `3306` | SQL (`mysql`) | Yes | Patch within major (`redeploy` rollback) |
| **MariaDB** | `11.8.9` | `11.8.9`, `11.4.13`, `10.11.19` | `3306` | SQL (`mariadb`) | Yes | Forward (`restore` rollback) |
| **Valkey** | `9.1.2` | `9.1.2`, `9.0.6`, `8.1.10` | `6379` | Redis (`valkey-cli`) | Single password | Forward (`restore` rollback) |
| **MongoDB** | `8.0.32` | `8.0.32`, `9.0.2` | `27017` | JSON (`mongosh`) | Default user/DB | Patch within major (`redeploy` rollback) |

:::note[Network Privacy by Default]
Standalone databases are **not** routed through Traefik and run on an `internal` Docker network by default. If you need external access, explicitly enable the published host port under **Settings → Published ports** (or connect over an SSH tunnel).
:::

## Linking Databases to Apps

Instead of exposing database ports publicly, link a database directly to any app on the same server:

1. Open the database and go to the **Links** tab (or link from the app's settings).
2. Nitrobase creates an isolated bridge network (`nitrobase-link-<id>`) and attaches only the database container and the linked app's containers by container name (so a database named `db` never collides with an app's own `db` service).
3. Nitrobase injects connection environment variables automatically—by default the connection URL (`DATABASE_URL`, `REDIS_URL`, or `MONGODB_URL`) and optionally individual parts (`PGHOST`/`PGPORT`/etc., `MYSQL_*`, `REDIS_*`, `MONGODB_*`).
4. For engines with user management (PostgreSQL, MySQL, MariaDB), you can link apps using a dedicated least-privilege login or the main login (requires `database.write`).

## Built-in Web Console

Every database includes an audited web console in the dashboard:

- **SQL Console (PostgreSQL / MySQL / MariaDB):** Runs in read-only mode by default inside a `READ ONLY` transaction with a 15-second statement timeout (`DATABASE_CONSOLE_TIMEOUT_MS`) and 500-row limit (`DATABASE_CONSOLE_MAX_ROWS`). Write statements require `database.write` permission.
- **Command Console (Valkey / MongoDB):** Runs one command or JSON command document per execution (`SCAN` instead of `KEYS` in read-only mode for Valkey).
- **Rate & Concurrency Limits:** Up to 2 concurrent console runs and 60 runs per minute per member/token.

## Backups & Upgrades

Each engine uses its native consistent backup strategy (`postgres` cluster dump, `mysql`, `mariadb`, `redis` RDB snapshot, `mongodb` archive). Engine and version are stored as `<engine>@<tag>` (e.g. `postgres@18.6`) so backups, restores, clones, and server moves preserve the exact version.
