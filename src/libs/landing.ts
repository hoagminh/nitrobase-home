import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react";
import { landingContent } from "content-collections";
import type { Locale } from "#/libs/i18n";
import type { LandingContentData } from "../../collections/landing";

export function getLandingContent(locale: Locale = "en"): LandingContentData {
	return landingContent[locale] || landingContent.en;
}

export function useLandingContent(): LandingContentData {
	const { i18n } = useLingui();
	const locale = (i18n.locale as Locale) || "en";
	return getLandingContent(locale);
}

export function resolveLandingText(
	text: string | MessageDescriptor | undefined,
	i18nTranslate: (descriptor: MessageDescriptor | string) => string,
): string {
	if (!text) return "";
	if (typeof text === "string") return text;
	return i18nTranslate(text);
}
