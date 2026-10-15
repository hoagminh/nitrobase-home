// content-collections.ts
import { defineConfig } from "@content-collections/core";

// collections/author.ts
import { defineCollection } from "@content-collections/core";
import { z } from "zod";
var authors = defineCollection({
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
    github: z.string().optional()
  }),
  transform: (doc) => {
    const slug = doc._meta.fileName.replace(/\.yaml$/, "");
    return { ...doc, slug };
  }
});

// collections/legal.ts
import { defineCollection as defineCollection2 } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z as z2 } from "zod";
var legals = defineCollection2({
  name: "legals",
  directory: "contents/legal",
  include: "**/*.md",
  schema: z2.object({
    title: z2.string(),
    description: z2.string().optional(),
    lastUpdated: z2.union([z2.string(), z2.date()]).transform(
      (v) => typeof v === "string" ? v : v.toISOString().slice(0, 10)
    ).optional()
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
      html
    };
  }
});

// collections/settings.ts
import { defineSingleton } from "@content-collections/core";
import z3 from "zod";
var globalSeoSchema = z3.object({
  site_name: z3.string().optional(),
  title: z3.string().optional(),
  description: z3.string().optional(),
  keywords: z3.string().optional(),
  image: z3.string().optional(),
  author: z3.string().optional(),
  twitter_handle: z3.string().optional(),
  theme_color: z3.string().optional(),
  url: z3.string().optional()
});
var globalSeo = defineSingleton({
  name: "globalSeo",
  filePath: "contents/settings/seo.yaml",
  parser: "yaml",
  schema: z3.record(z3.string(), globalSeoSchema),
  transform: (doc) => {
    const { _meta, ...locales } = doc;
    return Object.entries(locales).reduce(
      (acc, [key, value]) => {
        acc[key] = globalSeoSchema.parse(value);
        return acc;
      },
      {}
    );
  }
});

// content-collections.ts
var content_collections_default = defineConfig({
  content: [authors, legals, globalSeo]
});
export {
  content_collections_default as default
};
