import {
	createLinguiStart,
	type LocaleDefinition,
} from "@sourceking/tanstack-lingui";

export const ignoredPaths = ["api", "rpc", "webhook"];
export const cookieName = "locale";
export const defaultLocale: Locale = "en";

export const locales = [
	{ code: "en", name: "English", nativeName: "English" },
	{ code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof locales)[number]["code"];

export const i18n = createLinguiStart({
	locales: [...locales],
	defaultLocale: defaultLocale,
	cookieName: cookieName,
	cookieMaxAge: 31536000,
	ignoredPaths: ignoredPaths,
	loadMessages: async (locale: string) => {
		const { messages } = await import(`../locales/${locale}.json?lingui`);
		return messages;
	},
});

export const {
	i18nServerEntry,
	i18nMiddleware,
	useLocale,
	LocalizedLink,
	localizePath,
	isValidLocale,
	routerWithI18n,
	createCookieHeader,
	stripLocalePrefix,
} = i18n;
