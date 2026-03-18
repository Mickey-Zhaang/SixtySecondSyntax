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
	slug: string;        // last segment, e.g. 'flask-setup'
	section: string;     // first segment, e.g. 'python'
	segments: string[];  // full path: ['python', 'flask', 'flask-setup']
	path: string;        // URL: /python/flask/flask-setup
	readingTime: number;
	component: () => React.ReactElement;
}

// Recursive tree node — represents a section, subsection, or any folder level
export interface ContentNode {
	slug: string;
	label: string;
	path: string;
	children: Record<string, ContentNode>; // sub-folders
	articles: Article[];                    // articles directly in this folder
}
