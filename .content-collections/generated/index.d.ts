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

export type LandingTechPartner = GetTypeByName<typeof configuration, "landingTechPartners">;
export declare const landingTechPartner: LandingTechPartner;

export type LandingWorkflowStep = GetTypeByName<typeof configuration, "landingWorkflowSteps">;
export declare const landingWorkflowStep: LandingWorkflowStep;

export type LandingFeature = GetTypeByName<typeof configuration, "landingFeatures">;
export declare const landingFeature: LandingFeature;

export type LandingTestimonial = GetTypeByName<typeof configuration, "landingTestimonials">;
export declare const landingTestimonial: LandingTestimonial;

export type LandingFaq = GetTypeByName<typeof configuration, "landingFaq">;
export declare const landingFaq: LandingFaq;

export {};
