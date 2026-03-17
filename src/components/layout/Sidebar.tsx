import styled from 'styled-components';

import { SectionNav } from '@/components/navigation/SectionNav';

export function Sidebar() {
  return (
    <SidebarEl>
      <SectionNav />
    </SidebarEl>
  );
}

const SidebarEl = styled.aside`
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgAlt};
  overflow-y: auto;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
