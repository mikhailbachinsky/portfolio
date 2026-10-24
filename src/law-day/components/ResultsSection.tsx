import React from 'react';
import { CASE_METRICS, ART_DIRECTOR_STATEMENT } from '../data/caseData';
import { Check, Copy } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface ResultsSectionProps {
  onCopySummary?: () => void;
  copied?: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = () => {
  return (
    <section className="py-20 relative bg-transparent border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mb-14 relative z-10">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-mono">
            Результаты
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Грандиозное возрождение традиции института на&nbsp;новом уровне
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Переосмысление айдентики привело к&nbsp;реальным коммерческим и&nbsp;имиджевым результатам: 
            билеты были полностью распроданы за&nbsp;4&nbsp;дня до&nbsp;вечеринки, 
            клуб FACE был заполнен на&nbsp;100%, а&nbsp;LSA получил рекордный прирост лояльной аудитории.
          </p>
        </div>

        {/* 4 Big Metric Cards - 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-10 sm:mb-14 relative z-10">
          {CASE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-6 frost-card-glass border border-silver/30 hover:border-silver transition-colors flex flex-col justify-start silver-contour"
            >
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-silver-bright block mb-1 sm:mb-2">
                  {metric.label}
                </span>
                <div className="font-serif-luxury text-xl sm:text-3xl lg:text-3xl text-white mb-1.5 sm:mb-2 tracking-tight">
                  <AnimatedCounter value={metric.value} duration={1800} />
                </div>
                {metric.change && (
                  <span className="inline-block text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 border border-silver/40 text-white/90 mb-2 sm:mb-3 silver-contour-subtle">
                    {metric.change}
                  </span>
                )}
              </div>
              <p className="text-[10.5px] sm:text-xs text-white/60 font-light leading-relaxed pt-2 sm:pt-2.5 border-t border-silver/20">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Executive Feedback & Project Results: 2-Card Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {/* Card 1: Official Institutional Feedback */}
          <div className="p-5 sm:p-8 border border-silver/40 frost-card-glass silver-contour flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#34d399] border border-[#a7f3d0] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-xs uppercase tracking-wider text-white/70 font-mono font-medium">
                  Официальный отзыв
                </span>
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white mb-5">
                Оценка руководства института
              </h3>

              <blockquote className="border-l-2 border-[#34d399]/40 pl-4 sm:pl-5 py-1 text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 font-sans">
                «{ART_DIRECTOR_STATEMENT.quote}»
              </blockquote>
            </div>

            <div className="pt-6 border-t border-silver/20">
              <div className="text-sm sm:text-base text-white font-medium">
                {ART_DIRECTOR_STATEMENT.author}
              </div>
              <div className="text-xs text-white/50 mt-1 font-light">
                Куратор молодёжной политики и студенческих инициатив института
              </div>
            </div>
          </div>

          {/* Card 2: Comprehensive Project Execution & Stack */}
          <div className="p-6 sm:p-8 border border-silver/40 frost-card-glass silver-contour flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#34d399] border border-[#a7f3d0] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-xs uppercase tracking-wider text-white/70 font-mono font-medium">
                  Итог реализации проекта
                </span>
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white mb-4">
                Комплексный перезапуск бренда события под ключ
              </h3>

              <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
                {ART_DIRECTOR_STATEMENT.roleSummary}
              </p>

              <div className="text-xs text-white/55 mb-6">
                <span className="text-white/75 font-medium">Стейкхолдеры:</span> {ART_DIRECTOR_STATEMENT.stakeholders}
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div className="pt-6 border-t border-silver/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/50 uppercase tracking-wider mr-2 font-mono">Стек:</span>
                {ART_DIRECTOR_STATEMENT.tools.map(tool => (
                  <span
                    key={tool}
                    className="px-3 py-1 border border-silver/30 text-xs text-white/90 silver-contour-subtle bg-white/[0.02]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
