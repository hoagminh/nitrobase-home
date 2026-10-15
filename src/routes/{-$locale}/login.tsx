import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/auth/LoginForm/LoginForm";

export const Route = createFileRoute("/{-$locale}/login")({
	head: ({ match }) => ({
		meta: [
			{
				title: `SaaS Base · ${match.context.i18n._("Sign in")}`,
			},
		],
	}),
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}
