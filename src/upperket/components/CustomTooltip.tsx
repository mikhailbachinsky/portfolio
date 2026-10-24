import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

interface TooltipState {
  text: string;
  x: number;
  y: number;
  visible: boolean;
}

const TooltipContext = createContext<{
  showTooltip: (text: string, options?: { x?: number; y?: number }) => void;
  hideTooltip: () => void;
}>({
  showTooltip: () => {},
  hideTooltip: () => {},
});

export const useTooltip = () => useContext(TooltipContext);

export const CustomTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    text: '',
    x: -1000,
    y: -1000,
    visible: false,
  });

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDataRef = useRef<{ text: string; x: number; y: number } | null>(null);

  const showTooltip = (text: string, options?: { x?: number; y?: number }) => {
    if (!text) return;
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    setTooltip({
      text,
      x: options?.x ?? -1000,
      y: options?.y ?? -1000,
      visible: true,
    });
  };

  const hideTooltip = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    pendingDataRef.current = null;
    setTooltip(prev => ({ ...prev, visible: false }));
    activeElementRef.current = null;
  };

  useEffect(() => {
    // Intercept native title attributes on page load and DOM changes
    // to replace them with data-tooltip so native browser tooltips don't collide.
    const convertNativeTitles = (root: ParentNode = document) => {
      const elementsWithTitle = root.querySelectorAll('[title]:not([data-tooltip])');
      if (elementsWithTitle.length === 0) return;
      
      observer.disconnect();
      elementsWithTitle.forEach((el) => {
        const titleVal = el.getAttribute('title');
        if (titleVal && titleVal.trim()) {
          el.setAttribute('data-tooltip', titleVal);
          el.removeAttribute('title');
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['title'] });
    };

    const observer = new MutationObserver((mutationsList) => {
      let needsConversion = false;
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          needsConversion = true;
          break;
        }
        if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
          needsConversion = true;
          break;
        }
      }
      if (needsConversion) {
        convertNativeTitles();
      }
    });

    convertNativeTitles();

    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['title'] });

    // Global listener for hover on data-tooltip with intentional 400ms delay
    const handleMouseOver = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
        return;
      }

      const target = (e.target as HTMLElement)?.closest('[data-tooltip]') as HTMLElement | null;
      if (!target) {
        if (activeElementRef.current) {
          hideTooltip();
        }
        return;
      }

      if (activeElementRef.current === target) return;

      activeElementRef.current = target;
      const text = target.getAttribute('data-tooltip');

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }

      if (text && text.trim()) {
        pendingDataRef.current = { text: text.trim(), x: e.clientX, y: e.clientY };
        
        // 400ms hover delay so tooltips appear quickly and deliberately
        hoverTimerRef.current = setTimeout(() => {
          if (pendingDataRef.current && activeElementRef.current) {
            showTooltip(pendingDataRef.current.text, {
              x: pendingDataRef.current.x,
              y: pendingDataRef.current.y,
            });
          }
        }, 400);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeElementRef.current) return;
      if (pendingDataRef.current) {
        pendingDataRef.current.x = e.clientX;
        pendingDataRef.current.y = e.clientY;
      }
      setTooltip(prev => (prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev));
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (activeElementRef.current && (!related || !activeElementRef.current.contains(related))) {
        hideTooltip();
      }
    };

    const handleScroll = () => {
      if (activeElementRef.current) {
        hideTooltip();
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute smart coordinates so tooltip stays strictly inside viewport
  const getPositionStyles = () => {
    const padding = 12;
    const offset = 14;

    let posX = tooltip.x + offset;
    let posY = tooltip.y + offset;

    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (posX + rect.width > vw - padding) {
        posX = Math.max(padding, tooltip.x - rect.width - offset);
      }

      if (posY + rect.height > vh - padding) {
        posY = Math.max(padding, tooltip.y - rect.height - offset);
      }
    }

    return {
      left: `${posX}px`,
      top: `${posY}px`,
    };
  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}

      {/* Minimalist Single-Line Custom Tooltip Element */}
      {tooltip.visible && tooltip.text && !(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) && (
        <div
          ref={tooltipRef}
          style={getPositionStyles()}
          className="fixed z-[10000] pointer-events-none transition-opacity duration-150 ease-out animate-popover-in"
        >
          <div className="bg-[#1C1C1C] text-[#F9F7F2] border border-[#F9F7F2]/20 rounded-md px-2.5 py-1 text-xs font-sans font-normal shadow-md whitespace-nowrap leading-none select-none">
            {tooltip.text}
          </div>
        </div>
      )}
    </TooltipContext.Provider>
  );
};

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return React.cloneElement(children, {
    'data-tooltip': content,
  } as React.HTMLAttributes<HTMLElement>);
};
