import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

// 1. Meta — controls how the article appears in listings
export const meta: ArticleMeta = {
	title: 'Sausage and Kale Rigatoni',
	tags: ['pasta'],
	date: '2026-04-20',
	excerpt: 'Made this for CKBK Dinner Party, absolute hit!',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

// 2. Content — markdown string for the article body
export const content = `

## Ingredients
> - 1 lb rigatoni pasta
> - 1 lb spicy italian sausage
> - 6 cups chopped kale
> - 10 cup water (flexible)
> - 2 cups pasta water reserved
> - 2 tsp salt
> - 2 tsp pepper flakes (adjust to taste)
> - 2 tsp black pepper
> - 3 cloves garlic
> - 1/2 cup butter
> - 2 cups of grated parmesan reggiano (divided)

## Instructions
1) Prepare for the cooking process by mincing/grating garlic, grating the parmesan reggiano (must be wedge, not store packaged), cut the butter into tbsp chunks, and chop the kale
2) In a large pot, add the salt and heat the water on high until it comes to a boil. Add pasta and cook until al dente (2 minutes under suggested on package)
3) While pasta is cooking, heat a large pan on medium high. Crumble the sausage and add to pan. Stir and cook until light brown and visible greese collects
4) Bring the heat to a low and add the minced garlic, black pepper, and pepper flakes, continue to cook for 1 minutes then kill the heat
5) Scoop in 2 cups of hot pasta water. Stir in the kale and turn the heat to high to bring the added pasta water to a boil.
6) When the water starts boiling and kale has reduced in size, turn the heat to a medium and add the butter 2 tbsp at a time. Stir consistently for 2 minutes or until glossy
7) Drain pasta
8) Sprinkle in 1 1/2 cups of grated parmesan, stir for another 2 minutes until well combined 
9) Bring the meat to a low-medium and add the drained pasta to the pan and stir for another 2 minutes to ensure the pasta is coated thoroughly
10) Plate and serve the pasta and top the 1/2 cup of parmesan, then serve immediately 



`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
