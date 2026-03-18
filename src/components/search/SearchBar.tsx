import styled from 'styled-components';

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { searchArticles } from '@/content/registry';
import type { Article } from '@/lib/types';

interface SearchBarProps {
	placeholder?: string;
}

export function SearchBar({ placeholder = 'Search articles...' }: SearchBarProps) {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Article[]>([]);
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		if (value.trim()) {
			setResults(searchArticles(value).slice(0, 8));
			setOpen(true);
		} else {
			setResults([]);
			setOpen(false);
		}
	};

	const handleSelect = (article: Article) => {
		setQuery('');
		setResults([]);
		setOpen(false);
		navigate(article.path);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			setOpen(false);
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handlePointerDown = (e: PointerEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('pointerdown', handlePointerDown);
		return () => document.removeEventListener('pointerdown', handlePointerDown);
	}, []);

	return (
		<Wrapper ref={wrapperRef}>
			<Icon>⌕</Icon>
			<Input
				type="search"
				value={query}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				aria-label="Search articles"
				aria-expanded={open}
				aria-autocomplete="list"
				role="combobox"
			/>
			<Dropdown $open={open && results.length > 0}>
				{results.map((article) => (
					<ResultItem key={article.path} onPointerDown={() => handleSelect(article)}>
						<ResultTitle>{article.meta.title}</ResultTitle>
						<ResultMeta>{article.segments.slice(0, -1).join(' / ')}</ResultMeta>
					</ResultItem>
				))}
			</Dropdown>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	width: 100%;
`;

const Input = styled.input`
	width: 100%;
	padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
	padding-left: ${({ theme }) => theme.spacing[10]};
	background: ${({ theme }) => theme.colors.bgCard};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.md};
	color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-family: ${({ theme }) => theme.fonts.body};
	transition: border-color ${({ theme }) => theme.transitions.fast};
	outline: none;

	&::placeholder {
		color: ${({ theme }) => theme.colors.textDim};
	}

	&:focus {
		border-color: ${({ theme }) => theme.colors.accent};
	}
`;

const Icon = styled.span`
	position: absolute;
	left: ${({ theme }) => theme.spacing[4]};
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.textDim};
	font-size: ${({ theme }) => theme.fontSizes.md};
	pointer-events: none;
	user-select: none;
`;

const Dropdown = styled.ul<{ $open: boolean }>`
	position: absolute;
	top: calc(100% + ${({ theme }) => theme.spacing[2]});
	left: 0;
	right: 0;
	background: ${({ theme }) => theme.colors.bgCard};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.md};
	box-shadow: ${({ theme }) => theme.shadows.md};
	list-style: none;
	margin: 0;
	padding: ${({ theme }) => theme.spacing[1]} 0;
	z-index: 200;
	overflow: hidden;
	opacity: ${({ $open }) => ($open ? 1 : 0)};
	pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
	transition: opacity ${({ theme }) => theme.transitions.fast};
`;

const ResultItem = styled.li`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[1]};
	padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
	cursor: pointer;
	transition: background ${({ theme }) => theme.transitions.fast};

	&:hover {
		background: ${({ theme }) => theme.colors.bgHover};
	}
`;

const ResultTitle = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.sm};
	color: ${({ theme }) => theme.colors.text};
`;

const ResultMeta = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.textMuted};
	font-family: ${({ theme }) => theme.fonts.mono};
	text-transform: lowercase;
`;
