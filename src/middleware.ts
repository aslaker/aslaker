import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((_context, next) => {
	// Redirects are handled by the Cloudflare Worker (src/worker.ts)
	// This middleware is kept for any future request processing needs
	return next();
});
