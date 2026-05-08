import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

// 1. Meta — controls how the article appears in listings
export const meta: ArticleMeta = {
	title: 'Tres Leches (Hard)',
	tags: ['Cake'],
	date: '2026-05-08',
	excerpt: 'Learned from Rebecca!',
	order: 1, // optional — controls sort order within a section: 1 > 9
};

// 2. Content — markdown string for the article body
export const content = `

## Ingredients
> ### Cake:
> - Nonstick baking spray (or butter)
> - 1 cup all-purpose flour
> - 1 1/2 tsp baking powder
> - 1/4 tsp salt
> - 5 eggs, seperated
> - 1 cup sugar, divided
> - 1/3 cup milk
> - 1 tsp vanilla
>
> ### Tres Leches Mix:
> - 1 can condensed milk
> - 1 can evaporated milk
> - 1/4 cup heavy whipping cream
> 
> ### Whipped Cream mixture
> - 1 pt. heavy cream for whipping
> - 3 tbsp sugar
> - 1/2 tsp vanilla extract



## Instructions
1) There is a certain je ne sais quoi to a proper mise un place in preparing for this recipe. So pre-heat the overn to 350, grab 2 large bowls, 2 medium sized bowls, pitcher, measuring cup, and tsp + tbsp measuerers.
2) In a large bowl, combine the flour, salt, and baking powder
3) In the medium bowls, seperate the eggs into yolks and whites (Make sure no yolk mixes with the whites!)
4) With electric/stand mixer, first whisk the egg whites on high until soft peaks form. Mix in 1/4 cup sugar and whip until just stiff. (Make sure to NOT overwhip to dry)
5) Now add 3/4 cup sugar to the yolks and whisk until pale yellow. Stir in 1 tsp vanilla and 1/3 cup milk and continue until thoroughly mixed.
6) Pour the yolk mixture into the dry ingredients and stir very gently until well combined into a batter.
7) Now fold the fluffy egg whites very gently into the batter until the yellow streaks meld into the whites. At this point, the batter should be an airy and fluffy mixture.
8) Pour the batter and spread evenly into a 9x13 baking pan sprayed with the non-stick baking spray or buttered. Bake for about 25-30 minutes until the top is golden brown and a toothpick comes out clean.
9) While the cake is baking in a small pitcher, combine the condensed milk, evaporated milk, and 1/4 cup heavy cream and mix thoroughly.
10) In the other large bowl, combine the 1pt heavy cream, 3 tbsp sugar, and 1/2 tsp vanilla extract and whip until stiff peaks. Store in refrigeration to keep shape.
11) When the cake is cooled, pierce the surface with a fork a lot of times and gradually pour the milk mixture.
12) Let the cake absorb for atleast 30 minutes (better in refrigeration).
13) Ice the cake with the whipped cream and enjoy!
`;

// 3. Default export — the rendered component
export default function YourArticleName() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
