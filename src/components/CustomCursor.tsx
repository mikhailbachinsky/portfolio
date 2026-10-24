import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    let requestID: number | null = null;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isLoopRunning = false;

    // Smooth physics interpolation for magnetic trailing ring
    const renderLoop = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.24;
      ringY += dy * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // If ring is sufficiently close to mouse, stop running loop to conserve CPU/GPU
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        isLoopRunning = false;
        requestID = null;
        return;
      }

      requestID = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        requestID = requestAnimationFrame(renderLoop);
      }
    };

    let checkPointerTimer: number | null = null;

    const handlePointerUpdate = (clientX: number, clientY: number, target?: EventTarget | null) => {
      mouseX = clientX;
      mouseY = clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        setIsVisible(true);
      }

      startLoop();

      // Debounce clickable target inspection to avoid layout thrashing on fast mousemove
      if (target && checkPointerTimer === null) {
        checkPointerTimer = window.setTimeout(() => {
          checkPointerTimer = null;
          const el = target as HTMLElement | null;
          if (el) {
            const isClickable = Boolean(
              el.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')
            );
            if (isClickable !== isPointerRef.current) {
              isPointerRef.current = isClickable;
              setIsPointer(isClickable);
            }
          }
        }, 32);
      }
    };

    const onMove = (e: MouseEvent | PointerEvent) => {
      handlePointerUpdate(e.clientX, e.clientY, e.target);
    };

    const onCustomUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      if (detail && typeof detail.x === 'number' && typeof detail.y === 'number') {
        handlePointerUpdate(detail.x, detail.y, null);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      if (requestID) {
        cancelAnimationFrame(requestID);
        requestID = null;
        isLoopRunning = false;
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
      startLoop();
    };

    // Слушаем как стандартные mousemove, так и глобальные pointermove на фазе перехвата (capture),
    // чтобы отслеживать движение мыши даже при setPointerCapture на перетаскиваемых элементах
    window.addEventListener('pointermove', onMove, { capture: true, passive: true });
    window.addEventListener('mousemove', onMove, { capture: true, passive: true });
    window.addEventListener('customcursor:update', onCustomUpdate as EventListener);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('pointermove', onMove, { capture: true });
      window.removeEventListener('mousemove', onMove, { capture: true });
      window.removeEventListener('customcursor:update', onCustomUpdate as EventListener);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestID) {
        cancelAnimationFrame(requestID);
      }
      if (checkPointerTimer) {
        clearTimeout(checkPointerTimer);
      }
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Outer translation wrapper for smooth magnetic trailing ring (no transition conflict) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full border transition-all duration-200 ease-out ${
            isPointer
              ? 'w-10 h-10 border-[#8FE06E] bg-[#8FE06E]/15 scale-110'
              : 'w-7 h-7 border-[#181818]/30 bg-[#181818]/5 scale-100'
          }`}
        />
      </div>

      {/* Crisp central precision dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-150 ease-out ${
            isPointer
              ? 'w-2.5 h-2.5 bg-[#181818] ring-2 ring-[#8FE06E]'
              : 'w-2 h-2 bg-[#181818] ring-1 ring-white'
          }`}
        />
      </div>
    </div>
  );
};
