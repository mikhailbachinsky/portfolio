import React, { useState, useEffect, useRef } from 'react';
import { FlatReveal } from './FlatReveal';
import { HighlighterMark } from './HighlighterMark';

interface PromptPreset {
  id: string;
  name: string;
  prompt: string;
  imageFilename: string;
  fallbackPose: 'laptop' | 'tea' | 'exams' | 'navigator' | 'graduation';
}

const PRESETS: PromptPreset[] = [
  {
    id: 'consultation',
    name: 'Консультации',
    prompt: 'Белка-тьютор ТГУ в\u00A0круглых очках за\u00A0открытым ноутбуком с\u00A0клавиатурой, открытая приветливая улыбка и\u00A0пышный хвост, векторная графика в\u00A0ризографическом стиле, фирменная палитра ТГУ',
    imageFilename: 'mascot-gen-consultation.svg',
    fallbackPose: 'laptop'
  },
  {
    id: 'tea',
    name: 'Тьюторский чай',
    prompt: 'Белка-тьютор ТГУ в\u00A0уютном кресле держит обеими лапками согревающую кружку с\u00A0чаем, расслабленная теплая улыбка, поднимающийся пар, векторная графика в\u00A0фирменных цветах ТГУ',
    imageFilename: 'mascot-gen-tea.svg',
    fallbackPose: 'tea'
  },
  {
    id: 'exams',
    name: 'Сессия',
    prompt: 'Белка-тьютор в\u00A0очках за\u00A0большим раскрытым конспектом с\u00A0аккуратными строчками лекций, ободряющий уверенный взгляд, подготовка к\u00A0сессии, графичный ризографический вектор',
    imageFilename: 'mascot-gen-exams.svg',
    fallbackPose: 'exams'
  },
  {
    id: 'navigator',
    name: 'Навигатор',
    prompt: 'Белка-тьютор с\u00A0фирменным бейджем службы на\u00A0ленте указывает лапкой направление по\u00A0стрелкам-указателям кампуса, динамичная поза помощи первокурсникам, четкий векторный контур',
    imageFilename: 'mascot-gen-navigator.svg',
    fallbackPose: 'navigator'
  },
  {
    id: 'graduation',
    name: 'Защита и\u00A0диплом',
    prompt: 'Белка-тьютор в\u00A0академической конфедератке с\u00A0кисточкой торжественно держит в\u00A0лапках дипломный свиток с\u00A0печатью, радостная победная поза успешного выпуска и\u00A0защиты, векторная графика',
    imageFilename: 'mascot-gen-graduation.svg',
    fallbackPose: 'graduation'
  }
];

export const ImplementationSection: React.FC = () => {
  // Выбранный в блоке ввода шаблон
  const [selectedPresetId, setSelectedPresetId] = useState<string>('consultation');
  // Текущая отображаемая иллюстрация на холсте (обновляется по завершении 6 секунд)
  const [generatedPresetId, setGeneratedPresetId] = useState<string>('consultation');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [userImageFailed, setUserImageFailed] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedPreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  const generatedPreset = PRESETS.find(p => p.id === generatedPresetId) || PRESETS[0];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelectPreset = (id: string) => {
    // При выборе шаблона меняется текст промпта в поле ввода
    setSelectedPresetId(id);
  };

  const handleTriggerGeneration = () => {
    if (isGenerating) return;
    if (timerRef.current) clearInterval(timerRef.current);

    // Запуск аутентичной 6-секундной генерации
    setIsGenerating(true);
    setGenerationProgress(0);

    const startTime = Date.now();
    const duration = 6000; // Ровно заявленные 6 секунд

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setGenerationProgress(progress);

      // В финале таймера (5.5 сек) подставляем обновленный сюжет
      if (elapsed >= 5500) {
        setGeneratedPresetId(selectedPresetId);
      }

      if (elapsed >= duration) {
        if (timerRef.current) clearInterval(timerRef.current);
        setGenerationProgress(100);
        setIsGenerating(false);
      }
    }, 60);
  };

  return (
    <section id="implementation-section" className="w-full">
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* =========================================================
            HEADER: Выровнен строго по центру, компактный заголовок,
            все союзы и предлоги <= 3 символов зафиксированы неразрывными пробелами
            ========================================================= */}
        <div className="w-full mb-7 sm:mb-9 lg:mb-11 text-center flex flex-col items-center mx-auto max-w-[780px]">
          <FlatReveal direction="up" delay={50} distance={24} duration={700}>
            {/* Eyebrow маркер */}
            <span className="text-xs sm:text-sm text-[#737373] font-normal block mb-2 sm:mb-2.5">
              (внедрение)
            </span>

            {/* Компактный заголовок по центру */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#181818] leading-[1.2] tracking-tight mb-3">
              Генерация маскота и&nbsp;графики{' '}
              <HighlighterMark color="peach" variant="casual-sweep" delay={200}>
                в&nbsp;Telegram-боте
              </HighlighterMark>
            </h2>

            {/* Описание решения: подчеркнут чистый векторный формат */}
            <p className="text-sm sm:text-base leading-relaxed text-[#181818]/80 font-normal max-w-[640px] mx-auto [text-wrap:pretty]">
              Концепция предлагает удобный инструмент создания векторных иллюстраций прямо через&nbsp;Telegram-бота. 
              Достаточно выбрать готовый шаблон промпта под&nbsp;задачу и&nbsp;при&nbsp;необходимости уточнить детали.
            </p>
          </FlatReveal>
        </div>

        {/* =========================================================
            ГЛАВНАЯ ИНТЕРАКТИВНАЯ МАСТЕРСКАЯ:
            Слева: Выбор шаблона, промпт без кавычек и кнопка Сгенерировать
            Справа: Оформленный студийный артборд без лишних точек на фоне
            ========================================================= */}
        <div className="w-full mb-4 sm:mb-5 lg:mb-6">
          <FlatReveal direction="up" delay={100} distance={36} duration={800}>
            <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F1F1F1] border border-black/5 p-5 sm:p-7 lg:p-8 shadow-xs text-left">
              
              {/* Верхняя строка окна бота: выразительная шапка без лишнего дивайдера */}
              <div className="w-full mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-[#181818] leading-tight tracking-tight">
                  Помощник генерации иллюстраций
                </h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Интерактивный инструмент создания графики для&nbsp;тьюторов
                </p>
              </div>

              {/* Две сбалансированные зоны: Слева промпт / Справа студийный артборд */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                
                {/* ЛЕВАЯ КОЛОНКА (5 колонок): Промпты и кнопка Сгенерировать */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  
                  {/* Карточка промпта со встроенным выбором сценариев */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-2xs h-full flex flex-col justify-between">
                    <div>
                      {/* Предзаполненные промпты по сценариям задачи */}
                      <div className="mb-3.5">
                        <span className="text-xs font-medium text-[#737373] block mb-2">
                          Шаблоны промптов
                        </span>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {PRESETS.map((p) => {
                            const isActive = p.id === selectedPresetId;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleSelectPreset(p.id)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                                  isActive
                                    ? 'bg-[#E5E5E5] text-[#181818] font-semibold border border-black/10 shadow-2xs'
                                    : 'bg-white/80 text-[#181818]/65 hover:text-[#181818] hover:bg-black/5 border border-black/5'
                                }`}
                              >
                                {p.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Текстовое поле подробного промпта без кавычек и без hex-кодов */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-medium text-[#737373] block">
                          Текстовое описание объекта
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#F8F8F8] border border-black/5 font-mono text-xs text-[#181818]/90 leading-relaxed min-h-[96px] sm:min-h-[110px]">
                          {selectedPreset.prompt}
                        </div>
                      </div>
                    </div>

                    {/* Кнопка «Сгенерировать» со скруглением rounded-lg, мягким контрастом и временем генерации (~6 секунд) */}
                    <div className="mt-4 pt-3.5 border-t border-black/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleTriggerGeneration}
                        disabled={isGenerating}
                        className={`px-4.5 py-2 sm:py-2.5 rounded-lg bg-[#222222] hover:bg-[#141414] text-white/95 font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 ${
                          isGenerating ? 'opacity-80 cursor-wait' : ''
                        }`}
                      >
                        {isGenerating ? 'Генерация...' : 'Сгенерировать'}
                      </button>

                      <span className="text-xs font-mono text-[#737373]">
                        ~6&nbsp;секунд на&nbsp;генерацию
                      </span>
                    </div>
                  </div>

                </div>

                {/* ПРАВАЯ КОЛОНКА (7 колонок): Оформленный студийный артборд без лишних точек на фоне */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="w-full h-full min-h-[360px] sm:min-h-[400px] rounded-2xl bg-white border border-black/10 shadow-2xs p-4 sm:p-5 lg:p-6 flex flex-col relative overflow-hidden text-left">
                    
                    {/* Верхняя строка артборда: чистый заголовок и палитра сюжета справа на месте 846 × 846 px */}
                    <div className="w-full flex items-center justify-between pb-3 border-b border-black/5 text-xs">
                      <span className="font-semibold text-[#181818]">
                        Холст предпросмотра
                      </span>

                      {/* Палитра сюжета, сдвинутая на место 846 × 846 px */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#737373] text-[11px]">
                          Палитра сюжета:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F1F1F1] border border-black/25 shadow-2xs" title="Светло-серый фон (#F1F1F1)" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FFAD85] border border-black/10 shadow-2xs" title="Персиковый ТГУ" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#8FE06E] border border-black/10 shadow-2xs" title="Травянистый зеленый ТГУ" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F27A93] border border-black/10 shadow-2xs" title="Теплый розовый ТГУ" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#181818] border border-black/10 shadow-2xs" title="Графит ТГУ" />
                        </div>
                      </div>
                    </div>

                    {/* ЦЕНТРАЛЬНАЯ ЗОНА: Элегантный студийный артборд, гармонично вписанный в карточку */}
                    <div className="flex-1 w-full py-4 flex items-center justify-center relative">
                      
                      {/* Рамка артборда с мягким радиусом, тонким контуром и легкой тенью */}
                      <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-black/8 shadow-xs bg-[#F1F1F1] flex items-center justify-center group">
                        
                        {/* Аутентичная ненавязчивая анимация генерации на заявленные 6 секунд с AI-звёздами */}
                        {isGenerating && (
                          <div className="absolute inset-0 bg-[#F1F1F1]/94 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-30 transition-all duration-300">
                            <div className="flex flex-col items-center gap-2.5">
                              {/* Созвездие AI-звёзд с деликатным аутентичным свечением */}
                              <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Ненавязчивый мягкий ореол за звёздами */}
                                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#FFAD85]/25 via-[#8FE06E]/15 to-transparent blur-md animate-ai-halo" />

                                {/* Главная AI-звезда (четырехконечная) */}
                                <svg
                                  viewBox="0 0 32 32"
                                  className="w-8 h-8 text-[#181818] relative z-10 animate-ai-star-main"
                                  fill="currentColor"
                                >
                                  <path d="M16 2 C16 9.73 9.73 16 2 16 C9.73 16 16 22.27 16 30 C16 22.27 22.27 16 30 16 C22.27 16 16 9.73 16 2 Z" />
                                </svg>

                                {/* Спутница 1: Верхняя правая AI-звёздочка персикового цвета */}
                                <svg
                                  viewBox="0 0 32 32"
                                  className="w-4 h-4 text-[#FFAD85] absolute top-1 right-1 z-10 animate-ai-star-sub1"
                                  fill="currentColor"
                                >
                                  <path d="M16 2 C16 9.73 9.73 16 2 16 C9.73 16 16 22.27 16 30 C16 22.27 22.27 16 30 16 C22.27 16 16 9.73 16 2 Z" />
                                </svg>

                                {/* Спутница 2: Нижняя левая AI-звёздочка графитового цвета */}
                                <svg
                                  viewBox="0 0 32 32"
                                  className="w-3.5 h-3.5 text-[#181818]/60 absolute bottom-1.5 left-2 z-10 animate-ai-star-sub2"
                                  fill="currentColor"
                                >
                                  <path d="M16 2 C16 9.73 9.73 16 2 16 C9.73 16 16 22.27 16 30 C16 22.27 22.27 16 30 16 C22.27 16 16 9.73 16 2 Z" />
                                </svg>
                              </div>

                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-xs font-mono font-medium text-[#181818] tracking-tight">
                                  Построение векторного сюжета
                                </span>
                                <span className="text-[11px] font-mono text-[#737373]">
                                  {generationProgress}%
                                </span>
                              </div>

                              {/* Тонкая полоса прогресса на 6 секунд */}
                              <div className="w-36 h-1 rounded-full bg-black/10 overflow-hidden mt-0.5">
                                <div 
                                  className="h-full bg-[#181818] rounded-full transition-all duration-100 ease-linear"
                                  style={{ width: `${generationProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Векторная иллюстрация: бесшовно масштабируется внутри артборда */}
                        <div className={`w-full h-full p-2 flex items-center justify-center transition-all duration-500 ease-out ${isGenerating ? 'scale-95 opacity-25' : 'scale-100 opacity-100'}`}>
                          {!userImageFailed[generatedPreset.id] ? (
                            <img
                              src={`/${generatedPreset.imageFilename}`}
                              alt={generatedPreset.name}
                              className="w-full h-full object-contain select-none"
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.src.includes(`/${generatedPreset.imageFilename}`)) {
                                  img.src = `/assets/${generatedPreset.imageFilename}`;
                                } else if (img.src.endsWith('.svg')) {
                                  img.src = `/${generatedPreset.id}.svg`;
                                } else {
                                  setUserImageFailed(prev => ({ ...prev, [generatedPreset.id]: true }));
                                }
                              }}
                            />
                          ) : null}

                          {/* Запасной векторный рендер в случае отсутствия файла */}
                          {userImageFailed[generatedPreset.id] && (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              {generatedPreset.fallbackPose === 'laptop' && (
                                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M50 110C30 95 22 55 42 35C56 20 76 25 70 46C64 65 58 88 68 106" stroke="#181818" strokeWidth="3.5" fill="#FFAD85" strokeLinecap="round" />
                                  <ellipse cx="98" cy="98" rx="32" ry="38" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <ellipse cx="102" cy="102" rx="19" ry="24" fill="#FFF2EB" />
                                  <circle cx="104" cy="55" r="24" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <path d="M90 36L98 18L106 34" fill="#FFAD85" stroke="#181818" strokeWidth="3" />
                                  <path d="M112 34L120 18L126 36" fill="#FFAD85" stroke="#181818" strokeWidth="3" />
                                  <circle cx="97" cy="54" r="6.5" stroke="#181818" strokeWidth="2.5" fill="white" />
                                  <circle cx="113" cy="54" r="6.5" stroke="#181818" strokeWidth="2.5" fill="white" />
                                  <circle cx="97" cy="54" r="2.5" fill="#181818" />
                                  <circle cx="113" cy="54" r="2.5" fill="#181818" />
                                  <line x1="104" y1="54" x2="106" y2="54" stroke="#181818" strokeWidth="2.5" />
                                  <path d="M101 64C105 67 109 67 113 64" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
                                  <rect x="76" y="92" width="52" height="28" rx="3" fill="#181818" />
                                  <rect x="82" y="96" width="40" height="20" rx="2" fill="#8FE06E" />
                                  <path d="M100 103L105 106L100 109" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}

                              {generatedPreset.fallbackPose === 'tea' && (
                                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M48 110C30 95 24 55 42 35C56 20 75 25 68 46C62 65 56 88 65 106" stroke="#181818" strokeWidth="3.5" fill="#FFAD85" strokeLinecap="round" />
                                  <ellipse cx="98" cy="98" rx="32" ry="38" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <ellipse cx="102" cy="102" rx="19" ry="24" fill="#FFF2EB" />
                                  <circle cx="104" cy="52" r="24" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <path d="M92 34L100 18L106 32" fill="#FFAD85" stroke="#181818" strokeWidth="3" />
                                  <path d="M112 32L120 18L126 34" fill="#FFAD85" stroke="#181818" strokeWidth="3" />
                                  <circle cx="98" cy="52" r="2.5" fill="#181818" />
                                  <circle cx="112" cy="52" r="2.5" fill="#181818" />
                                  <path d="M100 60C104 63 108 63 112 60" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M92 90C92 84 116 84 116 90L114 112C114 116 94 116 94 112Z" fill="#F27A93" stroke="#181818" strokeWidth="3" />
                                  <path d="M116 96C122 96 122 106 116 106" stroke="#181818" strokeWidth="2.5" fill="none" />
                                  <path d="M100 80C98 74 102 70 100 66" stroke="#FFAD85" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M106 80C104 74 108 70 106 66" stroke="#8FE06E" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              )}

                              {generatedPreset.fallbackPose === 'exams' && (
                                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M50 110C30 95 22 55 42 35C56 20 76 25 70 46C64 65 58 88 68 106" stroke="#181818" strokeWidth="3.5" fill="#FFAD85" strokeLinecap="round" />
                                  <ellipse cx="98" cy="98" rx="32" ry="38" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <ellipse cx="102" cy="102" rx="19" ry="24" fill="#FFF2EB" />
                                  <circle cx="104" cy="55" r="24" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <circle cx="97" cy="54" r="6.5" stroke="#181818" strokeWidth="2.5" fill="white" />
                                  <circle cx="113" cy="54" r="6.5" stroke="#181818" strokeWidth="2.5" fill="white" />
                                  <line x1="104" y1="54" x2="106" y2="54" stroke="#181818" strokeWidth="2.5" />
                                  <path d="M72 108L100 104L128 108L126 126L100 122L74 126Z" fill="#FAF8F5" stroke="#181818" strokeWidth="3" />
                                  <line x1="100" y1="104" x2="100" y2="122" stroke="#181818" strokeWidth="2" />
                                  <line x1="78" y1="112" x2="94" y2="110" stroke="#737373" strokeWidth="1.5" />
                                  <line x1="78" y1="118" x2="92" y2="116" stroke="#737373" strokeWidth="1.5" />
                                  <line x1="106" y1="110" x2="122" y2="112" stroke="#737373" strokeWidth="1.5" />
                                  <line x1="106" y1="116" x2="120" y2="118" stroke="#737373" strokeWidth="1.5" />
                                </svg>
                              )}

                              {generatedPreset.fallbackPose === 'navigator' && (
                                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <ellipse cx="98" cy="98" rx="32" ry="38" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <circle cx="104" cy="52" r="24" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <path d="M120 74L150 64" stroke="#181818" strokeWidth="3.5" strokeLinecap="round" />
                                  <rect x="94" y="86" width="16" height="22" rx="2" fill="#8FE06E" stroke="#181818" strokeWidth="2" />
                                  <line x1="98" y1="80" x2="98" y2="86" stroke="#181818" strokeWidth="1.5" />
                                  <line x1="106" y1="80" x2="106" y2="86" stroke="#181818" strokeWidth="1.5" />
                                  <path d="M140 40L160 50L140 60Z" fill="#FFAD85" stroke="#181818" strokeWidth="2.5" />
                                </svg>
                              )}

                              {generatedPreset.fallbackPose === 'graduation' && (
                                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <ellipse cx="98" cy="98" rx="32" ry="38" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <circle cx="104" cy="54" r="24" fill="#FFAD85" stroke="#181818" strokeWidth="3.5" />
                                  <polygon points="104,26 134,36 104,46 74,36" fill="#181818" stroke="#181818" strokeWidth="2" />
                                  <rect x="94" y="44" width="20" height="6" fill="#181818" />
                                  <line x1="104" y1="36" x2="128" y2="48" stroke="#FFAD85" strokeWidth="2" />
                                  <rect x="80" y="90" width="38" height="14" rx="7" fill="#FFF2EB" stroke="#181818" strokeWidth="2.5" />
                                  <circle cx="108" cy="97" r="4" fill="#F27A93" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </FlatReveal>
        </div>

        {/* =========================================================
            НИЖНИЕ КАРТОЧКИ ПРЕИМУЩЕСТВ:
            - Чистый белый фон bg-white border border-black/10
            - Индивидуальные смысловые чипы
            - Идентичная выверенная длина абзацев (по 172-174 символа)
            - Акцентные маркеры HighlighterMark без монотонности
            ========================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch text-left">
          
          {/* КАРТОЧКА 1: ГОТОВЫЕ ПРОМПТЫ В TELEGRAM */}
          <FlatReveal direction="up" delay={180} distance={32} duration={800} className="w-full flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/10 p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-xs hover:border-black/20 transition-all duration-200 flex flex-col justify-start">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#737373] bg-[#FAF8F5] border border-black/5 self-start mb-3.5">
                Быстрый старт
              </span>

              <h4 className="text-base sm:text-lg font-bold text-[#181818] leading-tight mb-2.5">
                Готовые промпты в&nbsp;Telegram
              </h4>

              <p className="text-xs sm:text-[13px] text-[#181818]/75 leading-relaxed [text-wrap:pretty]">
                Тьюторам не&nbsp;нужно учиться сложным формулировкам нейросетей. 
                В&nbsp;папке собраны{' '}
                <HighlighterMark color="peach" variant="casual-sweep" delay={250}>
                  проверенные шаблоны
                </HighlighterMark>
                : достаточно выбрать тему и&nbsp;при&nbsp;необходимости скорректировать детали под&nbsp;свою задачу.
              </p>
            </div>
          </FlatReveal>

          {/* КАРТОЧКА 2: ВЕКТОРНЫЙ ФОРМАТ БЕЗ ШУМА */}
          <FlatReveal direction="up" delay={240} distance={32} duration={800} className="w-full flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/10 p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-xs hover:border-black/20 transition-all duration-200 flex flex-col justify-start">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#737373] bg-[#FAF8F5] border border-black/5 self-start mb-3.5">
                Масштабирование
              </span>

              <h4 className="text-base sm:text-lg font-bold text-[#181818] leading-tight mb-2.5">
                Векторная графика без&nbsp;шума
              </h4>

              <p className="text-xs sm:text-[13px] text-[#181818]/75 leading-relaxed [text-wrap:pretty]">
                Вместо случайного клипарта из&nbsp;поиска бот выдаёт{' '}
                <HighlighterMark color="green" variant="casual-sweep" delay={300}>
                  чистый вектор
                </HighlighterMark>{' '}
                в&nbsp;палитре ТГУ. Иллюстрации аккуратно встраиваются в&nbsp;презентации и&nbsp;сохраняют идеальную четкость контуров.
              </p>
            </div>
          </FlatReveal>

          {/* КАРТОЧКА 3: БЫСТРЫЙ РЕЗУЛЬТАТ ЗА СЕКУНДЫ */}
          <FlatReveal direction="up" delay={300} distance={32} duration={800} className="w-full flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/10 p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-xs hover:border-black/20 transition-all duration-200 flex flex-col justify-start">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#737373] bg-[#FAF8F5] border border-black/5 self-start mb-3.5">
                Самостоятельность
              </span>

              <h4 className="text-base sm:text-lg font-bold text-[#181818] leading-tight mb-2.5">
                Качественная графика за&nbsp;секунды
              </h4>

              <p className="text-xs sm:text-[13px] text-[#181818]/75 leading-relaxed [text-wrap:pretty]">
                К&nbsp;дизайнеру за&nbsp;каждой картинкой никто не&nbsp;обращается: материал нужен прямо сейчас. 
                Бот отдаёт готовую иллюстрацию{' '}
                <HighlighterMark color="rose" variant="casual-sweep" delay={350}>
                  за&nbsp;считанные секунды
                </HighlighterMark>{' '}
                со&nbsp;смартфона, сохраняя высокий уровень визуала.
              </p>
            </div>
          </FlatReveal>

        </div>

      </div>
    </section>
  );
};
