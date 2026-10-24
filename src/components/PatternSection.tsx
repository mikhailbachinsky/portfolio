import React, { useEffect, useRef, useState } from 'react';
import { FlatReveal } from './FlatReveal';
import { PatternVector } from './PatternVector';
import { HighlighterMark } from './HighlighterMark';

export const PatternSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        rootMargin: '120px 0px 120px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="pattern-section" className="w-full">
      {/* 
        WINDOW CONTAINER:
        Matches px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16
      */}
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow marker: (паттерн) */}
        <div className="w-full px-1 sm:px-3 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block">
            (паттерн)
          </span>
        </div>

        {/* 
          ЕДИНЫЙ ХОЛСТ СЕКЦИИ ПАТТЕРНА:
          - Параметры графики: в верхнем левом углу (полностью непрозрачный белый фон bg-white)
          - Концепция: занимает 1/2 ширины в правой нижней части (полностью непрозрачный белый фон bg-white)
          - Фоновый SVG паттерн: увеличен в ~3.3 раза и повернут на 45°
        */}
        <FlatReveal direction="up" delay={50} distance={20}>
          <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl border border-black/5 p-5 sm:p-7 lg:p-9 min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex flex-col justify-between relative overflow-hidden shadow-xs">
            
            {/* Фоновый слой для SVG-паттерна: плавный дрейф вдоль осей путей (Вариант 2, приостанавливается вне видимости) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center" aria-hidden="true">
              <div
                className="w-[340%] h-[340%] shrink-0 flex items-center justify-center animate-pattern-conveyor"
                style={{
                  transformOrigin: 'center center',
                  animationPlayState: isInViewport ? 'running' : 'paused',
                }}
              >
                <PatternVector className="w-full h-full select-none" />
              </div>
            </div>

            {/* ВЕРХНИЙ ЛЕВЫЙ УГОЛ: Параметры графики (100% непрозрачный фон) */}
            <div className="flex justify-start w-full relative z-10">
              <FlatReveal direction="left" delay={100} distance={16}>
                <div className="w-fit bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-black/10 shadow-2xs">
                  <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#181818]">
                    <li className="flex items-center gap-2.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#8FE06E] shrink-0" />
                      <span className="text-[#181818] font-normal">
                        Толщина линии: 2 px
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#FFAD85] shrink-0" />
                      <span className="text-[#181818] font-normal">
                        Скругленные концы
                      </span>
                    </li>
                  </ul>
                </div>
              </FlatReveal>
            </div>

            {/* НИЖНЯЯ ПРАВАЯ ЧАСТЬ: Концепция занимает 1/2 ширины (100% непрозрачный фон) */}
            <div className="flex justify-end w-full relative z-10 pt-8 sm:pt-12">
              <FlatReveal direction="right" delay={150} distance={16} className="w-full lg:w-1/2">
                <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 border border-black/10 shadow-2xs space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#181818] leading-[1.2] tracking-tight">
                    Концепция паттерна
                  </h3>
                  <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#181818]/90 font-normal [text-wrap:pretty]">
                    <p>
                      Паттерн строится на&nbsp;динамическом переплетении{' '}
                      <HighlighterMark color="peach" variant="casual-sweep" delay={200}>
                        траекторий развития
                      </HighlighterMark>{' '}
                      и&nbsp;точек контакта. Линии разной плотности символизируют{' '}
                      <HighlighterMark color="green" variant="shifted-down" delay={350}>
                        индивидуальные маршруты
                      </HighlighterMark>{' '}
                      студентов, которые пересекаются в&nbsp;пространстве тьюторской&nbsp;службы.
                    </p>
                    <p>
                      Модульная структура позволяет{' '}
                      <HighlighterMark color="rose" variant="overshoot" delay={250}>
                        бесшовно масштабировать
                      </HighlighterMark>{' '}
                      графику на&nbsp;любые физические и&nbsp;цифровые носители&nbsp;— от&nbsp;фирменного мерча и&nbsp;блокнотов до&nbsp;баннеров и&nbsp;веб-страниц.
                    </p>
                  </div>
                </div>
              </FlatReveal>
            </div>

          </div>
        </FlatReveal>

      </div>
    </section>
  );
};
