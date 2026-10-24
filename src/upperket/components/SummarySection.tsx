import React, { useMemo } from 'react';
import { CASE_STUDY_DATA } from '../data/caseStudyData';

export const SummarySection: React.FC = () => {
  // Generate 12 random pages, one from each chapter
  const randomPages = useMemo(() => {
    const tilts = ['-rotate-2', 'rotate-1', '-rotate-1.5', 'rotate-2'];
    
    return CASE_STUDY_DATA.chapters.map((chapter, i) => {
      const start = chapter.pageNumber;
      const end = chapter.endPageNumber || start;
      const randomPage = Math.floor(Math.random() * (end - start + 1)) + start;
      const pageStr = String(randomPage).padStart(3, '0');
      
      return {
        src: `/dictionary-pages/page_${pageStr}.webp`,
        tilt: tilts[i % tilts.length],
        title: chapter.title
      };
    });
  }, []);

  return (
    <section 
      id="panorama" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'calc(var(--section-padding) - 1rem)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-10 lg:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8">
          <div className="col-span-12 lg:col-start-5 lg:col-end-13">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Панорама страниц книги
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Галерея печатных полос
            </h2>
          </div>
        </div>
      </div>

      {/* Галерея (на всю ширину с защитой от горизонтального скролла на мобильных) */}
      <div className="w-full max-w-full overflow-hidden py-4" role="region" aria-label="Галерея разворотов книги">
        <div className="flex items-center gap-6 animate-marquee w-max select-none">
          {/* 12 уникальных страниц */}
          {randomPages.map((page, i) => (
            <div 
              key={i} 
              className={`w-[210px] sm:w-[280px] lg:w-[320px] shrink-0 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.4,1)] ${page.tilt} hover:rotate-0 hover:scale-105`}
            >
              <div className="overflow-hidden rounded-xl border border-[#1C1C1C]/15 bg-white aspect-[210/297] m3-card-interactive m3-image-interactive">
                <img 
                  src={page.src} 
                  alt={`Страница из раздела ${page.title}`}
                  className="w-full h-full object-cover block"
                  loading="eager"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.triedRoot) {
                      t.dataset.triedRoot = 'true';
                      t.src = '/challenge_adaptation.jpg';
                    }
                  }}
                />
              </div>
            </div>
          ))}
          {/* Дубликат для бесконечного цикла, скрытый от скринридеров */}
          {randomPages.map((page, i) => (
            <div 
              key={`dup-${i}`} 
              aria-hidden="true"
              className={`w-[210px] sm:w-[280px] lg:w-[320px] shrink-0 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.4,1)] ${page.tilt} hover:rotate-0 hover:scale-105`}
            >
              <div className="overflow-hidden rounded-xl border border-[#1C1C1C]/15 bg-white aspect-[210/297] m3-card-interactive m3-image-interactive">
                <img 
                  src={page.src} 
                  alt=""
                  className="w-full h-full object-cover block"
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
