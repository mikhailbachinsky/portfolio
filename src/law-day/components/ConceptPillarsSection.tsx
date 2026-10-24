import React from 'react';
import { CONCEPT_PILLARS } from '../data/caseData';
import { formatTypography } from '../utils/typography';

interface ConceptPillarsSectionProps {
  customIcons?: Record<string, string>;
}

export const ConceptPillarsSection: React.FC<ConceptPillarsSectionProps> = ({ customIcons }) => {
  // Render custom PNG 3D image if provided, or clean 3D-minimalistic custom SVG icon
  const renderPillarIcon = (id: string) => {
    if (customIcons && customIcons[id]) {
      return (
        <img
          src={customIcons[id]}
          alt=""
          className="w-6 h-6 object-contain shrink-0 drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      );
    }

    switch (id) {
      case 'emerald-city':
        // Minimalist 3D architectural building in emerald color
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 drop-shadow-[0_2px_8px_rgba(16,185,129,0.45)]" fill="none">
            <defs>
              <linearGradient id="emRoof" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="emFacadeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="emFacadeRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>
            {/* Ground base */}
            <path d="M12 21.5 L21 16.5 L12 11.5 L3 16.5 Z" fill="#011e17" />
            {/* Left Facade of Building */}
            <path d="M5 15.5 L12 19.5 L12 9.5 L5 5.5 Z" fill="url(#emFacadeLeft)" />
            {/* Right Facade of Building */}
            <path d="M12 19.5 L19 15.5 L19 5.5 L12 9.5 Z" fill="url(#emFacadeRight)" />
            {/* Isometric Emerald Gable Roof / Spire */}
            <path d="M5 5.5 L12 2 L19 5.5 L12 9.5 Z" fill="url(#emRoof)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.4" />
            {/* Stylized Architectural Portico / Arch Windows on Left Face */}
            <path d="M7 13.5 L7 10 L9.5 11.5 L9.5 15 Z" fill="#012b23" />
            {/* Stylized Architectural Portico / Arch Windows on Right Face */}
            <path d="M14.5 15 L14.5 11.5 L17 10 L17 13.5 Z" fill="#02211b" />
            {/* Center Vertex Highlight */}
            <line x1="12" y1="2" x2="12" y2="19.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          </svg>
        );

      case 'silver-hallmark':
        // Minimalist 3D Round Silver Medallion with Emerald in Center
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" fill="none">
            <defs>
              <linearGradient id="medallionRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="medallionInner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="centerEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            {/* 3D Outer Medallion Shadow / Extrusion */}
            <circle cx="12" cy="13" r="9" fill="#0a1918" />
            {/* 3D Polished Silver Outer Rim */}
            <circle cx="12" cy="12" r="9" fill="url(#medallionRim)" stroke="rgba(255,255,255,0.9)" strokeWidth="0.5" />
            {/* Inner Silver Bezel Recess */}
            <circle cx="12" cy="12" r="6.8" fill="url(#medallionInner)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
            {/* Center Octagonal/Rhombus Emerald Gem */}
            <polygon points="12,7.5 15.5,12 12,16.5 8.5,12" fill="url(#centerEmerald)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
            {/* Center Emerald Facet Glint */}
            <polygon points="12,7.5 15.5,12 12,12" fill="#a7f3d0" fillOpacity="0.6" />
            {/* Medallion Top Sparkle */}
            <circle cx="7" cy="7" r="0.8" fill="#ffffff" />
          </svg>
        );

      case 'siberian-frost':
        // 3D Siberian Snowflake / Frost Crystal
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 drop-shadow-[0_2px_6px_rgba(56,189,248,0.45)]" fill="none">
            <defs>
              <linearGradient id="snowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            {/* Center Crystal Hexagon */}
            <polygon points="12,8 15.5,10 15.5,14 12,16 8.5,14 8.5,10" fill="#0369a1" stroke="url(#snowGlow)" strokeWidth="0.8" />
            {/* 6 Primary 3D Beveled Rays */}
            <path d="M12 2 L12 22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" stroke="url(#snowGlow)" strokeWidth="1.3" strokeLinecap="round" />
            {/* Outer Ray Chevrons (Top & Bottom) */}
            <path d="M9.5 4.5 L12 6.5 L14.5 4.5 M9.5 19.5 L12 17.5 L14.5 19.5" stroke="#e0f2fe" strokeWidth="0.9" strokeLinecap="round" />
            {/* Outer Ray Chevrons (Top-Right & Bottom-Left) */}
            <path d="M18.5 6 L17.2 8.8 L19.8 10 M5.5 18 L6.8 15.2 L4.2 14" stroke="#bae6fd" strokeWidth="0.9" strokeLinecap="round" />
            {/* Outer Ray Chevrons (Top-Left & Bottom-Right) */}
            <path d="M4.2 10 L6.8 8.8 L5.5 6 M19.8 14 L17.2 15.2 L18.5 18" stroke="#bae6fd" strokeWidth="0.9" strokeLinecap="round" />
            {/* Center Frost Core */}
            <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
          </svg>
        );

      case 'mystery-secret':
      default:
        // Minimalist 3D Silver Metallic Question Mark
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" fill="none">
            <defs>
              <linearGradient id="qSilverFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="qSilverSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* 3D Extrusion Side/Shadow of Question Mark */}
            <path
              d="M10.8 4.8 C10.8 3.5 11.8 2.5 13.5 2.5 C15.5 2.5 17.5 3.8 17.5 6.2 C17.5 7.8 16.5 9 15.2 10.2 L14 11.2 C13.5 11.7 13.2 12.4 13.2 13.2 L13.2 14.5 L10.8 14.5 L10.8 13 C10.8 11.8 11.5 10.8 12.4 10 L13.8 8.8 C14.5 8.2 15 7.4 15 6.4 C15 5.2 14.2 4.5 13.2 4.5 C12.2 4.5 11.5 5.2 11.5 6.2 Z"
              fill="url(#qSilverSide)"
              transform="translate(1, 1)"
            />
            <circle cx="13.2" cy="19.2" r="1.5" fill="url(#qSilverSide)" transform="translate(1, 1)" />

            {/* 3D Front Face */}
            <path
              d="M10.2 4.5 C10.2 3 11.4 2 13 2 C15 2 16.8 3.4 16.8 5.6 C16.8 7.2 15.8 8.3 14.6 9.4 L13.3 10.5 C12.8 10.9 12.5 11.6 12.5 12.3 L12.5 13.5 L10.2 13.5 L10.2 12 C10.2 10.9 10.8 10 11.7 9.2 L13 8.1 C13.7 7.5 14.2 6.8 14.2 5.8 C14.2 4.7 13.5 4 12.6 4 C11.7 4 11.1 4.6 11 5.5 L8.8 5.5 C8.9 3.5 10.2 2 13 2"
              fill="url(#qSilverFront)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.4"
            />
            {/* Question Mark Dot */}
            <circle cx="12" cy="18" r="1.5" fill="url(#qSilverFront)" stroke="rgba(255,255,255,0.9)" strokeWidth="0.4" />
            {/* Top Shine */}
            <circle cx="14" cy="3.5" r="0.6" fill="#ffffff" />
          </svg>
        );
    }
  };

  // Thematic background textures & styling for each concept pillar with frozen glass overlay
  const renderPillarBackground = (id: string) => {
    switch (id) {
      case 'emerald-city':
        return (
          <>
            {/* Real Emerald Liquid / Gem Swirl Texture Layer - Soft & Subtle */}
            <img
              src="/assets/texture-emerald.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center opacity-20 group-hover:opacity-30 transition-all duration-700 pointer-events-none scale-100 group-hover:scale-105"
            />
            {/* Emerald color boost & text-readability gradient shield */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#011a13]/70 via-[#01140e]/50 to-[#000d09]/90 pointer-events-none" />
            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply pointer-events-none" />
            {/* Vibrant Emerald edge glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          </>
        );

      case 'silver-hallmark':
        return (
          <>
            {/* Real Brushed Silver 925 Texture Layer - Soft & Subtle */}
            <img
              src="/assets/texture-silver.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center opacity-18 group-hover:opacity-28 transition-all duration-700 pointer-events-none scale-100 group-hover:scale-105"
            />
            {/* Cold metallic contrast shield */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/70 via-[#0f172a]/55 to-[#030712]/90 pointer-events-none" />
            {/* Bright specular sheen on top edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
          </>
        );

      case 'siberian-frost':
        return (
          <>
            {/* Real Winter Frost & Ice Crystal Texture Layer - Soft & Subtle */}
            <img
              src="/assets/texture-frost.avif"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center opacity-18 group-hover:opacity-28 transition-all duration-700 pointer-events-none scale-100 group-hover:scale-105"
            />
            {/* Emerald-tinted icy dark contrast shield */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#03201d]/70 via-[#021815]/50 to-[#000e0b]/90 pointer-events-none" />
            {/* Frosty cyan edge glint */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          </>
        );

      case 'mystery-secret':
      default:
        return (
          <>
            {/* Spotlight center glow surrounded by deep noir void */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 30%, rgba(71, 85, 105, 0.25) 0%, rgba(30, 41, 59, 0.4) 35%, rgba(15, 23, 42, 0.75) 65%, #010408 100%)',
              }}
            />
            {/* Subtle mysterious edge vignette shadow */}
            <div
              className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.85)] transition-shadow duration-500 group-hover:shadow-[inset_0_0_35px_rgba(0,0,0,0.7)]"
            />
            {/* Confidential crosshairs */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 200 280"
              fill="none"
            >
              <circle cx="100" cy="140" r="32" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
              <line x1="100" y1="100" x2="100" y2="180" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
              <line x1="60" y1="140" x2="140" y2="140" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
            </svg>
          </>
        );
    }
  };

  // Card theme wrapper classes based on pillar ID
  const getPillarCardClasses = (id: string) => {
    switch (id) {
      case 'emerald-city':
        return {
          cardBg: 'bg-[#01140e]/60 backdrop-blur-md',
          tagText: 'text-emerald-300 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
          divider: 'border-emerald-500/20',
          detailText: 'text-emerald-100 font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
        };
      case 'silver-hallmark':
        return {
          cardBg: 'bg-[#0f172a]/60 backdrop-blur-md',
          tagText: 'text-slate-200 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
          divider: 'border-slate-300/20',
          detailText: 'text-slate-100 font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
        };
      case 'siberian-frost':
        return {
          cardBg: 'bg-[#061724]/60 backdrop-blur-md',
          tagText: 'text-cyan-300 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
          divider: 'border-cyan-400/20',
          detailText: 'text-cyan-100 font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
        };
      case 'mystery-secret':
      default:
        return {
          cardBg: 'bg-[#05080e]/65 backdrop-blur-md',
          tagText: 'text-white/90 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
          divider: 'border-white/10',
          detailText: 'text-white/95 font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
        };
    }
  };

  return (
    <section id="concept" className="py-14 sm:py-16 relative bg-[#011412]/60 backdrop-blur-[28px] border-t border-b border-white/15 overflow-hidden">
      {/* Subtle ambient frost pattern with glass blur */}
      <div className="absolute inset-0 pointer-events-none frost-ice-pattern opacity-25" />

      {/* Luminous frosted atmospheric blur glows behind the section */}
      <div 
        className="absolute top-1/4 -left-20 w-[580px] h-[580px] pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.35) 0%, rgba(4, 120, 87, 0.16) 45%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />
      <div 
        className="absolute bottom-10 right-0 w-[620px] h-[620px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(56, 189, 248, 0.3) 0%, rgba(3, 105, 161, 0.14) 50%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Background Siberian Frost Texture Layer with deep backdrop blur */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] bg-center bg-cover mix-blend-screen"
        style={{ backgroundImage: "url('/assets/texture-frost.avif')" }}
      />
      {/* Soft translucent gradient aura to maintain readability and frosted depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#011210]/60 via-[#010e0d]/40 to-[#010e0d]/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Description aligned to the top boundary of the heading */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-silver-bright font-mono mb-2">
              Смысловой фундамент айдентики
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              <span>Синтез четырёх начал:</span>
              <span className="block font-normal text-white">изумруд, серебро, мороз и&nbsp;тайна</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-white/70 font-light leading-relaxed lg:pt-6">
            {formatTypography('Каждое визуальное решение опирается на ключевые метафоры события, превращая отсылки к месту, материалам, атмосфере и интриге в целостный язык клубной айдентики.')}
          </p>
        </div>

        {/* 4 CARDS IN A SINGLE ROW ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4.5 relative z-10">
          {CONCEPT_PILLARS.map((pillar) => {
            const styles = getPillarCardClasses(pillar.id);
            return (
              <div
                key={pillar.id}
                className="p-4.5 sm:p-5 lg:p-5 frost-card-glass backdrop-blur-md border border-silver/40 hover:border-silver transition-all duration-300 flex flex-col justify-between group relative silver-contour shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              >
                {/* Background Texture Container with Individual Texture Layer */}
                <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${styles.cardBg}`}>
                  {renderPillarBackground(pillar.id)}
                </div>

                <div className="relative z-10">
                  {/* Top Header: Left-aligned Icon + Clean Eyebrow Tag */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {renderPillarIcon(pillar.id)}
                    </div>

                    <span className={`text-[11px] uppercase font-mono tracking-wider whitespace-nowrap ${styles.tagText}`}>
                      {formatTypography(pillar.tag)}
                    </span>
                  </div>

                  {/* Card Title - Scaled harmoniously matching ContextShiftSection */}
                  <h3 className="font-serif-luxury text-lg sm:text-xl text-white group-hover:text-silver-bright transition-colors leading-snug mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {formatTypography(pillar.title)}
                  </h3>

                  {/* Meaning Body - Scaled harmoniously matching ContextShiftSection */}
                  <p className="text-xs sm:text-[13px] text-white/80 font-light leading-relaxed mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {formatTypography(pillar.meaning)}
                  </p>
                </div>

                {/* Bottom Implementation Note */}
                <div className={`pt-3 border-t text-xs mt-auto relative z-10 ${styles.divider}`}>
                  <p className={`text-xs text-white/70 leading-relaxed ${styles.detailText}`}>
                    {formatTypography(pillar.detail)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
