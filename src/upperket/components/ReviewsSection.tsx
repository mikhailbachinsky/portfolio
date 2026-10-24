import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewItem {
  id: string;
  authorName: string;
  authorTitle: string;
  organization: string;
  quoteText: string;
  rating?: number;
}

const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'review-1',
    authorName: 'Ольга Кузнецова',
    authorTitle: 'Специалист по\u00A0молодёжной политике',
    organization: '',
    quoteText: 'Проделана колоссальная работа по\u00A0сбору, систематизации и\u00A0визуальному оформлению сложного материала. Дизайнеру удалось превратить разрозненные данные в\u00A0логичный и\u00A0эстетичный продукт. Это действительно зрелая, грамотная и\u00A0глубоко осмысленная работа.',
    rating: 5
  },
  {
    id: 'review-2',
    authorName: 'Татьяна Мамзина',
    authorTitle: 'Учитель русского языка, корректор',
    organization: '',
    quoteText: 'Это не\u00A0просто качественное визуальное оформление, а\u00A0фундаментальный труд. Материал структурирован настолько грамотно и\u00A0увлекательно, что\u00A0я изучала его несколько часов подряд. Искреннее уважение за\u00A0столь глубокое погружение в\u00A0исторический контекст.',
    rating: 5
  },
  {
    id: 'review-3',
    authorName: 'Сергей Кирпотин',
    authorTitle: 'Директор НОЦ, д-р биол. наук',
    organization: '',
    quoteText: 'Проект выполнен с\u00A0исключительной чуткостью. Михаил вложил в\u00A0работу столько уважения к\u00A0смыслам и\u00A0нашему наследию, что\u00A0итоговый результат по-настоящему трогает за\u00A0душу. Это яркий пример того, как\u00A0дизайн делает сложные вещи живыми и\u00A0близкими.',
    rating: 5
  }
];

const TIMER_DURATION_MS = 6000;
const TIMER_STEP_MS = 50;

export const ReviewsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const cards = el.querySelectorAll('article');
    if (!cards.length) return;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - 24 - el.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  }, []);

  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('article');
    const targetCard = cards[idx] as HTMLElement | undefined;
    if (targetCard) {
      el.scrollTo({ left: targetCard.offsetLeft - 24, behavior: 'smooth' });
    } else {
      const cardWidth = (cards[0]?.offsetWidth || 300) + 16;
      el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    }
    setActiveIndex(idx);
    setProgress(0);
  }, []);

  const scrollNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % REVIEWS_LIST.length;
    scrollToIdx(nextIdx);
  }, [activeIndex, scrollToIdx]);

  const scrollPrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + REVIEWS_LIST.length) % REVIEWS_LIST.length;
    scrollToIdx(prevIdx);
  }, [activeIndex, scrollToIdx]);

  // Auto-play timer effect with active indicator progress fill (only on mobile/tablet)
  useEffect(() => {
    if (isPaused || isDragging.current || (typeof window !== 'undefined' && window.innerWidth >= 1024)) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TIMER_STEP_MS / TIMER_DURATION_MS) * 100;
        if (next >= 100) {
          const nextIdx = (activeIndex + 1) % REVIEWS_LIST.length;
          scrollToIdx(nextIdx);
          return 0;
        }
        return next;
      });
    }, TIMER_STEP_MS);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, scrollToIdx]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  return (
    <section 
      id="reviews" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
          
          {/* Левая функциональная зона (Колонки 1-4) со sticky-фиксацией */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Мнения и&nbsp;оценка
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Отзывы
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
              <p>
                Первые отклики и&nbsp;профессиональная оценка социальной и&nbsp;образовательной ценности проекта.
              </p>
            </div>
          </div>

          {/* Правая функциональная зона (Колонки 5-12) */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-6 sm:space-y-10 min-w-0 w-full">
            
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                Практическая ценность словаря глазами коллег, рецензентов и&nbsp;представителей гуманитарного сообщества.
              </p>
            </div>

            {/* Сетка карточек отзывов без обрезания масштабирования на ховере и с полным вылетом на мобильных */}
            <div 
              className="space-y-5 w-full min-w-0 relative overflow-visible"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div 
                ref={scrollRef}
                onScroll={checkScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="flex flex-row overflow-x-auto sm:overflow-visible no-scrollbar gap-4 py-3 -my-3 -mx-6 px-6 sm:mx-0 sm:px-0 sm:my-0 sm:py-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 touch-pan-x snap-x snap-mandatory scroll-smooth overscroll-x-contain select-none cursor-grab active:cursor-grabbing w-[calc(100%+3rem)] sm:w-full" 
                role="region" 
                aria-label="Отзывы и мнения о проекте"
              >
                {REVIEWS_LIST.map((review) => (
                  <article 
                    key={review.id}
                    className="w-[78vw] max-w-[310px] sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-start group bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-2xs m3-card-interactive"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[#1C1C1C]/50">
                        <Quote className="w-5 h-5 text-[#1C1C1C]/60 group-hover:text-[#1C1C1C] transition-colors duration-300" strokeWidth={1.8} aria-hidden="true" />
                        <div className="flex items-center gap-1" aria-label={`Оценка: ${review.rating || 5} из 5 звёзд`}>
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-3.5 h-3.5 text-[#1C1C1C]/70 group-hover:text-[#1C1C1C] group-hover:scale-115 group-hover:-rotate-6 transition-all duration-300 ease-out" 
                              strokeWidth={1.8} 
                              style={{ transitionDelay: `${i * 45}ms` }}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed italic text-pretty">
                        «{review.quoteText}»
                      </blockquote>
                    </div>

                    <footer className="pt-4 border-t border-[#1C1C1C]/10 space-y-0.5 font-sans">
                      <cite className="text-sm font-editorial font-normal text-[#1C1C1C] not-italic block">
                        {review.authorName}
                      </cite>
                      <div className="text-xs text-[#1C1C1C]/65">
                        {review.authorTitle}
                      </div>
                    </footer>
                  </article>
                ))}
              </div>

              {/* Индикаторы с оригинальным дизайном точек и полоски таймера */}
              <div className="flex lg:hidden items-center justify-between gap-4 pt-1">
                
                {/* Точки для неактивных отзывов и удлинённая полоска с прогрессом для активного */}
                <div 
                  className="flex items-center gap-2"
                  role="group"
                  aria-label="Индикаторы отзывов"
                >
                  {REVIEWS_LIST.map((_, idx) => {
                    const isCurrent = activeIndex === idx;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => scrollToIdx(idx)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 relative overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] ${
                          isCurrent ? 'w-8 sm:w-10 bg-[#1C1C1C]/20' : 'w-2 sm:w-2.5 bg-[#1C1C1C]/25 hover:bg-[#1C1C1C]/45'
                        }`}
                        aria-label={`Отзыв ${idx + 1}`}
                      >
                        {isCurrent && (
                          <div 
                            className="h-full bg-[#1C1C1C] rounded-full transition-all ease-linear"
                            style={{
                              width: `${progress}%`,
                              transitionDuration: !isPaused ? `${TIMER_STEP_MS}ms` : '150ms'
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Кнопки ручного перелистывания (Назад / Вперёд) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Предыдущий отзыв"
                    className="p-2 sm:p-2.5 rounded-lg border border-[#1C1C1C]/15 bg-white text-[#1C1C1C] hover:bg-[#FAF8F5] active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Следующий отзыв"
                    className="p-2 sm:p-2.5 rounded-lg border border-[#1C1C1C]/15 bg-white text-[#1C1C1C] hover:bg-[#FAF8F5] active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
