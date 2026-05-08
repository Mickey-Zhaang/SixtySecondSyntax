import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Soy Coke Glazed Chicken',
	tags: ['food', 'asian', 'easy meals'],
	date: '2026-04-14', // YYYY-MM-DD
	excerpt: 'Need to test + update',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

export const content = `

## Ingredients
> - 5 chicken thighs
> - 1 tbsp minced garlic
> - 3 tbsp soy sauce
> - 3 tbsp oyster sauce
> - pinch of black pepper
> - 1 can of Coke
> - (Optional) scallions and sesame seeds to garnish

## Instructions
1) Cut chicken thighs into small, bite-sized chunks
2) In large bowl, toss in the chicken and add soy sauce oyster sauce, black pepper, garlic and let marinate for 5 minutes
3) In larger pan, heat neutral oil on medium-high heat until hot. Add in the chicken and pan-fry for 4 minutes or until it gets nice and brown (make sure to not overcook).
4) Pour in a can of Coke. Cover and let cook for 6-7 more minutes
5) Once time is up, uncover and stir to ensure maximal glazing of chicken
6) Serve over rice + veggies and enjoy!

`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
