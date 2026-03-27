import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Dumplings Recipe',
	tags: ['food', 'asian'],
	date: '2026-03-17', // YYYY-MM-DD
	excerpt: 'Dumpling Recipe: continuous refinement for 2026',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

export const content = `

Dumplings Recipe


## Ingredients

> ## Wrappings:
> - 2 ½ cups of flour
> - 1 cup water
>
> ## Filling:
> - 1 lb ground pork
> - 3 cloves garlic
> - 1 tbsp toasted sesame oil
> - 2 tbsp soy sauce
> - half an onion (diced)
> - 1 egg
> - 1 tsp chicken bouillon powerder (optional) 
> - 150 g scallions (optional)
> - 1 tsp ground white pepper (optional)
> - neutral oil (for frying)

`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
