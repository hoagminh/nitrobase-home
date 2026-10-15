import { createFileRoute } from "@tanstack/react-router";
import { allLegals } from "content-collections";
import { Footer } from "#/components/landing/Footer/Footer";
import { Navbar } from "#/components/landing/Navbar/Navbar";
import { LegalDocumentView } from "#/components/legal/LegalDocumentView";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/terms-of-service")({
	loader: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;
		const doc =
			allLegals.find((l) => l.slug === "terms" && l.locale === locale) ||
			allLegals.find((l) => l.slug === "terms" && l.locale === "en") ||
			allLegals[0];

		const canonicalUrl =
			locale === "en"
				? "https://saasbase.dev/terms-of-service"
				: "https://saasbase.dev/vi/terms-of-service";

		const pageSeo: PageSeo = {
			title: `SaaS Base · ${doc.title}`,
			description: doc.description,
			type: "article",
			canonicalUrl,
			locale,
			siteName: globalSeoData?.site_name || "SaaS Base",
			twitterHandle: globalSeoData?.twitter_handle || "@saasbase",
			imageUrl: globalSeoData?.image || "/assets/landing/hero-preview.png",
			alternates: [
				{ hrefLang: "en", href: "https://saasbase.dev/terms-of-service" },
				{ hrefLang: "vi", href: "https://saasbase.dev/vi/terms-of-service" },
				{
					hrefLang: "x-default",
					href: "https://saasbase.dev/terms-of-service",
				},
			],
		};

		return { pageSeo, doc };
	},
	head: ({ loaderData }) => generatePageHead(loaderData?.pageSeo),
	component: TermsOfServicePage,
});

function TermsOfServicePage() {
	const { doc } = Route.useLoaderData();

	return (
		<div
			style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Navbar />
			<main style={{ flex: 1 }}>
				<LegalDocumentView doc={doc} activeSlug="terms" />
			</main>
			<Footer />
		</div>
	);
}
