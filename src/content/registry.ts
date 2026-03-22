import type React from 'react';

import {
	buildContentTree,
	calculateReadingTime,
	labelify,
} from '@/lib/articles';
import type { Article, ArticleMeta, ContentNode } from '@/lib/types';

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

// Parse file path into lowercase segments: './articles/Python/Flask/flask-setup.tsx'
// → ['python', 'flask', 'flask-setup']
function parseSegments(filePath: string): string[] {
	const withoutPrefix = filePath.replace('./articles/', '');
	return withoutPrefix
		.replace('.tsx', '')
		.split('/')
		.map(s => s.toLowerCase());
}

export const articles: Article[] = Object.entries(modules).map(
	([path, mod]) => {
		const segments = parseSegments(path);
		const slug = segments[segments.length - 1];
		const section = segments[0];

		const markdownSource =
			(mod as { content?: string }).content ?? mod.meta.excerpt;
		const readingTime = calculateReadingTime(markdownSource);

		return {
			meta: mod.meta,
			slug,
			section,
			segments,
			path: '/' + segments.join('/'),
			readingTime,
			component: mod.default,
		};
	}
);

export const contentRoot: ContentNode = buildContentTree(articles);

// sections = top-level children of the root (backward compat for HomePage)
export const sections = contentRoot.children;

// Fast O(1) article lookup by URL path
export const articleByPath: Record<string, Article> = {};
for (const article of articles) {
	articleByPath[article.path] = article;
}

// Walk the content tree to find a node at the given path segments
export function findContentNode(segments: string[]): ContentNode | null {
	let node: ContentNode = contentRoot;
	for (const seg of segments) {
		if (!node.children[seg]) return null;
		node = node.children[seg];
	}
	return node;
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
			a.segments.some(s => s.includes(q))
	);
}

export { labelify };
