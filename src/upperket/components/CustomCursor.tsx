import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text'>('default');

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isVisibleRef = useRef<boolean>(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable custom cursor on mobile / touch devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch || !enabled) {
      document.documentElement.classList.remove('custom-cursor-enabled');
      return;
    }

    document.documentElement.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        setIsVisible(true);
        isVisibleRef.current = true;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput = target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]');
      const isInteractive = target.closest(
        'button, a, select, [role="button"], summary, [data-tooltip], .group, .m3-interactive-button'
      );

      if (isInput) {
        setCursorState('text');
      } else if (isInteractive) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isVisibleRef.current = false;
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
      isVisibleRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [enabled]);

  if (!isVisible || !enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2147483647] overflow-hidden" aria-hidden="true">
      {/* Custom SVG Arrow Cursor Container */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        {/* State 1: Sharp Triangular Wedge Pointer without stem/tail */}
        {cursorState === 'default' && (
          <div className="-translate-x-0.5 -translate-y-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              {/* Sharp 3-corner triangular arrow wedge */}
              <path
                d="M2 2L20 9.5L9.5 20Z"
                fill="#1C1C1C"
                stroke="#F9F7F2"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* State 2: Interactive Hover Pointer Wedge */}
        {cursorState === 'pointer' && (
          <div className="-translate-x-0.5 -translate-y-0.5 scale-110">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5.5 h-5.5"
            >
              {/* Active hover triangular wedge with warm leather fill accent */}
              <path
                d="M2 2L20 9.5L9.5 20Z"
                fill="#8A5A36"
                stroke="#F9F7F2"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* State 3: Text Caret State */}
        {cursorState === 'text' && (
          <div className="-translate-x-1/2 -translate-y-1/2">
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.5H8.5M5 1.5V16.5M1.5 16.5H8.5"
                stroke="#1C1C1C"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
