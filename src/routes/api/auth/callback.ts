import { createFileRoute } from "@tanstack/react-router";
import { config } from "#/libs/auth";

const renderBody = (
	status: string,
	content: {
		token: string;
		provider: string;
	},
) => {
	return `
   <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:${content.provider}:${status}:${JSON.stringify(
						content,
					)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:${content.provider}", "*");
    </script>
  `;
};

export const Route = createFileRoute("/api/auth/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { searchParams } = new URL(request.url);
				const provider = searchParams.get("provider");
				const code = searchParams.get("code");

				if (provider === "github" || provider === "gitlab") {
					try {
						const authConfig = config(provider);
						const tokenUri = new URL(
							`${authConfig.auth.tokenHost}${authConfig.auth.tokenPath}`,
						);

						const data = {
							code: code ?? "",
							client_id: authConfig.client.id,
							client_secret: authConfig.client.secret,
						};

						const body = await fetch(tokenUri.toString(), {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Accept: "application/json",
							},
							body: JSON.stringify(data),
						});

						const responseData = await body.json();
						const responseBody = renderBody("success", {
							token: `${responseData.access_token}`,
							provider,
						});

						return new Response(responseBody, {
							status: 200,
							headers: {
								"Content-Type": "text/html",
							},
						});
					} catch (error) {
						console.error(error);
						return new Response("Unauthorized", {
							status: 401,
						});
					}
				} else {
					return new Response("Provider not found!", {
						status: 404,
					});
				}
			},
		},
	},
});
