import { defineCollection } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";

export const legals = defineCollection({
	name: "legals",
	directory: "contents/legal",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		lastUpdated: z
			.union([z.string(), z.date()])
			.transform((v) =>
				typeof v === "string" ? v : v.toISOString().slice(0, 10),
			)
			.optional(),
	}),
	transform: async (doc, context) => {
		const html = await compileMarkdown(context, doc);
		const pathParts = doc._meta.path.replace(/\\/g, "/").split("/");
		let locale = "en";
		let slug = doc._meta.fileName.replace(/\.md$/, "");

		if (pathParts.length > 1) {
			locale = pathParts[0];
			slug = pathParts.slice(1).join("/").replace(/\.md$/, "");
		} else if (slug.includes(".")) {
			const parts = slug.split(".");
			slug = parts[0];
			locale = parts[1] || "en";
		}

		return {
			...doc,
			slug,
			locale,
			html,
		};
	},
});
