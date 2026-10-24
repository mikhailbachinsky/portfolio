import React from 'react';
import { 
  Sparkles, 
  Tag, 
  Layers
} from 'lucide-react';
import { FlatReveal } from './FlatReveal';
import { useParticleBurst, ParticleBurstRenderer } from './ParticleBurst';

interface PhysicalEnvironmentSectionProps {
  hoodieImage?: string;
  badgeImage?: string;
  mugImage?: string;
  tshirtImage?: string;
  socksImage?: string;
  pinsImage?: string;
  sweatshirtImage?: string;
  poloImage?: string;
  shopperImage?: string;
  diplomaImage?: string;
  rollupImage?: string;
}

export const PhysicalEnvironmentSection: React.FC<PhysicalEnvironmentSectionProps> = ({
  hoodieImage,
  badgeImage,
  mugImage,
  tshirtImage,
  socksImage,
  pinsImage,
  sweatshirtImage,
  poloImage,
  shopperImage,
  diplomaImage,
  rollupImage,
}) => {
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});
  const [failedKeys, setFailedKeys] = React.useState<Record<string, number>>({});

  // Interactive Particle Burst & tactile squish for merch cards
  const { particles: merchParticles, shockwaves: merchShockwaves, triggerBurst: triggerMerchBurst } = useParticleBurst('merch');
  const [activePoppedKey, setActivePoppedKey] = React.useState<string | null>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>, key: string) => {
    setActivePoppedKey(key);
    triggerMerchBurst(e, key);
    setTimeout(() => {
      setActivePoppedKey((prev) => (prev === key ? null : prev));
    }, 450);
  };

  const MERCH_PRIMARY_MAP: Record<string, string> = {
    hoodie: 'merch-hoodie-2',
    badge: 'merch-badge-2',
    mug: 'merch-mug-2',
    tshirt: 'merch-tshirt-1',
    socks: 'merch-socks-1',
    pins: 'merch-pins-2',
    sweatshirt: 'merch-sweatshirt-1',
    polo: 'merch-polo-3',
    shopper: 'merch-shopper-3',
    diploma: 'merch-diploma-2',
    rollup: 'merch-rollup-3',
  };

  const getImageSrc = (key: string, customProp?: string) => {
    if (customProp) return customProp;
    const baseName = MERCH_PRIMARY_MAP[key] || `merch-${key}-1`;
    const attempt = failedKeys[key] || 0;
    const sources = [
      `/assets/${baseName}.webp`,
      `/${baseName}.webp`,
      `/assets/${baseName}.png`,
      `/${baseName}.png`,
      `/assets/merch-${key}.webp`,
      `/merch-${key}.webp`,
      `/assets/merch-${key}.png`,
      `/merch-${key}.png`,
    ];
    return sources[attempt] || sources[sources.length - 1];
  };

  const handleImgError = (key: string, customProp?: string) => {
    if (customProp) {
      setImgErrors((prev) => ({ ...prev, [key]: true }));
      return;
    }
    const currentAttempt = failedKeys[key] || 0;
    if (currentAttempt < 7) {
      setFailedKeys((prev) => ({ ...prev, [key]: currentAttempt + 1 }));
    } else {
      setImgErrors((prev) => ({ ...prev, [key]: true }));
    }
  };
  return (
    <section id="physical-environment-section" className="w-full">
      {/* 
        WINDOW CONTAINER:
        Строго по единой сетке страницы:
        px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16
      */}
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow маркер строго на единой левой силовой линии */}
        <div className="w-full pl-1 sm:pl-3 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block">
            (физическая среда)
          </span>
        </div>

        {/* 
          БЕНТО-СЕТКА МЕРЧА ПО СМЫСЛОВЫМ КАТЕГОРИЯМ:
          1. Одежда и текстиль (Худи, Свитшот, Футболка, Поло, Носки)
          2. Аксессуары и мерч (Шопер, Кружка, Бейдж, Значки)
          3. Пространство и полиграфия (Шаблон диплома, Роллап)
          12-колоночная система со скруглением суперэллипса rounded-[24px] sm:rounded-[32px]
        */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          
          {/* =========================================================
              КАТЕГОРИЯ 1: ОДЕЖДА (Худи + Свитшот = 7 + 5 = 12)
              ========================================================= */}
          
          {/* 1. ХУДИ (7 колонок — Крупный внушительный масштаб худи) */}
          <FlatReveal direction="left" delay={40} distance={48} duration={950} className="md:col-span-2 lg:col-span-7 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'hoodie')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 lg:p-8 relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-1 sm:mb-2 pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#181818] tracking-tight">
                  Худи
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  Оверсайз • 380 г/м²
                </span>
              </div>

              {/* Макет худи: крупный выразительный масштаб */}
              <div className={`flex-1 flex items-center justify-center py-2 sm:py-3 relative my-auto z-10 overflow-visible ${activePoppedKey === 'hoodie' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="hoodie" zIndexClass="z-0" />

                {!imgErrors['hoodie'] ? (
                  <img
                    src={getImageSrc('hoodie', hoodieImage)}
                    alt="Худи тьютора"
                    loading="eager"
                    className="max-h-[480px] sm:max-h-[540px] lg:max-h-[600px] w-auto object-contain filter drop-shadow-xl rounded-2xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('hoodie', hoodieImage)}
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 scale-110 sm:scale-120">
                    <div className="flex-1 max-w-[240px] aspect-[4/5] bg-[#F7CDB9] rounded-3xl border border-black/10 shadow-xs relative flex flex-col items-center justify-center p-3.5">
                      <div className="w-18 h-14 rounded-t-full bg-[#E8BCA7] border border-black/10 absolute -top-3.5 shadow-inner" />
                      <div className="w-5 h-6 border-b-2 border-l border-r border-black/20 rounded-b-md mb-2" />
                      <div className="w-9 h-10 border border-black/30 rounded-t-sm rounded-b-xl bg-black/5 flex flex-col items-center justify-center">
                        <div className="w-3 h-3.5 bg-[#181818] rounded-t-sm" />
                        <span className="text-[8px] font-bold tracking-tighter text-[#181818]">TSU</span>
                      </div>
                      <div className="w-28 h-14 bg-[#EBBFA8] rounded-t-xl rounded-b-2xl border border-black/10 absolute bottom-3 shadow-2xs" />
                      <span className="absolute bottom-1 text-[9px] text-black/40 font-mono">front</span>
                    </div>

                    <div className="flex-1 max-w-[240px] aspect-[4/5] bg-[#F7CDB9] rounded-3xl border border-black/10 shadow-xs relative flex flex-col items-center justify-center p-3.5">
                      <div className="w-22 h-11 rounded-b-2xl bg-[#E8BCA7] border border-black/10 absolute top-1 shadow-xs" />
                      <div className="w-32 h-32 rounded-xl bg-white/70 border border-black/5 p-2.5 flex flex-col items-center justify-center shadow-2xs">
                        <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
                          <div className="bg-[#8FE06E] rounded-md border border-black/10 flex items-center justify-center text-xs font-bold">🧩</div>
                          <div className="bg-[#FFAD85] rounded-md border border-black/10" />
                          <div className="bg-[#F27A93] rounded-md border border-black/10" />
                          <div className="bg-[#FAF8F5] rounded-md border border-black/10 flex items-center justify-center text-[9px] font-mono text-black/50">tsu</div>
                        </div>
                        <span className="text-[9px] text-[#181818] font-medium mt-1.5 tracking-tight">Тьюторская служба</span>
                      </div>
                      <span className="absolute bottom-1 text-[9px] text-black/40 font-mono">back</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Двустороннее нанесение • Хлопок</span>
                <span className="font-mono text-[11px] text-black/40">#FFD1BC Peach</span>
              </div>
            </div>
          </FlatReveal>

          {/* 2. СВИТШОТ (5 колонок — увеличенный объемный масштаб свитшота) */}
          <FlatReveal direction="right" delay={80} distance={48} duration={950} className="md:col-span-2 lg:col-span-5 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'sweatshirt')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 sm:mb-4 pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#181818] tracking-tight">
                  Свитшот
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  350 г/м²
                </span>
              </div>

              {/* Имитация свитшота: увеличенная сочная подача */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'sweatshirt' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="sweatshirt" zIndexClass="z-0" />

                {!imgErrors['sweatshirt'] ? (
                  <img
                    src={getImageSrc('sweatshirt', sweatshirtImage)}
                    alt="Свитшот"
                    loading="eager"
                    className="max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] w-auto object-contain filter drop-shadow-md rounded-2xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('sweatshirt', sweatshirtImage)}
                  />
                ) : (
                  <div className="w-full max-w-[260px] aspect-[4/4.3] bg-[#CDE8C7] rounded-3xl border border-black/15 shadow-xs relative z-10 flex flex-col items-center justify-center p-4 scale-110 sm:scale-115">
                    <div className="w-28 h-6 border-t-2 border-l border-r border-[#A07040] rounded-t-full absolute -top-3 flex justify-center">
                      <div className="w-3 h-4 border-2 border-b-0 border-black/30 rounded-t-full -mt-3.5" />
                    </div>
                    <div className="w-16 h-4 rounded-b-xl border border-black/20 bg-[#BDDFC7] absolute top-1" />
                    <div className="w-24 h-26 border-2 border-[#181818] rounded-t-sm rounded-b-2xl bg-black/5 flex flex-col items-center justify-center p-2 shadow-2xs">
                      <div className="w-7 h-9 bg-[#181818] rounded-t-sm mb-1" />
                      <span className="text-sm font-bold tracking-widest text-[#181818]">TSU</span>
                    </div>
                    <div className="w-full h-4 rounded-b-2xl border-t border-black/10 bg-[#BDDFC7] absolute bottom-0" />
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Футер 3-нитка петля</span>
                <span className="font-mono text-[11px] text-black/40">#8FE06E Mint</span>
              </div>
            </div>
          </FlatReveal>

          {/* =========================================================
              КАТЕГОРИЯ 1 (продолжение): ОДЕЖДА (Футболка + Поло + Носки = 5 + 4 + 3 = 12)
              ========================================================= */}

          {/* 3. ФУТБОЛКА (5 колонок — увеличенный масштаб футболки) */}
          <FlatReveal direction="left" delay={60} distance={48} duration={950} className="md:col-span-1 lg:col-span-5 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'tshirt')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 sm:mb-4 pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#181818] tracking-tight">
                  Футболка
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  Regular Fit • 220 г/м²
                </span>
              </div>

              {/* Имитация футболки или изображение (увеличенный размер) */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'tshirt' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="tshirt" zIndexClass="z-0" />

                {!imgErrors['tshirt'] ? (
                  <img
                    src={getImageSrc('tshirt', tshirtImage)}
                    alt="Футболка"
                    loading="eager"
                    className="max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] w-auto object-contain filter drop-shadow-md rounded-2xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('tshirt', tshirtImage)}
                  />
                ) : (
                  <div className="w-full max-w-[280px] aspect-[4/3.8] bg-white rounded-3xl border border-black/15 shadow-xs relative z-10 flex flex-col items-center justify-center p-4 scale-110 ">
                    <div className="w-18 h-7 rounded-b-full border-2 border-t-0 border-black/20 absolute -top-0.5 bg-[#FAF8F5]" />
                    <div className="w-36 h-32 rounded-2xl bg-[#FAF8F5] border border-black/5 p-2 flex flex-col items-center justify-between shadow-2xs mt-2">
                      <div className="flex items-center justify-center gap-1.5 w-full pt-1">
                        <span className="text-xl">👩‍💻</span>
                        <span className="text-xl">🧑‍🎓</span>
                        <span className="text-xl">👨‍🏫</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-[#8FE06E]/20 text-[#181818] text-[9px] font-medium">
                        Команда тьюторов ТГУ
                      </div>
                      <div className="w-full flex items-center justify-between text-[8px] text-[#737373] font-mono px-1">
                        <span>print front</span>
                        <span>240×280 мм</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] z-10 pointer-events-none">
                <span>100% Хлопок пенье</span>
                <span className="font-mono text-[11px] text-black/40">DTF-печать</span>
              </div>
            </div>
          </FlatReveal>

          {/* 4. ПОЛО (4 колонки) */}
          <FlatReveal direction="up" delay={100} distance={44} duration={950} className="md:col-span-1 lg:col-span-4 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'polo')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Поло
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  Пике 200 г/м²
                </span>
              </div>

              {/* Имитация поло или изображение */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'polo' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="polo" zIndexClass="z-0" />

                {!imgErrors['polo'] ? (
                  <img
                    src={getImageSrc('polo', poloImage)}
                    alt="Поло"
                    loading="eager"
                    className="max-h-[300px] sm:max-h-[340px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('polo', poloImage)}
                  />
                ) : (
                  <div className="w-full max-w-[190px] aspect-[4/4.8] bg-white rounded-3xl border border-black/15 shadow-xs relative z-10 flex flex-col items-center justify-center p-3.5 ">
                    <div className="w-20 h-5 border-t-2 border-l border-r border-[#A07040] rounded-t-full absolute -top-2 flex justify-center">
                      <div className="w-2.5 h-3.5 border-2 border-b-0 border-black/30 rounded-t-full -mt-3" />
                    </div>
                    <div className="flex items-center gap-0.5 absolute top-1 z-10">
                      <div className="w-7 h-5 bg-[#FAF8F5] border border-black/20 rounded-bl-lg rotate-12" />
                      <div className="w-7 h-5 bg-[#FAF8F5] border border-black/20 rounded-br-lg -rotate-12" />
                    </div>
                    <div className="w-3.5 h-10 border border-black/15 bg-[#FAF8F5] absolute top-5 flex flex-col items-center justify-around py-0.5">
                      <div className="w-1 h-1 rounded-full bg-black/30" />
                      <div className="w-1 h-1 rounded-full bg-black/30" />
                    </div>
                    <div className="w-6 h-7 border border-black/30 rounded-t-xs rounded-b-lg bg-black/5 flex flex-col items-center justify-center absolute left-5 top-12">
                      <span className="text-[6px] font-bold text-[#181818]">TSU</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Хлопок 100%</span>
                <span className="font-mono text-[11px] text-black/40">Вышивка</span>
              </div>
            </div>
          </FlatReveal>

          {/* 5. НОСКИ (3 колонки) */}
          <FlatReveal direction="right" delay={120} distance={44} duration={950} className="md:col-span-2 lg:col-span-3 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'socks')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Носки
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  36–44
                </span>
              </div>

              {/* Имитация носков или изображение */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'socks' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="socks" zIndexClass="z-0" />

                {!imgErrors['socks'] ? (
                  <img
                    src={getImageSrc('socks', socksImage)}
                    alt="Носки"
                    loading="eager"
                    className="max-h-[270px] sm:max-h-[300px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('socks', socksImage)}
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center gap-2 ">
                    <div className="w-12 h-36 bg-white rounded-t-lg rounded-b-2xl border border-black/15 shadow-xs flex flex-col items-center justify-between py-2 -rotate-6">
                      <div className="w-full h-4 border-b border-black/10 border-dashed" />
                      <div className="w-6 h-10 rounded border border-black/30 bg-[#FAF8F5] p-0.5 flex flex-col items-center justify-between shadow-2xs">
                        <div className="w-2 h-1 bg-black/30 rounded-t-sm" />
                        <div className="w-full h-5 bg-gradient-to-t from-[#8FE06E] to-[#F27A93] rounded-xs flex items-center justify-center">
                          <span className="text-[8px] text-white">⚡</span>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-black/5 self-start ml-1" />
                    </div>

                    <div className="w-12 h-36 bg-white rounded-t-lg rounded-b-2xl border border-black/15 shadow-xs flex flex-col items-center justify-between py-2 rotate-6">
                      <div className="w-full h-4 border-b border-black/10 border-dashed" />
                      <div className="w-6 h-10 rounded border border-black/30 bg-[#FAF8F5] p-0.5 flex flex-col items-center justify-between shadow-2xs">
                        <div className="w-2 h-1 bg-black/30 rounded-t-sm" />
                        <div className="w-full h-5 bg-gradient-to-t from-[#8FE06E] to-[#F27A93] rounded-xs flex items-center justify-center">
                          <span className="text-[8px] text-white">⚡</span>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-black/5 self-end mr-1" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Хлопок 80% • Жаккард</span>
                <span className="font-mono text-[11px] text-black/40">Вышивка</span>
              </div>
            </div>
          </FlatReveal>

          {/* =========================================================
              КАТЕГОРИЯ 2: АКСЕССУАРЫ И МЕРЧ (Шопер + Кружка + Бейдж + Значки = 4 + 4 + 2 + 2 = 12)
              ========================================================= */}

          {/* 6. ШОПЕР (4 колонки — крупный и поднятый вверх) */}
          <FlatReveal direction="left" delay={140} distance={48} duration={950} className="md:col-span-1 lg:col-span-4 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'shopper')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-2 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Шопер
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  38 × 42 см
                </span>
              </div>

              {/* Шопер поднят вверх и заметно крупнее кружки */}
              <div className={`flex-1 flex flex-col items-center justify-start pt-1 pb-10 sm:pb-14 relative z-10 overflow-visible ${activePoppedKey === 'shopper' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="shopper" zIndexClass="z-0" />

                {!imgErrors['shopper'] ? (
                  <img
                    src={getImageSrc('shopper', shopperImage)}
                    alt="Шопер"
                    loading="eager"
                    className="max-h-[320px] sm:max-h-[360px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10 mt-1"
                    onError={() => handleImgError('shopper', shopperImage)}
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center mt-1 scale-105 sm:scale-110">
                    <div className="w-18 h-16 border-2 border-b-0 border-[#D4C3A3] rounded-t-2xl shadow-2xs -mb-1" />
                    <div className="w-full max-w-[210px] aspect-[4/4.2] bg-[#F7F2E7] rounded-2xl border border-black/15 shadow-xs p-3 flex flex-col items-center justify-between ">
                      <div className="w-full flex-1 rounded-xl bg-white/80 border border-black/5 p-2 flex flex-col items-center justify-center">
                        <div className="w-12 h-6 border-b-2 border-black/40 flex items-center justify-center relative mb-1">
                          <div className="w-4 h-4 rounded-full border border-black/40 -mt-2 bg-[#FFAD85]/40" />
                        </div>
                        <div className="grid grid-cols-4 gap-0.5 w-16 mb-1">
                          <div className="w-3 h-2 bg-black/20 rounded-xs" />
                          <div className="w-3 h-2 bg-black/20 rounded-xs" />
                          <div className="w-3 h-2 bg-black/20 rounded-xs" />
                          <div className="w-3 h-2 bg-black/20 rounded-xs" />
                        </div>
                        <span className="text-[8px] font-medium text-[#181818] text-center">Томский государственный университет</span>
                      </div>
                      <div className="w-full pt-1.5 flex items-center justify-between text-[9px] text-[#737373] font-mono">
                        <span>38×42 см</span>
                        <span>100% канвас</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Хлопковая саржа 260 г/м²</span>
                <span className="font-mono text-[11px] text-black/40">Шелкография</span>
              </div>
            </div>
          </FlatReveal>

          {/* 7. КРУЖКА (4 колонки — соразмерная пропорция кружки, меньше шопера) */}
          <FlatReveal direction="up" delay={160} distance={44} duration={950} className="md:col-span-1 lg:col-span-4 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'mug')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Кружка
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  330 мл
                </span>
              </div>

              {/* Соразмерный масштаб кружки относительно шопера */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'mug' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="mug" zIndexClass="z-0" />

                {!imgErrors['mug'] ? (
                  <img
                    src={getImageSrc('mug', mugImage)}
                    alt="Кружка"
                    loading="eager"
                    className="max-h-[200px] sm:max-h-[230px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('mug', mugImage)}
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center scale-95">
                    <div className="w-22 sm:w-24 h-26 sm:h-28 bg-white rounded-b-2xl rounded-t-sm border border-black/15 shadow-xs flex flex-col items-center justify-center p-2 relative z-10 ">
                      <div className="w-14 h-14 rounded-lg bg-[#FAF8F5] border border-black/5 p-1.5 flex flex-col items-center justify-center">
                        <span className="text-xl mb-0.5">☕</span>
                        <span className="text-[7px] text-[#181818] font-medium leading-none text-center">Тьютор ТГУ</span>
                      </div>
                      <div className="absolute top-2 left-2 w-1.5 h-14 bg-white/80 rounded-full blur-[0.5px]" />
                    </div>
                    <div className="w-9 h-18 rounded-r-2xl border-4 border-l-0 border-black/15 -ml-2 z-0 bg-white/40" />
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Глянцевая керамика</span>
                <span className="font-mono text-[11px] text-black/40">УФ-печать</span>
              </div>
            </div>
          </FlatReveal>

          {/* 8. БЕЙДЖ (2 колонки — увеличенный заметный бейдж, крупнее значков) */}
          <FlatReveal direction="up" delay={180} distance={44} duration={950} className="md:col-span-1 lg:col-span-2 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'badge')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-4 sm:p-5 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-2 pointer-events-none">
                <h3 className="text-lg sm:text-xl font-semibold text-[#181818] tracking-tight">
                  Бейдж
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-[#737373]">
                  85×120
                </span>
              </div>

              {/* Увеличенный бейдж на подвесе (крупнее значков) */}
              <div className={`flex-1 flex flex-col items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'badge' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="badge" zIndexClass="z-0" />

                {!imgErrors['badge'] ? (
                  <img
                    src={getImageSrc('badge', badgeImage)}
                    alt="Бейдж"
                    loading="eager"
                    className="max-h-[290px] sm:max-h-[330px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('badge', badgeImage)}
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center scale-110">
                    <div className="w-5 h-12 bg-white border-x border-black/15 shadow-2xs -mt-3 relative flex items-center justify-center">
                      <div className="w-1 h-full bg-[#8FE06E]/40" />
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-black/30 bg-[#E5E5E5] -mt-1 z-10 shadow-2xs" />
                    <div className="w-full max-w-[160px] aspect-[1/1.5] bg-white rounded-xl border border-black/10 shadow-xs p-3 flex flex-col items-center justify-between -mt-1">
                      <div className="w-7 h-1 rounded-full bg-black/15" />
                      <div className="w-full py-1.5 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#8FE06E]/20 border border-[#8FE06E]/40 flex items-center justify-center mb-1.5">
                          <span className="text-xl">👥</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-wider text-[#737373] font-medium">Тьютор</span>
                        <p className="text-xs font-semibold text-[#181818] text-center leading-tight">Алина</p>
                      </div>
                      <div className="w-full pt-1 border-t border-black/5 flex items-center justify-between text-[8px] text-black/40 font-mono">
                        <span>ТГУ 2026</span>
                        <span>#042</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-[#737373] pointer-events-none z-10">
                <span>Пластик</span>
                <span className="font-mono text-[10px] text-black/40">Лента 20 мм</span>
              </div>
            </div>
          </FlatReveal>

          {/* 9. ЗНАЧКИ (2 колонки — компактные миниатюрные пины) */}
          <FlatReveal direction="right" delay={200} distance={44} duration={950} className="md:col-span-1 lg:col-span-2 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'pins')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-4 sm:p-5 relative min-h-[420px] sm:min-h-[480px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-2 pointer-events-none">
                <h3 className="text-lg sm:text-xl font-semibold text-[#181818] tracking-tight">
                  Значки
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-[#737373]">
                  Ø 37–56 мм
                </span>
              </div>

              {/* Компактный соразмерный масштаб значков (аксессуар на одежду) */}
              <div className={`flex-1 flex items-center justify-center relative py-2 z-10 overflow-visible ${activePoppedKey === 'pins' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="pins" zIndexClass="z-0" />

                {!imgErrors['pins'] ? (
                  <img
                    src={getImageSrc('pins', pinsImage)}
                    alt="Значки"
                    loading="eager"
                    className="max-h-[95px] sm:max-h-[110px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('pins', pinsImage)}
                  />
                ) : (
                  <div className="relative z-10 w-24 h-22 flex items-center justify-center scale-75">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-black/20 shadow-md flex flex-col items-center justify-center relative z-20 ">
                      <div className="w-5 h-6 border border-black/40 rounded-t-sm rounded-b-xl bg-black/5 flex flex-col items-center justify-center">
                        <div className="w-2 h-2 bg-[#181818] rounded-t-sm" />
                        <span className="text-[6px] font-bold tracking-tight text-[#181818]">TSU</span>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-white/90 pointer-events-none" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#F27A93] border-2 border-black/15 shadow-sm flex items-center justify-center text-white text-[9px] font-bold absolute right-0 top-0.5 z-10 -rotate-12 transition-transform duration-300 group-hover:translate-x-1">
                      <span>★</span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#FFAD85] border-2 border-black/15 shadow-sm flex items-center justify-center text-[#181818] text-[7px] font-mono absolute left-0 bottom-0 z-10 rotate-12 transition-transform duration-300 group-hover:-translate-x-1">
                      <span>ТЬЮТОР</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-[#737373] pointer-events-none z-10">
                <span>Закатные пины</span>
                <span className="font-mono text-[10px] text-black/40">Булавка</span>
              </div>
            </div>
          </FlatReveal>

          {/* =========================================================
              КАТЕГОРИЯ 3: ПРОСТРАНСТВО И ПОЛИГРАФИЯ (Диплом + Роллап = 8 + 4 = 12)
              ========================================================= */}

          {/* 10. ШАБЛОН ДИПЛОМА / СЕРТИФИКАТА (8 колонок — соразмерный лист А4) */}
          <FlatReveal direction="left" delay={120} distance={48} duration={950} className="md:col-span-2 lg:col-span-8 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'diploma')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 lg:p-7 relative min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Шаблон диплома
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  Формат А4
                </span>
              </div>

              {/* Соразмерный диплом (аккуратный сертификат А4) */}
              <div className={`flex-1 flex items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'diploma' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="diploma" zIndexClass="z-0" />

                {!imgErrors['diploma'] ? (
                  <img
                    src={getImageSrc('diploma', diplomaImage)}
                    alt="Шаблон диплома"
                    loading="eager"
                    className="max-h-[280px] sm:max-h-[320px] lg:max-h-[360px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('diploma', diplomaImage)}
                  />
                ) : (
                  <div className="w-full max-w-[380px] aspect-[1.414/1] bg-[#FAF8F5] rounded-xl border-2 border-black/20 shadow-md p-4 sm:p-5 flex flex-col justify-between relative z-10 ">
                    <div className="absolute inset-2 border border-black/10 rounded-lg pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between border-b border-black/10 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-6 border border-black/40 rounded-t-xs rounded-b-md bg-black/5 flex items-center justify-center text-[7px] font-bold">TSU</div>
                        <span className="text-[9px] font-semibold text-[#181818] uppercase tracking-wider">Томский государственный университет</span>
                      </div>
                      <span className="text-[8px] font-mono text-[#737373]">2026</span>
                    </div>

                    <div className="relative z-10 text-center my-auto py-2">
                      <span className="text-[8px] tracking-widest uppercase text-[#737373] block mb-0.5">Сертификат наставника</span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#181818] tracking-tight">ДИПЛОМ ТЬЮТОРА</h4>
                      <div className="w-12 h-0.5 bg-[#FFAD85] mx-auto my-1.5" />
                      <p className="text-[9px] text-[#737373] max-w-[280px] mx-auto leading-relaxed">
                        Подтверждает успешное прохождение образовательной программы «Индивидуальное сопровождение студентов первого курса»
                      </p>
                    </div>

                    <div className="relative z-10 flex items-end justify-between pt-2 border-t border-black/10 text-[8px] text-[#737373]">
                      <div>
                        <span className="block font-medium text-[#181818]">Тьюторская служба</span>
                        <span className="italic text-[7px]">Координатор</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#8FE06E] bg-white flex items-center justify-center text-[10px] shadow-2xs">💡</div>
                      <div className="text-right">
                        <span className="block font-medium text-[#181818]">г. Томск</span>
                        <span className="font-mono text-[7px]">№ ТГУ-2026/08</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Дизайнерский картон 300 г/м²</span>
                <span className="font-mono text-[11px] text-black/40">Soft-touch</span>
              </div>
            </div>
          </FlatReveal>

          {/* 11. РОЛЛАП (4 колонки — Выраженно высокий вертикальный стенд 85x200 см) */}
          <FlatReveal direction="right" delay={180} distance={48} duration={950} className="md:col-span-2 lg:col-span-4 h-full">
            <div 
              onClick={(e) => handleCardClick(e, 'rollup')}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/80 shadow-2xs overflow-hidden flex flex-col p-5 sm:p-6 relative min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] group cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-black/20"
              data-tooltip="Кликните на карточку ✨"
            >
              <div className="flex items-center justify-between gap-2 z-10 mb-3 pointer-events-none">
                <h3 className="text-xl font-semibold text-[#181818] tracking-tight">
                  Роллап
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  85 × 200 см
                </span>
              </div>

              {/* Имитация роллапа: доминантный высокий вертикальный стенд */}
              <div className={`flex-1 flex flex-col items-center justify-center py-2 relative z-10 overflow-visible ${activePoppedKey === 'rollup' ? 'animate-pop-squish' : ''}`}>
                <ParticleBurstRenderer particles={merchParticles} shockwaves={merchShockwaves} targetId="rollup" zIndexClass="z-0" />

                {!imgErrors['rollup'] ? (
                  <img
                    src={getImageSrc('rollup', rollupImage)}
                    alt="Роллап"
                    loading="eager"
                    className="max-h-[500px] sm:max-h-[580px] lg:max-h-[640px] w-auto object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105 pointer-events-none relative z-10"
                    onError={() => handleImgError('rollup', rollupImage)}
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-full max-w-[170px] aspect-[85/200] bg-[#FAF8F5] rounded-t-lg border border-black/15 shadow-md p-3 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-7 h-8 border border-black/40 rounded-t-xs rounded-b-md bg-[#181818] text-white flex items-center justify-center text-[7px] font-bold mb-1.5 shadow-2xs">TSU</div>
                        <span className="text-[8px] font-bold text-[#181818] leading-tight">ТЬЮТОРСКАЯ СЛУЖБА ТГУ</span>
                        <span className="text-[6px] text-[#737373] mt-0.5">Навигатор в мире университета</span>
                      </div>

                      <div className="flex flex-col items-center my-auto py-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8FE06E]/40 via-[#FFAD85]/40 to-[#F27A93]/30 flex items-center justify-center text-2xl mb-1.5 shadow-2xs">🦉</div>
                        <span className="text-[8px] font-semibold text-[#181818] text-center leading-tight">Поможем найти свой путь</span>
                      </div>

                      <div className="flex flex-col items-center pt-2 border-t border-black/10">
                        <div className="w-9 h-9 bg-white border border-black/20 rounded-sm p-0.5 mb-1.5 flex items-center justify-center">
                          <div className="w-full h-full bg-black/80 rounded-xs flex items-center justify-center text-[7px] text-white font-mono">QR</div>
                        </div>
                        <span className="text-[7px] font-mono text-[#737373]">vk.com/tutor_tsu</span>
                      </div>
                    </div>

                    <div className="w-44 h-2.5 bg-[#D1D5DB] rounded-full shadow-xs mt-0.5 relative flex items-center justify-center">
                      <div className="w-16 h-0.5 bg-black/30" />
                      <div className="absolute -bottom-1 left-2 w-6 h-1 bg-[#9CA3AF] rounded-xs" />
                      <div className="absolute -bottom-1 right-2 w-6 h-1 bg-[#9CA3AF] rounded-xs" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373] pointer-events-none z-10">
                <span>Алюминиевая кассета • Баннер</span>
                <span className="font-mono text-[11px] text-black/40">Интерьерная печать</span>
              </div>
            </div>
          </FlatReveal>

        </div>

      </div>
    </section>
  );
};

