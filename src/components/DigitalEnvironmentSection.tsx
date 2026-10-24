import React from 'react';
import { Monitor, Smartphone, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { FlatReveal } from './FlatReveal';
import { useParticleBurst, ParticleBurstRenderer } from './ParticleBurst';

interface DigitalEnvironmentSectionProps {
  desktopImage?: string;
  mobileImage?: string;
  postImages?: [string?, string?, string?];
  presentationImage?: string;
  stickerpackImage?: string;
  stickerImages?: (string | undefined)[];
}

interface StickerItem {
  id: number;
}

const DEFAULT_STICKERS: StickerItem[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

export const DigitalEnvironmentSection: React.FC<DigitalEnvironmentSectionProps> = ({
  desktopImage,
  mobileImage,
  postImages,
  presentationImage,
  stickerImages,
}) => {
  const [desktopSrc, setDesktopSrc] = React.useState<string>(
    desktopImage || '/assets/digital-desktop.webp'
  );
  const [mobileSrc, setMobileSrc] = React.useState<string>(
    mobileImage || '/assets/digital-mobile.webp'
  );
  const [postSrcs, setPostSrcs] = React.useState<string[]>([
    postImages?.[0] || '/assets/digital-post-1.webp',
    postImages?.[1] || '/assets/digital-post-2.webp',
    postImages?.[2] || '/assets/digital-post-3.webp',
  ]);

  const [presentationSrc, setPresentationSrc] = React.useState<string>(
    presentationImage || '/assets/digital-presentation.webp'
  );

  const [stickerSrcs, setStickerSrcs] = React.useState<string[]>(
    DEFAULT_STICKERS.map((st, i) => stickerImages?.[i] || `/assets/digital-sticker-${st.id}.webp`)
  );

  // Fullscreen publication lightbox state with rich transition animation
  const [activeModalPost, setActiveModalPost] = React.useState<number | null>(null);
  const [slideDirection, setSlideDirection] = React.useState<'next' | 'prev' | 'init'>('init');
  const [isModalClosing, setIsModalClosing] = React.useState<boolean>(false);

  // Interactive Particle burst for stickerpack
  const { particles: stickerParticles, shockwaves: stickerShockwaves, triggerBurst: triggerStickerBurst } = useParticleBurst('sticker');
  const [activePoppedSticker, setActivePoppedSticker] = React.useState<number | null>(null);

  const handleStickerClick = (e: React.MouseEvent<HTMLElement>, stickerId: number) => {
    setActivePoppedSticker(stickerId);
    triggerStickerBurst(e, `sticker-${stickerId}`);
    setTimeout(() => {
      setActivePoppedSticker((prev) => (prev === stickerId ? null : prev));
    }, 450);
  };

  React.useEffect(() => {
    if (desktopImage !== undefined) setDesktopSrc(desktopImage);
  }, [desktopImage]);

  React.useEffect(() => {
    if (mobileImage !== undefined) setMobileSrc(mobileImage);
  }, [mobileImage]);

  React.useEffect(() => {
    if (postImages) {
      setPostSrcs([
        postImages[0] || '/assets/digital-post-1.webp',
        postImages[1] || '/assets/digital-post-2.webp',
        postImages[2] || '/assets/digital-post-3.webp',
      ]);
    }
  }, [postImages]);

  React.useEffect(() => {
    if (presentationImage !== undefined) setPresentationSrc(presentationImage);
  }, [presentationImage]);

  React.useEffect(() => {
    if (stickerImages) {
      setStickerSrcs(
        DEFAULT_STICKERS.map((st, i) => stickerImages[i] || `/assets/digital-sticker-${st.id}.webp`)
      );
    }
  }, [stickerImages]);

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setActiveModalPost(null);
      setIsModalClosing(false);
      setSlideDirection('init');
    }, 220);
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (activeModalPost === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        setSlideDirection('next');
        setActiveModalPost((prev) => (prev !== null ? (prev % 3) + 1 : 1));
      } else if (e.key === 'ArrowLeft') {
        setSlideDirection('prev');
        setActiveModalPost((prev) => (prev !== null ? ((prev - 2 + 3) % 3) + 1 : 3));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPost]);

  const handleOpenPost = (index: number) => {
    setSlideDirection('init');
    setActiveModalPost(index);
    setIsModalClosing(false);
  };

  const handlePrevPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection('prev');
    setActiveModalPost((prev) => (prev !== null ? ((prev - 2 + 3) % 3) + 1 : 3));
  };

  const handleNextPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection('next');
    setActiveModalPost((prev) => (prev !== null ? (prev % 3) + 1 : 1));
  };

  return (
    <section id="digital-environment-section" className="w-full">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow маркер сверху секции */}
        <div className="w-full pl-1 sm:pl-3 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block">
            (цифровая среда)
          </span>
        </div>

        {/* БЕНТО-СЕТКА */}
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          
          {/* РЯД 1: ДЕСКТОПНАЯ ВЕРСИЯ (7/12) И МОБИЛЬНАЯ ВЕРСИЯ (5/12) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            
            {/* 1. ДЕСКТОПНАЯ ВЕРСИЯ ВК (7 колонок из 12) */}
            <FlatReveal direction="left" delay={60} distance={48} duration={950} className="w-full lg:col-span-7 h-full">
              <div className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white shadow-2xs overflow-hidden flex flex-col min-h-[340px] sm:min-h-[400px] lg:min-h-[450px] xl:min-h-[490px]">
                <div className="w-full h-11 sm:h-12 px-4 sm:px-5 border-b border-black/5 bg-black/[0.02] flex items-center justify-between shrink-0 gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#737373] font-normal truncate">
                    <Monitor className="w-4 h-4 text-[#181818]/60 shrink-0" />
                    <span className="truncate">Десктопная версия ВК</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-black/[0.04] text-[11px] sm:text-xs text-[#737373] font-mono shrink-0">
                    vk.com/tutor_tsu
                  </div>
                </div>

                <div className="flex-1 w-full relative overflow-auto bg-white p-2.5 sm:p-3.5 lg:p-4 flex items-center justify-center">
                  <img
                    src={desktopSrc}
                    alt="Оформление ВК-сообщества на десктопе"
                    className="w-full h-auto max-h-full object-contain block rounded-lg sm:rounded-xl border border-black/5 shadow-2xs"
                    loading="eager"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes('.webp')) {
                        img.src = '/assets/digital-desktop.png';
                      } else if (img.src.endsWith('.png') && !img.src.includes('/assets/')) {
                        img.src = '/assets/digital-desktop.png';
                      } else if (img.src.includes('/assets/')) {
                        img.src = '/assets/digital-desktop.svg';
                      }
                    }}
                  />
                </div>
              </div>
            </FlatReveal>

            {/* 2. МОБИЛЬНАЯ ВЕРСИЯ ВК (5 колонок из 12) */}
            <FlatReveal direction="right" delay={120} distance={48} duration={950} className="w-full lg:col-span-5 h-full">
              <div className="w-full h-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white shadow-2xs overflow-hidden flex flex-col min-h-[340px] sm:min-h-[400px] lg:min-h-[450px] xl:min-h-[490px]">
                <div className="w-full h-11 sm:h-12 px-4 sm:px-5 border-b border-black/5 bg-black/[0.02] flex items-center justify-start shrink-0 gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#737373] font-normal truncate">
                    <Smartphone className="w-4 h-4 text-[#181818]/60 shrink-0" />
                    <span className="truncate">Мобильная версия ВК</span>
                  </div>
                </div>

                <div className="flex-1 w-full relative flex items-center justify-center p-3.5 sm:p-5 lg:p-6 bg-white overflow-hidden">
                  <div className="relative w-full max-w-[190px] sm:max-w-[220px] lg:max-w-[245px] xl:max-w-[275px] 2xl:max-w-[295px] aspect-[9/19] rounded-[32px] sm:rounded-[38px] xl:rounded-[42px] p-[4px] sm:p-[4.5px] bg-[#1d1d1f] shadow-xl ring-1 ring-black/40 flex flex-col overflow-hidden transition-all duration-300">
                    <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-9 sm:w-11 h-2.5 sm:h-3 bg-black rounded-full z-20 pointer-events-none flex items-center justify-between px-1.5 shadow-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0e] ring-[0.5px] ring-white/10" />
                      <div className="w-1 h-1 rounded-full bg-[#14141e]" />
                    </div>

                    <div className="w-full h-full rounded-[28px] sm:rounded-[34px] xl:rounded-[38px] overflow-hidden relative bg-black">
                      <img
                        src={mobileSrc}
                        alt="Оформление ВК-сообщества на мобильном устройстве"
                        className="w-full h-full object-cover object-top block"
                        loading="eager"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.includes('.webp')) {
                            img.src = '/assets/digital-mobile.png';
                          } else if (img.src.endsWith('.png') && !img.src.includes('/assets/')) {
                            img.src = '/assets/digital-mobile.png';
                          } else if (img.src.includes('/assets/')) {
                            img.src = '/assets/digital-mobile.svg';
                          }
                        }}
                      />
                    </div>

                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-[2px] sm:h-[2.5px] bg-white/70 rounded-full z-20 pointer-events-none drop-shadow-xs" />
                  </div>
                </div>
              </div>
            </FlatReveal>

          </div>

          {/* РЯД 2: ПУБЛИКАЦИИ В СООБЩЕСТВЕ (7/12) И ШАБЛОН ПРЕЗЕНТАЦИИ (5/12) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            
            {/* 1. ПУБЛИКАЦИИ В СООБЩЕСТВЕ (7 колонок из 12) - без лишних вложенных рамок/подложек */}
            <FlatReveal direction="left" delay={140} distance={48} duration={950} className="w-full lg:col-span-7 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden flex flex-col justify-between p-4 sm:p-5 lg:p-6 group">
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#181818] tracking-tight">
                    Публикации в сообществе
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                    SMM • 3 поста
                  </span>
                </div>

                {/* 3 фото публикаций - чистый плоский ряд без лишних внутренних фонов, подложек и чипов */}
                <div className="flex-1 w-full flex items-center justify-center py-1 sm:py-2">
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5 w-full items-stretch">
                    {[1, 2, 3].map((postIndex) => {
                      const currentImage = postSrcs[postIndex - 1] || `/assets/digital-post-${postIndex}.webp`;

                      return (
                        <div
                          key={`vk-post-${postIndex}`}
                          onClick={() => handleOpenPost(postIndex)}
                          className="w-full aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 shadow-2xs group/post cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-black/25 active:scale-[0.98]"
                          data-tooltip="Нажмите, чтобы развернуть во весь экран 🔍"
                        >
                          <img
                            src={currentImage}
                            alt={`Публикация ${postIndex}`}
                            className="w-full h-full object-cover block transition-transform duration-500 group-hover/post:scale-105"
                            loading="eager"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (!img.src.includes('/assets/')) {
                                img.src = `/assets/digital-post-${postIndex}.webp`;
                              } else if (img.src.endsWith('.webp')) {
                                img.src = `/assets/digital-post-${postIndex}.png`;
                              }
                            }}
                          />
                          
                          {/* Полупрозрачный оверлей с кнопкой зума */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/post:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                            <div className="w-9 h-9 rounded-full bg-white/95 text-[#181818] flex items-center justify-center shadow-md scale-90 group-hover/post:scale-100 transition-transform duration-200">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373]">
                  <span>Формат 1:1 • Нажмите на фото для просмотра на всю ширину</span>
                  <span className="font-mono text-[11px] text-black/40">ВКонтакте</span>
                </div>
              </div>
            </FlatReveal>

            {/* 2. ШАБЛОН ПРЕЗЕНТАЦИИ (5 колонок из 12) - чистый макет без лишнего вложенного слоя */}
            <FlatReveal direction="right" delay={180} distance={48} duration={950} className="w-full lg:col-span-5 h-full">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden flex flex-col justify-between p-4 sm:p-5 lg:p-6 group">
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#181818] tracking-tight">
                    Шаблон презентации
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                    16:9 Slides
                  </span>
                </div>

                {/* Фото слайда презентации прямо в структуре карточки */}
                <div className="flex-1 w-full flex items-center justify-center py-1 sm:py-2 overflow-hidden">
                  <div className="w-full aspect-[16/9] relative rounded-xl sm:rounded-2xl border border-black/10 shadow-2xs overflow-hidden bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.015]">
                    <img
                      src={presentationSrc}
                      alt="Шаблон презентации тьюторской службы ТГУ"
                      className="w-full h-full object-cover block"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/assets/')) {
                          target.src = '/assets/digital-presentation.webp';
                        } else if (target.src.endsWith('.webp')) {
                          target.src = '/assets/digital-presentation.png';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373]">
                  <span>PPTX / Google Slides</span>
                  <span className="font-mono text-[11px] text-black/40">Мастер-слайды</span>
                </div>
              </div>
            </FlatReveal>

          </div>

          {/* РЯД 3: СТИКЕРПАК (12 КОЛОНОК — БЕЗ ЛИШНИХ ВЛОЖЕННЫХ КВАДРАТОВ-ПОДЛОЖЕК) */}
          <FlatReveal direction="up" delay={200} distance={48} duration={950} className="w-full">
            <div className="w-full rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs overflow-hidden flex flex-col p-4 sm:p-5 lg:p-6 group">
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#181818] tracking-tight">
                  Стикерпак
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 text-[#737373]">
                  Telegram & VK • 8 стикеров
                </span>
              </div>

              {/* Витрина из 8 стикеров: стикеры парят на едином полотне с интерактивным взрывом эмодзи/стикеров за каждым объектом при клике */}
              <div className="w-full py-2 sm:py-3 flex items-center justify-center relative overflow-visible">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3.5 w-full relative z-10 overflow-visible">
                  {DEFAULT_STICKERS.map((st, idx) => {
                    const imgPath = stickerSrcs[idx] || `/assets/digital-sticker-${st.id}.webp`;
                    const isPopped = activePoppedSticker === st.id;

                    return (
                      <div
                        key={st.id}
                        onClick={(e) => handleStickerClick(e, st.id)}
                        className={`flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-95 group/item cursor-pointer aspect-square w-full relative select-none overflow-visible ${
                          isPopped ? 'animate-pop-squish' : ''
                        }`}
                        data-tooltip="Кликните на стикер ✨"
                      >
                        {/* Интерактивные частицы / взрыв за стикером */}
                        <ParticleBurstRenderer 
                          particles={stickerParticles} 
                          shockwaves={stickerShockwaves}
                          targetId={`sticker-${st.id}`} 
                          zIndexClass="z-0" 
                        />

                        <img
                          src={imgPath}
                          alt={`Стикер ${st.id}`}
                          className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover/item:rotate-3 group-hover/item:drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] pointer-events-none relative z-10"
                          loading="eager"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith('.webp')) {
                              target.src = `/assets/digital-sticker-${st.id}.png`;
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#737373]">
                <span>PNG / WebP с прозрачным фоном</span>
                <span className="font-mono text-[11px] text-black/40">512×512 px</span>
              </div>
            </div>
          </FlatReveal>

        </div>

      </div>

      {/* ПОЛНОЭКРАННЫЙ ПРОСМОТР ПУБЛИКАЦИЙ НА ВСЮ ШИРИНУ ЭКРАНА С ПЛАВНОЙ АНИМАЦИЕЙ И ЗУМОМ */}
      {activeModalPost !== null && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-2 sm:p-4 md:p-5 bg-black/90 backdrop-blur-md select-none cursor-default transition-all duration-200 overflow-hidden ${
            isModalClosing ? 'opacity-0 scale-98 pointer-events-none' : 'animate-lightbox-fade opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          {/* Верхняя панель управления: заголовок и кнопка закрытия */}
          <div 
            className="w-full max-w-7xl flex items-center justify-between z-50 py-2 sm:py-3 px-2 sm:px-4 transition-transform duration-300 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/15 text-white border border-white/20 shadow-xs">
                Пост {activeModalPost} из 3
              </span>
              <span className="hidden md:inline text-xs text-white/70">
                Публикация в сообществе Тьюторской службы ТГУ
              </span>
            </div>

            {/* Кнопка закрытия */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer shadow-xs"
              aria-label="Закрыть полноэкранный просмотр"
              data-tooltip="Закрыть (Esc)"
            >
              <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Центральная зона: строго ограничена между верхней и нижней панелями */}
          <div 
            className="flex-1 w-full min-h-0 relative flex items-center justify-center px-2 sm:px-12 py-1 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка «Назад» — на десктопе сбоку, на мобильном перенесена в нижнюю панель */}
            <button
              type="button"
              onClick={handlePrevPost}
              className="hidden sm:flex absolute left-4 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white items-center justify-center border border-white/25 shadow-xl backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-90 group cursor-pointer"
              aria-label="Предыдущая публикация"
              data-tooltip="Предыдущая (←)"
            >
              <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>

            {/* Контейнер полноразмерного фото — чистый идеальный квадрат 1:1 без лишних полос по бокам */}
            <div 
              className={`relative aspect-square w-auto h-auto max-w-[92vw] sm:max-w-[calc(100vh-180px)] max-h-[calc(100vh-180px)] rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-white flex items-center justify-center ${
                slideDirection === 'next'
                  ? 'animate-slide-next'
                  : slideDirection === 'prev'
                  ? 'animate-slide-prev'
                  : 'animate-lightbox-pop'
              }`}
            >
              <img
                key={`${activeModalPost}-${slideDirection}`}
                src={postSrcs[activeModalPost - 1] || `/assets/digital-post-${activeModalPost}.webp`}
                alt={`Полноразмерная публикация ${activeModalPost}`}
                className="w-full h-full object-cover block select-none"
                loading="eager"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('.webp')) {
                    img.src = `/assets/digital-post-${activeModalPost}.png`;
                  } else if (img.src.includes('/assets/')) {
                    img.src = `/digital-post-${activeModalPost}.png`;
                  }
                }}
              />
            </div>

            {/* Кнопка «Вперёд» — на десктопе сбоку, на мобильном перенесена в нижнюю панель */}
            <button
              type="button"
              onClick={handleNextPost}
              className="hidden sm:flex absolute right-4 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white items-center justify-center border border-white/25 shadow-xl backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-90 group cursor-pointer"
              aria-label="Следующая публикация"
              data-tooltip="Следующая (→)"
            >
              <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Нижняя панель с миниатюрами и мобильными стрелками навигации */}
          <div 
            className="flex items-center justify-center gap-2.5 sm:gap-3 z-50 py-2 sm:py-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка «Назад» на мобильном адаптиве (не перекрывает фото) */}
            <button
              type="button"
              onClick={handlePrevPost}
              className="sm:hidden w-11 h-11 rounded-xl bg-white/10 active:bg-white/25 text-white flex items-center justify-center border border-white/20 shadow-md transition-all cursor-pointer shrink-0"
              aria-label="Предыдущая публикация"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[1, 2, 3].map((idx) => (
              <button
                key={`thumb-${idx}`}
                type="button"
                onClick={() => handleOpenPost(idx)}
                className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                  activeModalPost === idx
                    ? 'border-[#8FE06E] ring-2 ring-[#8FE06E] shadow-[0_0_14px_rgba(143,224,110,0.6)] scale-110 opacity-100'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                aria-label={`Перейти к публикации ${idx}`}
              >
                <img
                  src={postSrcs[idx - 1] || `/assets/digital-post-${idx}.webp`}
                  alt={`Миниатюра ${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            {/* Кнопка «Вперёд» на мобильном адаптиве (не перекрывает фото) */}
            <button
              type="button"
              onClick={handleNextPost}
              className="sm:hidden w-11 h-11 rounded-xl bg-white/10 active:bg-white/25 text-white flex items-center justify-center border border-white/20 shadow-md transition-all cursor-pointer shrink-0"
              aria-label="Следующая публикация"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
