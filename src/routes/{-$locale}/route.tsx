import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isValidLocale } from "#/libs/i18n";

export const Route = createFileRoute("/{-$locale}")({
	beforeLoad: ({ params }) => {
		const locale = params.locale;
		if (locale && !isValidLocale(locale)) {
			throw notFound();
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
