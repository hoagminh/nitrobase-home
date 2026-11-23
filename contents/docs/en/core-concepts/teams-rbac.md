---
title: Teams & Role-Based Access Control (RBAC)
description: Multi-tenant teams, permission model, roles, instance administrators, and invite links in Nitrobase.
---

Nitrobase is multi-tenant by design. Every server, SSH key, app, standalone database, backup destination, notification channel, and API token belongs to a **Team**.

## Team Roles

Roles are defined in `src/config/permissions.ts` and ranked hierarchically (higher-ranked members manage lower-ranked members; an admin cannot demote an owner, and a team always keeps at least one owner):

| Role | Rank | Capabilities |
| :--- | :---: | :--- |
| **Owner** | 40 | Full access to all team permissions, including renaming/deleting the team (`team.manage`) and managing owners. |
| **Admin** | 30 | All team permissions except deleting/renaming the team (`team.manage`) and managing owners. Can manage servers, SSH keys, members, API tokens, destinations, and notifications. |
| **Developer** | 20 | Deploy, redeploy, start/stop/restart apps; edit & reveal app env/secrets; open container terminals; run SQL & manage databases (`database.manage`, `database.write`, `database.credentials.reveal`); manage domains, Git sources, scheduled tasks, and update policies; create, restore, and download backups; view audit log. **Cannot** manage servers, SSH keys, backup destinations, notification channels, team members, or delete/move apps. |
| **Viewer** | 10 | Read-only access (`team.view`, `server.view`, `ssh_key.view`, `app.view`, `database.view`, `backup.view`, `monitoring.view`, `cloud_connection.view`). All secrets and credentials stay hidden. |

## Instance Administrators

The first account created during First-Run Setup is an **Instance Administrator**. Instance-scoped permissions (`instance.manage`) are never granted by a team role—they belong exclusively to instance administrators and cover:

- **Settings → Instance:** Panel domain, HTTPS configuration, and in-panel Nitrobase upgrades.
- **Nitrobase Self-Backup:** Taking and downloading encrypted panel database backups.
- **Team Creation:** Controlled by `TEAM_CREATION` (`admins` by default, or `everyone` to allow any user to create additional teams).

## Inviting Team Members

1. Open **Settings → Team** and create an invite link with the desired role.
2. Invite links expire after `INVITE_TTL_HOURS` (default **72 hours**).
3. Share the invite URL with your teammate (if `APP_URL` is set, full absolute URLs are generated).
4. Team actions—including invites, role changes, and secret reveals—are logged in the **Audit Log**.
