import React, { useState } from 'react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';

interface AvatarImageProps {
  srcs: string[];
  alt: string;
  fallback: string;
  className?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ srcs, alt, fallback, className = "w-11 h-11 rounded-full border border-black/10" }) => {
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(false);

  if (error || attempt >= srcs.length) {
    return (
      <div className={`flex items-center justify-center font-bold text-sm bg-white text-[#181818] ${className}`}>
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={srcs[attempt]}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => {
        if (attempt + 1 < srcs.length) {
          setAttempt(attempt + 1);
        } else {
          setError(true);
        }
      }}
    />
  );
};

interface CaseConclusionSectionProps {
  onOpenResume?: () => void;
}

export const CaseConclusionSection: React.FC<CaseConclusionSectionProps> = () => {
  return (
    <section id="conclusion-section" className="w-full">
      {/* 
        WINDOW CONTAINER:
        Строго по единой сетке страницы:
        px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16
      */}
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow маркер строго на единой левой силовой линии */}
        <div className="w-full pl-1 sm:pl-3 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block">
            (итоги)
          </span>
        </div>

        {/* Двухколоночный блок: Итог проекта и Отзыв */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch mb-5 sm:mb-6">
          
          {/* =========================================================
              ЛЕВЫЙ БЛОК (7 колонок): Лаконичный вывод по дизайн-кейсу
              ========================================================= */}
          <FlatReveal direction="left" delay={50} distance={48} duration={950} className="lg:col-span-7 h-full">
            <div className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/60 shadow-2xs p-5 sm:p-8 lg:p-9 flex flex-col justify-between">
              <div className="flex flex-col items-start">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-black/5 text-[#737373] mb-4">
                  Выводы
                </span>

                <h2 className="text-[16px] min-[360px]:text-[17.5px] min-[400px]:text-[19px] sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#181818] tracking-tight mb-4 sm:mb-6 leading-[1.25] sm:leading-tight">
                  <span className="block whitespace-nowrap sm:whitespace-normal">От&nbsp;разрозненных материалов&nbsp;—</span>
                  <span className="block whitespace-nowrap sm:whitespace-normal">к&nbsp;целостной визуальной</span>
                  <span className="block">
                    <HighlighterMark color="peach" variant="casual-sweep" delay={200}>
                      экосистеме
                    </HighlighterMark>
                  </span>
                </h2>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#181818]/80 font-normal leading-relaxed [text-wrap:pretty]">
                  <p>
                    Разработанная концепция призвана осознанно уйти от&nbsp;строгой академичности и&nbsp;сухой канцелярии классического университета в&nbsp;сторону человечного, открытого характера тьюторского сообщества. Знак-маяк стал визуальной метафорой{' '}
                    <HighlighterMark color="green" variant="shifted-down" delay={350}>
                      безопасного пути
                    </HighlighterMark>{' '}
                    и&nbsp;понятной навигации первокурсника в&nbsp;многотысячном&nbsp;кампусе.
                  </p>
                  <p>
                    Тёплая палитра «Мягкая сила», геометрический гротеск Geologica, дружелюбный маскот белки и&nbsp;прикладные шаблоны для&nbsp;цифровой и&nbsp;физической среды формируют{' '}
                    <HighlighterMark color="rose" variant="overshoot" delay={450}>
                      готовый набор инструментов
                    </HighlighterMark>{' '}
                    для&nbsp;будущей работы со&nbsp;студентами.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-start text-xs text-[#737373]">
                <span className="font-medium text-[#181818]">
                  Тьюторская служба · Томский государственный университет
                </span>
              </div>
            </div>
          </FlatReveal>

          {/* =========================================================
              ПРАВЫЙ БЛОК (5 колонок): Отзыв в фирменном цвете (#8FE06E)
              ========================================================= */}
          <FlatReveal direction="right" delay={140} distance={48} duration={950} className="lg:col-span-5 h-full">
            <div className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/15 bg-[#8FE06E] shadow-2xs p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              
              <div className="flex flex-col items-start relative z-10">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-black/10 text-[#181818] font-medium mb-5">
                  Отзыв
                </span>

                <blockquote className="text-sm sm:text-base text-[#181818] italic leading-relaxed mb-6 font-serif [text-wrap:pretty]">
                  «Миш, когда мы&nbsp;с&nbsp;тобой обсуждали проект, ты&nbsp;с&nbsp;первых минут точно уловил задачу: нам нужно было уйти от&nbsp;сухой академичности ТГУ и&nbsp;предложить образ, который сразу&nbsp;бы вызывал доверие у&nbsp;первокурсников.
                  <br /><br />
                  Концепция здорово передаёт наш дух. Знак-маяк стал понятным ориентиром, маскот-белка моментально оживила визуальный ряд, а&nbsp;в&nbsp;фирменных худи тьюторов теперь видно издалека на&nbsp;любых мероприятиях кампуса. Очень тёплая и&nbsp;живая работа получилась!)»
                </blockquote>
              </div>

              <div className="pt-4 border-t border-black/15 flex items-center gap-3 relative z-10 w-full">
                <div className="w-11 h-11 rounded-full bg-white border-2 border-[#181818]/15 shadow-xs flex items-center justify-center text-[#181818] font-bold text-sm shrink-0 overflow-hidden">
                  <AvatarImage
                    srcs={[
                      '/assets/avatar-alina.webp',
                      '/assets/avatar-alina.png',
                      '/avatar-alina.png',
                      '/assets/avatar-karina.webp',
                      '/assets/avatar-karina.png',
                      '/avatar-karina.png'
                    ]}
                    alt="Алина"
                    fallback="А"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-[#181818] truncate">
                    Алина
                  </h4>
                  <p className="text-xs text-[#181818]/80 truncate">
                    Тьютор студенческого сообщества
                  </p>
                </div>
              </div>

            </div>
          </FlatReveal>

        </div>

        {/* =========================================================
            БЕНТО-БЛОКИ: МЕТРИКИ И РЕЗУЛЬТАТЫ ПРОЕКТА
            ========================================================= */}
        <div className="w-full">
          <div className="w-full pl-1 sm:pl-3 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-[#737373] font-normal block">
              (проектный эффект)
            </span>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Блок 1 (7 колонок): Скорость создания постов и автономность команды */}
            <FlatReveal direction="up" delay={60} distance={32} duration={850} className="lg:col-span-7 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#181818]">
                      ~40&nbsp;мин
                    </span>
                    <span className="text-sm text-[#737373] font-normal">
                      на один пост
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                    Обложки и&nbsp;анонсы собираются силами команды{' '}
                    <HighlighterMark color="green" variant="wobbly-tilted" delay={150}>
                      без обращения к&nbsp;дизайнеру
                    </HighlighterMark>{' '}
                    благодаря готовой модульной системе&nbsp;шаблонов.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-black/5 flex items-center justify-between gap-2 text-xs text-[#737373]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#8FE06E] shrink-0" />
                    <span className="truncate">Автономность команды тьюторов</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#8FE06E]/20 text-[#181818] border border-[#8FE06E]/40 shrink-0">
                    было 2,5+&nbsp;ч
                  </span>
                </div>
              </div>
            </FlatReveal>

            {/* Блок 2 (5 колонок): Рост обращений к тьюторам */}
            <FlatReveal direction="up" delay={120} distance={32} duration={850} className="lg:col-span-5 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#181818]">
                      +18%
                    </span>
                    <span className="text-sm text-[#737373] font-normal">
                      обращений
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                    Дружелюбный визуальный язык помог первокурсникам{' '}
                    <HighlighterMark color="peach" variant="shifted-down" delay={200}>
                      преодолеть барьер
                    </HighlighterMark>{' '}
                    и&nbsp;не&nbsp;бояться писать тьюторам за&nbsp;поддержкой.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-black/5 flex items-center justify-between gap-2 text-xs text-[#737373]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#FFAD85] shrink-0" />
                    <span className="truncate">Индивидуальные консультации</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFAD85]/25 text-[#181818] border border-[#FFAD85]/40 shrink-0">
                    во «ВКонтакте»
                  </span>
                </div>
              </div>
            </FlatReveal>

            {/* Блок 3 (4 колонки): Охват первокурсников */}
            <FlatReveal direction="up" delay={180} distance={32} duration={850} className="lg:col-span-4 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#181818]">
                      2&nbsp;300+
                    </span>
                    <span className="text-sm text-[#737373] font-normal">
                      студентов
                    </span>
                  </div>

                  <p className="text-sm text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                    Охват на&nbsp;старте учебного года через{' '}
                    <HighlighterMark color="green" variant="casual-sweep" delay={250}>
                      курс адаптации «Погружение»
                    </HighlighterMark>{' '}
                    и&nbsp;навигационные материалы&nbsp;кампуса.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-black/5 flex items-center gap-2 text-xs text-[#737373]">
                  <span>Поток первого семестра</span>
                </div>
              </div>
            </FlatReveal>

            {/* Блок 4 (4 колонки): Рост реакций и репостов */}
            <FlatReveal direction="up" delay={240} distance={32} duration={850} className="lg:col-span-4 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#181818]">
                      в&nbsp;2.6&nbsp;раза
                    </span>
                    <span className="text-sm text-[#737373] font-normal">
                      больше реакций
                    </span>
                  </div>

                  <p className="text-sm text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                    Студенты{' '}
                    <HighlighterMark color="rose" variant="overshoot" delay={300}>
                      активнее сохраняют
                    </HighlighterMark>{' '}
                    памятки и&nbsp;чек-листы с&nbsp;маскотом и&nbsp;делятся ими в&nbsp;чатах учебных&nbsp;групп.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-black/5 flex items-center gap-2 text-xs text-[#737373]">
                  <span>Вовлечённость контента</span>
                </div>
              </div>
            </FlatReveal>

            {/* Блок 5 (4 колонки): Раздача мерча */}
            <FlatReveal direction="up" delay={300} distance={32} duration={850} className="lg:col-span-4 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#181818]">
                      400
                    </span>
                    <span className="text-sm text-[#737373] font-normal">
                      стикерпаков
                    </span>
                  </div>

                  <p className="text-sm text-[#181818]/85 font-normal leading-relaxed [text-wrap:pretty]">
                    <HighlighterMark color="peach" variant="short-end" delay={350}>
                      Фирменные наборы
                    </HighlighterMark>{' '}
                    переданы первокурсникам на&nbsp;первых университетских встречах и&nbsp;Дне знаний&nbsp;ТГУ.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-black/5 flex items-center gap-2 text-xs text-[#737373]">
                  <span>Физическое присутствие</span>
                </div>
              </div>
            </FlatReveal>
          </div>
        </div>

      </div>
    </section>
  );
};

