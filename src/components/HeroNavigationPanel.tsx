import React from 'react';
import { ArrowRight, ArrowLeft, Download } from 'lucide-react';

interface HeroNavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onReturnToHome: () => void;
}

interface NavSection {
  num: string;
  label: string;
  sub: string;
  href: string;
}

export const HeroNavigationPanel: React.FC<HeroNavigationPanelProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onReturnToHome,
}) => {
  // Ключевые разделы визуальной системы
  const allSections: NavSection[] = [
    { num: '01', label: 'О проекте', sub: 'Контекст, цели и задачи', href: '#goals-section' },
    { num: '02', label: 'Айдентика', sub: 'Знак, цвета, типографика, маскот', href: '#metaphor-section' },
    { num: '03', label: 'Носители', sub: 'Диджитал-оформление, слайды, мерч', href: '#digital-environment-section' },
    { num: '04', label: 'Итоги', sub: 'Результаты в цифрах и отзывы', href: '#conclusion-section' },
    { num: '05', label: 'Контакты', sub: 'Прямая форма связи и бриф', href: '#contacts-section' },
  ];

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleProjectClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    window.location.href = href;
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full lg:left-auto lg:right-0 lg:w-[calc(50%-0.4375rem)] transition-transform duration-500 transform z-30 ${
        isOpen
          ? 'translate-x-0 pointer-events-auto'
          : 'translate-x-full pointer-events-none'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.18, 1.25, 0.32, 1)',
      }}
    >
      <div className="w-full h-full bg-[#F1F1F1] rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between border border-black/5 shadow-md overflow-hidden box-border">
        
        {/* СПИСОК ГОРИЗОНТАЛЬНЫХ КНОПОК НАВИГАЦИИ */}
        <div className="flex-1 my-1 sm:my-2 overflow-y-auto space-y-4 pr-1">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {allSections.map((sec) => (
              <button
                key={sec.href}
                type="button"
                onClick={() => handleNavClick(sec.href)}
                className="py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-white border border-black/10 hover:border-[#8FE06E] hover:bg-[#EBEBEB] transition-all duration-200 flex items-center justify-between gap-3 text-left group cursor-pointer shadow-2xs"
              >
                <div className="flex flex-col justify-center min-w-0 py-0.5">
                  <div className="text-base sm:text-lg font-semibold text-[#181818] group-hover:text-black tracking-tight leading-tight">
                    {sec.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#181818]/65 group-hover:text-[#181818]/90 mt-0.5 sm:mt-1 leading-tight sm:leading-snug">
                    {sec.sub}
                  </div>
                </div>

                <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex items-center justify-center shrink-0 self-center">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black/30 absolute transition-all duration-300 ease-out group-hover:translate-x-full group-hover:opacity-0" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#181818] absolute transition-all duration-300 ease-out -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>

          {/* БЛОК ОТДЕЛЬНЫХ КНОПОК ДЛЯ ВСЕХ КЕЙСОВ */}
          <div className="pt-2">
            <span className="text-xs font-mono text-[#737373] block mb-2 px-1">
              (другие дизайн-кейсы)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <span className="p-2.5 rounded-xl bg-black/5 border border-black/15 font-semibold text-[#181818] flex items-center justify-between shadow-2xs">
                <span className="truncate">Тьюторская служба</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#181818] shrink-0" title="Текущий кейс" />
              </span>

              <a
                href="/#projects"
                onClick={(e) => handleProjectClick(e, '/#projects')}
                className="p-2.5 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 font-medium text-[#181818] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span className="truncate">«Инициатива»</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#737373] shrink-0" />
              </a>

              <a
                href="/#projects"
                onClick={(e) => handleProjectClick(e, '/#projects')}
                className="p-2.5 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 font-medium text-[#181818] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span className="truncate">Правовая комиссия</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#737373] shrink-0" />
              </a>

              <a
                href="/#projects"
                onClick={(e) => handleProjectClick(e, '/#projects')}
                className="p-2.5 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 font-medium text-[#181818] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span className="truncate">День юриста 2024</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#737373] shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* НИЖНИЙ БАР ДЕЙСТВИЙ */}
        <div className="pt-3 sm:pt-4 border-t border-black/10 flex flex-col gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => {
                onClose();
                onReturnToHome();
              }}
              className="text-xs sm:text-sm font-medium text-[#181818]/70 hover:text-[#181818] transition-colors duration-150 flex items-center gap-2 cursor-pointer group py-0.5"
            >
              <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center shrink-0">
                <ArrowLeft className="w-3.5 h-3.5 text-[#181818]/70 group-hover:text-[#181818] absolute transition-all duration-300 ease-out group-hover:-translate-x-full group-hover:opacity-0" />
                <ArrowLeft className="w-3.5 h-3.5 text-[#181818] absolute transition-all duration-300 ease-out translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
              <span>На главную</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="w-full py-2.5 sm:py-3.5 px-4 rounded-xl bg-[#181818] text-white hover:bg-black font-medium text-xs sm:text-sm transition-colors duration-150 flex items-center justify-center gap-2 shadow-2xs cursor-pointer group"
          >
            <span>Резюме</span>
            <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center shrink-0">
              <Download className="w-4 h-4 text-white absolute transition-all duration-300 ease-out group-hover:translate-y-full group-hover:opacity-0" />
              <Download className="w-4 h-4 text-white absolute transition-all duration-300 ease-out -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
