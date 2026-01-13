import rss from '@astrojs/rss';
import { writings } from '../data/site-data';

export async function GET(context) {
	return rss({
		title: 'Adam Slaker',
		description: 'Building intelligent systems that think, adapt, and ship.',
		site: context.site,
		items: writings.map((writing) => ({
			title: writing.title,
			pubDate: new Date(writing.publishedAt),
			description: writing.excerpt,
			link: `/blog/${writing.slug}/`,
		})),
	});
}
