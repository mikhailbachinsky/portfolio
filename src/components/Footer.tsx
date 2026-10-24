import React from 'react';
import { 
  ArrowUp, 
  Phone, 
  Mail, 
  ArrowUpRight,
  MapPin
} from 'lucide-react';
import { TelegramIcon, VkIcon, MaxIcon, WhatsAppIcon, HeadHunterIcon } from './SocialIcons';

interface FooterProps {
  onOpenPolicy?: () => void;
  onOpenConsent?: () => void;
}

// 13 разделов кейса, распределённых строго по колонкам сверху вниз
const NAV_COLUMNS = [
  // Колонка 1
  [
    { title: 'Контекст', href: '#goals-section' },
    { title: 'Задача', href: '#goals-section' },
    { title: 'Решение', href: '#goals-section' },
    { title: 'Цвета', href: '#colors-section' },
    { title: 'Типографика', href: '#typography-section' },
  ],
  // Колонка 2
  [
    { title: 'Паттерны', href: '#pattern-section' },
    { title: 'Иконки', href: '#icons-section' },
    { title: 'Иллюстрации', href: '#illustrations-section' },
    { title: 'Маскот', href: '#mascot-section' },
  ],
  // Колонка 3
  [
    { title: 'Внедрение', href: '#implementation-section' },
    { title: 'Цифровая среда', href: '#digital-environment-section' },
    { title: 'Физическая среда', href: '#physical-environment-section' },
    { title: 'Итоги', href: '#conclusion-section' },
  ],
];

const ALL_CASES = [
  { title: 'Тьюторская служба ТГУ', href: '/tutor/', isCurrent: true },
  { title: 'День юриста 2024', href: '/law-day/', isCurrent: false },
  { title: 'Книга народов Верхнекетья', href: '/upperket/', isCurrent: false },
  { title: 'Волонтёрская организация «Инициатива»', href: '/#projects', isCurrent: false },
  { title: 'Правовая комиссия ТГУ', href: '/#projects', isCurrent: false },
];

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onOpenConsent,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="site-footer" className="w-full bg-[#141414] text-white border-t border-black/20 pt-10 sm:pt-14 pb-8 sm:pb-12 mt-12 sm:mt-16">
      {/* Window-контейнер на всю ширину экрана */}
      <div className="w-full px-3 sm:px-4 lg:px-5 space-y-5 sm:space-y-6">
        
        {/* =========================================================================
            ВЕРХНЯЯ СТРОКА: ЛОГОТИП И КНОПКА «НАВЕРХ» (БЕЗ ДИВАЙДЕРА)
            ========================================================================= */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <a href="/" className="inline-block" aria-label="Михаил Бачинский • На главную">
              <img
                src="/assets/icons/logo-white.svg"
                alt="Михаил Бачинский"
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logo-white.svg';
                }}
              />
            </a>
            <div className="border-l border-white/10 pl-4 sm:pl-5">
              <div className="text-sm sm:text-base font-semibold text-white tracking-tight">
                Тьюторская служба ТГУ
              </div>
              <div className="text-xs text-white/50 font-mono">
                Дизайн-кейс визуальной системы
              </div>
            </div>
          </div>

          {/* Кнопка «Наверх» */}
          <button
            type="button"
            onClick={scrollToTop}
            data-tooltip="Вернуться к началу страницы"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 shadow-2xs group"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* =========================================================================
            ЕДИНЫЙ BENTO-РЯД НА ШИРОКИХ ЭКРАНАХ:
            1. НАВИГАЦИЯ (5 колонок)
            2. ДИЗАЙН-КЕЙСЫ (3 колонки)
            3. КОНТАКТЫ (4 колонки)
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* BENTO-КАРТОЧКА 1 (Навигация): Поколоночная навигация по 13 разделам кейса */}
          <div className="md:col-span-2 lg:col-span-5 xl:col-span-5 rounded-[24px] sm:rounded-[32px] bg-white/[0.04] border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              {/* Заголовок навигации */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                <span className="text-xs text-white/50 font-mono">
                  (навигация)
                </span>
                <span className="text-xs font-mono text-white/35">
                  13 разделов
                </span>
              </div>

              {/* Поколоночное чтение сверху вниз: 3 колонки списков */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm text-white/75">
                {NAV_COLUMNS.map((col, colIndex) => (
                  <ul key={colIndex} className="space-y-2.5">
                    {col.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="hover:text-white transition-colors duration-150 block py-0.5"
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

          {/* BENTO-КАРТОЧКА 2 (Дизайн-кейсы): Вторым блоком по центру */}
          <div className="md:col-span-1 lg:col-span-3 xl:col-span-3 rounded-[24px] sm:rounded-[32px] bg-white/[0.04] border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                <span className="text-xs text-white/50 font-mono">
                  (дизайн-кейсы)
                </span>
                <span className="text-xs font-mono text-white/35">
                  4 проекта
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                {ALL_CASES.map((item) => (
                  <div 
                    key={item.title}
                    className={`rounded-xl border p-2.5 sm:p-3 transition-all duration-150 ${
                      item.isCurrent
                        ? 'bg-white/[0.08] border-[#8FE06E]/40 shadow-2xs'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/5'
                    }`}
                  >
                    {item.isCurrent ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white font-medium truncate">
                          • {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8FE06E]/20 text-[#8FE06E] shrink-0">
                          Текущий
                        </span>
                      </div>
                    ) : (
                      <a 
                        href={item.href} 
                        className="text-white/75 hover:text-white transition-colors flex items-center justify-between gap-2 group"
                      >
                        <span className="truncate">{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors shrink-0" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BENTO-КАРТОЧКА 3 (Контакты): Третьим блоком справа */}
          <div className="md:col-span-1 lg:col-span-4 xl:col-span-4 rounded-[24px] sm:rounded-[32px] bg-white/[0.04] border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                <span className="text-xs text-white/50 font-mono">
                  (контакты)
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-white/75">
                {/* Телефон и Почта */}
                <div className="space-y-2.5">
                  <div>
                    <a href="tel:+79528842464" className="hover:text-white transition-colors flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-white/50 shrink-0" />
                      <span>+7 (952) 884-24-64</span>
                    </a>
                  </div>
                  <div>
                    <a href="mailto:mikhail.bachinsky@yandex.ru" className="hover:text-white transition-colors flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-white/50 shrink-0" />
                      <span className="truncate">mikhail.bachinsky@yandex.ru</span>
                    </a>
                  </div>
                </div>

                {/* Кнопки соцсетей со светлыми иконками */}
                <div className="pt-1 flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://t.me/mikhail_bachinsky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors duration-150 flex items-center gap-1.5 border border-white/10 shadow-2xs"
                  >
                    <TelegramIcon className="w-3.5 h-3.5 text-[#FAF8F5]" />
                    <span>Telegram</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60" />
                  </a>

                  <a
                    href="https://vk.com/mikhail_bachinsky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors duration-150 flex items-center gap-1.5 border border-white/10 shadow-2xs"
                  >
                    <VkIcon className="w-4 h-4 text-[#FAF8F5]" />
                    <span>ВКонтакте</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60" />
                  </a>

                  <a
                    href="https://wa.me/79528842464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors duration-150 flex items-center gap-1.5 border border-white/10 shadow-2xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#FAF8F5]" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60" />
                  </a>

                  <a
                    href="https://max.im"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors duration-150 flex items-center gap-1.5 border border-white/10 shadow-2xs"
                  >
                    <MaxIcon className="w-3.5 h-3.5 text-[#FAF8F5]" />
                    <span>MAX</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60" />
                  </a>

                  <a
                    href="https://hh.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors duration-150 flex items-center gap-1.5 border border-white/10 shadow-2xs"
                  >
                    <HeadHunterIcon className="w-4 h-3 text-[#FAF8F5]" />
                    <span>HeadHunter</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60" />
                  </a>
                </div>

                {/* Локация перемещена строго ПОД кнопки внизу */}
                <div className="pt-3 border-t border-white/10 text-white/50 text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <span>Томск, Россия (UTC+7)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BENTO-ПАНЕЛЬ 4: КОПИРАЙТ, ДИСКЛЕЙМЕР И СОГЛАСИЯ
            ========================================================================= */}
        <div className="w-full rounded-[20px] sm:rounded-[24px] bg-white/[0.02] border border-white/5 px-5 sm:px-7 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <div className="space-y-1 max-w-[720px]">
            <div>
              © 2026&nbsp;Михаил Бачинский. Все&nbsp;права защищены.
            </div>
            <p className="text-white/40 leading-relaxed font-normal [text-wrap:pretty]">
              Проект разработан как&nbsp;инициативная дизайн-концепция визуальной системы Тьюторской службы ТГУ. Все&nbsp;материалы, сценарии и&nbsp;иллюстрации носят презентационный характер. Не&nbsp;является публичной офертой.
            </p>
          </div>

          {/* Правовые ссылки */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs shrink-0">
            {onOpenPolicy && (
              <button
                type="button"
                onClick={onOpenPolicy}
                className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
              >
                Политика обработки персональных данных
              </button>
            )}

            {onOpenPolicy && onOpenConsent && (
              <span className="text-white/20">•</span>
            )}

            {onOpenConsent && (
              <button
                type="button"
                onClick={onOpenConsent}
                className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
              >
                Согласие на&nbsp;обработку персональных данных
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
