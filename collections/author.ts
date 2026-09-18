import { defineCollection } from "@content-collections/core";
import { z } from "zod";

export const authors = defineCollection({
	name: "authors",
	directory: "contents/authors",
	include: "**/*.yaml",
	parser: "yaml",
	schema: z.object({
		name: z.string(),
		avatar: z.string().optional(),
		bio: z.string().optional(),
		email: z.string().optional(),
		website: z.string().optional(),
		twitter: z.string().optional(),
		github: z.string().optional(),
	}),
	transform: (doc) => {
		const slug = doc._meta.fileName.replace(/\.yaml$/, "");
		return { ...doc, slug };
	},
});
