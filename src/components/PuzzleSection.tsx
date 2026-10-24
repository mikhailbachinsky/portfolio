import React, { useEffect, useRef, useState } from 'react';
import { HighlighterMark } from './HighlighterMark';
import { FlatReveal } from './FlatReveal';

/**
 * PuzzleSection:
 * Секция с презентацией логотипа Тьюторской службы:
 * 1. Формула логотипа (ТГУ + Маяк-буква «Т» = Итоговый логотип)
 * 2. Единая бенто-сетка: (поиск формы) и (поля безопасности) вместе
 */
export const PuzzleSection: React.FC = () => {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setIsAssembled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAssembled(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="metaphor-section" 
      className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16 flex flex-col items-center overflow-hidden"
    >
      {/* 1. ГЛАВНАЯ КАРТОЧКА: ФОРМУЛА ЛОГОТИПА */}
      <div 
        ref={containerRef}
        className="w-full bg-[#FFAD85] rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-10 relative overflow-hidden flex flex-col items-center shadow-xs border border-black/5"
      >
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">

          {/* DESKTOP VIEW */}
          <div className="hidden sm:flex w-full justify-center">
            <div className="relative w-full max-w-[1120px] aspect-[1166/503]">
              
              {/* Eyebrow marker "(лого)" */}
              <div 
                className={`absolute left-0 top-[14px] z-20 pointer-events-none select-none transition-all duration-700 ease-out ${
                  isAssembled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold text-[#181818] block leading-none">
                  (лого)
                </span>
              </div>

              {/* 1. ЛЕВЫЙ ПАЗЛ + ЛОГОТИП ТГУ + ЗНАК '+' */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isAssembled ? 'translateX(0px)' : 'translateX(-64px)',
                  opacity: isAssembled ? 1 : 0,
                }}
              >
                <svg
                  viewBox="0 0 1166 503"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0, 58.24)">
                    <path
                      d="M388.407 115.943C388.407 126.988 397.621 135.609 408.022 139.327C430.548 147.38 446.667 168.909 446.667 194.203C446.667 219.497 430.548 241.026 408.022 249.078C397.621 252.797 388.407 261.417 388.407 272.463V368.405C388.407 379.451 379.453 388.405 368.407 388.405H271.554C260.847 388.405 252.377 397.088 248.473 407.058C239.986 428.734 218.888 444.085 194.204 444.085C169.52 444.085 148.422 428.734 139.934 407.058C136.031 397.088 127.56 388.405 116.853 388.405H20C8.95431 388.405 0 379.451 0 368.405L0 20C0 8.95432 8.95431 0 20 0L368.407 0C379.453 0 388.407 8.9543 388.407 20V115.943Z"
                      fill="#F1F1F1"
                      stroke="#181818"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                  </g>

                  <text
                    x="388.4"
                    y="252"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none fill-[#181818]"
                    style={{ fontSize: '52px', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    +
                  </text>
                </svg>

                <div 
                  className="absolute left-[0%] top-[11.5%] w-[33.3%] h-[77%] flex items-center justify-center p-6 pr-8 pointer-events-auto"
                  aria-label="Исходный логотип ТГУ"
                >
                  <img
                    src="/assets/logo-original.svg"
                    alt="Исходный логотип"
                    decoding="async"
                    className="max-w-[70%] max-h-[66%] object-contain"
                  />
                </div>
              </div>

              {/* 2. ЦЕНТРАЛЬНЫЙ ПАЗЛ + ТЕКСТ С МАРКЕРАМИ */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: isAssembled ? 1 : 0,
                  transform: isAssembled ? 'scale(1)' : 'scale(0.97)',
                }}
              >
                <svg
                  viewBox="0 0 1166 503"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(388.4, 58.24)">
                    <path
                      d="M388.575 118.439C388.575 128.636 380.664 136.866 371.349 141.015C350.965 150.094 336.754 170.53 336.754 194.285C336.754 218.04 350.965 238.475 371.349 247.554C380.664 251.703 388.575 259.933 388.575 270.13V368.575C388.575 379.621 379.621 388.575 368.575 388.575H272.088C261.231 388.575 252.693 379.659 248.87 369.497C240.57 347.429 219.268 331.728 194.298 331.728C169.328 331.728 148.026 347.429 139.726 369.497C135.904 379.659 127.366 388.575 116.509 388.575H20C8.95431 388.575 0 379.621 0 368.575V272.077C0 261.219 8.91765 252.68 19.0809 248.859C41.1516 240.56 56.8554 219.257 56.8555 194.285C56.8555 169.314 41.1517 148.009 19.0809 139.71C8.91768 135.888 0 127.35 0 116.492V20C0 8.9543 8.9543 0 20 0H116.013C127.058 0 135.678 9.21302 139.395 19.6142C147.45 42.1539 168.99 58.2831 194.298 58.2832C219.606 58.2832 241.146 42.154 249.201 19.6142C252.917 9.21301 261.538 0 272.583 0H368.575C379.621 0 388.575 8.95431 388.575 20V118.439Z"
                      fill="#F1F1F1"
                      stroke="#181818"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                <div 
                  className="absolute left-[33.3%] top-[11.5%] w-[33.3%] h-[77%] flex flex-col items-center justify-center text-center px-4 pointer-events-auto select-text"
                >
                  <div className="text-base sm:text-lg lg:text-[21px] xl:text-[22px] leading-[1.38] text-[#181818] font-normal tracking-tight flex items-center justify-center">
                    <p>
                      <HighlighterMark color="green" variant="casual-sweep" active={isAssembled} delay={300} className="mr-1">
                        Маяк
                      </HighlighterMark>
                      <span className="whitespace-nowrap">как&nbsp;символ</span>
                      <br />
                      проводника,
                      <br />
                      описывающий
                      <br />
                      <HighlighterMark color="rose" variant="shifted-down" active={isAssembled} delay={450} className="mr-1">
                        букву&nbsp;«Т»,
                      </HighlighterMark>
                      <br />
                      <span className="whitespace-nowrap">Тьюторы ТГУ</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. ПРАВЫЙ ПАЗЛ + ЗНАК '=' + ИТОГОВЫЙ ЛОГОТИП */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isAssembled ? 'translateX(0px)' : 'translateX(64px)',
                  opacity: isAssembled ? 1 : 0,
                }}
              >
                <svg
                  viewBox="0 0 1166 503"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="776.8"
                    y="252"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none fill-[#181818]"
                    style={{ fontSize: '52px', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    =
                  </text>

                  <g transform="translate(776.8, 58.24)">
                    <path
                      d="M368.575 0C379.621 0 388.575 8.9543 388.575 20V368.575C388.575 379.621 379.621 388.575 368.575 388.575H20C8.9543 388.575 0 379.621 0 368.575V270.13C0 259.933 -7.91097 251.703 -17.2259 247.554C-37.6099 238.475 -51.8211 218.04 -51.8211 194.285C-51.8211 170.53 -37.6099 150.094 -17.2259 141.015C-7.91097 136.866 0 128.636 0 118.439V20C0 8.95431 8.95431 0 20 0H368.575Z"
                      fill="#F1F1F1"
                      stroke="#181818"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                <div 
                  className="absolute left-[66.6%] top-[11.5%] w-[33.3%] h-[77%] flex items-center justify-center p-6 pl-8 pointer-events-auto"
                  aria-label="Итоговый логотип тьюторов ТГУ"
                >
                  <img
                    src="/assets/logo-final.svg"
                    alt="Итоговый логотип"
                    decoding="async"
                    className="max-w-[70%] max-h-[66%] object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="sm:hidden w-full flex flex-col items-center">
            <div className="relative w-full max-w-[340px] aspect-[400/960] mt-2">
              
              <div 
                className={`absolute left-0 -top-5 z-20 pointer-events-none select-none transition-all duration-700 ease-out ${
                  isAssembled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <span className="text-xs font-semibold text-[#181818] block leading-none">
                  (лого)
                </span>
              </div>

              {/* 1. Верхний пазл (Логотип ТГУ) + знак '+' */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isAssembled ? 'translateY(0px)' : 'translateY(-48px)',
                  opacity: isAssembled ? 1 : 0,
                }}
              >
                <svg viewBox="0 0 400 960" className="w-full h-full drop-shadow-xs overflow-visible" fill="none">
                  <path
                    d="M 40 20 H 360 A 20 20 0 0 1 380 40 V 320 H 254.8 C 247 320 241 326.5 238.4 333.7 C 232.8 349.5 217.7 360.8 200 360.8 C 182.3 360.8 167.2 349.5 161.6 333.7 C 159 326.5 153 320 145.2 320 H 20 V 40 A 20 20 0 0 1 40 20 Z"
                    fill="#F1F1F1"
                    stroke="#181818"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x="200"
                    y="341"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none fill-[#181818]"
                    style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    +
                  </text>
                </svg>

                <div className="absolute top-[2.1%] left-[5%] w-[90%] h-[30%] flex items-center justify-center p-4 pb-6 pointer-events-auto">
                  <img
                    src="/assets/logo-original.svg"
                    alt="Исходный логотип"
                    decoding="async"
                    className="max-w-[70%] max-h-[72%] object-contain"
                  />
                </div>
              </div>

              {/* 2. Средний пазл (Маяк-буква «Т») + знак '=' */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: isAssembled ? 1 : 0,
                  transform: isAssembled ? 'scale(1)' : 'scale(0.96)',
                }}
              >
                <svg viewBox="0 0 400 960" className="w-full h-full drop-shadow-xs overflow-visible" fill="none">
                  <path
                    d="M 20 320 H 145.2 C 153 320 159 326.5 161.6 333.7 C 167.2 349.5 182.3 360.8 200 360.8 C 217.7 360.8 232.8 349.5 238.4 333.7 C 241 326.5 247 320 254.8 320 H 380 V 620 H 254.8 C 247 620 241 626.5 238.4 633.7 C 232.8 649.5 217.7 660.8 200 660.8 C 182.3 660.8 167.2 649.5 161.6 633.7 C 159 626.5 153 620 145.2 620 H 20 V 320 Z"
                    fill="#F1F1F1"
                    stroke="#181818"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x="200"
                    y="641"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none fill-[#181818]"
                    style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    =
                  </text>
                </svg>

                <div className="absolute top-[37%] left-[6%] w-[88%] h-[27%] flex flex-col items-center justify-center text-center px-2 pointer-events-auto select-text">
                  <div className="text-[15px] sm:text-base leading-[1.38] text-[#181818] font-normal tracking-tight">
                    <p>
                      <HighlighterMark color="green" variant="casual-sweep" active={isAssembled} delay={300} className="mr-1">
                        Маяк
                      </HighlighterMark>
                      как символ
                      <br />
                      проводника,
                      <br />
                      описывающий
                      <br />
                      <HighlighterMark color="rose" variant="shifted-down" active={isAssembled} delay={450} className="mr-1">
                        букву «Т»,
                      </HighlighterMark>
                      <br />
                      Тьюторы ТГУ
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Нижний пазл (Итоговый логотип) */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-[900ms] delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isAssembled ? 'translateY(0px)' : 'translateY(48px)',
                  opacity: isAssembled ? 1 : 0,
                }}
              >
                <svg viewBox="0 0 400 960" className="w-full h-full drop-shadow-xs overflow-visible" fill="none">
                  <path
                    d="M 20 620 H 145.2 C 153 620 159 626.5 161.6 633.7 C 167.2 649.5 182.3 660.8 200 660.8 C 217.7 660.8 232.8 649.5 238.4 633.7 C 241 626.5 247 620 254.8 620 H 380 V 920 A 20 20 0 0 1 360 940 H 40 A 20 20 0 0 1 20 920 V 620 Z"
                    fill="#F1F1F1"
                    stroke="#181818"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="absolute top-[70%] left-[5%] w-[90%] h-[26%] flex items-center justify-center p-4 pt-2 pointer-events-auto">
                  <img
                    src="/assets/logo-final.svg"
                    alt="Итоговый логотип"
                    decoding="async"
                    className="max-w-[70%] max-h-[72%] object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. ЕДИНАЯ БЕНТО-СЕТКА: (ПОИСК ФОРМЫ) + (ПОЛЯ БЕЗОПАСНОСТИ) ВМЕСТЕ
          ========================================================================= */}
      <div className="w-full mt-6 sm:mt-8 lg:mt-10">
        <FlatReveal direction="up" delay={50} distance={20}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            
            {/* КАРТОЧКА 1: ПОИСК ФОРМЫ (7 колонок из 12) */}
            <div className="lg:col-span-7 rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xs h-full">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm text-[#737373] font-normal block">
                  (поиск формы)
                </span>

                <div className="space-y-3.5 text-sm sm:text-base lg:text-[16px] text-[#181818] font-normal leading-relaxed [text-wrap:pretty]">
                  <p>
                    Форма знака родилась из&nbsp;строгого требования службы: сохранить силуэт классического{' '}
                    <HighlighterMark color="peach" variant="casual-sweep" delay={200}>
                      академического щита ТГУ
                    </HighlighterMark>,
                    но&nbsp;вписать внутрь собственный символ&nbsp;тьюторов.
                  </p>

                  <p>
                    Чтобы привязать знак к&nbsp;миссии службы, мы&nbsp;выбрали{' '}
                    <HighlighterMark color="green" variant="shifted-down" delay={350}>
                      метафору проводника
                    </HighlighterMark>.
                    На&nbsp;этапе поиска прорабатывался вариант с&nbsp;компасом, однако мы&nbsp;отсекли его в&nbsp;пользу маяка: маяк не&nbsp;только символизирует ориентир, но&nbsp;и&nbsp;описывает{' '}
                    <HighlighterMark color="rose" variant="overshoot" delay={450}>
                      букву&nbsp;«Т»
                    </HighlighterMark>{' '}
                    (Тьюторы, ТГУ), сохраняя преемственность университета и&nbsp;добавляя скрытую&nbsp;семантику.
                  </p>
                </div>
              </div>

              {/* Отдельный бенто-блок для эскиза с компасом */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-2xs flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                {/* Иконка компаса с фирменным перечеркиванием */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl border border-black/10 bg-[#FAF8F5] p-3 sm:p-3.5 flex items-center justify-center shadow-xs overflow-hidden">
                  <img
                    src="/assets/logo-compass.svg"
                    alt="Поисковый эскиз с компасом"
                    decoding="async"
                    className="w-full h-full object-contain opacity-85 select-none"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/logo-compass.svg')) {
                        target.src = '/logo-compass.svg';
                      }
                    }}
                  />
                  {/* Перечеркивающий крестик */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none p-2.5 sm:p-3" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M 23 42 C 22 36, 27 28, 38 23 C 44 21, 51 26, 60 36 C 80 56, 99 77, 119 100 C 139 123, 157 146, 172 166 C 178 173, 181 178, 178 182 C 174 186, 168 187, 161 184 C 152 178, 143 169, 132 156 C 114 135, 95 113, 76 92 C 57 71, 41 53, 31 44 C 26 41, 24 43, 23 42 Z" 
                      fill="#F27A93" 
                      style={{ opacity: 0.9, mixBlendMode: 'multiply' }}
                    />
                    <path 
                      d="M 163 21 C 170 20, 178 27, 182 36 C 183 41, 177 47, 168 58 C 151 78, 133 100, 114 122 C 94 144, 73 166, 52 185 C 44 193, 36 197, 29 194 C 23 190, 22 183, 26 177 C 34 167, 46 154, 59 139 C 79 117, 99 94, 119 72 C 137 52, 152 35, 160 25 C 162 23, 163 22, 163 21 Z" 
                      fill="#F27A93" 
                      style={{ opacity: 0.9, mixBlendMode: 'multiply' }}
                    />
                  </svg>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs sm:text-sm font-semibold text-[#181818] block">
                    Поисковый вариант (компас)
                  </span>
                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed [text-wrap:pretty]">
                    Хороший образ навигатора, уступивший маяку из-за отсутствия литеры «Т» и более сильной академической связи с гербом ТГУ.
                  </p>
                </div>
              </div>
            </div>

            {/* КАРТОЧКА 2: ПОЛЯ БЕЗОПАСНОСТИ (5 колонок из 12) */}
            <div className="lg:col-span-5 rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xs h-full">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm text-[#737373] font-normal block">
                  (поля безопасности)
                </span>

                <p className="text-xs sm:text-sm lg:text-[15px] text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                  За базовый модуль{' '}
                  <HighlighterMark color="green" variant="shifted-down" delay={200}>
                    X
                  </HighlighterMark>{' '}
                  принята ширина знака-маяка (буквы&nbsp;«Т»). Минимальное охранное поле{' '}
                  <HighlighterMark color="rose" variant="overshoot" delay={350}>
                    1X
                  </HighlighterMark>{' '}
                  со&nbsp;всех четырёх сторон гарантирует обособленность логотипа от&nbsp;текста и&nbsp;графических элементов.
                </p>

                {/* Техническая чертежная схема охранной зоны логотипа Тьюторской службы ТГУ со скруглениями */}
                <div className="w-full rounded-2xl border border-black/10 bg-white p-4 sm:p-6 flex items-center justify-center relative select-none shadow-xs overflow-hidden">
                  
                  {/* Контейнер схемы с внешним скруглённым пунктирным полем и внутренним скруглённым сплошным контуром */}
                  <div className="relative my-3 sm:my-4 p-5 sm:p-6 flex items-center justify-center max-w-full">
                    
                    {/* Внешний пунктирный контур с аккуратным скруглением (Охранное поле 1X) */}
                    <div className="absolute inset-0 border-2 border-dashed border-[#181818]/35 rounded-[18px] sm:rounded-[22px] pointer-events-none z-0" />

                    {/* Выносные метки 1X со всех четырёх сторон — строго единое скругление rounded-md */}
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#8FE06E] text-[#181818] font-mono text-[10px] font-bold rounded-md shadow-2xs">
                      1X
                    </span>
                    <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#8FE06E] text-[#181818] font-mono text-[10px] font-bold rounded-md shadow-2xs">
                      1X
                    </span>
                    <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#8FE06E] text-[#181818] font-mono text-[10px] font-bold rounded-md shadow-2xs">
                      1X
                    </span>
                    <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#8FE06E] text-[#181818] font-mono text-[10px] font-bold rounded-md shadow-2xs">
                      1X
                    </span>

                    {/* Внутренний сплошной контур со скруглением в едином стиле сайта */}
                    <div className="relative border-2 border-solid border-[#181818] p-3 sm:p-4 rounded-xl bg-white flex items-center justify-center z-10">
                      
                      {/* Логотип Тьюторской службы ТГУ */}
                      <div className="relative flex items-center justify-center max-w-[190px] sm:max-w-[240px]">
                        <img
                          src="/assets/header-logo.svg"
                          alt="Логотип Тьюторской службы ТГУ"
                          decoding="async"
                          className="w-full h-auto object-contain"
                        />

                        {/* Выносной маркер модуля X на вершине знака маяка */}
                        <div className="absolute top-[2%] left-[1.5%] px-1 py-[1px] bg-[#8FE06E] border border-[#181818] rounded-md shadow-2xs flex items-center gap-1 pointer-events-none">
                          <span className="text-[9px] font-bold text-[#181818] leading-none">X = знак</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </FlatReveal>
      </div>

    </section>
  );
};
