import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DELIVERABLES_DATA, VK_COMMUNITY_DATA, VK_CAROUSEL_POSTS } from '../data/caseData';
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Share2,
  ChevronDown,
  ArrowUpRight,
  ArrowLeft,
  MoreVertical,
  Settings,
  MessageSquare,
  Home,
  Search,
  Users,
  Menu,
  Clapperboard,
  User,
  Monitor,
  Smartphone
} from 'lucide-react';

export const DeliverablesGallery: React.FC = () => {
  const [desktopCoverLoaded, setDesktopCoverLoaded] = useState(false);
  const [mobileCoverLoaded, setMobileCoverLoaded] = useState(false);

  // State for active slides in carousels
  const [carouselSlideIndices, setCarouselSlideIndices] = useState<Record<string, number>>({
    'carousel-dresscode': 0,
    'carousel-partners': 0
  });

  // Track slide direction (-1 for left/prev, 1 for right/next) for swipe animations
  const [carouselSlideDirections, setCarouselSlideDirections] = useState<Record<string, number>>({
    'carousel-dresscode': 1,
    'carousel-partners': 1
  });

  const handleNextSlide = (carouselId: string, maxSlides: number) => {
    setCarouselSlideIndices(prev => {
      const current = prev[carouselId] || 0;
      if (current >= maxSlides - 1) return prev; // Cannot slide right beyond the last slide
      setCarouselSlideDirections(d => ({ ...d, [carouselId]: 1 }));
      return {
        ...prev,
        [carouselId]: current + 1
      };
    });
  };

  const handlePrevSlide = (carouselId: string) => {
    setCarouselSlideIndices(prev => {
      const current = prev[carouselId] || 0;
      if (current <= 0) return prev; // Cannot slide left before the first slide
      setCarouselSlideDirections(d => ({ ...d, [carouselId]: -1 }));
      return {
        ...prev,
        [carouselId]: current - 1
      };
    });
  };

  // Filter 5 post covers (format 3:4) from DELIVERABLES_DATA
  const postCovers = DELIVERABLES_DATA.filter(
    item => item.id !== 'branding-covers' && item.id !== 'ticket-vip'
  ).slice(0, 5);

  // Menu items list matching screenshots layout
  const menuHighlights = [
    { id: '1', title: 'Миссия выполнима', subtitle: 'О проекте', img: '/assets/vk_menu_1.webp', gradient: 'from-[#033a36] to-[#011d1b]' },
    { id: '2', title: 'Купить билет', subtitle: 'Билеты', img: '/assets/vk_menu_2.webp', gradient: 'from-[#054b46] to-[#022624]' },
    { id: '3', title: 'Партнёры', subtitle: 'Спонсоры', img: '/assets/vk_menu_3.webp', gradient: 'from-[#022b28] to-[#001211]' },
    { id: '4', title: 'LSA 2023', subtitle: 'Архив', img: '/assets/vk_menu_4.webp', gradient: 'from-[#075953] to-[#022c29]' },
  ];

  return (
    <section className="py-20 relative bg-transparent border-t border-b border-white/10 overflow-hidden">
      {/* Background Frost Pattern */}
      <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 3D Silver Balloon Dog Asset - Desktop & Tablet */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden sm:block absolute sm:top-0 lg:-top-6 sm:right-2 lg:right-4 xl:right-6 z-0 sm:w-[190px] md:w-[260px] lg:w-[330px] xl:w-[370px] pointer-events-none select-none opacity-95"
        >
          <img
            src="/assets/hero-balloon-cyan.webp"
            alt="3D Silver Balloon Dog"
            className="w-full h-auto object-contain filter brightness-110 drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
          />
        </motion.div>

        {/* SECTION HEADER: Constrained max-w-xl so text wraps before the balloon dog */}
        <div className="max-w-xl md:max-w-xl lg:max-w-2xl mb-6 sm:mb-12 relative z-10">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-mono">
            Цифровая среда мероприятия
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Упаковка VK-сообщества
          </h2>
          <p className="max-w-xl text-base sm:text-lg text-white/75 font-light leading-relaxed">
            Комплексная визуальная упаковка и&nbsp;брендинг официального VK-сообщества события. 
            Создание целостного графического оформления проекта, погружающего участников 
            в&nbsp;таинственную атмосферу закрытого праздника как на&nbsp;широкоформатных экранах, 
            так и&nbsp;в&nbsp;динамичной мобильной среде.
          </p>
        </div>

        {/* Mobile Balloon Dog: Positioned between text and the first card, bottom half tucks behind the iPad card */}
        <div className="sm:hidden relative w-full flex justify-center -mb-16 z-0 pointer-events-none select-none">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 2, -1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[170px]"
          >
            <img
              src="/assets/hero-balloon-cyan.webp"
              alt="3D Silver Balloon Dog"
              className="w-full h-auto object-contain filter brightness-110 drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </div>

        {/* TOP LAYOUT: REALISTIC TABLET (LEFT) + REALISTIC SMARTPHONE (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch relative z-10">

          {/* LEFT COLUMN: REALISTIC TABLET (iPAD PRO) (8 COLS) */}
          <div className="lg:col-span-8 frost-card-glass border border-silver/30 p-5 sm:p-7 silver-contour shadow-2xl flex flex-col justify-between h-full">
            {/* Header Tag - Divider Removed */}
            <div className="flex items-center mb-5 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2.5">
                <Monitor className="w-4 h-4 text-silver-bright" />
                <span className="uppercase tracking-wider font-semibold text-white text-sm">
                  Десктопная версия
                </span>
              </div>
            </div>

            {/* REALISTIC TABLET SHOWCASE VIEWPORT */}
            <div className="flex-1 flex flex-col justify-center my-auto py-2">
              <div className="w-full relative select-none">
                {/* Aluminum Unibody Space Grey Frame with Superellipse */}
                <div className="bg-gradient-to-br from-[#2c2d32] via-[#1a1b1f] to-[#111215] pt-3.5 pb-2.5 px-2.5 sm:pt-4 sm:pb-3.5 sm:px-3.5 device-squircle-tablet-outer border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] relative">
                  
                  {/* Subtle Top Bezel Camera Dot (Centered vertically in top frame bezel) */}
                  <div className="absolute top-[7px] sm:top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#050608] border border-white/10 flex items-center justify-center pointer-events-none">
                    <div className="w-0.5 h-0.5 rounded-full bg-[#1b3a57]" />
                  </div>

                  {/* Tablet Display Screen with Superellipse */}
                  <div className="device-squircle-tablet-screen overflow-hidden bg-[#edeef0] border border-black/40 shadow-inner relative">

                    {/* AUTHENTIC VK INTERFACE RECONSTRUCTION - BROWSER URL BAR REMOVED */}
                    <div className="bg-[#edeef0] text-[#000000] font-sans select-none">
                      
                      {/* DESKTOP COVER (1920x640 ratio: 3:1) */}
                      <div className="relative w-full aspect-[1920/640] bg-gradient-to-r from-[#032e2b] via-[#05423f] to-[#011a19] overflow-hidden flex items-center justify-center">
                        <img 
                          src="/assets/vk_desktop_cover.webp" 
                          alt="Desktop Cover" 
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          onLoad={() => setDesktopCoverLoaded(true)}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            setDesktopCoverLoaded(false);
                          }}
                        />
                        {!desktopCoverLoaded && (
                          <>
                            <div className="absolute inset-0 frost-ice-pattern opacity-25 pointer-events-none" />
                            <div className="relative z-10 w-full text-center my-auto pointer-events-none p-4">
                              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-300 font-mono font-bold mb-0.5 drop-shadow">
                                ЮРИДИЧЕСКИЙ ИНСТИТУТ ТГУ ◇ LSA 2024
                              </div>
                              <h3 className="font-serif-luxury text-base sm:text-2xl text-white font-extrabold tracking-tight drop-shadow-md">
                                «Только не проболтайся!»
                              </h3>
                            </div>
                          </>
                        )}
                      </div>

                      {/* MAIN COMMUNITY HEADER CARD - ALIGNED WITH TITLE/STATUS & BUTTONS ACCORDING TO USER SKETCH */}
                      <div className="bg-white px-4 py-3 sm:py-3.5 relative border-b border-[#dce1e6]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left: Avatar + Title & Status */}
                          <div className="flex items-center gap-3">
                            <div className="relative -mt-8 sm:-mt-11 shrink-0 z-20">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white overflow-hidden bg-[#021817] shadow-md relative">
                                <img 
                                  src="/assets/vk_avatar.webp" 
                                  alt="Avatar" 
                                  className="absolute inset-0 w-full h-full object-cover z-10"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center font-serif-luxury font-bold text-white text-base">
                                  LSA
                                </span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-[#2c2d2e] leading-snug">
                                Law Student Awards 2024 | ЮИ ТГУ
                              </h4>
                              <div className="flex items-center gap-1 text-[11px] text-[#2688eb] mt-0.5 font-medium">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span className="text-[#818c99]">Вы подписаны</span>
                              </div>
                              <div className="text-[10px] text-[#818c99] mt-0.5">
                                Быстро отвечает · время ответа — 1 минута
                              </div>
                            </div>
                          </div>

                          {/* Right: Action Buttons (Lifted and aligned with community title row) */}
                          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                            <div className="px-3.5 py-1.5 bg-[#2688eb] text-white font-medium text-xs rounded-md shadow-2xs">
                              Сообщение
                            </div>
                            <div className="p-1.5 bg-[#edf0f2] text-[#2688eb] rounded-md">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                            <div className="px-2.5 py-1.5 bg-[#edf0f2] text-[#2688eb] font-medium text-xs rounded-md flex items-center gap-1">
                              <span>Ещё</span>
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* BELOW HEADER: MENU HIGHLIGHTS (LEFT) + SIDEBAR (RIGHT) */}
                      <div className="p-3 bg-[#edeef0] grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                        
                        {/* Highlights (4 cards, header text removed as requested) */}
                        <div className="md:col-span-8 bg-white rounded-lg p-3 border border-[#e3e5e8] shadow-2xs flex flex-col justify-center">
                          <div className="grid grid-cols-4 gap-2">
                            {menuHighlights.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex flex-col">
                                <div className={`aspect-[376/256] w-full rounded-md bg-gradient-to-br ${item.gradient} overflow-hidden relative border border-[#e3e5e8] shadow-2xs`}>
                                  <img 
                                    src={item.img} 
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="text-[9px] font-medium text-[#2c2d2e] mt-1.5 line-clamp-1 text-center">
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sidebar Blocks */}
                        <div className="md:col-span-4 flex flex-col justify-between gap-2">
                          <div className="bg-white rounded-lg p-2.5 border border-[#e3e5e8] flex items-center gap-2 text-xs font-semibold text-[#2c2d2e] shadow-2xs">
                            <MessageSquare className="w-3.5 h-3.5 text-[#2688eb]" />
                            <span>Перейти в канал</span>
                          </div>
                          <div className="bg-white rounded-lg p-2.5 border border-[#e3e5e8] space-y-1.5 text-xs text-[#2c2d2e] shadow-2xs flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                              <Settings className="w-3.5 h-3.5 text-[#818c99]" />
                              <span>Управление</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#818c99]">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Сообщения</span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Realistic Screen Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Realistic Ambient Floor Shadow */}
                <div className="w-[94%] h-4 mx-auto bg-black/85 blur-lg rounded-full -mt-2" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REALISTIC SMARTPHONE (4 COLS) - TRUE 19.5:9 iPHONE PROPORTIONS */}
          <div className="lg:col-span-4 frost-card-glass border border-silver/30 p-5 sm:p-7 silver-contour shadow-2xl flex flex-col justify-between h-full">
            {/* Header Tag - Divider Removed */}
            <div className="flex items-center mb-5 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-silver-bright" />
                <span className="uppercase tracking-wider font-semibold text-white text-sm">
                  Мобильная версия
                </span>
              </div>
            </div>

            {/* REALISTIC SMARTPHONE SHOWCASE (TRUE 19:9 RATIO & EXACT VK SCREENSHOT LAYOUT) */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
              <div className="w-[195px] sm:w-[215px] relative select-none">
                
                {/* Titanium / Space Black Realistic Outer Frame with Superellipse */}
                <div className="bg-gradient-to-b from-[#38393e] via-[#1f2025] to-[#121316] p-[2.5px] device-squircle-phone-outer border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] relative">
                  
                  {/* Inner Dark Bezel with Superellipse */}
                  <div className="p-[2.5px] bg-[#0c0d0f] device-squircle-phone-bezel">
                    
                    {/* Screen Canvas (Dark VK Mobile Theme) with STRICT 9:19 ASPECT RATIO */}
                    <div className="bg-[#121213] device-squircle-phone-screen overflow-hidden text-white relative flex flex-col justify-between font-sans border border-black/80 shadow-inner w-full aspect-[9/19]">
                      
                      {/* TOP SECTION: LIVE MOBILE COVER EXTENDING DOWN TO ACTION BUTTONS (~53% OF SCREEN) */}
                      <div className="relative h-[53%] w-full overflow-hidden flex flex-col justify-between shrink-0 p-2 pb-2">
                        {/* Mobile Cover Image */}
                        <img 
                          src="/assets/vk_mobile_cover.webp" 
                          alt="Mobile Cover" 
                          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                          onLoad={() => setMobileCoverLoaded(true)}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            setMobileCoverLoaded(false);
                          }}
                        />
                        {/* Gradient scrim for optimal text & button legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent via-40% to-black/90 pointer-events-none" />

                        {/* Top Bar with Dynamic Island (Pill) and VK Controls */}
                        <div className="relative z-30 flex flex-col items-center">
                          {/* Dynamic Island: заметно крупнее по ширине и высоте (~48px x ~14px) */}
                          <div className="w-12 h-3.5 bg-black rounded-full flex items-center justify-between px-2 shadow-xs border border-white/10 shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#0d1219] flex items-center justify-center">
                              <div className="w-0.5 h-0.5 rounded-full bg-[#1b3a57]" />
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0c10]" />
                          </div>

                          {/* Top Bar Navigation (Left: ArrowLeft, Right: Settings & MoreVertical) */}
                          <div className="w-full flex items-center justify-between pt-1">
                            <button className="text-white drop-shadow p-0.5">
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center gap-2 text-white drop-shadow pr-0.5">
                              <Settings className="w-3.5 h-3.5" />
                              <MoreVertical className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Central Fallback (shown only if image not loaded) */}
                        {!mobileCoverLoaded && (
                          <div className="relative z-10 text-center my-auto pointer-events-none py-2">
                            <div className="text-[7.5px] uppercase font-mono tracking-widest text-emerald-300 font-bold drop-shadow">
                              ЮИ ТГУ // LSA 2024
                            </div>
                            <h4 className="font-serif-luxury text-sm font-bold text-white mt-0.5 drop-shadow-md">
                              «Только не проболтайся!»
                            </h4>
                          </div>
                        )}

                        {/* Community Header Over Cover: Avatar, Title, Action Buttons (плотные отступы, смещены вниз чтобы не перекрывать слово 'юриста') */}
                        <div className="relative z-20 mt-auto">
                          {/* Circular Avatar */}
                          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[#02211f] shadow-md relative">
                            <img 
                              src="/assets/vk_avatar.webp" 
                              alt="Avatar" 
                              className="absolute inset-0 w-full h-full object-cover z-10"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center font-serif-luxury font-bold text-white text-xs">
                              LSA
                            </span>
                          </div>

                          {/* Title: 1-я строка: Law Student Awards, 2-я строка: 2024 | ЮИ ТГУ */}
                          <h4 className="text-[12.5px] sm:text-[13px] font-bold text-white leading-[1.1] mt-1 drop-shadow-sm">
                            <span>Law Student Awards</span>
                            <br />
                            <span>2024 | ЮИ ТГУ</span>
                          </h4>

                          {/* Action Buttons: Сообщения, Продвижение, ↗ (плотный отступ mt-1, компактная высота h-5.5) */}
                          <div className="flex items-center gap-1 mt-1 w-full">
                            <div className="flex-1 h-5.5 bg-white text-black font-semibold text-[8px] rounded-md flex items-center justify-center shadow-xs">
                              Сообщения
                            </div>
                            <div className="flex-1 h-5.5 bg-white text-black font-semibold text-[8px] rounded-md flex items-center justify-center shadow-xs">
                              Продвижение
                            </div>
                            <div className="w-5.5 h-5.5 bg-white text-black rounded-md flex items-center justify-center shadow-xs shrink-0">
                              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM SECTION: VK COMMUNITY BODY (Starts right below cover & buttons) */}
                      <div className="flex-1 flex flex-col justify-between bg-[#121213] px-2.5 pt-2 pb-0.5 min-h-0">
                        {/* 1. Community Info & Status (ещё более крупный кегль для комфортного чтения) */}
                        <div className="space-y-0.5">
                          {/* Subscribers */}
                          <div className="text-[9.5px] sm:text-[10px] text-[#909499] font-normal leading-tight">
                            Вы подписаны · <span className="text-white font-medium">1 280 подписчиков</span>
                          </div>

                          {/* Description filling available space */}
                          <div className="text-[9px] sm:text-[9.5px] text-white/95 leading-snug">
                            <span className="inline-block mr-1 opacity-70">⬛</span>
                            <span>LSA 2024 // ДЕНЬ ЮРИСТА ЮИ ТГУ. Синтез права, медиа и кейс-практики... </span>
                            <span className="text-[#2688eb] font-semibold cursor-pointer">Ещё</span>
                          </div>
                        </div>

                        {/* 2. Menu Highlights row - 4 items placed cleanly */}
                        <div className="py-1">
                          <div className="grid grid-cols-4 gap-1.5">
                            {menuHighlights.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex flex-col">
                                <div className={`aspect-[376/256] w-full rounded-md bg-gradient-to-br ${item.gradient} overflow-hidden relative border border-white/10 shadow-xs`}>
                                  <img 
                                    src={item.img} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="text-[6px] font-medium text-white/80 mt-1 line-clamp-1 text-center">
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3. Teaser Card */}
                        <div className="p-1.5 bg-[#222223] rounded-md border border-white/5 text-[7.5px] font-medium text-white/90 flex items-center gap-1.5">
                          <span className="opacity-70 text-[8px]">⬛</span>
                          <span className="truncate">ВЫБЕРИ СВОЙ ВЕКТОР // LSA 2024</span>
                        </div>

                        {/* 4. Bottom Navigation Bar (safely padded from rounded bottom corners, icons never clipped) */}
                        <div className="-mx-2.5 -mb-0.5 px-4.5 pt-1.5 pb-2 bg-[#1a1a1c] border-t border-white/10 flex items-center justify-between text-[#76787a]">
                          <Home className="w-3.5 h-3.5 text-white shrink-0" />
                          <Search className="w-3.5 h-3.5 shrink-0" />
                          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <User className="w-3.5 h-3.5 shrink-0" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Ambient Floor Shadow */}
                <div className="w-[140px] h-3 mx-auto bg-black/85 blur-md rounded-full -mt-1" />
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BLOCK: MEDIA CONTENT (МЕДИАКОНТЕНТ) */}
        <div className="pt-12 border-t border-white/10">
          <div className="max-w-3xl mb-10">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
              Публикации для социальных сетей
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white leading-tight">
              Медиаконтент
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Визуальный ритм промо-кампании, раскрывающийся через серию анонсирующих 
              постов-обложек и&nbsp;многостраничных каруселей в&nbsp;VK-сообществе. Каждый 
              материал последовательно выстраивает интригующий нарратив, вовлекая аудиторию 
              в&nbsp;концепцию и&nbsp;детали предстоящего закрытого события.
            </p>
          </div>

          {/* SUBSECTION 1: 5 POST COVERS (FORMAT 3:4) */}
          <div className="mb-16">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-silver/20 text-xs font-mono text-white/60">
              <span className="text-silver-bright font-semibold uppercase tracking-wider">
                1. Посты-обложки формата 3:4 (1080 × 1350 px)
              </span>
            </div>

            {/* 5 POST COVERS: 2 columns on mobile, 5 columns on desktop, centered */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-center">
              {postCovers.map((item, idx) => {
                // Realistic varied engagement metrics for each post
                const engagementStats = [
                  { likes: 247, comments: 38, reposts: 56 },
                  { likes: 312, comments: 45, reposts: 78 },
                  { likes: 429, comments: 62, reposts: 114 },
                  { likes: 384, comments: 89, reposts: 92 },
                  { likes: 295, comments: 51, reposts: 67 }
                ][idx] || { likes: 220 + idx * 30, comments: 24 + idx * 5, reposts: 35 + idx * 8 };

                return (
                  <div
                    key={item.id}
                    className={`frost-card-glass border border-silver/30 hover:border-silver/80 transition-all duration-300 flex flex-col justify-between silver-contour group shadow-lg select-none ${
                      idx === 4 ? 'col-span-2 max-w-[calc(50%-0.375rem)] mx-auto w-full md:col-span-1 md:max-w-none' : ''
                    }`}
                  >
                    {/* VK Post Header with Authentic Avatar */}
                    <div className="p-2 sm:p-2.5 bg-[#021a18] border-b border-white/10 flex items-center justify-between text-[11px] rounded-t-lg">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <img 
                          src="/assets/vk_avatar.webp" 
                          alt="LSA Avatar" 
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-silver/40 shadow-sm shrink-0"
                        />
                        <span className="font-semibold text-white text-[9.5px] sm:text-[10px] truncate max-w-[90px] sm:max-w-[120px]">LSA 2024</span>
                      </div>
                    </div>

                    {/* 3:4 Artwork with uploaded image only */}
                    <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${item.bgGradient} overflow-hidden border-b border-white/10`}>
                      <img 
                        src={`/assets/vk_post_${idx + 1}.webp`} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* VK Post Footer Social Engagement Bar with White 3D Minimal Heart & Varied Counts */}
                    <div className="p-2 sm:p-2.5 bg-[#011413] flex items-center justify-between text-[9px] sm:text-[10px] text-white/60 font-mono rounded-b-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="flex items-center gap-1 text-white/90">
                          {/* Minimal 3D White Heart */}
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24" fill="none">
                            <defs>
                              <linearGradient id={`white-heart-3d-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#e2f1f2" />
                                <stop offset="100%" stopColor="#b4cbce" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              fill={`url(#white-heart-3d-${idx})`} 
                              stroke="rgba(255,255,255,0.7)" 
                              strokeWidth="0.5"
                            />
                          </svg>
                          <span>{engagementStats.likes}</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-white transition-colors">
                          <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                          <span>{engagementStats.comments}</span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                        <span>{engagementStats.reposts}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUBSECTION 2: CAROUSEL POSTS */}
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-silver/20 text-xs font-mono text-white/60">
              <span className="text-silver-bright font-semibold uppercase tracking-wider">
                2. Посты-карусели формата 3:4 (1080 × 1350 px)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 items-stretch w-full justify-center">
              {VK_CAROUSEL_POSTS.map((carousel, cIdx) => {
                const currentSlideIndex = carouselSlideIndices[carousel.id] || 0;
                const activeSlide = carousel.slides[currentSlideIndex];

                return (
                  <div
                    key={carousel.id}
                    className={`frost-card-glass border border-silver/30 hover:border-silver/80 transition-all duration-300 flex flex-col justify-between silver-contour group shadow-xl ${
                      cIdx === 2 ? 'col-span-2 max-w-[calc(50%-0.375rem)] mx-auto w-full md:col-span-1 md:max-w-none' : ''
                    }`}
                  >
                    {/* VK Carousel Post Header */}
                    <div className="p-2 sm:p-3 bg-[#021a18] border-b border-white/10 flex items-center justify-between text-[11px] rounded-t-lg">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img 
                          src="/assets/vk_avatar.webp" 
                          alt="LSA Avatar" 
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-silver/40"
                        />
                        <span className="font-semibold text-white text-[10px] sm:text-[11px]">LSA 2024</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-silver-bright font-medium">
                        LSA 2024
                      </span>
                    </div>

                    {/* Vertical 3:4 Carousel Artwork Viewport with Internal Arrow Navigation & Top-Right Counter */}
                    <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${activeSlide.bgGradient} p-3 sm:p-5 flex flex-col justify-between overflow-hidden border-b border-white/10 group select-none rounded-b-lg`}>
                      {/* Swipeable Slide Content with Motion Animation */}
                      <AnimatePresence initial={false} custom={carouselSlideDirections[carousel.id] || 1} mode="popLayout">
                        <motion.div
                          key={currentSlideIndex}
                          custom={carouselSlideDirections[carousel.id] || 1}
                          variants={{
                            enter: (direction: number) => ({
                              x: direction > 0 ? '100%' : '-100%',
                              opacity: 0
                            }),
                            center: {
                              x: 0,
                              opacity: 1
                            },
                            exit: (direction: number) => ({
                              x: direction < 0 ? '100%' : '-100%',
                              opacity: 0
                            })
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: 'spring', stiffness: 320, damping: 32 },
                            opacity: { duration: 0.22 }
                          }}
                          className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-5 pointer-events-none"
                        >
                          {/* Photo without transparency / dark overlay */}
                          {carousel.id === 'carousel-dresscode' && (
                            <img 
                              src={`/assets/vk_carousel_dresscode_${currentSlideIndex + 1}.webp`} 
                              alt={activeSlide.title || 'Slide'} 
                              className="absolute inset-0 w-full h-full object-cover z-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}

                          {carousel.id === 'carousel-partners' && (
                            <img 
                              src={`/assets/vk_carousel_partners_${currentSlideIndex + 1}.webp`} 
                              alt={activeSlide.title || 'Slide'} 
                              className="absolute inset-0 w-full h-full object-cover z-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}

                          {carousel.id === 'carousel-headliners' && (
                            <img 
                              src={`/assets/vk_carousel_headliners_${currentSlideIndex + 1}.webp`} 
                              alt={activeSlide.title || 'Slide'} 
                              className="absolute inset-0 w-full h-full object-cover z-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}

                          <div className="absolute inset-0 frost-ice-pattern opacity-10 pointer-events-none z-[1]" />

                          {/* Top Header inside Artwork: LSA 2024 Left, Slide Counter Right */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="font-serif-luxury text-[11px] sm:text-xs font-bold text-silver-bright drop-shadow-md">
                              LSA 2024
                            </span>
                            
                            {/* Slide Counter Placed Inside Top-Right */}
                            <div className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-[9.5px] sm:text-[10px] font-mono text-white tracking-widest font-semibold shadow-md">
                              {currentSlideIndex + 1}/{carousel.slides.length}
                            </div>
                          </div>

                          {/* Center Slide Text Content (Only rendered if title/text exists, slides 2-6 in partners are clean) */}
                          {(activeSlide.title || activeSlide.text || activeSlide.subtitle) && (
                            <div className="relative z-10 text-center my-auto px-2 sm:px-5">
                              {activeSlide.subtitle && (
                                <div className="text-[9.5px] sm:text-[10px] uppercase tracking-widest text-silver-bright font-mono mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                                  {activeSlide.subtitle}
                                </div>
                              )}
                              {activeSlide.title && (
                                <h5 className="font-serif-luxury text-base sm:text-xl lg:text-2xl text-white font-bold leading-tight mb-1.5 sm:mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                                  {activeSlide.title}
                                </h5>
                              )}
                              {activeSlide.text && (
                                <>
                                  <div className="w-10 sm:w-12 h-[1.5px] bg-white/60 mx-auto mb-2 sm:mb-2.5 shadow-md" />
                                  <p className="text-[11px] sm:text-xs lg:text-[13px] text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] max-w-xs mx-auto">
                                    {activeSlide.text}
                                  </p>
                                </>
                              )}
                            </div>
                          )}

                          {/* Bottom Artwork Meta (Only if text present, keeping slides 2-6 pure) */}
                          {(activeSlide.title || activeSlide.text) && (
                            <div className="relative z-10 flex justify-between items-center text-[8.5px] sm:text-[9px] font-mono text-white/80 pt-1.5 sm:pt-2 border-t border-white/30 drop-shadow">
                              <span>FACE Club Томск</span>
                              <span className="text-white font-semibold">5 декабря</span>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Internal Navigation Arrows directly on sides inside card with boundary disable */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSlideIndex > 0) {
                            handlePrevSlide(carousel.id);
                          }
                        }}
                        disabled={currentSlideIndex === 0}
                        aria-label="Предыдущий слайд"
                        className={`absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                          currentSlideIndex === 0
                            ? 'bg-black/20 text-white/20 border border-white/10 cursor-not-allowed opacity-40'
                            : 'bg-black/60 hover:bg-black/90 text-white border border-white/40 backdrop-blur-sm hover:scale-110 active:scale-95 cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 -ml-0.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSlideIndex < carousel.slides.length - 1) {
                            handleNextSlide(carousel.id, carousel.slides.length);
                          }
                        }}
                        disabled={currentSlideIndex === carousel.slides.length - 1}
                        aria-label="Следующий слайд"
                        className={`absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                          currentSlideIndex === carousel.slides.length - 1
                            ? 'bg-black/20 text-white/20 border border-white/10 cursor-not-allowed opacity-40'
                            : 'bg-black/60 hover:bg-black/90 text-white border border-white/40 backdrop-blur-sm hover:scale-110 active:scale-95 cursor-pointer'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -mr-0.5" />
                      </button>
                    </div>

                    {/* Engagement Bar with Minimal 3D White Heart */}
                    <div className="p-3 bg-[#011413] flex items-center justify-between text-xs font-mono text-white/60">
                      <div className="flex items-center gap-4">
                        <span className="text-white/90 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24" fill="none">
                            <defs>
                              <linearGradient id={`white-heart-carousel-${carousel.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#e2f1f2" />
                                <stop offset="100%" stopColor="#b4cbce" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              fill={`url(#white-heart-carousel-${carousel.id})`} 
                              stroke="rgba(255,255,255,0.7)" 
                              strokeWidth="0.5"
                            />
                          </svg>
                          <span>{carousel.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-white/70" /> {carousel.comments}
                        </span>
                      </div>
                      <span className="text-white/80 flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-white/70" /> {carousel.reposts}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
