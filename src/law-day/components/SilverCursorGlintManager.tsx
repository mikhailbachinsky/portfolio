import React, { useEffect, useRef } from 'react';

/**
 * SilverCursorGlintManager
 * 
 * Provides real-time cursor coordinate tracking and velocity-aware specular light calculation
 * to simulate authentic 925 sterling silver reflections along all site contours and borders.
 */
export const SilverCursorGlintManager: React.FC = () => {
  const lastPosRef = useRef<{ x: number; y: number; time: number }>({ x: -9999, y: -9999, time: 0 });
  const rafIdRef = useRef<number | null>(null);
  const targetPosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    // Skip cursor glint tracking on touch-only / coarse pointer devices
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    const root = document.documentElement;

    const updateGlint = () => {
      const { x, y, active } = targetPosRef.current;

      if (!active) {
        root.style.setProperty('--cursor-x', '-9999px');
        root.style.setProperty('--cursor-y', '-9999px');
        root.style.setProperty('--cursor-intensity', '0');
        root.style.setProperty('--silver-glint-radius', '260px');
        rafIdRef.current = null;
        return;
      }

      // Calculate cursor velocity to modulate glint radius and intensity
      const now = performance.now();
      const prev = lastPosRef.current;
      const dt = Math.max(1, now - prev.time);
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.min(1.5, dist / dt); // pixels per ms capped

      // Radius scales dynamically with movement (260px resting up to 360px during swift sweeps)
      const dynamicRadius = Math.round(260 + speed * 60);

      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
      root.style.setProperty('--cursor-intensity', (0.85 + Math.min(0.3, speed * 0.2)).toFixed(2));
      root.style.setProperty('--silver-glint-radius', `${dynamicRadius}px`);

      lastPosRef.current = { x, y, time: now };
      rafIdRef.current = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetPosRef.current = {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        active: true,
      };

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateGlint);
      }
    };

    const handlePointerLeave = () => {
      targetPosRef.current.active = false;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateGlint);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        targetPosRef.current = {
          x: Math.round(e.touches[0].clientX),
          y: Math.round(e.touches[0].clientY),
          active: true,
        };
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(updateGlint);
        }
      }
    };

    const handleTouchEnd = () => {
      targetPosRef.current.active = false;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateGlint);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return null;
};
