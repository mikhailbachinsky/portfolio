import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 1800,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Parse the value into prefix, target number, and suffix
    // Matches e.g. "17 500+", "ЗА 4 ДНЯ", "~60%", "297", "40+", "0 ₽"
    const regex = /^(.*?)(\d+(?:[\s\u00A0]\d+)*)(.*)$/;
    const match = value.match(regex);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const rawNumberStr = match[2].replace(/[\s\u00A0]/g, '');
    const targetNumber = parseInt(rawNumberStr, 10);
    const suffix = match[3];

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let startTime: number | null = null;

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease-out cubic curve for smooth premium deceleration
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentNum = Math.round(easeProgress * targetNumber);

              // Format with non-breaking spaces for thousands
              const formattedNum = currentNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

              setDisplayValue(`${prefix}${formattedNum}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // Ensure exact final string match
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
