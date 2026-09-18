import { createFileRoute } from "@tanstack/react-router";
import { config, randomString, scopes } from "#/libs/auth";

export const Route = createFileRoute("/api/auth/")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { searchParams } = new URL(request.url);
				const provider = searchParams.get("provider");

				if (provider === "github" || provider === "gitlab") {
					const authConfig = config(provider);

					const data = {
						client_id: authConfig.client.id,
						redirect_uri: `${process.env.SITE_URL}/api/auth/callback?provider=${provider}`,
						scope: scopes[provider],
						state: randomString(),
					};

					const authorizationUri = new URL(
						`${authConfig.auth.tokenHost}${
							authConfig.auth.authorizePath
						}?${new URLSearchParams(data).toString()}`,
					);

					return Response.redirect(authorizationUri.toString(), 302);
				} else {
					return new Response("Provider not found!", {
						status: 404,
					});
				}
			},
		},
	},
});
