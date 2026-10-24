import React from 'react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';

export const IconsSection: React.FC = () => {
  return (
    <section id="icons-section" className="w-full flex justify-center">
      {/* СЕКЦИЯ: ИКОНКИ (ГРИД-КОНТЕЙНЕР 1200PX, ВЫРАВНИВАНИЕ ПО ЦЕНТРУ) */}
      <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        <FlatReveal direction="up" delay={60} distance={20}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* 4 колонки из 12 на десктопе: Набор иконок (главная карточка + сетка 2х2) */}
            <div className="order-2 md:order-1 md:col-span-4 flex flex-col items-center mx-auto w-full max-w-[280px] sm:max-w-[320px]">
              {/* Верхний большой квадрат для главной иконки */}
              <div className="w-full max-w-[260px] sm:max-w-[280px] aspect-square rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 shadow-2xs flex items-center justify-center p-6 sm:p-7 relative overflow-hidden mb-3 sm:mb-4 transition-transform duration-300 hover:scale-[1.02] mx-auto">
                <img
                  src="/assets/icon-1.svg"
                  alt="Главная иконка"
                  loading="eager"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('icon-large.svg')) {
                      img.src = '/assets/icon-large.svg';
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>

              {/* Сетка 2х2 из 4 малых иконок */}
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5 w-full max-w-[260px] sm:max-w-[280px] mx-auto">
                {/* Иконка 2 */}
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl border border-black/10 bg-white/60 shadow-2xs flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-transform duration-300 hover:scale-[1.04]">
                  <img
                    src="/assets/icon-2.svg"
                    alt="Иконка 2"
                    loading="eager"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Иконка 3 */}
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl border border-black/10 bg-white/60 shadow-2xs flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-transform duration-300 hover:scale-[1.04]">
                  <img
                    src="/assets/icon-3.svg"
                    alt="Иконка 3"
                    loading="eager"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Иконка 4 */}
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl border border-black/10 bg-white/60 shadow-2xs flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-transform duration-300 hover:scale-[1.04]">
                  <img
                    src="/assets/icon-4.svg"
                    alt="Иконка 4"
                    loading="eager"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Иконка 5 */}
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl border border-black/10 bg-white/60 shadow-2xs flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-transform duration-300 hover:scale-[1.04]">
                  <img
                    src="/assets/icon-5.svg"
                    alt="Иконка 5"
                    loading="eager"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 8 колонок из 12 на десктопе: Описание и спецификация иконок */}
            <div className="order-1 md:order-2 md:col-span-8 flex flex-col justify-center text-left space-y-5 sm:space-y-6">
              {/* Eyebrow маркер */}
              <span className="text-xs sm:text-sm text-[#737373] font-normal block">
                (иконки)
              </span>

              {/* Абзац 1: розовый маркер на словах 'толстого контура' */}
              <p className="text-base sm:text-lg lg:text-[20px] text-[#181818] font-medium leading-[1.45] tracking-tight [text-wrap:pretty]">
                Все иконки разработаны в&nbsp;стиле{' '}
                <HighlighterMark color="rose" variant="overshoot" delay={200}>
                  толстого контура
                </HighlighterMark>
                , что&nbsp;обеспечивает их&nbsp;отличную читаемость даже в&nbsp;малом кегле на&nbsp;мобильных&nbsp;устройствах.
              </p>

              {/* Абзац 2: зелёный маркер на словах 'цветовое кодирование' */}
              <p className="text-base sm:text-lg lg:text-[20px] text-[#181818] font-medium leading-[1.45] tracking-tight [text-wrap:pretty]">
                Отказ от&nbsp;острых углов в&nbsp;пользу скруглений поддерживает общую концепцию
                безопасного пространства, а&nbsp;
                <HighlighterMark color="green" variant="shifted-down" delay={350}>
                  цветовое кодирование
                </HighlighterMark>
                , которое полностью соответствует фирменной палитре, лишает элементы «цифрового&nbsp;холода».
              </p>

              {/* Спецификация стиля */}
              <div className="pt-4 sm:pt-5 space-y-3.5 text-sm sm:text-[15px] text-[#181818] border-t border-black/10 w-full">
                <div>
                  <span className="font-bold">Название стиля:</span>{' '}
                  <span className="font-normal text-[#181818]/90">тактильный жирный линейный</span>
                </div>

                <div className="space-y-1">
                  <span className="font-bold block">Контур:</span>
                  <ul className="space-y-1 text-[#181818]/90 pl-1">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#8FE06E] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Цвет:</span>{' '}
                        <span className="font-normal text-[#181818]/90">«мягкий графит» (#181818)</span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFAD85] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Толщина:</span>{' '}
                        <span className="font-normal text-[#181818]/90">1.75–2.25 px</span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#F27A93] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Концы:</span>{' '}
                        <span className="font-normal text-[#181818]/90">круглые (Round Cap / Join)</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="font-bold block">Заливка:</span>
                  <ul className="space-y-1 text-[#181818]/90 pl-1">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#8FE06E] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Тип:</span>{' '}
                        <span className="font-normal text-[#181818]/90">плоская акцентная</span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFAD85] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Палитра:</span>{' '}
                        <span className="font-normal text-[#181818]/90">фирменный персик, роза, яблоко</span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#F27A93] shrink-0" />
                      <span>
                        <span className="font-medium text-[#181818]">Применение:</span>{' '}
                        <span className="font-normal text-[#181818]/90">частичное смысловое заполнение (15–30%)</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </FlatReveal>
      </div>
    </section>
  );
};
