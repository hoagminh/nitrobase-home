import type { I18n } from "@lingui/core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { Locale } from "#/libs/i18n";
import appCss from "../styles.css?url";

interface MyRouterContext {
	i18n: I18n;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: ({ context }) => {
		const locale = context.i18n.locale as Locale;
		return {
			locale,
		};
	},
	loader: ({ context }) => {
		const { locale } = context;
		return {
			locale,
		};
	},
	head: () => ({
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
				title: "Tanstack Template",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: () => (
		<div className="flex h-screen items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-4xl font-bold">404 - Not Found</h1>
				<p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
			</div>
		</div>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { i18n } = Route.useRouteContext();
	return (
		<html lang={i18n.locale}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
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
