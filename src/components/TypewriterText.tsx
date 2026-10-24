import React, { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per char
  delay?: number; // ms before start
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
  children?: (isComplete: boolean, typedText: string) => React.ReactNode;
}

/**
 * renderStableTypewriterSpan:
 * Отрендеривает видимую часть текста + нулевой по ширине мигающий курсор + невидимый (opacity-0) хвост.
 * Благодаря этому браузер сразу рассчитывает правильные переносы строк и неразрывные пробелы (\u00A0),
 * предотвращая висячие предлоги и исключая любые скачки вёрстки в процессе и в конце печати.
 */
export const renderStableTypewriterSpan = (
  text: string,
  typedLength: number,
  showCursor: boolean,
  cursorClassName: string = 'bg-[#181818]'
) => {
  const safeTyped = Math.max(0, Math.min(typedLength, text.length));
  const visible = text.slice(0, safeTyped);
  const invisible = text.slice(safeTyped);

  return (
    <>
      <span>{visible}</span>
      {showCursor && (
        <span
          className="relative inline-block w-0 select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className={`absolute left-0 bottom-0 w-[2.5px] h-[0.85em] animate-pulse ${cursorClassName}`}
          />
        </span>
      )}
      <span
        className="opacity-0 select-none pointer-events-none"
        aria-hidden="true"
      >
        {invisible}
      </span>
    </>
  );
};

/**
 * TypewriterText:
 * Эффект печатной машинки, активирующийся при попадании блока во вьюпорт.
 * После окончания печати вызывает onComplete и сохраняет выделения/разметку.
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 28,
  delay = 150,
  className = '',
  cursorClassName = 'bg-current',
  onComplete,
  children,
}) => {
  const [typedChars, setTypedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startTyping = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      const timeout = setTimeout(() => {
        let idx = 0;
        const interval = setInterval(() => {
          if (idx <= text.length) {
            setTypedChars(idx);
            idx++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            onComplete?.();
          }
        }, speed);
      }, delay);

      return () => clearTimeout(timeout);
    };

    // Check if in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startTyping();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, delay, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {children ? (
        children(isComplete, text.slice(0, typedChars))
      ) : (
        renderStableTypewriterSpan(text, typedChars, !isComplete, cursorClassName)
      )}
    </span>
  );
};
