import React from 'react';
import { 
  ArrowUp, 
  Phone, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';
import { TelegramIcon, VkIcon, MaxIcon, WhatsAppIcon, HeadHunterIcon } from './SocialIcons';
import { DiamondSeparator } from './DiamondSeparator';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenPolicy?: () => void;
  onOpenConsent?: () => void;
}

const NAV_COLUMNS = [
  [
    { title: 'Контекст', href: '#context' },
    { title: 'Концепция', href: '#concept' },
    { title: 'Сценарий', href: '#story' },
    { title: 'Айдентика', href: '#identity' },
  ],
  [
    { title: 'Носители', href: '#deliverables' },
    { title: 'Пространство FACE', href: '#spatial' },
    { title: 'Итоги', href: '#results' },
    { title: 'Контакты', href: '#contacts' },
  ],
];

const ALL_CASES = [
  { title: 'Тьюторская служба ТГУ', href: '/tutor/', isCurrent: false },
  { title: 'День юриста 2024', href: '/law-day/', isCurrent: true },
  { title: 'Книга народов Верхнекетья', href: '/upperket/', isCurrent: false },
  { title: 'Волонтёрская организация «Инициатива»', href: '/#projects', isCurrent: false },
  { title: 'Правовая комиссия ТГУ', href: '/#projects', isCurrent: false },
];

export const Footer: React.FC<FooterProps> = ({ 
  onScrollToTop,
  onOpenPolicy,
  onOpenConsent,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="site-footer" className="border-t border-silver/30 bg-gradient-to-b from-[#010c0b]/90 via-[#010707]/95 to-[#000303]/98 backdrop-blur-xl pt-10 sm:pt-14 pb-8 sm:pb-12 relative overflow-hidden font-sans-clean">
      {/* Delicate Siberian Frost Texture Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/texture-frost.avif')" }}
      />
      <div className="absolute inset-0 frost-ice-pattern opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Верхняя строка: Логотип и Кнопка «Наверх» */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-silver/20 pb-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <a href="/" className="inline-block shrink-0" aria-label="Михаил Бачинский • На главную">
              <img
                src="/assets/icons/logo-white.svg"
                alt="Михаил Бачинский"
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logo-white.svg';
                }}
              />
            </a>
            {/* Soft, subtle vertical divider */}
            <div className="border-l border-white/10 pl-4 sm:pl-5">
              {/* Clean sans typography with no text outline or stroke */}
              <div className="text-sm sm:text-base font-semibold text-white tracking-wider uppercase font-sans-clean">
                Law Student Awards 2024
              </div>
              <div className="text-xs text-white/60 font-mono flex items-center gap-1.5 mt-0.5">
                <span>День юриста</span>
                <DiamondSeparator className="!mx-1 !w-1 !h-1" />
                <span>ЮИ&nbsp;ТГУ</span>
                <DiamondSeparator className="!mx-1 !w-1 !h-1" />
                <span>Дизайн-кейс</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToTop}
            data-tooltip="Вернуться к началу страницы"
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 hover:border-silver text-xs font-medium text-white transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 silver-contour-subtle uppercase tracking-wider group hover:shadow-[0_0_20px_rgba(215,235,238,0.25)]"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5 text-silver-bright group-hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 3 Остроугольные Панели (Навигация, Дизайн-кейсы, Контакты) - items-stretch for uniform card height */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Панель 1: Навигация по кейсу */}
          <div className="md:col-span-2 lg:col-span-4 frost-card-glass border border-silver/40 p-5 sm:p-6 shadow-lg silver-contour h-full flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-4">
                <span className="text-xs text-silver-bright font-mono uppercase tracking-wider">
                  Навигация
                </span>
                <span className="text-xs font-mono text-white/40">
                  8 разделов
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-white/80">
                {NAV_COLUMNS.map((col, colIndex) => (
                  <ul key={colIndex} className="space-y-2">
                    {col.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="hover:text-silver-bright transition-colors duration-150 block py-0.5"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          {/* Панель 2: Дизайн-кейсы */}
          <div className="md:col-span-2 lg:col-span-4 frost-card-glass border border-silver/40 p-5 sm:p-6 shadow-lg silver-contour h-full flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-4">
                <span className="text-xs text-silver-bright font-mono uppercase tracking-wider">
                  Дизайн-кейсы
                </span>
                <span className="text-xs font-mono text-white/40">
                  4 проекта
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm">
                {ALL_CASES.map((item) => (
                  <li key={item.title}>
                    {item.isCurrent ? (
                      <div className="py-1 flex items-center justify-between text-white font-medium">
                        <span className="text-white">{item.title}</span>
                        <span className="text-[9.5px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0">
                          Текущий
                        </span>
                      </div>
                    ) : (
                      <a 
                        href={item.href} 
                        className="py-1 text-white/80 hover:text-white transition-colors flex items-center justify-between gap-3 group"
                      >
                        <span className="group-hover:text-silver-bright transition-colors">{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors shrink-0" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Панель 3: Контакты & Соцсети с выверенными отступами стрелок */}
          <div className="md:col-span-2 lg:col-span-4 frost-card-glass border border-silver/40 p-5 sm:p-6 shadow-lg silver-contour h-full flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-4">
                <span className="text-xs text-silver-bright font-mono uppercase tracking-wider">
                  Контакты
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-white/80">
                {/* Телефон и Почта */}
                <div className="space-y-2">
                  <div>
                    <a href="tel:+79528842464" className="hover:text-white transition-colors flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap">+7 (952) 884-24-64</span>
                    </a>
                  </div>
                  <div>
                    <a href="mailto:mikhail.bachinsky2004@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="text-xs break-all">mikhail.bachinsky2004@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Кнопки соцсетей - Точные отступы между стрелкой и текстом */}
                <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://t.me/mikhail_bachinsky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.12] text-white transition-colors duration-150 flex items-center justify-between gap-2.5 border border-silver/40 silver-contour-subtle group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <TelegramIcon className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap text-xs font-medium">Telegram</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 ml-1.5 transition-colors" />
                  </a>

                  <a
                    href="https://vk.com/mikhail_bachinsky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.12] text-white transition-colors duration-150 flex items-center justify-between gap-2.5 border border-silver/40 silver-contour-subtle group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <VkIcon className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap text-xs font-medium">ВКонтакте</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 ml-1.5 transition-colors" />
                  </a>

                  <a
                    href="https://wa.me/79528842464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.12] text-white transition-colors duration-150 flex items-center justify-between gap-2.5 border border-silver/40 silver-contour-subtle group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap text-xs font-medium">WhatsApp</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 ml-1.5 transition-colors" />
                  </a>

                  <a
                    href="https://max.im"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.12] text-white transition-colors duration-150 flex items-center justify-between gap-2.5 border border-silver/40 silver-contour-subtle group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MaxIcon className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap text-xs font-medium">MAX</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 ml-1.5 transition-colors" />
                  </a>

                  <a
                    href="https://hh.ru/resume/mikhail_bachinsky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.12] text-white transition-colors duration-150 flex items-center justify-between gap-2.5 border border-silver/40 silver-contour-subtle col-span-1 sm:col-span-2 group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <HeadHunterIcon className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="whitespace-nowrap text-xs font-medium">HeadHunter</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 ml-1.5 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Нижняя строка: Копирайт и юридические документы */}
        <div className="pt-6 border-t border-silver/20 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-light">
          <div>
            © 2026&nbsp;Михаил Михайлович Бачинский. Графический дизайн, айдентика и&nbsp;арт-дирекшн.
          </div>
          <div className="flex items-center gap-4 text-white/50">
            {onOpenPolicy && (
              <button
                type="button"
                onClick={onOpenPolicy}
                className="hover:text-white transition-colors underline cursor-pointer"
              >
                Политика конфиденциальности
              </button>
            )}
            {onOpenConsent && (
              <button
                type="button"
                onClick={onOpenConsent}
                className="hover:text-white transition-colors underline cursor-pointer"
              >
                Согласие на обработку данных
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

