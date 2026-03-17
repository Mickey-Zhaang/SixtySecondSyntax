import styled from 'styled-components';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <FooterEl>
      <span>© {year} SixtySecondSyntax</span>
      {' · '}
      <span>learn fast, code faster</span>
    </FooterEl>
  );
}

const FooterEl = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textDim};
  font-family: ${({ theme }) => theme.fonts.mono};
`;
