import React, { useEffect, useRef, useState } from 'react';
import { EthnicChipIcon } from './EthnicOrnaments';
import { InteractiveBookReader } from './InteractiveBookReader';
import { 
  ArrowDown, 
  PenTool, 
  School, 
  MapPin, 
  Palette
} from 'lucide-react';
import { TOTAL_FRAMES, getGlobalImagesArray, loadSingleFrame, getBestAvailableFrame } from '../utils/framePreloader';

interface HeroProps {
  onOpenSpread?: (chapterId: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSpread }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [videoShiftX, setVideoShiftX] = useState<number>(0);
  const [mobileShiftX, setMobileShiftX] = useState<number>(0);
  const [mobileShiftY, setMobileShiftY] = useState<number>(0);
  const [mobileScale, setMobileScale] = useState<number>(1.65);
  const [stickyEl, setStickyEl] = useState<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1200;
  });

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAutoScrollingRef = useRef<boolean>(false);
  const scrollAnimRef = useRef<number | null>(null);

  const lastDrawnIndexRef = useRef<number>(-1);

  const smoothScrollTo = (targetY: number, duration: number) => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
    }
    isAutoScrollingRef.current = true;
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 5) {
      isAutoScrollingRef.current = false;
      return;
    }
    const startTime = performance.now();

    const uniformMotion = (t: number) => {
      const r = 0.06;
      const V = 1 / (1 - r);
      if (t < r) {
        return 0.5 * (V / r) * t * t;
      } else if (t > 1 - r) {
        const dt = 1 - t;
        return 1 - 0.5 * (V / r) * dt * dt;
      } else {
        return 0.5 * V * r + V * (t - r);
      }
    };

    const step = (now: number) => {
      const elapsed = now - startTime;
      const prog = Math.min(elapsed / duration, 1);
      const eased = uniformMotion(prog);
      window.scrollTo(0, startY + distance * eased);

      if (prog < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
        scrollAnimRef.current = null;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  };

  const handleScrollToDesignSystem = () => {
    const el = document.getElementById('design-system');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContent = () => {
    if (!sectionRef.current) return;
    const trackHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (window.innerWidth < 1024) ? 0.45 : 0.52;
    const finalSpreadY = sectionRef.current.offsetTop + trackHeight * targetProgress;

    if (Math.abs(window.scrollY - finalSpreadY) > 40) {
      smoothScrollTo(finalSpreadY, 2400);
    }
  };

  useEffect(() => {
    const images = getGlobalImagesArray();
    imagesRef.current = images as HTMLImageElement[];

    const drawInitial = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = getBestAvailableFrame(0);
          if (img && img.complete && img.naturalWidth > 0) {
            ctx.clearRect(0, 0, 1920, 1080);
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img, 0, 0, 1920, 1080);
            lastDrawnIndexRef.current = 0;
            return true;
          }
        }
      }
      return false;
    };

    if (!drawInitial()) {
      const timer = setInterval(() => {
        if (drawInitial()) {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAutoScrollingRef.current && Math.abs(e.deltaY) > 2) {
        if (scrollAnimRef.current) {
          cancelAnimationFrame(scrollAnimRef.current);
          scrollAnimRef.current = null;
        }
        isAutoScrollingRef.current = false;
      }
    };

    const handleTouchStart = () => {
      if (isAutoScrollingRef.current) {
        if (scrollAnimRef.current) {
          cancelAnimationFrame(scrollAnimRef.current);
          scrollAnimRef.current = null;
        }
        isAutoScrollingRef.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let smoothProgress = 0;

    const render = () => {
      if (!sectionRef.current) {
        rafId = requestAnimationFrame(render);
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const trackHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const scrolled = -rect.top;
      targetProgress = Math.min(Math.max(scrolled / trackHeight, 0), 1);
      
      // Smooth lerp interpolation for silky, weighted scroll transition
      smoothProgress += (targetProgress - smoothProgress) * 0.08;
      if (Math.abs(targetProgress - smoothProgress) < 0.0001) {
        smoothProgress = targetProgress;
      }
      const currentProgress = smoothProgress;
      setProgress(currentProgress);

      const vw = window.innerWidth;
      const isMobileView = vw < 768;
      const isTabletView = vw >= 768 && vw < 1024;

      let exactFloatIndex: number;
      if (isMobileView) {
        // Phase 1 (0.0 to 0.35): book unfolds smoothly from closed to open spread
        const openProgress = Math.min(currentProgress / 0.35, 1);
        exactFloatIndex = openProgress * (TOTAL_FRAMES - 1);

        const mobileTargetWidth = Math.min(vw * 0.76, 320);
        const targetZoomScale = mobileTargetWidth / (vw * (628 / 1920));

        let currentScale: number;
        let shiftX: number;
        let shiftY: number;

        if (currentProgress <= 0.35) {
          const tOpen = openProgress * openProgress * (3 - 2 * openProgress);
          currentScale = 1.65 - (1.65 - 1.20) * tOpen;
          shiftX = 0;
          shiftY = 0;
        } else {
          const zoomProgress = Math.min(Math.max((currentProgress - 0.35) / 0.15, 0), 1);
          const tZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
          currentScale = 1.20 + (targetZoomScale - 1.20) * tZoom;

          shiftX = -(0.6609375 - 0.5000) * vw * currentScale * tZoom;
          const canvasH = vw * (9 / 16);
          shiftY = -(0.522222 - 0.5000) * canvasH * currentScale * tZoom;
        }

        setMobileScale(currentScale);
        setMobileShiftX(shiftX);
        setMobileShiftY(shiftY);
      } else if (isTabletView) {
        // Tablet view: 3D book unfolds in first 45% of scroll
        const unfoldProgress = Math.min(currentProgress / 0.45, 1);
        exactFloatIndex = unfoldProgress * (TOTAL_FRAMES - 1);

        const tabletShiftFactor = unfoldProgress <= 0.2 
          ? 1 
          : unfoldProgress >= 0.7 
            ? 0 
            : 1 - (unfoldProgress - 0.2) / 0.5;
        const tabletShiftAmount = Math.min(vw * 0.10, 80);
        setVideoShiftX(tabletShiftFactor * tabletShiftAmount);
      } else {
        // Desktop view: 3D book unfolds in first 48% of scroll
        const unfoldProgress = Math.min(currentProgress / 0.48, 1);
        exactFloatIndex = unfoldProgress * (TOTAL_FRAMES - 1);

        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const containerRight = containerRect.right;
          const vh = window.innerHeight;
          const scale = Math.min(vw / 1920, vh / 1080);
          const renderedWidth = 1920 * scale;
          const videoLeft = (vw - renderedWidth) / 2;
          const bookRight = videoLeft + 1703 * scale;
          const delta = containerRight - bookRight;
          setVideoShiftX(shiftFactor * balancedShift);
        }
      }

      const exactIndex = Math.min(Math.max(Math.round(exactFloatIndex), 0), TOTAL_FRAMES - 1);

      const canvas = canvasRef.current;
      if (canvas) {
        for (let off = -5; off <= 35; off++) {
          const idx = exactIndex + off;
          if (idx >= 0 && idx < TOTAL_FRAMES) {
            loadSingleFrame(idx);
          }
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = getBestAvailableFrame(exactIndex);

          if (img && img.complete && img.naturalWidth > 0) {
            ctx.clearRect(0, 0, 1920, 1080);
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img, 0, 0, 1920, 1080);
            lastDrawnIndexRef.current = exactIndex;
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleScroll = () => {
      // render loop continuously smooths progress
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, []);

  const textScrollRatio = Math.min(progress / 0.18, 1);
  const leftTranslateY = textScrollRatio * 160;
  const leftOpacity = Math.max(1 - textScrollRatio, 0);

  return (
    <>
      {/* 1. Standalone Hero Text Screen for Smartphone Phones (< 768px / md:hidden):
          Zero canvas under it on small phone viewports.
      */}
      <section 
        className="block md:hidden bg-[#F9F7F2] border-b border-[#1C1C1C]/15 px-4 py-5 min-h-[calc(100dvh-2.75rem)] flex flex-col justify-between"
        aria-label="Главная информация о словаре"
      >
        <div className="max-w-[540px] mx-auto w-full flex flex-col justify-between flex-1 py-1 space-y-4">
          <div className="flex flex-col space-y-3 my-auto">
            <div className="flex flex-col gap-1.5">
              <div>
                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/90 text-xs text-[#1C1C1C]/80 font-normal select-none"
                  data-tooltip="Победитель гранта им. М. С. Киселёва"
                  role="status"
                >
                  <EthnicChipIcon type="grant" className="w-3.5 h-3.5 text-[#1C1C1C]/70" aria-hidden="true" />
                  <span>Победитель гранта им. М. С. Киселёва</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/90 text-xs text-[#1C1C1C]/80 font-normal select-none"
                  data-tooltip="Академический книжный дизайн"
                  role="status"
                >
                  <EthnicChipIcon type="copies" className="w-3.5 h-3.5 text-[#1C1C1C]/70" aria-hidden="true" />
                  <span>Книжный дизайн</span>
                </span>

                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/90 text-xs text-[#1C1C1C]/80 font-normal select-none"
                  data-tooltip="Разработка от концепта до тиража"
                  role="status"
                >
                  <EthnicChipIcon type="cycle" className="w-3.5 h-3.5 text-[#1C1C1C]/70" aria-hidden="true" />
                  <span>Проект полного цикла</span>
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-editorial font-normal leading-tight text-[#1C1C1C]">
              Разработка школьного словаря<br />
              народов Верхнекетья
            </h1>

            <p className="text-sm text-[#1C1C1C]/85 font-normal leading-relaxed text-balance">
              Графическая концепция, модульная вёрстка&nbsp;и&nbsp;полиграфическое оформление издания для&nbsp;краеведческого мини-музея «Затёски».
            </p>

            {/* 4 Cards Grid attached directly to the text group */}
            <div className="grid grid-cols-2 gap-2 pt-1" role="region" aria-label="Параметры проекта">
              <article className="p-2.5 bg-white border border-[#1C1C1C]/15 rounded-tl-sm rounded-tr-[28px] rounded-bl-[28px] rounded-br-sm flex flex-col justify-between min-h-[82px]">
                <div className="mb-1 flex items-center">
                  <PenTool className="w-3.5 h-3.5 text-[#1C1C1C]/75" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="font-sans text-xs font-medium text-[#1C1C1C] leading-snug">
                  Дизайн, редактура<br />
                  и&nbsp;вёрстка
                </p>
              </article>

              <article className="p-2.5 bg-white border border-[#1C1C1C]/15 rounded-tl-sm rounded-tr-[28px] rounded-bl-[28px] rounded-br-sm flex flex-col justify-between min-h-[82px]">
                <div className="mb-1 flex items-center">
                  <School className="w-3.5 h-3.5 text-[#1C1C1C]/75" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="font-sans text-xs font-medium text-[#1C1C1C] leading-snug">
                  Школьный этномузей<br />
                  «Затёски»
                </p>
              </article>

              <article className="p-2.5 bg-white border border-[#1C1C1C]/15 rounded-tl-sm rounded-tr-[28px] rounded-bl-[28px] rounded-br-sm flex flex-col justify-between min-h-[82px]">
                <div className="mb-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-[#1C1C1C]/75" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="font-sans text-xs font-medium text-[#1C1C1C] leading-snug">
                  Томская область,<br />
                  2026 год
                </p>
              </article>

              <article className="p-2.5 bg-white border border-[#1C1C1C]/15 rounded-tl-sm rounded-tr-[28px] rounded-bl-[28px] rounded-br-sm flex flex-col justify-between min-h-[82px]">
                <div className="mb-1 flex items-center">
                  <Palette className="w-3.5 h-3.5 text-[#1C1C1C]/75" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="font-sans text-xs font-medium text-[#1C1C1C] leading-snug">
                  Adobe InDesign,<br />
                  Illustrator, Photoshop
                </p>
              </article>
            </div>
          </div>

          <div className="pt-1 flex flex-col items-stretch gap-2 shrink-0">
            <button
              type="button"
              onClick={handleScrollToContent}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C1C1C] text-[#F9F7F2] text-xs font-medium rounded-lg group transition-colors duration-200 cursor-pointer"
            >
              <span>Ознакомиться с книгой</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#F9F7F2]" />
            </button>

            <button
              type="button"
              onClick={handleScrollToDesignSystem}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#1C1C1C]/25 text-[#1C1C1C] text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <span>Изучить дизайн-систему</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Primary Hero Section (Tablets 768px+ and Desktop 1024px+):
          Single unified section with large 3D book canvas animation and crisp overlay text!
      */}
      <section 
        ref={sectionRef} 
        id="hero-section" 
        className="relative bg-[#F9F7F2] border-b border-[#1C1C1C]/15 h-[260vh] md:h-[340vh] lg:h-[400vh]"
      >
        <div 
          ref={(el) => {
            if (el && el !== stickyEl) setStickyEl(el);
          }}
          className="sticky top-12 sm:top-13 h-[calc(100dvh-3rem)] w-full overflow-hidden bg-[#F9F7F2] flex items-center justify-center relative"
        >
          {/* 3D Book Animation Stage */}
          <div 
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none z-0 will-change-transform"
            style={{
              transform: isMobile ? 'none' : `translateX(${videoShiftX}px)`,
            }}
          >
            <div 
              className="relative flex items-center justify-center w-full h-full max-w-[calc((100dvh-3rem)*16/9)] max-h-[calc(100vw*9/16)]"
              style={{
                aspectRatio: '16 / 9',
              }}
            >
              <div 
                className="w-full h-full relative flex items-center justify-center will-change-transform"
                style={isMobile ? {
                  transform: `translate3d(${mobileShiftX}px, ${mobileShiftY}px, 0) scale(${mobileScale})`,
                  transformOrigin: 'center center',
                } : isTablet ? {
                  transform: 'scale(1.22)',
                  transformOrigin: 'center center',
                } : undefined}
              >
                <canvas
                  ref={canvasRef}
                  width={1920}
                  height={1080}
                  className="w-full h-full block pointer-events-none"
                  style={{
                    mixBlendMode: 'multiply',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4.5%, black 95.5%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 3.5%, black 96.5%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 4.5%, black 95.5%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 3.5%, black 96.5%, transparent 100%)',
                    WebkitMaskComposite: 'destination-in',
                    maskComposite: 'intersect',
                    opacity: 1,
                  }}
                />

                <InteractiveBookReader
                  isVisible={isMobile ? (progress >= 0.35) : isTablet ? (progress >= 0.42) : (progress >= 0.48)}
                  progress={progress}
                  portalContainer={stickyEl}
                  onOpenDetailedModal={onOpenSpread}
                />
              </div>
            </div>
          </div>

          {/* Unified Overlay Text Container (Visible on tablets 768px+ and desktop) */}
          <div 
            ref={containerRef}
            className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 h-full hidden md:flex items-center justify-start pointer-events-none"
          >
            <div 
              className="max-w-[360px] md:max-w-[380px] lg:max-w-[520px] xl:max-w-[560px] w-full space-y-2 sm:space-y-2.5 lg:space-y-3.5 pointer-events-auto will-change-transform py-2"
              style={{
                transform: `translateY(-${leftTranslateY}px)`,
                opacity: leftOpacity,
                pointerEvents: leftOpacity < 0.05 ? 'none' : 'auto',
              }}
            >
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <div>
                  <span 
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/85 backdrop-blur-[2px] text-xs text-[#1C1C1C]/80 font-normal m3-interactive-button select-none"
                    data-tooltip="Победитель гранта им. М. С. Киселёва"
                    role="status"
                  >
                    <EthnicChipIcon type="grant" className="w-3.5 h-3.5 text-[#1C1C1C]/70 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                    <span>Победитель гранта им. М. С. Киселёва</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span 
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/85 backdrop-blur-[2px] text-xs text-[#1C1C1C]/80 font-normal m3-interactive-button select-none"
                    data-tooltip="Академический книжный дизайн"
                    role="status"
                  >
                    <EthnicChipIcon type="copies" className="w-3.5 h-3.5 text-[#1C1C1C]/70 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                    <span>Книжный дизайн</span>
                  </span>

                  <span 
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1C1C1C]/15 bg-white/85 backdrop-blur-[2px] text-xs text-[#1C1C1C]/80 font-normal m3-interactive-button select-none"
                    data-tooltip="Разработка от концепта до тиража"
                    role="status"
                  >
                    <EthnicChipIcon type="cycle" className="w-3.5 h-3.5 text-[#1C1C1C]/70 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                    <span>Проект полного цикла</span>
                  </span>
                </div>
              </div>

              <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-editorial font-normal leading-tight lg:leading-[1.08] tracking-normal text-[#1C1C1C]">
                Разработка<br />
                школьного словаря<br />
                народов Верхнекетья
              </h1>

              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-[#1C1C1C]/80 font-normal leading-relaxed max-w-xl text-balance">
                Графическая концепция, модульная вёрстка&nbsp;и&nbsp;полиграфическое оформление издания для&nbsp;краеведческого мини-музея «Затёски».
              </p>

              {/* 4 Cards Grid: 2x2 grid on tablet, 4x1 grid on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 pt-0.5 max-w-[380px] lg:max-w-[500px]" role="region" aria-label="Параметры проекта">
                <article 
                  className="group p-2.5 sm:p-3 bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/45 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md m3-card-interactive flex flex-col justify-between min-h-[82px] sm:min-h-[96px] lg:min-h-[110px] cursor-pointer transition-all duration-300 ease-out"
                  data-tooltip="Дизайн и авторский надзор"
                >
                  <div className="mb-1 flex items-center">
                    <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1C]/75 group-hover:text-[#1C1C1C] transition-all duration-300" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h2 className="font-sans text-[11px] sm:text-xs xl:text-sm font-medium text-[#1C1C1C] leading-snug">
                    Дизайн, редактура<br />
                    и&nbsp;вёрстка
                  </h2>
                </article>

                <article 
                  className="group p-2.5 sm:p-3 bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/45 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md m3-card-interactive flex flex-col justify-between min-h-[82px] sm:min-h-[96px] lg:min-h-[110px] cursor-pointer transition-all duration-300 ease-out"
                  data-tooltip="Краеведческий мини-музей"
                >
                  <div className="mb-1 flex items-center">
                    <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1C]/75 group-hover:text-[#1C1C1C] transition-all duration-300" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h2 className="font-sans text-[11px] sm:text-xs xl:text-sm font-medium text-[#1C1C1C] leading-snug">
                    Школьный этномузей<br />
                    «Затёски»
                  </h2>
                </article>

                <article 
                  className="group p-2.5 sm:p-3 bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/45 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md m3-card-interactive flex flex-col justify-between min-h-[82px] sm:min-h-[96px] lg:min-h-[110px] cursor-pointer transition-all duration-300 ease-out"
                  data-tooltip="Томская область, 2026"
                >
                  <div className="mb-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1C]/75 group-hover:text-[#1C1C1C] transition-all duration-300" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h2 className="font-sans text-[11px] sm:text-xs xl:text-sm font-medium text-[#1C1C1C] leading-snug">
                    Томская область,<br />
                    2026 год
                  </h2>
                </article>

                <article 
                  className="group p-2.5 sm:p-3 bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/45 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md m3-card-interactive flex flex-col justify-between min-h-[82px] sm:min-h-[96px] lg:min-h-[110px] cursor-pointer transition-all duration-300 ease-out"
                  data-tooltip="Пакет Adobe Creative Cloud"
                >
                  <div className="mb-1 flex items-center">
                    <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1C]/75 group-hover:text-[#1C1C1C] transition-all duration-300" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h2 className="font-sans text-[11px] sm:text-xs xl:text-sm font-medium text-[#1C1C1C] leading-snug">
                    Adobe InDesign,<br />
                    Illustrator, Photoshop
                  </h2>
                </article>
              </div>

              <div className="pt-1.5 flex flex-wrap items-center gap-2.5 sm:gap-3 relative z-20 shrink-0">
                <button
                  type="button"
                  onClick={handleScrollToContent}
                  className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-3 bg-[#1C1C1C] hover:bg-[#2B2B2B] text-[#F9F7F2] text-xs sm:text-sm font-medium rounded-lg group m3-interactive-button cursor-pointer select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
                  data-tooltip="Раскрыть книгу"
                  aria-label="Ознакомиться с книгой и перейти к чтению"
                >
                  <span>Ознакомиться с книгой</span>
                  <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 overflow-hidden flex items-center justify-center shrink-0" aria-hidden="true">
                    <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F9F7F2] absolute inset-0 transition-transform duration-300 ease-out group-hover:translate-y-full" />
                    <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F9F7F2] absolute inset-0 transition-transform duration-300 ease-out -translate-y-full group-hover:translate-y-0" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleScrollToDesignSystem}
                  className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-3 bg-white hover:bg-[#F3EFE6] border border-[#1C1C1C]/25 text-[#1C1C1C] text-xs sm:text-sm font-medium rounded-lg m3-interactive-button cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
                  data-tooltip="Раздел дизайн-системы"
                  aria-label="Изучить раздел дизайн-системы"
                >
                  <span>Изучить дизайн-систему</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

