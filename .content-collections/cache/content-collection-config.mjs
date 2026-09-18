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

// content-collections.ts
var content_collections_default = defineConfig({
  content: [authors]
});
export {
  content_collections_default as default
};
