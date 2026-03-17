import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ArticleCard } from '@/components/article/ArticleCard';
import { PageLayout } from '@/components/layout/PageLayout';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { sections } from '@/content/registry';
import { labelify } from '@/lib/articles';

export function SectionPage() {
  const { section } = useParams<{ section: string }>();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.article-card-item', {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, [section]);

  if (!section || !sections[section]) {
    return <Navigate to="/404" replace />;
  }

  const sectionData = sections[section];
  const hasSubsections = Object.keys(sectionData.subsections).length > 0;
  const topLevel = sectionData.articles.filter((a) => !a.subsection);

  return (
    <>
      <Helmet>
        <title>{labelify(section)} – SixtySecondSyntax</title>
      </Helmet>
      <PageLayout>
        <PageContent>
          <Breadcrumbs />
          <PageTitle>{labelify(section)}</PageTitle>
          <div ref={listRef}>
            {!hasSubsections && (
              <ArticleList>
                {sectionData.articles.map((article) => (
                  <div key={article.path} className="article-card-item">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </ArticleList>
            )}

            {hasSubsections && (
              <>
                {topLevel.length > 0 && (
                  <ArticleList>
                    {topLevel.map((article) => (
                      <div key={article.path} className="article-card-item">
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </ArticleList>
                )}
                {Object.entries(sectionData.subsections).map(([subKey, subArticles]) => (
                  <div key={subKey}>
                    <SubsectionTitle>{labelify(subKey)}</SubsectionTitle>
                    <ArticleList>
                      {subArticles.map((article) => (
                        <div key={article.path} className="article-card-item">
                          <ArticleCard article={article} />
                        </div>
                      ))}
                    </ArticleList>
                  </div>
                ))}
              </>
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

const SubsectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;
