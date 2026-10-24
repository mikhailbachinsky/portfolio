import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * 
 * Luxury 925 Sterling Silver Faceted Crystal Pointer
 * 
 * Features:
 * - Bespoke 3D faceted jewelry arrow pointer with polished silver & platinum reflections.
 * - Zero-latency tip positioning for exact, natural desktop interaction.
 * - Subtle ambient emerald refraction glow and trailing silver micro-sparkle.
 * - Interactive hover states: slight elevation, diamond starburst glint at the tip, and emerald aura.
 * - Tactile click depression animation.
 * - Graceful fallback & auto-disabled on touch-only devices.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  // Position state with lerp for smooth aura
  const mousePos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isLoopActive = useRef<boolean>(false);

  useEffect(() => {
    // Check if device is touch-only
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
        setIsTouch(true);
        return true;
      }
      setIsTouch(false);
      return false;
    };

    if (checkTouch()) return;

    // Smooth animation loop for ambient glow, automatically pauses when mouse is stationary
    const renderGlow = () => {
      const lerpFactor = 0.18;
      const dx = mousePos.current.x - glowPos.current.x;
      const dy = mousePos.current.y - glowPos.current.y;
      
      glowPos.current.x += dx * lerpFactor;
      glowPos.current.y += dy * lerpFactor;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // If glow has caught up (distance < 0.2px), stop the RAF loop to save 100% CPU
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        rafRef.current = requestAnimationFrame(renderGlow);
      } else {
        isLoopActive.current = false;
        rafRef.current = null;
      }
    };

    const startGlowLoop = () => {
      if (!isLoopActive.current) {
        isLoopActive.current = true;
        rafRef.current = requestAnimationFrame(renderGlow);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      // INSTANT 0-latency physical hardware pointer tracking
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      setIsVisible((prev) => (prev ? prev : true));
      startGlowLoop();
    };

    // Event-driven hover detection: ONLY executes when crossing element boundaries, NOT on every pixel!
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-hover], table tbody tr');
      if (interactive !== isHoveredRef.current) {
        isHoveredRef.current = interactive;
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      isHoveredRef.current = false;
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Lagging Soft Emerald-Silver Halo Atmosphere (Proportionately scaled) */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform rounded-full transition-all duration-300 ${
          isHovered
            ? 'w-8 h-8 bg-gradient-to-r from-emerald-400/25 via-cyan-300/20 to-white/15 blur-[6px] scale-125'
            : isClicked
            ? 'w-4 h-4 bg-white/25 blur-[3px] scale-90'
            : 'w-5 h-5 bg-gradient-to-r from-emerald-500/15 to-silver/15 blur-[4px]'
        }`}
      />

      {/* Main 925 Sterling Silver Faceted Arrow Pointer (Compact ~2x smaller) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
      >
        <div
          className={`relative origin-top-left transition-transform duration-150 ease-out ${
            isClicked
              ? 'scale-90 rotate-[-3deg]'
              : isHovered
              ? 'scale-110 rotate-[2deg]'
              : 'scale-100 rotate-0'
          }`}
        >
          {/* Faceted Vector Silver Arrow: Compact 14x17px */}
          <svg
            width="14"
            height="17"
            viewBox="0 0 26 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] drop-shadow-[0_0_6px_rgba(200,245,255,0.4)]"
          >
            <defs>
              {/* Left Highlight Facet */}
              <linearGradient id="silverLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F0FAFB" />
                <stop offset="100%" stopColor="#BCE3E7" />
              </linearGradient>

              {/* Right Shaded Sterling Facet */}
              <linearGradient id="silverRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2F5F7" />
                <stop offset="50%" stopColor="#7EABB0" />
                <stop offset="100%" stopColor="#31585C" />
              </linearGradient>

              {/* Bottom Inset Facet */}
              <linearGradient id="silverBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3E41" />
                <stop offset="100%" stopColor="#0B2022" />
              </linearGradient>

              {/* Precision Outer Metallic Border */}
              <linearGradient id="silverStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#9BD1D7" />
                <stop offset="100%" stopColor="#1C474B" />
              </linearGradient>
            </defs>

            {/* Left Beveled Facet */}
            <path
              d="M 1 1 L 1 24.5 L 6.5 19 L 10.5 19 Z"
              fill="url(#silverLeft)"
            />

            {/* Right Beveled Facet */}
            <path
              d="M 1 1 L 10.5 19 L 19 19 Z"
              fill="url(#silverRight)"
            />

            {/* Bottom Tail Diamond Bevel */}
            <path
              d="M 6.5 19 L 12 29.5 L 15.5 28 L 10.5 19 Z"
              fill="url(#silverBottom)"
            />
            <path
              d="M 6.5 19 L 10.5 19 L 12 29.5 Z"
              fill="url(#silverRight)"
            />

            {/* Facet Center Ridge Line for High Jeweled Precision */}
            <line
              x1="1"
              y1="1"
              x2="10.5"
              y2="19"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Outer Silhouette Outline */}
            <path
              d="M 1 1 L 1 24.5 L 6.5 19 L 11.5 29.5 L 15.5 27.5 L 10.5 17.5 L 19 17.5 Z"
              stroke="url(#silverStroke)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* Dynamic 4-Point Diamond Glint Sparkle at Tip during Hover */}
          <div
            className={`absolute -top-1 -left-1 pointer-events-none transition-all duration-300 ${
              isHovered ? 'opacity-100 scale-100 rotate-45' : 'opacity-0 scale-50 rotate-0'
            }`}
          >
            <div className="relative w-3 h-3 flex items-center justify-center">
              <span className="absolute w-2.5 h-[1px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
              <span className="absolute h-2.5 w-[1px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
              <span className="absolute w-1 h-1 rounded-full bg-emerald-300 shadow-[0_0_6px_#10b981]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
