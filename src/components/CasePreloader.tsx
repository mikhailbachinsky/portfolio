import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CasePreloaderProps {
  onComplete: () => void;
}

export const CasePreloader: React.FC<CasePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFlightStarted, setIsFlightStarted] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(1);
  const [flightTransform, setFlightTransform] = useState<string>('none');

  const logoWrapRef = useRef<HTMLDivElement>(null);

  const startLogoFlight = useCallback(() => {
    const headerLogo = document.getElementById('header-main-logo-img');
    const logoWrap = logoWrapRef.current;

    if (!headerLogo || !logoWrap) {
      setBackdropOpacity(0);
      onComplete();
      setTimeout(() => setIsDone(true), 500);
      return;
    }

    // Скрываем оригинальный логотип в хедере на время полета
    headerLogo.style.opacity = '0';

    // Вычисляем координаты для плавного полета точно от центра прелоадера к центру логотипа в хедере
    const pRect = logoWrap.getBoundingClientRect();
    const hRect = headerLogo.getBoundingClientRect();

    const scale = (hRect.height || 36) / (pRect.height || 52);
    const deltaX = (hRect.left + hRect.width / 2) - (pRect.left + pRect.width / 2);
    const deltaY = (hRect.top + hRect.height / 2) - (pRect.top + pRect.height / 2);

    setIsFlightStarted(true);

    // Растворяем фон прелоадера
    setBackdropOpacity(0);

    // В следующем кадре запускаем анимацию полета логотипа по вычисленной траектории
    requestAnimationFrame(() => {
      setFlightTransform(`translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`);
    });

    // В середине полета оповещаем систему о старте раскрытия главного экрана
    setTimeout(() => {
      onComplete();
    }, 380);

    // При приземлении (750мс) активируем логотип в хедере и демонтируем прелоадер
    setTimeout(() => {
      headerLogo.style.opacity = '1';
      headerLogo.style.transition = 'opacity 0.25s ease';
      setIsDone(true);
    }, 780);
  }, [onComplete]);

  useEffect(() => {
    const startTime = performance.now();
    const minDuration = 1100; // Минимальная комфортная длительность анимации заполнения

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress = Math.min(currentProgress + Math.floor(Math.random() * 8) + 6, 94);
      setProgress(currentProgress);
    }, 45);

    fontPromise.then(() => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);

        // Пауза при 100% перед взлетом логотипа
        setTimeout(() => {
          startLogoFlight();
        }, 160);
      }, remainingTime);
    });

    return () => clearInterval(interval);
  }, [startLogoFlight]);

  if (isDone) return null;

  return (
    <div
      id="case-preloader"
      aria-hidden={isFlightStarted}
      className="fixed inset-0 z-[120] pointer-events-none"
    >
      {/* Мягкий фон прелоадера, растворяющийся во время полета логотипа */}
      <div
        className="absolute inset-0 bg-[#FAF8F5] transition-opacity duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ opacity: backdropOpacity }}
      />

      {/* Центральный слой с летающим логотипом */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Контейнер летающего логотипа */}
        <div
          ref={logoWrapRef}
          className="relative w-[180px] sm:w-[220px] h-[48px] sm:h-[56px] select-none will-change-transform z-10"
          style={{
            transform: flightTransform,
            transition: isFlightStarted ? 'transform 0.75s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
            transformOrigin: 'center center',
          }}
        >
          {/* Полупрозрачный базовый силуэт логотипа */}
          <img
            src="/assets/header-logo.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-contain opacity-15"
          />

          {/* Заполняющийся по мере прогресса слой */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden transition-[clip-path] duration-150 ease-out"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          >
            <img
              src="/assets/header-logo.svg"
              alt="Тьюторская служба ТГУ"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Тонкий минималистичный прогресс под логотипом (мягко скрывается при взлете) */}
        <div
          className={`flex items-center gap-3 mt-4 transition-all duration-250 ${
            isFlightStarted ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="w-16 sm:w-20 h-[1.5px] bg-[#181818]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#181818] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="font-mono text-[11px] sm:text-xs text-[#181818]/45 tabular-nums select-none">
            {progress}%
          </span>
        </div>

      </div>
    </div>
  );
};
