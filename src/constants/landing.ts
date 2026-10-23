import { msg } from "@lingui/core/macro";
import type { IFooterSection, INavLink } from "#/types/landing";

export const NAV_LINKS: INavLink[] = [
	{
		id: "how-it-works",
		label: msg({ id: "How It Works" }),
		href: "#how-it-works",
	},
	{ id: "features", label: msg({ id: "Features" }), href: "#features" },
	{ id: "faq", label: msg({ id: "FAQ" }), href: "#faq" },
	{ id: "docs", label: msg({ id: "Docs" }), href: "/docs" },
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
				href: "/docs",
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
