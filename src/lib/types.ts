import type React from 'react';

export interface ArticleMeta {
	title: string;
	tags: string[];
	date: string;
	excerpt: string;
	author?: string;
	order?: number;
}

export interface Article {
	meta: ArticleMeta;
	slug: string;
	section: string;
	subsection?: string;
	path: string;
	readingTime: number; // minutes
	component: () => React.ReactElement;
}

export interface Section {
	slug: string;
	label: string;
	articles: Article[];
	subsections: Record<string, Article[]>;
}
