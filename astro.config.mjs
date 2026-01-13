// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://adamslaker.dev',
	output: 'static',
	adapter: cloudflare(),
	integrations: [
		react(),
		mdx(),
		sitemap(),
	],
	vite: {
		css: {
			postcss: './postcss.config.mjs',
		},
	},
});
