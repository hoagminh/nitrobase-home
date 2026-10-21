---
title: Introduction to SaaSBase
description: Overview of SaaSBase, comparisons with Coolify, Dokploy, and CapRover, and hardware requirements.
---

**SaaSBase** is a modern, self-hosted PaaS (Platform as a Service) and BaaS (Backend as a Service) deployer designed for developers, DevOps engineers, and teams who want total control over their infrastructure without the complexity of Kubernetes.

Connect any Linux VPS over SSH or run SaaSBase directly on the host machine. SaaSBase configures Docker and Traefik v3, provisions SSL certificates, and allows you to deploy popular open-source platforms like **Supabase**, **PocketBase**, **Appwrite**, and **n8n** from templates or your own Git repositories.

## Comparison Matrix

| Feature | SaaSBase | Coolify | Dokploy | CapRover |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Focus** | Secure PaaS + Native Supabase Ecosystem | Full PaaS Alternative to Heroku | Lightweight Docker PaaS | Docker Swarm PaaS |
| **Reverse Proxy** | **Traefik v3** (Native dynamic routing) | Traefik | Traefik | NGINX |
| **Zero-Trust Network** | **Cloudflare Tunnel (Tunnel-Only)** | Community Workaround | Community Workaround | NGINX Plugin |
| **Secret Encryption** | **AES-256-CBC + HKDF (v2)** | Basic Encryption | Basic Encryption | Plain / Basic |
| **Disaster Recovery** | Built-in Split-Brain Guard + Offsite S3/R2 | S3 Backup | S3 Backup | Backup archive |
| **Cloud Import** | **Supabase Cloud Sync (DB + Storage + Functions)** | No | No | No |
| **Runtime & Tech Stack** | **Bun + React 19 + TanStack Start** | PHP / Laravel | Node.js / Next.js | Node.js |

## System Requirements

### Recommended Server Specs
* **Operating System:** Ubuntu 22.04 / 24.04 LTS, Debian 11 / 12 (amd64 or arm64 architecture).
* **CPU:** 1 Core minimum (2+ Cores recommended for Supabase or build jobs).
* **Memory (RAM):** 
  * 1 GB minimum for SaaSBase core + lightweight apps (PocketBase, SQLite).
  * 2 GB to 4 GB recommended for the complete Supabase stack.
* **Storage:** 20 GB SSD minimum.
* **Ports (Standard Mode):**
  * Port `22` (SSH)
  * Port `80` & `443` (HTTP/HTTPS via Traefik)
  * Port `3000` (SaaSBase Web Panel, can be bound to localhost)

:::tip[Tunnel-Only Advantage]
When operating servers via **Cloudflare Tunnel**, ports `80` and `443` can remain **completely closed** on your server firewall!
:::
