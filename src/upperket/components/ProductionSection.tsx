import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Eye, 
  X
} from 'lucide-react';
import { CoverTurnScrollExperience } from './CoverTurnScrollExperience';

interface TechnicalPageItem {
  id: string;
  pageNumber: number;
  imageSrc: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
}

const TECHNICAL_PAGES: TechnicalPageItem[] = [
  {
    id: 'title-page',
    pageNumber: 1,
    imageSrc: '/dictionary-pages/page_002.webp',
    category: 'Сведения',
    title: 'Титульный<br />лист издания',
    shortDesc: 'Полоса с\u00A0реквизитами краеведческого музея «Затёски».',
    fullDesc: 'Официальный титульный лист книги: название словаря, указание краеведческого мини-музея «Затёски», составители и\u00A0место издания (Белый Яр, Томская область).'
  },
  {
    id: 'verso-title',
    pageNumber: 2,
    imageSrc: '/dictionary-pages/page_003.webp',
    category: 'Издательские шифры',
    title: 'Оборот титула: УДК,<br />ББК и\u00A0знак охраны',
    shortDesc: 'Библиотечные шифры, авторский знак и\u00A0аннотация для\u00A0школ и\u00A0библиотек.',
    fullDesc: 'Полная издательская подготовка по\u00A0профессиональным печатным стандартам: индексы классификации УДК и\u00A0ББК, авторский знак, знак охраны авторского права (©) и\u00A0развёрнутая аннотация для\u00A0библиотек и\u00A0школ.'
  },
  {
    id: 'conclusion',
    pageNumber: 137,
    imageSrc: '/dictionary-pages/page_138.webp',
    category: 'Послесловие',
    title: 'Заключение издания и\u00A0напутствие',
    shortDesc: 'Обращение к\u00A0читателям о\u00A0сохранении родного языка и\u00A0традиций Верхнекетья.',
    fullDesc: 'Трогательное обращение к\u00A0юному читателю о\u00A0важности сохранения родного языка, природы Верхнекетья и\u00A0памяти о\u00A0предках.'
  },
  {
    id: 'calendar',
    pageNumber: 138,
    imageSrc: '/dictionary-pages/page_139.webp',
    category: 'Приложение',
    title: 'Традиционный календарь',
    shortDesc: 'Этнографический календарь с\u00A0сезонными циклами тайги, охоты и\u00A0рыболовства.',
    fullDesc: 'Этнографический календарь с\u00A0природными циклами тайги: время прилёта птиц, ход рыбы, сбор кедрового ореха и\u00A0охотничьи сезоны коренных народов.'
  },
  {
    id: 'measures',
    pageNumber: 139,
    imageSrc: '/dictionary-pages/page_140.webp',
    category: 'Приложение',
    title: 'Традиционная<br />система мер',
    shortDesc: 'Инфографика старинных мер длины.',
    fullDesc: 'Наглядная инфографика традиционных мер (маховая сажень, ладонь, пядь, локоть), использовавшихся таёжными охотниками и\u00A0мастерицами.'
  },
  {
    id: 'crossword',
    pageNumber: 140,
    imageSrc: '/dictionary-pages/page_141.webp',
    category: 'Интерактив',
    title: 'Краеведческий кроссворд',
    shortDesc: 'Игровой разворот для\u00A0закрепления лексики.',
    fullDesc: 'Игровой разворот с\u00A0кроссвордом и\u00A0иллюстрированными подсказками, помогающий школьникам в\u00A0игровой форме вспомнить ключевые слова словаря.'
  },
  {
    id: 'informants',
    pageNumber: 145,
    imageSrc: '/dictionary-pages/page_146.webp',
    category: 'Архивные данные',
    title: 'Список информантов',
    shortDesc: 'Поимённый перечень старожилов-носителей традиционной культуры.',
    fullDesc: 'Поимённый список жителей сёл и\u00A0посёлков Верхнекетья\u00A0— носителей селькупского, кетского и\u00A0эвенкийского языков, чьи полевые записи легли в\u00A0основу книги.'
  },
  {
    id: 'sources',
    pageNumber: 146,
    imageSrc: '/dictionary-pages/page_147.webp',
    category: 'Библиография',
    title: 'Список источников и\u00A0литературы',
    shortDesc: 'Библиографическая база монографий и\u00A0научных трудов.',
    fullDesc: 'Список этнографических монографий, диалектологических словарей и\u00A0архивных музейных отчётов, подтверждающих научную достоверность каждой словарной статьи.'
  },
  {
    id: 'team',
    pageNumber: 148,
    imageSrc: '/dictionary-pages/page_149.webp',
    category: 'Создатели',
    title: 'О\u00A0составителях и\u00A0проекте',
    shortDesc: 'История создания словаря, краеведческие экспедиции и\u00A0благодарности.',
    fullDesc: 'Подробный рассказ о\u00A0зарождении идеи словаря в\u00A0школьном музее «Затёски», этапах экспедиций и\u00A0благодарность научным консультантам.'
  },
  {
    id: 'colophon',
    pageNumber: 150,
    imageSrc: '/dictionary-pages/page_150.webp',
    category: 'Колофон',
    title: 'Выпускные<br />технические данные',
    shortDesc: 'Полиграфические сведения: форматы А4 и\u00A0А5, тираж и\u00A0гарнитуры.',
    fullDesc: 'Предпоследняя страница книги с\u00A0полными производственными сведениями: форматы издания А4 и\u00A0А5, тип бумаги, гарнитуры (Kurale, Geologica), тираж 45\u00A0экз. и\u00A0выходные данные типографии.'
  }
];

export const ProductionSection: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<TechnicalPageItem | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPage(null);
      setIsClosing(false);
    }, 350); // Matches m3-exit-smooth duration
  };

  const handleOpen = (page: TechnicalPageItem) => {
    setSelectedPage(page);
    setIsClosing(false);
  };

  useEffect(() => {
    if (selectedPage) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedPage]);

  return (
    <section 
      id="production" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
    >
      {/* 1. Блок: Полноэкранная 3D-анимация книги по скроллу с блоками «Полиграфия» и «Книга соединяет...» */}
      <CoverTurnScrollExperience />

      {/* 2. Блок: Научно-справочный аппарат книги по швейцарской 12-колоночной сетке */}
      <div 
        id="technical-apparatus" 
        className="border-t border-[#1C1C1C]/15"
        style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
            
            {/* Левая функциональная зона (Колонки 1-4) со sticky-фиксацией */}
            <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Издательские стандарты
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Справочный аппарат
              </h2>
              <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                <p>
                  Полная издательская подготовка по&nbsp;академическим нормам ГОСТ и&nbsp;библиотечной классификации.
                </p>
              </div>
            </div>

            {/* Правая функциональная зона (Колонки 5-12) */}
            <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-10">
              
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl lg:text-3xl font-editorial font-normal leading-snug tracking-normal text-[#1C1C1C] text-balance">
                  Словарь снабжён развёрнутым академическим аппаратом, связывающим музейный экспонат с&nbsp;научной библиографией и&nbsp;школьной практикой.
                </p>
              </div>

              {/* Сетка полос справочного аппарата: 2 колонки на мобильных, 3 колонки на планшетах и десктопе */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6 items-stretch" role="region" aria-label="Полосы справочного аппарата">
                {TECHNICAL_PAGES.map((page) => (
                  <article key={page.id} className="h-full">
                    <button
                      type="button"
                      onClick={() => handleOpen(page)}
                      aria-label={`Просмотреть полосу: ${page.title}, страница ${page.pageNumber}`}
                      className="w-full text-left group cursor-pointer bg-white border border-[#1C1C1C]/15 rounded-xl p-2.5 sm:p-5 shadow-2xs flex flex-col justify-between m3-card-interactive h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
                    >
                      <div className="w-full">
                        {/* Превью полосы */}
                        <div className="relative aspect-[210/297] rounded-lg overflow-hidden border border-[#1C1C1C]/10 bg-[#FAF8F5] mb-2 sm:mb-4">
                          <img 
                            src={page.imageSrc} 
                            alt={`Полоса ${page.pageNumber}: ${page.title}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="eager"
                          />
                          {/* Номер страницы */}
                          <div className="absolute top-1 right-1 sm:top-2.5 sm:right-2.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/90 border border-[#1C1C1C]/15 text-[#1C1C1C]/80 text-[9px] sm:text-xs font-sans font-medium shadow-2xs backdrop-blur-xs">
                            Стр. {page.pageNumber}
                          </div>
                          <div className="absolute inset-0 bg-[#1C1C1C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="true">
                            <span className="p-1.5 sm:p-2.5 rounded-full bg-white text-[#1C1C1C] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </span>
                          </div>
                        </div>

                        {/* Текстовый блок карточки с единым отступом между заголовком и текстом */}
                        <div className="space-y-1 sm:space-y-1.5 flex flex-col">
                          <div className="text-[9px] sm:text-xs font-sans font-medium text-[#1C1C1C]/60 tracking-wide">
                            {page.category}
                          </div>
                          <div 
                            className="text-[#1C1C1C] text-xs sm:text-lg font-editorial font-normal leading-snug" 
                            style={{ 
                              fontFamily: 'Kurale, serif',
                              fontSynthesis: 'none',
                              WebkitFontSmoothing: 'grayscale',
                              MozOsxFontSmoothing: 'grayscale',
                              textRendering: 'optimizeSpeed',
                              fontVariantNumeric: 'lining-nums',
                              fontFeatureSettings: '"kern" 1, "liga" 0'
                            }}
                            dangerouslySetInnerHTML={{ __html: page.title }}
                          />
                          <p 
                            className="text-[10px] sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed pt-0.5 text-pretty line-clamp-2 sm:line-clamp-none"
                            dangerouslySetInnerHTML={{ __html: page.shortDesc }}
                          />
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно просмотра технической полосы */}
      {selectedPage && createPortal(
        <div 
          className={`fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300 ${
            isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tech-page-modal-title"
        >
          <div 
            className={`w-full max-w-md md:max-w-4xl max-h-[92dvh] flex flex-col md:flex-row bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#1C1C1C]/20 shadow-2xl ${
              isClosing ? 'm3-exit-smooth' : 'm3-enter-smooth'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Изображение полосы: пропорциональный естественный просмотр без пустых боковых полей */}
            <div className="flex items-center justify-center p-4 sm:p-6 md:w-1/2 md:border-r border-[#1C1C1C]/15 bg-[#F4F1EA]/60 shrink-0">
              <div className="relative max-h-[38vh] md:max-h-[70vh] flex items-center justify-center">
                <img 
                  src={selectedPage.imageSrc} 
                  alt={`Полноразмерный вид: ${selectedPage.title.replace(/<[^>]*>?/gm, '')}`}
                  className="max-h-[38vh] md:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-[#1C1C1C]/15 block bg-white"
                />
              </div>
            </div>

            {/* Описание полосы: полный основной текст, отсутствие дублирующих кнопок, комфортный скролл */}
            <div className="flex flex-col justify-between p-5 sm:p-6 md:p-8 md:w-1/2 text-left overflow-y-auto flex-1 min-h-0 bg-[#FAF8F5]">
              <div className="space-y-3.5 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-white border border-[#1C1C1C]/15 text-[#1C1C1C]/80 shadow-2xs">
                    Стр. {selectedPage.pageNumber}
                  </span>
                  <button 
                    type="button"
                    onClick={handleClose}
                    aria-label="Закрыть окно просмотра полосы"
                    className="p-2 rounded-full text-[#1C1C1C]/70 hover:text-[#1C1C1C] hover:bg-[#EAE6DE] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-1 text-left pt-1">
                  <span className="text-xs font-sans font-medium text-[#1C1C1C]/60 tracking-wide">
                    {selectedPage.category}
                  </span>
                  <h3 id="tech-page-modal-title" className="text-lg sm:text-xl md:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug text-left" dangerouslySetInnerHTML={{ __html: selectedPage.title }} />
                </div>

                {/* Полный основной текст полосы */}
                <p className="text-xs sm:text-sm md:text-base text-[#1C1C1C]/85 font-sans leading-relaxed text-pretty pt-1">
                  {selectedPage.fullDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#1C1C1C]/10 flex items-center justify-between text-xs text-[#1C1C1C]/60 font-sans">
                <span>Школьный музей «Затёски»</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
