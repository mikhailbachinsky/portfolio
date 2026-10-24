import React, { useEffect, useRef, useState } from 'react';
import { 
  BookOpen,
  Layers,
  Palette,
  Library,
  Feather
} from 'lucide-react';
import {
  VelvetPaperIcon,
  EyedropperIcon,
  BarkTextureIcon,
  PyrographIcon,
  FlatBookOpenIcon
} from './EthnicOrnaments';
import { 
  TOTAL_COVER_FRAMES, 
  getCoverImage, 
  getBestAvailableCoverImage,
  preloadPriorityCoverFrames 
} from '../utils/coverFramesPreloader';

// Custom Clear Raw Material / Birch Bark Sheet Icon
const RawMaterialIcon = ({ className = "w-4 h-4", strokeWidth = 1.8 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6c2-1 4-1 6 0s4 1 6 0 4-1 6 0v12c-2-1-4-1-6 0s-4 1-6 0-4-1-6 0V6z" />
    <path d="M4 10c2-1 4-1 6 0s4 1 6 0" />
    <path d="M4 14c2-1 4-1 6 0s4 1 6 0" />
  </svg>
);

// Wood Burner Icon for Pyrography
const WoodBurnerIcon = ({ className = "w-4 h-4", strokeWidth = 1.8 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4.5L19.5 9.5L12 17L7 17L7 12L14.5 4.5Z" />
    <path d="M3 21L7 17" />
    <path d="M15 7L17 9" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

// Custom Minimalist Binder Ring Icon
const BinderRingIcon = ({ className = "w-4 h-4", strokeWidth = 1.8 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7" />
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
  </svg>
);

const ReadingFormatIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const TexturePaperIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const ColorPrintIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const COVER_CRAFT_CARDS = [
  {
    title: 'Плотная кора',
    description: 'Отборная зимняя береста без&nbsp;трещин и&nbsp;наростов, заготовленная с&nbsp;живых деревьев в&nbsp;таёжных лесах Верхнекетья.',
  },
  {
    title: 'Таёжный пирограф',
    description: 'Ручное выжигание нагретой иглой по&nbsp;живому рельефу коры с&nbsp;тонкой передачей полутонов орнамента и&nbsp;букв названия.',
  },
  {
    title: 'Раскрытие на\u00A0180°',
    description: 'Прочные кольца обеспечивают свободное раскрытие книги на&nbsp;180° и&nbsp;360° без&nbsp;залома страниц на&nbsp;школьной парте.',
  },
];

const PRINT_PROCESS_CARDS = [
  {
    title: 'Уроки и\u00A0личное чтение',
    description: 'Книжный формат А4 (210 × 297 мм) создан для\u00A0презентаций и\u00A0подарков, а\u00A0компактный А5\u00A0— для\u00A0индивидуального чтения за\u00A0партой.',
  },
  {
    title: 'Бархатистый офсет',
    description: 'Плотная матовая бумага полностью исключает блики от&nbsp;ламп и&nbsp;солнца, сберегая зрение детей при&nbsp;долгом чтении.',
  },
  {
    title: 'Печать в\u00A0CMYK',
    description: 'Точная цветовая калибровка для&nbsp;достоверной передачи оттенков таёжной хвои, бересты и&nbsp;этнографических рисунков.',
  },
];

export const CoverTurnScrollExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [coverShiftX, setCoverShiftX] = useState(0);
  const isReadyRef = useRef(false);
  const isVisibleRef = useRef(false);
  const lastDrawnIndexRef = useRef<number>(-1);
  const lastProgressRef = useRef<number>(-1);
  const lastShiftRef = useRef<number>(0);

  useEffect(() => {
    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '300px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const render = () => {
      if (!isVisibleRef.current || !sectionRef.current) {
        rafId = requestAnimationFrame(render);
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const scrolled = -rect.top;
      targetProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      
      // Smooth lerp interpolation
      smoothProgress += (targetProgress - smoothProgress) * 0.07;
      if (Math.abs(targetProgress - smoothProgress) < 0.0001) {
        smoothProgress = targetProgress;
      }
      const currentProgress = smoothProgress;
      
      // Optimization: Only update state if change is significant
      if (Math.abs(currentProgress - lastProgressRef.current) > 0.0005) {
        setProgress(currentProgress);
        lastProgressRef.current = currentProgress;
      }

      const vw = window.innerWidth;
      if (vw < 1024) {
        const mobileRenderedWidth = Math.min(vw - 24, 580) * 1.6;
        const mobileShift = currentProgress <= 0.5
          ? (1 - currentProgress * 2) * 0.2410
          : -(currentProgress - 0.5) * 2 * 0.2766;
        const targetShift = mobileShift * mobileRenderedWidth;
        
        if (Math.abs(targetShift - lastShiftRef.current) > 0.1) {
          setCoverShiftX(targetShift);
          lastShiftRef.current = targetShift;
        }
      } else if (lastShiftRef.current !== 0) {
        setCoverShiftX(0);
        lastShiftRef.current = 0;
      }

      const exactIndex = Math.min(
        Math.max(Math.round(currentProgress * (TOTAL_COVER_FRAMES - 1)), 0),
        TOTAL_COVER_FRAMES - 1
      );

      preloadPriorityCoverFrames(exactIndex, 12);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = getBestAvailableCoverImage(exactIndex);

          if (img && img.complete && img.naturalWidth > 0) {
            ctx.clearRect(0, 0, 1920, 1080);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img, 0, 0, 1920, 1080);

            lastDrawnIndexRef.current = exactIndex;
            if (!isReadyRef.current) {
              setIsReady(true);
              isReadyRef.current = true;
            }
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

    // Стартовая отрисовка первого кадра
    handleScroll();

    // Проверяем готовность первого кадра
    const checkInitial = setInterval(() => {
      const img = getCoverImage(0);
      if (img && img.complete && img.naturalWidth > 0) {
        setIsReady(true);
        isReadyRef.current = true;
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, 1920, 1080);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, 1920, 1080);
            lastDrawnIndexRef.current = 0;
          }
        }
        clearInterval(checkInitial);
      }
    }, 50);

    // Defer background load until section is close
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('../utils/coverFramesPreloader').then(m => m.startCoverFramesBackgroundLoad());
          loadObserver.disconnect();
        }
      },
      { rootMargin: '1200px 0px' }
    );

    if (sectionRef.current) {
      loadObserver.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
      clearInterval(checkInitial);
      observer.disconnect();
    };
  }, []);

  // Вычисляем плавные переходы прозрачности и смещения без скачков
  // Блок 1 (справа, начальное состояние): виден от 0 до 0.35, мягко растворяется к 0.52
  const frontOpacity = progress <= 0.35 ? 1 : Math.max(0, 1 - (progress - 0.35) / 0.17);
  const frontTranslateY = progress <= 0.35 ? 0 : (progress - 0.35) * 60;

  // Блок 2 (слева, повёрнутая книга): мягко проявляется от 0.48 до 0.65, полностью виден от 0.65 до 1
  const backOpacity = progress >= 0.65 ? 1 : Math.max(0, (progress - 0.48) / 0.17);
  const backTranslateY = progress >= 0.65 ? 0 : (0.65 - Math.max(progress, 0.48)) * 60;

  return (
    <div 
      ref={sectionRef} 
      className="relative bg-[#F9F7F2] h-[290vh] w-full"
    >
      {/* Приколотая сцена: фиксируется во вьюпорте на время прокрутки */}
      <div className="sticky top-11 sm:top-12 h-[calc(100dvh-2.75rem)] sm:h-[calc(100dvh-3rem)] w-full overflow-hidden bg-[#F9F7F2] flex flex-col lg:flex-row items-center justify-between lg:justify-center relative">
        
        {/* Полноэкранный слой видео 3D-поворота книги: на мобильных занимает верхние 30% экрана */}
        <div 
          className="relative lg:absolute lg:inset-0 w-full h-[30%] sm:h-[36%] lg:h-full flex items-center justify-center pointer-events-none select-none z-0 will-change-transform shrink-0 overflow-visible"
          style={{
            transform: `translateX(${coverShiftX}px)`,
          }}
        >
          <div 
            className="relative flex items-center justify-center w-full h-full scale-[1.5] sm:scale-[1.65] lg:scale-100 origin-center lg:max-w-[calc((100dvh-3rem)*16/9)] lg:max-h-[calc(100vw*9/16)]"
            style={{
              aspectRatio: '16 / 9',
            }}
          >
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              role="img"
              aria-label="Интерактивная визуализация раскрытия берестяной обложки книги при скролле"
              className="w-full h-full object-contain block pointer-events-none will-change-transform"
              style={{
                mixBlendMode: 'multiply',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                WebkitMaskComposite: 'destination-in',
                maskComposite: 'intersect',
              }}
            />

            {!isReady && (
              <img 
                src="/cover-frames/frame_001.webp" 
                alt="Лицевая обложка словаря из натуральной бересты"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                  WebkitMaskComposite: 'destination-in',
                  maskComposite: 'intersect',
                }}
              />
            )}

            {/* Мягкий деликатный градиент по краям видеокадра для бесшовного растворения в фоне */}
            <div 
              className="absolute inset-0 pointer-events-none select-none" 
              style={{
                background: 'linear-gradient(to right, #F9F7F2 0%, transparent 6%, transparent 94%, #F9F7F2 100%), linear-gradient(to bottom, #F9F7F2 0%, transparent 5%, transparent 95%, #F9F7F2 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Слой текста: сбалансированная верстка с естественным воздухом */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-3.5 sm:px-6 lg:px-12 h-[70%] sm:h-[64%] lg:h-full flex flex-col justify-center items-center lg:items-stretch pb-2 lg:pb-0 pointer-events-none">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-8 items-center pointer-events-none">

            {/* БЛОК 2: СЛЕВА ОТ ПОВЁРНУТОЙ КНИГИ — Печать и производственный цикл (колонки 1-6) */}
            <div 
              className="col-span-12 row-start-1 col-start-1 lg:col-start-1 lg:col-span-6 lg:row-start-1 will-change-transform w-full"
              style={{
                opacity: backOpacity,
                transform: `translateY(${backTranslateY}px)`,
                pointerEvents: backOpacity < 0.05 ? 'none' : 'auto',
              }}
            >
              <div className="space-y-2.5 sm:space-y-4 max-w-[580px] mx-auto lg:mx-0 bg-[#FAF8F5]/95 backdrop-blur-md p-3.5 sm:p-6 rounded-2xl border border-[#1C1C1C]/15 shadow-sm lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-0 lg:shadow-none pointer-events-auto">
                <div className="relative pl-3.5 sm:pl-5 lg:pl-7 border-l-2 border-[#1C1C1C]/25 py-0.5 mb-2 sm:mb-4">
                  <p className="text-sm sm:text-xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                    Книга соединяет ручной природный материал таёжного Севера и&nbsp;строгие стандарты академического книгоиздания.
                  </p>
                </div>

                {/* Просторный стек технологического процесса печати */}
                <div className="flex flex-col gap-2 sm:gap-3.5 pt-1" role="region" aria-label="Технологический процесс печати">
                  {PRINT_PROCESS_CARDS.map((card, idx) => {
                    return (
                      <article 
                        key={idx}
                        className="w-full group bg-white border border-[#1C1C1C]/15 rounded-xl p-3 sm:p-4 lg:p-5 shadow-2xs m3-card-interactive flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 sm:gap-3 lg:gap-4 cursor-pointer"
                      >
                        <div className="lg:w-[38%] shrink-0 flex items-center lg:block gap-2">
                          {idx === 0 && <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-lesson-reading" aria-hidden="true" />}
                          {idx === 1 && <VelvetPaperIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-velvet-paper" aria-hidden="true" />}
                          {idx === 2 && <EyedropperIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-eyedropper-cmyk" aria-hidden="true" />}
                          <div className="text-[#1C1C1C] font-editorial text-[14px] sm:text-[16px] lg:text-[18px] leading-tight font-normal">
                            {card.title}
                          </div>
                        </div>
                        <p 
                          className="text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed flex-1 min-w-0 text-pretty"
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        />
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* БЛОК 1: СПРАВА ОТ КНИГИ — Концепция обложки и печать / Полиграфия (колонки 7-12) */}
            <div 
              className="col-span-12 row-start-1 col-start-1 lg:col-start-7 lg:col-span-6 lg:row-start-1 will-change-transform w-full"
              style={{
                opacity: frontOpacity,
                transform: `translateY(-${frontTranslateY}px)`,
                pointerEvents: frontOpacity < 0.05 ? 'none' : 'auto',
              }}
            >
              <div className="space-y-2.5 sm:space-y-4 max-w-[580px] mx-auto lg:ml-auto lg:mr-0 bg-[#FAF8F5]/95 backdrop-blur-md p-3.5 sm:p-6 rounded-2xl border border-[#1C1C1C]/15 shadow-sm lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-0 lg:shadow-none pointer-events-auto">
                <div>
                  <span className="block text-[11px] sm:text-xs text-[#1C1C1C]/70 mb-1 font-sans font-medium tracking-wide">
                    Концепция обложки и&nbsp;печать
                  </span>
                  <h2 className="text-lg sm:text-2xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                    Полиграфия
                  </h2>
                  <p className="hidden sm:block text-xs lg:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty pt-1">
                    Обложка книги создана из&nbsp;цельного пласта сибирской бересты. Буквы названия словаря, краеведческая символика и&nbsp;традиционные узоры бережно выжжены вручную.
                  </p>
                </div>

                {/* Просторный стек концепции обложки и ремесла */}
                <div className="flex flex-col gap-2 sm:gap-3.5 pt-1" role="region" aria-label="Концепция берестяной обложки">
                  {COVER_CRAFT_CARDS.map((card, idx) => {
                    return (
                      <article 
                        key={idx}
                        className="w-full group bg-white border border-[#1C1C1C]/15 rounded-xl p-3 sm:p-4 lg:p-5 shadow-2xs m3-card-interactive flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 sm:gap-3 lg:gap-4 cursor-pointer"
                      >
                        <div className="lg:w-[38%] shrink-0 flex items-center lg:block gap-2">
                          {idx === 0 && <BarkTextureIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-bark-texture" />}
                          {idx === 1 && <PyrographIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-pyrograph" />}
                          {idx === 2 && <FlatBookOpenIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[#1C1C1C]/80 lg:mb-1 shrink-0 icon-flat-book" />}
                          <div className="text-[#1C1C1C] font-editorial text-[14px] sm:text-[16px] lg:text-[18px] leading-tight font-normal">
                            {card.title}
                          </div>
                        </div>
                        <p 
                          className="text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed flex-1 min-w-0 text-pretty"
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        />
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
