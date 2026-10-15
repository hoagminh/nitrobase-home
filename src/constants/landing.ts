import type {
	IFaqItem,
	IFooterSection,
	INavLink,
	ITechPartner,
	ITestimonial,
	IWorkflowStep,
} from "#/types/landing";

export const NAV_LINKS: INavLink[] = [
	{ id: "how-it-works", labelKey: "How It Works", href: "#how-it-works" },
	{ id: "docs", labelKey: "Docs", href: "#" },
	{ id: "features", labelKey: "Product", href: "#features" },
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
		titleKey: "Connect Your VPS",
		descKey:
			"Add your server using IP, SSH key or your preferred authentication method. SaaS Base will verify the connection and check your environment.",
		imageUrl: "/assets/landing/step-1.png",
	},
	{
		step: 2,
		badgeKey: "02",
		titleKey: "Deploy Supabase",
		descKey:
			"Choose your configuration and let SaaS Base automatically install and set up Supabase - including Docker, networking, SSL and more. No manual setup required.",
		imageUrl: "/assets/landing/step-2.png",
	},
	{
		step: 3,
		badgeKey: "03",
		titleKey: "Manage Your Backend",
		descKey:
			"Once deployed, you can manage your database, monitor system health, view logs and handle backups - all from a single, easy-to-use dashboard.",
		imageUrl: "/assets/landing/step-3.png",
	},
];

export interface IBenefitItem {
	id: string;
	iconName: "zap" | "database" | "grid-2x2" | "shield-check";
	titleKey: string;
	descKey: string;
	actionKey: string;
}

export const BENEFIT_ITEMS: IBenefitItem[] = [
	{
		id: "less-manual-setup",
		iconName: "zap",
		titleKey: "Less Manual Setup",
		descKey:
			"Skip the complex installation and configuration. Our guided setup gets your Supabase environment running in minutes, not hours.",
		actionKey: "Save time",
	},
	{
		id: "cost-control",
		iconName: "database",
		titleKey: "Cost Control",
		descKey:
			"Host on your own VPS and avoid rising cloud costs. You're in control of your infrastructure and budget.",
		actionKey: "See pricing",
	},
	{
		id: "one-dashboard",
		iconName: "grid-2x2",
		titleKey: "One Dashboard",
		descKey:
			"Manage your VPS, Supabase, databases, keys, backups and more - all in one place. No more switching between multiple tools.",
		actionKey: "Explore features",
	},
	{
		id: "simplified-operations",
		iconName: "shield-check",
		titleKey: "Simplified Operations",
		descKey:
			"Monitor performance, get real-time alerts, and handle issues with clear guidance - not just raw logs.",
		actionKey: "Learn more",
	},
];

export const TESTIMONIALS: ITestimonial[] = [
	{
		id: "alex-carter",
		name: "Alex Carter",
		role: "Full-stack Developer",
		quoteKey:
			"SaaS Base made it incredibly easy to get Supabase running on my own VPS. What used to take hours of manual setup now takes just a few clicks. The dashboard is clean, and the whole process feels really smooth.",
		avatarUrl: "/assets/landing/avatar-alex.png",
	},
	{
		id: "sophia-kim",
		name: "Sophia Kim",
		role: "Indie Hacker",
		quoteKey:
			"I love how simple the deployment process is. As a solo developer, I don't have time to deal with Docker, configs, or SSL. SaaS Base handles it all, and I can finally focus on building my product instead of managing infrastructure.",
		avatarUrl: "/assets/landing/avatar-sophia.png",
	},
	{
		id: "daniel-ruiz",
		name: "Daniel Ruiz",
		role: "CTO & Co-founder",
		quoteKey:
			"The best part is the balance between automation and control. I can manage my database, monitor resources, and handle backups - all in one place. It's exactly what I needed for my startup.",
		avatarUrl: "/assets/landing/avatar-daniel.png",
	},
	{
		id: "alex-ruiz",
		name: "Alex Ruiz",
		role: "Fullstack Engineer",
		quoteKey:
			"I cut our cloud database bill by 70% by moving to our own VPS with SaaS Base. The automated backups and health alerts give us total peace of mind.",
		avatarUrl: "/assets/landing/avatar-alex.png",
	},
];

export const FAQ_ITEMS: IFaqItem[] = [
	{
		id: "faq-1",
		questionKey: "Is SaaS Base free to use?",
		answerKey:
			"SaaS Base offers a free plan to get you started. You'll get access to essential features and a limited amount of resources. For larger projects or advanced features, we offer paid plans with more capacity and support.",
	},
	{
		id: "faq-2",
		questionKey: "Do I need a dedicated VPS?",
		answerKey:
			"Yes, you can use any cloud VPS from providers like DigitalOcean, Hetzner, Vultr, AWS, or your own bare metal server running Ubuntu 22.04 LTS.",
	},
	{
		id: "faq-3",
		questionKey: "Do I need DevOps knowledge to use this?",
		answerKey:
			"Not at all. SaaS Base automates Docker configuration, network setup, SSL certificates, firewall rules, and container orchestration.",
	},
	{
		id: "faq-4",
		questionKey: "How is my data and SSH key protected?",
		answerKey:
			"Your SSH keys are encrypted using AES-256-GCM. We never store private database data on our servers; your backend runs entirely on your own infrastructure.",
	},
	{
		id: "faq-5",
		questionKey: "Is there a backup and restore feature?",
		answerKey:
			"Yes! Automated daily backups can be configured to store encrypted dumps directly to AWS S3, Cloudflare R2, or local storage with 1-click restore.",
	},
	{
		id: "faq-6",
		questionKey: "Can I switch to another VPS later?",
		answerKey:
			"Yes, you can easily export your database dumps and volume snapshots to migrate to a new server with minimal downtime.",
	},
	{
		id: "faq-7",
		questionKey: "What happens if I run into an issue during deployment?",
		answerKey:
			"Our system includes built-in diagnostics and automatic rollbacks. You can also contact our support team directly from your dashboard.",
	},
];

export const FOOTER_SECTIONS: IFooterSection[] = [
	{
		titleKey: "PRODUCT",
		links: [
			{ labelKey: "How It Works", href: "#how-it-works" },
			{ labelKey: "Pricing", href: "#pricing" },
			{ labelKey: "Documentation", href: "#" },
		],
	},
	{
		titleKey: "COMPANY",
		links: [
			{ labelKey: "Privacy Policy", href: "#" },
			{ labelKey: "Terms of Service", href: "#" },
		],
	},
];
