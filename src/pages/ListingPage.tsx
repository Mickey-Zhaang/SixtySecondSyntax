import { gsap } from 'gsap';
import styled from 'styled-components';

import { useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet-async';

import { ArticleCard } from '@/components/article/ArticleCard';
import { NodeCarousel } from '@/components/common/NodeCarousel';
import { SectionCard } from '@/components/common/SectionCard';
import { PageLayout } from '@/components/layout/PageLayout';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { countArticles } from '@/lib/articles';
import type { ContentNode } from '@/lib/types';

interface ListingPageProps {
	node: ContentNode;
}

export function ListingPage({ node }: ListingPageProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.listing-item',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' }
			);
		}, contentRef);
		return () => ctx.revert();
	}, [node.path]);

	const childNodes = Object.values(node.children);

	return (
		<>
			<Helmet>
				<title>{node.label} – SixtySecondSyntax</title>
			</Helmet>
			<PageLayout>
				<PageContent>
					<Breadcrumbs />
					<PageTitle>{node.label}</PageTitle>
					<div ref={contentRef}>
						{childNodes.length > 0 && (
							<NodeCarousel title="Browse by Topic">
								{childNodes.map(child => (
									<div key={child.slug} className="listing-item">
										<SectionCard
											to={child.path}
											label={child.label}
											articleCount={countArticles(child)}
										/>
									</div>
								))}
							</NodeCarousel>
						)}
						{node.articles.length > 0 && (
							<Section>
								<SectionHeading>
									<SectionTitle>Articles</SectionTitle>
								</SectionHeading>
								<ArticleList>
									{node.articles.map(article => (
										<div key={article.path} className="listing-item">
											<ArticleCard article={article} />
										</div>
									))}
								</ArticleList>
							</Section>
						)}
					</div>
				</PageContent>
			</PageLayout>
		</>
	);
}

const PageContent = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[8]};

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: ${({ theme }) => theme.spacing[6]}
			${({ theme }) => theme.spacing[4]};
	}
`;

const PageTitle = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes['3xl']};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Section = styled.section`
	margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const SectionHeading = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	margin-bottom: ${({ theme }) => theme.spacing[5]};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	padding-bottom: ${({ theme }) => theme.spacing[3]};
`;

const SectionTitle = styled.h2`
	font-size: ${({ theme }) => theme.fontSizes['2xl']};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
`;

const ArticleList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[4]};
`;
