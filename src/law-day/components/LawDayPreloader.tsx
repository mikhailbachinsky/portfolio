import React, { useState, useEffect } from 'react';

interface LawDayPreloaderProps {
  onComplete?: () => void;
}

export const LawDayPreloader: React.FC<LawDayPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const minDuration = 850; // Snappy, elegant luxury preloader duration

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    let current = 0;
    const interval = setInterval(() => {
      // Random gentle increments
      current = Math.min(current + Math.floor(Math.random() * 12) + 8, 96);
      setProgress(current);
    }, 40);

    fontPromise.then(() => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);

        // Pause briefly at 100% before smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          document.body.style.overflow = '';
          onComplete?.();

          // Unmount from DOM after transition finishes
          setTimeout(() => {
            setIsUnmounted(true);
          }, 550);
        }, 120);
      }, remainingTime);
    });

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isUnmounted) return null;

  return (
    <div
      id="law-day-preloader"
      aria-hidden={isFadingOut}
      className={`fixed inset-0 z-[120] bg-[#010e0d] flex flex-col items-center justify-center transition-all duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-[0.99] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Delicate radial ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(1, 20, 18, 0.05) 55%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Minimalist Emblem / Avatar */}
        <div className="relative mb-5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-silver/50 overflow-hidden shadow-[0_0_24px_rgba(215,235,238,0.22)] bg-[#021817] p-0.5 relative">
            <img 
              src="/assets/vk_avatar.webp" 
              alt="LSA Emblem" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Subtle spinning ring around avatar */}
          <div 
            className="absolute -inset-1.5 rounded-full border border-silver/20 pointer-events-none animate-spin"
            style={{ animationDuration: '8s' }}
          />
        </div>

        {/* Minimalist Typography */}
        <div className="space-y-1 mb-6">
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white font-medium">
            Law Student Awards
          </div>
          <div className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-silver-bright/60">
            День юриста 2024
          </div>
        </div>

        {/* Ultra-thin Silver Progress Line */}
        <div className="w-40 sm:w-48 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-silver-bright via-white to-silver transition-all duration-150 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.65)' 
            }}
          />
        </div>

        {/* Minimalist Numeric Counter */}
        <div className="mt-3 text-[10px] font-mono text-white/40 tracking-widest tabular-nums">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
};
