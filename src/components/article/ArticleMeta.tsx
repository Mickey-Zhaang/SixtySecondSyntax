import styled from 'styled-components';

import { Tag } from '@/components/common/Tag';
import { formatDate } from '@/lib/articles';
import type { ArticleMeta as ArticleMetaType } from '@/lib/types';

interface ArticleMetaProps {
	meta: ArticleMetaType;
	readingTime?: number;
}

export function ArticleMeta({ meta, readingTime }: ArticleMetaProps) {
	return (
		<MetaRow>
			<span>{formatDate(meta.date)}</span>
			{meta.author && (
				<>
					<Dot>·</Dot>
					<span>{meta.author}</span>
				</>
			)}
			{readingTime != null && (
				<>
					<Dot>·</Dot>
					<span>{readingTime} min read</span>
				</>
			)}
			{meta.tags.length > 0 && (
				<>
					<Dot>·</Dot>
					<TagList>
						{meta.tags.map(tag => (
							<Tag key={tag} label={tag} />
						))}
					</TagList>
				</>
			)}
		</MetaRow>
	);
}

const MetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${({ theme }) => theme.spacing[3]};
	margin-bottom: ${({ theme }) => theme.spacing[6]};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	color: ${({ theme }) => theme.colors.textMuted};
`;

const Dot = styled.span`
	color: ${({ theme }) => theme.colors.textDim};
`;

const TagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing[2]};
`;
