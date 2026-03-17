import styled from 'styled-components';

interface TagProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export function Tag({ label, onClick, active = false }: TagProps) {
  return (
    <StyledTag $active={active} $clickable={!!onClick} onClick={onClick}>
      #{label}
    </StyledTag>
  );
}

const StyledTag = styled.span<{ $active: boolean; $clickable: boolean }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accentDim : theme.colors.bgCard};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.border};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  ${({ $clickable, theme }) =>
    $clickable &&
    `
    &:hover {
      background: ${theme.colors.accentDim};
      color: ${theme.colors.text};
      border-color: ${theme.colors.accent};
    }
  `}
`;
