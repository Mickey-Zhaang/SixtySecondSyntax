import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import styled from 'styled-components';

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (barRef.current) {
        gsap.to(barRef.current, {
          width: `${progress}%`,
          duration: 0.1,
          ease: 'none',
        });
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return <Bar ref={barRef} />;
}

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentHover}
  );
  z-index: 1000;
  transform-origin: left;
  pointer-events: none;
`;
