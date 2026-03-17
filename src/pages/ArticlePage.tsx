import styled from 'styled-components';

import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { PageLayout } from '@/components/layout/PageLayout';
import { articleBySlug } from '@/content/registry';

export function ArticlePage() {
	const { section, subsection, slug } = useParams<{
		section: string;
		subsection?: string;
		slug: string;
	}>();

	const key = subsection ? `${section}/${subsection}/${slug}` : `${section}/${slug}`;

	const article = articleBySlug[key];

	if (!article) {
		return <Navigate to="/404" replace />;
	}

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
