---
title: Máy chủ MCP (AI Agents)
description: Kết nối AI coding agent như Claude Code và Cursor tới Nitrobase thông qua máy chủ MCP Streamable HTTP tại /api/mcp.
---

Nitrobase tích hợp sẵn máy chủ **Model Context Protocol (MCP)** tại `/api/mcp` (giao thức **Streamable HTTP** stateless, phản hồi JSON, một thông điệp JSON-RPC mỗi yêu cầu `POST`), sử dụng cùng API token `nbk_...` với REST API.

## Kết nối Claude Code

```bash
claude mcp add --transport http nitrobase https://panel.example.com/api/mcp \
  --header "Authorization: Bearer nbk_..."
```

## Kết nối Cursor hoặc MCP Client khác

Thêm cấu hình vào tệp MCP **cấp người dùng** (ví dụ `~/.cursor/mcp.json`):

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

:::caution[Không bao giờ commit API Token]
Tệp cấu hình MCP JSON chứa token `nbk_...` là một khóa bí mật đang hoạt động. Hãy lưu trong cấu hình cấp người dùng (như `~/.cursor/mcp.json`) — không đặt trong `.mcp.json` của kho mã nguồn và không commit lên Git. Lệnh `claude mcp add` tự lưu token trong cấu hình cục bộ của Claude Code.
:::

Trong giao diện Nitrobase, mục **Settings → API tokens** có sẵn bảng **Connect an AI agent** cung cấp sẵn đoạn cấu hình cho Claude Code và các client dùng JSON (tự điền sẵn token ngay tại màn hình hiển thị token dùng một lần).

## Preset Token khuyến nghị cho AI Agent

- **AI agent (read-only):** Cấp `server.view`, `app.view`, `backup.view` và `monitoring.view`. Mở toàn bộ công cụ chỉ đọc (`list_servers`, `get_server`, `get_server_health`, `get_server_metrics`, `list_apps`, `get_app`, `get_app_env`, `get_app_logs`, `list_app_deployments`, `list_templates`, `list_template_versions`, `list_app_backups`, `list_backup_destinations`, `list_jobs`, `get_job`) ngoại trừ `preflight_app` (cần `app.deploy`).
- **AI agent (operator):** Bổ sung `app.deploy` và `backup.create`, mở thêm `preflight_app`, `create_app`, `deploy_app`, `redeploy_app`, `start_app`, `stop_app`, `restart_app` và `backup_app`.

## Cơ chế hoạt động của công cụ MCP

- **Tự sinh từ REST API:** Mọi route `/api/v1` không phải stream đều tự động trở thành công cụ MCP dạng snake_case (`listApps` → `list_apps`, `deployApp` → `deploy_app`, `getJob` → `get_job`).
- **Ẩn theo quyền token:** Agent chỉ nhìn thấy đúng các công cụ mà token của nó được phép gọi.
- **Chú thích an toàn:** Công cụ chỉ đọc gắn `readOnlyHint: true`; công cụ thay đổi trạng thái gắn `destructiveHint: true` (ngoại trừ `backup_app`), giúp hầu hết MCP client hỏi xác nhận người dùng trước khi chạy.
- **Job bất đồng bộ:** Các công cụ khởi tạo tác vụ nền trả về mã job (`deploymentId`) — agent dùng `get_job` để theo dõi đến khi hoàn tất.
- **Kiểm toán & giới hạn tần suất đầy đủ:** Mọi lệnh MCP đều đi qua cùng bộ rate limit và audit log như REST API, gắn nhãn `channel: mcp`.
