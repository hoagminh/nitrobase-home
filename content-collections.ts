import { defineConfig } from "@content-collections/core";
import { authors } from "./collections/author";
import { legals } from "./collections/legal";
import { globalSeo } from "./collections/settings";

export default defineConfig({
	content: [authors, legals, globalSeo],
});
