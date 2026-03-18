import { Navigate, useLocation } from 'react-router-dom';

import { articleByPath, findContentNode } from '@/content/registry';

import { ArticlePage } from './ArticlePage';
import { ListingPage } from './ListingPage';

export function ContentRouter() {
	const { pathname } = useLocation();
	const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);

	if (segments.length === 0) return <Navigate to="/" replace />;

	// Leaf node: it's an article
	const article = articleByPath[pathname];
	if (article) return <ArticlePage article={article} />;

	// Interior node: it's a listing page (section / subsection / any depth)
	const node = findContentNode(segments);
	if (node) return <ListingPage node={node} />;

	return <Navigate to="/404" replace />;
}
