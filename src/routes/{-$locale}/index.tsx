import { createFileRoute } from "@tanstack/react-router";
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
			globalSeoData?.title || "SaasBase - Self-host Supabase, Simplified";
		const description =
			globalSeoData?.description ||
			"Deploy and manage open-source Supabase infrastructure on your own VPS automatically, securely, and without DevOps complexity.";

		const canonicalUrl =
			locale === "en" ? "https://saasbase.dev/" : "https://saasbase.dev/vi/";

		const pageSeo: PageSeo = {
			title,
			description,
			keywords: globalSeoData?.keywords,
			imageUrl: globalSeoData?.image || "/assets/landing/hero-preview.png",
			siteName: globalSeoData?.site_name || "SaaS Base",
			twitterHandle: globalSeoData?.twitter_handle || "@saasbase",
			canonicalUrl,
			locale,
			alternates: [
				{ hrefLang: "en", href: "https://saasbase.dev/" },
				{ hrefLang: "vi", href: "https://saasbase.dev/vi/" },
				{ hrefLang: "x-default", href: "https://saasbase.dev/" },
			],
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "SaaS Base",
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
