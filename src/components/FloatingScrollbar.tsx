import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * FloatingSideScrollbar:
 * 1. Интерактивный drag-and-drop: можно взять ползунок курсором (mousedown/touchstart)
 *    и плавно тянуть вверх/вниз в реальном времени.
 * 2. Клик по направляющей дорожке также мгновенно скроллит страницу в указанную точку.
 * 3. Ползунок расположен ровно по центру пустого пространства между карточками и правым краем окна.
 * 4. Начинает движение от самого верха второй секции (#goals-section).
 * 5. Окрашен в персиковый цвет (#FFAD85 / #F29C72) с увеличением зоны захвата для комфортного клика.
 */
export const FloatingScrollbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [trackTop, setTrackTop] = useState(24);
  const [trackHeight, setTrackHeight] = useState(200);
  const [rightOffsetPx, setRightOffsetPx] = useState(10);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef<number>(0);
  const dragStartThumbYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const thumbYRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);
  const metricsRef = useRef({
    goalsTop: 800,
    availableHeight: 200,
    scrollableDistance: 2000,
  });

  const THUMB_HEIGHT = 38;

  // Функция пересчета базовых геометрических метрик (только при resize или смене размеров)
  const refreshLayoutMetrics = useCallback(() => {
    const heroEl = document.getElementById('hero-section');
    const goalsEl = document.getElementById('goals-section');
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;

    if (!heroEl) return;

    let rightOffset = winWidth >= 1024 ? 10 : winWidth >= 640 ? 8 : 6;
    const sampleCard = document.querySelector('.hero-card-brand') || document.querySelector('#goals-section > div') || goalsEl;
    if (sampleCard) {
      const rect = sampleCard.getBoundingClientRect();
      const distFromRight = winWidth - rect.right;
      if (distFromRight > 4 && distFromRight < winWidth / 3) {
        rightOffset = Math.max(Math.round(distFromRight / 2), 4);
      }
    }
    setRightOffsetPx(rightOffset);

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const goalsTop = goalsEl
      ? goalsEl.getBoundingClientRect().top + scrollTop
      : heroEl.offsetHeight;

    const topOffset = 24;
    const availableHeight = winHeight - topOffset - 32;
    setTrackTop(topOffset);
    setTrackHeight(availableHeight);

    const docHeight = document.documentElement.scrollHeight;
    const maxScroll = docHeight - winHeight;
    const scrollableDistance = Math.max(maxScroll - goalsTop, 1);

    metricsRef.current = {
      goalsTop,
      availableHeight,
      scrollableDistance,
    };
  }, []);

  // Высокопроизводительное обновление бегунка через rAF без ререндера React
  useEffect(() => {
    refreshLayoutMetrics();

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const { goalsTop, availableHeight, scrollableDistance } = metricsRef.current;

        // Проверка достижения подвала: если подвал появился в поле зрения, скрываем ползунок
        const footerEl = document.getElementById('site-footer') || document.querySelector('footer');
        const isNearFooter = footerEl
          ? footerEl.getBoundingClientRect().top <= window.innerHeight - 30
          : false;

        const isAfterHero = scrollTop >= goalsTop - 120;
        const shouldBeVisible = (isAfterHero && !isNearFooter) || isDraggingRef.current;

        if (shouldBeVisible !== isVisibleRef.current) {
          isVisibleRef.current = shouldBeVisible;
          setIsVisible(shouldBeVisible);
        }

        // Если идет ручной drag, системный скролл не перезаписывает бегунок
        if (!isDraggingRef.current) {
          let targetY = 0;
          if (scrollableDistance > 0 && scrollTop > goalsTop) {
            const progress = Math.min((scrollTop - goalsTop) / scrollableDistance, 1);
            const maxThumbTravel = availableHeight - THUMB_HEIGHT;
            targetY = Math.max(0, Math.min(progress * maxThumbTravel, maxThumbTravel));
          }

          thumbYRef.current = targetY;
          if (thumbRef.current) {
            thumbRef.current.style.transform = `translate3d(0, ${targetY}px, 0)`;
          }
        }
      });
    };

    const onResize = () => {
      refreshLayoutMetrics();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [refreshLayoutMetrics]);

  // Скролл страницы по заданной позиции Y ползунка
  const scrollToThumbPosition = (newThumbY: number, curTrackHeight: number) => {
    const { goalsTop, scrollableDistance } = metricsRef.current;
    const maxThumbTravel = Math.max(curTrackHeight - THUMB_HEIGHT, 1);
    const clampedThumbY = Math.max(0, Math.min(newThumbY, maxThumbTravel));
    const ratio = clampedThumbY / maxThumbTravel;

    thumbYRef.current = clampedThumbY;
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translate3d(0, ${clampedThumbY}px, 0)`;
    }

    if (scrollableDistance > 0) {
      window.scrollTo({
        top: goalsTop + ratio * scrollableDistance,
        behavior: 'auto',
      });
    }
  };

  // 1. Начало перетаскивания (MouseDown / TouchStart на бегунке)
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartThumbYRef.current = thumbYRef.current;

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    // Синхронизируем положение кастомного курсора
    window.dispatchEvent(
      new CustomEvent('customcursor:update', {
        detail: { x: e.clientX, y: e.clientY },
      })
    );

    const onPointerMove = (moveEvt: PointerEvent) => {
      if (!isDraggingRef.current) return;

      // Обновляем координаты кастомного курсора синхронно с движением мыши
      window.dispatchEvent(
        new CustomEvent('customcursor:update', {
          detail: { x: moveEvt.clientX, y: moveEvt.clientY },
        })
      );

      const deltaY = moveEvt.clientY - dragStartYRef.current;
      const targetThumbY = dragStartThumbYRef.current + deltaY;
      scrollToThumbPosition(targetThumbY, trackHeight);
    };

    const onPointerUp = (upEvt: PointerEvent) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(upEvt.pointerId);

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      // Проверка скрытия ползунка при завершении перетаскивания у подвала
      const footerEl = document.getElementById('site-footer') || document.querySelector('footer');
      const isNearFooter = footerEl
        ? footerEl.getBoundingClientRect().top <= window.innerHeight - 30
        : false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isAfterHero = scrollTop >= metricsRef.current.goalsTop - 120;
      const shouldBeVisible = isAfterHero && !isNearFooter;

      if (shouldBeVisible !== isVisibleRef.current) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  // 2. Клик по свободной зоне трека
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const targetThumbY = clickY - THUMB_HEIGHT / 2;
    scrollToThumbPosition(targetThumbY, rect.height);
  };

  return (
    <div
      className={`fixed z-50 transition-opacity duration-300 ease-out select-none will-change-[opacity,transform] ${
        isVisible
          ? 'opacity-100 pointer-events-auto translate-x-1/2'
          : 'opacity-0 pointer-events-none translate-x-[70%]'
      }`}
      style={{
        right: `${rightOffsetPx}px`,
        top: `${trackTop}px`,
        height: `${trackHeight}px`,
        width: '24px',
      }}
      data-tooltip="Потяните для скролла"
      aria-label="Потяните для скролла"
    >
      {/* Кликабельная область трека */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="w-full h-full relative cursor-pointer flex items-center justify-center group"
      >
        <div className="w-1 h-full rounded-full bg-transparent" />

        <div
          ref={thumbRef}
          onPointerDown={handleThumbPointerDown}
          className={`absolute left-0 right-0 top-0 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-10 will-change-transform ${
            isDragging ? 'cursor-grabbing scale-105' : ''
          }`}
          style={{
            height: `${THUMB_HEIGHT}px`,
            transform: `translate3d(0, ${thumbYRef.current}px, 0)`,
            transition: isDragging
              ? 'background-color 150ms ease'
              : 'background-color 150ms ease',
          }}
        >
          <div
            className={`w-2 sm:w-2.5 h-full rounded-full shadow-xs transition-colors duration-150 ${
              isDragging ? 'bg-[#F29C72] ring-2 ring-[#FFAD85]/40' : 'bg-[#FFAD85] hover:bg-[#F29C72]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
