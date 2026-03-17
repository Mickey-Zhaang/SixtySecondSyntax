import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SearchBar } from '@/components/search/SearchBar';

export function Header() {
  return (
    <HeaderEl>
      <Logo to="/">
        <span>60s</span>Syntax
      </Logo>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
    </HeaderEl>
  );
}

const HeaderEl = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: 0 ${({ theme }) => theme.spacing[6]};
  height: 60px;
  background: ${({ theme }) => theme.colors.bgAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(8px);
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  margin-left: auto;
`;
