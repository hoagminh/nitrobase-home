import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Author = GetTypeByName<typeof configuration, "authors">;
export declare const allAuthors: Array<Author>;

export {};
