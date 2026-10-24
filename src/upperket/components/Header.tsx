import React, { useState, useEffect } from 'react';
import { Layers, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenContact?: () => void;
}

const CASES = [
  { id: 'tutor', title: 'Тьюторская служба ТГУ', href: '/tutor/', isCurrent: false },
  { id: 'law-day', title: 'День юриста 2024', href: '/law-day/', isCurrent: false },
  { id: 'upperket', title: 'Книга народов Верхнекетья', href: '/upperket/', isCurrent: true },
  { id: 'iniciativa', title: 'Волонтёрская организация «Инициатива»', href: '/#projects', isCurrent: false },
  { id: 'law-com', title: 'Правовая комиссия ТГУ', href: '/#projects', isCurrent: false },
];

const NAV_ITEMS = [
  { id: 'challenges', number: '1', label: 'Вызовы', href: '#challenges', tooltip: 'Вызовы проекта', description: 'Книжные вызовы и дизайнерские решения' },
  { id: 'information-architecture', number: '2', label: 'Инфоархитектура', href: '#information-architecture', tooltip: 'Информационная архитектура', description: 'Структура словарных статей и разделов' },
  { id: 'design-system', number: '3', label: 'Дизайн-система', href: '#design-system', tooltip: 'Дизайн-система', description: 'Шрифты, цвета и орнаменты' },
  { id: 'production', number: '4', label: 'Полиграфия', href: '#production', tooltip: 'Полиграфия и производство', description: 'Берестяная обложка и печать' },
  { id: 'impact', number: '5', label: 'Итоги', href: '#impact', tooltip: 'Результаты и итоги', description: 'Образовательный и музейный эффект' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
      } else {
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
        setScrollProgress(progress);
      }

      // Precise viewport-based section tracking
      const triggerY = 220;
      let currentActive = '';
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom >= 80) {
            currentActive = item.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile/tablet menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Handle ESC key press to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1C1C1C]/15 bg-[#F9F7F2] transition-colors relative" role="banner">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-12 sm:h-13 flex items-center justify-between relative">
        
        {/* Museum Identity / Brand Logo */}
        <a 
          href="#hero-section" 
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group relative flex items-center min-h-[36px] py-0.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] rounded-md"
          data-tooltip="Краеведческий музей «Затёски»"
          aria-label="Школьный краеведческий мини-музей «Затёски» — перейти к началу страницы"
        >
          <div className="relative rounded">
            <img 
              src="/museum-logo.svg" 
              alt="Логотип мини-музея «Затёски»" 
              className="h-5 sm:h-5.5 w-auto object-contain"
            />
          </div>
        </a>

        {/* Central Anchor Links for Desktop (lg: 1024px and wider) */}
        <nav 
          className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-xs font-sans text-[#1C1C1C]/75 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          aria-label="Основная навигация по разделам книги"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative px-2.5 py-2 min-h-[40px] transition-colors duration-300 inline-flex items-center justify-center whitespace-nowrap origin-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] ${
                  isActive 
                    ? 'font-medium text-[#1C1C1C]' 
                    : 'font-normal text-[#1C1C1C]/75 hover:text-[#1C1C1C]'
                }`}
                data-tooltip={item.tooltip}
              >
                <span>{item.label}</span>
                {/* Soft, low-contrast hairline bottom indicator */}
                <span 
                  className={`absolute bottom-1.5 left-0 w-full h-[1.5px] bg-[#1C1C1C]/35 transition-transform duration-300 ease-out origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons & Tablet/Mobile Burger Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

          {/* Navigate Home Link (Right-to-Left Arrow Flow) - visible on md and wider without box container */}
          <a
            href="/#projects"
            className="hidden sm:inline-flex group items-center gap-1.5 px-1.5 py-1 text-xs font-sans text-[#1C1C1C]/80 hover:text-[#1C1C1C] transition-colors whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] rounded"
            data-tooltip="Перейти к кейсам на главной"
            aria-label="Вернуться на главную страницу в секцию дизайн-кейсов"
          >
            <div className="relative w-3.5 h-3.5 overflow-hidden flex items-center justify-center shrink-0" aria-hidden="true">
              <svg 
                className="w-3.5 h-3.5 text-[#1C1C1C] absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-x-full" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <svg 
                className="w-3.5 h-3.5 text-[#1C1C1C] absolute inset-0 transition-transform duration-300 ease-out translate-x-full group-hover:translate-x-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </div>
            <span>На главную</span>
          </a>

          {/* Меню выбора кейсов (самая правая кнопка перед бургер-меню) */}
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border cursor-pointer ${
                isDropdownOpen
                  ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-xs'
                  : 'bg-white text-[#1C1C1C] border-[#1C1C1C]/15 hover:bg-[#1C1C1C]/5'
              }`}
              aria-expanded={isDropdownOpen}
              aria-label="Открыть список дизайн-проектов"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Дизайн-кейсы</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown с плавной анимацией появления и закрытия */}
            <div
              className={`absolute top-full right-0 mt-2 w-72 bg-[#F9F7F2] rounded-xl shadow-xl border border-[#1C1C1C]/15 py-2.5 z-50 transition-all duration-200 origin-top-right ${
                isDropdownOpen
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }`}
            >
              <div 
                className="px-3.5 pt-1 pb-2 border-b border-[#1C1C1C]/10 text-sm font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Kurale, serif' }}
              >
                Все дизайн-проекты
              </div>
              <div className="pt-1.5 space-y-0.5">
                {CASES.map((c) => (
                  <a
                    key={c.id}
                    href={c.href}
                    className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors rounded-lg mx-1 ${
                      c.isCurrent
                        ? 'bg-[#1C1C1C]/[0.08] font-medium text-[#1C1C1C]'
                        : 'text-[#1C1C1C]/75 hover:bg-[#1C1C1C]/[0.05] hover:text-[#1C1C1C]'
                    }`}
                  >
                    <span>{c.title}</span>
                    {c.isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C] shrink-0 ml-2" aria-hidden="true" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet & Mobile Burger Menu Button (Visible on screens under 1024px) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-lg text-[#1C1C1C] bg-[#1C1C1C]/[0.07] hover:bg-[#1C1C1C]/[0.12] border border-[#1C1C1C]/30 hover:border-[#1C1C1C]/70 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
            aria-label={isMenuOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}
            aria-expanded={isMenuOpen}
          >
            <div className="w-4.5 h-4.5 relative flex items-center justify-center">
              <span 
                className={`absolute h-0.5 w-4.5 bg-[#1C1C1C] transition-transform duration-300 ease-out ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`} 
              />
              <span 
                className={`absolute h-0.5 w-4.5 bg-[#1C1C1C] transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`absolute h-0.5 w-4.5 bg-[#1C1C1C] transition-transform duration-300 ease-out ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar directly under the Header */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-transparent pointer-events-none overflow-hidden"
        role="progressbar"
        aria-label="Прогресс чтения страницы"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(scrollProgress * 100)}%`}
      >
        <div 
          className="h-full bg-[#1C1C1C]/25 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Compact Floating Sheet Popover Menu for Tablet & Mobile */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed top-12 sm:top-13 inset-x-0 bottom-0 z-40 bg-black/15 transition-opacity lg:hidden touch-none"
            onClick={() => setIsMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />
          <div 
            className="fixed right-4 sm:right-6 top-14 z-50 w-[calc(100vw-2rem)] sm:w-[320px] max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-[#F9F7F2] border border-[#1C1C1C]/20 shadow-xl rounded-xl p-3 sm:p-4 space-y-3 animate-popover-in lg:hidden"
            role="dialog"
            aria-label="Меню навигации по разделам"
          >
            <div className="pb-2 border-b border-[#1C1C1C]/15 text-right">
              <span className="text-xs font-sans font-medium text-[#1C1C1C]/60 block text-right">
                Меню навигации
              </span>
            </div>

            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-150 flex items-center justify-between text-xs sm:text-sm font-sans cursor-pointer ${
                      isActive
                        ? 'bg-white font-medium text-[#1C1C1C] border border-[#1C1C1C]/25 shadow-2xs'
                        : 'text-[#1C1C1C]/80 hover:bg-[#1C1C1C]/5 hover:text-[#1C1C1C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-[#1C1C1C]/40 font-medium">
                        {item.number}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#1C1C1C]/15 flex items-center justify-between gap-2">
              <a
                href="/#projects"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center px-3 py-2 text-xs font-sans font-medium text-[#1C1C1C] bg-white hover:bg-[#F3EFE6] border border-[#1C1C1C]/20 rounded-lg transition-colors cursor-pointer block"
              >
                Вернуться к дизайн-проектам
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

