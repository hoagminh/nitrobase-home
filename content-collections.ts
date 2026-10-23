import { defineConfig } from "@content-collections/core";
import { authors } from "./collections/author";
import { docs } from "./collections/docs";
import { landingContent } from "./collections/landing";
import { legals } from "./collections/legal";
import { globalSeo } from "./collections/settings";

export default defineConfig({
	content: [authors, docs, legals, globalSeo, landingContent],
});
