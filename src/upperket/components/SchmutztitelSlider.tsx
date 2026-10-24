import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  RotateCcw, 
  X, 
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';
import { CASE_STUDY_DATA, ChapterData } from '../data/caseStudyData';

export interface SchmutztitelItem {
  id: number;
  chapterNumber: number;
  numberStr: string;
  title: string;
  nativeTitle: string;
  subtitle: string;
  description: string;
  pageNumber: number;
  imageSrc: string;
  color: string;
  patternName: string;
  patternType: string;
  patternMeaning: string;
}

export const SCHMUTZTITEL_DATA: SchmutztitelItem[] = [
  {
    id: 1,
    chapterNumber: 1,
    numberStr: '1',
    title: 'Семья',
    nativeTitle: 'Ӄумыш энд Со̄лькуп',
    subtitle: 'Родственные связи и семейный очаг',
    description: 'Раздел рассказывает о семейном укладе, уважении к старшим, передаче таёжного опыта и воспитании детей.',
    pageNumber: 7,
    imageSrc: '/sections/family.svg',
    color: '#8D6E63',
    patternName: 'Речные струи (Кэ̄т ӱт)',
    patternType: 'river',
    patternMeaning: 'Символ безостановочного течения жизни и преемственности поколений.',
  },
  {
    id: 2,
    chapterNumber: 2,
    numberStr: '2',
    title: 'Одежда',
    nativeTitle: 'Па̄рӄа энд Пимы',
    subtitle: 'Традиционный гардероб и обувь',
    description: 'Парка из сукна и шкур, бисерные узоры, медные подвески и чижи, защищающие от пятидесятиградусных морозов.',
    pageNumber: 16,
    imageSrc: '/sections/clothing.svg',
    color: '#8A7F60',
    patternName: 'Солнечная розетка (Че̄ль)',
    patternType: 'sun',
    patternMeaning: 'Круговой обережный узор на груди парки, защищающий сердце от холода.',
  },
  {
    id: 3,
    chapterNumber: 3,
    numberStr: '3',
    title: 'Жилище',
    nativeTitle: 'Мот энд Карамо',
    subtitle: 'Чум, карамо и берестяные постройки',
    description: 'Устройство шестового берестяного чума, зимней полуземлянки и правила хранения священного таёжного огня.',
    pageNumber: 34,
    imageSrc: '/sections/dwelling.svg',
    color: '#5D4037',
    patternName: 'Чум и очаг (Мот ӱй)',
    patternType: 'chum',
    patternMeaning: 'Треугольный орнамент стойкости дома и защиты семьи от пуги.',
  },
  {
    id: 4,
    chapterNumber: 4,
    numberStr: '4',
    title: 'География',
    nativeTitle: 'Челвэл энд Кэ̄т',
    subtitle: 'Реки, тайга и ландшафт Верхнекетья',
    description: 'Топонимика речных проток, великая Кеть, святилища и древние урочища бассейна Оби и Кети.',
    pageNumber: 42,
    imageSrc: '/sections/geography.svg',
    color: '#5D554D',
    patternName: 'Речные струи (Кэ̄т ӱт)',
    patternType: 'river',
    patternMeaning: 'Символ безостановочного течения реки, кормящей рыбой.',
  },
  {
    id: 5,
    chapterNumber: 5,
    numberStr: '5',
    title: 'Флора',
    nativeTitle: 'Мач энд Ӄон',
    subtitle: 'Таёжные травы, деревья и ягоды',
    description: 'Почитание кедра-великана, сбор ореха, целебные свойства лиственничной смолы и дикоросы.',
    pageNumber: 56,
    imageSrc: '/sections/flora.svg',
    color: '#556B2F',
    patternName: 'Кедровая шишка (Ӄон пе̄р)',
    patternType: 'cedar',
    patternMeaning: 'Ромбический орнамент изобилия и вечной жизни таёжного древа.',
  },
  {
    id: 6,
    chapterNumber: 6,
    numberStr: '6',
    title: 'Фауна',
    nativeTitle: 'Мачиль ӄор энд Воргол',
    subtitle: 'Звери, птицы и лесные обитатели',
    description: 'Хозяин тайги медведь, соболь, лось, олень и заяц. Повадки зверей и таёжное уважение к природе.',
    pageNumber: 65,
    imageSrc: '/sections/fauna.svg',
    color: '#37474F',
    patternName: 'Оленьи рога (По̄р пар)',
    patternType: 'horns',
    patternMeaning: 'Символ грации, быстроты и связи с верхним миром.',
  },
  {
    id: 7,
    chapterNumber: 7,
    numberStr: '7',
    title: 'Инструменты и материалы',
    nativeTitle: 'То̄й энд Ӄон ка̄н',
    subtitle: 'Орудия труда и обработка бересты',
    description: 'Тиснение по бересте, изготовление туесов, чуманов и плетёной утвари из корней сибирского кедра.',
    pageNumber: 77,
    imageSrc: '/sections/tools.svg',
    color: '#8C7B38',
    patternName: 'Берестяной ромб (То̄й кар)',
    patternType: 'birch',
    patternMeaning: 'Сетка плотности и герметичности берестяного сосуда.',
  },
  {
    id: 8,
    chapterNumber: 8,
    numberStr: '8',
    title: 'Оленеводство',
    nativeTitle: 'По̄р энд Нюде',
    subtitle: 'Нарты, упряжь и таёжное стадо',
    description: 'Северный олень как верный спутник, правила запряжки нарт и кочевой путь по таёжным настам.',
    pageNumber: 88,
    imageSrc: '/sections/reindeer.svg',
    color: '#2E4C40',
    patternName: 'Олений след (По̄р со̄л)',
    patternType: 'footprint',
    patternMeaning: 'Символ неутомимого движения кочевника по снежным просторам.',
  },
  {
    id: 9,
    chapterNumber: 9,
    numberStr: '9',
    title: 'Охота',
    nativeTitle: 'Ӄан энд То̄лы',
    subtitle: 'Капканы, луки и промысловые тропы',
    description: 'Законы таёжного промысла, подбитые камусом лыжи-подволоки и ориентация в зимнем лесу.',
    pageNumber: 96,
    imageSrc: '/sections/hunting.svg',
    color: '#924A45',
    patternName: 'Лыжный след (По̄кы со̄л)',
    patternType: 'footprint',
    patternMeaning: 'Зигзагообразная линия неутомимого охотничьего пути.',
  },
  {
    id: 10,
    chapterNumber: 10,
    numberStr: '10',
    title: 'Рыболовство',
    nativeTitle: 'Ӄуле энд Обласок',
    subtitle: 'Сети, обласки и речные запоры',
    description: 'Плетение сетей из крапивного волокна, долблёные лодки-обласки и добыча стерляди на реке Кеть.',
    pageNumber: 102,
    imageSrc: '/sections/fishing.svg',
    color: '#455A64',
    patternName: 'Лодка-обласок (Ӱт мач)',
    patternType: 'boat',
    patternMeaning: 'Символ лёгкого движения по речным плёсам и затонам.',
  },
  {
    id: 11,
    chapterNumber: 11,
    numberStr: '11',
    title: 'Традиционные блюда',
    nativeTitle: 'Ма̄н энд Ко̄пчы',
    subtitle: 'Юкола, строганина и таёжные рецепты',
    description: 'Заготовка вяленой рыбы на солнце, сушка таёжных ягод и заваривание целебных травяных чаёв.',
    pageNumber: 113,
    imageSrc: '/sections/dishes.svg',
    color: '#7E4E58',
    patternName: 'Рыбья чешуя',
    patternType: 'fish',
    patternMeaning: 'Орнамент изобилия и сытного рыбного стола.',
  },
  {
    id: 12,
    chapterNumber: 12,
    numberStr: '12',
    title: 'Духовная культура',
    nativeTitle: 'Нум энд Иччи',
    subtitle: 'Мифология, обряды и верования',
    description: 'Трёхчастный мир, духи-хранители, предания о богатыре Иччи и праздники благодарения тайги.',
    pageNumber: 128,
    imageSrc: '/sections/spiritual.svg',
    color: '#514561',
    patternName: 'Небесные духи (Нум то̄т)',
    patternType: 'aurora',
    patternMeaning: 'Символ небесного свода, солнца и звёздного пути предков.',
  }
];

interface SchmutztitelSliderProps {
  onSelectChapter?: (chapterId: number) => void;
}

export const SchmutztitelSlider: React.FC<SchmutztitelSliderProps> = ({ onSelectChapter }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<SchmutztitelItem | null>(null);
  const [perspectiveMode, setPerspectiveMode] = useState<'wave' | 'cascade' | 'arch'>('wave');
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalItem(null);
      setIsClosing(false);
    }, 320);
  };

  // Запрет скролла страницы при открытом модальном окне
  useEffect(() => {
    if (modalItem) {
      const prevBody = document.body.style.overflow;
      const prevHtml = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCloseModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevBody;
        document.documentElement.style.overflow = prevHtml;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [modalItem]);

  // Smooth drag state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  // Sync scroll position
  const handleScroll = () => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const current = container.scrollLeft;
    setScrollPos(current);

    // Calculate active item index based on scroll position
    const itemWidth = 260; // Average card width + gap
    const calculatedIdx = Math.min(
      Math.max(Math.round(current / itemWidth), 0),
      SCHMUTZTITEL_DATA.length - 1
    );
    setActiveIndex(calculatedIdx);
  };

  // Continuous auto-scroll loop
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDraggingRef.current) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (trackRef.current) {
        const container = trackRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (maxScroll > 0) {
          container.scrollLeft += 0.5 * (delta / 16.6);
          if (container.scrollLeft >= maxScroll - 2) {
            container.scrollLeft = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlay, isHovered]);

  // Handle Drag / Touch
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Scroll to explicit index
  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const itemWidth = 260;
    trackRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SCHMUTZTITEL_DATA.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SCHMUTZTITEL_DATA.length) % SCHMUTZTITEL_DATA.length;
    scrollToIndex(prevIdx);
  };

  return (
    <section 
      id="schmutztitel-slider" 
      className="py-16 sm:py-24 border-t border-[#1C1C1C]/15 bg-[#F9F7F2] text-[#1C1C1C] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/60">
              <span className="font-semibold text-[#1C1C1C]">12 шмуцтитулов</span>
              <span aria-hidden="true" className="text-[#1C1C1C]/30">/</span>
              <span>Формат А4 (210 × 297 мм)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal text-[#1C1C1C] leading-tight">
              Вылетающие 3d страницы шмуцтитулов
            </h2>

            <p className="text-base text-[#1C1C1C]/75 font-normal leading-relaxed">
              Горизонтальный ряд из 12 полосных шмуцтитулов книги. При&nbsp;прокрутке страницы динамически наклоняются и вращаются в пространстве, имитируя естественный объёмный вылет из переплёта.
            </p>
          </div>

          {/* Interactive Mode & Motion Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-end">
            {/* Mode Switcher */}
            <div className="inline-flex items-center p-1 bg-white border border-[#1C1C1C]/15 rounded-lg shadow-2xs">
              <button
                type="button"
                onClick={() => setPerspectiveMode('wave')}
                className={`px-2.5 py-1 text-xs font-sans rounded transition-all ${
                  perspectiveMode === 'wave'
                    ? 'bg-[#1C1C1C] text-[#F9F7F2] font-medium'
                    : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                }`}
              >
                Волна
              </button>
              <button
                type="button"
                onClick={() => setPerspectiveMode('cascade')}
                className={`px-2.5 py-1 text-xs font-sans rounded transition-all ${
                  perspectiveMode === 'cascade'
                    ? 'bg-[#1C1C1C] text-[#F9F7F2] font-medium'
                    : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                }`}
              >
                Каскад
              </button>
              <button
                type="button"
                onClick={() => setPerspectiveMode('arch')}
                className={`px-2.5 py-1 text-xs font-sans rounded transition-all ${
                  perspectiveMode === 'arch'
                    ? 'bg-[#1C1C1C] text-[#F9F7F2] font-medium'
                    : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                }`}
              >
                Веер
              </button>
            </div>

            {/* AutoPlay Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1C1C]/15 bg-white hover:bg-neutral-100 text-xs font-sans text-[#1C1C1C] transition-all shadow-2xs"
              title={isAutoPlay ? 'Приостановить движение' : 'Запустить автопрокрутку'}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#1C1C1C]/70" />
                  <span>Пауза</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#1C1C1C]/70" />
                  <span>Движение</span>
                </>
              )}
            </button>

            {/* Prev/Next Navigation */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-lg border border-[#1C1C1C]/15 bg-white hover:bg-neutral-100 text-[#1C1C1C] transition-all shadow-2xs"
                aria-label="Предыдущий шмуцтитул"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-sans text-[#1C1C1C]/70 px-2 tabular-nums">
                {activeIndex + 1} / 12
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-lg border border-[#1C1C1C]/15 bg-white hover:bg-neutral-100 text-[#1C1C1C] transition-all shadow-2xs"
                aria-label="Следующий шмуцтитул"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Scroll Perspective Stage */}
        <div 
          ref={containerRef}
          className="relative w-full py-12 px-2 overflow-hidden rounded-2xl bg-gradient-to-b from-white/60 via-[#F9F7F2] to-white/40 border border-[#1C1C1C]/12 shadow-sm"
        >
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1C1C1C_0.7px,transparent_0.7px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

          {/* 3D Perspective Track Container */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              setIsHovered(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
            className="flex gap-7 sm:gap-9 overflow-x-auto no-scrollbar scroll-smooth py-10 px-6 cursor-grab active:cursor-grabbing select-none"
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {SCHMUTZTITEL_DATA.map((item, idx) => {
              // Calculate distance offset relative to current scroll
              const containerWidth = trackRef.current?.clientWidth || 1000;
              const cardOffset = idx * 260 - scrollPos;
              const centerDist = cardOffset - containerWidth / 3;
              const distRatio = Math.min(Math.max(centerDist / 600, -1.5), 1.5);

              // Calculate 3D transforms based on selected perspective mode
              let rotateY = 0;
              let rotateX = 0;
              let rotateZ = 0;
              let translateZ = 0;
              let translateY = 0;

              if (perspectiveMode === 'wave') {
                rotateY = distRatio * -24;
                rotateZ = Math.sin(idx * 0.8) * 3;
                translateY = Math.cos(idx * 0.7) * 12;
                translateZ = Math.max(0, 100 - Math.abs(distRatio) * 70);
              } else if (perspectiveMode === 'cascade') {
                rotateY = -18 + idx * 2.5;
                rotateZ = (idx % 2 === 0 ? 1 : -1) * 3;
                translateY = (idx % 3) * 8 - 12;
                translateZ = (12 - idx) * 8;
              } else if (perspectiveMode === 'arch') {
                rotateY = distRatio * -32;
                rotateX = Math.abs(distRatio) * -8;
                translateZ = Math.max(-50, 120 - Math.abs(distRatio) * 120);
                translateY = Math.abs(distRatio) * 16;
              }

              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setModalItem(item)}
                  className="w-[210px] sm:w-[230px] md:w-[250px] shrink-0 flex flex-col space-y-3.5 group"
                  style={{
                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px) translateY(${translateY}px)`,
                    transformStyle: 'preserve-3d',
                    transition: isDraggingRef.current 
                      ? 'none' 
                      : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                    zIndex: isActive ? 30 : 20 - Math.abs(idx - activeIndex),
                  }}
                >
                  {/* A4 Page Card Container (Aspect Ratio 210/297) */}
                  <div
                    className={`relative aspect-[210/297] rounded-[8px] overflow-hidden p-1.5 sm:p-2 bg-[#23201D] border transition-all duration-300 ${
                      isActive
                        ? 'border-[#1C1C1C] shadow-2xl ring-2 ring-[#1C1C1C]/20'
                        : 'border-[#1C1C1C]/40 shadow-xl group-hover:border-[#1C1C1C] group-hover:shadow-2xl'
                    }`}
                    style={{
                      boxShadow: isActive
                        ? '0 32px 64px -16px rgba(28,28,28,0.45), 0 16px 32px -8px rgba(28,28,28,0.25)'
                        : '0 20px 42px -12px rgba(28,28,28,0.30), 0 10px 22px -8px rgba(28,28,28,0.18)'
                    }}
                  >
                    {/* Inner Paper Mat Sheet */}
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-[#FAF8F3] border border-[#1C1C1C]/20 shadow-inner flex items-center justify-center">
                      {/* Ring binder perforation holes on left margin */}
                      <div className="absolute left-1.5 inset-y-0 flex flex-col justify-around py-6 z-20 pointer-events-none">
                        {[1, 2, 3, 4].map((hole) => (
                          <div key={hole} className="relative flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#E8E1D3] border border-[#1C1C1C]/40 shadow-inner" />
                            <div className="w-1.5 h-[1px] bg-[#1C1C1C]/35 -ml-[1px]" />
                          </div>
                        ))}
                      </div>

                      {/* Book spine crease shadow */}
                      <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-20" />

                      {/* Chapter Accent Pill Badge */}
                      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs border border-[#1C1C1C]/20 shadow-2xs">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-[10px] font-sans font-semibold text-[#1C1C1C] tabular-nums">
                          Глава {item.numberStr}
                        </span>
                      </div>

                      {/* High-Resolution Half-Title Image */}
                      <img
                        src={item.imageSrc}
                        alt={`Шмуцтитул главы ${item.numberStr}: ${item.title}`}
                        className="w-full h-full object-contain block pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="eager"
                      />

                      {/* Diagonal Light Gloss Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none z-10" />

                      {/* Hover Inspect Overlay Action */}
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center p-4 text-white">
                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/95 text-[#1C1C1C] text-xs font-sans font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4 text-[#1C1C1C]" />
                          <span>Открыть шмуцтитул</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="space-y-1 px-1">
                    <div className="flex items-center justify-between text-xs text-[#1C1C1C]/70 font-sans">
                      <span className="font-medium text-[#1C1C1C]">
                        Глава {item.numberStr}
                      </span>
                      <span className="text-[11px] tabular-nums">
                        стр. {item.pageNumber}
                      </span>
                    </div>

                    <h3 className="font-editorial text-base text-[#1C1C1C] leading-snug group-hover:text-[#1C1C1C] transition-colors">
                      «{item.title}»
                    </h3>

                    <p className="text-[11px] text-[#1C1C1C]/65 font-sans leading-tight line-clamp-1">
                      {item.nativeTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Interactive Navigation Strip (12 Chapter Quick Jump Buttons) */}
          <div className="mt-6 pt-5 border-t border-[#1C1C1C]/10 flex flex-wrap items-center justify-between gap-3 px-3">
            <div className="text-xs font-sans text-[#1C1C1C]/60 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1C1C1C]/60" />
              <span>Быстрый переход к главе:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {SCHMUTZTITEL_DATA.map((ch, i) => {
                const isCurrent = i === activeIndex;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    className={`px-2.5 py-1 text-xs font-sans rounded-md transition-all flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-[#1C1C1C] text-[#F9F7F2] font-semibold shadow-2xs'
                        : 'bg-white hover:bg-neutral-100 text-[#1C1C1C]/70 hover:text-[#1C1C1C] border border-[#1C1C1C]/12'
                    }`}
                  >
                    <span className="tabular-nums">{ch.numberStr}</span>
                    <span className="hidden sm:inline text-[11px] font-normal opacity-80">
                      «{ch.title}»
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Modal for Selected Schmutztitel */}
      {modalItem && createPortal(
        <div 
          className={`fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-pointer transition-opacity duration-300 ${
            isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={`bg-[#F9F7F2] border border-[#1C1C1C]/20 rounded-2xl max-w-4xl w-full max-h-[90dvh] flex flex-col shadow-2xl relative my-auto cursor-default overflow-hidden ${
              isClosing ? 'm3-exit-smooth' : 'm3-enter-smooth'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: pinned top bar with close button */}
            <div className="sticky top-0 z-10 bg-[#FAF8F5] border-b border-[#1C1C1C]/15 px-5 sm:px-8 py-4 flex items-center justify-between shrink-0">
              <div className="space-y-0.5 min-w-0 pr-4">
                <div className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/60 flex-wrap">
                  <span className="font-semibold text-[#1C1C1C]">Глава {modalItem.numberStr}</span>
                  <span aria-hidden="true" className="text-[#1C1C1C]/30">·</span>
                  <span>Полоса {modalItem.pageNumber}</span>
                  <span aria-hidden="true" className="text-[#1C1C1C]/30">·</span>
                  <span className="italic">{modalItem.nativeTitle}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] truncate">
                  «{modalItem.title}»
                </h3>
              </div>

              {/* Modal Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-white hover:bg-neutral-200 border border-[#1C1C1C]/15 text-[#1C1C1C] transition-colors shrink-0 cursor-pointer shadow-2xs"
                aria-label="Закрыть окно"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Column: Hi-Res A4 Half-Title Preview */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="relative aspect-[210/297] w-full max-w-[320px] rounded-lg overflow-hidden bg-[#282522] p-1.5 border border-[#1C1C1C]/30 shadow-xl">
                    {/* Perforation Holes */}
                    <div className="absolute left-3 inset-y-0 flex flex-col justify-around py-8 z-20 pointer-events-none">
                      {[1, 2, 3, 4].map((hole) => (
                        <div key={hole} className="relative flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#EFE8D8] border border-[#1C1C1C]/40 shadow-inner" />
                          <div className="w-2 h-[1px] bg-[#1C1C1C]/35 -ml-[1px]" />
                        </div>
                      ))}
                    </div>

                    {/* Spine Crease */}
                    <div className="absolute inset-y-0 left-1 w-6 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-20" />

                    <img
                      src={modalItem.imageSrc}
                      alt={`Шмуцтитул «${modalItem.title}»`}
                      className="w-full h-full object-cover block rounded-sm"
                    />
                  </div>
                </div>

                {/* Right Column: Chapter Details */}
                <div className="md:col-span-6 space-y-5 font-sans">
                  <div className="space-y-2">
                    <div className="text-xs text-[#1C1C1C]/60 font-medium">Подзаголовок главы</div>
                    <div className="text-base font-editorial text-[#1C1C1C]">
                      {modalItem.subtitle}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#1C1C1C]/60 font-medium">Описание раздела</div>
                    <p className="text-sm text-[#1C1C1C]/80 leading-relaxed font-normal">
                      {modalItem.description}
                    </p>
                  </div>

                  {/* Ornament details */}
                  <div className="p-4 bg-white border border-[#1C1C1C]/12 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#1C1C1C]/60">
                      <span>Орнамент главы:</span>
                      <span className="font-semibold text-[#1C1C1C]">{modalItem.patternName}</span>
                    </div>
                    <p className="text-xs text-[#1C1C1C]/75 leading-normal">
                      {modalItem.patternMeaning}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {onSelectChapter && (
                      <button
                        type="button"
                        onClick={() => {
                          const chapId = modalItem.chapterNumber;
                          handleCloseModal();
                          setTimeout(() => {
                            onSelectChapter(chapId);
                          }, 300);
                        }}
                        className="px-4 py-2.5 bg-[#1C1C1C] text-[#F9F7F2] text-xs font-sans font-medium rounded-lg hover:bg-[#1C1C1C]/85 transition-colors shadow-sm cursor-pointer"
                      >
                        Открыть развороты главы {modalItem.numberStr}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
