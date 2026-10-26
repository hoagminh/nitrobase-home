import { createFileRoute, notFound } from "@tanstack/react-router";
import { allDocs } from "content-collections";
import { DocsView } from "#/components/docs/DocsView";
import { Footer } from "#/components/landing/Footer/Footer";
import { Navbar } from "#/components/landing/Navbar/Navbar";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/docs/")({
	loader: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;
		const splat = "getting-started/introduction";

		const doc =
			allDocs.find((d) => d.slug === splat && d.locale === locale) ||
			allDocs.find((d) => d.slug === splat && d.locale === "en");

		if (!doc) {
			throw notFound();
		}

		const canonicalUrl =
			locale === "en"
				? "https://nitrobase.dev/docs"
				: "https://nitrobase.dev/vi/docs";

		const pageSeo: PageSeo = {
			title: `${doc.title}`,
			description: doc.description || "Nitrobase Technical Documentation",
			type: "article",
			canonicalUrl,
			locale,
			siteName: globalSeoData?.site_name || "Nitrobase",
			twitterHandle: globalSeoData?.twitter_handle || "@nitrobase",
			imageUrl: globalSeoData?.image || "/uploads/hero-preview.png",
			alternates: [
				{ hrefLang: "en", href: "https://nitrobase.dev/docs" },
				{ hrefLang: "vi", href: "https://nitrobase.dev/vi/docs" },
				{ hrefLang: "x-default", href: "https://nitrobase.dev/docs" },
			],
		};

		return { pageSeo, doc, splat };
	},
	head: ({ loaderData }) => generatePageHead(loaderData?.pageSeo),
	component: DocsIndexPage,
});

function DocsIndexPage() {
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
