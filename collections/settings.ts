import { defineSingleton } from "@content-collections/core";
import z from "zod";
import type { Locale } from "#/libs/i18n";

export const globalSeoSchema = z.object({
	site_name: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	keywords: z.string().optional(),
	image: z.string().optional(),
	author: z.string().optional(),
	twitter_handle: z.string().optional(),
	theme_color: z.string().optional(),
	url: z.string().optional(),
});

export const globalSeo = defineSingleton({
	name: "globalSeo",
	filePath: "contents/settings/seo.yaml",
	parser: "yaml",
	schema: z.record(z.string(), globalSeoSchema),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = globalSeoSchema.parse(value);
				return acc;
			},
			{} as Record<Locale, z.infer<typeof globalSeoSchema>>,
		);
	},
});
