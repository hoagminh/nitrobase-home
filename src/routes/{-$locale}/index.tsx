import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { CtaBannerSection } from "#/components/landing/CtaBannerSection/CtaBannerSection";
import { FaqSection } from "#/components/landing/FaqSection/FaqSection";
import { FeaturesSection } from "#/components/landing/FeaturesSection/FeaturesSection";
import { Footer } from "#/components/landing/Footer/Footer";
import { HeroSection } from "#/components/landing/HeroSection/HeroSection";
import { HowItWorksSection } from "#/components/landing/HowItWorksSection/HowItWorksSection";
import layoutStyles from "#/components/landing/LandingLayout.module.css";
import { Navbar } from "#/components/landing/Navbar/Navbar";
import { SectionDivider } from "#/components/landing/SectionDivider/SectionDivider";
import { TechStackSection } from "#/components/landing/TechStackSection/TechStackSection";
// import { TestimonialsSection } from "#/components/landing/TestimonialsSection/TestimonialsSection";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/")({
	loader: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;

		const title =
			globalSeoData?.title ||
			"Nitrobase - Self-Host Supabase, Databases & Modern Backends on Your Own Servers";
		const description =
			globalSeoData?.description ||
			"Self-hosted PaaS & BaaS control panel. Connect any VPS over SSH, bootstrap Docker & Traefik v3, and deploy Supabase, Appwrite, PocketBase, databases, or Git apps with AES-256-GCM secrets, verified backups, Cloud Sync, and MCP server.";

		const canonicalUrl =
			locale === "en" ? "https://nitrobase.app/" : "https://nitrobase.app/vi/";

		const pageSeo: PageSeo = {
			title,
			description,
			keywords: globalSeoData?.keywords,
			imageUrl: globalSeoData?.image || "/uploads/hero-preview.png",
			siteName: globalSeoData?.site_name || "Nitrobase",
			twitterHandle: globalSeoData?.twitter_handle || "@nitrobase",
			canonicalUrl,
			locale,
			alternates: [
				{ hrefLang: "en", href: "https://nitrobase.app/" },
				{ hrefLang: "vi", href: "https://nitrobase.app/vi/" },
				{ hrefLang: "x-default", href: "https://nitrobase.app/" },
			],
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Nitrobase",
				operatingSystem: "Linux (Ubuntu, Debian), Docker",
				applicationCategory: "DeveloperApplication",
				description,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
			},
		};

		return { pageSeo };
	},
	head: ({ loaderData }) => generatePageHead(loaderData?.pageSeo),
	component: LandingPage,
});

function LandingPage() {
	const location = useLocation();

	useEffect(() => {
		const hash = location.hash || window.location.hash.replace(/^#/, "");
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location.hash]);

	return (
		<main className={layoutStyles.main}>
			<Navbar />
			<div className={layoutStyles.gridFrame} aria-hidden="true">
				<div className={layoutStyles.verticalGuideLeft} />
				<div className={layoutStyles.verticalGuideRight} />
			</div>
			<HeroSection />
			<SectionDivider />
			<TechStackSection />
			<SectionDivider />
			<HowItWorksSection />
			<SectionDivider />
			<FeaturesSection />
			{/* <SectionDivider />
			<TestimonialsSection /> */}
			<SectionDivider />
			<FaqSection />
			<SectionDivider />
			<CtaBannerSection />
			<SectionDivider />
			<Footer />
		</main>
	);
}
