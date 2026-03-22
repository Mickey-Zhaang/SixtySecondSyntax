import type { Article, ContentNode } from './types';

export function calculateReadingTime(markdown: string): number {
	const wordsPerMinute = 200;
	const wordCount = markdown.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function slugify(str: string): string {
	return str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

export function labelify(slug: string): string {
	return slug
		.split('-')
		.map(w => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

export function sortArticles(articles: Article[]): Article[] {
	return [...articles].sort((a, b) => {
		const orderA = a.meta.order ?? Infinity;
		const orderB = b.meta.order ?? Infinity;
		if (orderA !== orderB) return orderA - orderB;
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});
}

// Count all articles in a node and its descendants
export function countArticles(node: ContentNode): number {
	return (
		node.articles.length +
		Object.values(node.children).reduce(
			(sum, child) => sum + countArticles(child),
			0
		)
	);
}

// Build a recursive content tree from a flat article list
export function buildContentTree(articles: Article[]): ContentNode {
	const root: ContentNode = {
		slug: '',
		label: '',
		path: '/',
		children: {},
		articles: [],
	};

	for (const article of articles) {
		let node = root;
		const dirSegments = article.segments.slice(0, -1); // all except slug

		for (let i = 0; i < dirSegments.length; i++) {
			const seg = dirSegments[i];
			if (!node.children[seg]) {
				node.children[seg] = {
					slug: seg,
					label: labelify(seg),
					path: '/' + dirSegments.slice(0, i + 1).join('/'),
					children: {},
					articles: [],
				};
			}
			node = node.children[seg];
		}

		node.articles.push(article);
	}

	sortAllNodes(root);
	return root;
}

function sortAllNodes(node: ContentNode) {
	node.articles = sortArticles(node.articles);
	for (const child of Object.values(node.children)) {
		sortAllNodes(child);
	}
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function getAllTags(articles: Article[]): string[] {
	const tagSet = new Set<string>();
	for (const article of articles) {
		for (const tag of article.meta.tags) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
}
