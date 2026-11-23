import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export interface DocNavItem {
	slug: string;
	title: MessageDescriptor;
}

export interface DocSection {
	id: string;
	title: MessageDescriptor;
	items: DocNavItem[];
}

export const DOC_SECTIONS: DocSection[] = [
	{
		id: "getting-started",
		title: msg({ id: "Getting Started" }),
		items: [
			{
				slug: "getting-started/introduction",
				title: msg({ id: "Introduction" }),
			},
			{
				slug: "getting-started/quickstart-vps",
				title: msg({ id: "Quickstart on VPS" }),
			},
			{
				slug: "getting-started/manual-install",
				title: msg({ id: "Manual Docker Compose" }),
			},
			{
				slug: "getting-started/first-run",
				title: msg({ id: "First-Run Setup" }),
			},
		],
	},
	{
		id: "core-concepts",
		title: msg({ id: "Core Concepts" }),
		items: [
			{
				slug: "core-concepts/architecture",
				title: msg({ id: "Architecture Overview" }),
			},
			{
				slug: "core-concepts/server-connections",
				title: msg({ id: "Server Connections" }),
			},
			{
				slug: "core-concepts/security-encryption",
				title: msg({ id: "Security & Encryption" }),
			},
			{ slug: "core-concepts/teams-rbac", title: msg({ id: "Teams & RBAC" }) },
		],
	},
	{
		id: "server-networking",
		title: msg({ id: "Server & Networking" }),
		items: [
			{
				slug: "server-networking/managing-servers",
				title: msg({ id: "Managing Servers" }),
			},
			{
				slug: "server-networking/domains-ssl",
				title: msg({ id: "Domains & SSL (Traefik v3)" }),
			},
			{
				slug: "server-networking/cloudflare-tunnel",
				title: msg({ id: "Cloudflare Tunnel" }),
			},
			{
				slug: "server-networking/reverse-proxy",
				title: msg({ id: "Reverse Proxy & Headers" }),
			},
		],
	},
	{
		id: "apps-templates",
		title: msg({ id: "Apps & Templates" }),
		items: [
			{
				slug: "apps-templates/deploying-apps",
				title: msg({ id: "Deploying Marketplace Apps" }),
			},
			{
				slug: "apps-templates/databases",
				title: msg({ id: "Standalone Databases" }),
			},
			{
				slug: "apps-templates/git-deployments",
				title: msg({ id: "Git Deployments" }),
			},
			{
				slug: "apps-templates/custom-compose",
				title: msg({ id: "Custom Docker Compose" }),
			},
			{
				slug: "apps-templates/template-spec",
				title: msg({ id: "Template Specification" }),
			},
			{
				slug: "apps-templates/auto-updates",
				title: msg({ id: "Auto-updates & Rollback" }),
			},
		],
	},
	{
		id: "guides",
		title: msg({ id: "Special Guides" }),
		items: [
			{
				slug: "guides/supabase-self-hosting",
				title: msg({ id: "Self-hosting Supabase" }),
			},
			{
				slug: "guides/supabase-cloud-sync",
				title: msg({ id: "Supabase Cloud Sync" }),
			},
			{
				slug: "guides/moving-apps",
				title: msg({ id: "Move App Between Servers" }),
			},
		],
	},
	{
		id: "backup-recovery",
		title: msg({ id: "Backup & Recovery" }),
		items: [
			{
				slug: "backup-recovery/destinations",
				title: msg({ id: "Storage Destinations" }),
			},
			{
				slug: "backup-recovery/app-backups",
				title: msg({ id: "App Backups & Schedules" }),
			},
			{
				slug: "backup-recovery/self-backup",
				title: msg({ id: "Nitrobase Self-Backup" }),
			},
			{
				slug: "backup-recovery/disaster-recovery",
				title: msg({ id: "Disaster Recovery" }),
			},
		],
	},
	{
		id: "maintenance",
		title: msg({ id: "Maintenance & Operations" }),
		items: [
			{
				slug: "maintenance/upgrading",
				title: msg({ id: "Upgrading Nitrobase" }),
			},
			{
				slug: "maintenance/rotating-keys",
				title: msg({ id: "Rotating ENCRYPTION_KEY" }),
			},
			{
				slug: "maintenance/monitoring-terminal",
				title: msg({ id: "Monitoring & Terminal" }),
			},
			{
				slug: "maintenance/notifications",
				title: msg({ id: "Alerts & Notifications" }),
			},
		],
	},
	{
		id: "api-reference",
		title: msg({ id: "REST API Reference" }),
		items: [
			{
				slug: "api-reference/authentication",
				title: msg({ id: "API Authentication" }),
			},
			{
				slug: "api-reference/apps-and-servers",
				title: msg({ id: "Apps & Servers Endpoints" }),
			},
			{
				slug: "api-reference/job-logs-sse",
				title: msg({ id: "Realtime SSE Job Streaming" }),
			},
			{
				slug: "api-reference/openapi",
				title: msg({ id: "OpenAPI Specification" }),
			},
			{
				slug: "api-reference/mcp-server",
				title: msg({ id: "MCP Server (AI Agents)" }),
			},
		],
	},
	{
		id: "contributing",
		title: msg({ id: "Contributing & Community" }),
		items: [
			{
				slug: "contributing/development-setup",
				title: msg({ id: "Development Setup" }),
			},
			{
				slug: "contributing/code-architecture",
				title: msg({ id: "Codebase Architecture" }),
			},
			{
				slug: "contributing/community",
				title: msg({ id: "Community & Issues" }),
			},
		],
	},
];
