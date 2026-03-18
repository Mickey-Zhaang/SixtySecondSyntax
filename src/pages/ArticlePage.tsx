import styled from 'styled-components';

import { Helmet } from 'react-helmet-async';

import { PageLayout } from '@/components/layout/PageLayout';
import type { Article } from '@/lib/types';

interface ArticlePageProps {
	article: Article;
}

export function ArticlePage({ article }: ArticlePageProps) {
	const Component = article.component;

	return (
		<>
			<Helmet>
				<title>{article.meta.title} – SixtySecondSyntax</title>
				<meta name="description" content={article.meta.excerpt} />
			</Helmet>
			<PageLayout>
				<PageContent>
					<Component />
				</PageContent>
			</PageLayout>
		</>
	);
}

const PageContent = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing[8]};

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: 0 ${({ theme }) => theme.spacing[4]};
	}
`;
