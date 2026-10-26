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
import { TestimonialsSection } from "#/components/landing/TestimonialsSection/TestimonialsSection";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/")({
	loader: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;

		const title =
			globalSeoData?.title ||
			"Nitrobase - Self-Host Supabase & Modern Backends on Any VPS";
		const description =
			globalSeoData?.description ||
			"Open-source self-hosted PaaS & BaaS deployer. Connect any Ubuntu VPS, bootstrap Docker & Traefik in 1 click, and deploy Supabase full-stack, PocketBase, and apps with encrypted backups and cloud sync.";

		const canonicalUrl =
			locale === "en" ? "https://nitrobase.dev/" : "https://nitrobase.dev/vi/";

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
				{ hrefLang: "en", href: "https://nitrobase.dev/" },
				{ hrefLang: "vi", href: "https://nitrobase.dev/vi/" },
				{ hrefLang: "x-default", href: "https://nitrobase.dev/" },
			],
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Nitrobase",
				operatingSystem: "Linux (Ubuntu)",
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
			<SectionDivider />
			<TestimonialsSection />
			<SectionDivider />
			<FaqSection />
			<SectionDivider />
			<CtaBannerSection />
			<SectionDivider />
			<Footer />
		</main>
	);
}
