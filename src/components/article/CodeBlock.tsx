import styled from 'styled-components';

import { useState } from 'react';

interface CodeBlockProps {
	children?: React.ReactNode;
	className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const lang =
		className
			?.split(' ')
			.find(c => c.startsWith('language-'))
			?.replace('language-', '') ?? '';

	const getTextContent = (node: React.ReactNode): string => {
		if (typeof node === 'string') return node;
		if (typeof node === 'number') return String(node);
		if (Array.isArray(node)) return node.map(getTextContent).join('');
		if (node && typeof node === 'object' && 'props' in node) {
			return getTextContent(
				(node as React.ReactElement<{ children?: React.ReactNode }>).props
					.children
			);
		}
		return '';
	};

	const handleCopy = async () => {
		const text = getTextContent(children);
		await navigator.clipboard.writeText(text.trim());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Wrapper>
			{lang && <LangLabel>{lang}</LangLabel>}
			<CopyButton $copied={copied} onClick={handleCopy}>
				{copied ? 'copied!' : 'copy'}
			</CopyButton>
			<pre className={className}>
				<code className={className}>{children}</code>
			</pre>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	margin: ${({ theme }) => theme.spacing[6]} 0;

	pre {
		margin: 0;
		padding: ${({ theme }) => theme.spacing[5]}
			${({ theme }) => theme.spacing[3]};
		padding-top: ${({ theme }) => theme.spacing[10]};
		border-radius: ${({ theme }) => theme.radii.md};
		border: 1px solid ${({ theme }) => theme.colors.border};
		background: ${({ theme }) => theme.colors.codeBg} !important;
		overflow-x: auto;
		font-size: ${({ theme }) => theme.fontSizes.sm};
		line-height: 1.7;
	}

	code {
		background: ${({ theme }) => theme.colors.codeInline} !important;
		padding: 2 !important;
		font-family: ${({ theme }) => theme.fonts.mono};
	}
`;

const LangLabel = styled.span`
	position: absolute;
	top: ${({ theme }) => theme.spacing[2]};
	left: ${({ theme }) => theme.spacing[4]};
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-family: ${({ theme }) => theme.fonts.mono};
	color: ${({ theme }) => theme.colors.textDim};
	text-transform: uppercase;
	letter-spacing: 0.08em;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
	position: absolute;
	top: ${({ theme }) => theme.spacing[2]};
	right: ${({ theme }) => theme.spacing[3]};
	padding: 3px 10px;
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-family: ${({ theme }) => theme.fonts.mono};
	border-radius: ${({ theme }) => theme.radii.sm};
	border: 1px solid
		${({ theme, $copied }) =>
			$copied ? theme.colors.success : theme.colors.border};
	background: ${({ theme }) => theme.colors.bgCard};
	color: ${({ theme, $copied }) =>
		$copied ? theme.colors.success : theme.colors.textMuted};
	cursor: pointer;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		border-color: ${({ theme }) => theme.colors.borderHover};
		color: ${({ theme }) => theme.colors.text};
	}
`;
