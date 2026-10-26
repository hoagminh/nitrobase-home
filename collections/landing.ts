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

export const landingTechPartners = defineSingleton({
	name: "landingTechPartners",
	filePath: "contents/landing/tech-partners.yaml",
	parser: "yaml",
	schema: z.record(
		z.string(),
		z.object({ techPartners: z.array(techPartnerSchema) }),
	),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = value as {
					techPartners: z.infer<typeof techPartnerSchema>[];
				};
				return acc;
			},
			{} as Record<Locale, { techPartners: z.infer<typeof techPartnerSchema>[] }>,
		);
	},
});

export const landingWorkflowSteps = defineSingleton({
	name: "landingWorkflowSteps",
	filePath: "contents/landing/workflow-steps.yaml",
	parser: "yaml",
	schema: z.record(
		z.string(),
		z.object({ workflowSteps: z.array(workflowStepSchema) }),
	),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = value as {
					workflowSteps: z.infer<typeof workflowStepSchema>[];
				};
				return acc;
			},
			{} as Record<
				Locale,
				{ workflowSteps: z.infer<typeof workflowStepSchema>[] }
			>,
		);
	},
});

export const landingFeatures = defineSingleton({
	name: "landingFeatures",
	filePath: "contents/landing/features.yaml",
	parser: "yaml",
	schema: z.record(
		z.string(),
		z.object({ benefitItems: z.array(benefitItemSchema) }),
	),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = value as {
					benefitItems: z.infer<typeof benefitItemSchema>[];
				};
				return acc;
			},
			{} as Record<
				Locale,
				{ benefitItems: z.infer<typeof benefitItemSchema>[] }
			>,
		);
	},
});

export const landingTestimonials = defineSingleton({
	name: "landingTestimonials",
	filePath: "contents/landing/testimonials.yaml",
	parser: "yaml",
	schema: z.record(
		z.string(),
		z.object({ testimonials: z.array(testimonialSchema) }),
	),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = value as {
					testimonials: z.infer<typeof testimonialSchema>[];
				};
				return acc;
			},
			{} as Record<
				Locale,
				{ testimonials: z.infer<typeof testimonialSchema>[] }
			>,
		);
	},
});

export const landingFaq = defineSingleton({
	name: "landingFaq",
	filePath: "contents/landing/faq.yaml",
	parser: "yaml",
	schema: z.record(z.string(), z.object({ faqItems: z.array(faqItemSchema) })),
	transform: (doc) => {
		const { _meta, ...locales } = doc;
		return Object.entries(locales).reduce(
			(acc, [key, value]) => {
				acc[key as Locale] = value as {
					faqItems: z.infer<typeof faqItemSchema>[];
				};
				return acc;
			},
			{} as Record<Locale, { faqItems: z.infer<typeof faqItemSchema>[] }>,
		);
	},
});
