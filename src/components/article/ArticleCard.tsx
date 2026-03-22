import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Tag } from '@/components/common/Tag';
import { formatDate } from '@/lib/articles';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card to={article.path}>
			<CardTitle>{article.meta.title}</CardTitle>
			<CardExcerpt>{article.meta.excerpt}</CardExcerpt>
			<CardFooter>
				<CardDate>{formatDate(article.meta.date)}</CardDate>
				<Dot>·</Dot>
				<ReadTime>{article.readingTime} min</ReadTime>
				<TagList>
					{article.meta.tags.slice(0, 3).map(tag => (
						<Tag key={tag} label={tag} />
					))}
				</TagList>
			</CardFooter>
		</Card>
	);
}

const Card = styled(Link)`
	display: block;
	padding: ${({ theme }) => theme.spacing[5]};
	background: ${({ theme }) => theme.colors.bgCard};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.md};
	text-decoration: none;
	transition: all ${({ theme }) => theme.transitions.base};
	color: inherit;

	&:hover {
		border-color: ${({ theme }) => theme.colors.accent};
		background: ${({ theme }) => theme.colors.bgHover};
		box-shadow: ${({ theme }) => theme.shadows.accent};
		transform: translateY(-2px);
	}
`;

const CardTitle = styled.h3`
	font-size: ${({ theme }) => theme.fontSizes.xl};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing[2]};
	line-height: 1.3;
`;

const CardExcerpt = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.md};
	color: ${({ theme }) => theme.colors.textMuted};
	line-height: 1.6;
	margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardFooter = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${({ theme }) => theme.spacing[3]};
`;

const CardDate = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.textDim};
	font-family: ${({ theme }) => theme.fonts.mono};
`;

const ReadTime = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.textDim};
	font-family: ${({ theme }) => theme.fonts.mono};
`;

const Dot = styled.span`
	color: ${({ theme }) => theme.colors.textDim};
	font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const TagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing[1]};
	margin-left: auto;
`;
