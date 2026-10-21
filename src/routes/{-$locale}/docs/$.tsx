import { createFileRoute, notFound } from "@tanstack/react-router";
import { allDocs } from "content-collections";
import { DocsView } from "#/components/docs/DocsView";
import { Footer } from "#/components/landing/Footer/Footer";
import { Navbar } from "#/components/landing/Navbar/Navbar";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/docs/$")({
	loader: ({ context, params }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;
		const splat = params._splat || "getting-started/introduction";

		// Find localized document or fallback to English
		const doc =
			allDocs.find((d) => d.slug === splat && d.locale === locale) ||
			allDocs.find((d) => d.slug === splat && d.locale === "en");

		if (!doc) {
			throw notFound();
		}

		const canonicalUrl =
			locale === "en"
				? `https://saasbase.dev/docs/${doc.slug}`
				: `https://saasbase.dev/vi/docs/${doc.slug}`;

		const pageSeo: PageSeo = {
			title: `${doc.title}`,
			description: doc.description || "SaaSBase Technical Documentation",
			type: "article",
			canonicalUrl,
			locale,
			siteName: globalSeoData?.site_name || "SaaSBase",
			twitterHandle: globalSeoData?.twitter_handle || "@saasbase",
			imageUrl: globalSeoData?.image || "/assets/landing/hero-preview.png",
			alternates: [
				{ hrefLang: "en", href: `https://saasbase.dev/docs/${doc.slug}` },
				{ hrefLang: "vi", href: `https://saasbase.dev/vi/docs/${doc.slug}` },
				{
					hrefLang: "x-default",
					href: `https://saasbase.dev/docs/${doc.slug}`,
				},
			],
		};

		return { pageSeo, doc, splat };
	},
	head: ({ loaderData }) => generatePageHead(loaderData?.pageSeo),
	component: DocDetailPage,
});

function DocDetailPage() {
	const { doc, splat } = Route.useLoaderData();

	return (
		<div
			style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Navbar />
			<main style={{ flex: 1 }}>
				<DocsView doc={doc} currentSlug={splat} />
			</main>
			<Footer />
		</div>
	);
}
