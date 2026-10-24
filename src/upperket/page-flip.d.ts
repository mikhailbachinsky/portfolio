declare module 'page-flip' {
  export interface PageFlipOptions {
    startPage?: number;
    size?: 'fixed' | 'stretch';
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export interface FlipEventData {
    data: number; // page index
    object: PageFlip;
  }

  export interface StateEventData {
    data: 'read' | 'user_fold' | 'fold_corner' | 'flipping';
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    destroy(): void;
    update(): void;
    loadFromImages(imagesHref: string[]): void;
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    updateFromImages(imagesHref: string[]): void;
    updateFromHtml(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    clear(): void;
    turnToPrevPage(): void;
    turnToNextPage(): void;
    turnToPage(page: number): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    flip(page: number, corner?: 'top' | 'bottom'): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getRender(): any;
    getFlipController(): any;
    on(event: 'flip', callback: (e: FlipEventData) => void): PageFlip;
    on(event: 'changeState', callback: (e: StateEventData) => void): PageFlip;
    on(event: 'changeOrientation', callback: (e: any) => void): PageFlip;
    on(event: 'init', callback: (e: any) => void): PageFlip;
    off(event: string): void;
  }
}
