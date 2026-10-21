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

// collections/docs.ts
import { defineCollection as defineCollection2 } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import { z as z2 } from "zod";
var docs = defineCollection2({
  name: "docs",
  directory: "contents/docs",
  include: "**/*.md",
  schema: z2.object({
    title: z2.string(),
    description: z2.string().optional(),
    order: z2.number().optional()
  }),
  transform: async (doc, context) => {
    const contentWithCallouts = doc.content.replace(
      /:::(note|tip|caution|warning|info|danger)(?:\[(.*?)\])?\r?\n([\s\S]*?):::/g,
      (_, rawType, rawTitle, body) => {
        const type = rawType.toLowerCase();
        const title = rawTitle?.trim() || type.toUpperCase();
        return `<div class="docCallout docCallout-${type}"><div class="docCalloutHeader"><span class="docCalloutBadge">${type.toUpperCase()}</span><span class="docCalloutTitle">${title}</span></div><div class="docCalloutContent">

${body.trim()}

</div></div>`;
      }
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
                dark: "github-dark"
              },
              defaultColor: false,
              addLanguageClass: true
            }
          ]
        ]
      }
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
      html
    };
  }
});

// collections/legal.ts
import { defineCollection as defineCollection3 } from "@content-collections/core";
import { compileMarkdown as compileMarkdown2 } from "@content-collections/markdown";
import { z as z3 } from "zod";
var legals = defineCollection3({
  name: "legals",
  directory: "contents/legal",
  include: "**/*.md",
  schema: z3.object({
    title: z3.string(),
    description: z3.string().optional(),
    lastUpdated: z3.union([z3.string(), z3.date()]).transform(
      (v) => typeof v === "string" ? v : v.toISOString().slice(0, 10)
    ).optional()
  }),
  transform: async (doc, context) => {
    const html = await compileMarkdown2(context, doc);
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
import z4 from "zod";
var globalSeoSchema = z4.object({
  site_name: z4.string().optional(),
  title: z4.string().optional(),
  description: z4.string().optional(),
  keywords: z4.string().optional(),
  image: z4.string().optional(),
  author: z4.string().optional(),
  twitter_handle: z4.string().optional(),
  theme_color: z4.string().optional(),
  url: z4.string().optional()
});
var globalSeo = defineSingleton({
  name: "globalSeo",
  filePath: "contents/settings/seo.yaml",
  parser: "yaml",
  schema: z4.record(z4.string(), globalSeoSchema),
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
  content: [authors, docs, legals, globalSeo]
});
export {
  content_collections_default as default
};
