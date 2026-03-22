import { gsap } from 'gsap';
import styled from 'styled-components';

import { useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet-async';

import { ArticleCard } from '@/components/article/ArticleCard';
import { NodeCarousel } from '@/components/common/NodeCarousel';
import { SectionCard } from '@/components/common/SectionCard';
import { PageLayout } from '@/components/layout/PageLayout';
import { articles, sections } from '@/content/registry';
import { countArticles, labelify, sortArticles } from '@/lib/articles';

export function HomePage() {
	const recentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.recent-card', {
				opacity: 0,
				y: 20,
				stagger: 0.08,
				duration: 0.4,
				ease: 'power2.out',
				delay: 0.4,
			});
		});
		return () => ctx.revert();
	}, []);

	const recent = sortArticles(articles).slice(0, 4);

	return (
		<>
			<Helmet>
				<title>SixtySecondSyntax – Learn coding concepts fast</title>
				<meta
					name="description"
					content="Bite-sized coding concept articles. Learn JavaScript, TypeScript, React and more in 60 seconds."
				/>
			</Helmet>
			<PageLayout>
				<Hero>
					<HeroTitle>
						Code concepts in <span>60 seconds</span>
					</HeroTitle>
					<HeroSub>
						Join in on the adventure of learning with programming concepts in 60
						seconds or less...
					</HeroSub>
				</Hero>

				<PageContent>
					<NodeCarousel title="Browse by Topic">
						{Object.entries(sections).map(([key, section]) => (
							<SectionCard
								key={key}
								to={`/${key}`}
								label={labelify(key)}
								articleCount={countArticles(section)}
							/>
						))}
					</NodeCarousel>

					<RecentSection>
						<SectionHeading>
							<SectionTitle>Recent Articles</SectionTitle>
						</SectionHeading>
						<div ref={recentRef}>
							<ArticleList>
								{recent.map(article => (
									<div key={article.path} className="recent-card">
										<ArticleCard article={article} />
									</div>
								))}
							</ArticleList>
						</div>
					</RecentSection>
				</PageContent>
			</PageLayout>
		</>
	);
}

const Hero = styled.section`
	padding: ${({ theme }) => theme.spacing[16]}
		${({ theme }) => theme.spacing[8]};
	padding-bottom: ${({ theme }) => theme.spacing[12]};
	max-width: 900px;
	margin: 0 auto;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: ${({ theme }) => theme.spacing[10]}
			${({ theme }) => theme.spacing[4]};
	}
`;

const HeroTitle = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes['4xl']};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.2;
	margin-bottom: ${({ theme }) => theme.spacing[6]};

	span {
		color: ${({ theme }) => theme.colors.accent};
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 3rem;
	}
`;

const HeroSub = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.lg};
	color: ${({ theme }) => theme.colors.textMuted};
	line-height: 1.6;
	max-width: 560px;
`;

const PageContent = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing[8]}
		${({ theme }) => theme.spacing[16]};

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: 0 ${({ theme }) => theme.spacing[4]}
			${({ theme }) => theme.spacing[10]};
	}
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

const RecentSection = styled.section`
	margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const ArticleList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[4]};
`;
