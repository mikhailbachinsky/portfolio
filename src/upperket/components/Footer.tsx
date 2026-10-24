import React from 'react';
import { CASE_STUDY_DATA } from '../data/caseStudyData';
import { ArrowUp, BookOpen, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onOpenPolicy?: () => void;
  onOpenConsent?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenConsent }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1C1C1C] bg-[#161514] py-16 text-white/75 font-sans relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start pb-12 border-b border-white/10">
          
          {/* Колонка 1: О проекте (4 колонки) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-xs font-sans text-white/40 block mb-1.5 font-medium tracking-wide">
                О проекте
              </span>
              <h2 
                className="text-xl font-normal text-[#F5F2EB] block leading-snug"
                style={{ fontFamily: 'Kurale, serif' }}
              >
                Детский словарь-энциклопедия
              </h2>
              <span className="text-xs text-white/60 block mt-1">
                Автор и арт-дирекшн: {CASE_STUDY_DATA.meta.designerName}
              </span>
            </div>

            <p className="text-xs text-white/65 font-normal max-w-sm leading-relaxed text-pretty">
              Дизайн-кейс иллюстрированного словаря коренных малочисленных народов Верхнекетского района Томской области. 12&nbsp;тематических разделов, аутентичная типографика, берестяной переплёт и&nbsp;коллекционный физический тираж.
            </p>
          </div>

          {/* Колонка 2: Навигация (5 колонок) */}
          <nav aria-label="Быстрая навигация по сайту" className="lg:col-span-5 space-y-3">
            <span className="text-white/40 block text-xs font-medium tracking-wide">
              Быстрая навигация
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <ul role="list" className="space-y-2.5">
                <li><a href="#overview" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">1. Обзор проекта</a></li>
                <li><a href="#problem" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">2. Проблема</a></li>
                <li><a href="#challenges" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">3. Вызовы и решения</a></li>
                <li><a href="#architecture" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">4. Инфоархитектура</a></li>
                <li><a href="#design-system" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">5. Дизайн-система</a></li>
                <li><a href="#production" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">6. Полиграфия</a></li>
              </ul>
              <ul role="list" className="space-y-2.5">
                <li><a href="#technical-apparatus" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">7. Справочный аппарат</a></li>
                <li><a href="#impact" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">8. Результаты</a></li>
                <li><a href="#authors" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">9. Авторы</a></li>
                <li><a href="#reviews" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">10. Отзывы</a></li>
                <li><a href="#contacts" className="text-white/70 hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">11. Контакты</a></li>
              </ul>
            </div>
          </nav>

          {/* Колонка 3: Метрики и информация (3 колонки) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-white/40 block text-xs font-medium tracking-wide">
              Метрики и сведения
            </span>
            <ul className="space-y-2.5 text-white/70">
              <li className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <span>12 тематических разделов, 152 стр.</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <span>Физический тираж: 45 экземпляров</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <span>Школьный музей «Затёски», Белый Яр</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Подвал: Копирайт, правовая информация и кнопка «В начало страницы» */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-white/50 text-left">
          <div className="space-y-2 text-left">
            <div>
              © {new Date().getFullYear()} {CASE_STUDY_DATA.meta.designerName}. Все права защищены.
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/40">
              {onOpenPolicy && (
                <button
                  type="button"
                  onClick={onOpenPolicy}
                  className="hover:text-white/70 transition-colors underline cursor-pointer"
                >
                  Политика обработки персональных данных
                </button>
              )}
              {onOpenPolicy && onOpenConsent && <span>•</span>}
              {onOpenConsent && (
                <button
                  type="button"
                  onClick={onOpenConsent}
                  className="hover:text-white/70 transition-colors underline cursor-pointer"
                >
                  Согласие на обработку персональных данных
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-white/75 hover:text-white transition-colors px-4 py-2 inline-flex items-center justify-center gap-2 m3-interactive-button bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 shrink-0"
          >
            <span>В&nbsp;начало страницы</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
