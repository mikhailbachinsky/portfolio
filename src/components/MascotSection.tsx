import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';

export const MascotSection: React.FC = () => {
  const emotionsScrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right');
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const checkScroll = () => {
    const el = emotionsScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    // If maxScroll is very small (<= 4px), all emotions fit comfortably on wide screens
    const hasOverflow = maxScroll > 4;
    setIsScrollable(hasOverflow);

    if (!hasOverflow) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setScrollDirection('right');
      if (el.scrollLeft !== 0) {
        el.scrollLeft = 0;
      }
      return;
    }

    const atStart = scrollLeft <= 6;
    const atEnd = scrollLeft >= maxScroll - 6;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);

    if (atEnd) {
      setScrollDirection('left');
    } else if (atStart) {
      setScrollDirection('right');
    }
  };

  useEffect(() => {
    const el = emotionsScrollRef.current;
    if (!el) return;

    checkScroll();
    const timer = setTimeout(checkScroll, 120);

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(el);
    if (el.parentElement) {
      resizeObserver.observe(el.parentElement);
    }

    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollEmotions = () => {
    if (!isScrollable) return;
    const el = emotionsScrollRef.current;
    if (!el) return;

    setIsArrowClicked(true);
    setTimeout(() => setIsArrowClicked(false), 350);

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const step = Math.max(120, clientWidth * 0.45);

    if (scrollDirection === 'right') {
      if (scrollLeft >= maxScroll - 8) {
        setScrollDirection('left');
        el.scrollBy({ left: -step, behavior: 'smooth' });
      } else {
        const nextPos = scrollLeft + step;
        el.scrollBy({ left: step, behavior: 'smooth' });
        if (nextPos >= maxScroll - 8) {
          setScrollDirection('left');
        }
      }
    } else {
      if (scrollLeft <= 8) {
        setScrollDirection('right');
        el.scrollBy({ left: step, behavior: 'smooth' });
      } else {
        const nextPos = scrollLeft - step;
        el.scrollBy({ left: -step, behavior: 'smooth' });
        if (nextPos <= 8) {
          setScrollDirection('right');
        }
      }
    }
  };

  return (
    <section id="mascot-section" className="w-full">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* 
          БЕНТО-СЕТКА СЕКЦИИ МАСКОТА (2x2 на десктопе):
          - Ряд 1: Текстовый блок + Розовая плашка эмоций (слева) | Главная иллюстрация персонажа (справа)
          - Ряд 2: Три слота под карточки реализации (слева) | Фото белки + AI-карточка (справа)
        */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch">
          
          {/* =========================================================
              КВАДРАНТ 1: ВЕРХ-ЛЕВО (Текстовый блок + Розовая плашка эмоций)
              Высота этой группы задаёт высоту соседней главной иллюстрации
              ========================================================= */}
          <FlatReveal 
            direction="left" 
            delay={50} 
            distance={44} 
            duration={950} 
            className="w-full flex flex-col justify-between"
          >
            {/* Текстовый блок на всю ширину блока */}
            <div className="w-full space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2 text-left">
              {/* Eyebrow маркер */}
              <span className="text-xs sm:text-sm text-[#737373] font-normal block">
                (маскот)
              </span>

              {/* Главный заголовок секции */}
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[34px] font-bold text-[#181818] leading-[1.12] tracking-tight">
                Символ кампуса<br />
                как&nbsp;масштабируемый<br />
                <HighlighterMark color="peach" variant="casual-sweep" delay={200}>
                  цифровой помощник
                </HighlighterMark>
              </h2>

              {/* Описание на всю ширину */}
              <p className="text-sm sm:text-base lg:text-[15px] leading-relaxed text-[#181818]/90 font-normal [text-wrap:pretty]">
                Выбор персонажа не&nbsp;случаен. Университетская роща ТГУ&nbsp;— сердце
                кампуса, где&nbsp;живут сотни белок. Для&nbsp;студентов это&nbsp;мощный{' '}
                <HighlighterMark color="rose" variant="overshoot" delay={300}>
                  эмоциональный якорь
                </HighlighterMark>{' '}
                и&nbsp;символ вуза. Мы&nbsp;взяли этот{' '}
                <HighlighterMark color="green" variant="shifted-down" delay={450}>
                  культурный код
                </HighlighterMark>{' '}
                и&nbsp;интегрировали его в&nbsp;айдентику, окрасив персонажа в&nbsp;фирменный
                персиковый&nbsp;цвет.
              </p>
            </div>

            {/* Нижняя строка: Розовая плашка с эмоциями + Интерактивная кнопка-стрелка */}
            <div className="w-full flex items-center gap-2.5 sm:gap-3.5 mt-4 sm:mt-5 lg:mt-6">
              {/* Розовая плашка с градиентами по краям и скроллом эмоций */}
              <div className="relative flex-1 min-w-0 h-[88px] sm:h-[96px] lg:h-[100px] xl:h-[106px] rounded-2xl sm:rounded-3xl bg-[#F27A93] border border-black/5 shadow-xs overflow-hidden">
                
                {/* Левый мягкий розовый градиент-затухание */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[#F27A93] via-[#F27A93]/80 to-transparent pointer-events-none z-10 rounded-l-2xl sm:rounded-l-3xl transition-opacity duration-200 ${
                    isScrollable && canScrollLeft ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Правый мягкий розовый градиент-затухание */}
                <div 
                  className={`absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-[#F27A93] via-[#F27A93]/80 to-transparent pointer-events-none z-10 rounded-r-2xl sm:rounded-r-3xl transition-opacity duration-200 ${
                    isScrollable && canScrollRight ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Ряд эмоций: на широком экране равномерно распределён без скролла, на узком — аккуратный скролл */}
                <div 
                  ref={emotionsScrollRef}
                  onScroll={checkScroll}
                  className={`w-full h-full px-3 sm:px-4 lg:px-5 flex items-center transition-all duration-300 ${
                    isScrollable
                      ? 'justify-start gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none scroll-smooth'
                      : 'justify-between overflow-hidden'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className="h-[80%] sm:h-[84%] lg:h-[86%] aspect-square rounded-full border border-black/10 bg-white shrink-0 shadow-2xs overflow-hidden flex items-center justify-center relative transition-transform duration-300 hover:scale-110 select-none"
                    >
                      <img
                        src={`/assets/mascot-emotion-${num}.webp`}
                        alt={`Эмоция маскота ${num}`}
                        className="w-full h-full object-cover object-center scale-[1.3] transition-transform duration-300 pointer-events-none"
                        loading="eager"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.endsWith('.webp')) {
                            img.src = `/assets/mascot-emotion-${num}.png`;
                          } else {
                            img.style.display = 'none';
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая черная интерактивная кнопка-стрелка: активна только при необходимости скролла */}
              <button
                type="button"
                disabled={!isScrollable}
                onClick={handleScrollEmotions}
                className={`w-[88px] sm:w-[96px] lg:w-[100px] xl:w-[106px] h-[88px] sm:h-[96px] lg:h-[100px] xl:h-[106px] shrink-0 rounded-full flex items-center justify-center transition-all duration-200 select-none ${
                  !isScrollable
                    ? 'bg-[#181818]/15 text-[#181818]/30 cursor-not-allowed shadow-none border border-black/5'
                    : isArrowClicked
                    ? 'scale-90 bg-black text-white shadow-inner ring-4 ring-[#181818]/20 cursor-pointer shadow-xs'
                    : 'bg-[#181818] hover:bg-black text-white hover:scale-105 active:scale-90 cursor-pointer group shadow-xs'
                }`}
                aria-disabled={!isScrollable}
                aria-label={
                  !isScrollable
                    ? 'Все эмоции маскота отображены'
                    : scrollDirection === 'left'
                    ? 'Прокрутить эмоции маскота назад'
                    : 'Прокрутить эмоции маскота вперёд'
                }
                data-tooltip={
                  !isScrollable
                    ? undefined
                    : scrollDirection === 'left'
                    ? 'Листать назад'
                    : 'Листать вперёд'
                }
              >
                <div 
                  className={`w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex items-center justify-center ${
                    isScrollable ? 'transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''
                  } ${
                    isScrollable && scrollDirection === 'left' ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  {isScrollable ? (
                    <>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white absolute transition-all duration-300 ease-out group-hover:translate-x-full group-hover:opacity-0" />
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white absolute transition-all duration-300 ease-out -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                    </>
                  ) : (
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-[#181818]/35" />
                  )}
                </div>
              </button>
            </div>
          </FlatReveal>

          {/* =========================================================
              КВАДРАНТ 2: ВЕРХ-ПРАВО (Главная сюжетная иллюстрация)
              Высота полностью задаётся высотой левой группы (Квадрант 1)
              ========================================================= */}
          <FlatReveal 
            direction="right" 
            delay={100} 
            distance={48} 
            duration={950} 
            className="w-full h-[260px] sm:h-[320px] lg:h-full min-h-0 flex flex-col"
          >
            <div className="w-full h-full relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden flex items-center justify-center min-h-0">
              <img
                src="/assets/mascot-main.webp"
                alt="Главная иллюстрация маскота"
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.04]"
                loading="eager"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.endsWith('.webp')) {
                    img.src = '/assets/mascot-main.png';
                  } else if (!img.src.includes('mascot-top-right.png')) {
                    img.src = '/assets/mascot-top-right.png';
                  } else {
                    img.style.display = 'none';
                  }
                }}
              />
            </div>
          </FlatReveal>

          {/* =========================================================
              КВАДРАНТ 3: НИЗ-ЛЕВО (Три слота реализации)
              Высота задаётся оранжевой карточкой из Квадранта 4
              ========================================================= */}
          <FlatReveal 
            direction="up" 
            delay={160} 
            distance={44} 
            duration={950} 
            className="w-full h-[150px] sm:h-[180px] lg:h-full min-h-0 flex flex-col"
          >
            <div className="w-full h-full grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4 items-stretch min-h-0">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="w-full h-full min-h-0 relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden"
                >
                  <img
                    src={`/assets/mascot-card-${num}.webp`}
                    alt={`Реализация маскота ${num}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.endsWith('.webp')) {
                        img.src = `/assets/mascot-card-${num}.png`;
                      } else {
                        img.style.display = 'none';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </FlatReveal>

          {/* =========================================================
              КВАДРАНТ 4: НИЗ-ПРАВО (Фото белки + карточка AI-пайплайн)
              Высота оранжевой карточки задаёт высоту всего ряда
              ========================================================= */}
          <FlatReveal 
            direction="up" 
            delay={220} 
            distance={44} 
            duration={950} 
            className="w-full flex flex-col justify-start"
          >
            <div className="w-full flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 lg:gap-4 items-stretch">
              
              {/* Фото белки (горизонтальная карточка на мобилке, адаптивная на десктопе) */}
              <div className="w-full sm:flex-1 min-w-0 h-[200px] sm:h-auto min-h-[160px] lg:min-h-0 relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden">
                <img
                  src="/assets/mascot-photo.webp"
                  alt="Фото белки в кампусе"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.endsWith('.webp')) {
                      img.src = '/assets/mascot-photo.png';
                    } else if (!img.src.includes('mascot-bottom-left.png')) {
                      img.src = '/assets/mascot-bottom-left.png';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>

              {/* Персиковая карточка AI-пайплайн (#FFAD85) - горизонтальная на мобилке с комфортной шириной текста */}
              <div className="w-full sm:w-[46%] max-w-none sm:max-w-[310px] xl:max-w-[330px] shrink-0 rounded-2xl sm:rounded-3xl bg-[#FFAD85] border border-black/5 shadow-xs p-4 sm:p-5 lg:p-5 xl:p-6 flex flex-col justify-start overflow-hidden">
                <h3 className="text-xl sm:text-2xl lg:text-[23px] xl:text-[25px] font-bold text-[#181818] tracking-tight leading-tight">
                  AI-пайплайн
                </h3>
                <p className="text-xs sm:text-[12px] xl:text-[13px] leading-relaxed text-[#181818]/90 font-normal mt-2.5 sm:mt-3 [text-wrap:pretty]">
                  Чтобы белка жила в&nbsp;любых форматах, был&nbsp;разработан AI-пайплайн генерации.
                  Это&nbsp;не&nbsp;набор статичных картинок, а&nbsp;гибкая система.
                  С&nbsp;помощью настроенных пресетов тьюторы могут создавать новые сюжеты
                  и&nbsp;стикеры за&nbsp;секунды.
                </p>
              </div>

            </div>
          </FlatReveal>

        </div>

      </div>
    </section>
  );
};
