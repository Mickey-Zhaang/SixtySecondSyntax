import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Vermicelli Rice',
	tags: ['food', 'lebanese'],
	date: '2026-04-14', // YYYY-MM-DD
	excerpt: 'Need to test + update',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

export const content = `

## Ingredients
> - 1/4 cup of vermicelli noodles, broken into small pieces
> - 1 1/2 cup of basmati rice, washed until water runs clear
> - 1 tbsp chicken bouillon
> - 1 tbsp olive oil

## Instructions
1) Heat olive ol in a saucepan over medioum heat. Add broekn vermicelli and toast. Stir constantly until golden.
2) Add washed basmatiy rice and stir to coat in oil.
3) Pour in water, add the chicken bouillon, and bring to a boil. Drop to a low simmer and cover to cook for 20 minutes
4) Remove from heat and let steam while covered for 5 minutes
5) fluff with fork and serve!

`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
