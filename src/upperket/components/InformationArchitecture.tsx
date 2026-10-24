import React from 'react';
import { Languages, Search, QrCode } from 'lucide-react';

interface BookChapterItem {
  title: string;
  sectionId: string | number;
  color: string;
}

interface ThematicTier {
  tierNumber: string;
  tierName: string;
  chapters: BookChapterItem[];
}

// Vector ethnic icon component matching the exact icons from the reader's control panel
const SectionEthnicIcon: React.FC<{ sectionId: string | number; className?: string }> = ({ 
  sectionId, 
  className = 'w-3.5 h-3.5'
}) => {
  const baseClasses = `${className} transition-all duration-400 ease-out group-hover:scale-110`;
  switch (sectionId) {
    case 'intro':
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-[-6deg]`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M12 6h4M12 10h4M12 14h4" />
        </svg>
      );
    case 'legend':
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-45`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 1: // Семья
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:-translate-y-0.5`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.04 3 5.5" />
          <path d="M12 18l-2 2.5L8 18M12 22l-2-2.5 2-2.5 2 2.5-2 2.5z" />
        </svg>
      );
    case 2: // Одежда
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-4`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2.64V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v.64l-4.38.82c-1.1.21-1.62 1.51-.96 2.41L6 10v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10l3.34-4.13c.66-.9.14-2.2-.96-2.41z" />
          <path d="M12 10v13" />
        </svg>
      );
    case 3: // Жилище (Чум)
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:scale-115`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 2v20M10 5l4 0M9 8l6 0M8 11l8 0" />
          <path d="M10 22v-4a2 2 0 0 1 4 0v4" />
        </svg>
      );
    case 4: // География (Река)
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:translate-x-0.5`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" />
          <path d="M2 12c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" />
          <path d="M2 18c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" />
        </svg>
      );
    case 5: // Флора
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-8`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L7 7h3v5H7l5 5 5-5h-3V7h3l-5-5z" />
          <path d="M12 17v5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 6: // Фауна (Лапа)
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:scale-115`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" r="4" />
          <circle cx="7" cy="8" r="2" fill="currentColor" />
          <circle cx="10" cy="5" r="2" fill="currentColor" />
          <circle cx="14" cy="5" r="2" fill="currentColor" />
          <circle cx="17" cy="8" r="2" fill="currentColor" />
        </svg>
      );
    case 7: // Инструменты
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-[-10deg]`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
        </svg>
      );
    case 8: // Оленеводство
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:-translate-y-1`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4c2 0 3 2 4 4 1-2 2-4 4-4" />
          <path d="M19 4c-2 0-3 2-4 4-1-2-2-4-4-4" />
          <path d="M12 8v14" />
          <path d="M7 12h10M8 16h8M9 20h6" />
        </svg>
      );
    case 9: // Охота
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:translate-x-1 group-hover:-translate-y-1`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6" />
          <path d="M9 21l12-12" />
          <path d="M12 3a9 9 0 1 1-9 9" />
        </svg>
      );
    case 10: // Рыболовство
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:translate-x-0.5`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12c5-5 15-5 20 0-5 5-15 5-20 0z" />
          <path d="M18 12l4-3v6l-4-3z" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 11: // Кулинария
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-8`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <path d="M6 1v3M10 1v3M14 1v3" />
        </svg>
      );
    case 12: // Духовная культура
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-90`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case 'conclusion':
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:rotate-3`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'bibliography':
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:scale-110`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="12" y2="18" />
        </svg>
      );
    case 'index':
    default:
      return (
        <svg viewBox="0 0 24 24" className={`${baseClasses} group-hover:translate-x-1`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
  }
};

const INTRO_SECTIONS: BookChapterItem[] = [
  { title: 'Введение', sectionId: 'intro', color: '#4A453E' },
  { title: 'Легенда словаря', sectionId: 'legend', color: '#4A453E' },
];

const THEMATIC_TIERS: ThematicTier[] = [
  {
    tierNumber: '1',
    tierName: 'Человек и быт',
    chapters: [
      { title: 'Семья', sectionId: 1, color: '#8D6E63' },
      { title: 'Одежда', sectionId: 2, color: '#8A7F60' },
      { title: 'Жилище', sectionId: 3, color: '#5D4037' }
    ]
  },
  {
    tierNumber: '2',
    tierName: 'Окружающая среда',
    chapters: [
      { title: 'География', sectionId: 4, color: '#5D554D' },
      { title: 'Флора', sectionId: 5, color: '#556B2F' },
      { title: 'Фауна', sectionId: 6, color: '#37474F' }
    ]
  },
  {
    tierNumber: '3',
    tierName: 'Технологии выживания',
    chapters: [
      { title: 'Инструменты и материалы', sectionId: 7, color: '#8C7B38' },
      { title: 'Оленеводство', sectionId: 8, color: '#2E4C40' },
      { title: 'Охота', sectionId: 9, color: '#924A45' },
      { title: 'Рыболовство', sectionId: 10, color: '#455A64' },
      { title: 'Традиционные блюда', sectionId: 11, color: '#7E4E58' }
    ]
  },
  {
    tierNumber: '4',
    tierName: 'Мировоззрение',
    chapters: [
      { title: 'Духовная культура', sectionId: 12, color: '#514561' }
    ]
  }
];

const OUTRO_SECTIONS: BookChapterItem[] = [
  { title: 'Заключение', sectionId: 'conclusion', color: '#4A453E' },
  { title: 'Библиография и источники', sectionId: 'bibliography', color: '#4A453E' },
  { title: 'Алфавитно-предметный указатель', sectionId: 'index', color: '#4A453E' },
];

export const InformationArchitecture: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = React.useState<string>('ia-macro');
  const [selectedDiacritic, setSelectedDiacritic] = React.useState<string | null>('ӈ');
  const isManualScrollRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const sectionIds = ['ia-macro', 'ia-micro', 'ia-onboarding'];

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const triggerY = 220;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            current = id;
          }
        }
      }
      setActiveSubSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setActiveSubSection(id);
    isManualScrollRef.current = true;
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  const navItems = [
    { id: 'ia-macro', label: '1. Макроуровень' },
    { id: 'ia-micro', label: '2. Микроуровень' },
    { id: 'ia-onboarding', label: '3. Инструменты' },
  ];

  return (
    <section 
      id="information-architecture" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-start">

          {/* LEFT FUNCTIONAL COLUMN: Sticky Header (Cols 1-3) */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 pr-1">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Систематизация и&nbsp;навигация
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Информационная архитектура
            </h2>

            <div className="sticky-sidebar-container">
              <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                <strong className="font-medium text-[#1C1C1C]">Задача:</strong> объединить сотни таёжных слов и&nbsp;обычаев в&nbsp;стройную книгу, которую ребёнок откроет с&nbsp;интересом и&nbsp;где легко сориентируется.
              </div>

              <nav className="mt-8 pt-6 border-t border-[#1C1C1C]/15 hidden lg:block text-xs font-sans">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeSubSection === item.id;
                    return (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`block transition-all duration-200 py-1.5 pl-2.5 border-l-2 select-none ${
                          isActive 
                            ? 'text-[#1C1C1C] font-semibold border-[#1C1C1C]' 
                            : 'text-[#1C1C1C]/50 hover:text-[#1C1C1C] border-transparent hover:border-[#1C1C1C]/30'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>

          {/* Mobile/Tablet Sub-navigation Pills with soft right blur / screen edges */}
          <div className="lg:hidden col-span-12 -mx-6 px-6 sm:-mx-12 sm:px-12 mt-2 mb-6 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2 border-b border-[#1C1C1C]/10 [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent)]">
            {navItems.map((item) => {
              const isActive = activeSubSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-xs px-3 py-1.5 rounded-full shrink-0 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#1C1C1C] text-white font-medium' 
                      : 'bg-white/80 text-[#1C1C1C]/70 border border-[#1C1C1C]/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="w-6 shrink-0" aria-hidden="true" />
          </div>

          {/* RIGHT FUNCTIONAL CONTENT AREA: 8 Cols (Cols 5-12) */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-16 lg:space-y-20 font-sans">

            {/* ========================================================= */}
            {/* 1. МАКРОУРОВЕНЬ                                           */}
            {/* ========================================================= */}
            <div id="ia-macro" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>1</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Макроуровень</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Маршрут познания: от&nbsp;родного дома к&nbsp;таёжному миру
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-3xl">
                  Вместо академического перечня выстроена ясная череда тем: от&nbsp;семьи и&nbsp;быта<br />к&nbsp;природе, ремёслам и&nbsp;древним преданиям.
                </p>
              </div>


              {/* Swiss Publishing Blueprint with original full-color section icon squares */}
              <div className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-7 space-y-6 font-sans">
                
                {/* ЧАСТЬ 1: ВВОДНЫЙ АППАРАТ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/60 py-1">
                    <h4 className="text-sm sm:text-base font-editorial font-normal text-[#1C1C1C]">
                      Вводные разделы
                    </h4>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0 m-0">
                    {INTRO_SECTIONS.map((item) => (
                      <li 
                        key={item.title}
                        role="listitem"
                        className="group bg-[#FAF8F5] border border-[#1C1C1C]/12 rounded-lg p-3 sm:p-3.5 flex items-center gap-2.5 hover:border-[#1C1C1C]/40 hover:bg-[#F2EEE6] transition-all m3-card-interactive"
                      >
                        <div 
                          className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded overflow-hidden flex items-center justify-center shrink-0 text-white"
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        >
                          <SectionEthnicIcon sectionId={item.sectionId} className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-sans font-medium text-[#1C1C1C] leading-snug">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ЧАСТЬ 2: ТЕМАТИЧЕСКИЙ КОРПУС (12 глав) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/60 py-1">
                    <h4 className="text-sm sm:text-base font-editorial font-normal text-[#1C1C1C]">
                      Двенадцать основных глав
                    </h4>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  {THEMATIC_TIERS.map((tier) => (
                    <div key={tier.tierName} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs pt-1">
                        <span className="font-sans font-semibold text-xs text-[#1C1C1C]/80">
                          {tier.tierName}
                        </span>
                      </div>

                      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0 m-0">
                        {tier.chapters.map((chap) => (
                          <li 
                            key={chap.title}
                            role="listitem"
                            className="group bg-[#FAF8F5] border border-[#1C1C1C]/12 rounded-lg p-3 sm:p-3.5 flex items-center gap-2.5 hover:border-[#1C1C1C]/40 hover:bg-[#F2EEE6] transition-all m3-card-interactive"
                          >
                            <div 
                              className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded overflow-hidden flex items-center justify-center shrink-0 text-white"
                              style={{ backgroundColor: chap.color }}
                              aria-hidden="true"
                            >
                              <SectionEthnicIcon sectionId={chap.sectionId} className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-sans font-medium text-[#1C1C1C] leading-snug">
                              {chap.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* ЧАСТЬ 3: СПРАВОЧНЫЙ АППАРАТ */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/60 py-1">
                    <h4 className="text-sm sm:text-base font-editorial font-normal text-[#1C1C1C]">
                      Справочные материалы
                    </h4>
                    <div className="flex-1 h-px bg-[#1C1C1C]/15" />
                  </div>

                  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0 m-0">
                    {OUTRO_SECTIONS.map((item) => (
                      <li 
                        key={item.title}
                        role="listitem"
                        className="group bg-[#FAF8F5] border border-[#1C1C1C]/12 rounded-lg p-3 sm:p-3.5 flex items-center gap-2.5 hover:border-[#1C1C1C]/40 hover:bg-[#F2EEE6] transition-all m3-card-interactive"
                      >
                        <div 
                          className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded overflow-hidden flex items-center justify-center shrink-0 text-white"
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        >
                          <SectionEthnicIcon sectionId={item.sectionId} className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-sans font-medium text-[#1C1C1C] leading-snug">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. МИКРОУРОВЕНЬ                                           */}
            {/* ========================================================= */}
            <div id="ia-micro" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>2</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Микроуровень</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              {/* 2-Column Horizontal Layout with matched equal heights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* Left Column: Heading & Description */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
                  <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                    Анатомия словарной карточки
                  </h3>
                  <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-sm">
                    Каждое слово оформлено по&nbsp;строгому правилу: крупный русский термин, переводы и&nbsp;рисунок в&nbsp;арке.
                  </p>
                </div>

                {/* Right Column: Compact Schema Card placed on the same horizontal level with scaled matched height */}
                <div className="lg:col-span-8 flex items-stretch">
                  <div className="bg-white border border-[#1C1C1C]/15 rounded-2xl overflow-hidden shadow-2xs w-full flex flex-row items-stretch justify-between">
                    
                    {/* Left: Text & Badges Zone */}
                    <div className="flex-1 py-3 sm:py-4 pl-3.5 sm:pl-6 pr-2 sm:pr-4 flex flex-col justify-center">
                      {/* Row 1: Title + Evenki chip to the right */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[17px] sm:text-2xl font-editorial font-normal text-[#1C1C1C] tracking-tight leading-none">
                          Название
                        </span>
                        <div className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md bg-[#007A8A] text-white text-[9px] sm:text-xs font-sans font-medium tracking-wide leading-none shadow-2xs">
                          по-эвенкийски
                        </div>
                      </div>

                      {/* Row 2: Selkup & Ket chips on one line directly below */}
                      <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5">
                        <div className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md bg-[#4A7A28] text-white text-[9px] sm:text-xs font-sans font-medium tracking-wide leading-none shadow-2xs">
                          по-селькупски
                        </div>
                        <div className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md bg-[#A0522D] text-white text-[9px] sm:text-xs font-sans font-medium tracking-wide leading-none shadow-2xs">
                          по-кетски
                        </div>
                      </div>

                      {/* Row 3: Term description raised slightly higher to preserve spacing */}
                      <p className="text-[11.5px] sm:text-sm text-[#1C1C1C]/85 font-sans font-medium leading-snug mt-1 sm:mt-1.5">
                        Описание термина на&nbsp;русском языке
                      </p>
                    </div>

                    {/* Right: Arch Frame Zone - flush to top, right, and bottom borders */}
                    <div className="w-[36%] sm:w-[38%] relative border-l-2 border-[#1C1C1C] rounded-l-[40px] sm:rounded-l-[80px] lg:rounded-l-[100px] overflow-hidden bg-[#EAE6DE] flex items-stretch shrink-0 self-stretch min-h-[105px] sm:min-h-[135px]">
                      <div className="absolute inset-0 w-full h-full">
                        <svg 
                          viewBox="0 0 300 300" 
                          preserveAspectRatio="xMidYMid slice" 
                          className="w-full h-full object-cover"
                        >
                          <defs>
                            <linearGradient id="skyGradArch3" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#F5F2EB" />
                              <stop offset="100%" stopColor="#E6E0D4" />
                            </linearGradient>
                            <linearGradient id="snowGradArch3" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                              <stop offset="100%" stopColor="#EDE8DE" stopOpacity="0.95" />
                            </linearGradient>
                          </defs>

                          <rect width="300" height="300" fill="url(#skyGradArch3)" />
                          <path d="M0 160 Q 60 130 140 155 T 300 140 L 300 300 L 0 300 Z" fill="#D8D2C5" opacity="0.6" />

                          <g fill="#A9B5A2" opacity="0.75">
                            <polygon points="50,110 35,145 65,145" />
                            <polygon points="50,135 30,170 70,170" />
                            <polygon points="50,160 25,200 75,200" />

                            <polygon points="180,60 160,105 200,105" />
                            <polygon points="180,95 150,145 210,145" />
                            <polygon points="180,135 140,195 220,195" />
                            <polygon points="180,185 130,240 230,240" />

                            <polygon points="255,90 240,130 270,130" />
                            <polygon points="255,120 230,165 280,165" />
                            <polygon points="255,155 220,210 290,210" />
                          </g>

                          <g fill="#FFFFFF" opacity="0.9">
                            <path d="M50 110 L38 140 Q 50 145 62 140 Z" />
                            <path d="M50 135 L33 165 Q 50 170 67 165 Z" />
                            <path d="M180 60 L163 100 Q 180 106 197 100 Z" />
                            <path d="M180 95 L153 140 Q 180 146 207 140 Z" />
                            <path d="M180 135 L143 190 Q 180 196 217 190 Z" />
                            <path d="M255 90 L242 125 Q 255 130 268 125 Z" />
                          </g>

                          <path d="M0 220 Q 90 200 180 230 T 300 220 L 300 300 L 0 300 Z" fill="url(#snowGradArch3)" />
                          <path d="M0 250 Q 120 235 240 260 L 300 260 L 300 300 L 0 300 Z" fill="#F8F6F0" />

                          <ellipse cx="210" cy="245" rx="5" ry="4" fill="#B0A99A" />
                          <circle cx="213" cy="240" r="2.5" fill="#B0A99A" />
                          <circle cx="214" cy="237" r="1" fill="#B0A99A" />
                        </svg>

                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center z-10 select-none">
                        <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#1C1C1C] leading-tight drop-shadow-2xs">
                          Иллюстрация
                        </span>
                        <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#1C1C1C] leading-tight drop-shadow-2xs">
                          к названию
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. ИНСТРУМЕНТЫ                                            */}
            {/* ========================================================= */}
            <div id="ia-onboarding" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/60 font-medium tracking-wide">
                <span>3</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Инструменты</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Звуковые подсказки и&nbsp;быстрый поиск
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-2xl">
                  Инструменты навигации и&nbsp;фонетики помогают школьникам легко ориентироваться в&nbsp;книге и&nbsp;осваивать редкие северные слова.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Row 1: Secret letters (1/3) and Diacritics (2/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                  
                  <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 flex flex-col justify-between h-full group m3-card-interactive">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/60">
                        <Languages className="w-3.5 h-3.5 text-[#1C1C1C]/60 shrink-0" aria-hidden="true" />
                        <span>Произношение</span>
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
                        Звуковые подсказки
                      </div>
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                        Вводный разворот книги поясняет редкие северные звуки через шум ветра в&nbsp;кронах, шорох хвои и&nbsp;голоса таёжных птиц.
                      </p>
                    </div>
                  </article>

                  <article className="lg:col-span-2 bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full group m3-card-interactive">
                    <div>
                      <h4 className="text-base sm:text-lg font-editorial font-normal text-[#1C1C1C] leading-snug">
                        Редкие знаки северных языков
                      </h4>
                    </div>

                    <div className="grid grid-cols-5 gap-2 sm:gap-3" role="group" aria-label="Интерактивный выбор северных знаков">
                      {[
                        { glyph: 'ӈ', desc: 'Глубокий носовой звук [н], произносимый как\u00A0заднеязычное -нг' },
                        { glyph: 'қ', desc: 'Твёрдый гортанный звук [к], выдыхаемый в\u00A0глубине горла' },
                        { glyph: 'ӧ', desc: 'Мягкий гласный звук, средний между [о] и\u00A0[э]' },
                        { glyph: 'ӱ', desc: 'Мягкий гласный звук, схожий с\u00A0[ю] без\u00A0начального [й]' },
                        { glyph: 'ā', desc: 'Протяжная гласная [а], удерживаемая вдвое дольше обычной' },
                      ].map((item) => {
                        const isSelected = selectedDiacritic === item.glyph;
                        return (
                          <button
                            key={item.glyph}
                            type="button"
                            onClick={() => setSelectedDiacritic(item.glyph)}
                            aria-label={`Буква ${item.glyph}`}
                            aria-pressed={isSelected}
                            className={`h-10 sm:h-12 w-full rounded-lg border transition-all grid place-items-center select-none overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] ${
                              isSelected
                                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                                : 'bg-[#FAF8F5] text-[#1C1C1C] border-[#1C1C1C]/10 hover:border-[#1C1C1C]/25'
                            }`}
                          >
                            <span className="block leading-none text-center font-editorial text-lg sm:text-xl">
                              {item.glyph}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedDiacritic && (
                      <div className="bg-[#FAF8F5] border border-[#1C1C1C]/10 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4" role="region" aria-live="polite">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#1C1C1C]/15 grid place-items-center font-editorial text-xl sm:text-2xl text-[#1C1C1C] shrink-0 select-none overflow-hidden">
                          <span className="block leading-none text-center">{selectedDiacritic}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed text-pretty">
                          {[
                            { glyph: 'ӈ', desc: 'Глубокий носовой звук [н], произносимый как\u00A0заднеязычное -нг' },
                            { glyph: 'қ', desc: 'Твёрдый гортанный звук [к], выдыхаемый в\u00A0глубине горла' },
                            { glyph: 'ӧ', desc: 'Мягкий гласный звук, средний между [о] и\u00A0[э]' },
                            { glyph: 'ӱ', desc: 'Мягкий гласный звук, схожий с\u00A0[ю] без\u00A0начального [й]' },
                            { glyph: 'ā', desc: 'Протяжная гласная [а], удерживаемая вдвое дольше обычной' },
                          ].find(g => g.glyph === selectedDiacritic)?.desc}
                        </p>
                      </div>
                    )}
                  </article>

                </div>

                {/* Row 2: Index and QR Code - свёрстаны идентично карточке звуковых подсказок без квадратных контейнеров */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  
                  <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 flex flex-col justify-between h-full group m3-card-interactive">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/60">
                        <Search className="w-3.5 h-3.5 text-[#1C1C1C]/60 shrink-0" aria-hidden="true" />
                        <span>Поиск по книге</span>
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
                        Алфавитно-предметный указатель
                      </div>
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                        Алфавитно-предметный указатель в&nbsp;конце книги помогает школьникам быстро находить нужные статьи на&nbsp;уроках.
                      </p>
                    </div>
                  </article>

                  <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 flex flex-col justify-between h-full group m3-card-interactive">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/60">
                        <QrCode className="w-3.5 h-3.5 text-[#1C1C1C]/60 shrink-0" aria-hidden="true" />
                        <span>Цифровой переход</span>
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
                        Быстрый доступ к&nbsp;сайту музея
                      </div>
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                        QR-код на&nbsp;первой полосе ведёт на&nbsp;страницу музея, где ученики могут детально рассмотреть фото экспонатов.
                      </p>
                    </div>
                  </article>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
