import React from 'react';
import { DiamondSeparator } from './DiamondSeparator';

export interface TimelinePhase {
  id: string;
  number: string;
  waveLabel: string;
  dateRange: string;
  duration: string;
  title: string;
  description: string;
  touchpoints: string[];
  metric: string;
  metricLabel: string;
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'wave-1',
    number: '1',
    waveLabel: 'Волна 1',
    dateRange: '15\u00A0—\u00A025 ноября',
    duration: '11 дней',
    title: 'Тизерная интрига',
    description:
      'Запуск легенды о&nbsp;секретной вечеринке ко&nbsp;дню рождения Ю.&nbsp;И.&nbsp;Тгушкина. Слоган «Только не&nbsp;проболтайся!» без&nbsp;даты и&nbsp;локации создал мощный органический интерес.',
    touchpoints: ['Сообщество VK', 'Студенческие чаты', 'Тизерные аватарки'],
    metric: 'Охват x1.8 к норме',
    metricLabel: '+850 переходов за первые 48 часов',
  },
  {
    id: 'wave-2',
    number: '2',
    waveLabel: 'Волна 2',
    dateRange: '26\u00A0—\u00A030 ноября',
    duration: '5 дней',
    title: 'Локация и билеты',
    description:
      'Официальный анонс клубной локации и&nbsp;старт продаж со&nbsp;специальными парными и&nbsp;групповыми квотами, мгновенно разогревшими интерес студентов.',
    touchpoints: ['Анонс локации', 'Билетная платформа', 'Спецквоты для пар'],
    metric: '100% бронь VIP-зон',
    metricLabel: 'Все столы раскуплены в первые сутки',
  },
  {
    id: 'wave-3',
    number: '3',
    waveLabel: 'Волна 3',
    dateRange: '1\u00A0—\u00A04 декабря',
    duration: '4 дня',
    title: 'Вирусный ажиотаж',
    description:
      'Интерактивное голосование за&nbsp;авторские номинации («Краш института», «Преподаватель года») и&nbsp;нативная интеграция партнёров привели к&nbsp;досрочному закрытию продаж.',
    touchpoints: ['Номинация «Краш института»', 'Stories и опросы', 'Партнёрские дропы'],
    metric: 'Досрочный sold out',
    metricLabel: '297 билетов распроданы за 4 дня',
  },
  {
    id: 'wave-4',
    number: '4',
    waveLabel: 'Волна 4',
    dateRange: '5 декабря',
    duration: 'гала-ночь',
    title: 'Кульминация вечера',
    description:
      'Входной контроль по&nbsp;защищённым VIP-билетам, дресс-код Total Black & Emerald, морозная серебряная фотозона, вручение наград на&nbsp;главной сцене и&nbsp;ночная вечеринка.',
    touchpoints: ['Вход по VIP-билетам', 'Total Black & Emerald', 'Церемония на сцене'],
    metric: '297 гостей',
    metricLabel: '100% явка по проданным билетам',
  },
];

export const CampaignTimeline: React.FC = () => {
  return (
    <div className="relative">
      {/* -------------------------------------------------------------
          HEADER
         ------------------------------------------------------------- */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-silver-bright font-mono mb-1.5">
          <span>Хронология запуска</span>
          <DiamondSeparator className="!mx-1.5" />
          <span className="text-white/60">Ноябрь — Декабрь 2024</span>
        </div>
        <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
          Календарный таймлайн промо-кампании
        </h3>
      </div>

      {/* -------------------------------------------------------------
          TIMELINE TRACK & MILESTONES
          - Horizontal lines connect the Date and Duration (сроки) for each phase.
          - Emerald and crystal indicators stay strictly within safe left boundaries.
          - 4 columns on desktop (lg+), 2 columns on tablet (md), 1 column on mobile.
         ------------------------------------------------------------- */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-x-6 md:gap-y-3.5 lg:gap-4 xl:gap-5 font-mono text-xs">
          {TIMELINE_PHASES.map((phase) => (
            <div key={phase.id} className="flex items-center gap-2.5 sm:gap-3 w-full">
              {/* Diamond indicator strictly within safe boundaries */}
              <span
                className={`w-2 h-2 rotate-45 shrink-0 ${
                  phase.id === 'wave-1' || phase.id === 'wave-4'
                    ? 'bg-emerald-400 border border-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.85)]'
                    : 'bg-white/90 border border-white/70 shadow-[0_0_5px_rgba(255,255,255,0.6)]'
                }`}
              />

              {/* Дата (Date) */}
              <span className="text-white font-medium whitespace-nowrap text-xs sm:text-[12.5px]">
                {phase.dateRange}
              </span>

              {/* Горизонтальная линия, соединяющая дату и сроки */}
              <div className="flex-1 h-px bg-white/20 border-b border-dashed border-white/25" />

              {/* Сроки (Duration) */}
              <span className="text-silver-bright font-mono text-[11px] sm:text-xs whitespace-nowrap">
                {phase.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------
          4 CARDS GRID
          - "Волна 1", "Волна 2", "Волна 3", "Волна 4" wrapped in chips
          - Exactly ONE divider in each card: between main text and touchpoints
          - Touchpoints wrapped in chips
          - Outcome block anchored at bottom without an extra divider
         ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-5">
        {TIMELINE_PHASES.map((phase) => (
          <div
            key={phase.id}
            className="frost-card-glass border border-silver/30 p-5 sm:p-6 flex flex-col justify-between silver-contour shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-silver/50 transition-colors"
          >
            <div>
              {/* Chip: "Волна 1" (no leading zero, wrapped in chip) */}
              <div className="mb-3">
                <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-sm border border-silver/40 text-silver-bright font-semibold shadow-sm">
                  {phase.waveLabel}
                </span>
              </div>

              {/* Phase Title */}
              <h4 className="font-serif-luxury text-xl text-white mb-3 leading-snug">
                {phase.title}
              </h4>

              {/* Narrative Description */}
              <p
                className="text-xs sm:text-[13px] text-white/70 font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: phase.description }}
              />

              {/* The ONLY divider in the card: between main text and touchpoints */}
              <div className="h-px bg-white/10 my-4" />

              {/* Touchpoints wrapped in subtle translucent chips */}
              <div className="mb-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-2">
                  Точки контакта
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {phase.touchpoints.map((tp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 text-[10.5px] font-mono bg-white/[0.07] backdrop-blur-sm border border-white/10 text-white/75"
                    >
                      {tp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcome Metric: No divider above, pure accent bar anchored at bottom */}
            <div className="mt-auto pt-2">
              <div className="border-l-2 border-silver/60 pl-3 py-0.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-1">
                  Итог этапа
                </div>
                <div className="font-mono text-sm font-semibold text-silver-bright">
                  {phase.metric}
                </div>
                <div className="text-xs text-white/50 font-light mt-0.5 leading-relaxed">
                  {phase.metricLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
