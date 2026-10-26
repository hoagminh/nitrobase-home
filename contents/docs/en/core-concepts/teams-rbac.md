---
title: Teams & Role-Based Access Control (RBAC)
description: Multi-tenancy, team collaboration, permissions, and member invite links in Nitrobase.
---

Nitrobase is built from the ground up with native multi-tenancy. Every server, app, domain, destination, and backup schedule belongs to a **Team**.

## RBAC Roles & Capabilities

| Role | Server Management | Deploy Apps | View Secrets | Manage Team & Billing |
| :--- | :---: | :---: | :---: | :---: |
| **Owner** | Full | Full | Full | Full |
| **Admin** | Full | Full | Full | Yes (Cannot delete team) |
| **Developer** | View Only | Full | Hidden / Masked | No |
| **Viewer** | View Only | Read Only | Hidden | No |

## Inviting Members
Team administrators can generate one-time invite links under **Settings -> Team -> Invites**. Invites can be sent directly via email or copied manually.
