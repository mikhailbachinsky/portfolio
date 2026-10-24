import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ArrowDownRight,
  Camera,
  Mail
} from 'lucide-react';
import { Header } from './components/Header';
import { ResumeModal } from './components/ResumeModal';
import { GoalsSection } from './components/GoalsSection';
import { PuzzleSection } from './components/PuzzleSection';
import { ColorsSection } from './components/ColorsSection';
import { TypographySection } from './components/TypographySection';
import { PatternSection } from './components/PatternSection';
import { IconsSection } from './components/IconsSection';
import { IllustrationsSection } from './components/IllustrationsSection';
import { MascotSection } from './components/MascotSection';
import { ImplementationSection } from './components/ImplementationSection';
import { DigitalEnvironmentSection } from './components/DigitalEnvironmentSection';
import { PhysicalEnvironmentSection } from './components/PhysicalEnvironmentSection';
import { CaseConclusionSection } from './components/CaseConclusionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PolicyModal, ConsentModal } from './components/LegalModals';
import { FloatingScrollbar } from './components/FloatingScrollbar';
import { CustomCursor } from './components/CustomCursor';
import { HelloDoodleVector } from './components/BrandGraphics';
import { HeroNavigationPanel } from './components/HeroNavigationPanel';
import { renderStableTypewriterSpan } from './components/TypewriterText';
import { CustomTooltip } from './components/CustomTooltip';
import { CasePreloader } from './components/CasePreloader';

const PRELOAD_ASSETS = [
  '/assets/merch-hoodie-2.webp',
  '/assets/merch-badge-2.webp',
  '/assets/merch-mug-2.webp',
  '/assets/merch-tshirt-1.webp',
  '/assets/merch-socks-1.webp',
  '/assets/merch-pins-2.webp',
  '/assets/merch-sweatshirt-1.webp',
  '/assets/merch-polo-3.webp',
  '/assets/merch-shopper-3.webp',
  '/assets/merch-diploma-2.webp',
  '/assets/merch-rollup-3.webp',
  '/assets/digital-desktop.webp',
  '/assets/digital-mobile.webp',
  '/assets/digital-post-1.webp',
  '/assets/digital-post-2.webp',
  '/assets/digital-post-3.webp',
  '/assets/digital-presentation.webp',
  '/assets/digital-sticker-1.webp',
  '/assets/digital-sticker-2.webp',
  '/assets/digital-sticker-3.webp',
  '/assets/digital-sticker-4.webp',
  '/assets/digital-sticker-5.webp',
  '/assets/digital-sticker-6.webp',
  '/assets/digital-sticker-7.webp',
  '/assets/digital-sticker-8.webp',
  '/assets/mascot-main.webp',
  '/assets/mascot-photo.webp',
  '/assets/mascot-card-1.webp',
  '/assets/mascot-card-2.webp',
  '/assets/mascot-card-3.webp',
  '/assets/mascot-emotion-1.webp',
  '/assets/mascot-emotion-2.webp',
  '/assets/mascot-emotion-3.webp',
  '/assets/mascot-emotion-4.webp',
  '/assets/mascot-emotion-5.webp',
  '/assets/mascot-emotion-6.webp',
  '/assets/mascot-emotion-7.webp',
  '/assets/illustration-risograph.webp',
  '/assets/team-selfie.webp',
  '/assets/illustration-2.svg',
  '/assets/illustration-3.svg',
  '/assets/illustration-4.svg',
  '/assets/icon-1.svg',
  '/assets/icon-2.svg',
  '/assets/icon-3.svg',
  '/assets/icon-4.svg',
  '/assets/icon-5.svg',
  '/assets/logo-original.svg',
  '/assets/logo-final.svg',
  '/assets/logo-compass.svg',
  '/assets/logo-compass-draft.svg',
  '/assets/footer-logo.svg',
  '/assets/avatar-karina.png',
  '/assets/avatar-mikhail.png',
  '/assets/icon-telegram.svg',
  '/assets/icon-vk.svg',
  '/assets/icon-whatsapp.svg',
  '/assets/icon-max.svg',
  '/assets/icon-hh.svg',
];

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [teamImageError, setTeamImageError] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [entranceFinished, setEntranceFinished] = useState(false);
  const [isSnapFlashed, setIsSnapFlashed] = useState(false);
  const [snapTriggerCount, setSnapTriggerCount] = useState(0);

  // Eager preloading all graphical and image assets on startup so scrolling is instantaneous
  useEffect(() => {
    PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Эффект пишущей машинки (Typewriter effect) для главного заголовка
  // 1 строчка: "Айдентика", 2 строчка: "для Тьюторской", 3 строчка: "службы ТГУ"
  const fullHeadline = 'Айдентика\nдля\u00A0Тьюторской\nслужбы\u00A0ТГУ';
  const [typedHeadlineCount, setTypedHeadlineCount] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (isPreloaderActive) return;

    // Начинаем печать с мягкой задержкой 250мс после растворения прелоадера
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullHeadline.length) {
          setTypedHeadlineCount(currentIndex);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 42); // ритмичный шаг печати

      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(startDelay);
  }, [isPreloaderActive]);

  useEffect(() => {
    if (isPreloaderActive) return;

    // После завершения плавного каскадного вылета (1.4с) снимаем keyframe-классы,
    // чтобы все стили и трансформации полностью освободили нативный DOM без остаточных матриц.
    const timer = setTimeout(() => {
      setEntranceFinished(true);
    }, 1400);

    // Эффект фотокамеры: через 1.1с (когда блок фото команды ровно встал на место)
    // срабатывает эффект «чик — и сделан кадр»: яркая вспышка и микро-отдача объектива
    const flashTimer = setTimeout(() => {
      setIsSnapFlashed(true);
      const resetFlash = setTimeout(() => setIsSnapFlashed(false), 600);
      return () => clearTimeout(resetFlash);
    }, 1100);

    return () => {
      clearTimeout(timer);
      clearTimeout(flashTimer);
    };
  }, [isPreloaderActive]);

  const triggerManualSnapshot = () => {
    setIsSnapFlashed(true);
    setSnapTriggerCount((c) => c + 1);
    setTimeout(() => setIsSnapFlashed(false), 600);
  };

  const handleReturnToHome = () => {
    setIsNavOpen(false);
    window.location.href = '/#projects';
  };

  const handleToggleNav = () => {
    setIsNavOpen((prev) => {
      const next = !prev;
      if (next) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181818] flex flex-col font-sans selection:bg-[#8FE06E] selection:text-[#181818] antialiased">
      {/* 
        ========================================================================
        HERO SECTION (ПЕРВАЯ СЕКЦИЯ / ГЛАВНЫЙ ЭКРАН)
        - Занимает строго 100% всей площади экрана (100dvh) по высоте и по ширине
        - Фирменный персиковый фон (#FFAD85)
        - Каскадное появление с эффектом физического примагничивания (Magnetic Snap)
        ========================================================================
      */}
      <section 
        id="hero-section" 
        style={{
          width: '100%',
          maxWidth: '100vw',
        }}
        className="w-full h-[100dvh] max-h-[100dvh] bg-[#FFAD85] p-2 sm:p-2.5 md:p-3 lg:p-4 flex flex-col overflow-hidden box-border shrink-0"
      >
        <div className="hero-main-container w-full h-full flex-1 flex flex-col gap-2 sm:gap-2.5 lg:gap-3.5 min-h-0 overflow-hidden">
          {/* 1. Хедер: выезжает слева направо */}
          <div className={`w-full shrink-0 z-40 relative ${!entranceFinished ? 'animate-slide-header' : ''}`}>
            <Header 
              onOpenResume={() => setIsResumeOpen(true)} 
              onReturnToHome={handleReturnToHome}
              isNavOpen={isNavOpen}
              onToggleNav={handleToggleNav}
            />
          </div>

          {/* Main Hero Bento Grid: 2 колонки на десктопе, расширенная левая карточка на планшетах */}
          <div className="hero-bento-grid flex-1 grid grid-cols-1 sm:grid-cols-[1.18fr_0.82fr] sm:grid-rows-[1fr_auto_auto_auto] lg:grid-cols-2 lg:grid-rows-none gap-2 sm:gap-2.5 lg:gap-3.5 min-h-0 overflow-hidden">
            {/* Left Column: Unwraps on tablet (contents) and forms a 2-column flex on desktop */}
            <div className="hero-left-column contents lg:flex lg:flex-col lg:gap-2.5 lg:gap-3.5 lg:min-h-0 lg:h-full lg:overflow-hidden">
              {/* 2a. Верхний левый блок: выезжает снизу вверх */}
              <div 
                className={`hero-card-brand order-1 sm:col-span-1 bg-[#F1F1F1] rounded-xl p-3 sm:p-3.5 md:p-3.5 lg:p-6 flex flex-col justify-between border border-black/5 shadow-xs relative overflow-hidden min-h-0 sm:h-full lg:flex-1 ${
                  !entranceFinished ? 'animate-slide-left' : ''
                }`}
              >
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4 z-10 relative max-w-[58%] sm:max-w-[58%] md:max-w-[58%] lg:max-w-[58%] xl:max-w-none">
                  {/* Meta Chips: 2026 год идет вторым, а Томский государственный университет размещен на одной строке */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs sm:text-xs md:text-sm font-normal bg-[#FFAD85] text-[#181818] shadow-2xs shrink-0">
                      Концепт
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs sm:text-xs md:text-sm font-normal bg-white text-[#181818] border border-black/5 shadow-2xs shrink-0">
                      2026&nbsp;год
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs sm:text-xs md:text-sm font-normal bg-white text-[#181818] border border-black/5 shadow-2xs whitespace-nowrap shrink-0">
                      Томский государственный университет
                    </span>
                  </div>

                  {/* Main Hero Headline with Typewriter Effect */}
                  <h1 className="text-2xl sm:text-3xl md:text-[28px] lg:text-[38px] xl:text-[52px] font-semibold text-[#181818] tracking-tight leading-[1.12] max-w-xl whitespace-pre-line relative grid grid-cols-1 grid-rows-1">
                    {/* Слой-распорка: держит 100% высоты заголовка сразу при загрузке */}
                    <span className="invisible pointer-events-none select-none col-start-1 row-start-1" aria-hidden="true">
                      {fullHeadline}
                    </span>

                    {/* Видимый печатающийся заголовок с предрассчитанным переносом */}
                    <span className="col-start-1 row-start-1">
                      {renderStableTypewriterSpan(
                        fullHeadline,
                        typedHeadlineCount,
                        !isTypingComplete,
                        'bg-[#181818]'
                      )}
                    </span>
                  </h1>

                  {/* Author Subtitle with Animated Green Marker Highlight */}
                  <div className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-[#181818] space-y-0.5">
                    <p className="text-[#181818]/70 font-normal text-xs sm:text-xs md:text-sm lg:text-sm">Разработано и&nbsp;упаковано</p>
                    <div>
                      <span className="mark-green-animated font-medium tracking-tight text-sm sm:text-base md:text-base lg:text-lg">
                        Михаилом Бачинским
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Изучить кейс — привязана непосредственно к тексту */}
                  <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 z-10 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const nextSection = document.getElementById('goals-section');
                        if (nextSection) {
                          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg bg-[#181818] text-white hover:bg-black font-medium text-xs sm:text-sm md:text-sm lg:text-base transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 shadow-2xs group cursor-pointer"
                    >
                      <span>Изучить кейс</span>
                      {/* Эффектное вытекание стрелки вниз-вправо из контейнера-фрейма */}
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative overflow-hidden flex items-center justify-center shrink-0">
                        <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 absolute transition-all duration-500 ease-out group-hover:translate-x-full group-hover:translate-y-full group-hover:opacity-0" />
                        <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 absolute transition-all duration-500 ease-out -translate-x-full -translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Векторная надпись "Hello there" для вертикальной мобилки: отцентрирована по вертикали в свободном месте под кнопкой, увеличен отступ слева pl-6 */}
                <div className="sm:hidden flex-1 min-h-[44px] flex items-center justify-start z-0 pointer-events-none select-none pl-6 pt-1 pb-0.5">
                  <div className="w-[42%] min-w-[135px] max-w-[175px] opacity-90 transform -rotate-7 origin-center">
                    <img
                      src="/assets/hero-hello-vector.svg"
                      alt="Hello there"
                      decoding="async"
                      className="w-full h-auto object-contain drop-shadow-2xs"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'block';
                      }}
                    />
                    <div className="hidden w-full h-auto">
                      <HelloDoodleVector className="w-full h-auto object-contain" />
                    </div>
                  </div>
                </div>

                {/* Кастомный вектор (белка): изолирован в правой 38% колонке */}
                <div className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2 lg:right-4 lg:bottom-3 pointer-events-none z-0 flex items-end justify-end select-none h-[68%] sm:h-[72%] md:h-[74%] lg:h-[78%] xl:h-[80%] max-h-[460px] w-[36%] sm:w-[38%] md:w-[38%] lg:w-[38%] xl:w-auto xl:max-w-[45%]">
                  <img
                    src="/assets/hero-left-vector.svg"
                    alt="Декоративный персонаж (белка)"
                    decoding="async"
                    className="max-h-full max-w-full w-auto h-auto object-contain object-right-bottom drop-shadow-2xs opacity-95"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* 2b. 3 отдельных независимых блока спецификации — порядок 2 (привязаны к нижней границе главного блока) */}
              <div className="hero-card-specs order-2 sm:col-span-2 lg:col-span-1 grid grid-cols-3 gap-1.5 sm:gap-2.5 lg:gap-3.5 shrink-0 h-auto">
                <div 
                  className={`bg-[#F1F1F1] rounded-xl p-2 sm:px-2.5 sm:py-2 md:p-2.5 lg:p-3.5 border border-black/5 shadow-xs flex flex-col justify-center items-start text-left h-auto ${
                    !entranceFinished ? 'animate-slide-bottom-left' : ''
                  }`}
                >
                  <span className="text-xs sm:text-xs md:text-xs lg:text-xs text-[#737373] font-normal block text-left leading-none">
                    (роль)
                  </span>
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-[#181818] block mt-1 truncate text-left leading-tight">
                    Solo Designer
                  </span>
                </div>

                <div 
                  className={`bg-[#F1F1F1] rounded-xl p-2 sm:px-2.5 sm:py-2 md:p-2.5 lg:p-3.5 border border-black/5 shadow-xs flex flex-col justify-center items-start text-left h-auto ${
                    !entranceFinished ? 'animate-slide-bottom' : ''
                  }`}
                >
                  <span className="text-xs sm:text-xs md:text-xs lg:text-xs text-[#737373] font-normal block text-left leading-none">
                    (сроки)
                  </span>
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-[#181818] block mt-1 truncate text-left leading-tight">
                    2&nbsp;недели
                  </span>
                </div>

                <div 
                  className={`bg-[#F1F1F1] rounded-xl p-2 sm:px-2.5 sm:py-2 md:p-2.5 lg:p-3.5 border border-black/5 shadow-xs flex flex-col justify-center items-start text-left h-auto ${
                    !entranceFinished ? 'animate-slide-bottom-right' : ''
                  }`}
                >
                  <span className="text-xs sm:text-xs md:text-xs lg:text-xs text-[#737373] font-normal block text-left leading-none">
                    (инструменты)
                  </span>
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-[#181818] block mt-1 truncate text-left leading-tight">
                    Figma, AI, PS
                  </span>
                </div>
              </div>

              {/* 2c. Информационная лента результативности (Ticker Результаты) — порядок 3 (в самом низу левой колонки) */}
              <div 
                className={`hero-card-ticker order-3 w-full sm:col-span-2 lg:col-span-1 bg-[#8FE06E] text-[#181818] rounded-xl pl-2.5 sm:pl-3 pr-0 py-1.5 sm:py-1.5 lg:py-2 border border-black/10 shadow-2xs flex items-center overflow-hidden shrink-0 h-auto self-stretch lg:self-auto whitespace-nowrap ${
                  !entranceFinished ? 'animate-slide-bottom' : ''
                }`}
              >
                <div className="flex items-center gap-1.5 shrink-0 pr-2.5 sm:pr-3 border-r border-black/15 z-20 bg-[#8FE06E] whitespace-nowrap">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base text-[#181818] font-extrabold tracking-tight whitespace-nowrap leading-tight">
                    Проектный эффект:
                  </span>
                </div>

                {/* Бегущая информационная строка результатов с плавным градиентным размытием по краям */}
                <div className="flex-1 overflow-hidden relative flex items-center select-none ml-1.5 sm:ml-2 whitespace-nowrap">
                  {/* Плавное растворение границ ухода текста в плашку (градиентный туман слева и справа без скругляющих артефактов) */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#8FE06E] via-[#8FE06E]/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-l from-[#8FE06E] via-[#8FE06E] to-transparent z-10 pointer-events-none" />

                  <div className="animate-hero-ticker flex items-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-sm lg:text-base font-medium tracking-tight whitespace-nowrap px-2">
                    {/* Набор 1 */}
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">+18%</span>
                      <span className="text-[#181818]/90 font-medium">обращений во ВК</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">~40 мин</span>
                      <span className="text-[#181818]/90 font-medium">на пост</span>
                      <span className="text-[#181818]/80 text-[10px] sm:text-xs font-normal bg-white/85 px-1.5 py-[1px] rounded-md border border-black/10 shrink-0 inline-flex items-center leading-none">(было 2,5+ ч)</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">охват 2&nbsp;300+</span>
                      <span className="text-[#181818]/90 font-medium">студентов</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">в&nbsp;2.6&nbsp;раза</span>
                      <span className="text-[#181818]/90 font-medium">больше реакций</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>

                    {/* Набор 2 (дубликат для бесконечного зацикливания) */}
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">+18%</span>
                      <span className="text-[#181818]/90 font-medium">обращений во ВК</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">~40 мин</span>
                      <span className="text-[#181818]/90 font-medium">на пост</span>
                      <span className="text-[#181818]/80 text-[10px] sm:text-xs font-normal bg-white/85 px-1.5 py-[1px] rounded-md border border-black/10 shrink-0 inline-flex items-center leading-none">(было 2,5+ ч)</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">охват 2&nbsp;300+</span>
                      <span className="text-[#181818]/90 font-medium">студентов</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span className="font-bold text-[#181818]">в&nbsp;2.6&nbsp;раза</span>
                      <span className="text-[#181818]/90 font-medium">больше реакций</span>
                    </span>
                    <span className="text-[#181818]/35 font-bold shrink-0">•</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Unwraps on tablet (contents) and forms right column on desktop */}
            <div className="hero-right-column contents lg:relative lg:block lg:min-h-0 lg:h-full lg:overflow-hidden lg:rounded-xl">
              {/* Two Stacked Bento Cards: dynamically squashed towards the left on desktop when nav opens */}
              <div 
                className="contents lg:flex lg:flex-col lg:gap-2.5 lg:gap-4 lg:w-full lg:h-full lg:min-h-0 lg:overflow-hidden transition-transform duration-700"
                style={{
                  transformOrigin: 'left center',
                  transform: isNavOpen ? 'scaleX(0)' : 'scaleX(1)',
                  transitionTimingFunction: 'cubic-bezier(0.18, 1.25, 0.32, 1)',
                  pointerEvents: isNavOpen ? 'none' : 'auto',
                }}
              >
                {/* 3a. Верхний правый блок: выезжает справа налево (Hello Vector) — скрыт на вертикальной мобилке */}
                <div 
                  className={`hero-card-hello order-2 hidden sm:flex sm:col-span-1 bg-[#F1F1F1] rounded-xl p-2.5 sm:p-3 md:p-3.5 lg:p-4 items-center justify-center border border-black/5 shadow-xs overflow-hidden relative min-h-0 sm:h-full lg:flex-1 ${
                    !entranceFinished ? 'animate-slide-right-top' : ''
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <div className={!entranceFinished ? 'animate-hello-doodle w-full h-full flex items-center justify-center' : 'w-full h-full flex items-center justify-center'}>
                      <img
                        src="/assets/hero-hello-vector.svg"
                        alt="Hello Vector"
                        decoding="async"
                        className="w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[540px] max-h-full h-auto object-contain select-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) (fallback as HTMLElement).style.display = 'block';
                        }}
                      />
                      <div className="hidden">
                        <HelloDoodleVector className="w-full max-w-[480px] max-h-full h-auto object-contain select-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3b. Блок фото команды: порядок 5 (в самом низу), подстраивается по высоте без обрезания фото */}
                <div 
                  onClick={triggerManualSnapshot}
                  className={`hero-card-team order-5 sm:col-span-2 lg:col-span-1 bg-[#F1F1F1] rounded-xl overflow-hidden border border-black/5 shadow-xs relative aspect-[2752/1536] lg:aspect-none lg:h-full lg:flex-1 flex items-center justify-center group cursor-pointer select-none ${
                    !entranceFinished ? 'animate-slide-right-bottom' : ''
                  }`}
                  data-tooltip="Нажмите, чтобы сделать кадр 📸"
                >
                  {/* Контейнер фото с оптической отдачей объектива при щелчке */}
                  <div className={`w-full h-full relative flex items-center justify-center ${isSnapFlashed ? 'animate-snap-recoil' : ''}`}>
                    {!teamImageError ? (
                      <img
                        key={snapTriggerCount}
                        src="/assets/team-selfie.webp"
                        alt="Фотография команды"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('/team-selfie.webp')) {
                            target.src = '/assets/team-selfie.webp';
                          } else if (!target.src.includes('/team-selfie.png')) {
                            target.src = '/assets/team-selfie.png';
                          } else {
                            setTeamImageError(true);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full p-6 bg-[#F1F1F1] flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#181818]/40 shadow-2xs">
                          <Camera className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-xs font-normal text-[#181818]/50">
                          team-selfie.webp
                        </span>
                      </div>
                    )}

                    {/* Яркая вспышка затвора камеры («ЧИК») */}
                    {isSnapFlashed && (
                      <div 
                        className="absolute inset-0 bg-white z-20 pointer-events-none animate-shutter-flash" 
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide-in Hero Navigation Panel: slides in to cover the bento grid area from top card to bottom photo card */}
            <HeroNavigationPanel
              isOpen={isNavOpen}
              onClose={() => setIsNavOpen(false)}
              onOpenResume={() => setIsResumeOpen(true)}
              onReturnToHome={handleReturnToHome}
            />
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECOND SECTION: ЦЕЛЬ И ЗАДАЧИ
        ========================================================================
      */}
      <main className="w-full">
        <GoalsSection />
      </main>

      {/* 
        ========================================================================
        THIRD SECTION: МЕТАФОРА ЛОГОТИПА (ПАЗЛЫ)
        ========================================================================
      */}
      <PuzzleSection />

      {/* 
        ========================================================================
        FOURTH SECTION: ЦВЕТА АЙДЕНТИКИ (ВИНДОУ-КОНТЕЙНЕР)
        ========================================================================
      */}
      <ColorsSection />

      {/* 
        ========================================================================
        FIFTH SECTION: ШРИФТ (ВИНДОУ-КОНТЕЙНЕР)
        ========================================================================
      */}
      <TypographySection />

      {/* 
        ========================================================================
        SIXTH SECTION: ПАТТЕРН (ЕДИНЫЙ ХОЛСТ С ДИАГОНАЛЬНЫМ ПАЗЛОМ)
        ========================================================================
      */}
      <PatternSection />

      {/* 
        ========================================================================
        SEVENTH SECTION: ИКОНКИ (ВИНДОУ-КОНТЕЙНЕР ПО РЕФЕРЕНСУ)
        ========================================================================
      */}
      <IconsSection />

      {/* 
        ========================================================================
        EIGHTH SECTION: ИЛЛЮСТРАЦИИ (ЦИФРОВАЯ РИЗОГРАФИЯ + ПЛАШКИ ПО РЕФЕРЕНСУ)
        ========================================================================
      */}
      <IllustrationsSection />

      {/* 
        ========================================================================
        NINTH SECTION: МАСКОТ (СИМВОЛ КАМПУСА ПО РЕФЕРЕНСУ)
        ========================================================================
      */}
      <MascotSection />

      {/* 
        ========================================================================
        TENTH SECTION: ВНЕДРЕНИЕ (АВТОНОМНЫЙ AI-ПАЙПЛАЙН ДЛЯ ТЬЮТОРОВ)
        ========================================================================
      */}
      <ImplementationSection />

      {/* 
        ========================================================================
        ELEVENTH SECTION: ЦИФРОВАЯ СРЕДА (ОФОРМЛЕНИЕ ВК: ДЕСКТОП 2/3 + МОБИЛЬНЫЙ 1/3)
        ========================================================================
      */}
      <DigitalEnvironmentSection />

      {/* 
        ========================================================================
        ELEVENTH SECTION: ФИЗИЧЕСКАЯ СРЕДА (ПРОПОРЦИОНАЛЬНАЯ БЕНТО-СЕТКА МЕРЧА)
        ========================================================================
      */}
      <PhysicalEnvironmentSection />

      {/* 
        ========================================================================
        TWELFTH SECTION: ИТОГИ ДИЗАЙН-КЕЙСА (РЕЗУЛЬТАТ, ОТЗЫВ ЗАКАЗЧИКА И АВТОР)
        ========================================================================
      */}
      <CaseConclusionSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* 
        ========================================================================
        THIRTEENTH SECTION: КОНТАКТЫ И ФОРМА ДЛЯ ОТПРАВКИ СООБЩЕНИЯ
        ========================================================================
      */}
      <ContactSection 
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onOpenConsent={() => setIsConsentOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 
        ========================================================================
        ПОДВАЛ САЙТА (FOOTER): НАВИГАЦИЯ, ДИЗАЙН-КЕЙСЫ И КОНТАКТЫ
        ========================================================================
      */}
      <Footer 
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onOpenConsent={() => setIsConsentOpen(true)}
      />

      {/* Floating Design Scrollbar (Overlay track across all sections) */}
      <FloatingScrollbar />

      {/* Custom Design Cursor */}
      <CustomCursor />

      {/* Custom Branded Tooltip System */}
      <CustomTooltip />

      {/* Global Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Legal Modals */}
      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
      <ConsentModal isOpen={isConsentOpen} onClose={() => setIsConsentOpen(false)} />

      {/* Branded Case Preloader for Tutor Service Page */}
      <CasePreloader onComplete={() => setIsPreloaderActive(false)} />
    </div>
  );
}
