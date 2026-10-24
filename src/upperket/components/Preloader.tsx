import React, { useState, useEffect } from 'react';
import { preloadCriticalFrames } from '../utils/framePreloader';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    preloadCriticalFrames(
      (percent) => {
        setProgress(percent);
      },
      () => {
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 250);

        const hideTimer = setTimeout(() => {
          setIsHidden(true);
        }, 750);

        return () => {
          clearTimeout(timer);
          clearTimeout(hideTimer);
        };
      }
    );
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#F9F7F2] flex flex-col items-center justify-center p-6 transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Загрузка материалов книги-словаря"
    >
      <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Official Museum Brand Logo "Затёски" */}
        <img
          src="/museum-logo.svg"
          alt="Краеведческий мини-музей Затёски"
          className="h-8 sm:h-11 w-auto object-contain"
        />

        {/* Minimal Thin Line Progress Bar */}
        <div 
          className="w-48 sm:w-56 space-y-2 pt-2"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Прогресс загрузки книги"
        >
          <div className="w-full h-0.5 bg-[#1C1C1C]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1C1C1C] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[11px] font-sans text-[#1C1C1C]/50 tracking-wider tabular-nums">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
