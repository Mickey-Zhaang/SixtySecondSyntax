import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { labelify } from '@/content/registry';

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <Nav aria-label="Breadcrumb">
      <Crumb to="/">Home</Crumb>
      {parts.map((part, i) => {
        const path = '/' + parts.slice(0, i + 1).join('/');
        const isLast = i === parts.length - 1;
        return (
          <span key={path} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sep>/</Sep>
            {isLast ? (
              <Current>{labelify(part)}</Current>
            ) : (
              <Crumb to={path}>{labelify(part)}</Crumb>
            )}
          </span>
        );
      })}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const Crumb = styled(Link)`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Sep = styled.span`
  color: ${({ theme }) => theme.colors.textDim};
  user-select: none;
`;

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;
