import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ArticleCard } from '@/components/article/ArticleCard';
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
							<NodeGrid>
								{childNodes.map((child) => (
									<div key={child.slug} className="listing-item">
										<NodeCard to={child.path}>
											<NodeCardTitle>{child.label}</NodeCardTitle>
											<NodeCardMeta>
												{countArticles(child)}{' '}
												{countArticles(child) === 1 ? 'article' : 'articles'}
											</NodeCardMeta>
										</NodeCard>
									</div>
								))}
							</NodeGrid>
						)}
						{node.articles.length > 0 && (
							<ArticleList $hasNodeGrid={childNodes.length > 0}>
								{node.articles.map((article) => (
									<div key={article.path} className="listing-item">
										<ArticleCard article={article} />
									</div>
								))}
							</ArticleList>
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
		padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
	}
`;

const PageTitle = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes['3xl']};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const NodeGrid = styled.div`
	display: grid;
	gap: ${({ theme }) => theme.spacing[4]};
	margin-bottom: ${({ theme }) => theme.spacing[8]};

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const NodeCard = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[2]};
	padding: ${({ theme }) => theme.spacing[5]};
	background: ${({ theme }) => theme.colors.bgCard};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.md};
	text-decoration: none;
	transition: all ${({ theme }) => theme.transitions.base};

	&:hover {
		border-color: ${({ theme }) => theme.colors.accent};
		background: ${({ theme }) => theme.colors.bgHover};
		box-shadow: ${({ theme }) => theme.shadows.accent};
		transform: translateY(-2px);
	}
`;

const NodeCardTitle = styled.h3`
	font-size: ${({ theme }) => theme.fontSizes.xl};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
`;

const NodeCardMeta = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.sm};
	color: ${({ theme }) => theme.colors.textMuted};
	font-family: ${({ theme }) => theme.fonts.mono};
`;

const ArticleList = styled.div<{ $hasNodeGrid: boolean }>`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[4]};
	padding-top: ${({ $hasNodeGrid, theme }) => ($hasNodeGrid ? theme.spacing[4] : '0')};
	border-top: ${({ $hasNodeGrid, theme }) =>
		$hasNodeGrid ? `1px solid ${theme.colors.border}` : 'none'};
`;
