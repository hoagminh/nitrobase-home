import { defineSingleton } from "@content-collections/core";
import { z } from "zod";
import type { Locale } from "#/libs/i18n";

export const techPartnerSchema = z.object({
	id: z.string(),
	name: z.string(),
	logoUrl: z.string(),
});

export const workflowStepSchema = z.object({
	step: z.number(),
	badgeKey: z.string(),
	title: z.string(),
	desc: z.string(),
	imageUrl: z.string(),
});

export const benefitItemSchema = z.object({
	id: z.string(),
	iconName: z.enum([
		"server",
		"database",
		"refresh-cw",
		"shield-check",
		"zap",
		"grid-2x2",
		"boxes",
	]),
	title: z.string(),
	desc: z.string(),
	action: z.string(),
	tags: z.array(z.string()).optional(),
});

export const testimonialSchema = z.object({
	id: z.string(),
	name: z.string(),
	role: z.string(),
	quote: z.string(),
	avatarUrl: z.string(),
});

export const faqItemSchema = z.object({
	id: z.string(),
	question: z.string(),
	answer: z.string(),
});

export const landingSchema = z.object({
	techPartners: z.array(techPartnerSchema),
	workflowSteps: z.array(workflowStepSchema),
	benefitItems: z.array(benefitItemSchema),
	testimonials: z.array(testimonialSchema),
	faqItems: z.array(faqItemSchema),
});

export type LandingContentData = z.infer<typeof landingSchema>;

export const landingContent = defineSingleton({
	name: "landingContent",
	filePath: "contents/landing/content.yaml",
	parser: "yaml",
	schema: z.record(z.string(), landingSchema),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = landingSchema.parse(value);
				return acc;
			},
			{} as Record<Locale, LandingContentData>,
		);
	},
});
