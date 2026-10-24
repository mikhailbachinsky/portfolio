import React, { useState } from 'react';
import { 
  Sparkles, 
  Grid3X3, 
  Layers, 
  Puzzle, 
  Compass, 
  Check, 
  X, 
  Palette, 
  FileText,
  Sliders,
  Maximize2
} from 'lucide-react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';

type MoodCategory = 'all' | 'grid' | 'tactility' | 'forms' | 'campus';

interface MoodCard {
  id: string;
  category: 'grid' | 'tactility' | 'forms' | 'campus';
  number: string;
  title: string;
  subtitle: string;
  concept: string;
  quote: string;
  tags: string[];
  colorTheme: {
    bg: string;
    border: string;
    accent: string;
    accentBg: string;
    text: string;
  };
}

const MOOD_CARDS: MoodCard[] = [
  {
    id: 'swiss-grid',
    category: 'grid',
    number: '01',
    title: 'Модульная сетка и архитектоника',
    subtitle: 'Швейцарский модернизм & Рациональная структура',
    concept: 'Чёткая модульная иерархия, вдохновлённая швейцарской типографикой и функционализмом. Сетка позволяет организовывать разнородный контент от постов во ВКонтакте до ролл-апов без визуального хаоса.',
    quote: '«Без крепкой сетки стиль распался бы при первом же тиражировании. Сетка — это скелет, который удерживает свободу студенческой айдентики.»',
    tags: ['Модульность', 'Золотое сечение', 'Швейцарская школа', 'Строгая типографика'],
    colorTheme: {
      bg: '#181818',
      border: 'rgba(255, 255, 255, 0.1)',
      accent: '#3BBE7C',
      accentBg: 'rgba(59, 190, 124, 0.12)',
      text: '#FFFFFF',
    },
  },
  {
    id: 'risograph-print',
    category: 'tactility',
    number: '02',
    title: 'Цифровая ризография и текстура бумаги',
    subtitle: 'Тактильность крафтовой печати & Живая зернистость',
    concept: 'Отказ от стерильного цифрового глянца в пользу теплоты ризографной печати. Микрозернистость, наложение красок методом Multiply и натуральный тёплый фон `#FAF8F5` создают ощущение рукотворного студенческого зина.',
    quote: '«Ризограф снимает с университета образ неприступной бюрократической машины и возвращает атмосферу живой творческой мастерской.»',
    tags: ['Ризография', 'Зернистость', 'Multiply Overlay', 'Крафтовый оттиск'],
    colorTheme: {
      bg: '#FAF8F5',
      border: 'rgba(0, 0, 0, 0.08)',
      accent: '#FF8472',
      accentBg: 'rgba(255, 132, 114, 0.12)',
      text: '#181818',
    },
  },
  {
    id: 'puzzle-geometry',
    category: 'forms',
    number: '03',
    title: 'Метафора сцепки и софт-геометрия',
    subtitle: 'Мягкие радиусы & Модульный пазл взаимопомощи',
    concept: 'Скруглённые сочленения (радиус скругления 12–24 px) и пластика соединяющихся элементов. Пазл выступает визуальным символом: каждый студент уникален, но находит своё точное место в университетском сообществе.',
    quote: '«В айдентике нет острых агрессивных углов. Вся пластика транслирует безопасность, доступность и готовность поддержать в любую минуту.»',
    tags: ['Софт-радиусы', 'Пазл-сцепка', 'Пластика форм', 'Безопасная среда'],
    colorTheme: {
      bg: '#FAF8F5',
      border: 'rgba(0, 0, 0, 0.08)',
      accent: '#F9A4B8',
      accentBg: 'rgba(249, 164, 184, 0.14)',
      text: '#181818',
    },
  },
  {
    id: 'campus-vibe',
    category: 'campus',
    number: '04',
    title: 'Университетская роща и сибирский кампус',
    subtitle: 'Природный колорит & Эмоциональный маскот',
    concept: 'Вдохновение исторической Университетской рощей ТГУ, реликтовыми соснами и ручными белками. Хвойный зелёный `#3BBE7C`, персиковый `#FF8472` и тёплый песочный создают согревающий контраст с суровыми томскими зимами.',
    quote: '«Для первокурсника из другого города кампус ТГУ должен стать вторым домом. Цвета и маскот дают ощущение уюта и дружеского плеча рядом.»',
    tags: ['Роща ТГУ', 'Маскот-белка', 'Согревающий колорит', 'Студгородок'],
    colorTheme: {
      bg: '#FAF8F5',
      border: 'rgba(0, 0, 0, 0.08)',
      accent: '#3BBE7C',
      accentBg: 'rgba(59, 190, 124, 0.12)',
      text: '#181818',
    },
  },
];

export const MoodboardSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MoodCategory>('all');
  const [selectedCardId, setSelectedCardId] = useState<string>('swiss-grid');
  const [interactiveGridActive, setInteractiveGridActive] = useState<boolean>(true);
  const [paperGrainIntensity, setPaperGrainIntensity] = useState<number>(65);
  const [puzzleConnected, setPuzzleConnected] = useState<boolean>(true);

  const filteredCards = activeCategory === 'all' 
    ? MOOD_CARDS 
    : MOOD_CARDS.filter(c => c.category === activeCategory);

  return (
    <section 
      id="moodboard-section" 
      className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto space-y-8 sm:space-y-12">
        
        {/* =========================================================================
            1. ВВОДНЫЙ БЛОК МУДБОРДА (КОНЦЕПТ & ВЕКТОРЫ ПОИСКА)
            ========================================================================= */}
        <FlatReveal direction="up" delay={40} distance={20}>
          <div className="w-full px-2 sm:px-3 py-2">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
              
              {/* Левая колонка: тег и манифест (6 колонок) */}
              <div className="lg:col-span-6">
                <span className="text-xs sm:text-sm text-[#737373] font-normal block mb-2 sm:mb-3">
                  (мудборд & визуальные опоры)
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#181818] leading-[1.2] tracking-tight mb-4 [text-wrap:pretty]">
                  На что опирался дизайн:{' '}
                  <span className="font-medium">
                    <HighlighterMark color="peach" direction="left-to-right" delay={150} variant="casual-sweep">
                      4 вектора поиска
                    </HighlighterMark>
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-[#181818]/80 font-normal leading-relaxed [text-wrap:pretty]">
                  Перед созданием графических элементов я проанализировал визуальный код сибирского студенчества.
                  Задача состояла в&nbsp;том, чтобы соединить <span className="font-medium">рациональную университетскую структуру</span> с{' '}
                  <HighlighterMark color="green" direction="left-to-right" delay={300} variant="wobbly-tilted">
                    тактильным человеческим теплом
                  </HighlighterMark>.
                </p>
              </div>

              {/* Правая колонка: интерактивные фильтры и краткие ориентиры (6 колонок) */}
              <div className="lg:col-span-6 lg:pt-6 flex flex-col justify-between gap-5">
                <p className="text-sm sm:text-base text-[#181818]/75 leading-relaxed [text-wrap:pretty]">
                  Мудборд объединил принципы швейцарской сетки, фактуру крафтового ризографа,
                  модульную метафору сцепки пазлов и природный колорит Университетской рощи ТГУ.
                </p>

                {/* Сегментированный переключатель категорий референсов (Zero-pill, аккуратные кнопки) */}
                <div className="w-full flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAEAEA] rounded-xl border border-black/5">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === 'all'
                        ? 'bg-white text-[#181818] shadow-xs'
                        : 'text-[#666666] hover:text-[#181818]'
                    }`}
                  >
                    Все ориентиры
                  </button>
                  <button
                    onClick={() => setActiveCategory('grid')}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === 'grid'
                        ? 'bg-white text-[#181818] shadow-xs'
                        : 'text-[#666666] hover:text-[#181818]'
                    }`}
                  >
                    Сетка & Структура
                  </button>
                  <button
                    onClick={() => setActiveCategory('tactility')}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === 'tactility'
                        ? 'bg-white text-[#181818] shadow-xs'
                        : 'text-[#666666] hover:text-[#181818]'
                    }`}
                  >
                    Ризограф & Текстура
                  </button>
                  <button
                    onClick={() => setActiveCategory('forms')}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === 'forms'
                        ? 'bg-white text-[#181818] shadow-xs'
                        : 'text-[#666666] hover:text-[#181818]'
                    }`}
                  >
                    Пазлы & Пластика
                  </button>
                  <button
                    onClick={() => setActiveCategory('campus')}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === 'campus'
                        ? 'bg-white text-[#181818] shadow-xs'
                        : 'text-[#666666] hover:text-[#181818]'
                    }`}
                  >
                    Роща & Кампус
                  </button>
                </div>
              </div>

            </div>
          </div>
        </FlatReveal>

        {/* =========================================================================
            2. БЕНТО-СЕТКА ВЕКТОРОВ ИССЛЕДОВАНИЯ
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {filteredCards.map((card, idx) => {
            const isDark = card.id === 'swiss-grid';
            const isSelected = selectedCardId === card.id;

            return (
              <FlatReveal key={card.id} direction="up" delay={80 + idx * 40} distance={20}>
                <div
                  onClick={() => setSelectedCardId(card.id)}
                  className={`group relative w-full h-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isDark 
                      ? 'bg-[#181818] text-white border-white/10 hover:border-white/20' 
                      : 'bg-[#FAF8F5] text-[#181818] border-black/8 hover:border-black/15 shadow-xs'
                  }`}
                  style={{ minHeight: '440px' }}
                >
                  {/* Фоновый декоративный номер */}
                  <div 
                    className="absolute -right-3 -top-6 text-[120px] sm:text-[140px] font-mono font-bold select-none pointer-events-none opacity-5 leading-none transition-transform duration-500 group-hover:scale-105"
                    style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                  >
                    {card.number}
                  </div>

                  {/* Верхняя панель карточки */}
                  <div className="w-full relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold tracking-wider text-[#737373]">
                          [{card.number}]
                        </span>
                        <span className="text-xs font-medium text-[#888888]">
                          {card.category === 'grid' && 'Архитектоника & Модули'}
                          {card.category === 'tactility' && 'Печатная графика & Текстура'}
                          {card.category === 'forms' && 'Геометрия & Смысловая сцепка'}
                          {card.category === 'campus' && 'Атмосфера & Символ кампуса'}
                        </span>
                      </div>

                      {/* Индикатор фокуса */}
                      <span 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isSelected ? 'scale-125' : 'opacity-40'
                        }`}
                        style={{ backgroundColor: card.colorTheme.accent }}
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-1.5 leading-snug">
                      {card.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-normal mb-4 ${isDark ? 'text-white/60' : 'text-[#181818]/60'}`}>
                      {card.subtitle}
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-white/80' : 'text-[#181818]/80'}`}>
                      {card.concept}
                    </p>
                  </div>

                  {/* Интерактивный интерактивный визуальный блок карточки */}
                  <div className="w-full my-6 relative z-10 rounded-2xl overflow-hidden border border-black/5">
                    {/* КАРТОЧКА 1: Модульная сетка */}
                    {card.id === 'swiss-grid' && (
                      <div className="w-full bg-[#222222] p-4 sm:p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                          <span>GRID SYSTEM: 12-COL RATIO</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setInteractiveGridActive(!interactiveGridActive);
                            }}
                            className="text-white/80 hover:text-white underline text-[11px] cursor-pointer"
                          >
                            {interactiveGridActive ? 'Скрыть направляющие' : 'Показать направляющие'}
                          </button>
                        </div>
                        <div className="w-full h-28 relative rounded-lg bg-[#151515] p-2 flex flex-col justify-between overflow-hidden border border-white/5">
                          {/* Сетка колонок */}
                          <div className={`absolute inset-0 grid grid-cols-6 sm:grid-cols-12 gap-1 p-2 transition-opacity duration-300 ${interactiveGridActive ? 'opacity-30' : 'opacity-5'}`}>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div key={i} className="h-full bg-emerald-400/30 rounded-xs" />
                            ))}
                          </div>
                          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                            <span>MOD: 64px</span>
                            <span>BASELINE: 4px</span>
                          </div>
                          <div className="relative z-10 w-3/4 bg-white/10 h-3 rounded-xs flex items-center px-1">
                            <span className="text-[8px] font-mono text-white/70 truncate">TYPOGRAPHIC HEADER RATIO 1.414</span>
                          </div>
                          <div className="relative z-10 flex gap-2">
                            <div className="w-1/2 bg-white/5 h-6 rounded-xs p-1">
                              <span className="text-[8px] font-mono text-white/50 block leading-tight">CONTENT BOX</span>
                            </div>
                            <div className="w-1/2 bg-emerald-400/10 h-6 rounded-xs p-1 border border-emerald-400/20">
                              <span className="text-[8px] font-mono text-emerald-300 block leading-tight">ACCENT MODULE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* КАРТОЧКА 2: Ризограф и наложение цветов */}
                    {card.id === 'risograph-print' && (
                      <div className="w-full bg-[#F3EFEA] p-4 sm:p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-[#181818]/60 font-mono">
                          <span>RISOGRAPH OVERLAP & GRAIN</span>
                          <span className="text-[11px] text-[#FF8472] font-semibold">MULTIPLY INK</span>
                        </div>
                        <div className="w-full h-28 relative rounded-lg bg-[#FAF8F5] p-3 flex items-center justify-center overflow-hidden border border-black/5">
                          {/* Имитация наложения красок ризографа */}
                          <div className="relative w-48 h-20 flex items-center justify-center">
                            <div 
                              className="w-16 h-16 rounded-full bg-[#FF8472] opacity-85 mix-blend-multiply absolute -left-2 transform -translate-x-1"
                              style={{ filter: `contrast(${100 + paperGrainIntensity / 2}%)` }}
                            />
                            <div 
                              className="w-16 h-16 rounded-full bg-[#3BBE7C] opacity-85 mix-blend-multiply absolute left-10 transform translate-y-1"
                              style={{ filter: `contrast(${100 + paperGrainIntensity / 2}%)` }}
                            />
                            <div 
                              className="w-16 h-16 rounded-full bg-[#F9A4B8] opacity-85 mix-blend-multiply absolute right-0 transform translate-x-1"
                              style={{ filter: `contrast(${100 + paperGrainIntensity / 2}%)` }}
                            />
                            <div className="absolute z-20 text-[10px] font-mono font-medium text-[#181818] bg-white/80 px-2 py-0.5 rounded-full border border-black/5 shadow-xs">
                              SPOT COLORS MERGE
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* КАРТОЧКА 3: Пазл и мягкие сочленения */}
                    {card.id === 'puzzle-geometry' && (
                      <div className="w-full bg-[#F3EFEA] p-4 sm:p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-[#181818]/60 font-mono">
                          <span>INTERLOCK GEOMETRY</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPuzzleConnected(!puzzleConnected);
                            }}
                            className="text-[#FF8472] hover:underline text-[11px] cursor-pointer font-medium"
                          >
                            {puzzleConnected ? 'Разъединить' : 'Соединить пазл'}
                          </button>
                        </div>
                        <div className="w-full h-28 relative rounded-lg bg-[#FAF8F5] p-3 flex items-center justify-center overflow-hidden border border-black/5">
                          <div className="flex items-center transition-all duration-500 ease-out" style={{ gap: puzzleConnected ? '0px' : '20px' }}>
                            {/* Левый сегмент пазла */}
                            <div className="w-16 h-16 rounded-l-2xl bg-[#FF8472] relative flex items-center justify-center text-white font-mono text-xs shadow-xs">
                              <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-[#FF8472] z-10" />
                              <span className="relative z-20 text-[10px]">Тьютор</span>
                            </div>
                            {/* Правый сегмент пазла */}
                            <div className="w-16 h-16 rounded-r-2xl bg-[#3BBE7C] relative flex items-center justify-center text-white font-mono text-xs shadow-xs">
                              <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-[#FAF8F5] z-10" />
                              <span className="relative z-20 text-[10px]">Студент</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* КАРТОЧКА 4: Университетская роща и колорит */}
                    {card.id === 'campus-vibe' && (
                      <div className="w-full bg-[#F3EFEA] p-4 sm:p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-[#181818]/60 font-mono">
                          <span>CAMPUS PALETTE & MASCOT VIBE</span>
                          <span className="text-[11px] text-[#3BBE7C] font-semibold">TSU GROVE</span>
                        </div>
                        <div className="w-full h-28 relative rounded-lg bg-[#FAF8F5] p-3 flex items-center justify-around overflow-hidden border border-black/5">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-[#3BBE7C] shadow-xs" />
                            <span className="text-[9px] font-mono text-[#666]">Хвоя #3BBE7C</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-[#FF8472] shadow-xs" />
                            <span className="text-[9px] font-mono text-[#666]">Кирпич #FF8472</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-[#F9A4B8] shadow-xs" />
                            <span className="text-[9px] font-mono text-[#666]">Ягода #F9A4B8</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-[#181818] shadow-xs" />
                            <span className="text-[9px] font-mono text-[#666]">Графит #181818</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Нижняя часть карточки: цитата и теги (Zero-pill text metadata) */}
                  <div className="w-full relative z-10 pt-3 border-t border-black/5">
                    <p className={`text-xs sm:text-[13px] italic mb-3.5 leading-relaxed ${isDark ? 'text-white/70' : 'text-[#181818]/70'}`}>
                      {card.quote}
                    </p>
                    <div className={`flex flex-wrap items-center gap-2 text-xs font-mono ${isDark ? 'text-white/40' : 'text-[#181818]/40'}`}>
                      {card.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span>#{tag}</span>
                          {tIdx < card.tags.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </FlatReveal>
            );
          })}
        </div>

        {/* =========================================================================
            3. БЛОК СРАВНЕНИЯ & ВЫБОРА: ОТ ЧЕГО ОТКАЗАЛИСЬ И ЧТО ВЫБРАЛИ
            ========================================================================= */}
        <FlatReveal direction="up" delay={120} distance={20}>
          <div className="w-full rounded-[24px] sm:rounded-[32px] bg-[#181818] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-md">
            <div className="w-full mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-1">
                  [ДИЗАЙН-МАНИФЕСТ & ФИЛЬТР РЕШЕНИЙ]
                </span>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
                  Осознанные развилки: от чего отказались и почему
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-white/60">
                Критерий: психологический комфорт первокурсника
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              {/* Левая колонка: От чего отказались */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-rose-400 font-medium text-sm sm:text-base">
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>От чего осознанно отказались</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400/80 font-mono mt-0.5">—</span>
                    <span><strong className="text-white/90">Тяжеловесная университетская геральдика:</strong> латинские ленты, щиты и гербы создают дистанцию и страх перед «высоким начальством».</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400/80 font-mono mt-0.5">—</span>
                    <span><strong className="text-white/90">Стерильный корпоративный «банковский» синий:</strong> вызывает ассоциации с кредитами и формальными отчетами, а не с наставничеством.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400/80 font-mono mt-0.5">—</span>
                    <span><strong className="text-white/90">Безликие стоковые иллюстрации:</strong> 3D-человечки без эмоций лишают службу искренности и доверия.</span>
                  </li>
                </ul>
              </div>

              {/* Правая колонка: Что внедрили */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm sm:text-base">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Что легло в основу итоговой айдентики</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400/80 font-mono mt-0.5">+</span>
                    <span><strong className="text-white/90">Модульная метафора пазла:</strong> доступный визуальный образ соучастия и поддержки, легко масштабируемый на любые форматы.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400/80 font-mono mt-0.5">+</span>
                    <span><strong className="text-white/90">Тёплый ризографный колорит:</strong> сочетание персикового `#FF8472`, хвойного `#3BBE7C` и нежно-розового `#F9A4B8` согревает и привлекает внимание.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400/80 font-mono mt-0.5">+</span>
                    <span><strong className="text-white/90">Харизматичный маскот и живой язык:</strong> белка из Университетской рощи говорит со студентами на одном языке и становится любимым символом службы.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FlatReveal>

      </div>
    </section>
  );
};
