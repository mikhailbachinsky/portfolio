import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { audioEngine } from '../utils/audioEngine';

export interface PageFlipBookRef {
  flipNext: (corner?: 'top' | 'bottom') => void;
  flipPrev: (corner?: 'top' | 'bottom') => void;
  flipToSpread: (spreadIndex: number) => void;
  flipToPage: (pageIndex: number) => void;
  getCurrentSpread: () => number;
  getCurrentPage: () => number;
  getPageCount: () => number;
}

export interface PageFlipBookProps {
  pages: string[]; // List of page image URLs
  initialSpreadIndex?: number;
  initialPageIndex?: number;
  isSinglePage?: boolean;
  onSpreadChange?: (spreadIndex: number) => void;
  onPageChange?: (pageIndex: number) => void;
  onStateChange?: (state: 'read' | 'user_fold' | 'fold_corner' | 'flipping') => void;
  soundEnabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PageFlipBook = forwardRef<PageFlipBookRef, PageFlipBookProps>(({
  pages,
  initialSpreadIndex = 0,
  initialPageIndex,
  isSinglePage = false,
  onSpreadChange,
  onPageChange,
  onStateChange,
  soundEnabled = true,
  className = '',
  style = {}
}, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<PageFlip | null>(null);
  const isDestroyedRef = useRef<boolean>(false);
  const currentSpreadRef = useRef<number>(initialSpreadIndex);
  const currentPageRef = useRef<number>(initialPageIndex ?? (initialSpreadIndex * 2));
  const soundEnabledRef = useRef<boolean>(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const onSpreadChangeRef = useRef(onSpreadChange);
  onSpreadChangeRef.current = onSpreadChange;

  const onPageChangeRef = useRef(onPageChange);
  onPageChangeRef.current = onPageChange;

  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;

  // Imperative handle for parent component
  useImperativeHandle(ref, () => ({
    flipNext: (corner: 'top' | 'bottom' = 'bottom') => {
      if (pageFlipInstanceRef.current) {
        if (soundEnabledRef.current) audioEngine.playPageFlip(1.0);
        pageFlipInstanceRef.current.flipNext(corner);
      }
    },
    flipPrev: (corner: 'top' | 'bottom' = 'bottom') => {
      if (pageFlipInstanceRef.current) {
        if (soundEnabledRef.current) audioEngine.playPageFlip(1.0);
        pageFlipInstanceRef.current.flipPrev(corner);
      }
    },
    flipToSpread: (spreadIndex: number) => {
      if (!pageFlipInstanceRef.current) return;
      const targetPage = spreadIndex * 2;
      const current = pageFlipInstanceRef.current.getCurrentPageIndex();
      if (targetPage === current) return;

      if (soundEnabledRef.current) audioEngine.playPageFlip(1.1);
      pageFlipInstanceRef.current.flip(targetPage);
    },
    flipToPage: (pageIndex: number) => {
      if (!pageFlipInstanceRef.current) return;
      const current = pageFlipInstanceRef.current.getCurrentPageIndex();
      if (pageIndex === current) return;

      if (soundEnabledRef.current) audioEngine.playPageFlip(1.1);
      pageFlipInstanceRef.current.flip(pageIndex);
    },
    getCurrentSpread: () => currentSpreadRef.current,
    getCurrentPage: () => currentPageRef.current,
    getPageCount: () => pages.length
  }), [pages.length]);

  // Initialize PageFlip instance
  useEffect(() => {
    const container = containerRef.current;
    if (!container || pages.length === 0) return;

    isDestroyedRef.current = false;

    // Create a dedicated inner DOM host element that PageFlip can own and manage
    const hostEl = document.createElement('div');
    hostEl.className = 'w-full h-full relative select-none';
    hostEl.style.width = '100%';
    hostEl.style.height = '100%';
    hostEl.style.overflow = 'visible';
    container.appendChild(hostEl);

    // Create HTML page items
    const pageElements: HTMLElement[] = [];
    pages.forEach((url, idx) => {
      const pageEl = document.createElement('div');
      pageEl.className = 'page-leaf';
      pageEl.setAttribute('data-density', 'soft');
      pageEl.style.width = '100%';
      pageEl.style.height = '100%';
      pageEl.style.backgroundColor = '#FAF8F4';
      pageEl.style.overflow = 'hidden';
      pageEl.style.boxSizing = 'border-box';
      pageEl.style.position = 'relative';

      // High-resolution crisp image
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Страница ${idx + 1}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'fill';
      img.style.display = 'block';
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      img.draggable = false;
      // Preload the first few spreads immediately, rest lazily
      img.loading = idx < 6 ? 'eager' : 'lazy';
      img.decoding = 'async';

      pageEl.appendChild(img);

      // Subtle book spine shadow on the binding edge
      const isLeft = idx % 2 === 0;
      const spineShadow = document.createElement('div');
      spineShadow.style.position = 'absolute';
      spineShadow.style.top = '0';
      spineShadow.style.bottom = '0';
      spineShadow.style.width = '36px';
      spineShadow.style.pointerEvents = 'none';
      if (isLeft) {
        spineShadow.style.right = '0';
        spineShadow.style.background = 'linear-gradient(to right, rgba(28, 18, 8, 0), rgba(28, 18, 8, 0.08))';
      } else {
        spineShadow.style.left = '0';
        spineShadow.style.background = 'linear-gradient(to left, rgba(28, 18, 8, 0), rgba(28, 18, 8, 0.08))';
      }
      pageEl.appendChild(spineShadow);

      pageElements.push(pageEl);
    });

    const startPage = isSinglePage 
      ? Math.max(0, Math.min(initialPageIndex ?? (initialSpreadIndex * 2), pages.length - 1))
      : Math.max(0, Math.min(initialSpreadIndex * 2, pages.length - 1));

    // Instantialize PageFlip with optimal physical paper parameters
    const pageFlip = new PageFlip(hostEl, {
      width: 628,
      height: 860,
      size: 'stretch',
      minWidth: isSinglePage ? 240 : 80,
      maxWidth: 2000,
      minHeight: 110,
      maxHeight: 2500,
      maxShadowOpacity: 0.55,
      showCover: false,
      mobileScrollSupport: true,
      drawShadow: true,
      flippingTime: isSinglePage ? 850 : 1000,
      usePortrait: isSinglePage, // Portrait single-page mode on mobile!
      startPage,
      useMouseEvents: true, // Direct mouse & touch corner drag
      showPageCorners: true, // Interactive curl on hover over corners
      disableFlipByClick: false, // Click page to flip
      swipeDistance: 25,
      clickEventForward: true,
    });

    if (hostEl.style.minWidth) {
      hostEl.style.minWidth = '0px';
    }

    pageFlipInstanceRef.current = pageFlip;

    // Listen to page flip events
    pageFlip.on('flip', (e) => {
      if (isDestroyedRef.current) return;
      const pageIndex = e.data;
      currentPageRef.current = pageIndex;
      const newSpread = Math.floor(pageIndex / 2);
      currentSpreadRef.current = newSpread;

      if (soundEnabledRef.current) {
        audioEngine.playPaperLand();
      }

      if (isSinglePage) {
        if (onPageChangeRef.current) {
          onPageChangeRef.current(pageIndex);
        }
      } else {
        if (onSpreadChangeRef.current) {
          onSpreadChangeRef.current(newSpread);
        }
      }
    });

    // Listen to physical folding state changes
    pageFlip.on('changeState', (e) => {
      if (isDestroyedRef.current) return;
      const state = e.data;

      if (state === 'flipping' || state === 'user_fold') {
        if (soundEnabledRef.current) {
          audioEngine.playPageFlip(1.0);
        }
      }

      if (onStateChangeRef.current) {
        onStateChangeRef.current(state);
      }
    });

    // Load pages into DOM mode
    pageFlip.loadFromHTML(pageElements);

    // Mount authentic ring binder overlay for both 2-page spread and mobile single-page modes
    const targetMount = hostEl.querySelector<HTMLElement>('.stf__block') || hostEl;
    if (targetMount) {
      targetMount.style.overflow = 'visible';
      const wrapper = hostEl.querySelector<HTMLElement>('.stf__wrapper');
      if (wrapper) {
        wrapper.style.overflow = 'visible';
      }
      const ringsContainer = document.createElement('div');
      ringsContainer.className = 'book-rings-binder-overlay';
      ringsContainer.style.position = 'absolute';
      ringsContainer.style.pointerEvents = 'none';
      ringsContainer.style.userSelect = 'none';
      ringsContainer.style.zIndex = '2'; // Base overlay on top of static pages (z-1), but below flipping page (z-5+)

      if (!isSinglePage) {
        // Match exact 1920x1080 stage alignment relative to book spread (1256x860)
        ringsContainer.style.left = '-26.035%';
        ringsContainer.style.top = '-15.581%';
        ringsContainer.style.width = '152.866%';
        ringsContainer.style.height = '125.581%';
      } else {
        // Mobile single-page mode (right page 628x860): rings overlay reaches from spine over the binding edge
        ringsContainer.style.left = '-152.07%';
        ringsContainer.style.top = '-15.581%';
        ringsContainer.style.width = '305.73%';
        ringsContainer.style.height = '125.581%';
      }

      const ringsImg = document.createElement('img');
      ringsImg.src = '/book-rings-overlay.webp';
      ringsImg.alt = '';
      ringsImg.style.width = '100%';
      ringsImg.style.height = '100%';
      ringsImg.style.objectFit = 'fill';
      ringsImg.style.display = 'block';
      ringsImg.style.pointerEvents = 'none';
      ringsImg.style.userSelect = 'none';
      ringsImg.draggable = false;

      ringsContainer.appendChild(ringsImg);
      targetMount.appendChild(ringsContainer);
    }

    return () => {
      isDestroyedRef.current = true;
      pageFlipInstanceRef.current = null;
      try {
        pageFlip.destroy();
      } catch {
        // Safe disposal
      }
      if (hostEl.parentElement) {
        hostEl.remove();
      }
    };
  }, [pages, isSinglePage]);

  return (
    <div
      ref={containerRef}
      className={`page-flip-book-container relative w-full h-full overflow-visible ${className}`}
      style={style}
    />
  );
});

PageFlipBook.displayName = 'PageFlipBook';
