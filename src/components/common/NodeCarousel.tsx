import { gsap } from 'gsap';
import styled from 'styled-components';

import { useEffect, useRef, useState } from 'react';

interface NodeCarouselProps {
	title: string;
	children: React.ReactNode;
}

export function NodeCarousel({ title, children }: NodeCarouselProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	const STEP = 276; // ~card width (260px) + gap (16px)

	const updateButtons = () => {
		const el = viewportRef.current;
		if (!el) return;
		setCanPrev(el.scrollLeft > 4);
		setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
	};

	useEffect(() => {
		const id = setTimeout(updateButtons, 50);
		const el = viewportRef.current;
		el?.addEventListener('scroll', updateButtons, { passive: true });
		window.addEventListener('resize', updateButtons);
		return () => {
			clearTimeout(id);
			el?.removeEventListener('scroll', updateButtons);
			window.removeEventListener('resize', updateButtons);
		};
	}, [children]);

	const scroll = (dir: 1 | -1) => {
		const el = viewportRef.current;
		if (!el) return;
		const target = Math.max(
			0,
			Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + dir * STEP)
		);
		gsap.to(el, { scrollLeft: target, duration: 0.35, ease: 'power2.out' });
	};

	const showControls = canPrev || canNext;

	return (
		<Wrapper>
			<Header>
				<Title>{title}</Title>
				{showControls && (
					<Controls>
						<ArrowBtn
							onClick={() => scroll(-1)}
							disabled={!canPrev}
							aria-label="Scroll left">
							‹
						</ArrowBtn>
						<ArrowBtn
							onClick={() => scroll(1)}
							disabled={!canNext}
							aria-label="Scroll right">
							›
						</ArrowBtn>
					</Controls>
				)}
			</Header>
			<Viewport ref={viewportRef}>
				<Track>{children}</Track>
			</Viewport>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: ${({ theme }) => theme.spacing[5]};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	padding-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Title = styled.h2`
	font-size: ${({ theme }) => theme.fontSizes['2xl']};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
`;

const Controls = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[2]};
`;

const ArrowBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background: ${({ theme }) => theme.colors.bgCard};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.sm};
	color: ${({ theme }) => theme.colors.textMuted};
	font-size: 1.25rem;
	line-height: 1;
	cursor: pointer;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:disabled {
		opacity: 0.25;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		color: ${({ theme }) => theme.colors.text};
		border-color: ${({ theme }) => theme.colors.accent};
		background: ${({ theme }) => theme.colors.bgHover};
	}
`;

const Viewport = styled.div`
	overflow-x: auto;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Track = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[4]};
	margin-top: ${({ theme }) => theme.spacing[1]};

	& > * {
		flex-shrink: 0;
	}
`;
