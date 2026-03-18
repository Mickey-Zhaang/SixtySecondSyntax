import { useRef, useState } from 'react';

import { gsap } from 'gsap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { contentRoot } from '@/content/registry';
import type { ContentNode } from '@/lib/types';

interface TreeNodeProps {
	node: ContentNode;
	depth: number;
}

function TreeNode({ node, depth }: TreeNodeProps) {
	const [open, setOpen] = useState(true);
	const childrenRef = useRef<HTMLDivElement>(null);

	const hasChildren =
		Object.keys(node.children).length > 0 || node.articles.length > 0;

	const toggle = () => {
		const el = childrenRef.current;
		if (!el) return;

		if (open) {
			gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.inOut' });
		} else {
			gsap.fromTo(
				el,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration: 0.2, ease: 'power2.inOut' }
			);
		}
		setOpen(!open);
	};

	const indent = `${0.75 + depth * 1.0}rem`;

	return (
		<NodeItem>
			<NodeHeader style={{ paddingLeft: indent }}>
				<NodeLabel to={node.path}>{node.label}</NodeLabel>
				{hasChildren && (
					<CollapseBtn onClick={toggle} aria-label={open ? 'Collapse' : 'Expand'}>
						<Chevron $open={open}>▶</Chevron>
					</CollapseBtn>
				)}
			</NodeHeader>

			{hasChildren && (
				<NodeChildren ref={childrenRef} $open={open}>
					{Object.values(node.children).map((child) => (
						<TreeNode key={child.slug} node={child} depth={depth + 1} />
					))}
					{node.articles.map((article) => (
						<ArticleLink
							key={article.path}
							to={article.path}
							style={{ paddingLeft: `${0.75 + (depth + 1) * 1.0}rem` }}>
							{article.meta.title}
						</ArticleLink>
					))}
				</NodeChildren>
			)}
		</NodeItem>
	);
}

export function SectionNav() {
	return (
		<NavWrapper>
			{Object.values(contentRoot.children).map((node) => (
				<TreeNode key={node.slug} node={node} depth={0} />
			))}
		</NavWrapper>
	);
}

const NavWrapper = styled.nav`
	padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const NodeItem = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const NodeHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: ${({ theme }) => theme.spacing[2]};
`;

const NodeLabel = styled(NavLink)`
	flex: 1;
	padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[2]};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.textMuted};
	text-decoration: none;
	text-transform: uppercase;
	letter-spacing: 0.07em;
	border-radius: ${({ theme }) => theme.radii.sm};
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.bgHover};
	}

	&.active {
		color: ${({ theme }) => theme.colors.accent};
	}
`;

const CollapseBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	flex-shrink: 0;
	border-radius: ${({ theme }) => theme.radii.sm};
	transition: background ${({ theme }) => theme.transitions.fast};

	&:hover {
		background: ${({ theme }) => theme.colors.bgHover};
	}
`;

const Chevron = styled.span<{ $open: boolean }>`
	font-size: 0.55rem;
	color: ${({ theme }) => theme.colors.textDim};
	transition: transform ${({ theme }) => theme.transitions.fast};
	transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const NodeChildren = styled.div<{ $open: boolean }>`
	overflow: hidden;
	pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
`;

const ArticleLink = styled(NavLink)`
	display: block;
	padding: 0.375rem ${({ theme }) => theme.spacing[2]};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: 400;
	color: ${({ theme }) => theme.colors.textMuted};
	text-decoration: none;
	border-radius: ${({ theme }) => theme.radii.sm};
	border-left: 2px solid transparent;
	transition: all ${({ theme }) => theme.transitions.fast};

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
