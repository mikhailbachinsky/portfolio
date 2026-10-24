import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowDown, Layers, ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DiamondSeparator } from './DiamondSeparator';

export interface NavItem {
  id: string;
  label: string;
  num: string;
  subtitle: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'context', label: 'Контекст', num: '01', subtitle: 'Сдвиг парадигмы и закрытый формат' },
  { id: 'concept', label: 'Концепция', num: '02', subtitle: 'Серебро 925, Изумруд и тайна' },
  { id: 'identity', label: 'Айдентика', num: '03', subtitle: '3D-арт, Фемида и типографика' },
  { id: 'deliverables', label: 'Носители', num: '04', subtitle: 'VIP-билеты, шёлк, клуб FACE и SMM' },
  { id: 'results', label: 'Итоги', num: '05', subtitle: '100% Sold Out и 297 гостей' },
  { id: 'contacts', label: 'Контакты', num: '06', subtitle: 'Обсудить проект и прямая связь' },
];

const CASES = [
  { id: 'tutor', title: 'Тьюторская служба ТГУ', href: '/tutor/', isCurrent: false },
  { id: 'law-day', title: 'День юриста 2024', href: '/law-day/', isCurrent: true },
  { id: 'upperket', title: 'Книга народов Верхнекетья', href: '/upperket/', isCurrent: false },
  { id: 'iniciativa', title: 'Волонтёрская организация «Инициатива»', href: '/#projects', isCurrent: false },
  { id: 'law-com', title: 'Правовая комиссия ТГУ', href: '/#projects', isCurrent: false },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onScrollToTop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onScrollToTop
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop (1280px+)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when dropdown or mobile menu is open
  useEffect(() => {
    if (isDropdownOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDropdownOpen, mobileMenuOpen]);

  const handleMobileNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip navbar-glass border-b border-silver/40 shadow-2xl backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Identity & Decoded LSA - min-w-0 prevents mobile overflow */}
          <button
            onClick={() => {
              onScrollToTop();
              setMobileMenuOpen(false);
            }}
            className="min-w-0 flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink"
            title="В начало кейса"
          >
            <div className="w-8 h-8 rounded-full border border-silver/40 overflow-hidden group-hover:border-silver transition-colors silver-contour-subtle shadow-sm shrink-0">
              <img 
                src="/assets/vk_avatar.webp" 
                alt="LSA Logo Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Desktop Brand Label */}
            <div className="hidden sm:flex flex-col justify-center">
              <div className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
                Law Student Awards 2024
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 tracking-wide flex items-center whitespace-nowrap">
                <span>День юриста</span>
                <DiamondSeparator className="!mx-1.5 !w-1 !h-1 shrink-0" />
                <span>ЮИ&nbsp;ТГУ</span>
              </div>
            </div>

            {/* Mobile Brand Label */}
            <div className="flex sm:hidden flex-col justify-center min-w-0">
              <div className="text-white text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap leading-tight">
                LSA 2024
              </div>
              <div className="text-[9px] text-white/60 tracking-wide flex items-center whitespace-nowrap leading-tight">
                <span>День юриста</span>
                <DiamondSeparator className="!mx-1 !w-1 !h-1 shrink-0" />
                <span>ЮИ&nbsp;ТГУ</span>
              </div>
            </div>
          </button>

          {/* Center: Anchor Navigation for Widescreen Desktops (xl+) */}
          <nav className="hidden xl:flex items-center gap-1 border border-silver/30 p-1 bg-white/[0.02] silver-contour-subtle shrink-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-2.5 py-1 text-xs tracking-wider uppercase transition-colors whitespace-nowrap font-medium ${
                    isActive
                      ? 'bg-white text-[#010e0d] font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions & Mobile/Tablet Menu Toggle - strictly uniform h-8 height */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Меню выбора кейсов (кнопка переключения) */}
            <button
              type="button"
              id="btn-cases-dropdown"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className={`flex items-center gap-1.5 h-8 px-2.5 sm:px-3 text-xs tracking-wider uppercase font-medium transition-colors border cursor-pointer ${
                isDropdownOpen
                  ? 'bg-white text-[#010e0d] border-white shadow-xs'
                  : 'bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border-silver/40 hover:border-silver silver-contour-subtle'
              }`}
              title="Все дизайн-кейсы"
            >
              <Layers className="w-3.5 h-3.5 text-silver-bright" />
              <span>Дизайн-кейсы</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 h-8 px-2.5 sm:px-3 text-xs tracking-wider uppercase font-medium bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-silver/40 hover:border-silver transition-colors whitespace-nowrap silver-contour-subtle"
              title="Вернуться на главную страницу портфолио"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-silver-bright" />
              <span className="hidden md:inline">На&nbsp;главную</span>
            </a>

            {/* Mobile & Tablet Menu Button (xl:hidden) - exact h-8 w-8 matching sibling buttons */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden flex items-center justify-center h-8 w-8 shrink-0 border transition-colors cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-white text-[#010e0d] border-white'
                  : 'text-white/80 hover:text-white border-silver/40 hover:border-silver bg-white/[0.04] hover:bg-white/[0.1]'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Переключить меню навигации"
              title={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню разделов'}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-emerald-900" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Cases Dropdown mounted directly in document.body via Portal - Zero layout shift & exact header bottom attachment */}
      {typeof document !== 'undefined' &&
        isDropdownOpen &&
        createPortal(
          <>
            {/* Transparent backdrop click overlay - NO site/cursor blur */}
            <div 
              className="fixed inset-0 z-[99998] bg-black/10" 
              onClick={() => setIsDropdownOpen(false)} 
            />

            {/* Cases Dropdown Panel in authentic Law Student Awards 2024 Siberian Frost aesthetic */}
            <div 
              style={{
                position: 'fixed',
                top: '56px',
                zIndex: 99999,
              }}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="sm:!top-16 right-2 sm:right-6 lg:right-12 w-[calc(100vw-16px)] sm:w-96 frost-card-glass bg-[#011413]/98 backdrop-blur-xl p-3 border border-silver/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(215,235,238,0.12)] silver-contour overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Rich Siberian Frost Texture Overlays matching site cards */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15 mix-blend-screen"
                style={{ backgroundImage: `url('/assets/texture-frost.avif')` }}
              />
              <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-silver-bright/60 to-transparent pointer-events-none" />

              {/* Eyebrow Header Bar - Authentic Law Student Awards 2024 design */}
              <div className="relative z-10 text-[11px] uppercase tracking-widest text-silver-bright font-mono px-2 py-1.5 flex items-center justify-between border-b border-silver/20 mb-2">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-silver-bright" />
                  <span>Портфолио кейсов</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center text-[10px] text-white/50 tracking-wider font-mono">
                    <span>LSA</span>
                    <DiamondSeparator className="!mx-1 !w-1 !h-1 shrink-0" />
                    <span>2024</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-1 text-[10px] text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Закрыть меню"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Закрыть</span>
                  </button>
                </div>
              </div>

              {/* Case Items List */}
              <div className="relative z-10 space-y-1.5">
                {CASES.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`w-full px-3 py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium transition-all text-left border ${
                      item.isCurrent
                        ? 'bg-white/[0.1] text-white font-semibold border-silver/50 shadow-sm silver-contour-subtle'
                        : 'bg-white/[0.02] hover:bg-white/[0.08] text-white/80 hover:text-white border-silver/20 hover:border-silver/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {item.isCurrent ? (
                        <span className="w-2 h-2 rotate-45 bg-emerald-400 border border-emerald-300 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                      )}
                      <span className="leading-snug">{item.title}</span>
                    </div>
                    {item.isCurrent ? (
                      <span className="text-[9.5px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0">
                        Текущий
                      </span>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </>,
          document.body
        )}

      {/* Floating Animated Overlay Dropdown mounted directly in document.body - Zero layout shift */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-nav-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setMobileMenuOpen(false)}
                style={{ position: 'fixed', top: '56px', left: 0, right: 0, bottom: 0, zIndex: 99998 }}
                className="xl:hidden sm:!top-16 bg-black/60"
                aria-hidden="true"
              />
            )}

            {mobileMenuOpen && (
              <motion.div 
                key="mobile-nav-panel"
                id="mobile-nav-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'fixed',
                  top: '56px',
                  left: 0,
                  right: 0,
                  width: '100%',
                  zIndex: 99999,
                }}
                className="xl:hidden sm:!top-16 border-y border-silver/40 bg-[#011413]/95 backdrop-blur-2xl silver-contour shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(215,235,238,0.06)] overflow-y-auto max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)]"
              >
                {/* Rich Siberian Frost Texture Overlays matching site cards */}
                <div 
                  className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15 mix-blend-screen"
                  style={{ backgroundImage: `url('/assets/texture-frost.avif')` }}
                />
                <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />
                <div className="absolute inset-0 hoarfrost-lace opacity-25 pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 md:landscape:py-3.5">
                  {/* Top Eyebrow Header Bar */}
                  <div className="flex items-center justify-between border-b border-silver/20 pb-2.5 mb-3">
                    <div className="flex items-center text-xs uppercase tracking-widest text-silver-bright font-mono">
                      <span>Навигация по разделам кейса</span>
                      <DiamondSeparator className="!mx-2" />
                      <span>Law Student Awards 2024</span>
                    </div>
                    <div className="text-xs text-white/40 font-mono hidden sm:inline">
                      2024
                    </div>
                  </div>

                  {/* 6-Column Navigation Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMobileNavClick(item.id)}
                          className={`group w-full flex flex-col justify-between p-3.5 sm:p-4 text-left transition-all border ${
                            isActive
                              ? 'bg-white text-[#010e0d] font-semibold border-white shadow-xl'
                              : 'border-silver/25 hover:border-silver/60 bg-white/[0.03] hover:bg-white/[0.07] text-white silver-contour-subtle'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <span className={`text-sm sm:text-[15px] uppercase tracking-wider font-semibold ${isActive ? 'text-[#010e0d]' : 'text-white'}`}>
                              {item.label}
                            </span>
                            <ArrowDown className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-y-1.5 ${isActive ? 'text-[#010e0d]' : 'text-silver-bright'}`} />
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <span className={`text-[11.5px] leading-snug font-light ${isActive ? 'text-[#010e0d]/75' : 'text-white/60'}`}>
                              {item.subtitle}
                            </span>
                            {isActive && (
                              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-[#010e0d] text-white shrink-0">
                                Текущий
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Design Cases Switcher in Mobile Drawer */}
                  <div className="mt-4 pt-3 border-t border-silver/20">
                    <div className="text-xs uppercase tracking-wider text-white/50 font-mono mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-silver-bright" />
                      <span>Другие дизайн-кейсы</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {CASES.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`p-3 border flex items-center justify-between text-xs font-medium transition-colors ${
                            item.isCurrent
                              ? 'bg-white/10 text-white border-silver/50 font-semibold shadow-xs'
                              : 'bg-white/[0.02] text-white/80 hover:text-white hover:bg-white/[0.06] border-silver/20'
                          }`}
                        >
                          <span className="leading-snug pr-2">{item.title}</span>
                          {item.isCurrent ? (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0">
                              Текущий
                            </span>
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-silver/20 text-xs">
                    <span className="text-white/40 font-light hidden sm:inline">
                      Арт-дирекшн & графический дизайн события
                    </span>
                    <a
                      href="/"
                      className="flex items-center gap-2 text-silver-bright hover:text-white transition-colors uppercase tracking-wider font-mono text-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>На главную страницу</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

