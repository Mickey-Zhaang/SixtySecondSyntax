import styled from 'styled-components';

import { Link } from 'react-router-dom';

interface SectionCardProps {
	to: string;
	label: string;
	articleCount: number;
}

export function SectionCard({ to, label, articleCount }: SectionCardProps) {
	return (
		<CardEl to={to}>
			<CardTitle>{label}</CardTitle>
			<CardCount>
				{articleCount} {articleCount === 1 ? 'article' : 'articles'}
			</CardCount>
		</CardEl>
	);
}

const CardEl = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[2]};
	padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
	min-width: 180px;
	max-width: 260px;
	height: 100%;
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

const CardTitle = styled.h3`
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
`;

const CardCount = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.textMuted};
	font-family: ${({ theme }) => theme.fonts.mono};
`;
