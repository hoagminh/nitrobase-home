---
title: MCP Server (AI Agents)
description: Connect AI coding agents like Claude Code and Cursor to Nitrobase via the stateless Streamable HTTP MCP server at /api/mcp.
---

Nitrobase includes a built-in **Model Context Protocol (MCP)** server at `/api/mcp` (stateless **Streamable HTTP** transport, JSON responses, single JSON-RPC message per `POST`), authenticated with the same `nbk_...` API tokens as the REST API.

## Connecting Claude Code

```bash
claude mcp add --transport http nitrobase https://panel.example.com/api/mcp \
  --header "Authorization: Bearer nbk_..."
```

## Connecting Cursor or Other MCP Clients

Add the server to your **user-level** MCP config (for example `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "nitrobase": {
      "url": "https://panel.example.com/api/mcp",
      "headers": {
        "Authorization": "Bearer nbk_..."
      }
    }
  }
}
```

:::caution[Never Commit API Tokens]
An MCP JSON config containing an `nbk_...` token holds a live secret. Keep it in your user-level config (such as `~/.cursor/mcp.json`)—never in a repository's `.mcp.json`, and never commit it to Git. `claude mcp add` stores credentials in your local Claude Code config.
:::

In the Nitrobase UI, **Settings → API tokens** provides a **Connect an AI agent** panel with ready-to-copy snippets for Claude Code and JSON MCP clients (pre-filled during a new token's one-time reveal).

## Recommended Token Presets

- **AI agent (read-only):** Grants `server.view`, `app.view`, `backup.view`, and `monitoring.view`. Exposes all read-only tools (`list_servers`, `get_server`, `get_server_health`, `get_server_metrics`, `list_apps`, `get_app`, `get_app_env`, `get_app_logs`, `list_app_deployments`, `list_templates`, `list_template_versions`, `list_app_backups`, `list_backup_destinations`, `list_jobs`, `get_job`) except `preflight_app` (which needs `app.deploy`).
- **AI agent (operator):** Adds `app.deploy` and `backup.create`, enabling `preflight_app`, `create_app`, `deploy_app`, `redeploy_app`, `start_app`, `stop_app`, `restart_app`, and `backup_app`.

## How MCP Tools Work

- **Auto-generated from REST:** Every non-streaming `/api/v1` route becomes a snake_case MCP tool (`listApps` → `list_apps`, `deployApp` → `deploy_app`, `getJob` → `get_job`).
- **Permission-scoped visibility:** An agent only sees the tools its token is permitted to call.
- **Safety annotations:** Read-only tools are marked `readOnlyHint: true`; mutating tools are marked `destructiveHint: true` (except `backup_app`, which is non-destructive), prompting most MCP clients to ask for confirmation before running them.
- **Async jobs:** Tools that start background work return a job ID (`deploymentId`)—agents poll `get_job` until completion.
- **Full auditing & rate limiting:** Every tool call runs through the same rate limiter and audit logger as REST requests, tagged with `channel: mcp`.
