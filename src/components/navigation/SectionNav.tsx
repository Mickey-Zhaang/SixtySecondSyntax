import { gsap } from 'gsap';
import styled from 'styled-components';

import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { labelify, sections } from '@/content/registry';

function SectionGroup({ sectionKey }: { sectionKey: string }) {
	const [open, setOpen] = useState(true);
	const listRef = useRef<HTMLUListElement>(null);
	const section = sections[sectionKey];

	const toggle = () => {
		const el = listRef.current;
		if (!el) return;

		if (open) {
			gsap.to(el, {
				height: 0,
				opacity: 0,
				duration: 0.25,
				ease: 'power2.inOut',
			});
		} else {
			gsap.fromTo(
				el,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration: 0.25, ease: 'power2.inOut' }
			);
		}
		setOpen(!open);
	};

	const hasSubsections = Object.keys(section.subsections).length > 0;
	const topLevelArticles = hasSubsections
		? section.articles.filter(a => !a.subsection)
		: section.articles;

	return (
		<SectionItem>
			<SectionToggle onClick={toggle}>
				{labelify(sectionKey)}
				<Chevron $open={open}>▶</Chevron>
			</SectionToggle>
			<ArticleList ref={listRef} $open={open}>
				{topLevelArticles.map(article => (
					<li key={article.slug}>
						<ArticleLink to={article.path}>{article.meta.title}</ArticleLink>
					</li>
				))}
				{Object.entries(section.subsections).map(([subKey, subArticles]) => (
					<li key={subKey}>
						<SubsectionLabel>{labelify(subKey)}</SubsectionLabel>
						<ul style={{ listStyle: 'none' }}>
							{subArticles.map(article => (
								<li key={article.slug}>
									<ArticleLink
										to={article.path}
										style={{ paddingLeft: '2.5rem' }}>
										{article.meta.title}
									</ArticleLink>
								</li>
							))}
						</ul>
					</li>
				))}
			</ArticleList>
		</SectionItem>
	);
}

export function SectionNav() {
	return (
		<NavWrapper>
			{Object.keys(sections).map(key => (
				<SectionGroup key={key} sectionKey={key} />
			))}
		</NavWrapper>
	);
}

const NavWrapper = styled.nav`
	padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const SectionItem = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SectionToggle = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.textMuted};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	cursor: pointer;
	border-radius: ${({ theme }) => theme.radii.sm};
	transition: all ${({ theme }) => theme.transitions.fast};
	text-align: left;

	&:hover {
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.bgHover};
	}
`;

const Chevron = styled.span<{ $open: boolean }>`
	font-size: 0.6rem;
	transition: transform ${({ theme }) => theme.transitions.fast};
	transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const ArticleList = styled.ul<{ $open: boolean }>`
	list-style: none;
	overflow: hidden;
	pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
`;

const SubsectionLabel = styled.div`
	padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.textDim};
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-top: ${({ theme }) => theme.spacing[2]};
`;

const ArticleLink = styled(NavLink)`
	display: block;
	padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
	padding-left: ${({ theme }) => theme.spacing[6]};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	color: ${({ theme }) => theme.colors.textMuted};
	text-decoration: none;
	border-radius: ${({ theme }) => theme.radii.sm};
	transition: all ${({ theme }) => theme.transitions.fast};
	border-left: 2px solid transparent;

	&:hover {
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.bgHover};
	}

	&.active {
		color: ${({ theme }) => theme.colors.accent};
		border-left-color: ${({ theme }) => theme.colors.accent};
		background: ${({ theme }) => theme.colors.bgCard};
	}
`;
