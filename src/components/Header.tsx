import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Layers, ArrowUpRight, X } from 'lucide-react';
import { CASE_META } from '../data/caseData';

interface HeaderProps {
  onOpenResume?: () => void;
  onReturnToHome: () => void;
  isNavOpen?: boolean;
  onToggleNav?: () => void;
}

// Навигационные ссылки для десктопного меню в хедере
const DESKTOP_NAV_LINKS = [
  { label: 'О проекте', href: '#goals-section' },
  { label: 'Айдентика', href: '#metaphor-section' },
  { label: 'Носители', href: '#digital-environment-section' },
  { label: 'Итоги', href: '#conclusion-section' },
  { label: 'Контакты', href: '#contacts-section' },
];

const CASES = [
  { id: 'tutor', title: 'Тьюторская служба ТГУ', href: '/tutor/', isCurrent: true },
  { id: 'law-day', title: 'День юриста 2024', href: '/law-day/', isCurrent: false },
  { id: 'upperket', title: 'Книга народов Верхнекетья', href: '/upperket/', isCurrent: false },
  { id: 'iniciativa', title: 'Волонтёрская организация «Инициатива»', href: '/#projects', isCurrent: false },
  { id: 'law-com', title: 'Правовая комиссия ТГУ', href: '/#projects', isCurrent: false },
];

export const Header: React.FC<HeaderProps> = ({
  onReturnToHome,
  isNavOpen = false,
  onToggleNav,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full relative z-30">
      <div className="w-full bg-[#F1F1F1] rounded-xl px-3 sm:px-3.5 md:px-3.5 lg:px-6 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between shadow-xs border border-black/5 gap-2 sm:gap-3">
        
        {/* Левая часть: Логотип */}
        <button
          type="button"
          onClick={onReturnToHome}
          id="hero-logo-btn"
          className="flex items-center group cursor-pointer shrink-0 self-stretch my-[-2px] sm:my-[-3px] lg:my-[-4px] hover:opacity-85 transition-opacity duration-150"
          data-tooltip="Михаил Бачинский • В начало"
          aria-label="Михаил Бачинский • Вернуться в начало"
        >
          <img
            id="header-main-logo-img"
            src="/assets/header-logo.svg"
            alt="Логотип"
            className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('header-fallback-signature');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            id="header-fallback-signature" 
            className="hidden px-2.5 py-1 rounded bg-[#F27A93] text-white font-medium text-xs tracking-tight"
          >
            {CASE_META.author.signature}
          </div>
        </button>

        {/* Средняя часть: Навигация по разделам кейса */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto py-0.5">
          {DESKTOP_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg text-[13px] xl:text-sm font-medium text-[#181818]/80 hover:text-[#181818] hover:bg-white transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Правая часть: Кнопка выбора кейсов, возврат ко всем кейсам и бургер */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 h-full">
          
          {/* Меню выбора кейсов (выпадающий список) */}
          <div className="relative h-full flex items-center">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border cursor-pointer ${
                isDropdownOpen
                  ? 'bg-[#181818] text-white border-black shadow-xs'
                  : 'bg-white text-[#181818] border-black/10 hover:bg-[#EBEBEB] shadow-2xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Дизайн-кейсы</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Выпадающее меню со всеми кейсами в строгом монохроме */}
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white/98 backdrop-blur-md rounded-2xl p-2.5 border border-black/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-mono text-[#737373] px-2.5 py-1.5 flex items-center justify-between border-b border-black/10 mb-1.5">
                    <span>Все дизайн-кейсы</span>
                    <button 
                      type="button"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-1 text-[10px] text-[#737373] hover:text-black uppercase tracking-wider font-mono cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      <span>Закрыть</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    {CASES.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-medium transition-colors text-left ${
                          item.isCurrent
                            ? 'bg-black/5 text-[#181818] font-semibold'
                            : 'hover:bg-black/5 text-[#181818]/75 hover:text-[#181818]'
                        }`}
                      >
                        <span className="leading-snug pr-2">{item.title}</span>
                        {item.isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#181818] shrink-0 ml-2" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] shrink-0 ml-2" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Кнопка На главную */}
          <button
            type="button"
            onClick={onReturnToHome}
            id="header-home-btn"
            className="flex items-center justify-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-lg text-xs sm:text-sm font-medium text-[#181818] bg-white hover:bg-[#EBEBEB] border border-black/10 shadow-2xs transition-colors duration-200 cursor-pointer group shrink-0"
            aria-label="На главную"
            data-tooltip="На главную"
          >
            <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center shrink-0">
              <ArrowLeft className="w-4 h-4 text-[#181818] absolute transition-all duration-500 ease-out group-hover:-translate-x-full group-hover:opacity-0" />
              <ArrowLeft className="w-4 h-4 text-[#181818] absolute transition-all duration-500 ease-out translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
            <span className="hidden sm:inline">На главную</span>
          </button>

          {/* Бургер / закрытие */}
          <button
            type="button"
            onClick={onToggleNav}
            id="header-burger-btn"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-black/10 shadow-2xs items-center justify-center transition-colors duration-200 cursor-pointer relative group ${
              isNavOpen
                ? 'flex bg-[#181818] text-white hover:bg-black z-50'
                : 'flex lg:hidden bg-white text-[#181818] hover:bg-[#EBEBEB]'
            }`}
            data-tooltip={isNavOpen ? 'Закрыть меню' : 'Меню навигации'}
            aria-label={isNavOpen ? 'Закрыть меню' : 'Меню навигации'}
          >
            <div className="w-4 h-4 relative flex items-center justify-center pointer-events-none">
              <span
                className={`absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300 ease-in-out origin-center ${
                  isNavOpen
                    ? 'top-1/2 -translate-y-1/2 rotate-45 bg-white'
                    : 'top-0.5 translate-y-0 rotate-0 bg-[#181818]'
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-[2px] rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out origin-center ${
                  isNavOpen
                    ? 'opacity-0 scale-x-0 bg-white'
                    : 'opacity-100 scale-x-100 bg-[#181818]'
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300 ease-in-out origin-center ${
                  isNavOpen
                    ? 'top-1/2 -translate-y-1/2 -rotate-45 bg-white'
                    : 'bottom-0.5 translate-y-0 rotate-0 bg-[#181818]'
                }`}
              />
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
