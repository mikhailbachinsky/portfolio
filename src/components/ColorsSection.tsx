import React, { useState, useEffect, useRef } from 'react';
import { HighlighterMark } from './HighlighterMark';
import { renderStableTypewriterSpan } from './TypewriterText';

interface ColorCardData {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  description: string;
  textColor: string;
  bgColor: string;
  metricsTone: 'dark' | 'light';
  borderClass?: string;
  assetName: string;
}

const COLOR_CARDS: ColorCardData[] = [
  {
    id: 'peach',
    name: 'Мягкий персик',
    hex: '#FFAD85',
    rgb: '255 / 173 / 133',
    cmyk: '0 / 40 / 55 / 0',
    bgColor: '#FFAD85',
    textColor: 'text-[#181818]',
    metricsTone: 'dark',
    assetName: 'color-peach.png',
    description:
      'Выбранный основным цветом теплый оттенок в\u00A0духе Pantone 2024 транслирует эмпатию и\u00A0дружелюбие. Он\u00A0смягчает официальный фон, делая общение с\u00A0тьютором более личным и\u00A0доверительным.',
  },
  {
    id: 'apple',
    name: 'Экояблоко',
    hex: '#8FE06E',
    rgb: '143 / 224 / 110',
    cmyk: '45 / 0 / 80 / 0',
    bgColor: '#8FE06E',
    textColor: 'text-[#181818]',
    metricsTone: 'dark',
    assetName: 'color-green.png',
    description:
      'Тьюторская служба ТГУ тесно связана с\u00A0Институтом образования ТГУ, официальный цвет которого\u00A0— зеленый. Мы\u00A0освежили его, сделав более цифровым, как\u00A0символ роста и\u00A0преемственности.',
  },
  {
    id: 'rose',
    name: 'Электророза',
    hex: '#F27A93',
    rgb: '242 / 122 / 147',
    cmyk: '0 / 65 / 25 / 0',
    bgColor: '#F27A93',
    textColor: 'text-[#181818]',
    metricsTone: 'dark',
    assetName: 'color-rose.png',
    description:
      'Акцентный цвет-энергетик. Он\u00A0нужен, чтобы разбавить спокойную гамму и\u00A0выделить главное: призывы к\u00A0действию и\u00A0важные даты. Розовый добавляет айдентике динамики и\u00A0драйва.',
  },
  {
    id: 'graphite',
    name: 'Мягкий графит',
    hex: '#181818',
    rgb: '24 / 24 / 24',
    cmyk: '0 / 0 / 0 / 91',
    bgColor: '#181818',
    textColor: 'text-white',
    metricsTone: 'light',
    assetName: 'color-graphite.png',
    description:
      'Глубокий графитовый оттенок вместо глухого черного. Обеспечивает максимальную контрастность текста и\u00A0комфорт при\u00A0длительном чтении с\u00A0экрана, структурируя пространство документа.',
  },
  {
    id: 'paper',
    name: 'Цифровая бумага',
    hex: '#F1F1F1',
    rgb: '241 / 241 / 241',
    cmyk: '0 / 0 / 0 / 5',
    bgColor: '#F1F1F1',
    textColor: 'text-[#181818]',
    metricsTone: 'dark',
    assetName: 'color-paper.png',
    borderClass: 'border border-black/10',
    description:
      'Теплый нейтральный фон, имитирующий осязаемость качественной немелованной бумаги. Исключает резкий ослепляющий контраст чистого белого полотна, снижая нагрузку на\u00A0глаза.',
  },
];

interface CardMotionConfig {
  fromX: number;
  fromY: number;
  delay: number;
}

const CARD_MOTIONS: Record<string, CardMotionConfig> = {
  peach: { fromX: 0, fromY: 30, delay: 60 },
  apple: { fromX: 30, fromY: 0, delay: 120 },
  rose: { fromX: -30, fromY: 0, delay: 100 },
  graphite: { fromX: 0, fromY: 30, delay: 160 },
  paper: { fromX: 30, fromY: 0, delay: 220 },
};

export const ColorsSection: React.FC = () => {
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const textCardRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  const [isCardsInView, setIsCardsInView] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const part1 = 'Палитра построена на\u00A0принципе ';
  const part2 = 'мягкой силы.';
  const part3 = ' Мы\u00A0отказались от\u00A0жестких корпоративных цветов в\u00A0пользу оттенков, которые снижают когнитивную нагрузку и\u00A0формируют ощущение ';
  const part4 = 'безопасного пространства.';

  const len1 = part1.length;
  const len2 = part2.length;
  const len3 = part3.length;
  const len4 = part4.length;
  const totalLength = len1 + len2 + len3 + len4;

  useEffect(() => {
    const el = textCardRef.current;
    if (!el) return;

    const startTyping = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const timer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          if (count <= totalLength) {
            setTypedChars(count);
            count++;
          } else {
            clearInterval(interval);
            setIsTypingDone(true);
          }
        }, 16);
      }, 120);

      return () => clearTimeout(timer);
    };

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalLength]);

  // Observer для карточек цветов
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setIsCardsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardsInView(true);
          observer.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const renderColorCard = (card: ColorCardData) => {
    const isDark = card.metricsTone === 'light';
    const motion = CARD_MOTIONS[card.id] || { fromX: 0, fromY: 30, delay: 0 };

    const transformStyle = isCardsInView
      ? 'translate3d(0, 0, 0)'
      : `translate3d(${motion.fromX}px, ${motion.fromY}px, 0)`;

    return (
      <div
        key={card.id}
        className="h-full transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform: transformStyle,
          opacity: isCardsInView ? 1 : 0,
          transitionDelay: `${motion.delay}ms`,
        }}
      >
        <div
          style={{ backgroundColor: card.bgColor }}
          className={`rounded-[24px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between shadow-xs h-full ${
            card.borderClass || 'border border-black/5'
          }`}
        >
          {/* TOP SWATCH & FORMULA ZONE */}
          <div className="relative h-48 sm:h-56 lg:h-60 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden rounded-lg sm:rounded-[14px] m-2 sm:m-2.5">
            <img
              src={`/assets/${card.assetName}`}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-[14px] pointer-events-none"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <div className="absolute inset-0 bg-black/[0.04] pointer-events-none rounded-lg sm:rounded-[14px]" />

            <div
              aria-hidden="true"
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full pointer-events-none z-[5] backdrop-blur-md"
              style={{
                maskImage: 'radial-gradient(circle, black 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 75%)',
                background: `radial-gradient(circle, ${card.bgColor}99 0%, transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-1 sm:space-y-1.5">
              <div className={`text-[11px] sm:text-xs tracking-wider uppercase font-medium ${isDark ? 'text-white/70' : 'text-[#181818]/70'}`}>
                <span className="font-semibold">RGB:</span> {card.rgb}
              </div>

              <div className={`text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-center ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                {card.hex}
              </div>

              <div className={`text-[11px] sm:text-xs tracking-wider uppercase font-medium ${isDark ? 'text-white/70' : 'text-[#181818]/70'}`}>
                <span className="font-semibold">CMYK:</span> {card.cmyk}
              </div>
            </div>
          </div>

          {/* BOTTOM CONTENT ZONE */}
          <div className={`p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 ${card.textColor}`}>
            <div className="space-y-2.5">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
                {card.name}
              </h3>
              <p className="text-xs sm:text-sm lg:text-[15px] font-normal leading-[1.6]">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="colors-section" className="w-full overflow-hidden">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* CARDS GRID: 1-Й РЯД (ТЕКСТ СЛЕВА В ВЕРХНЕЙ ЛЕВОЙ ЧАСТИ + 2 ЦВЕТА) / 2-Й РЯД (3 ЦВЕТА) */}
        <div ref={cardsContainerRef} className="space-y-4 sm:space-y-5 lg:space-y-6 overflow-visible">
          
          {/* РЯД 1: 1-я треть (Текстовая карточка слева), 2-я треть (Персик), 3-я треть (Экояблоко) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            
            {/* 1. Верхний левый блок: Текстовый блок палитры (в бэнто-карточке, выровнен по левому нижнему краю) */}
            <div 
              ref={textCardRef}
              className="h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-xs p-6 sm:p-7 lg:p-8 flex flex-col justify-end items-start"
            >
              <span className="text-xs sm:text-sm text-[#737373] font-normal block mb-3 sm:mb-4 leading-none">
                (цвета)
              </span>

              <div className="text-base sm:text-lg lg:text-[20px] font-normal text-[#181818] leading-[1.45] tracking-tight relative grid grid-cols-1 grid-rows-1 max-w-lg">
                {/* Слой-распорка для стабилизации геометрии */}
                <div className="invisible pointer-events-none select-none col-start-1 row-start-1" aria-hidden="true">
                  <p>
                    {part1}
                    <HighlighterMark color="peach" active={false}>
                      {part2}
                    </HighlighterMark>
                    {part3}
                    <HighlighterMark color="green" active={false}>
                      {part4}
                    </HighlighterMark>
                  </p>
                </div>

                {/* Активный слой с непрерывной печатью */}
                <div className="col-start-1 row-start-1">
                  <p>
                    {renderStableTypewriterSpan(
                      part1,
                      typedChars,
                      !isTypingDone && typedChars <= len1
                    )}
                    <HighlighterMark
                      color="peach"
                      direction="left-to-right"
                      delay={100}
                      duration={900}
                      active={isTypingDone}
                    >
                      {renderStableTypewriterSpan(
                        part2,
                        Math.max(0, typedChars - len1),
                        !isTypingDone && typedChars > len1 && typedChars <= len1 + len2
                      )}
                    </HighlighterMark>
                    {renderStableTypewriterSpan(
                      part3,
                      Math.max(0, typedChars - len1 - len2),
                      !isTypingDone && typedChars > len1 + len2 && typedChars <= len1 + len2 + len3
                    )}
                    <HighlighterMark
                      color="green"
                      direction="right-to-left"
                      delay={250}
                      duration={900}
                      active={isTypingDone}
                    >
                      {renderStableTypewriterSpan(
                        part4,
                        Math.max(0, typedChars - len1 - len2 - len3),
                        !isTypingDone && typedChars > len1 + len2 + len3
                      )}
                    </HighlighterMark>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Вторая треть: Мягкий персик */}
            {renderColorCard(COLOR_CARDS[0])}

            {/* 3. Третья треть: Экояблоко */}
            {renderColorCard(COLOR_CARDS[1])}

          </div>

          {/* РЯД 2: 3 карточки цветов (Электророза, Мягкий графит, Цифровая бумага) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            {COLOR_CARDS.slice(2, 5).map((card) => renderColorCard(card))}
          </div>

        </div>

      </div>
    </section>
  );
};
