import React, { useEffect } from 'react';

interface AuthorPerson {
  name: string;
  role: string;
  initials: string;
  description: string;
  photo?: string;
  photoClass?: string;
}

interface InformantPerson {
  name: string;
  notes: string;
  photo: string;
  initials: string;
}

const INITIATIVE_GROUP: AuthorPerson[] = [
  {
    name: 'Михаил Бачинский',
    role: 'Арт-директор и\u00A0главный редактор',
    initials: 'МБ',
    description: 'Разработка концепции, визуального стиля, модульной сетки книги и\u00A0иллюстрированных полос.',
    photo: '/authors/author_bachinsky.webp'
  },
  {
    name: 'Галина Олеговна Домнина',
    role: 'Руководитель мини-музея «Затёски» и\u00A0руководитель проекта',
    initials: 'ГД',
    description: 'Инициатива создания словаря, проведение проектных мероприятий и\u00A0систематизация музейного фонда.',
    photo: '/authors/author_domnina.webp',
    photoClass: 'scale-[1.18] origin-top object-top'
  },
  {
    name: 'Наталья Александровна Бекир',
    role: 'Автор-составитель',
    initials: 'НБ',
    description: 'Написание текстов для\u00A0словарных карточек книги.',
    photo: '/authors/author_bekir.webp',
    photoClass: 'scale-[1.18] origin-top object-top'
  },
  {
    name: 'Валентина Александровна Лапо',
    role: 'Автор-составитель',
    initials: 'ВЛ',
    description: 'Написание текстов для\u00A0словарных карточек книги.',
    photo: '/authors/author_lapo.webp',
    photoClass: 'scale-[1.18] origin-top object-top'
  }
];

const EXPERT_ITEM: AuthorPerson = {
  name: 'Татьяна Юрьевна Назаренко',
  role: 'Старший научный сотрудник, кандидат исторических наук',
  initials: 'ТН',
  description: 'Эксперт Томского областного краеведческого музея им.\u00A0М.\u00A0Б.\u00A0Шатилова. Научное рецензирование издания, сверка этнографических сведений, верификация транскрипций и\u00A0фактологическая проверка.',
  photo: '/authors/consultant_nazarenko.webp',
  photoClass: 'scale-[1.18] origin-top object-top'
};

const INFORMANTS_LIST: InformantPerson[] = [
  {
    name: 'Клавдия Александровна Голанова',
    initials: 'КГ',
    photo: '/informants/informant_golanova.webp',
    notes: 'Очевидец традиционной культуры, устные свидетельства и\u00A0промысловая терминология.'
  },
  {
    name: 'Владимир Васильевич Домнин',
    initials: 'ВД',
    photo: '/informants/informant_domnin.webp',
    notes: 'Знаток таёжных промыслов, названий предметов быта, традиционной охоты и\u00A0ремёсел.'
  },
  {
    name: 'Павел Павлович Звонарёв',
    initials: 'ПЗ',
    photo: '/informants/informant_zvonarev.webp',
    notes: 'Хранитель памяти об\u00A0охотничьих ловушках и\u00A0рыболовных снастях.'
  },
  {
    name: 'Владимир Васильевич Ивигин',
    initials: 'ВИ',
    photo: '/informants/informant_ivigin.webp',
    notes: 'Информант по\u00A0устройству традиционного жилища, орудий труда и\u00A0названий явлений природы.'
  },
  {
    name: 'Николай Фёдорович Лоскутов',
    initials: 'НЛ',
    photo: '/informants/informant_loskutov.webp',
    notes: 'Носитель знаний о\u00A0речных угодьях, охотничьих приметах, сезонных циклах и\u00A0традициях Верхнекетья.'
  },
  {
    name: 'Михаил Семёнович Родиков',
    initials: 'МР',
    photo: '/informants/informant_rodikov.webp',
    notes: 'Передача этнографических сведений, редких названий инструментов и\u00A0элементов таёжного быта.'
  }
];

export const AuthorsSection: React.FC = () => {
  useEffect(() => {
    const urls = [
      ...INITIATIVE_GROUP.map((a) => a.photo).filter(Boolean),
      EXPERT_ITEM.photo,
      ...INFORMANTS_LIST.map((i) => i.photo).filter(Boolean)
    ] as string[];

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <section 
      id="authors" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
          
          {/* Левая функциональная зона (Колонки 1-4) со sticky-фиксацией */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Команда проекта
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Создатели издания
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
              <p>
                Авторы-составители, научный эксперт и&nbsp;коренные жители Верхнекетья.
              </p>
            </div>
          </div>

          {/* Правая функциональная зона (Колонки 5-12) */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-12">
            
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                Совместный труд школьных учителей, дизайнера и&nbsp;старожилов района по&nbsp;сбережению уникального языкового наследия коренных народов.
              </p>
            </div>

            {/* БЛОК 1: ИНИЦИАТИВНАЯ ГРУППА */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>1</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Инициативная группа авторов</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 items-stretch" role="region" aria-label="Инициативная группа авторов">
                {INITIATIVE_GROUP.map((author) => (
                  <article 
                    key={author.name}
                    className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 shadow-2xs group flex flex-col justify-between h-full space-y-4 m3-card-interactive"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1C1C1C]/10">
                        <div className="space-y-1">
                          <div className="text-[#1C1C1C]" style={{ 
                            fontFamily: 'Kurale, serif',
                            fontSize: '19px',
                            lineHeight: '1.2',
                            fontWeight: 400,
                            fontSynthesis: 'none',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                            textRendering: 'optimizeLegibility',
                            fontVariantNumeric: 'lining-nums',
                            fontFeatureSettings: '"kern" 1, "liga" 0'
                          }}>
                            {author.name}
                          </div>
                          <div className="text-xs sm:text-sm text-[#1C1C1C]/65 font-sans leading-relaxed">
                            {author.role}
                          </div>
                        </div>
                        {author.photo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#1C1C1C]/15 bg-[#FAF8F5] shrink-0 inner-card-interactive relative flex items-center justify-center">
                            <div className="initials-fallback hidden w-full h-full items-center justify-center font-editorial text-xs text-[#1C1C1C]/80 font-normal select-none" aria-hidden="true">
                              {author.initials}
                            </div>
                            <img 
                              src={author.photo} 
                              alt={`Портрет автора: ${author.name}`} 
                              className={`w-full h-full object-cover ${author.photoClass || ''}`} 
                              loading="eager" 
                              decoding="async"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.parentElement?.querySelector('.initials-fallback');
                                if (fallback) {
                                  (fallback as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#1C1C1C]/15 flex items-center justify-center font-editorial text-xs text-[#1C1C1C]/80 font-normal shrink-0 select-none mt-0.5 inner-card-interactive" aria-hidden="true">
                            {author.initials}
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                        {author.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* БЛОК 2: НАУЧНЫЙ ЭКСПЕРТ */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>2</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Научный эксперт</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 group m3-card-interactive">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1C1C1C]/10">
                  <div className="space-y-1">
                    <div className="text-[#1C1C1C]" style={{ 
                      fontFamily: 'Kurale, serif',
                      fontSize: '19px',
                      lineHeight: '1.2',
                      fontWeight: 400,
                      fontSynthesis: 'none',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                      fontVariantNumeric: 'lining-nums',
                      fontFeatureSettings: '"kern" 1, "liga" 0'
                    }}>
                      {EXPERT_ITEM.name}
                    </div>
                    <div className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans leading-relaxed">
                      {EXPERT_ITEM.role}
                    </div>
                  </div>
                  {EXPERT_ITEM.photo ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#1C1C1C]/15 bg-[#FAF8F5] shrink-0 inner-card-interactive relative flex items-center justify-center">
                      <div className="initials-fallback hidden w-full h-full items-center justify-center font-editorial text-sm text-[#1C1C1C]/80 font-normal select-none" aria-hidden="true">
                        {EXPERT_ITEM.initials}
                      </div>
                      <img 
                        src={EXPERT_ITEM.photo} 
                        alt={`Портрет эксперта: ${EXPERT_ITEM.name}`} 
                        className={`w-full h-full object-cover ${EXPERT_ITEM.photoClass || ''}`} 
                        loading="eager" 
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.initials-fallback');
                          if (fallback) {
                            (fallback as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#1C1C1C]/15 flex items-center justify-center font-editorial text-sm text-[#1C1C1C]/80 font-normal shrink-0 select-none mt-0.5 inner-card-interactive" aria-hidden="true">
                      {EXPERT_ITEM.initials}
                    </div>
                  )}
                </div>

                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-sans leading-relaxed text-pretty pt-4">
                  {EXPERT_ITEM.description}
                </p>
              </article>
            </div>

            {/* БЛОК 3: ИНФОРМАНТЫ ИЗ АРХИВА СЛОВАРЯ (6 ЧЕЛОВЕК) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>3</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Информанты</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" role="region" aria-label="Информанты из архива словаря">
                {INFORMANTS_LIST.map((person) => {
                  const parts = person.name.split(' ');
                  const firstName = parts[0];
                  const patronymic = parts[1];
                  const lastName = parts[2];

                  return (
                    <article 
                      key={person.name}
                      className="bg-white border border-[#1C1C1C]/15 rounded-xl p-3.5 sm:p-5 group m3-card-interactive flex flex-col justify-between gap-2.5 sm:gap-3.5"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border border-[#1C1C1C]/15 bg-[#FAF8F5] shrink-0 inner-card-interactive relative flex items-center justify-center">
                          <div className="initials-fallback hidden w-full h-full items-center justify-center font-editorial text-xs sm:text-sm text-[#1C1C1C]/80 font-normal select-none" aria-hidden="true">
                            {person.initials}
                          </div>
                          <img 
                            src={person.photo} 
                            alt={`Портрет информанта: ${person.name}`} 
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const fallback = target.parentElement?.querySelector('.initials-fallback');
                              if (fallback) {
                                (fallback as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[#1C1C1C] leading-snug font-editorial font-normal">
                            <div className="text-[15px] sm:text-base tracking-tight text-[#1C1C1C]">
                              {lastName}
                            </div>
                            <div className="text-[15px] sm:text-base text-[#1C1C1C] whitespace-nowrap overflow-hidden text-ellipsis">
                              {firstName}&nbsp;{patronymic}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11.5px] sm:text-xs text-[#1C1C1C]/75 font-sans leading-snug sm:leading-relaxed text-pretty">
                        {person.notes}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
