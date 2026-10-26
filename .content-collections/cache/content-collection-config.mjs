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
    description: z2.string().nullable().optional(),
    order: z2.number().nullable().optional()
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

// collections/landing.ts
import { defineSingleton } from "@content-collections/core";
import { z as z3 } from "zod";
var techPartnerSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  logoUrl: z3.string()
});
var workflowStepSchema = z3.object({
  step: z3.number(),
  badgeKey: z3.string(),
  title: z3.string(),
  desc: z3.string(),
  imageUrl: z3.string()
});
var benefitItemSchema = z3.object({
  id: z3.string(),
  iconName: z3.enum([
    "server",
    "database",
    "refresh-cw",
    "shield-check",
    "zap",
    "grid-2x2",
    "boxes"
  ]),
  title: z3.string(),
  desc: z3.string(),
  action: z3.string(),
  tags: z3.array(z3.string()).optional()
});
var testimonialSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  role: z3.string(),
  quote: z3.string(),
  avatarUrl: z3.string()
});
var faqItemSchema = z3.object({
  id: z3.string(),
  question: z3.string(),
  answer: z3.string()
});
var landingSchema = z3.object({
  techPartners: z3.array(techPartnerSchema),
  workflowSteps: z3.array(workflowStepSchema),
  benefitItems: z3.array(benefitItemSchema),
  testimonials: z3.array(testimonialSchema),
  faqItems: z3.array(faqItemSchema)
});
var landingContent = defineSingleton({
  name: "landingContent",
  filePath: "contents/landing/content.yaml",
  parser: "yaml",
  schema: z3.record(z3.string(), landingSchema),
  transform: (doc) => {
    const { _meta, ...locales } = doc;
    return Object.entries(locales).reduce(
      (acc, [key, value]) => {
        acc[key] = landingSchema.parse(value);
        return acc;
      },
      {}
    );
  }
});

// collections/legal.ts
import { defineCollection as defineCollection3 } from "@content-collections/core";
import { compileMarkdown as compileMarkdown2 } from "@content-collections/markdown";
import { z as z4 } from "zod";
var legals = defineCollection3({
  name: "legals",
  directory: "contents/legal",
  include: "**/*.md",
  schema: z4.object({
    title: z4.string(),
    description: z4.string().optional(),
    lastUpdated: z4.union([z4.string(), z4.date()]).transform(
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
import { defineSingleton as defineSingleton2 } from "@content-collections/core";
import z5 from "zod";
var globalSeoSchema = z5.object({
  site_name: z5.string().optional(),
  title: z5.string().optional(),
  description: z5.string().optional(),
  keywords: z5.string().optional(),
  image: z5.string().optional(),
  author: z5.string().optional(),
  twitter_handle: z5.string().optional(),
  theme_color: z5.string().optional(),
  url: z5.string().optional()
});
var globalSeo = defineSingleton2({
  name: "globalSeo",
  filePath: "contents/settings/seo.yaml",
  parser: "yaml",
  schema: z5.record(z5.string(), globalSeoSchema),
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
  content: [authors, docs, legals, globalSeo, landingContent]
});
export {
  content_collections_default as default
};
