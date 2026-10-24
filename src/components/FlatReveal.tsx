import React, { useEffect, useRef, useState } from 'react';

export interface FlatRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Edge or direction from which the element scales in: 'up'|'bottom', 'down'|'top', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'none' */
  direction?:
    | 'up'
    | 'bottom'
    | 'down'
    | 'top'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center'
    | 'none';
  /** Explicit transform-origin override (e.g. 'top left', 'bottom right') */
  origin?: string;
  style?: React.CSSProperties;
  /** Unused legacy properties for backwards compatibility */
  distance?: number;
  fromX?: number;
  fromY?: number;
}

/**
 * FlatReveal:
 * Мягкое, кинематическое раскрытие карточек и блоков при прокрутке.
 * Плавное масштабирование элементов из их фиксированных граней и углов (transform-origin).
 * - Безупречная шелковистая кривая затухания (cubic-bezier(0.22, 1, 0.36, 1)).
 * - Однократное срабатывание через IntersectionObserver.
 */
export const FlatReveal: React.FC<FlatRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 900,
  direction = 'up',
  origin,
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.willChange = 'opacity, transform';
          setIsVisible(true);
          observer.unobserve(el);

          setTimeout(() => {
            if (el) {
              el.style.willChange = 'auto';
            }
          }, delay + duration + 100);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration]);

  // Compute transform-origin and edge-scaling transform
  let computedOrigin = 'bottom center';
  let initialTransform = 'scale3d(0.52, 0.52, 1)';

  if (origin) {
    computedOrigin = origin;
  } else if (direction === 'up' || direction === 'bottom') {
    computedOrigin = 'bottom center';
    initialTransform = 'scale3d(0.68, 0.52, 1)';
  } else if (direction === 'down' || direction === 'top') {
    computedOrigin = 'top center';
    initialTransform = 'scale3d(0.68, 0.52, 1)';
  } else if (direction === 'left') {
    computedOrigin = 'left center';
    initialTransform = 'scale3d(0.52, 0.68, 1)';
  } else if (direction === 'right') {
    computedOrigin = 'right center';
    initialTransform = 'scale3d(0.52, 0.68, 1)';
  } else if (direction === 'top-left') {
    computedOrigin = 'top left';
    initialTransform = 'scale3d(0.52, 0.52, 1)';
  } else if (direction === 'top-right') {
    computedOrigin = 'top right';
    initialTransform = 'scale3d(0.52, 0.52, 1)';
  } else if (direction === 'bottom-left') {
    computedOrigin = 'bottom left';
    initialTransform = 'scale3d(0.52, 0.52, 1)';
  } else if (direction === 'bottom-right') {
    computedOrigin = 'bottom right';
    initialTransform = 'scale3d(0.52, 0.52, 1)';
  } else if (direction === 'center') {
    computedOrigin = 'center center';
    initialTransform = 'scale3d(0.55, 0.55, 1)';
  } else if (direction === 'none') {
    computedOrigin = 'center center';
    initialTransform = 'scale3d(1, 1, 1)';
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...style,
        transformOrigin: computedOrigin,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale3d(1, 1, 1)' : initialTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.18, 1.08, 0.3, 1)',
        willChange: 'auto',
      }}
    >
      {children}
    </div>
  );
};
