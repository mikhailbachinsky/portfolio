import React, { useState, useEffect } from 'react';
import { CASE_STUDY_DATA } from '../data/caseStudyData';
import { X, Grid, ChevronLeft, ChevronRight } from 'lucide-react';

interface SpreadModalProps {
  chapterId: number | null;
  onClose: () => void;
  onSelectChapter: (id: number) => void;
}

export const SpreadModal: React.FC<SpreadModalProps> = ({
  chapterId,
  onClose,
  onSelectChapter
}) => {
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [spreadOffset, setSpreadOffset] = useState(0);

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 320);
  };

  useEffect(() => {
    setSpreadOffset(0);
  }, [chapterId]);

  useEffect(() => {
    if (chapterId === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [chapterId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNextSpread();
      if (e.key === 'ArrowLeft') handlePrevSpread();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, chapterId, spreadOffset]);

  if (chapterId === null) return null;

  const currentChapter = CASE_STUDY_DATA.chapters.find((c) => c.id === chapterId) || CASE_STUDY_DATA.chapters[0];

  const startPage = currentChapter.pageNumber;
  const maxSpreadsForChapter = Math.max(1, Math.ceil(((currentChapter.endPageNumber || (startPage + 11)) - startPage + 1) / 2));
  const leftPage = startPage + spreadOffset * 2;
  const rightPage = Math.min(leftPage + 1, currentChapter.endPageNumber || 150);
  const leftPdfPage = leftPage + 1;
  const rightPdfPage = Math.min(rightPage + 1, 151);

  const handlePrevSpread = () => {
    if (spreadOffset > 0) {
      setSpreadOffset(prev => prev - 1);
    } else {
      const prevId = chapterId <= 1 ? 12 : chapterId - 1;
      const prevChapter = CASE_STUDY_DATA.chapters.find((c) => c.id === prevId) || CASE_STUDY_DATA.chapters[0];
      const prevMaxSpreads = Math.max(1, Math.ceil(((prevChapter.endPageNumber || (prevChapter.pageNumber + 11)) - prevChapter.pageNumber + 1) / 2));
      onSelectChapter(prevId);
      setSpreadOffset(prevMaxSpreads - 1);
    }
  };

  const handleNextSpread = () => {
    if (spreadOffset < maxSpreadsForChapter - 1) {
      setSpreadOffset(prev => prev + 1);
    } else {
      const nextId = chapterId >= 12 ? 1 : chapterId + 1;
      onSelectChapter(nextId);
      setSpreadOffset(0);
    }
  };

  const handlePrevChapter = () => {
    const prevId = chapterId <= 1 ? 12 : chapterId - 1;
    onSelectChapter(prevId);
  };

  const handleNextChapter = () => {
    const nextId = chapterId >= 12 ? 1 : chapterId + 1;
    onSelectChapter(nextId);
  };

  return (
    <div 
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spread-modal-title"
      onClick={handleClose}
    >
      {/* Container */}
      <div 
        className={`relative w-full max-w-6xl bg-[#F9F7F2] border border-[#1C1C1C]/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] cursor-default ${
          isClosing ? 'm3-exit-smooth' : 'm3-enter-smooth'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#1C1C1C]/15 bg-[#FAF8F5]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/5 text-[#1C1C1C] border border-[#1C1C1C]/15 text-xs font-sans font-medium shrink-0">
              Книга-словарь
            </span>
            <h3 id="spread-modal-title" className="text-[#1C1C1C] text-xs sm:text-sm font-editorial font-normal truncate">
              Глава {currentChapter.numberStr}: {currentChapter.title}
            </h3>
            <span className="hidden md:inline text-xs text-[#1C1C1C]/70 font-sans tabular-nums shrink-0">
              (Страницы {leftPage}–{rightPage} из&nbsp;150)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              aria-pressed={showGridOverlay}
              className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-sans transition-colors inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] ${
                showGridOverlay
                  ? 'bg-[#1C1C1C] text-[#F9F7F2]'
                  : 'bg-white text-[#1C1C1C] hover:bg-neutral-100 border border-[#1C1C1C]/15 shadow-sm'
              }`}
              data-tooltip="Сетка модульной вёрстки"
              data-tooltip-sub="Включить 12-колоночную сетку InDesign для анализа полей"
              data-tooltip-category="Режим просмотра"
              data-tooltip-icon="layer"
            >
              <Grid className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{showGridOverlay ? 'Сетка вёрстки: вкл' : 'Сетка вёрстки'}</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#1C1C1C]/70 hover:text-[#1C1C1C] hover:bg-black/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              aria-label="Закрыть окно просмотра разворота"
              data-tooltip="Закрыть модальное окно"
              data-tooltip-sub="Нажмите ESC или кликните сюда"
              data-tooltip-category="Закрытие"
              data-tooltip-icon="action"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Body: High Res Spread Viewport */}
        <div className="p-3 sm:p-6 lg:p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#F4F1EA]">
          <div className="relative w-full aspect-[16/10] min-h-[190px] sm:min-h-[260px] max-h-[70vh] bg-[#FAF8F5] text-[#1C1C1C] border border-[#1C1C1C]/15 rounded-xl shadow-2xl flex overflow-hidden select-none">
            {/* Left Page (Verso) */}
            <div className="w-1/2 h-full border-r border-[#1C1C1C]/10 flex items-center justify-center bg-[#FAF8F5] overflow-hidden relative">
              <img
                src={`/dictionary-pages/page_${String(leftPdfPage).padStart(3, '0')}.webp`}
                alt={`Левая страница ${leftPage}`}
                className="w-full h-full object-contain"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Book Spine Center Fold Shadow */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/5 via-black/25 to-black/5 pointer-events-none z-20" aria-hidden="true" />

            {/* Right Page (Recto) */}
            <div className="w-1/2 h-full flex items-center justify-center bg-[#FAF8F5] overflow-hidden relative">
              <img
                src={`/dictionary-pages/page_${String(rightPdfPage).padStart(3, '0')}.webp`}
                alt={`Правая страница ${rightPage}`}
                className="w-full h-full object-contain"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/5 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Optional 12-Column Grid Overlay */}
            {showGridOverlay && (
              <div className="absolute inset-0 grid grid-cols-12 gap-1.5 p-6 pointer-events-none z-30" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-[#1C1C1C]/[0.02] border-x border-[#1C1C1C]/15 flex items-start justify-center pt-2 text-xs font-sans text-[#1C1C1C]/50 font-medium"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#1C1C1C]/15 bg-[#FAF8F5] text-xs font-sans text-[#1C1C1C]/75">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={handlePrevChapter}
              className="hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors inline-flex items-center justify-center gap-1 font-medium bg-white px-3 py-2 min-h-[44px] rounded-lg border border-[#1C1C1C]/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              aria-label="Предыдущая глава книги"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" /> <span className="hidden xs:inline">Пред. глава</span>
            </button>
            <button
              type="button"
              onClick={handlePrevSpread}
              className="hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors inline-flex items-center justify-center gap-1 font-medium bg-white px-3 py-2 min-h-[44px] rounded-lg border border-[#1C1C1C]/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              aria-label="Предыдущий разворот книги"
            >
              ‹ <span className="hidden xs:inline">Пред. разворот</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-center tabular-nums text-xs">
            <span className="font-semibold text-[#1C1C1C]">
              Стр. {leftPage}–{rightPage}
            </span>
            <span className="text-[#1C1C1C]/60 font-medium">·</span>
            <span>Разворот {spreadOffset + 1}/{maxSpreadsForChapter}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={handleNextSpread}
              className="hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors inline-flex items-center justify-center gap-1 font-medium bg-white px-3 py-2 min-h-[44px] rounded-lg border border-[#1C1C1C]/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              aria-label="Следующий разворот книги"
            >
              <span className="hidden xs:inline">След. разворот</span> ›
            </button>
            <button
              type="button"
              onClick={handleNextChapter}
              className="hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors inline-flex items-center justify-center gap-1 font-medium bg-white px-3 py-2 min-h-[44px] rounded-lg border border-[#1C1C1C]/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              aria-label="Следующая глава книги"
            >
              <span className="hidden xs:inline">След. глава</span> <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
