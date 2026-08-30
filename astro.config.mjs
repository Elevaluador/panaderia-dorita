// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://panaderiadorita.online/',
	integrations: [mdx(),
		 sitemap({
			filter: (page) =>
				!page.includes('/politica-cookies') &&
				!page.includes('/politica-privacidad'),
		}),
	],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Fraunces',
			cssVariable: '--font-display',
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Karla',
			cssVariable: '--font-cuerpo',
			fallbacks: ['-apple-system', 'sans-serif'],
		},
	],
});