import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

import ReactMarkdown from 'react-markdown';

import { ReadingProgress } from '@/components/common/ReadingProgress';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { calculateReadingTime } from '@/lib/articles';
import type { ArticleMeta } from '@/lib/types';

import { ArticleMeta as ArticleMetaComponent } from './ArticleMeta';
import { CodeBlock } from './CodeBlock';

interface ArticleTemplateProps {
	meta: ArticleMeta;
	markdown: string;
}

export function ArticleTemplate({ meta, markdown }: ArticleTemplateProps) {
	const readingTime = calculateReadingTime(markdown);

	return (
		<>
			<ReadingProgress />
			<Article>
				<BreadcrumbWrapper>
					<Breadcrumbs />
				</BreadcrumbWrapper>
				<Title>{meta.title}</Title>
				<ArticleMetaComponent meta={meta} readingTime={readingTime} />
				<Divider />
				<Prose>
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[[rehypeHighlight, { languages: { bash, css, javascript, json, python, sql, typescript, xml } }]]}
						components={{
							pre({ children }) {
								// Extract className from the code child
								const codeChild = Array.isArray(children)
									? children[0]
									: children;
								const className =
									codeChild &&
									typeof codeChild === 'object' &&
									'props' in codeChild
										? (codeChild as React.ReactElement<{ className?: string }>)
												.props.className
										: undefined;
								return (
									<CodeBlock className={className}>
										{codeChild &&
										typeof codeChild === 'object' &&
										'props' in codeChild
											? (
													codeChild as React.ReactElement<{
														children?: React.ReactNode;
													}>
												).props.children
											: children}
									</CodeBlock>
								);
							},
							code({ children, className, ...props }) {
								// Inline code (no className means it's not inside a pre)
								const isBlock = Boolean(className);
								if (isBlock)
									return (
										<code className={className} {...props}>
											{children}
										</code>
									);
								return <code {...props}>{children}</code>;
							},
						}}>
						{markdown}
					</ReactMarkdown>
				</Prose>
			</Article>
		</>
	);
}

const Article = styled.article`
	padding: ${({ theme }) => theme.spacing[8]} 0;
`;

const Title = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes['3xl']};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.2;
	margin-bottom: ${({ theme }) => theme.spacing[4]};

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: ${({ theme }) => theme.fontSizes['4xl']};
	}
`;

const Prose = styled.div`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.8;
	font-size: ${({ theme }) => theme.fontSizes.lg};

	h2 {
		font-size: ${({ theme }) => theme.fontSizes['2xl']};
		font-weight: 600;
		margin: ${({ theme }) => theme.spacing[8]} 0
			${({ theme }) => theme.spacing[4]};
		color: ${({ theme }) => theme.colors.text};
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		padding-bottom: ${({ theme }) => theme.spacing[2]};
	}

	h3 {
		font-size: ${({ theme }) => theme.fontSizes.xl};
		font-weight: 600;
		margin: ${({ theme }) => theme.spacing[6]} 0
			${({ theme }) => theme.spacing[3]};
		color: ${({ theme }) => theme.colors.text};
	}

	p {
		margin-bottom: ${({ theme }) => theme.spacing[4]};
	}

	strong {
		color: ${({ theme }) => theme.colors.text};
		font-weight: 600;
	}

	em {
		color: ${({ theme }) => theme.colors.textMuted};
	}

	code {
		font-family: ${({ theme }) => theme.fonts.mono};
		font-size: 0.875em;
		background: ${({ theme }) => theme.colors.codeBg};
		color: ${({ theme }) => theme.colors.code};
		padding: 2px 6px;
		border-radius: ${({ theme }) => theme.radii.sm};
		border: 1px solid ${({ theme }) => theme.colors.border};
	}

	ul,
	ol {
		padding-left: ${({ theme }) => theme.spacing[6]};
		margin-bottom: ${({ theme }) => theme.spacing[4]};
	}

	li {
		margin-bottom: ${({ theme }) => theme.spacing[2]};
	}

	blockquote {
		border-left: 3px solid ${({ theme }) => theme.colors.accent};
		padding-left: ${({ theme }) => theme.spacing[4]};
		margin: ${({ theme }) => theme.spacing[6]} 0;
		color: ${({ theme }) => theme.colors.textMuted};
		font-style: italic;
	}

	a {
		color: ${({ theme }) => theme.colors.accent};
		text-decoration: underline;
		text-underline-offset: 3px;

		&:hover {
			color: ${({ theme }) => theme.colors.accentHover};
		}
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: ${({ theme }) => theme.spacing[6]} 0;
		font-size: ${({ theme }) => theme.fontSizes.sm};
		font-family: ${({ theme }) => theme.fonts.mono};
	}

	th {
		background: ${({ theme }) => theme.colors.bgCard};
		padding: ${({ theme }) => theme.spacing[2]}
			${({ theme }) => theme.spacing[4]};
		text-align: left;
		border: 1px solid ${({ theme }) => theme.colors.border};
		color: ${({ theme }) => theme.colors.textMuted};
		font-weight: 600;
	}

	td {
		padding: ${({ theme }) => theme.spacing[2]}
			${({ theme }) => theme.spacing[4]};
		border: 1px solid ${({ theme }) => theme.colors.border};
	}

	tr:nth-child(even) td {
		background: ${({ theme }) => theme.colors.bgAlt};
	}

	input[type='checkbox'] {
		margin-right: ${({ theme }) => theme.spacing[2]};
	}

	hr {
		border: none;
		border-top: 1px solid ${({ theme }) => theme.colors.border};
		margin: ${({ theme }) => theme.spacing[8]} 0;
	}
`;

const Divider = styled.hr`
	border: none;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
	margin: ${({ theme }) => theme.spacing[6]} 0;
`;

const BreadcrumbWrapper = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
