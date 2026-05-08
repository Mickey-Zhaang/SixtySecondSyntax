import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

// 1. Meta — controls how the article appears in listings
export const meta: ArticleMeta = {
	title: 'Gnocchi Florentine',
	tags: ['italian', 'pasta'],
	date: '2026-04-08', // YYYY-MM-DD
	excerpt: 'Want to make, need to update',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

// 2. Content — markdown string for the article body
export const content = `
## Ingredients
> -


## Instructions
1) 


`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
