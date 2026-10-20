import { msg } from "@lingui/core/macro";
import type {
	IBenefitItem,
	IFaqItem,
	IFooterSection,
	INavLink,
	ITechPartner,
	ITestimonial,
	IWorkflowStep,
} from "#/types/landing";

export const NAV_LINKS: INavLink[] = [
	{
		id: "how-it-works",
		label: msg({ id: "How It Works" }),
		href: "#how-it-works",
	},
	{ id: "features", label: msg({ id: "Features" }), href: "#features" },
	{ id: "faq", label: msg({ id: "FAQ" }), href: "#faq" },
	{ id: "docs", label: msg({ id: "Docs" }), href: "#" },
];

export const TECH_PARTNERS: ITechPartner[] = [
	{ id: "supabase", name: "Supabase", logoUrl: "/assets/landing/supabase.png" },
	{
		id: "postgresql",
		name: "PostgreSQL",
		logoUrl: "/assets/landing/postgresql.png",
	},
	{ id: "docker", name: "Docker", logoUrl: "/assets/landing/docker.png" },
	{ id: "vultr", name: "Vultr", logoUrl: "/assets/landing/vultr.png" },
	{
		id: "digitalocean",
		name: "DigitalOcean",
		logoUrl: "/assets/landing/digitalocean.png",
	},
	{ id: "linode", name: "Linode", logoUrl: "/assets/landing/linode.png" },
];

export const WORKFLOW_STEPS: IWorkflowStep[] = [
	{
		step: 1,
		badgeKey: "01",
		title: msg({ id: "Connect VPS & Bootstrap" }),
		desc: msg({
			id: "Connect any fresh Ubuntu or Debian server over SSH with TOFU host key verification. SaaSBase automatically provisions Docker Engine 27, Traefik v3 reverse proxy, and configures TLS 1.3 Let's Encrypt certificates.",
		}),
		imageUrl: "/assets/landing/step-1.png",
	},
	{
		step: 2,
		badgeKey: "02",
		title: msg({ id: "Deploy Supabase & Backends" }),
		desc: msg({
			id: "Launch full-stack Supabase (Postgres 16, pgvector, GoTrue Auth, Kong Gateway, Studio), PocketBase, Appwrite, or import your entire database directly from Supabase Cloud with automatic credential generation.",
		}),
		imageUrl: "/assets/landing/step-2.png",
	},
	{
		step: 3,
		badgeKey: "03",
		title: msg({ id: "Backups & Zero-Downtime Migration" }),
		desc: msg({
			id: "Automate AES-256-CBC encrypted backups streamed offsite to Cloudflare R2, AWS S3, or B2. Move apps between servers seamlessly with automated health verification, instant rollback, and real-time telemetry.",
		}),
		imageUrl: "/assets/landing/step-3.png",
	},
];

export const BENEFIT_ITEMS: IBenefitItem[] = [
	{
		id: "vps-bootstrap",
		iconName: "server",
		title: msg({ id: "1-Click VPS & Docker Bootstrap" }),
		desc: msg({
			id: "Connect any Ubuntu or Debian VPS via SSH. SaaSBase bootstraps Docker 27, Traefik v3 reverse proxy, and SSL certificates automatically, or publishes securely through Cloudflare Tunnel without opening ports 80/443.",
		}),
		action: msg({ id: "View architecture" }),
	},
	{
		id: "supabase-full-stack",
		iconName: "database",
		title: msg({ id: "Production Supabase Full-Stack" }),
		desc: msg({
			id: "Deploy the full Supabase ecosystem: PostgreSQL 16 with pgvector for AI, Supavisor connection pooler, GoTrue Auth, Realtime WebSockets, Kong Gateway, and Supabase Studio with auto-generated secure credentials.",
		}),
		action: msg({ id: "Explore stack" }),
	},
	{
		id: "cloud-sync-migration",
		iconName: "refresh-cw",
		title: msg({ id: "Cloud Sync & Atomic Migration" }),
		desc: msg({
			id: "Import directly from Supabase Cloud - pulling database schemas, data, storage files, and edge functions to your VPS. Move running apps between servers with automated health verification and zero-downtime rollback.",
		}),
		action: msg({ id: "Cloud sync" }),
	},
	{
		id: "enterprise-security",
		iconName: "shield-check",
		title: msg({ id: "Encrypted Backups & Security" }),
		desc: msg({
			id: "Enterprise-grade security with HKDF-derived versioned secrets, zero-downtime key rotation, AES-256-CBC encrypted backups streamed to Cloudflare R2/S3, one-time SETUP_TOKEN protection, 2FA, and full audit logs.",
		}),
		action: msg({ id: "Security specs" }),
	},
];

export const TESTIMONIALS: ITestimonial[] = [
	{
		id: "alex-carter",
		name: "Alex Carter",
		role: msg({ id: "Full-stack Developer" }),
		quote: msg({
			id: "SaaSBase made self-hosting Supabase completely effortless. What used to take hours of manual Docker Compose configuration, Traefik routing, and SSL renewals now happens in one click. Our production cluster runs like a dream.",
		}),
		avatarUrl: "/assets/landing/avatar-alex.png",
	},
	{
		id: "sophia-kim",
		name: "Sophia Kim",
		role: msg({ id: "Indie Hacker" }),
		quote: msg({
			id: "Moving from hosted Supabase Cloud to my own $10 Hetzner VPS slashed my monthly infrastructure bill by 80%. The 1-click Cloud Sync pulled my entire database and storage buckets across without any friction.",
		}),
		avatarUrl: "/assets/landing/avatar-sophia.png",
	},
	{
		id: "daniel-ruiz",
		name: "Daniel Ruiz",
		role: msg({ id: "CTO & Co-founder" }),
		quote: msg({
			id: "The zero-downtime server migration and AES-256 encrypted offsite backups to Cloudflare R2 give our engineering team enterprise resilience. We own our data 100% with zero vendor lock-in.",
		}),
		avatarUrl: "/assets/landing/avatar-daniel.png",
	},
	{
		id: "marcus-vance",
		name: "Marcus Vance",
		role: msg({ id: "Lead DevOps Engineer" }),
		quote: msg({
			id: "Publishing backends through Cloudflare Tunnel without opening ports 80/443 on our VPS is brilliant. The SSH TOFU verification, scoped API tokens, and multi-channel alerts fit seamlessly into our team's workflow.",
		}),
		avatarUrl: "/assets/landing/avatar-alex.png",
	},
];

export const FAQ_ITEMS: IFaqItem[] = [
	{
		id: "faq-1",
		question: msg({
			id: "What is SaaSBase and how does it compare to Coolify or Dokploy?",
		}),
		answer: msg({
			id: "SaaSBase is an open-source, self-hosted PaaS and BaaS deployer. While general PaaS tools focus on general web apps, SaaSBase provides deep, specialized automation for modern Backend-as-a-Service platforms (especially Supabase, PocketBase, and Appwrite), including automated database clustering, connection pooling, cloud migration, and offsite disaster recovery.",
		}),
	},
	{
		id: "faq-2",
		question: msg({
			id: "What VPS providers and operating systems are supported?",
		}),
		answer: msg({
			id: "SaaSBase runs on any fresh Ubuntu (20.04/22.04/24.04 LTS) or Debian server (amd64 or arm64 architecture) with 2 GB RAM minimum (4 GB+ recommended for full Supabase stacks). You can connect servers from Hetzner, DigitalOcean, Vultr, AWS, OVH, or your own on-premise hardware via SSH.",
		}),
	},
	{
		id: "faq-3",
		question: msg({
			id: "What components are included in the self-hosted Supabase stack?",
		}),
		answer: msg({
			id: "The stack deploys the full production Supabase ecosystem: PostgreSQL 16 (with pgvector for AI embeddings), Supavisor connection pooler, Kong API Gateway, GoTrue Auth with JWT & OAuth, PostgREST for REST APIs, Realtime WebSockets (CDC), Storage, and the Supabase Studio dashboard.",
		}),
	},
	{
		id: "faq-4",
		question: msg({
			id: "How does Cloud Sync from Supabase Cloud work?",
		}),
		answer: msg({
			id: "SaaSBase securely connects to your hosted Supabase Cloud project via encrypted credentials and session pooler, then automatically replicates your database schema, table data, storage bucket files, and edge functions to your private VPS, eliminating prohibitive egress bandwidth fees.",
		}),
	},
	{
		id: "faq-5",
		question: msg({
			id: "How does SaaSBase secure secrets, keys, and backups?",
		}),
		answer: msg({
			id: "All secrets, passwords, and SSH keys are stored in a versioned format (v2:) using HKDF key derivation. Database backups are encrypted with AES-256-CBC and streamed offsite to Cloudflare R2, AWS S3, or Backblaze B2. Furthermore, a one-time SETUP_TOKEN prevents unauthorized instance takeovers during initialization.",
		}),
	},
	{
		id: "faq-6",
		question: msg({
			id: "Can I publish apps securely without opening public firewall ports?",
		}),
		answer: msg({
			id: "Yes! SaaSBase natively integrates Cloudflare Tunnel (Zero Trust). You can publish your applications and dashboards to the web using an outbound tunnel connector token, keeping ports 80 and 443 closed on your VPS firewall.",
		}),
	},
	{
		id: "faq-7",
		question: msg({
			id: "How does zero-downtime server migration work?",
		}),
		answer: msg({
			id: "When moving an app to another server, SaaSBase takes an atomic backup, streams it via S3/R2 storage, restores and health-checks all containers on the target machine, updates DNS records, and only removes source resources once health is 100% verified. If any step fails, it automatically rolls back.",
		}),
	},
];

export const FOOTER_SECTIONS: IFooterSection[] = [
	{
		id: "product",
		title: msg({ id: "PRODUCT" }),
		links: [
			{
				id: "how-it-works",
				label: msg({ id: "How It Works" }),
				href: "#how-it-works",
			},
			{ id: "features", label: msg({ id: "Features" }), href: "#features" },
			{ id: "faq", label: msg({ id: "FAQ" }), href: "#faq" },
			{
				id: "documentation",
				label: msg({ id: "Documentation" }),
				href: "#",
			},
		],
	},
	{
		id: "company",
		title: msg({ id: "COMPANY" }),
		links: [
			{
				id: "privacy-policy",
				label: msg({ id: "Privacy Policy" }),
				href: "/policy",
			},
			{
				id: "terms-of-service",
				label: msg({ id: "Terms of Service" }),
				href: "/terms-of-service",
			},
		],
	},
];
