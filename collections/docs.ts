import { defineCollection } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import { z } from "zod";

export const docs = defineCollection({
	name: "docs",
	directory: "contents/docs",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		order: z.number().optional(),
	}),
	transform: async (doc, context) => {
		// Convert admonition/callout blocks (:::note[Title] ... :::) to styled HTML
		const contentWithCallouts = doc.content.replace(
			/:::(note|tip|caution|warning|info|danger)(?:\[(.*?)\])?\r?\n([\s\S]*?):::/g,
			(_, rawType, rawTitle, body) => {
				const type = rawType.toLowerCase();
				const title = rawTitle?.trim() || type.toUpperCase();
				return `<div class="docCallout docCallout-${type}"><div class="docCalloutHeader"><span class="docCalloutBadge">${type.toUpperCase()}</span><span class="docCalloutTitle">${title}</span></div><div class="docCalloutContent">\n\n${body.trim()}\n\n</div></div>`;
			},
		);

		const html = await compileMarkdown(
			context,
			{ ...doc, content: contentWithCallouts },
			{
				allowDangerousHtml: true,
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					[
						rehypeShiki,
						{
							themes: {
								light: "github-light",
								dark: "github-dark",
							},
							defaultColor: false,
							addLanguageClass: true,
						},
					],
				],
			},
		);
		const normalized = doc._meta.path.replace(/\\/g, "/");
		const pathParts = normalized.split("/");
		const locale = pathParts[0] || "en";
		const section = pathParts.length > 2 ? pathParts[1] : "getting-started";
		const slug = pathParts.slice(1).join("/").replace(/\.md$/, "");

		return {
			...doc,
			slug,
			locale,
			section,
			html,
		};
	},
});
