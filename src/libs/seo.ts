export type AlternateEntry = {
	hrefLang: string;
	href: string;
};

export type PageSeo = {
	title: string;
	description?: string;
	keywords?: string;
	type?: "website" | "article";
	canonicalUrl?: string;
	imageUrl?: string;
	imageAlt?: string;
	locale: "en" | "vi";
	alternates?: AlternateEntry[];
	twitterHandle?: string;
	siteName?: string;
	meta?: Array<Record<string, string>>;
	jsonLd?: unknown;
};

export function generatePageHead(seo?: PageSeo) {
	if (!seo) return { meta: [], links: [], scripts: [] };

	const title = seo.title;
	const description = seo.description;
	const keywords = seo.keywords;
	const type = seo.type || "website";
	const canonicalUrl = seo.canonicalUrl;
	const imageUrl = seo.imageUrl;
	const imageAlt = seo.imageAlt || title;
	const twitterHandle = seo.twitterHandle;
	const siteName = seo.siteName;

	return {
		meta: [
			{ title },
			...(description ? [{ name: "description", content: description }] : []),
			...(keywords ? [{ name: "keywords", content: keywords }] : []),
			{ property: "og:type", content: type },
			...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
			{ property: "og:title", content: title },
			...(description
				? [{ property: "og:description", content: description }]
				: []),
			...(siteName ? [{ property: "og:site_name", content: siteName }] : []),
			...(imageUrl
				? [
						{ property: "og:image", content: imageUrl },
						{ property: "og:image:alt", content: imageAlt },
					]
				: []),
			{
				name: "twitter:card",
				content: imageUrl ? "summary_large_image" : "summary",
			},
			{ name: "twitter:title", content: title },
			...(description
				? [{ name: "twitter:description", content: description }]
				: []),
			...(canonicalUrl ? [{ name: "twitter:url", content: canonicalUrl }] : []),
			...(twitterHandle
				? [
						{ name: "twitter:site", content: twitterHandle },
						{ name: "twitter:creator", content: twitterHandle },
					]
				: []),
			...(imageUrl ? [{ name: "twitter:image", content: imageUrl }] : []),
			...(seo.meta || []),
		].filter(
			(tag) =>
				"title" in tag || (tag.content !== undefined && tag.content !== ""),
		),
		links: [
			...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
			...(seo.alternates
				? seo.alternates.map((alt) => ({
						rel: "alternate",
						hrefLang: alt.hrefLang,
						href: alt.href,
					}))
				: []),
		],
		scripts: seo.jsonLd
			? [
					{
						type: "application/ld+json",
						children: JSON.stringify(seo.jsonLd),
					},
				]
			: [],
	};
}
