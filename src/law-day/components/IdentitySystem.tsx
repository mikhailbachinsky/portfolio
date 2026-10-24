import React from 'react';
import { motion } from 'motion/react';
import { COLOR_PALETTE, METAPHOR_PILLARS } from '../data/caseData';
import { Sparkles, ImageIcon } from 'lucide-react';

export const IdentitySystem: React.FC = () => {
  return (
    <section id="identity" className="py-20 relative border-t border-b border-white/10 bg-transparent overflow-hidden">
      {/* Subtle Frost overlay */}
      <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Editorial Minimalist & Context-grounded with 3D Visual Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-mono">
              Дизайн-система
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Синтез институциональных кодов и&nbsp;клубной среды
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
              Переосмысление университетской строгости через благородные материалы: серебро 925&nbsp;пробы, морозное декабрьское стекло, глубокий изумрудный шёлк и&nbsp;монументальную антикву.
            </p>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end relative">
            <div className="relative w-full h-[200px] sm:h-[260px] md:h-[280px] lg:h-[320px] max-w-[340px] sm:max-w-[480px] select-none pointer-events-none">
              {/* Soft emerald/mint atmospheric glow behind the gifts */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/20 rounded-full blur-[90px] pointer-events-none" />

              {/* Secondary Gift Box (Smaller, Background Right) */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotate: [12, 17, 12],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                className="absolute top-[4%] right-[0%] sm:right-[2%] z-10 w-[110px] sm:w-[145px] md:w-[175px]"
              >
                <img
                  src="/assets/image-72.webp"
                  alt="Secondary Gift Box"
                  className="w-full h-auto object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.7)] filter brightness-90 contrast-105"
                />
              </motion.div>

              {/* Main Primary Gift Box (Larger, Foreground Left, Tilted, Spread Out) */}
              <motion.div
                animate={{
                  y: [8, -8, 8],
                  rotate: [-16, -11, -16],
                }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-[2%] left-[0%] sm:left-[2%] z-20 w-[165px] sm:w-[220px] md:w-[260px]"
              >
                <img
                  src="/assets/image-72.webp"
                  alt="Main Gift Box"
                  className="w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] filter brightness-105"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 1. Color Palette Swatches - Strict Sharp Boxes with clear design roles */}
        <div className="mb-16">
          <div className="mb-6 border-b border-white/10 pb-3">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white">
              Благородная палитра серебра и&nbsp;изумруда
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLOR_PALETTE.map((color, idx) => (
               <div
                 key={idx}
                 className="bg-[#021817] border border-silver/30 silver-contour flex flex-col justify-between"
               >
                 {/* Color Block */}
                 <div
                   className="h-28 w-full p-3.5 flex flex-col justify-between relative overflow-hidden"
                   style={{ backgroundColor: color.hex }}
                 >
                   <div className="absolute inset-0 hoarfrost-lace opacity-25 pointer-events-none" />

                   <div className="flex justify-between items-center relative z-10">
                     <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/70 border border-white/20 text-white font-medium">
                       {color.hex}
                     </span>
                   </div>
                   <div
                     className="text-[10px] font-mono font-medium relative z-10 tracking-wider drop-shadow-sm flex flex-col gap-0.5"
                     style={{ color: color.textColor }}
                   >
                     <span>{color.rgb}</span>
                     <span className="opacity-80">{color.cmyk}</span>
                   </div>
                 </div>

                 {/* Info Block */}
                 <div className="p-4 frost-card-glass flex-1 flex flex-col justify-between">
                   <div>
                     <div className="text-sm font-semibold text-white mb-1">{color.name}</div>
                     <div className="text-[11px] text-silver-bright font-mono mb-2.5 pb-2 border-b border-silver/15 leading-snug">
                       {color.role}
                     </div>
                     <p className="text-[11px] text-white/65 leading-relaxed font-light">
                       {color.description}
                     </p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* 2. Typography Specimen - Clean Minimalist Cards */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Display Typography */}
          <div className="p-7 sm:p-8 frost-card-glass border border-silver/40 flex flex-col justify-between silver-contour">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-silver/20 mb-6">
                <span className="text-xs uppercase tracking-wider text-white/50">
                  Шрифт для&nbsp;заголовков
                </span>
                <span className="text-xs text-silver-bright font-medium font-mono">Yeseva One</span>
              </div>

              <div className="font-serif-luxury text-3xl sm:text-4xl text-white tracking-wide leading-tight mb-2">
                День юриста 2024
              </div>

              <div className="font-serif-luxury text-lg text-silver-bright/90 mb-5">
                «Только не&nbsp;проболтайся!»
              </div>

              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Выразительная акцидентная антиква с&nbsp;плавными контрастными наплывами и&nbsp;утончённым силуэтом. Придаёт клубному мероприятию благородное звучание высокой ювелирной пластики, сохраняя академический статус ЮИ&nbsp;ТГУ.
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-silver/20 space-y-3">
              <div className="space-y-1.5 break-words">
                <div className="font-serif-luxury text-[11px] sm:text-sm tracking-wider sm:tracking-widest text-silver-bright leading-relaxed">
                  А Б В Г Д Е Ж З И К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я
                </div>
                <div className="font-serif-luxury text-[11px] sm:text-xs tracking-wider sm:tracking-widest text-white/50 leading-relaxed">
                  а б в г д е ж з и к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я
                </div>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-silver/10 text-xs">
                <span className="font-mono tracking-widest text-silver-bright font-medium">
                  0 1 2 3 4 5 6 7 8 9
                </span>
                <span className="font-mono tracking-widest text-white/40 text-[11px]">
                  № « » % & § @
                </span>
              </div>
            </div>
          </div>

          {/* Body & UI Typography */}
          <div className="p-5 sm:p-8 frost-card-glass border border-silver/40 flex flex-col justify-between silver-contour">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-silver/20 mb-6">
                <span className="text-xs uppercase tracking-wider text-white/50">
                  Основной текст
                </span>
                <span className="text-xs text-silver-bright font-medium font-mono">Inter</span>
              </div>

              <div className="font-sans-clean text-2xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-2">
                Закрытая вечеринка ЮИ&nbsp;ТГУ
              </div>

              <div className="font-sans-clean text-base sm:text-lg text-white/80 font-medium mb-5">
                Наборные блоки, тайминги и&nbsp;регламент
              </div>

              <p className="font-sans-clean text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                Чистый неогротеск с&nbsp;открытыми апертурами и&nbsp;нейтральным характером. Обеспечивает безупречную читаемость ценников, таймингов, спонсорских сносок и&nbsp;контента постов на&nbsp;любых типах экранов и&nbsp;в&nbsp;клубной полутьме.
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-silver/20 space-y-3">
              <div className="space-y-1.5 break-words">
                <div className="font-sans-clean text-[11px] sm:text-sm tracking-wider sm:tracking-widest text-silver-bright font-medium leading-relaxed">
                  А Б В Г Д Е Ж З И К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я
                </div>
                <div className="font-sans-clean text-[11px] sm:text-xs tracking-wider sm:tracking-widest text-white/50 leading-relaxed">
                  а б в г д е ж з и к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я
                </div>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-silver/10 text-xs">
                <span className="font-mono tracking-widest text-silver-bright font-medium">
                  0 1 2 3 4 5 6 7 8 9
                </span>
                <span className="font-mono tracking-widest text-white/40 text-[11px]">
                  № « » % & § @
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Symbolic Elements & Motifs Breakdown: 2 Cards in 2 Rows (Zero Crop) */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white mb-6 border-b border-white/10 pb-3">
            Визуальные метафоры мероприятия
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {METAPHOR_PILLARS.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 lg:p-5 frost-card-glass border border-silver/30 hover:border-silver/60 transition-all duration-300 silver-contour flex flex-col group shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              >
                {/* Top Meta Bar */}
                <div className="mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-mono flex items-center justify-between">
                  <span className="text-[#d5e6e6] font-medium uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-white/40 text-[9.5px] sm:text-[10px] font-mono">
                    800 × 600 PX
                  </span>
                </div>

                {/* Image Container / Exact 4:3 Aspect Ratio (Zero Crop, 100% visible) */}
                <div className="w-full aspect-[4/3] mb-3 sm:mb-3.5 border border-silver/20 bg-black/50 overflow-hidden relative flex items-center justify-center group-hover:border-silver/40 transition-colors silver-contour-subtle">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1 sm:p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 text-center relative overflow-hidden bg-gradient-to-b from-[#021f1d]/40 to-[#011413]/60">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border border-silver/30 bg-white/5 flex items-center justify-center text-silver-bright mb-1.5 silver-contour-subtle group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-silver-bright" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase tracking-wider">
                        Слот для визуала
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Description Grouped directly together with uniform tight spacing */}
                <div>
                  <h4 className="text-sm sm:text-base uppercase tracking-wider font-semibold text-white mb-1.5 sm:mb-2 leading-snug group-hover:text-silver-bright transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
