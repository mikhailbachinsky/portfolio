import React from 'react';
import { motion } from 'motion/react';
import { STRATEGIC_CHALLENGES } from '../data/caseData';

interface ContextShiftSectionProps {
  customIcons?: Record<string, string>;
}

export const ContextShiftSection: React.FC<ContextShiftSectionProps> = ({ customIcons }) => {
  // Render custom PNG 3D image if provided, or clean 3D-minimalistic faceted emerald rhombus
  const renderIcon = (id: string) => {
    if (customIcons && customIcons[id]) {
      return (
        <img
          src={customIcons[id]}
          alt=""
          className="w-5 h-5 object-contain shrink-0 drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      );
    }

    // 3D-minimalistic faceted emerald rhombus micro-badge
    return (
      <div className="relative w-4 h-4 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full drop-shadow-[0_1px_4px_rgba(16,185,129,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`emTopLeft-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id={`emTopRight-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id={`emBotLeft-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id={`emBotRight-${id}`} x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id={`emCenterTable-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Outer faceted rhombus border & back plane */}
          <path
            d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z"
            fill="#012420"
            stroke="rgba(52, 211, 153, 0.5)"
            strokeWidth="0.75"
          />

          {/* 4 3D Facets */}
          <path d="M12 2 L12 8 L8 12 L2 12 Z" fill={`url(#emTopLeft-${id})`} />
          <path d="M12 2 L22 12 L16 12 L12 8 Z" fill={`url(#emTopRight-${id})`} />
          <path d="M2 12 L8 12 L12 16 L12 22 Z" fill={`url(#emBotLeft-${id})`} />
          <path d="M16 12 L22 12 L12 22 L12 16 Z" fill={`url(#emBotRight-${id})`} />

          {/* Elevated central table facet */}
          <path
            d="M12 8 L16 12 L12 16 L8 12 Z"
            fill={`url(#emCenterTable-${id})`}
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="0.5"
          />

          {/* Subtle light glint on top vertex */}
          <circle cx="12" cy="3" r="0.7" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    );
  };

  return (
    <section className="py-14 sm:py-16 md:py-20 relative bg-transparent border-t border-white/10 overflow-hidden">
      {/* Ambient background aura behind the champagne glasses */}
      <div 
        className="hidden md:block absolute top-4 right-[5%] w-[560px] h-[560px] pointer-events-none opacity-25 z-0"
        style={{
          background: 'radial-gradient(circle at 60% 35%, rgba(220, 240, 255, 0.25) 0%, rgba(10, 50, 45, 0.1) 55%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Desktop Champagne Glasses Layer: Preserved on tablet and desktop */}
        <div className="hidden sm:block absolute -top-8 md:-top-10 lg:-top-14 -right-8 md:-right-24 lg:-right-10 xl:right-2 sm:w-[420px] md:w-[490px] lg:w-[560px] xl:w-[620px] pointer-events-none select-none z-0 sm:opacity-75 md:opacity-100">
          <motion.img
            animate={{
              y: [-4, 5, -4],
              rotate: [-0.5, 0.8, -0.5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="/assets/champagne_glasses.webp"
            alt="Chilled Champagne Toast Glasses"
            className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-6 sm:mb-10 relative z-10">
          {/* Left Text Column: Full width on mobile, constrained to left side on desktop */}
          <div className="md:col-span-6 lg:col-span-6 xl:col-span-6 w-full max-w-full sm:max-w-md md:max-w-[340px] lg:max-w-[430px] xl:max-w-lg relative z-10 drop-shadow-[0_2px_12px_rgba(1,20,19,0.9)]">
            <div className="text-xs uppercase tracking-widest text-silver-bright/80 mb-2 font-mono">
              Контекст и вызов
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3">
              Новый визуальный язык главного события ЮИ&nbsp;ТГУ
            </h2>

            <p className="text-xs sm:text-sm md:text-[13px] lg:text-[15px] text-white/80 font-light leading-relaxed">
              В&nbsp;2024&nbsp;году ко&nbsp;Дню юриста было приурочено событие Law Student Awards&nbsp;— 
              ключевая ежегодная премия Юридического института ТГУ, где&nbsp;проводится награждение 
              студентов и&nbsp;сотрудников факультета. Для&nbsp;этого сезона требовалось сформировать 
              самостоятельный визуальный фундамент:
            </p>
          </div>
        </div>

        {/* Mobile Champagne Glasses Layer: Positioned between text and cards, bottom half tucks behind the first card */}
        <div className="sm:hidden relative w-full flex justify-center -mb-24 z-0 pointer-events-none select-none">
          <motion.img
            animate={{
              y: [-3, 3, -3],
              rotate: [-0.5, 0.5, -0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="/assets/champagne_glasses.webp"
            alt="Chilled Champagne Toast Glasses"
            className="w-[285px] h-auto object-contain opacity-100 drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Challenges Grid: Cards have relative z-10 and frosted glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 relative z-10">
          {STRATEGIC_CHALLENGES.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 md:p-6 frost-card-glass border border-silver/30 hover:border-silver/60 transition-all flex flex-col justify-between group silver-contour shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Compact header: 1 single row with icon and subtitle */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  {renderIcon(item.id)}
                  <span className="text-[11px] uppercase tracking-wider text-silver-bright font-mono font-medium">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-lg sm:text-xl text-white mb-2 group-hover:text-silver-bright transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-white/70 font-light leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-silver/15 text-xs text-white/60">
                <span className="font-medium text-white/80">{item.principle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
