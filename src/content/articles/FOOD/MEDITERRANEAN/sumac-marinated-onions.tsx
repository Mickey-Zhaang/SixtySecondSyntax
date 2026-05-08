import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Sumac Marinated Onions',
	tags: ['food', 'turkish', 'side dishes'],
	date: '2026-04-14', // YYYY-MM-DD
	excerpt: 'Need to test + update',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

export const content = `

## Ingredients
> - 1 red onion
> - 2 tspn sumac
> - 1 tbsp fresh lemon juice
> - 1 tbsp olive oil
> - handful of parsley
> - pinch of salt

## Instructions
1) Slice onion into thin slices (soak in bowl of water for 10 minutes for lighter onion taste)
2) Roughly chop parsely leaves
3) Add onion slices into bowl with sumac, lemon juice, olive oil, salt, and chopped parsely. Stir well and coat thoroughly
4) Marinate for 5 minutes and serve up!

`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
