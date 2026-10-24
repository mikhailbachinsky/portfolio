import React, { useEffect, useRef, useState } from 'react';

export type HighlightColor = 'peach' | 'green' | 'rose';
export type HighlightDirection = 'left-to-right' | 'right-to-left';

export type HighlightVariant =
  | 'auto'
  | 'overshoot'      // перескочило за край слова
  | 'shifted-down'   // съехало на полстроки (акцент на нижней части, верх букв открыт)
  | 'short-end'      // не дошло до конца слова
  | 'wobbly-tilted'  // небрежное, неровное с наклоном
  | 'casual-sweep'   // свободный размашистый мазок со скосом
  | 'shifted-up';    // съехало чуть вверх

export interface HighlighterMarkProps {
  children: React.ReactNode;
  color?: HighlightColor;
  direction?: HighlightDirection;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  active?: boolean;
  variant?: HighlightVariant;
  isDark?: boolean;
  textColor?: string;
  blendMode?: 'multiply' | 'normal' | 'screen';
}

const COLOR_MAP: Record<HighlightColor, string> = {
  peach: '#FFAD85',
  green: '#8FE06E',
  rose: '#F27A93',
};

interface VariantConfig {
  top: string;
  bottom: string;
  left: string;
  right: string;
  rotation: string;
  borderRadius: string;
  clipPath: string;
}

const VARIANTS: Record<Exclude<HighlightVariant, 'auto'>, VariantConfig> = {
  // 1. ПЕРЕСКОЧИЛО (вырывается за правый край слова, легкий небрежный скос)
  'overshoot': {
    top: '12%',
    bottom: '-8%',
    left: '-6px',
    right: '-16px', // заметно перескакивает за край
    rotation: 'rotate(-0.8deg) skewX(-1.5deg)',
    borderRadius: '3px 12px 4px 16px / 10px 4px 14px 3px',
    clipPath: 'polygon(0% 10%, 100% 2%, 97% 92%, 1% 98%)',
  },
  // 2. СЪЕХАЛО НА ПОЛСТРОКИ (акцент на нижней половине строки, верх букв открыт)
  'shifted-down': {
    top: '38%', // съехало на нижнюю половину
    bottom: '-16%',
    left: '-4px',
    right: '-6px',
    rotation: 'rotate(0.9deg)',
    borderRadius: '2px 16px 5px 10px / 6px 3px 12px 5px',
    clipPath: 'polygon(1% 8%, 99% 0%, 98% 95%, 0% 100%)',
  },
  // 3. НЕ ДОШЛО ДО КОНЦА (останавливается перед последними буквами/знаками)
  'short-end': {
    top: '16%',
    bottom: '-10%',
    left: '-6px',
    right: '12px', // не доходит до правого края на 12px
    rotation: 'rotate(-0.6deg)',
    borderRadius: '4px 8px 2px 14px / 12px 3px 9px 5px',
    clipPath: 'polygon(0% 6%, 98% 14%, 94% 96%, 2% 92%)',
  },
  // 4. НЕБРЕЖНОЕ, НЕПРЯМОЕ И НЕРОВНОЕ (органический наклон и волнистый край)
  'wobbly-tilted': {
    top: '8%',
    bottom: '-14%',
    left: '-10px',
    right: '-8px',
    rotation: 'rotate(-1.5deg) skewX(-2deg)',
    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
    clipPath: 'polygon(2% 8%, 98% 0%, 100% 88%, 0% 96%)',
  },
  // 5. СВОБОДНЫЙ ШИРОКИЙ МАЗОК (быстрое движение маркера со скошенным стартом)
  'casual-sweep': {
    top: '14%',
    bottom: '-8%',
    left: '-12px', // захватывает пространство перед словом
    right: '-10px',
    rotation: 'rotate(1.1deg) skewX(1.8deg)',
    borderRadius: '5px 18px 3px 14px / 14px 4px 16px 4px',
    clipPath: 'polygon(0% 0%, 100% 8%, 98% 100%, 2% 88%)',
  },
  // 6. СЪЕХАЛО ВВЕРХ (акцент на верхней половине строки)
  'shifted-up': {
    top: '-8%',
    bottom: '26%',
    left: '-6px',
    right: '-12px',
    rotation: 'rotate(-0.9deg)',
    borderRadius: '14px 4px 10px 5px / 4px 12px 4px 10px',
    clipPath: 'polygon(1% 4%, 99% 10%, 97% 94%, 0% 90%)',
  },
};

function getDeterministicVariant(children: React.ReactNode): Exclude<HighlightVariant, 'auto'> {
  let str = '';
  if (typeof children === 'string') {
    str = children;
  } else if (typeof children === 'number') {
    str = String(children);
  } else {
    str = 'default-highlight';
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  const keys: Exclude<HighlightVariant, 'auto'>[] = [
    'overshoot',
    'shifted-down',
    'short-end',
    'wobbly-tilted',
    'casual-sweep',
  ];
  return keys[Math.abs(hash) % keys.length];
}

/**
 * HighlighterMark:
 * Имитирует живой, небрежный и естественный штрих канцелярского маркера-выделителя:
 * - Не выглядит как строгий геометрический чип
 * - Разные органические вариации: перескок за край, съезд на полстроки, недоход до конца, неровный наклон
 * - Плавное выкатывание слева направо или справа налево
 */
export const HighlighterMark: React.FC<HighlighterMarkProps> = ({
  children,
  color = 'peach',
  direction = 'left-to-right',
  delay = 100,
  duration = 850,
  className = '',
  active,
  variant = 'auto',
  isDark = false,
  textColor,
  blendMode,
}) => {
  const [isActive, setIsActive] = useState(false);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (active !== undefined) {
      if (active) {
        const timer = setTimeout(() => setIsActive(true), delay);
        return () => clearTimeout(timer);
      } else {
        setIsActive(false);
      }
      return;
    }

    const el = markRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsActive(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsActive(true), delay);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, active]);

  const resolvedVariant = variant === 'auto' ? getDeterministicVariant(children) : variant;
  const config = VARIANTS[resolvedVariant] || VARIANTS['wobbly-tilted'];
  const origin = direction === 'left-to-right' ? 'left center' : 'right center';

  const markBlendMode = blendMode || (isDark ? 'normal' : 'multiply');
  const markOpacity = isDark ? 0.98 : 0.92;
  const currentTextColor = textColor || (isDark ? (isActive ? 'text-[#181818]' : 'text-white') : 'text-[#181818]');

  return (
    <span
      ref={markRef}
      className={`relative inline-block ${className}`}
      style={{
        padding: '0.04em 0.14em',
        verticalAlign: 'baseline',
      }}
    >
      {/* Живой штрих маркера с небрежной геометрией */}
      <span
        aria-hidden="true"
        className="absolute pointer-events-none transition-transform"
        style={{
          top: config.top,
          bottom: config.bottom,
          left: config.left,
          right: config.right,
          transform: `${config.rotation} scaleX(${isActive ? 1 : 0})`,
          transformOrigin: origin,
          backgroundColor: COLOR_MAP[color],
          borderRadius: config.borderRadius,
          clipPath: config.clipPath,
          opacity: markOpacity,
          mixBlendMode: markBlendMode,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {/* Текст */}
      <span className={`relative z-10 font-medium tracking-tight transition-colors duration-300 ${currentTextColor}`}>
        {children}
      </span>
    </span>
  );
};

