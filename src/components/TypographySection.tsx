import React, { useState, useEffect, useRef } from 'react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';
import { renderStableTypewriterSpan } from './TypewriterText';

const WEIGHT_PRESETS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Bold', value: 700 },
  { label: 'ExtraBold', value: 800 },
  { label: 'Black', value: 900 },
];

export const TypographySection: React.FC = () => {
  const [displayWeight, setDisplayWeight] = useState<number>(700);

  // Typewriter effect state for manifesto description
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  const highlightWord = 'Вариативный';
  const restText = ' шрифт нового поколения, созданный специально для\u00A0гладкого отображения в\u00A0веб-среде. Он\u00A0позволяет интерфейсам службы выглядеть актуально и\u00A0«дорого» на\u00A0любых носителях\u00A0— от\u00A0сайта на\u00A0Тильде до\u00A0экрана смартфона в\u00A0VK.';
  const totalLength = highlightWord.length + restText.length;

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const startTyping = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const timer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          if (count <= totalLength) {
            setTypedChars(count);
            count++;
          } else {
            clearInterval(interval);
            setIsTypingDone(true);
          }
        }, 28);
      }, 150);

      return () => clearTimeout(timer);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startTyping();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalLength]);

  return (
    <section id="typography-section" className="w-full">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        <FlatReveal direction="up" delay={40} distance={20}>
          {/* Eyebrow marker: (шрифт) centered */}
          <span className="text-xs sm:text-sm text-[#737373] font-normal block text-center mb-6 sm:mb-8">
            (шрифт)
          </span>

          {/* Hero Font Name: Geologica with Peach rectangular highlight */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <span className="bg-[#FFAD85] text-[#181818] font-bold text-4xl sm:text-6xl lg:text-[76px] px-6 sm:px-10 py-1 sm:py-2 leading-none tracking-tight inline-block select-all whitespace-nowrap">
              Geologica
            </span>
          </div>

          {/* Description manifesto with Typewriter & Highlighter */}
          <div ref={triggerRef} className="text-base sm:text-lg lg:text-[21px] text-[#181818] font-normal leading-[1.42] text-center max-w-3xl mx-auto tracking-tight mb-10 sm:mb-14 relative grid grid-cols-1 grid-rows-1">
            {/* Невидимый слой-распорка для стабилизации геометрии секции */}
            <div className="invisible pointer-events-none select-none col-start-1 row-start-1" aria-hidden="true">
              <p>
                <HighlighterMark color="green" active={false}>
                  {highlightWord}
                </HighlighterMark>
                {restText}
              </p>
            </div>

            {/* Видимый слой с бесшовной анимацией печати без скачков и висячих предлогов */}
            <div className="col-start-1 row-start-1">
              <p>
                <HighlighterMark color="green" direction="left-to-right" delay={100} active={isTypingDone}>
                  {renderStableTypewriterSpan(
                    highlightWord,
                    typedChars,
                    !isTypingDone && typedChars <= highlightWord.length
                  )}
                </HighlighterMark>
                {renderStableTypewriterSpan(
                  restText,
                  Math.max(0, typedChars - highlightWord.length),
                  !isTypingDone && typedChars > highlightWord.length
                )}
              </p>
            </div>
          </div>

          {/* Specimen: Numbers */}
          <div className="w-full overflow-hidden flex justify-center py-1">
            <div className="animate-variable-weight text-center text-lg sm:text-2xl lg:text-[28px] text-[#181818] tracking-[0.2em] sm:tracking-[0.32em] select-all whitespace-nowrap">
              0 1 2 3 4 5 6 7 8 9
            </div>
          </div>

          {/* Specimen: Uppercase Cyrillic */}
          <div className="w-full overflow-hidden flex justify-center mt-3 sm:mt-5 py-1">
            <div className="animate-variable-weight text-center text-[10px] sm:text-sm md:text-base lg:text-[18px] xl:text-[20px] text-[#181818] tracking-[0.06em] sm:tracking-[0.14em] md:tracking-[0.18em] lg:tracking-[0.22em] uppercase select-all whitespace-nowrap">
              А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я
            </div>
          </div>

          {/* Specimen: Lowercase Cyrillic */}
          <div className="w-full overflow-hidden flex justify-center mt-2.5 sm:mt-3.5 py-1">
            <div className="animate-variable-weight text-center text-[10px] sm:text-sm md:text-base lg:text-[18px] xl:text-[20px] text-[#181818] tracking-[0.06em] sm:tracking-[0.14em] md:tracking-[0.18em] lg:tracking-[0.22em] lowercase select-all whitespace-nowrap">
              а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я
            </div>
          </div>
        </FlatReveal>

        {/* BENTO GRID */}
        <div className="w-full mt-14 sm:mt-20 lg:mt-24 space-y-4 sm:space-y-5 lg:space-y-6">

          {/* CARD 1: Display H1 */}
          <FlatReveal direction="up" delay={80} distance={20}>
            <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-black/5 flex flex-col justify-between overflow-hidden">
              
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-[#181818] bg-white px-3 py-1 rounded-lg border border-black/5 shadow-2xs shrink-0">
                    Display H1
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#737373] flex-wrap">
                    <span className="font-mono">52 px</span>
                    <span className="text-black/30 select-none">•</span>
                    <span className="font-mono">Leading 105%</span>
                    <span className="hidden sm:inline text-black/30 select-none">•</span>
                    <span className="hidden sm:inline text-[#737373]/90">главные заголовки и навигация</span>
                  </div>
                </div>

                {/* Variable Slider & Quick Presets */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-black/5 shadow-2xs">
                    {WEIGHT_PRESETS.map((preset) => {
                      const isActive = Math.abs(displayWeight - preset.value) <= 25;
                      return (
                        <button
                          key={preset.value}
                          onClick={() => setDisplayWeight(preset.value)}
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                            isActive
                              ? 'bg-[#181818] text-white'
                              : 'text-[#181818]/70 hover:text-black hover:bg-[#EBEBEB]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 min-w-[140px] sm:min-w-[170px]">
                    <input
                      type="range"
                      min="300"
                      max="900"
                      step="10"
                      value={displayWeight}
                      onChange={(e) => setDisplayWeight(Number(e.target.value))}
                      className="w-full accent-[#181818] cursor-pointer"
                      aria-label="Насыщенность шрифта"
                    />
                    <span className="text-xs font-mono font-medium text-[#181818] bg-white px-2.5 py-1 rounded-md border border-black/5 whitespace-nowrap shrink-0 inline-flex items-center justify-center select-none shadow-2xs">
                      wght {displayWeight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Display Headline: Fluid responsive scale with strict nowrap so it never breaks on max weight */}
              <div className="mt-6 sm:mt-8 w-full overflow-hidden">
                <h3
                  style={{
                    fontWeight: displayWeight,
                    fontVariationSettings: `'wght' ${displayWeight}`,
                    transition: 'font-weight 0.08s ease-out',
                  }}
                  className="text-[clamp(1.4rem,4.4vw,3.85rem)] text-[#181818] leading-[1.08] tracking-tight select-all whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Тьюторская служба ТГУ
                </h3>
              </div>
            </div>
          </FlatReveal>

          {/* ROW 2: Lead (Col 1) and Body (Col 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            
            {/* CARD 2: Lead */}
            <FlatReveal direction="up" delay={100} distance={20} className="h-full">
              <div className="bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-black/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-black/5 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-[#181818] bg-white px-3 py-1 rounded-lg border border-black/5 shadow-2xs">
                      Lead / Большой
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#737373] flex-wrap">
                      <span>24 px</span>
                      <span className="text-black/30 select-none">•</span>
                      <span>SemiBold 600</span>
                      <span className="text-black/30 select-none">•</span>
                      <span>130%</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#737373]/80 block pt-3">
                    лид-абзацы и ключевые мысли
                  </span>

                  <p className="text-lg sm:text-xl lg:text-[24px] font-semibold text-[#181818] leading-[1.3] tracking-tight mt-4 sm:mt-6 [text-wrap:pretty]">
                    Новейшие технологии для&nbsp;непрерывного сопровождения индивидуальных образовательных
                    траекторий и&nbsp;адаптации студентов к&nbsp;университетской&nbsp;среде.
                  </p>
                </div>
              </div>
            </FlatReveal>

            {/* CARD 3: Body */}
            <FlatReveal direction="up" delay={150} distance={20} className="h-full">
              <div className="bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-black/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-black/5 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-[#181818] bg-white px-3 py-1 rounded-lg border border-black/5 shadow-2xs">
                      Body / Обычный
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#737373] flex-wrap">
                      <span>16 px</span>
                      <span className="text-black/30 select-none">•</span>
                      <span>Regular 400</span>
                      <span className="text-black/30 select-none">•</span>
                      <span>160%</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#737373]/80 block pt-3">
                    основной наборный текст интерфейсов
                  </span>

                  <p className="text-sm sm:text-[15px] lg:text-[16px] font-normal text-[#181818]/90 leading-[1.6] mt-4 sm:mt-6 [text-wrap:pretty]">
                    Тьюторская служба создаёт безопасную среду поддержки, в&nbsp;которой вчерашний школьник превращается
                    в&nbsp;осознанного автора своего образования. На&nbsp;первом курсе каждый студент сталкивается
                    с&nbsp;непривычной свободой выбора: сотни элективных модулей, междисциплинарные проекты
                    и&nbsp;исследовательские лаборатории. Тьютор помогает преодолеть когнитивную перегрузку, сформировать
                    персональный образовательный маршрут и&nbsp;превратить хаос университетских возможностей в&nbsp;чёткую жизненную&nbsp;стратегию.
                  </p>
                </div>
              </div>
            </FlatReveal>

          </div>

          {/* CARD 4: Caption */}
          <FlatReveal direction="up" delay={120} distance={20}>
            <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-[#181818] bg-white px-3 py-1 rounded-lg border border-black/5 shadow-2xs shrink-0">
                  Caption / Маленький
                </span>
                <div className="flex items-center gap-2 text-xs text-[#737373] flex-wrap">
                  <span className="font-mono">13 px</span>
                  <span className="text-black/30 select-none">•</span>
                  <span className="font-mono">Regular 400</span>
                  <span className="text-black/30 select-none">•</span>
                  <span className="font-mono">150%</span>
                  <span className="hidden sm:inline text-black/30 select-none">•</span>
                  <span className="hidden sm:inline text-[#737373]/90">сноски, метаданные и служебные подписи</span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] font-normal text-[#181818]/70 leading-[1.5] max-w-2xl [text-wrap:pretty]">
                Очные встречи в&nbsp;коворкинге главного корпуса и&nbsp;онлайн-сессии в&nbsp;цифровой среде&nbsp;ТГУ.
                Запись на&nbsp;индивидуальные консультации и&nbsp;вводный интенсив открыта
                в&nbsp;личном кабинете&nbsp;первокурсника.
              </p>
            </div>
          </FlatReveal>

        </div>

      </div>
    </section>
  );
};
