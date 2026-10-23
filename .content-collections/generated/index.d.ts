import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Author = GetTypeByName<typeof configuration, "authors">;
export declare const allAuthors: Array<Author>;

export type Doc = GetTypeByName<typeof configuration, "docs">;
export declare const allDocs: Array<Doc>;

export type Legal = GetTypeByName<typeof configuration, "legals">;
export declare const allLegals: Array<Legal>;

export type GlobalSeo = GetTypeByName<typeof configuration, "globalSeo">;
export declare const globalSeo: GlobalSeo;

export type LandingContent = GetTypeByName<typeof configuration, "landingContent">;
export declare const landingContent: LandingContent;

export {};
