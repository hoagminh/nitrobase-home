---
title: Architecture Overview
description: High-level overview of the SaaSBase system architecture, internal services, and data flows.
---

SaaSBase is engineered with an efficient, monolithic control plane that communicates with managed VPS nodes via lightweight, secure protocols.

## High-Level Topology

```mermaid
flowchart TB
  subgraph Panel["SaaSBase Control Panel (Host / VPS)"]
    direction LR
    UI["Web UI (Mantine 9 + TanStack Router)"] <--> Nitro["Nitro Server (React 19, Bun)<br/>• Drizzle ORM + PostgreSQL<br/>• Job Queue & Cron Scheduler<br/>• WebSocket xterm.js Web PTY"]
  end

  Panel -->|SSH2 / ed25519| Remote["Remote VPS Node"]
  Panel -->|nsenter / Docker socket| Local["Localhost (Self-Host Node)"]

  subgraph Remote["Remote VPS Node"]
    direction TB
    TR["Traefik v3 (Reverse Proxy + ACME SSL)"]
    TR --> Supabase["Supabase Stack<br/>(PostgreSQL Vector, GoTrue, Studio)"]
    TR --> Appwrite["Appwrite / Other Apps"]
  end

  subgraph Local["Localhost (Self-Host Node)"]
    direction TB
    TL["Traefik v3 (Reverse Proxy + ACME SSL)"]
    TL --> App["SaaSBase App Container"]
    TL --> DB["PostgreSQL 16 Engine"]
  end
```

## Key Architectural Principles

1. **In-Process Single-Instance Core:** Background jobs, cron schedulers, and server locking mechanisms execute directly in-process for predictable memory consumption and instant synchronization.
2. **Stateless Node Management:** Remote nodes run standard Docker and Traefik containers. SaaSBase leaves no heavy monitoring agents or resident daemons on your target servers.
3. **End-to-End Type Safety:** Fully unified TypeScript codebase leveraging Drizzle ORM, Zod validation schemas, and TanStack React Start.
