import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/auth/LoginForm/LoginForm";
import type { Locale } from "#/libs/i18n";
import { generatePageHead, type PageSeo } from "#/libs/seo";

export const Route = createFileRoute("/{-$locale}/login")({
	loader: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = context.globalSeoData;
		const title = `Nitrobase · ${context.i18n._("Sign in")}`;
		const description = context.i18n._(
			"Sign in to your Nitrobase account to deploy and manage Supabase and backend instances.",
		);

		const canonicalUrl =
			locale === "en"
				? "https://nitrobase.dev/login"
				: "https://nitrobase.dev/vi/login";

		const pageSeo: PageSeo = {
			title,
			description,
			canonicalUrl,
			locale,
			siteName: globalSeoData?.site_name || "Nitrobase",
			twitterHandle: globalSeoData?.twitter_handle || "@nitrobase",
			imageUrl: "/assets/auth/login-bg.png",
			alternates: [
				{ hrefLang: "en", href: "https://nitrobase.dev/login" },
				{ hrefLang: "vi", href: "https://nitrobase.dev/vi/login" },
				{ hrefLang: "x-default", href: "https://nitrobase.dev/login" },
			],
		};

		return { pageSeo };
	},
	head: ({ loaderData }) => generatePageHead(loaderData?.pageSeo),
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}
