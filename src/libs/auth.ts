type Provider = "github" | "gitlab";

type TypeScopes = {
	[key in Provider]: string;
};

type TypeAuth = {
	tokenHost: string;
	tokenPath: string;
	authorizePath: string;
};

type TypeClient = {
	id: string;
	secret: string;
};

export const scopes: TypeScopes = {
	github: "repo,user",
	gitlab: "api",
};

const auth: Record<Provider, TypeAuth> = {
	github: {
		tokenHost: "https://github.com",
		tokenPath: "/login/oauth/access_token",
		authorizePath: "/login/oauth/authorize",
	},
	gitlab: {
		tokenHost: "https://gitlab.com",
		tokenPath: "/oauth/token",
		authorizePath: "/oauth/authorize",
	},
};

const client: Record<Provider, TypeClient> = {
	github: {
		id: process.env.OAUTH_GITHUB_CLIENT_ID ?? "",
		secret: process.env.OAUTH_GITHUB_CLIENT_SECRET ?? "",
	},
	gitlab: {
		id: process.env.OAUTH_GITLAB_CLIENT_ID ?? "",
		secret: process.env.OAUTH_GITLAB_CLIENT_SECRET ?? "",
	},
};

export const config = (provider: Provider) => ({
	client: {
		id: client[provider].id,
		secret: client[provider].secret,
	},
	auth: {
		tokenHost: auth[provider].tokenHost,
		tokenPath: auth[provider].tokenPath,
		authorizePath: auth[provider].authorizePath,
	},
});

export const randomString = () =>
	Date.now().toString(36) + Math.random().toString(12).slice(2);
