import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

// 1. Meta — controls how the article appears in listings
export const meta: ArticleMeta = {
	title: 'Tres Leches (Easy)',
	tags: ['Cake'],
	date: '2026-04-08',
	excerpt: "Made Tres Leches for Penny's Birthday!",
	order: 1, // optional — controls sort order within a section: 1 > 9
};

// 2. Content — markdown string for the article body
export const content = `

## Ingredients
> ### Cake:
> - 4 eggs
> - Box Vanilla Cake Mix
> - 1 cup milk
> - 1/2 cup melted butter
>
> ### Tres Leches Mix:
> - 1/2 can condensed milk
> - 1 cup milk
> - 1/2 cup heavy whipping cream
> 
> ### Whipped Cream mixture
> - 2 cups heavy whipping cream
> - 1 cup powder sugar
> - 2 tsp vanilla extract
>



## Instructions
1) In large bowl, whisk together 4 eggs thoroughly. Then add 1 cup milk and 1/2 cup melted butter, mix until homogenous. Finally add the box of cake mix and mix for 2 minutes.
2) Pre-heat oven to 350F. In a 9x13 baking/cake pan, spray non-stick spraw and evenly pour the cake batter into the pan.
3) Bake for 30-35 minutes
4) In a large bowl, mix together 2 cups heavy whipping cream, 1 cup powder sugar, 2 tsp of vanilla extract. Whip the whipped cream mixture until stiff peaks (stiffer and can hold structure).
5) In a smaller bowl, mix togher the "Tres Leches Mix": 1/2 can condensed milk, 1 cup milk, 1/2 cup heavy whipping cream
6) After the cake is taken out of the oven and cooled, poke many holes into cake with fork or toothpick. Take the "Tres Leches Mix" in the smaller bowl and pour it over the cake.
7) Apply the whipped cream mixture evenly over the cake.

`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
