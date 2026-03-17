import type React from 'react';

import { buildSections, calculateReadingTime, labelify } from '@/lib/articles';
import type { Article, ArticleMeta, Section } from '@/lib/types';

interface ArticleModule {
	meta: ArticleMeta;
	default: () => React.ReactElement;
	content?: string;
}

const allModules = import.meta.glob('./articles/**/*.tsx', {
	eager: true,
}) as Record<string, ArticleModule>;

// Exclude files whose name starts with _ (e.g. _template.tsx)
const modules = Object.fromEntries(
	Object.entries(allModules).filter(
		([path]) => !path.split('/').pop()?.startsWith('_')
	)
);

function parsePathParts(filePath: string): {
	section: string;
	subsection?: string;
	slug: string;
} {
	// e.g. "./articles/javascript/closures.tsx"
	//      "./articles/react/hooks/use-state.tsx"
	const withoutPrefix = filePath.replace('./articles/', '');
	const parts = withoutPrefix.replace('.tsx', '').split('/');

	if (parts.length === 2) {
		return { section: parts[0], slug: parts[1] };
	} else if (parts.length === 3) {
		return { section: parts[0], subsection: parts[1], slug: parts[2] };
	}
	// Deeper nesting: treat last two as subsection/slug
	return {
		section: parts[0],
		subsection: parts.slice(1, -1).join('-'),
		slug: parts[parts.length - 1],
	};
}

export const articles: Article[] = Object.entries(modules).map(
	([path, mod]) => {
		const { section, subsection, slug } = parsePathParts(path);

		// Estimate reading time from markdown content if exported, else from excerpt
		const markdownSource =
			(mod as { content?: string }).content ?? mod.meta.excerpt;
		const readingTime = calculateReadingTime(markdownSource);

		return {
			meta: mod.meta,
			slug,
			section,
			subsection,
			path: `/${section}${subsection ? `/${subsection}` : ''}/${slug}`,
			readingTime,
			component: mod.default,
		};
	}
);

export const sections: Record<string, Section> = buildSections(articles);

export const articleBySlug: Record<string, Article> = {};
for (const article of articles) {
	// Key: "section/slug" or "section/subsection/slug"
	const key = article.subsection
		? `${article.section}/${article.subsection}/${article.slug}`
		: `${article.section}/${article.slug}`;
	articleBySlug[key] = article;
}

export function searchArticles(query: string): Article[] {
	if (!query.trim()) return articles;
	const q = query.toLowerCase();
	return articles.filter(
		a =>
			a.meta.title.toLowerCase().includes(q) ||
			a.meta.excerpt.toLowerCase().includes(q) ||
			a.meta.tags.some(t => t.toLowerCase().includes(q)) ||
			a.meta.author?.toLowerCase().includes(q) ||
			a.section.toLowerCase().includes(q) ||
			a.slug.toLowerCase().includes(q)
	);
}

export { labelify };
