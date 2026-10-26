import type { I18n } from "@lingui/core";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { globalSeo } from "content-collections";
import type { Locale } from "#/libs/i18n";
import { mantineTheme } from "#/theme/theme";
import appCss from "../styles.css?url";

interface MyRouterContext {
	i18n: I18n;
	globalSeoData?: (typeof globalSeo)[Locale];
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: ({ context }) => {
		const locale = (context.i18n.locale as Locale) || "en";
		const globalSeoData = globalSeo[locale] || globalSeo.en;
		return {
			locale,
			globalSeoData,
		};
	},
	loader: ({ context }) => {
		const { locale, globalSeoData } = context;
		return {
			locale,
			globalSeoData,
		};
	},
	head: ({ loaderData }) => {
		const seo = loaderData?.globalSeoData;
		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{ name: "google", content: "notranslate" },
				{
					title:
						seo?.title ||
						"Nitrobase - Self-Host Supabase & Modern Backends on Any VPS",
				},
				...(seo?.theme_color
					? [{ name: "theme-color", content: seo.theme_color }]
					: []),
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					href: "/favicon.ico",
					sizes: "32x32",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
			],
		};
	},
	shellComponent: RootDocument,
	notFoundComponent: () => (
		<div className="flex h-screen items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-4xl font-bold">404 - Not Found</h1>
				<p className="mt-2 text-slate-600">
					The page you are looking for does not exist.
				</p>
			</div>
		</div>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { i18n } = Route.useRouteContext();
	return (
		<html lang={i18n.locale} data-mantine-color-scheme="dark">
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
				<HeadContent />
			</head>
			<body>
				<MantineProvider theme={mantineTheme} defaultColorScheme="dark">
					{children}
				</MantineProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
