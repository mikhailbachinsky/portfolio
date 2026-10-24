import React from 'react';

interface EthnicPatternProps {
  type: 'horns' | 'cedar' | 'river' | 'footprint' | 'birch' | 'sun' | 'chum' | 'fish' | 'pine' | 'sable' | 'boat' | 'aurora';
  className?: string;
  color?: string;
}

export const EthnicPattern: React.FC<EthnicPatternProps> = ({
  type,
  className = "w-full h-full",
  color = "currentColor"
}) => {
  switch (type) {
    case 'river':
      // Волнообразные струи Кети
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M0 20 Q 20 5, 40 20 T 80 20 T 120 20 T 160 20" />
          <path d="M0 40 Q 20 25, 40 40 T 80 40 T 120 40 T 160 40" />
          <path d="M0 60 Q 20 45, 40 60 T 80 60 T 120 60 T 160 60" />
          <circle cx="40" cy="20" r="2.5" fill={color} />
          <circle cx="80" cy="40" r="2.5" fill={color} />
          <circle cx="120" cy="20" r="2.5" fill={color} />
        </svg>
      );

    case 'chum':
      // Геометрия чума и очага
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <polygon points="40,65 20,20 60,20" />
          <polygon points="80,65 60,20 100,20" />
          <polygon points="120,65 100,20 140,20" />
          <line x1="20" y1="20" x2="30" y2="10" />
          <line x1="60" y1="20" x2="50" y2="10" />
          <line x1="100" y1="20" x2="90" y2="10" />
          <line x1="140" y1="20" x2="130" y2="10" />
          <circle cx="40" cy="45" r="3" fill={color} />
          <circle cx="80" cy="45" r="3" fill={color} />
          <circle cx="120" cy="45" r="3" fill={color} />
        </svg>
      );

    case 'cedar':
      // Кедровая шишка (ромбы и чешуйки)
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M40 10 L60 30 L40 50 L20 30 Z" />
          <path d="M80 10 L100 30 L80 50 L60 30 Z" />
          <path d="M120 10 L140 30 L120 50 L100 30 Z" />
          <path d="M40 30 L60 50 L40 70 L20 50 Z" />
          <path d="M80 30 L100 50 L80 70 L60 50 Z" />
          <path d="M120 30 L140 50 L120 70 L100 50 Z" />
          <line x1="40" y1="10" x2="40" y2="70" strokeDasharray="2 3" />
          <line x1="80" y1="10" x2="80" y2="70" strokeDasharray="2 3" />
          <line x1="120" y1="10" x2="120" y2="70" strokeDasharray="2 3" />
        </svg>
      );

    case 'horns':
      // Оленьи рога (традиционный селькупский мотив)
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M20 55 C 25 35, 35 25, 45 25 C 55 25, 60 35, 60 55" />
          <path d="M60 55 C 65 35, 75 25, 85 25 C 95 25, 100 35, 100 55" />
          <path d="M100 55 C 105 35, 115 25, 125 25 C 135 25, 140 35, 140 55" />
          <path d="M35 32 Q 25 25, 20 18" />
          <path d="M55 32 Q 65 25, 70 18" />
          <path d="M75 32 Q 65 25, 60 18" />
          <path d="M95 32 Q 105 25, 110 18" />
          <path d="M115 32 Q 105 25, 100 18" />
          <path d="M135 32 Q 145 25, 150 18" />
        </svg>
      );

    case 'fish':
      // Рыбья чешуя и плавники
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M10 25 C 25 10, 45 10, 60 25 C 45 40, 25 40, 10 25 Z" />
          <path d="M50 25 C 65 10, 85 10, 100 25 C 85 40, 65 40, 50 25 Z" />
          <path d="M90 25 C 105 10, 125 10, 140 25 C 125 40, 105 40, 90 25 Z" />
          <path d="M30 50 C 45 35, 65 35, 80 50 C 65 65, 45 65, 30 50 Z" />
          <path d="M70 50 C 85 35, 105 35, 120 50 C 105 65, 85 65, 70 50 Z" />
        </svg>
      );

    case 'birch':
      // Берестяное тиснение (ромбическая сетка)
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M20 40 L40 20 L60 40 L40 60 Z" />
          <path d="M60 40 L80 20 L100 40 L80 60 Z" />
          <path d="M100 40 L120 20 L140 40 L120 60 Z" />
          <circle cx="40" cy="40" r="3" fill={color} />
          <circle cx="80" cy="40" r="3" fill={color} />
          <circle cx="120" cy="40" r="3" fill={color} />
          <line x1="0" y1="40" x2="160" y2="40" strokeDasharray="3 4" />
        </svg>
      );

    case 'footprint':
      // Лыжный след по снегу
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M10 25 L35 55 L60 25 L85 55 L110 25 L135 55 L160 25" />
          <path d="M10 35 L35 65 L60 35 L85 65 L110 35 L135 65 L160 35" strokeDasharray="2 2" />
          <circle cx="35" cy="55" r="2.5" fill={color} />
          <circle cx="85" cy="55" r="2.5" fill={color} />
          <circle cx="135" cy="55" r="2.5" fill={color} />
        </svg>
      );

    case 'aurora':
      // Небесный свод и сияние
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M20 60 C 40 20, 60 15, 80 40 C 100 65, 120 20, 140 30" />
          <path d="M20 70 C 40 30, 60 25, 80 50 C 100 75, 120 30, 140 40" strokeDasharray="4 3" />
          <circle cx="50" cy="22" r="3.5" fill={color} />
          <circle cx="110" cy="25" r="3" fill={color} />
          <circle cx="80" cy="65" r="2.5" fill={color} />
        </svg>
      );

    case 'sun':
      // Солнечная обережная розетка
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="40" cy="40" r="14" />
          <circle cx="40" cy="40" r="5" fill={color} />
          <circle cx="80" cy="40" r="14" />
          <circle cx="80" cy="40" r="5" fill={color} />
          <circle cx="120" cy="40" r="14" />
          <circle cx="120" cy="40" r="5" fill={color} />
          <line x1="40" y1="18" x2="40" y2="12" />
          <line x1="40" y1="62" x2="40" y2="68" />
          <line x1="80" y1="18" x2="80" y2="12" />
          <line x1="80" y1="62" x2="80" y2="68" />
          <line x1="120" y1="18" x2="120" y2="12" />
          <line x1="120" y1="62" x2="120" y2="68" />
        </svg>
      );

    case 'pine':
      // Хвойная ветвь и древесная вязь
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <line x1="10" y1="40" x2="150" y2="40" />
          <path d="M30 40 L20 25 M30 40 L20 55" />
          <path d="M50 40 L40 25 M50 40 L40 55" />
          <path d="M70 40 L60 25 M70 40 L60 55" />
          <path d="M90 40 L80 25 M90 40 L80 55" />
          <path d="M110 40 L100 25 M110 40 L100 55" />
          <path d="M130 40 L120 25 M130 40 L120 55" />
        </svg>
      );

    case 'boat':
      // Лодка-обласок и речная рябь
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M20 38 Q 40 54, 80 54 Q 120 54, 140 38 Z" />
          <line x1="20" y1="38" x2="140" y2="38" />
          <line x1="80" y1="20" x2="80" y2="46" />
          <path d="M70 28 L80 20 L90 28" />
          <path d="M10 65 Q 40 58, 80 65 T 150 65" strokeDasharray="3 3" />
        </svg>
      );

    case 'sable':
    default:
      // Круговой танец и таёжный след
      return (
        <svg viewBox="0 0 160 80" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <polygon points="40,20 55,40 40,60 25,40" />
          <polygon points="80,20 95,40 80,60 65,40" />
          <polygon points="120,20 135,40 120,60 105,40" />
          <circle cx="40" cy="40" r="4" fill={color} />
          <circle cx="80" cy="40" r="4" fill={color} />
          <circle cx="120" cy="40" r="4" fill={color} />
        </svg>
      );
  }
};

export const EndpaperRibbon: React.FC<{ className?: string; opacity?: string }> = ({
  className = "w-full h-8",
  opacity = "0.2"
}) => {
  return (
    <div className={`overflow-hidden flex items-center justify-center opacity-${opacity} ${className}`}>
      <div className="flex shrink-0 gap-6 select-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-20 h-6 shrink-0">
            <EthnicPattern type={i % 2 === 0 ? 'horns' : 'river'} color="currentColor" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Exact carved corner meander / spiral hook ornament from the real book cover
export const CornerEthnicMeander: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
}> = ({ position, className = "w-10 h-10", color = "currentColor" }) => {
  const transform = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  }[position];

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      style={{ transform, transformOrigin: 'center' }}
    >
      {/* Outer L bracket */}
      <path d="M 6 42 L 6 8 L 42 8" />
      {/* Inward spiral step 1 */}
      <path d="M 42 8 L 42 22 L 18 22" />
      {/* Inward spiral step 2 */}
      <path d="M 18 22 L 18 36 L 32 36 L 32 28" />
      {/* Center dot/tooth */}
      <rect x="23" y="27" width="3" height="3" fill={color} stroke="none" />
    </svg>
  );
};

// Stylized ethnic carved logo for mini-museum "ЗАТЁСКИ"
export const ZateskiMuseumLogo: React.FC<{ className?: string; color?: string }> = ({
  className = "h-7",
  color = "currentColor"
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Mini carved wooden wedge icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill={color}>
        <path d="M4 4 L14 3 L20 12 L14 21 L4 20 L7 12 Z" opacity="0.9" />
        <path d="M8 8 L13 7 L16 12 L13 17 L8 16 Z" fill="#F9F7F2" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="font-editorial text-base sm:text-lg tracking-tight font-normal" style={{ color }}>
          Затёски
        </span>
        <span className="text-[9px] font-sans tracking-normal opacity-70 text-[#1C1C1C]">
          Школьный краеведческий музей
        </span>
      </div>
    </div>
  );
};

// Clean micro-glyphs for chips
export const EthnicChipIcon: React.FC<{
  type: 'grant' | 'copies' | 'cycle' | 'region';
  className?: string;
  color?: string;
}> = ({ type, className = "w-3.5 h-3.5", color = "currentColor" }) => {
  switch (type) {
    case 'grant':
      // Пятиконечная звёздочка с ротацией и масштабом
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-transform duration-500 ease-out group-hover:rotate-180 group-hover:scale-125`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" className="group-hover:animate-trim-path" />
        </svg>
      );
    case 'copies':
      // Книга издания с динамическим увеличением и прорисовкой
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-transform duration-300 ease-out group-hover:scale-125`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" className="group-hover:animate-trim-path" />
          <path d="M6 6h10" className="group-hover:animate-trim-path" />
        </svg>
      );
    case 'cycle':
      // Проект полного цикла с поворотом
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-transform duration-500 ease-out group-hover:rotate-180 group-hover:scale-125`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" className="group-hover:animate-trim-path" />
          <path d="M21 3v5h-5" className="group-hover:animate-trim-path" />
        </svg>
      );
    case 'region':
    default:
      // Иконка локации
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-transform duration-300 ease-out group-hover:scale-125`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" className="group-hover:animate-trim-path" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
};

// 1. Геральдический щит с коронной звездой (Областной уровень — признание Томской области)
export const HorseShieldIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-4.5 h-4.5",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-horse-shield`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Чёткий геральдический щит грантового признания */}
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m12 7 1.2 2.4 2.8.4-2 2 .5 2.8L12 13.2 9.5 14.6l.5-2.8-2-2 2.8-.4z" />
  </svg>
);

export const HorseHeadIcon = HorseShieldIcon;

// 2. Медаль с лентами и таёжной елью (Районный уровень — признание Верхнекетского района)
export const GrouseMedalIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-4.5 h-4.5",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-grouse-medal`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Чёткая медаль на лентах со символом Верхнекетья */}
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14.5L6 22l6-3 6 3-2.5-7.5" />
    <path d="M12 5.5l-2.2 3h1.4l-1.8 3h5.2l-1.8-3h1.4z" />
  </svg>
);

export const GrouseIcon = GrouseMedalIcon;

// 3. Классический инструмент «Пипетка» (Печать в CMYK)
export const EyedropperIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-eyedropper-cmyk`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Чёткий стандартный корпус инструмента «Пипетка» */}
    <path d="m2 22 1-1h3l9-9" />
    <path d="M3 21v-3l9-9" />
    <path d="m15 6 3.5-3.5a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L18 9" />
    <path d="m12 9-3 3" />
    <path d="m15 6 3 3" />
  </svg>
);

// 4. Бархатистая текстура бумаги (Бархатистый офсет)
export const VelvetPaperIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-velvet-paper`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Текстурный пласт бархатистой матовой бумаги */}
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 8 C9 6.5, 11 9.5, 13 8 C15 6.5, 17 9.5, 19 8" />
    <path d="M5 12 C7 10.5, 9 13.5, 11 12 C13 10.5, 15 13.5, 17 12" />
    <path d="M7 16 C9 14.5, 11 17.5, 13 16 C15 14.5, 17 17.5, 19 16" strokeDasharray="2 2" />
  </svg>
);

// 5. Плотная берестяная кора (Плотная кора)
export const BarkTextureIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-bark-texture`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Многослойная структура с чечевичками бересты */}
    <path d="M4 5 C8 3, 16 3, 20 5 L20 19 C16 17, 8 17, 4 19 Z" />
    <path d="M7 9 H12" strokeWidth="2.5" />
    <path d="M15 11 H18" strokeWidth="2.5" />
    <path d="M6 14 H10" strokeWidth="2.5" />
    <path d="M13 15 H17" strokeWidth="2.5" />
  </svg>
);

// 6. Таёжный пирограф (Таёжный пирограф)
export const PyrographIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-pyrograph`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Перо выжигателя по дереву с накалённой петлёй */}
    <path d="M18 3 L21 6 L10 17 L7 14 Z" />
    <path d="M7 14 L4 17 C3.5 17.5, 3.5 18.5, 4 19 C4.5 19.5, 5.5 19.5, 6 19 L9 16" />
    <circle cx="3" cy="21" r="1" fill={color} />
    <path d="M2 18 L1 17 M6 22 L7 23" />
  </svg>
);

// 7. Разворот книги на 180° (Раскрытие на 180°)
export const FlatBookOpenIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => (
  <svg viewBox="0 0 24 24" className={`${className} icon-flat-book`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Абсолютно плоский разворот на 180 градусов */}
    <path d="M2 17 V6 C2 6, 7 5, 12 7 C17 5, 22 6, 22 6 V17 C22 17, 17 16, 12 18 C7 16, 2 17, 2 17 Z" />
    <line x1="12" y1="7" x2="12" y2="18" />
    <line x1="5" y1="10" x2="9" y2="10" />
    <line x1="15" y1="10" x2="19" y2="10" />
    <line x1="5" y1="13" x2="9" y2="13" />
    <line x1="15" y1="13" x2="19" y2="13" />
  </svg>
);

