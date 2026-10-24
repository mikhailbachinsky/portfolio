import React from 'react';
import { HERO_METRICS } from '../data/caseData';
import { ArrowDownRight } from 'lucide-react';
import { DiamondSeparator } from './DiamondSeparator';
import { Hero3DComposition } from './Hero3DComposition';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroSectionProps {
  onExploreClick: () => void;
  onConceptClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onConceptClick }) => {
  return (
    <section className="relative min-h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col justify-center py-2 sm:py-2.5 lg:py-3 border-b border-white/10 bg-transparent overflow-hidden">
      {/* Subtle ambient frost */}
      <div className="absolute inset-0 pointer-events-none frost-ice-pattern opacity-15" />
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 65% 50%, rgba(3, 54, 51, 0.35) 0%, rgba(2, 38, 36, 0.12) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center my-auto min-h-0">
        {/* Main Grid: 2 columns on tablet (portrait & landscape) and desktop; single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center w-full">
          {/* Text Column: 7 cols on tablet and desktop */}
          <div className="md:col-span-7 flex flex-col justify-center w-full">
            {/* Category Eyebrow Line */}
            <div className="flex items-center text-[10px] sm:text-xs uppercase tracking-widest text-silver-bright/80 font-mono mb-1.5 sm:mb-2">
              <span>Арт-дирекшен</span>
              <DiamondSeparator className="!mx-1.5 sm:!mx-2" />
              <span>Томск</span>
              <DiamondSeparator className="!mx-1.5 sm:!mx-2" />
              <span>2024</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.6rem] xl:text-[3.1rem] text-white leading-[1.08] mb-2 sm:mb-2.5">
              <span className="block">Law Student</span>
              <span className="block">Awards 2024</span>
            </h1>

            {/* Description - streamlined on mobile */}
            <p className="text-xs sm:text-[13px] md:text-sm text-white/75 font-light leading-relaxed mb-2.5 sm:mb-3 max-w-xl">
              Разработка клубной айдентики для ежегодного события ЮИ&nbsp;ТГУ в&nbsp;клубе FACE. <span className="hidden sm:inline">Мы&nbsp;отказались от&nbsp;стандартного продвижения в&nbsp;виде скучной премии в&nbsp;пользу тайны: вечер анонсировался как&nbsp;закрытая вечеринка-сюрприз в&nbsp;честь дня&nbsp;рождения «Юрия Игоревича Тгушкина» (ЮИ&nbsp;ТГУ) со&nbsp;слоганом «Только не&nbsp;проболтайся!», эстетикой изумруда и&nbsp;серебра 925&nbsp;пробы.</span>
            </p>

            {/* Mobile Compact Meta Line */}
            <div className="sm:hidden flex items-center justify-between py-1.5 border-y border-white/10 text-[10px] text-white/60 font-mono mb-2.5">
              <span>FACE Club ◇ Томск</span>
              <span>5 дек ◇ 100% Sold out</span>
            </div>

            {/* Event Meta Grid: Preserved on tablet & desktop */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 border-y border-white/10 mb-3 sm:mb-3.5 w-full">
              {/* Cell 1: Заказчик */}
              <div className="py-2 pr-3 sm:pr-4 lg:px-3 lg:first:pl-0 border-r border-b lg:border-b-0 border-white/10">
                <div className="text-[9.5px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Заказчик</div>
                <div className="text-xs sm:text-sm font-medium text-white mb-0.5">Дирекция ЮИ&nbsp;ТГУ</div>
                <div className="text-[9px] sm:text-[9.5px] text-white/50 font-mono">Профбюро ППОС</div>
              </div>

              {/* Cell 2: Локация */}
              <div className="py-2 pl-3 sm:pl-4 lg:px-3 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="text-[9.5px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Локация</div>
                <div className="text-xs sm:text-sm font-medium text-white mb-0.5">FACE Club</div>
                <div className="text-[9px] sm:text-[9.5px] text-white/50 font-mono">Томск</div>
              </div>

              {/* Cell 3: Дата */}
              <div className="py-2 pr-3 sm:pr-4 lg:px-3 border-r border-white/10">
                <div className="text-[9.5px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Дата</div>
                <div className="text-xs sm:text-sm font-medium text-white mb-0.5">5&nbsp;декабря 2024</div>
                <div className="text-[9px] sm:text-[9.5px] text-white/50 font-mono">Ночная программа</div>
              </div>

              {/* Cell 4: Статус проекта */}
              <div className="py-2 pl-3 sm:pl-4 lg:px-3 lg:last:pr-0">
                <div className="text-[9.5px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Статус проекта</div>
                <div className="text-xs sm:text-sm font-medium text-white mb-0.5">Успешно завершён</div>
                <div className="text-[9px] sm:text-[9.5px] text-white/50 font-mono">100% sold out</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                id="hero-btn-explore"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs uppercase tracking-wider bg-white text-[#010e0d] font-semibold hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
              >
                <span>Смотреть кейс</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-btn-concept"
                onClick={onConceptClick}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs uppercase tracking-wider border border-silver/40 text-white hover:border-silver transition-colors silver-contour-subtle cursor-pointer"
              >
                <span>Концепция & Смыслы</span>
              </button>
            </div>
          </div>

          {/* 3D Composition: 5 cols on tablet and desktop, large and prominent, tucks behind cards */}
          <div className="md:col-span-5 flex items-center justify-center relative z-10 w-full min-h-0 -mb-4 md:-mb-8 lg:-mb-10">
            <Hero3DComposition />
          </div>
        </div>

        {/* Key Metrics Bar - Halved distance from buttons to divider */}
        <div className="relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5 mt-2 sm:mt-2.5 lg:mt-2.5 pt-2.5 sm:pt-3 lg:pt-3.5 border-t border-silver/30 w-full backdrop-blur-sm">
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-3 lg:p-3.5 frost-card-glass border border-silver/30 hover:border-silver/60 transition-colors silver-contour shadow-md flex flex-col justify-start"
            >
              <div>
                <div className="text-xl sm:text-2xl lg:text-[1.55rem] font-serif-luxury text-white mb-0.5 tracking-tight">
                  <AnimatedCounter value={metric.value} duration={1500} />
                </div>
                <div className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider text-silver-bright mb-1 sm:mb-1.5 font-medium">
                  {metric.label}
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-light pt-1.5 border-t border-silver/15">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
