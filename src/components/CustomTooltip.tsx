import React, { useEffect, useState, useRef } from 'react';

interface TooltipState {
  text: string;
  x: number;
  y: number;
  placement: 'top' | 'bottom';
  visible: boolean;
}

export const CustomTooltip: React.FC = () => {
  const [state, setState] = useState<TooltipState>({
    text: '',
    x: 0,
    y: 0,
    placement: 'bottom',
    visible: false,
  });

  const timerRef = useRef<number | null>(null);
  const activeElRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const hideTooltip = () => {
      clearTimer();
      activeElRef.current = null;
      setState((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    };

    const scheduleTooltipShow = (target: HTMLElement, clientX: number, clientY: number) => {
      clearTimer();

      // Long dwell delay (900ms) - tooltip will ONLY appear if the user rests their cursor still
      timerRef.current = window.setTimeout(() => {
        if (!activeElRef.current || activeElRef.current !== target) return;

        let text = target.getAttribute('data-tooltip');
        const title = target.getAttribute('title');

        if (title) {
          text = title;
          target.setAttribute('data-tooltip', title);
          target.removeAttribute('title'); // Prevent native browser tooltip conflict
        }

        if (!text || !text.trim()) return;

        const rect = target.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const placement = spaceBelow < 45 && rect.top > 45 ? 'top' : 'bottom';

        const y = placement === 'bottom' ? rect.bottom + 8 : rect.top - 8;
        const x = rect.left + rect.width / 2;

        setState({
          text,
          x,
          y,
          placement,
          visible: true,
        });
      }, 900);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-tooltip], [title]') as HTMLElement | null;
      if (!target) {
        if (activeElRef.current) hideTooltip();
        return;
      }

      if (activeElRef.current !== target) {
        hideTooltip();
        activeElRef.current = target;
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        scheduleTooltipShow(target, e.clientX, e.clientY);
      }
    };

    let pointerMoveRaf: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (!activeElRef.current) return;
      if (pointerMoveRaf !== null) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      pointerMoveRaf = requestAnimationFrame(() => {
        pointerMoveRaf = null;
        if (!activeElRef.current) return;

        const dist = Math.hypot(clientX - lastPosRef.current.x, clientY - lastPosRef.current.y);

        // If mouse is moving actively (more than 4px), hide tooltip and restart stationary dwell timer
        if (dist > 4) {
          lastPosRef.current = { x: clientX, y: clientY };

          if (state.visible) {
            setState((prev) => ({ ...prev, visible: false }));
          }

          scheduleTooltipShow(activeElRef.current, clientX, clientY);
        }
      });
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-tooltip], [title]') as HTMLElement | null;
      if (target && target === activeElRef.current) {
        hideTooltip();
      }
    };

    const handlePointerDown = () => {
      hideTooltip();
    };

    const handleScroll = () => {
      hideTooltip();
    };

    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      clearTimer();
    };
  }, [state.visible]);

  if (!state.visible || !state.text) return null;

  const tooltipWidth = tooltipRef.current?.offsetWidth || 120;
  const clampedX = Math.max(
    16 + tooltipWidth / 2,
    Math.min(window.innerWidth - 16 - tooltipWidth / 2, state.x)
  );

  return (
    <div
      ref={tooltipRef}
      aria-hidden="true"
      style={{
        left: `${clampedX}px`,
        top: `${state.y}px`,
        transform: `translate(-50%, ${state.placement === 'bottom' ? '0' : '-100%'})`,
      }}
      className="fixed z-[99999] pointer-events-none select-none transition-opacity duration-200 ease-out opacity-100 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="bg-[#181818] text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-white/15 shadow-xl shadow-black/25 flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8FE06E] shrink-0" />
        <span className="tracking-tight">{state.text}</span>
      </div>
    </div>
  );
};
