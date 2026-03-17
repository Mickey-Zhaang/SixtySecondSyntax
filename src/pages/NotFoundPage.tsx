import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PageLayout } from '@/components/layout/PageLayout';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 – SixtySecondSyntax</title>
      </Helmet>
      <PageLayout hideSidebar>
        <Content>
          <Code>404</Code>
          <Message>This page doesn't exist (yet).</Message>
          <HomeLink to="/">Back to home</HomeLink>
        </Content>
      </PageLayout>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[20]} ${({ theme }) => theme.spacing[8]};
  text-align: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Code = styled.div`
  font-size: 6rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HomeLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  text-decoration: none;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;
