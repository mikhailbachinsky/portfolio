import React from 'react';
import { 
  Award,
  GraduationCap,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { HorseShieldIcon, GrouseMedalIcon } from './EthnicOrnaments';

interface ImpactPillar {
  id: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const IMPACT_PILLARS: ImpactPillar[] = [
  {
    id: 'pedagogy',
    badge: 'Школьная педагогика',
    icon: GraduationCap,
    title: 'Учебное пособие для\u00A0уроков краеведения',
    description: 'Официально рекомендовано Администрацией Верхнекетского района для\u00A0уроков краеведения в\u00A0школах и\u00A0музее «Затёски».'
  },
  {
    id: 'scientific',
    badge: 'Научная верификация',
    icon: ShieldCheck,
    title: 'Академическая достоверность',
    description: 'Фиксирует лексику селькупов, кетов и\u00A0эвенков. Материалы и\u00A0словарные статьи верифицированы старшим научным сотрудником Томского областного краеведческого музея им.\u00A0М.\u00A0Б.\u00A0Шатилова.'
  },
  {
    id: 'scaling',
    badge: 'Масштабирование',
    icon: TrendingUp,
    title: 'Тиражируемая модель',
    description: 'Модульная издательская система и\u00A0процесс работы с\u00A0нейросетями готовы к\u00A0адаптации для\u00A0сохранения языков малых народов в\u00A0любых регионах без\u00A0повторных затрат.'
  }
];

export const ImpactSection: React.FC = () => {
  return (
    <section 
      id="impact" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
          
          {/* Левая функциональная зона (Колонки 1-4) со sticky-фиксацией */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Итоги проекта
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Результаты
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
              <p>
                Две победы в&nbsp;грантовых конкурсах, официальное признание методики и&nbsp;открытая модель сохранения редких культур Сибири.
              </p>
            </div>
          </div>

          {/* Правая функциональная зона (Колонки 5-12) */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-10">
            
            {/* Программный тезис результатов с вертикальным дивайдером */}
            <div className="space-y-4">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1C1C1C]/25 py-1">
                <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                  Проект вышел за&nbsp;рамки единичного кустарного издания, доказав жизнеспособность сочетания гражданской инициативы, продуктового дизайна и&nbsp;краеведческого сообщества.
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty">
                Словарь отпечатан тиражом в&nbsp;45&nbsp;экземпляров для&nbsp;школьного мини-музея «Затёски».<br />
                Проект привлёк грантовую поддержку и&nbsp;сформировал готовую платформу<br />
                для&nbsp;сохранения языков Сибири.
              </p>
            </div>

            {/* Метрики объема издания */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-1" role="region" aria-label="Ключевые показатели книги">
              <div className="p-3.5 sm:p-5 flex flex-col justify-start gap-1 sm:gap-1.5 overflow-hidden rounded-xl bg-white border border-[#1C1C1C]/15 min-w-0 group m3-card-interactive">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal leading-none text-[#1C1C1C] select-none">
                  12
                </span>
                <span className="text-[11px] sm:text-xs leading-snug text-[#1C1C1C]/75 font-sans">
                  тематических разделов
                </span>
              </div>

              <div className="p-3.5 sm:p-5 flex flex-col justify-start gap-1 sm:gap-1.5 overflow-hidden rounded-xl bg-white border border-[#1C1C1C]/15 min-w-0 group m3-card-interactive">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal leading-none text-[#1C1C1C] select-none">
                  350+
                </span>
                <span className="text-[11px] sm:text-xs leading-snug text-[#1C1C1C]/75 font-sans">
                  словарных статей
                </span>
              </div>

              <div className="p-3.5 sm:p-5 flex flex-col justify-start gap-1 sm:gap-1.5 overflow-hidden rounded-xl bg-white border border-[#1C1C1C]/15 min-w-0 group m3-card-interactive">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal leading-none text-[#1C1C1C] select-none">
                  3
                </span>
                <span className="text-[11px] sm:text-xs leading-snug text-[#1C1C1C]/75 font-sans">
                  языка коренных народов
                </span>
              </div>

              <div className="p-3.5 sm:p-5 flex flex-col justify-start gap-1 sm:gap-1.5 overflow-hidden rounded-xl bg-white border border-[#1C1C1C]/15 min-w-0 group m3-card-interactive">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal leading-none text-[#1C1C1C] select-none">
                  150
                </span>
                <span className="text-[11px] sm:text-xs leading-snug text-[#1C1C1C]/75 font-sans">
                  страниц книги
                </span>
              </div>
            </div>

            {/* БЛОК ГРАНТОВОГО ПРИЗНАНИЯ: ДВЕ ПОБЕДЫ В КОНКУРСАХ (БЕЗ group НА ВНЕШНЕМ КОНТЕЙНЕРЕ!) */}
            <div className="bg-white border border-[#1C1C1C]/15 rounded-xl p-6 sm:p-8 space-y-6 group m3-card-interactive">
              <div className="pb-4 border-b border-[#1C1C1C]/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/70">
                    <Award className="w-4 h-4 text-[#1C1C1C]/80 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <span>Грантовое признание</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                    Победитель двух грантовых конкурсов
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5" role="region" aria-label="Победы в грантовых конкурсах">
                {/* Грант 1 */}
                <article className="bg-[#FAF8F5] border border-[#1C1C1C]/12 rounded-xl p-5 sm:p-6 space-y-2.5 inner-card-interactive group/grant cursor-pointer">
                  <div className="flex items-center gap-2.5 text-xs font-sans text-[#1C1C1C]/60">
                    <HorseShieldIcon className="w-4.5 h-4.5 text-[#1C1C1C]/85 shrink-0 icon-horse-shield transition-transform duration-300" />
                    <span className="font-sans font-medium text-[#1C1C1C]/80">Областной уровень</span>
                  </div>

                  <div className="text-[#1C1C1C]" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed',
                    fontVariantNumeric: 'lining-nums',
                    fontFeatureSettings: '"kern" 1, "liga" 0'
                  }}>
                    Благотворительный фонд Михаила Киселёва
                  </div>

                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                    Победа в&nbsp;конкурсе проектов Томской области на&nbsp;предоставление грантов. Высокая экспертная оценка общественной инициативы по&nbsp;сохранению самобытной культуры коренных народов Верхнекетья.
                  </p>
                </article>

                {/* Грант 2 */}
                <article className="bg-[#FAF8F5] border border-[#1C1C1C]/12 rounded-xl p-5 sm:p-6 space-y-2.5 inner-card-interactive group/grant cursor-pointer">
                  <div className="flex items-center gap-2.5 text-xs font-sans text-[#1C1C1C]/60">
                    <GrouseMedalIcon className="w-4.5 h-4.5 text-[#1C1C1C]/85 shrink-0 icon-grouse-medal transition-transform duration-300" />
                    <span className="font-sans font-medium text-[#1C1C1C]/80">Районный уровень</span>
                  </div>

                  <div className="text-[#1C1C1C]" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed',
                    fontVariantNumeric: 'lining-nums',
                    fontFeatureSettings: '"kern" 1, "liga" 0'
                  }}>
                    «Малая культурная мозаика Верхнекетья»
                  </div>

                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                    Победа в&nbsp;конкурсе социокультурных проектов Верхнекетского района. Целевое содействие школьному музею «Затёски» и&nbsp;проектно-событийная оболочка издания книги.
                  </p>
                </article>
              </div>
            </div>

            {/* 3 ВЕКТОРА ПРАКТИЧЕСКИХ РЕЗУЛЬТАТОВ */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>Векторы внедрения</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5" role="region" aria-label="Векторы внедрения результатов">
                {IMPACT_PILLARS.map((pillar) => (
                  <article 
                    key={pillar.id}
                    className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 shadow-2xs group flex flex-col justify-between space-y-4 m3-card-interactive"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/70 tracking-wide">
                        <pillar.icon className="w-4 h-4 text-[#1C1C1C]/75 group-hover:text-[#1C1C1C] group-hover:scale-125 transition-all duration-300 ease-out shrink-0" strokeWidth={1.8} aria-hidden="true" />
                        <span>{pillar.badge}</span>
                      </div>

                      <div className="text-[#1C1C1C]" style={{ 
                        fontFamily: 'Kurale, serif',
                        fontSize: '19px',
                        lineHeight: '1.2',
                        fontWeight: 400,
                        fontSynthesis: 'none',
                        WebkitFontSmoothing: 'grayscale',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeSpeed',
                        fontVariantNumeric: 'lining-nums',
                        fontFeatureSettings: '"kern" 1, "liga" 0'
                      }}>
                        {pillar.title}
                      </div>
                      
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ВЫВОД ПРОЕКТА */}
            <div className="bg-white border-2 border-[#1C1C1C]/25 rounded-xl p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden group cursor-pointer m3-card-interactive">
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/70">
                <span>Главный вывод проекта</span>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug text-balance">
                За&nbsp;счёт использования современных генеративных нейросетей и&nbsp;продуктового подхода можно с&nbsp;куда меньшими затратами реализовать социально значимые инициативы, недоступные до&nbsp;этого в&nbsp;силу их&nbsp;дороговизны.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
