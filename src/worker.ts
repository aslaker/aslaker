/**
 * Cloudflare Worker entry point
 * Handles domain redirects and serves static assets
 */

interface Env {
	ASSETS: Fetcher;
	SITE_URL: string;
}

const PRIMARY_DOMAIN = 'adamslaker.dev';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Redirect non-primary domains to primary domain
		if (url.hostname !== PRIMARY_DOMAIN) {
			const redirectUrl = new URL(url.pathname + url.search, `https://${PRIMARY_DOMAIN}`);
			return Response.redirect(redirectUrl.toString(), 301);
		}

		// Serve static assets for primary domain
		return env.ASSETS.fetch(request);
	},
};
