import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CASE_STUDY_DATA, ChapterData, BOOK_SECTIONS, BookSection } from '../data/caseStudyData';
import { EthnicPattern } from './EthnicOrnaments';
import { audioEngine } from '../utils/audioEngine';
import { PageFlipBook, PageFlipBookRef } from './PageFlipBook';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp
} from 'lucide-react';

interface InteractiveBookReaderProps {
  isVisible: boolean;
  progress?: number;
  portalContainer?: HTMLElement | null;
  onOpenDetailedModal?: (chapterId: number) => void;
}

const TOTAL_BOOK_PAGES = 150;

// Minimalist ethnic vector icon matching the semantics of each section
const SectionEthnicIcon: React.FC<{ sectionId: string | number; className?: string; style?: React.CSSProperties }> = ({ 
  sectionId, 
  className = 'w-3.5 h-3.5',
  style 
}) => {
  switch (sectionId) {
    case 'intro':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      );
    case 'legend':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.5 6.5L22 12l-6.5 3.5L12 22l-3.5-6.5L2 12l6.5-3.5z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 1: // Семья
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <path d="M3 19a5 5 0 0 1 9-2.5M12 16.5A5 5 0 0 1 21 19" />
          <path d="M12 2v3M9 4.5l3-2.5 3 2.5" />
        </svg>
      );
    case 2: // Одежда
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l3 5-4 3v10H7V11L3 8z" />
          <path d="M12 3v18M9 14l3 3 3-3" />
        </svg>
      );
    case 3: // Жилище
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18L13.5 3.5M10.5 3.5L21 21M3 21l9-17.5 9 17.5" />
          <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
        </svg>
      );
    case 4: // География
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9c3-2 6-2 9 0s6 2 9 0M3 15c3-2 6-2 9 0s6 2 9 0" />
          <path d="M12 3v3M6 5l6-3 6 3" />
        </svg>
      );
    case 5: // Флора
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M12 5l-4 3M12 8l4 3M12 12l-5 4M12 15l5 4" />
        </svg>
      );
    case 6: // Фауна
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="15" rx="5" ry="4" />
          <circle cx="6" cy="9" r="1.5" />
          <circle cx="10" cy="7" r="1.5" />
          <circle cx="14" cy="7" r="1.5" />
          <circle cx="18" cy="9" r="1.5" />
        </svg>
      );
    case 7: // Инструменты и материалы
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4l6 6-4 4-6-6zM3 21l8-8M4 14l6 6" />
        </svg>
      );
    case 8: // Оленеводство
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 14v7M9 16l3 2 3-2M5 4c2 2 3 5 7 6 4-1 5-4 7-6M4 7l3 1M20 7l-3 1M7 3l1 3M17 3l-1 3" />
        </svg>
      );
    case 9: // Охота
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 19L19 5M13 5h6v6M5 9c0 5.5 4.5 10 10 10" />
        </svg>
      );
    case 10: // Рыболовство
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12c4-6 13-6 17 0-4 6-13 6-17 0zM18 12l4-4v8z" />
          <circle cx="8" cy="12" r="1" />
        </svg>
      );
    case 11: // Традиционные блюда
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11h16a8 8 0 0 1-16 0zM8 4c0 2-1 3-1 4M12 3c0 2-1 3-1 4M16 4c0 2-1 3-1 4" />
        </svg>
      );
    case 12: // Духовная культура
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" />
        </svg>
      );
    case 'conclusion':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h15M8 11h8M8 15h5" />
        </svg>
      );
    case 'appendix':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 4v16M14 9h3M14 13h3" />
        </svg>
      );
    case 'index':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h10M4 18h14" />
          <circle cx="18" cy="12" r="2" />
        </svg>
      );
    case 'informants':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 19a6 6 0 0 1 12 0M17 8a2 2 0 0 1 0 4M19 6a5 5 0 0 1 0 8" />
        </svg>
      );
    case 'sources':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10M6 10h10M6 14h6" />
        </svg>
      );
    case 'about':
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5z" />
        </svg>
      );
  }
};

export const InteractiveBookReader: React.FC<InteractiveBookReaderProps> = ({
  isVisible,
  progress,
  portalContainer,
  onOpenDetailedModal
}) => {
  const pageFlipRef = useRef<PageFlipBookRef | null>(null);

  // Navigation state
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Tools & Display Options
  const [soundEnabled] = useState<boolean>(true);
  const [showChapterMenu, setShowChapterMenu] = useState<boolean>(false);
  const [isMenuClosing, setIsMenuClosing] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic scale and opacity animation for seamless mobile page zoom sync
  const mobileAnimStyles = useMemo(() => {
    if (!isMobile || progress === undefined) {
      return {
        opacity: isVisible ? 1 : 0,
        transform: 'scale(1) translateY(0px)',
        pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
      };
    }
    // PDF reader fades in ONLY after 3D book zoom finishes (progress >= 0.48)
    if (progress < 0.48) {
      return {
        opacity: 0,
        transform: 'scale(1) translateY(0px)',
        pointerEvents: 'none' as const,
      };
    }
    if (progress > 0.98) {
      const fade = Math.max(0, 1 - (progress - 0.98) / 0.02);
      return {
        opacity: fade,
        transform: 'scale(1) translateY(0px)',
        pointerEvents: fade > 0.05 ? ('auto' as const) : ('none' as const),
      };
    }
    const p = Math.min(Math.max((progress - 0.48) / 0.06, 0), 1);
    return {
      opacity: p,
      transform: 'scale(1) translateY(0px)',
      pointerEvents: p > 0.5 ? ('auto' as const) : ('none' as const),
    };
  }, [isMobile, progress, isVisible]);

  const chapterMenuRef = useRef<HTMLDivElement | null>(null);
  const chapterToggleRef = useRef<HTMLButtonElement | null>(null);

  // The interactive physical book contains 150 interior pages
  const totalSpreads = Math.ceil(TOTAL_BOOK_PAGES / 2); // 75 spreads

  // Compute 1-based book page numbers for any spread index (0 to 74)
  const getSpreadPages = useCallback((spreadIdx: number) => {
    const leftBook = spreadIdx * 2 + 1;
    const rightBook = (spreadIdx * 2 + 2) <= TOTAL_BOOK_PAGES ? spreadIdx * 2 + 2 : null;
    return {
      leftBookPage: leftBook <= TOTAL_BOOK_PAGES ? leftBook : null,
      rightBookPage: rightBook,
      // Underlying file numbers (Book page N corresponds to page N + 1 in assets)
      leftPdfPage: leftBook <= TOTAL_BOOK_PAGES ? leftBook + 1 : null,
      rightPdfPage: rightBook ? rightBook + 1 : null,
    };
  }, []);

  // All book page URLs for PageFlip engine
  const allPageUrls = useMemo(() => {
    const urls: string[] = [];
    for (let bookPage = 1; bookPage <= TOTAL_BOOK_PAGES; bookPage++) {
      const pageNum = bookPage + 1;
      urls.push(`/dictionary-pages/page_${String(pageNum).padStart(3, '0')}.webp`);
    }
    return urls;
  }, []);

  const closeChapterMenu = useCallback(() => {
    if (!showChapterMenu || isMenuClosing) return;
    setIsMenuClosing(true);
    setTimeout(() => {
      setShowChapterMenu(false);
      setIsMenuClosing(false);
    }, 220);
  }, [showChapterMenu, isMenuClosing]);

  const toggleChapterMenu = useCallback(() => {
    if (showChapterMenu) {
      closeChapterMenu();
    } else {
      setIsMenuClosing(false);
      setShowChapterMenu(true);
    }
  }, [showChapterMenu, closeChapterMenu]);

  // Jump directly to any section by its 1-based book page number
  const handleJumpToSection = (sectionId: string | number) => {
    const sec = BOOK_SECTIONS.find(s => s.id === sectionId);
    if (!sec) return;
    if (isMobile) {
      const targetPage = Math.max(0, Math.min(sec.pageNumber - 1, TOTAL_BOOK_PAGES - 1));
      if (targetPage === currentPageIndex) {
        closeChapterMenu();
        return;
      }
      pageFlipRef.current?.flipToPage(targetPage);
      setCurrentPageIndex(targetPage);
      setCurrentSpreadIndex(Math.floor(targetPage / 2));
      closeChapterMenu();
    } else {
      const bookPage = sec.pageNumber;
      const targetSpread = Math.max(0, Math.min(Math.floor((bookPage - 1) / 2), totalSpreads - 1));
      if (targetSpread === currentSpreadIndex) {
        closeChapterMenu();
        return;
      }
      pageFlipRef.current?.flipToSpread(targetSpread);
      closeChapterMenu();
    }
  };

  // Page Flip Triggers
  const handleNextSpread = useCallback(() => {
    if (currentSpreadIndex < totalSpreads - 1) {
      pageFlipRef.current?.flipNext('bottom');
    }
  }, [currentSpreadIndex, totalSpreads]);

  const handlePrevSpread = useCallback(() => {
    if (currentSpreadIndex > 0) {
      pageFlipRef.current?.flipPrev('bottom');
    }
  }, [currentSpreadIndex]);

  const handleNextPage = useCallback(() => {
    if (currentPageIndex < TOTAL_BOOK_PAGES - 1) {
      pageFlipRef.current?.flipNext('bottom');
    }
  }, [currentPageIndex]);

  const handlePrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      pageFlipRef.current?.flipPrev('bottom');
    }
  }, [currentPageIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (isMobile) {
          handleNextPage();
        } else {
          handleNextSpread();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (isMobile) {
          handlePrevPage();
        } else {
          handlePrevSpread();
        }
      } else if (e.key === 'Escape') {
        if (showChapterMenu) closeChapterMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isMobile, handleNextSpread, handlePrevSpread, handleNextPage, handlePrevPage, showChapterMenu, closeChapterMenu]);

  // Close chapter menu when clicking outside
  useEffect(() => {
    if (!showChapterMenu || isMenuClosing) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        chapterMenuRef.current && 
        !chapterMenuRef.current.contains(target) &&
        chapterToggleRef.current && 
        !chapterToggleRef.current.contains(target)
      ) {
        closeChapterMenu();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showChapterMenu, isMenuClosing, closeChapterMenu]);

  const currSpread = getSpreadPages(currentSpreadIndex);

  const currentSection: BookSection = useMemo(() => {
    const leftPage = currSpread.leftBookPage || 1;
    const rightPage = currSpread.rightBookPage || leftPage;

    // Check if rightPage starts a section
    const rightSection = BOOK_SECTIONS.find(s => s.pageNumber === rightPage);
    if (rightSection) {
      return rightSection;
    }

    // Otherwise find the section where leftPage falls in [pageNumber, endPageNumber]
    for (const section of BOOK_SECTIONS) {
      if (leftPage >= section.pageNumber && leftPage <= section.endPageNumber) {
        return section;
      }
    }

    if (leftPage < 3) return BOOK_SECTIONS[0];
    return BOOK_SECTIONS[BOOK_SECTIONS.length - 1];
  }, [currSpread.leftBookPage, currSpread.rightBookPage]);

  const currentSectionMobile: BookSection = useMemo(() => {
    const bookPage = currentPageIndex + 1;
    for (const section of BOOK_SECTIONS) {
      if (bookPage >= section.pageNumber && bookPage <= section.endPageNumber) {
        return section;
      }
    }
    if (bookPage < 3) return BOOK_SECTIONS[0];
    return BOOK_SECTIONS[BOOK_SECTIONS.length - 1];
  }, [currentPageIndex]);

  const activeSection = isMobile ? currentSectionMobile : currentSection;

  const renderControls = () => (
    <>
      {/* On desktop (>= 768px), floating side navigation arrow buttons */}
      {!isMobile && currentSpreadIndex > 0 && (
        <button
          type="button"
          onClick={handlePrevSpread}
          className="absolute left-[8%] lg:left-[9%] top-1/2 -translate-y-1/2 z-50 pointer-events-auto w-12 h-12 rounded-full bg-white text-[#1C1C1C] shadow-lg border border-[#1C1C1C]/20 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          aria-label="Предыдущий разворот"
        >
          <ChevronLeft className="w-6 h-6 shrink-0 pointer-events-none" aria-hidden="true" />
        </button>
      )}

      {!isMobile && currentSpreadIndex < totalSpreads - 1 && (
        <button
          type="button"
          onClick={handleNextSpread}
          className="absolute right-[8%] lg:right-[9%] top-1/2 -translate-y-1/2 z-50 pointer-events-auto w-12 h-12 rounded-full bg-white text-[#1C1C1C] shadow-lg border border-[#1C1C1C]/20 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          aria-label="Следующий разворот"
        >
          <ChevronRight className="w-6 h-6 shrink-0 pointer-events-none" aria-hidden="true" />
        </button>
      )}

      {/* Bottom Reader Controls Anchor: perfectly centered at bottom */}
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center select-none max-w-[calc(100vw-1rem)]">
        {/* Centered Chapter Menu Popover with Spring Scale In/Out Animations & Soft Shadow */}
        {(showChapterMenu || isMenuClosing) && (
          <div
            ref={chapterMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Содержание книги-словаря"
            className={`mb-2.5 sm:mb-3 w-[calc(100vw-1.5rem)] sm:w-[640px] max-w-[640px] max-h-[78vh] sm:max-h-[82vh] overflow-y-auto overflow-x-hidden bg-[#FAF8F5]/98 backdrop-blur-md border border-[#1C1C1C]/10 rounded-2xl p-3.5 sm:p-5 z-50 origin-bottom font-sans shadow-2xl ${
              isMenuClosing ? 'animate-menu-scale-out' : 'animate-menu-scale-in'
            }`}
          >
            {/* Header: Editorial Kurale font face with comfortable padding above divider */}
            <div className="px-1 pt-0.5 pb-2.5 sm:pb-3.5 mb-2.5 sm:mb-3.5 border-b border-[#1C1C1C]/12 text-[#1C1C1C] flex items-center justify-between">
              <span className="font-editorial text-base sm:text-xl text-[#1C1C1C] leading-tight font-normal">Содержание словаря</span>
              <span className="text-xs sm:text-sm text-[#1C1C1C]/60 font-sans font-normal">{TOTAL_BOOK_PAGES} полос</span>
            </div>

            {/* 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5 w-full min-w-0">
              {/* Column 1: Items 1 to 10 */}
              <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
                {BOOK_SECTIONS.slice(0, 10).map((sec) => {
                  const isCurrent = sec.id === activeSection.id;
                  const accent = sec.accentColor || '#3E3E3E';
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleJumpToSection(sec.id)}
                      aria-label={`Перейти к разделу ${sec.title}, страница ${sec.pageDisplay || sec.pageNumber}`}
                      style={isCurrent ? { backgroundColor: accent } : undefined}
                      className={`w-full text-left px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] min-w-0 ${
                        isCurrent 
                          ? 'text-white font-medium shadow-sm ring-1 ring-black/10' 
                          : 'hover:bg-black/5 text-[#1C1C1C] active:bg-black/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1.5">
                        <SectionEthnicIcon
                          sectionId={sec.id}
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isCurrent ? 'text-white scale-110' : ''
                          }`}
                          style={!isCurrent ? { color: accent } : undefined}
                        />
                        <span className="truncate font-normal">
                          {sec.title}
                        </span>
                      </div>
                      <span 
                        className={`text-xs sm:text-sm shrink-0 font-sans ${
                          isCurrent ? 'text-white/95 font-medium' : 'text-[#1C1C1C]/80 font-normal'
                        }`}
                      >
                        {sec.pageDisplay || sec.pageNumber}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Column 2: Items 11 to 20 */}
              <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
                {BOOK_SECTIONS.slice(10).map((sec) => {
                  const isCurrent = sec.id === activeSection.id;
                  const accent = sec.accentColor || '#3E3E3E';
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleJumpToSection(sec.id)}
                      aria-label={`Перейти к разделу ${sec.title}, страница ${sec.pageDisplay || sec.pageNumber}`}
                      style={isCurrent ? { backgroundColor: accent } : undefined}
                      className={`w-full text-left px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] min-w-0 ${
                        isCurrent 
                          ? 'text-white font-medium shadow-sm ring-1 ring-black/10' 
                          : 'hover:bg-black/5 text-[#1C1C1C] active:bg-black/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1.5">
                        <SectionEthnicIcon
                          sectionId={sec.id}
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isCurrent ? 'text-white scale-110' : ''
                          }`}
                          style={!isCurrent ? { color: accent } : undefined}
                        />
                        <span className="truncate font-normal">
                          {sec.title}
                        </span>
                      </div>
                      <span 
                        className={`text-xs sm:text-sm shrink-0 font-sans ${
                          isCurrent ? 'text-white/95 font-medium' : 'text-[#1C1C1C]/80 font-normal'
                        }`}
                      >
                        {sec.pageDisplay || sec.pageNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Sleek Floating Reader Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white/95 backdrop-blur-md border border-[#1C1C1C]/15 rounded-full shadow-lg text-[#1C1C1C] text-xs font-sans max-w-full">
          {/* Mobile Left Arrow Button (<) integrated directly into bottom toolbar */}
          {isMobile && (
            <>
              <button
                type="button"
                onClick={handlePrevSpread}
                disabled={currentSpreadIndex === 0}
                className="w-8 h-8 rounded-full bg-black/5 active:bg-black/15 text-[#1C1C1C] flex items-center justify-center shrink-0 disabled:opacity-25 disabled:pointer-events-none transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Предыдущий разворот"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
              <span className="w-px h-4 bg-[#1C1C1C]/15 shrink-0" aria-hidden="true" />
            </>
          )}

          {/* Chapter Menu Toggle Button */}
          <button
            ref={chapterToggleRef}
            type="button"
            onClick={toggleChapterMenu}
            aria-expanded={showChapterMenu}
            aria-haspopup="dialog"
            aria-label={`Текущий раздел книги: ${activeSection.title}. Открыть содержание словаря`}
            className="relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full hover:bg-black/5 transition-colors font-medium text-[#1C1C1C] group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          >
            {/* Soft pulse glow when chapter changes */}
            <span
              key={`glow-${activeSection.id}`}
              className="absolute inset-0 rounded-full animate-selector-glow pointer-events-none"
              aria-hidden="true"
            />

            <SectionEthnicIcon 
              sectionId={activeSection.id}
              className="w-3.5 h-3.5 shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110" 
              style={{ color: activeSection.accentColor || '#1C1C1C' }}
            />
            <span className="hidden sm:inline shrink-0 relative z-10 text-[#1C1C1C]/75 font-medium">Раздел:</span>
            <div className="relative overflow-hidden min-w-[130px] max-w-[46vw] xs:max-w-[52vw] sm:w-[220px] sm:max-w-none h-[18px] flex items-center shrink min-w-0 z-10">
              <span
                key={`title-${activeSection.id}`}
                className="font-semibold truncate w-full text-left inline-block animate-chapter-title text-[#1C1C1C]"
                style={{ color: activeSection.accentColor || '#1C1C1C' }}
              >
                {activeSection.title}
              </span>
            </div>
            <ChevronUp
              className={`w-3.5 h-3.5 text-[#1C1C1C]/60 shrink-0 relative z-10 transition-transform duration-300 ${
                showChapterMenu ? 'rotate-180 text-[#1C1C1C]' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <span className="w-px h-4 bg-[#1C1C1C]/20 shrink-0" aria-hidden="true" />

          {/* Page / Spread Indicator: 1-149 book page numbering */}
          <span 
            className="text-xs text-[#1C1C1C] font-semibold px-1 whitespace-nowrap cursor-default shrink-0"
            aria-label={`Разворот страниц: ${currSpread.leftBookPage}${currSpread.rightBookPage ? ` и ${currSpread.rightBookPage}` : ''} из ${TOTAL_BOOK_PAGES}`}
          >
            {currSpread.leftBookPage}{currSpread.rightBookPage ? `–${currSpread.rightBookPage}` : ''} <span className="text-[#1C1C1C]/60 font-normal">/ {TOTAL_BOOK_PAGES}</span>
          </span>

          {/* Mobile Right Arrow Button (>) integrated directly into bottom toolbar */}
          {isMobile && (
            <>
              <span className="w-px h-4 bg-[#1C1C1C]/15 shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={handleNextSpread}
                disabled={currentSpreadIndex === totalSpreads - 1}
                className="w-8 h-8 rounded-full bg-black/5 active:bg-black/15 text-[#1C1C1C] flex items-center justify-center shrink-0 disabled:opacity-25 disabled:pointer-events-none transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Следующий разворот"
              >
                <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  const controlsPortal = portalContainer || (typeof document !== 'undefined' ? document.body : null);

  return (
    <>
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 pointer-events-auto select-none ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          <div 
            className="absolute pointer-events-auto select-none"
            style={{
              left: '17.03125%',
              top: '12.4074%',
              width: '65.4166%',
              height: '79.6296%',
              zIndex: 25,
            }}
          >
            <PageFlipBook
              ref={pageFlipRef}
              pages={allPageUrls}
              isSinglePage={false}
              initialSpreadIndex={currentSpreadIndex}
              onSpreadChange={(newSpread) => {
                setCurrentSpreadIndex(newSpread);
                setCurrentPageIndex(newSpread * 2);
              }}
              soundEnabled={soundEnabled}
            />
          </div>
        </div>
      </div>

      {isVisible && controlsPortal && createPortal(renderControls(), controlsPortal)}
    </>
  );
};
