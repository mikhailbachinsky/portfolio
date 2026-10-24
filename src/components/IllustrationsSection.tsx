import React, { useState, useEffect, useRef } from 'react';
import { FlatReveal } from './FlatReveal';
import { renderStableTypewriterSpan } from './TypewriterText';

export const IllustrationsSection: React.FC = () => {
  // Typewriter effect state for left card description
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const [showIllustration, setShowIllustration] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Скрытие иллюстрации при сужении окна, если места справа от текста недостаточно
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const checkFit = () => {
      const cardWidth = el.clientWidth;
      const cardHeight = el.clientHeight;
      const textWidth = triggerRef.current ? triggerRef.current.offsetWidth : 360;
      const remainingWidth = cardWidth - textWidth;
      // Показываем изображение, если справа от текста достаточно места (>= 220px) и высоты (>= 240px)
      setShowIllustration(remainingWidth >= 220 && cardHeight >= 240);
    };

    checkFit();
    const observer = new ResizeObserver(checkFit);
    observer.observe(el);
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const paragraph1 = 'Подход имитирует традиционную трафаретную печать, добавляя графике характерную текстурность и\u00A0визуальную крафтовость.';
  const paragraph2 = 'Использование этого стиля позволяет уйти от\u00A0стерильного векторного дизайна к\u00A0более человечному и\u00A0осязаемому формату, который считывается как\u00A0дружелюбный и\u00A0безопасный.';

  const len1 = paragraph1.length;
  const len2 = paragraph2.length;
  const totalLength = len1 + len2;

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
        }, 16);
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
    <section id="illustrations-section" className="w-full">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow маркер сверху секции */}
        <div className="w-full px-1 sm:px-3 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block">
            (иллюстрации)
          </span>
        </div>

        {/* 
          ОСНОВНОЙ КОНТЕЙНЕР КАРТОЧЕК:
          - Блок 1: Цифровая ризография с печатной машинкой и слотом illustration-1.svg (illustration-risograph.svg)
          - Блоки 2, 3, 4: Три цветные плашки 9:16 со слотами illustration-3.svg (зеленая), illustration-2.svg (персиковая), illustration-4.svg (розовая)
        */}
        <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 items-stretch lg:h-[460px] 2xl:h-[490px]">
          
          {/* КАРТОЧКА 1: ЦИФРОВАЯ РИЗОГРАФИЯ (выезд снизу аналогично левому блоку главного экрана) */}
          <FlatReveal direction="up" delay={60} distance={48} duration={950} className="flex-1 min-w-0 h-full">
            <div
              ref={cardRef}
              className="w-full h-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl border border-black/5 shadow-xs relative overflow-hidden flex flex-row items-stretch justify-between"
            >
              
              {/* Текстовый блок слева с эффектом печатной машинки */}
              <div ref={triggerRef} className="relative z-10 w-full sm:w-auto md:max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] p-6 sm:p-7 lg:p-8 flex flex-col justify-start space-y-3.5 sm:space-y-4 shrink-0">
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-[#181818] leading-[1.08] tracking-tight">
                  Цифровая<br />ризография
                </h2>

                <div className="text-sm sm:text-[15px] lg:text-base leading-relaxed text-[#181818]/90 font-normal relative grid grid-cols-1 grid-rows-1">
                  {/* Невидимый слой-распорка для фиксации высоты и предотвращения прыжков */}
                  <div className="invisible pointer-events-none select-none col-start-1 row-start-1 space-y-3" aria-hidden="true">
                    <p>{paragraph1}</p>
                    <p>{paragraph2}</p>
                  </div>

                  {/* Видимый печатающийся текст с предрассчитанным переносом предлогов */}
                  <div className="col-start-1 row-start-1 space-y-3">
                    <p>
                      {renderStableTypewriterSpan(
                        paragraph1,
                        typedChars,
                        !isTypingDone && typedChars <= len1
                      )}
                    </p>
                    <p>
                      {renderStableTypewriterSpan(
                        paragraph2,
                        Math.max(0, typedChars - len1),
                        !isTypingDone && typedChars > len1
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Слот иллюстрации: смещен вправо в зависимости от ширины текста, исключая конфликт */}
              {showIllustration && (
                <div className="flex-1 h-full min-w-0 relative overflow-hidden flex items-end justify-start pl-2 sm:pl-4 pointer-events-none select-none">
                  <img
                    src="/assets/illustration-risograph.webp"
                    alt="Иллюстрация: цифровая ризография"
                    className="h-full w-auto max-w-none object-contain object-left-bottom select-none block pointer-events-none"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes('.webp')) {
                        img.src = '/assets/illustration-risograph.png';
                      } else if (img.src.includes('/assets/illustration-risograph.png')) {
                        img.src = '/illustration-risograph.png';
                      } else if (img.src.includes('/illustration-risograph.png')) {
                        img.src = '/assets/illustration-1.png';
                      } else if (img.src.includes('/assets/illustration-1.png')) {
                        img.src = '/illustration-1.png';
                      } else if (img.src.includes('/illustration-1.png')) {
                        img.src = '/assets/illustration-1.svg';
                      } else {
                        img.style.display = 'none';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </FlatReveal>

          {/* БЛОК ИЗ 3 ПЛАШЕК */}
          <div className="w-full lg:w-auto grid grid-cols-3 lg:flex lg:flex-row gap-3 sm:gap-4 lg:gap-5 items-stretch shrink-0">
            
            {/* КАРТОЧКА 2: ЗЕЛЕНАЯ ПЛАШКА (#8FE06E) (каскадный вылет справа как у блоков hero) */}
            <FlatReveal direction="right" delay={140} distance={48} duration={950} className="w-full lg:w-auto lg:h-full aspect-[9/16] shrink-0">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#8FE06E] border border-black/5 shadow-xs relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/illustration-3.svg"
                  alt="Иллюстрация зеленая"
                  className="w-full h-full object-cover block scale-[1.01] origin-center"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('illustration-card-green.svg')) {
                      img.src = '/assets/illustration-card-green.svg';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
            </FlatReveal>

            {/* КАРТОЧКА 3: ПЕРСИКОВАЯ ПЛАШКА (#FFAD85) — Марафон самоорганизации (масштабировано на 2.5% для устранения зазора в углу) */}
            <FlatReveal direction="right" delay={220} distance={48} duration={950} className="w-full lg:w-auto lg:h-full aspect-[9/16] shrink-0">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#FFAD85] border border-black/5 shadow-xs relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/illustration-2.svg"
                  alt="Иллюстрация персиковая"
                  className="w-full h-full object-cover block scale-[1.025] origin-center"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('illustration-card-peach.svg')) {
                      img.src = '/assets/illustration-card-peach.svg';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
            </FlatReveal>

            {/* КАРТОЧКА 4: РОЗОВАЯ ПЛАШКА (#F27A93) */}
            <FlatReveal direction="right" delay={300} distance={48} duration={950} className="w-full lg:w-auto lg:h-full aspect-[9/16] shrink-0">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#F27A93] border border-black/5 shadow-xs relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/illustration-4.svg"
                  alt="Иллюстрация розовая"
                  className="w-full h-full object-cover block"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('illustration-card-rose.svg')) {
                      img.src = '/assets/illustration-card-rose.svg';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
            </FlatReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
