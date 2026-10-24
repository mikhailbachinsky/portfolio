import React, { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Trees, Hourglass, Flame, FileText, Volume2, FolderArchive } from 'lucide-react';
import { InformationArchitecture } from './InformationArchitecture';
import { DesignSystem } from './DesignSystem';
import { SummarySection } from './SummarySection';
import { ProductionSection } from './ProductionSection';
import { ImpactSection } from './ImpactSection';
import { AuthorsSection } from './AuthorsSection';
import { ReviewsSection } from './ReviewsSection';

const MUSEUM_PHOTOS = [
  {
    src: '/museum-photos/museum_boat_model.webp',
    alt: 'Деревянный макет лодки-обласка в мини-музее «Затёски»'
  },
  {
    src: '/museum-photos/museum_chum_model.webp',
    alt: 'Экспозиция деревянного макета традиционного чума в музее «Затёски»'
  },
  {
    src: '/museum-photos/museum_birch_model.webp',
    alt: 'Берестяные туеса и традиционная утварь в экспозиции музея'
  }
];

interface SwissEditorialSectionsProps {
  onOpenSpread?: (chapterId: number) => void;
}

export const SwissEditorialSections: React.FC<SwissEditorialSectionsProps> = () => {
  const challengesCardsRef = useRef<HTMLDivElement | null>(null);
  const [challengesVisible, setChallengesVisible] = useState(false);

  useEffect(() => {
    if (!challengesCardsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChallengesVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 120px 0px' }
    );
    observer.observe(challengesCardsRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="w-full bg-[#F9F7F2] text-[#1C1C1C] relative z-20">
      
      {/* 1. Обзор проекта */}
      <section 
        id="overview" 
        className="relative z-20 bg-[#F9F7F2] border-t border-[#1C1C1C]/15"
        style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
            
            {/* Левая функциональная зона: 3 колонки (grid-column: 1 / 4) со sticky-фиксацией */}
            <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Культурное наследие
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Контекст проекта
              </h2>
            </div>

            {/* Правая функциональная зона: 8 колонок (grid-column: 5 / 13), начиная с 5-й */}
            <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-10 lg:space-y-12">
              
              {/* Основной нарратив */}
              <div className="space-y-6">
                 <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                   Школьный мини-музей «Затёски» хранит материальную и&nbsp;духовную культуру <strong className="font-normal text-[#4A7A28]">селькупов</strong>, <strong className="font-normal text-[#007A8A]">эвенков</strong> и&nbsp;<strong className="font-normal text-[#A0522D]">кетов</strong>. Здесь инициативная группа воплощает наследие народов Томской области в&nbsp;уникальном образовательном пространстве.
                 </p>
                 <p className="text-base sm:text-lg text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty">
                   Создавая деревянные макеты-реконструкции предметов быта и&nbsp;орудий труда, дети обретают живую связь с&nbsp;прошлым. Словарь стал важной вехой: он&nbsp;переводит опыт наглядного моделирования и&nbsp;устных рассказов в&nbsp;формат вдумчивого книжного исследования.
                 </p>
               </div>

              {/* 3 фото музея: горизонтальный ряд из 3 фото с нахлёстом */}
              <div className="pt-2">
                <div className="relative flex flex-row items-center justify-center py-5 sm:py-6 lg:py-8 px-1 overflow-visible w-full max-w-[500px] sm:max-w-[620px] lg:max-w-[880px] mx-auto">
                  
                  {/* Фото 1 (Слева): крафтовый наклон влево */}
                  <div 
                    className="relative z-10 w-[41%] sm:w-[37%] lg:w-[36%] -rotate-[3deg] transition-transform duration-300 ease-out origin-center hover:-rotate-[5deg]"
                    data-tooltip="Шаманский бубен"
                    data-tooltip-sub="Экспонат мини-музея «Затёски»"
                    data-tooltip-category="Экспонат музея"
                    data-tooltip-icon="book"
                  >
                    <div className="overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md border border-[#1C1C1C]/12 aspect-[4/3] bg-transparent m3-image-interactive">
                      <picture className="w-full h-full block overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md">
                        <source srcSet="/museum-photos/museum_boat_model.webp" type="image/webp" />
                        <img 
                          src={MUSEUM_PHOTOS[0].src} 
                          alt="Шаманский бубен в экспозиции мини-музея «Затёски»"
                          className="w-full h-full object-cover object-center block rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md"
                          loading="eager"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedRoot) {
                              target.dataset.triedRoot = 'true';
                              target.src = target.src.replace('/museum-photos/', '/');
                            }
                          }}
                        />
                      </picture>
                    </div>
                  </div>

                  {/* Фото 2 (Центральное: z-20 перекрывает края, -mx-4 sm:-mx-6 lg:-mx-8 scale-105 shadow-md) */}
                  <div 
                    className="relative z-20 w-[53%] sm:w-[48%] lg:w-[46%] rotate-[1.5deg] -mx-4 sm:-mx-6 lg:-mx-8 scale-105 shadow-md transition-transform duration-300 ease-out origin-center hover:scale-110 rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md overflow-hidden bg-transparent"
                    data-tooltip="Кадр после музейного часа"
                    data-tooltip-sub="Школьный краеведческий мини-музей «Затёски»"
                    data-tooltip-category="Экспонат музея"
                    data-tooltip-icon="book"
                  >
                    <div className="overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md border border-[#1C1C1C]/15 aspect-[4/3] bg-transparent m3-image-interactive">
                      <picture className="w-full h-full block overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md bg-transparent">
                        <source srcSet="/museum-photos/museum_chum_model.webp" type="image/webp" />
                        <img 
                          src={MUSEUM_PHOTOS[1].src} 
                          alt="Кадр после музейного часа в мини-музее «Затёски»"
                          className="w-full h-full object-cover object-center block rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md bg-transparent"
                          loading="eager"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedRoot) {
                              target.dataset.triedRoot = 'true';
                              target.src = target.src.replace('/museum-photos/', '/');
                            }
                          }}
                        />
                      </picture>
                    </div>
                  </div>

                  {/* Фото 3 (Справа): крафтовый наклон вправо */}
                  <div 
                    className="relative z-10 w-[41%] sm:w-[37%] lg:w-[36%] rotate-[3deg] transition-transform duration-300 ease-out origin-center hover:rotate-[5deg]"
                    data-tooltip="Макеты охотничьих ловушек"
                    data-tooltip-sub="Традиционные промысловые макеты народов Верхнекетья"
                    data-tooltip-category="Экспонат музея"
                    data-tooltip-icon="book"
                  >
                    <div className="overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md border border-[#1C1C1C]/12 aspect-[4/3] bg-transparent m3-image-interactive">
                      <picture className="w-full h-full block overflow-hidden rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md">
                        <source srcSet="/museum-photos/museum_birch_model.webp" type="image/webp" />
                        <img 
                          src={MUSEUM_PHOTOS[2].src} 
                          alt="Макеты охотничьих ловушек в экспозиции музея"
                          className="w-full h-full object-cover object-center block rounded-tl-sm sm:rounded-tl-md rounded-tr-[32px] sm:rounded-tr-[44px] rounded-bl-[32px] sm:rounded-bl-[44px] rounded-br-sm sm:rounded-br-md"
                          loading="eager"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedRoot) {
                              target.dataset.triedRoot = 'true';
                              target.src = target.src.replace('/museum-photos/', '/');
                            }
                          }}
                        />
                      </picture>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Проблема */}
      <section 
        id="problem" 
        className="border-t border-[#1C1C1C]/15"
        style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-start">
            {/* Левая функциональная зона: 3 колонки (grid-column: 1 / 4) со sticky-фиксацией */}
            <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Ограничения формата
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Проблема
              </h2>
            </div>

            {/* Правая функциональная зона: 8 колонок (grid-column: 5 / 13), начиная с 5-й */}
            <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-10">
              <div className="space-y-6">
                <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                  За&nbsp;время короткой экскурсии дети не&nbsp;успевают освоить незнакомые языки и&nbsp;увидеть традиционные предметы в&nbsp;их&nbsp;естественной таёжной среде.
                </p>
                <p className="text-base sm:text-lg text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty">
                  Экспозиция состоит из&nbsp;наглядных макетов и&nbsp;реконструкций, однако без&nbsp;книги сложные термины быстро стираются из&nbsp;памяти школьников.
                </p>
              </div>

              {/* Согласованная трехколоночная сетка: 3 ёмких аспекта проблемы */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 font-sans items-stretch" role="region" aria-label="Аспекты проблемы музейного формата">
                
                {/* Аспект 1: Предметы без тайги */}
                <article className="flex flex-col justify-start">
                  <div className="mb-2.5 text-[#1C1C1C]/70">
                    <Trees className="w-5 h-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="text-base sm:text-lg text-[#1C1C1C] mb-2" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed'
                  }}>
                    Предметы без&nbsp;тайги
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-normal leading-relaxed text-pretty">
                    На&nbsp;музейных партах макеты замирают: без&nbsp;книги сложно представить, как&nbsp;они служили в&nbsp;таёжном промысле края.
                  </p>
                </article>

                {/* Аспект 2: Быстрое угасание памяти */}
                <article className="relative pt-6 md:pt-0 border-t md:border-t-0 border-[#1C1C1C]/10 flex flex-col justify-start">
                  <div className="hidden md:block absolute -left-4 lg:-left-5 top-0 bottom-0 w-px bg-[#1C1C1C]/10" aria-hidden="true" />
                  <div className="mb-2.5 text-[#1C1C1C]/70">
                    <Hourglass className="w-5 h-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="text-base sm:text-lg text-[#1C1C1C] mb-2" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed'
                  }}>
                    Угасание памяти
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-normal leading-relaxed text-pretty">
                    За&nbsp;время урока сложные термины и&nbsp;названия предметов быта не&nbsp;успевают закрепиться в&nbsp;памяти всех школьников.
                  </p>
                </article>

                {/* Аспект 3: Утрата таёжного опыта */}
                <article className="relative pt-6 md:pt-0 border-t md:border-t-0 border-[#1C1C1C]/10 flex flex-col justify-start">
                  <div className="hidden md:block absolute -left-4 lg:-left-5 top-0 bottom-0 w-px bg-[#1C1C1C]/10" aria-hidden="true" />
                  <div className="mb-2.5 text-[#1C1C1C]/70">
                    <Flame className="w-5 h-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="text-base sm:text-lg text-[#1C1C1C] mb-2" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed'
                  }}>
                    Утрата таёжного опыта
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-normal leading-relaxed text-pretty">
                    Знания об&nbsp;уникальных орудиях угасают: без&nbsp;описания в&nbsp;книге теряется память о&nbsp;ценном таёжном опыте предков.
                  </p>
                </article>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ЦЕЛЬ ПРОЕКТА */}
      <section 
        id="mission" 
        className="border-t border-[#1C1C1C]/15"
        style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-start">
            {/* Левая функциональная зона: 3 колонки (grid-column: 1 / 4) со sticky-фиксацией */}
            <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Миссия и&nbsp;назначение
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Цель проекта
              </h2>
            </div>

            {/* Правая функциональная зона: 8 колонок (grid-column: 5 / 13) */}
            <div className="col-span-12 lg:col-start-5 lg:col-end-13">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1C1C1C]/25 py-1">
                {/* Формулировка цели */}
                <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                  Создать для&nbsp;школьного музея наглядный словарь-энциклопедию, который простым языком и&nbsp;живыми иллюстрациями расскажет детям о&nbsp;культуре коренных народов.
                </p>

                {/* Параметры целевого артефакта */}
                <div className="mt-8 pt-6 border-t border-[#1C1C1C]/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                  
                  {/* Параметр 1: Формат книги */}
                  <div className="space-y-1.5 font-sans group cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-[#1C1C1C]/75 font-medium group-hover:text-[#1C1C1C] transition-colors">
                      <BookOpen className="w-4.5 h-4.5 text-[#1C1C1C]/80 shrink-0 icon-book-format" strokeWidth={1.8} aria-hidden="true" />
                      <span>Формат книги</span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-snug">
                      Словарь-энциклопедия
                    </p>
                  </div>

                  {/* Параметр 2: Читатели */}
                  <div className="space-y-1.5 font-sans group cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-[#1C1C1C]/75 font-medium group-hover:text-[#1C1C1C] transition-colors">
                      <Users className="w-4.5 h-4.5 text-[#1C1C1C]/80 shrink-0 icon-readers-users" strokeWidth={1.8} aria-hidden="true" />
                      <span>Читатели</span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-snug">
                      Школьники <em>(6–14 лет)</em>
                    </p>
                  </div>

                  {/* Параметр 3: Народы */}
                  <div className="space-y-1.5 font-sans group cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-[#1C1C1C]/75 font-medium group-hover:text-[#1C1C1C] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-[#1C1C1C]/80 shrink-0 icon-peoples-chum" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 21h18L13.5 3.5M10.5 3.5L21 21M3 21l9-17.5 9 17.5" />
                        <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
                      </svg>
                      <span>Народы Верхнекетья</span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-snug">
                      Селькупы, эвенки, кеты
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Вызовы и решения */}
      <section 
        id="challenges" 
        className="border-t border-[#1C1C1C]/15 relative"
        style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
      >
        <div id="solution" className="absolute top-0 left-0 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
            
            {/* Левая функциональная зона: 3 колонки (grid-column: 1 / 4) со sticky-фиксацией */}
            {/* Левая функциональная зона: 3 колонки (grid-column: 1 / 4) со sticky-фиксацией */}
            <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Концепция издания
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Вызовы и&nbsp;решения
              </h2>
              <p className="hidden lg:block text-sm text-[#1C1C1C]/75 font-sans leading-relaxed mt-4 max-w-xs text-pretty">
                Бережный баланс между этнографической точностью<br />
                и&nbsp;детской наглядностью.
              </p>
            </div>

            {/* Правая функциональная зона: 8 колонок с парной вёрсткой «Слева Вызовы — Справа Решения» */}
            <div className="col-span-12 lg:col-start-5 lg:col-end-13 font-sans">
                          {/* 3 ВЗАИМОСВЯЗАННЫХ ПАРЫ: вынос номера шага на уровень пары для исключения дублирования */}
              <div ref={challengesCardsRef} className="space-y-14 lg:space-y-16 font-sans">

                {/* ПАРА 1: Академическая сухость <—> Адаптация словарных статей */}
                <div 
                  id="challenge-pair-1"
                  className={`space-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    challengesVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                  style={{ transitionDelay: '80ms' }}
                >
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/75 font-medium tracking-wide">
                    <span>1</span>
                    <span className="text-[#1C1C1C]/30">/</span>
                    <span>Лексический материал</span>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-stretch" role="region" aria-label="Пара: академическая сухость и адаптация статей">
                    {/* Слева: Вызов 1 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#1C1C1C]/60 font-medium">
                            Вызов
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Академическая сухость
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          Старинные монографии написаны сложным языком: требовалось изложить этнографические сведения простыми словами.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_academic.webp" 
                          alt="Архивная музейная картотека и академические описи" 
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (!t.dataset.triedRoot) {
                              t.dataset.triedRoot = 'true';
                              t.src = 'challenge_academic.webp';
                            }
                          }}
                        />
                      </div>
                    </article>

                    {/* Справа: Решение 1 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#4A7A28] font-medium">
                            Решение
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Доступный язык статей
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          Статьи написаны ясно и&nbsp;живо: вместо сухих формулировок создан глубокий и&nbsp;понятный рассказ о&nbsp;быте каждого из&nbsp;народов.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_adaptation.jpg" 
                          alt="Разворот словаря: адаптированный текст о таёжном быте" 
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                        />
                      </div>
                    </article>
                  </div>
                </div>

                {/* ПАРА 2: Непривычные знаки и звуки <—> Понятное устройство слова */}
                <div 
                  id="challenge-pair-2"
                  className={`space-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    challengesVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                  style={{ transitionDelay: '220ms' }}
                >
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/75 font-medium tracking-wide">
                    <span>2</span>
                    <span className="text-[#1C1C1C]/30">/</span>
                    <span>Языковое оформление</span>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-stretch" role="region" aria-label="Пара: языковой барьер и устройство словарной карточки">
                    {/* Слева: Вызов 2 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#1C1C1C]/60 font-medium">
                            Вызов
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Непривычные знаки и звуки
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          Три северных языка содержат редкие знаки и&nbsp;звуки: без&nbsp;наглядных подсказок они казались детям сложными для&nbsp;чтения.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_multilingual_barrier.webp" 
                          alt="Сложные знаки северных языков" 
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (!t.dataset.triedRoot) {
                              t.dataset.triedRoot = 'true';
                              t.src = 'challenge_multilingual_barrier.webp';
                            }
                          }}
                        />
                      </div>
                    </article>

                    {/* Справа: Решение 2 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#4A7A28] font-medium">
                            Решение
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Понятное устройство слова
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          Русское слово стоит во&nbsp;главе каждой статьи, а&nbsp;цветные плашки показывают точное звучание и&nbsp;перевод на&nbsp;трёх языках.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_multilingual.webp" 
                          alt="Разворот словаря: оформление трёх культур" 
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (!t.dataset.triedRoot) {
                              t.dataset.triedRoot = 'true';
                              t.src = 'challenge_multilingual.webp';
                            }
                          }}
                        />
                      </div>
                    </article>
                  </div>
                </div>

                {/* ПАРА 3: Нехватка архивных кадров <—> Наглядные реконструкции */}
                <div 
                  id="challenge-pair-3"
                  className={`space-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    challengesVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                  style={{ transitionDelay: '360ms' }}
                >
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/75 font-medium tracking-wide">
                    <span>3</span>
                    <span className="text-[#1C1C1C]/30">/</span>
                    <span>Наглядные иллюстрации</span>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-stretch" role="region" aria-label="Пара: архивы и визуальные реконструкции">
                    {/* Слева: Вызов 3 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#1C1C1C]/60 font-medium">
                            Вызов
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Нехватка архивных кадров
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          В&nbsp;фондах музея есть лишь макеты без&nbsp;исторических фото. Детям сложно представить таёжные ремёсла, охоту и&nbsp;наряды.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_photobank.webp" 
                          alt="Архивные материалы и макеты" 
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (!t.dataset.triedRoot) {
                              t.dataset.triedRoot = 'true';
                              t.src = 'challenge_photobank.webp';
                            }
                          }}
                        />
                      </div>
                    </article>

                    {/* Справа: Решение 3 */}
                    <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full group m3-card-interactive">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] sm:text-xs font-sans text-[#4A7A28] font-medium">
                            Решение
                          </span>
                        </div>
                        <div className="text-[#1C1C1C] font-editorial text-[18px] sm:text-[19px] leading-[1.2] mb-1.5 font-normal">
                          Наглядные иллюстрации
                        </div>
                        <p className="text-[13.5px] sm:text-sm text-[#1C1C1C]/80 font-normal leading-relaxed text-pretty">
                          На&nbsp;основе описаний из&nbsp;различных источников разработаны страницы с&nbsp;рисунками, воссоздающими образы традиционных таёжных предметов быта, орудий труда, блюд и&nbsp;нарядов.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-6 lg:mt-7 overflow-hidden rounded-lg border border-[#1C1C1C]/10 bg-[#FAF8F5] aspect-[16/10] md:aspect-[4/3]">
                        <img 
                          src="/challenge_reconstruction.webp" 
                          alt="Разворот словаря: натурная реконструкция традиционного чума" 
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                          loading="eager"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (!t.dataset.triedRoot) {
                              t.dataset.triedRoot = 'true';
                              t.src = 'challenge_reconstruction.webp';
                            }
                          }}
                        />
                      </div>
                    </article>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. Информационная архитектура */}
      <InformationArchitecture />

      {/* 6. Дизайн-система */}
      <DesignSystem />

      {/* 7. Панорама страниц */}
      <SummarySection />

      {/* 8. Берестяная обложка, полиграфия и издательские стандарты */}
      <ProductionSection />

      {/* 9. Итоги и результаты */}
      <ImpactSection />

      {/* 10. Авторы и составители */}
      <AuthorsSection />

      {/* 11. Отзывы */}
      <ReviewsSection />

    </div>
  );
};

