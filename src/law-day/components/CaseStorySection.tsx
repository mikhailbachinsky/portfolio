import React from 'react';
import { CampaignTimeline } from './CampaignTimeline';

export const CaseStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative bg-transparent border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
            Маркетинговая стратегия
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3">
            Промо-воронка:
            <span className="block mt-1 text-white/90">четыре волны коммуникации</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Поэтапная драматургия рекламной кампании обеспечивала поступательный прогрев аудитории со&nbsp;студентами: 
            от&nbsp;загадочного тизера без&nbsp;раскрытия локации до&nbsp;досрочного sold out в&nbsp;FACE Club.
          </p>
        </div>

        {/* Section Container with Image and Pure Text Card */}
        <div className="relative mb-12 sm:mb-16">
          {/* Pure Text Card: Contains ONLY text, 0 images inside, height is 100% purely derived from text */}
          <div className="p-5 sm:p-6 lg:p-7 frost-card-glass border border-silver/30 silver-contour relative z-10">
            {/* Text Column - Strictly occupies 2/3 of the card on desktop */}
            <div className="w-full md:w-2/3 md:max-w-[66.666%] pr-0 md:pr-6 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 text-[10px] sm:text-[11px] uppercase tracking-wider text-white font-mono mb-2.5 border border-silver/30 silver-contour-subtle">
                <span>Ключевой инсайт стратегии</span>
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white mb-2.5 leading-snug">
                Персонализация мероприятия:<br />
                день рождения Ю.&nbsp;И.&nbsp;Тгушкина
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-2.5">
                Вместо стандартного протокольного анонса («Ежегодная премия лучших студентов») была&nbsp;запущена<br className="hidden sm:inline" />
                вирусная легенда: событие позиционировалось как&nbsp;секретная вечеринка-сюрприз ко&nbsp;дню&nbsp;рождения<br className="hidden sm:inline" />
                Юрия Игоревича Тгушкина.
              </p>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Слоган <em>«Только не&nbsp;проболтайся!»</em> превратил каждого студента в&nbsp;соучастника общего заговора. Это&nbsp;перевело интерес из&nbsp;формата «прийти на&nbsp;мероприятие» в&nbsp;эмоциональный статус закрытого академического комьюнити.
              </p>
            </div>
          </div>

          {/* Out-of-bounds Pop-out Character Image: Rises high and proud above the card on desktop */}
          <div className="hidden md:block absolute -top-28 md:-top-36 lg:-top-52 xl:-top-60 bottom-[1px] right-2 sm:right-4 lg:right-6 xl:right-8 w-[280px] md:w-[340px] lg:w-[410px] xl:w-[450px] overflow-hidden pointer-events-none select-none z-20">
            <img
              src="/assets/image-29.webp"
              alt="Ю. И. Тгушкин в изумрудном костюме с колпачком"
              className="w-full h-full object-cover object-top drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 4-Phase Connected Promotional Campaign Timeline */}
        <CampaignTimeline />
      </div>
    </section>
  );
};
