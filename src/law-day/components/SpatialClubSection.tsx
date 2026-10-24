import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SPATIAL_FEATURES } from '../data/caseData';
import { Scissors, Printer } from 'lucide-react';

export const SpatialClubSection: React.FC = () => {
  const [isTorn, setIsTorn] = useState(false);
  const [mainTicketSrc, setMainTicketSrc] = useState('/assets/ticket_main.webp?v=2');
  const [mainTicketLoaded, setMainTicketLoaded] = useState(false);
  const [stubTicketSrc, setStubTicketSrc] = useState('/assets/ticket_stub.webp');
  const [stubTicketLoaded, setStubTicketLoaded] = useState(false);

  const row1Features = [
    SPATIAL_FEATURES.find((f) => f.id === 'stage-screen'),
    SPATIAL_FEATURES.find((f) => f.id === 'photozone'),
    SPATIAL_FEATURES.find((f) => f.id === 'dresscode'),
  ].filter(Boolean) as typeof SPATIAL_FEATURES;

  const row2Features = [
    SPATIAL_FEATURES.find((f) => f.id === 'wristbands'),
    SPATIAL_FEATURES.find((f) => f.id === 'bar-menu'),
  ].filter(Boolean) as typeof SPATIAL_FEATURES;

  return (
    <section className="py-20 relative bg-transparent border-t border-white/10 overflow-hidden">
      {/* Background Frost Pattern */}
      <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-mono">
            Физическая среда
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            <span className="block">Осязаемый бренд:</span>
            <span className="block font-normal text-white/95">от&nbsp;ткани до&nbsp;билета</span>
          </h2>

          <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
            Айдентика не&nbsp;осталась на&nbsp;экранах смартфонов. Она воплотилась в&nbsp;струящейся двухцветной фотозоне, 
            строгом вечернем дресс-коде и&nbsp;бумажном VIP-билете с&nbsp;серебряным тиснением.
          </p>
        </div>

        {/* Unified Artifacts & Atmosphere Cards Stack (Identical Spacing Across All Cards) */}
        <div className="space-y-6">
          {/* 1. Flagship Full-Width Interactive Physical Ticket Artifact */}
          <div className="w-full">
            <div className="relative p-4 sm:p-7 md:p-10 frost-card-glass border border-silver/40 shadow-2xl silver-contour">
              {/* Control Bar: Title Left, specs center, button Far Right */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-silver/20 mb-5 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-white/70 font-mono font-medium">
                    Макет полиграфии
                  </span>
                  <span className="text-xs text-white/70 font-mono">
                    ◇ 210 × 100 мм
                  </span>
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-white/70 font-mono pl-3 border-l border-white/15">
                    <Printer className="w-3.5 h-3.5 text-white/70" />
                    <span>300 DPI ◇ Серебряное тиснение фольгой ◇ Лазерная перфорация</span>
                  </div>
                </div>

                {/* Button: Full width touch target on mobile */}
                <div className="w-full sm:w-auto">
                  <button
                    onClick={() => setIsTorn(!isTorn)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 text-xs uppercase tracking-wider transition-all duration-300 border silver-contour-subtle ${
                      isTorn
                        ? 'bg-white text-[#021817] border-silver font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'bg-white/[0.03] text-white border-silver/40 hover:border-silver'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{isTorn ? 'Соединить билет обратно' : 'Оторвать контрольный корешок'}</span>
                  </button>
                </div>
              </div>

              {/* The Ticket Itself - Full-size flagship artifact with tactile fidelity */}
              <div className="w-full max-w-5xl mx-auto">
                <div className="relative w-full aspect-[21/10] min-h-[140px] sm:min-h-[220px] md:min-h-[280px] select-none flex items-stretch">
                  
                  {/* LEFT MAIN TICKET PART (Approx 72% of width) */}
                  <motion.div 
                    animate={{
                      x: isTorn ? -8 : 0,
                      opacity: 1
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 180, 
                      damping: 18 
                    }}
                    className={`relative flex-[72] h-full flex flex-col justify-between p-3 sm:p-6 md:p-9 overflow-hidden shadow-2xl transition-all duration-300 ${
                      isTorn 
                        ? 'border border-silver/60 rounded-sm' 
                        : 'border-t border-b border-l border-silver/60 rounded-l-sm'
                    }`}
                    style={{
                      background: 'radial-gradient(ellipse at 85% 65%, #05504b 0%, #033633 45%, #021f1d 75%, #011312 100%)'
                    }}
                  >
                    {/* Real Photo 1 (Main Ticket) if uploaded */}
                    <img
                      src={mainTicketSrc}
                      alt="Билет День юриста 2024"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                      onLoad={() => setMainTicketLoaded(true)}
                      onError={(e) => {
                        if (!mainTicketSrc.startsWith('/assets/ticket_main.webp')) {
                          setMainTicketSrc('/assets/ticket_main.webp');
                        } else {
                          setMainTicketLoaded(false);
                          (e.target as HTMLElement).style.display = 'none';
                        }
                      }}
                    />

                    {/* Vector fallback layout rendered only when real photo is not yet uploaded */}
                    {!mainTicketLoaded && (
                      <>
                        {/* Subtle silk wave reflections matching the artwork */}
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                          style={{
                            background: 'radial-gradient(circle at 75% 50%, rgba(138,214,204,0.35) 0%, transparent 60%)'
                          }}
                        />
                        <div className="absolute inset-0 frost-ice-pattern opacity-10 pointer-events-none" />

                        {/* Top: Ticket Number and Event Subtitle */}
                        <div className="relative z-10">
                          <div className="font-serif-luxury text-sm sm:text-base lg:text-lg text-white/90 tracking-wide">
                            Билет №
                          </div>
                          <div className="text-xs sm:text-sm text-white/80 font-sans tracking-wide">
                            на вечеринку-сюрприз
                          </div>
                        </div>

                        {/* Middle: Title "День юриста 2024" with turquoise-chrome dual gradient and underline */}
                        <div className="relative z-10 my-auto py-2">
                          <h3 
                            className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-normal inline-block"
                            style={{
                              background: 'linear-gradient(180deg, #6ee7b7 0%, #38bdf8 30%, #ffffff 50%, #064e3b 85%, #022c22 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.85)) drop-shadow(0 0 12px rgba(16,185,129,0.3))'
                            }}
                          >
                            День юриста 2024
                          </h3>
                          
                          {/* Thin horizontal divider line under title */}
                          <div className="w-full max-w-md h-[1.5px] bg-gradient-to-r from-[#34d399] via-white/80 to-transparent my-2" />

                          <p className="text-xs sm:text-base text-white/90 font-sans font-light tracking-wide max-w-sm">
                            Отмечай профессиональный праздник правильно
                          </p>
                        </div>

                        {/* Bottom: Club Logo and Date/Venue in chrome finish */}
                        <div className="relative z-10 flex items-end gap-3 sm:gap-4">
                          {/* FACE Club Logo Icon */}
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[3.5px] sm:border-[4.5px] border-[#34d399] flex items-center justify-center relative">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#021817] border-2 border-[#34d399]" />
                            </div>
                            <span className="font-sans font-black text-[9px] sm:text-[11px] tracking-wider text-white mt-0.5">
                              FACE
                            </span>
                            <span className="text-[6px] sm:text-[7px] text-white/60 tracking-tighter -mt-0.5 font-mono">
                              CLUB • KARAOKE
                            </span>
                          </div>

                          {/* Date and Location Text */}
                          <div className="flex flex-col justify-end">
                            <div 
                              className="font-serif-luxury text-sm sm:text-xl lg:text-2xl font-bold tracking-tight"
                              style={{
                                background: 'linear-gradient(180deg, #a7f3d0 0%, #38bdf8 40%, #ffffff 60%, #047857 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
                              }}
                            >
                              5 декабря | 22:00
                            </div>
                            <div 
                              className="font-serif-luxury text-xs sm:text-base lg:text-lg font-semibold tracking-wide"
                              style={{
                                background: 'linear-gradient(180deg, #d1fae5 0%, #ffffff 50%, #065f46 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
                              }}
                            >
                              «FACE Club Томск»
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* PERFORATION LINE WITH REALISTIC NOTCHES (fades out cleanly when torn) */}
                  <div 
                    className={`relative w-0 flex flex-col items-center justify-between z-30 pointer-events-none transition-opacity duration-300 ${
                      isTorn ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#021817] -mt-2 -translate-x-1/2 border border-silver/50" />
                    <div className="h-full border-r-2 border-dashed border-silver/60" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#021817] -mb-2 -translate-x-1/2 border border-silver/50" />
                  </div>

                  {/* RIGHT TEAR-OFF STUB (Approx 28% of width, vertical orientation) */}
                  <motion.div
                    animate={{
                      x: isTorn ? 32 : 0,
                      y: isTorn ? 14 : 0,
                      rotate: isTorn ? 4.5 : 0,
                      boxShadow: isTorn 
                        ? '-16px 20px 35px rgba(0,0,0,0.85), 0 0 25px rgba(52,211,153,0.2)' 
                        : 'none'
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 170, 
                      damping: 16 
                    }}
                    className={`relative flex-[28] h-full flex flex-row items-center justify-between px-3 sm:px-5 py-4 sm:py-6 overflow-hidden origin-top-left shadow-2xl transition-all duration-300 ${
                      isTorn 
                        ? 'border border-silver/60 rounded-sm' 
                        : 'border-t border-b border-r border-silver/60 rounded-r-sm'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, #043d39 0%, #022624 60%, #011514 100%)'
                    }}
                  >
                    {/* Real Photo 2 (Stub) if uploaded */}
                    <img
                      src={stubTicketSrc}
                      alt="Контрольный корешок билета"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                      onLoad={() => setStubTicketLoaded(true)}
                      onError={(e) => {
                        if (stubTicketSrc !== '/assets/ticket_stub.webp') {
                          setStubTicketSrc('/assets/ticket_stub.webp');
                        } else {
                          setStubTicketLoaded(false);
                          (e.target as HTMLElement).style.display = 'none';
                        }
                      }}
                    />

                    {/* Vector fallback layout rendered only when real photo is not yet uploaded */}
                    {!stubTicketLoaded && (
                      <>
                        {/* Subtle texture on stub */}
                        <div className="absolute inset-0 frost-ice-pattern opacity-15 pointer-events-none" />

                        {/* Left inner column (VIP - rotated 90deg counter-clockwise) */}
                        <div className="relative z-10 flex items-center justify-center">
                          <div 
                            className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-black tracking-widest -rotate-90 select-none"
                            style={{
                              background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 70%, #475569 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,255,255,0.4))'
                            }}
                          >
                            VIP
                          </div>
                        </div>

                        {/* Center inner column (Table booking and personal guest name - rotated 90deg) */}
                        <div className="relative z-10 flex flex-col justify-center items-center -rotate-90 whitespace-nowrap text-right">
                          <div className="font-serif-luxury text-[11px] sm:text-sm lg:text-base text-white/90 tracking-wider">
                            Бронь стола №1
                          </div>
                          <div className="font-serif-luxury text-[10px] sm:text-xs lg:text-sm text-white/80 tracking-wide mt-0.5">
                            Михаила Михайловича Бачинского
                          </div>
                        </div>

                        {/* Right inner column (Билет №300 - rotated 90deg with bold white embossed typography) */}
                        <div className="relative z-10 flex items-center justify-center">
                          <div 
                            className="font-serif-luxury text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight -rotate-90 select-none whitespace-nowrap"
                            style={{
                              background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 45%, #cbd5e1 75%, #64748b 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                            }}
                          >
                            Билет №300
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>

                </div>
              </div>
            </div>
          </div>

          {/* Row 1: 3 Cards in a Row on Desktop (Stage Screen + Photozone + Dresscode) - 2 columns on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {row1Features.map((feature, fIdx) => (
              <div
                key={feature.id}
                className={`frost-card-glass border border-silver/40 hover:border-silver/80 transition-all duration-300 flex flex-col justify-between silver-contour group ${
                  fIdx === 2 ? 'col-span-2 w-full lg:col-span-1' : ''
                }`}
              >
                {/* Media Viewport Area (16:9 ratio) */}
                <div className="relative aspect-[16/9] w-full bg-[#021c1a] border-b border-silver/30 overflow-hidden flex items-center justify-center">
                  {feature.id === 'stage-screen' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={feature.image}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    >
                      <source src="/assets/spatial_screen.mp4" type="video/mp4" />
                      <source src="/assets/spatial_screen.webm" type="video/webm" />
                      {feature.image && (
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </video>
                  ) : feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                </div>

                {/* Text Info */}
                <div className="p-3 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a7f3d0]/90 mb-1">
                      {feature.role}
                    </div>

                    <h3 className="font-serif-luxury text-base sm:text-2xl text-white mb-1.5 sm:mb-2.5">
                      {feature.title}
                    </h3>

                    <p className="text-[11px] sm:text-sm text-white/70 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 2 Cards in a Row on Desktop (Wristbands & Bar Menu) - 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {row2Features.map((feature) => (
              <div
                key={feature.id}
                className="frost-card-glass border border-silver/40 hover:border-silver/80 transition-all duration-300 flex flex-col justify-between silver-contour group"
              >
                {/* Visual Viewport Area (16:9 ratio) */}
                <div className="relative aspect-[16/9] w-full bg-[#021c1a] border-b border-silver/30 overflow-hidden flex items-center justify-center">
                  {feature.image && (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>

                {/* Text Info */}
                <div className="p-3 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a7f3d0]/90 mb-1">
                      {feature.role}
                    </div>

                    <h3 className="font-serif-luxury text-base sm:text-2xl text-white mb-1.5 sm:mb-2.5">
                      {feature.title}
                    </h3>

                    <p className="text-[11px] sm:text-sm text-white/70 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



