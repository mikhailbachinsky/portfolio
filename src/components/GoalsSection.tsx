import React, { useRef } from 'react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';
import { PuzzleComposition } from './PuzzleComposition';

export const GoalsSection: React.FC = () => {
  const goalsSectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={goalsSectionRef} id="goals-section" className="w-full">
      {/* 
        БЕНТО-АРХИТЕКТУРА ДЛЯ СЕКЦИЙ (КОНТЕКСТ, ЗАДАЧА, РЕШЕНИЕ):
        - Каждая секция оформлена в виде чистой, просторной бенто-карточки
        - Скругление 24-32px, мягкий фон #FAF8F5 / #F6F6F4, тонкий бордер border-black/10
        - Сохранены все кегли, фирменные хайлайтеры и кинематика пазлов
      */}
      <div className="w-full px-3 sm:px-4 lg:px-5 py-6 sm:py-8 lg:py-10 space-y-8 sm:space-y-12">

        {/* =========================================================================
            1. (КОНТЕКСТ) — НАПРЯМУЮ НА ФОНЕ БЕЗ СЕРЫХ КАРТОЧЕК
            ========================================================================= */}
        <FlatReveal direction="up" delay={40} distance={20}>
          <div className="w-full px-2 sm:px-3 py-2">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
              
              {/* Левая часть: тег и главное определение (6 колонок) */}
              <div className="lg:col-span-6">
                <span className="text-xs sm:text-sm text-[#737373] font-normal block mb-2 sm:mb-3">
                  (контекст)
                </span>
                <p className="text-lg sm:text-xl lg:text-[23px] font-normal text-[#181818] leading-[1.38] tracking-tight [text-wrap:pretty]">
                  <HighlighterMark color="peach" direction="left-to-right" delay={150} variant="casual-sweep">
                    Тьюторская служба Томского государственного
                  </HighlighterMark>{' '}
                  <HighlighterMark color="green" direction="right-to-left" delay={350} variant="wobbly-tilted">
                    университета
                  </HighlighterMark>{' '}
                  — структурное подразделение высшего учебного заведения. Его главной целью
                  является <span className="font-medium">сопровождение человека на&nbsp;его индивидуальном образовательном&nbsp;пути</span>.
                  Каждый первокурсник при&nbsp;поступлении проходит онлайн-курс «Погружение
                  в&nbsp;университетскую&nbsp;среду» от&nbsp;тьюторов.
                </p>
              </div>

              {/* Правая часть: 2 малых блока текста в ряд слева направо (6 колонок) */}
              <div className="lg:col-span-6 lg:pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 items-start text-sm sm:text-base text-[#181818] font-normal leading-[1.6]">
                  {/* Блок проблемы */}
                  <p className="[text-wrap:pretty]">
                    У&nbsp;Тьюторской службы ТГУ никогда не&nbsp;было своего визуального стиля.
                    Коммуникация велась <span className="font-medium">хаотично</span>, из-за&nbsp;чего студенты воспринимали тьюторов <span className="whitespace-nowrap">как&nbsp;<HighlighterMark color="rose" direction="left-to-right" delay={400} variant="overshoot">оторванных</HighlighterMark></span>{' '}
                    от&nbsp;студентов менеджеров, только «кажущихся&nbsp;современными».
                  </p>

                  {/* Блок аудитории */}
                  <p className="[text-wrap:pretty]">
                    <HighlighterMark color="peach" direction="left-to-right" delay={250} variant="shifted-down">
                      Целевая аудитория
                    </HighlighterMark>{' '}
                    — <span className="whitespace-nowrap font-medium">вчерашние школьники</span> (17–18&nbsp;лет), причём как&nbsp;томичи, так&nbsp;и бывшие жители
                    других регионов. Все&nbsp;они попадают в&nbsp;огромный университет и&nbsp;испытывают стресс.
                    Строгий «взрослый» стиль отпугнул&nbsp;бы их.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </FlatReveal>

        {/* =========================================================
            2. БЕНТО-КАРТОЧКА: (ЗАДАЧА) — ИНВЕРСИЯ (ТЕМНЫЙ ФОН + СВЕТЛЫЙ ТЕКСТ)
            ========================================================= */}
        <FlatReveal direction="up" delay={60} distance={20}>
          <div className="w-full rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#181818] p-6 sm:p-8 lg:p-10 shadow-md overflow-hidden">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
              
              {/* Левая часть: тег и формулировка задачи (6 колонок, светлый текст) */}
              <div className="lg:col-span-6">
                <span className="text-xs sm:text-sm text-white/60 font-normal block mb-2 sm:mb-3">
                  (задача)
                </span>
                <p className="text-lg sm:text-xl lg:text-[23px] font-normal text-white leading-[1.34] tracking-tight [text-wrap:pretty]">
                  <HighlighterMark color="green" direction="left-to-right" delay={200} variant="overshoot" isDark={true}>
                    Разработать с&nbsp;0 айдентику
                  </HighlighterMark>{' '}
                  для&nbsp;Тьюторской службы ТГУ, способную трансформировать образ
                  из&nbsp;«дистанцированной администрации» в&nbsp;доступную и&nbsp;дружелюбную среду&nbsp;поддержки.
                </p>
              </div>

              {/* Правая часть: пазлы крупного масштаба по центру (6 колонок) */}
              <div className="lg:col-span-6 flex items-center justify-center py-2 sm:py-4">
                <div className="w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] flex items-center justify-center">
                  <PuzzleComposition 
                    targetRef={goalsSectionRef} 
                    className="w-full" 
                  />
                </div>
              </div>

            </div>
          </div>
        </FlatReveal>

        {/* =========================================================
            3. (РЕШЕНИЕ) — НАПРЯМУЮ НА ФОНЕ БЕЗ СЕРЫХ КАРТОЧЕК
            ========================================================= */}
        <FlatReveal direction="up" delay={80} distance={20}>
          <div className="w-full px-2 sm:px-3 py-2">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
              
              {/* Левая часть: тег, срок и личный опыт (6 колонок) */}
              <div className="lg:col-span-6">
                <span className="text-xs sm:text-sm text-[#737373] font-normal block mb-2 sm:mb-3">
                  (решение)
                </span>
                <p className="text-lg sm:text-xl lg:text-[23px] font-normal text-[#181818] leading-[1.34] tracking-tight [text-wrap:pretty]">
                  На&nbsp;сборку первой презентации с&nbsp;визуальной концепцией ушло{' '}
                  <span className="whitespace-nowrap">
                    <HighlighterMark color="rose" direction="left-to-right" delay={200} variant="wobbly-tilted">
                      всего 1,5&nbsp;недели
                    </HighlighterMark>
                  </span>.
                </p>
                <p className="text-sm sm:text-base text-[#181818]/75 font-normal leading-relaxed mt-3 sm:mt-4 [text-wrap:pretty]">
                  Сжатые сроки на&nbsp;старте компенсировались <span className="font-medium">личным опытом</span>: на&nbsp;младших курсах я&nbsp;сам был целевой аудиторией службы и&nbsp;знал боли студентов изнутри.
                </p>
              </div>

              {/* Правая часть: 2 блока текста в ряд слева направо (6 колонок) */}
              <div className="lg:col-span-6 lg:pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 items-start text-sm sm:text-base text-[#181818] font-normal leading-[1.6]">
                  {/* Блок антистресс */}
                  <p className="[text-wrap:pretty]">
                    Намеренный уход от&nbsp;академической строгости в&nbsp;сторону визуального дружелюбия
                    и&nbsp;метафоричности. Созданный стиль работает <span className="whitespace-nowrap">как <HighlighterMark color="peach" direction="right-to-left" delay={300} variant="short-end">«дизайн-антистресс»</HighlighterMark></span>{' '}
                    <span className="font-medium">
                      и&nbsp;безопасное&nbsp;пространство
                    </span>.
                  </p>

                  {/* Блок масштабирования */}
                  <p className="[text-wrap:pretty]">
                    Главным вызовом было уйти от&nbsp;хаотичного «минимума» к&nbsp;<span className="whitespace-nowrap"><HighlighterMark color="green" direction="left-to-right" delay={450} variant="shifted-down">масштабируемой системе</HighlighterMark></span>. Чтобы проверить жизнеспособность решений, концепция была протестирована на&nbsp;<span className="font-medium">студенческой фокус-группе</span>.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </FlatReveal>

      </div>
    </section>
  );
};
