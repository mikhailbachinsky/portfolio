import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export interface PuzzleCompositionProps {
  className?: string;
  rotation?: number;
  targetRef?: React.RefObject<HTMLElement | null>;
  enableScrollAnimation?: boolean;
}

/**
 * PuzzleComposition:
 * - Экстремально большой изначальный масштаб и разброс пазлов (визуально парят еще в секции Контекста)
 * - Сильно контрастные масштабы отдельных деталей (от 0.65 до 1.55)
 * - По мере скролла к секции Задачи сходятся воедино по центру и ОСТАЮТСЯ СОБРАННЫМИ при дальнейшем скролле
 */
export const PuzzleComposition: React.FC<PuzzleCompositionProps> = ({
  className = '',
  rotation = -30,
  targetRef,
  enableScrollAnimation = true,
}) => {
  const [photoError, setPhotoError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeRef = targetRef || localRef;

  // Отслеживание прогресса скролла по всему блоку
  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ['start end', 'end start'],
  });

  // Отзывчивая кинематика
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 24,
    mass: 0.3,
    restDelta: 0.001,
  });

  // --------------------------------------------------------------------------
  // Экстремальный разброс и фиксация после сборки:
  // - [0 .. 0.46]: Экстремально разбросаны в пространстве с огромным масштабом
  // - [0.48 .. 1.0]: Собрались в монолитную форму (0, 0, scale 1.0) и ОСТАЮТСЯ СОБРАННЫМИ
  // --------------------------------------------------------------------------

  // 1. ЗЕЛЕНЫЙ ПАЗЛ (Верхний левый) — масштаб 1.55, вылетает далеко сверху-слева
  const greenXScatter = isDesktop ? -240 : -120;
  const greenYScatter = isDesktop ? -200 : -100;
  const greenRotateScatter = isDesktop ? -38 : -20;

  const greenX = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [greenXScatter, 0, 0] : [0, 0, 0]);
  const greenY = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [greenYScatter, 0, 0] : [0, 0, 0]);
  const greenRotate = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [greenRotateScatter, 0, 0] : [0, 0, 0]);
  const greenScale = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [1.55, 1, 1] : [1, 1, 1]);

  // 2. ПАЗЛ С ФОТОГРАФИЕЙ (Верхний по центру) — компактный масштаб 0.65, вылетает сверху-справа
  const photoXScatter = isDesktop ? 220 : 110;
  const photoYScatter = isDesktop ? -220 : -110;
  const photoRotateScatter = isDesktop ? 28 : 16;

  const photoX = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [photoXScatter, 0, 0] : [0, 0, 0]);
  const photoY = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [photoYScatter, 0, 0] : [0, 0, 0]);
  const photoRotate = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [photoRotateScatter, 0, 0] : [0, 0, 0]);
  const photoScale = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [0.65, 1, 1] : [1, 1, 1]);

  // 3. ПЕРСИКОВЫЙ ПАЗЛ (Нижний по центру) — крупный масштаб 1.45, вылетает снизу-слева
  const peachXScatter = isDesktop ? -200 : -100;
  const peachYScatter = isDesktop ? 210 : 105;
  const peachRotateScatter = isDesktop ? 32 : 18;

  const peachX = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [peachXScatter, 0, 0] : [0, 0, 0]);
  const peachY = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [peachYScatter, 0, 0] : [0, 0, 0]);
  const peachRotate = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [peachRotateScatter, 0, 0] : [0, 0, 0]);
  const peachScale = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [1.45, 1, 1] : [1, 1, 1]);

  // 4. РОЗОВЫЙ ПАЗЛ (Нижний правый) — компактный масштаб 0.72, вылетает снизу-справа
  const pinkXScatter = isDesktop ? 250 : 125;
  const pinkYScatter = isDesktop ? 200 : 100;
  const pinkRotateScatter = isDesktop ? -30 : -16;

  const pinkX = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [pinkXScatter, 0, 0] : [0, 0, 0]);
  const pinkY = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [pinkYScatter, 0, 0] : [0, 0, 0]);
  const pinkRotate = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [pinkRotateScatter, 0, 0] : [0, 0, 0]);
  const pinkScale = useTransform(smoothProgress, [0, 0.48, 1], enableScrollAnimation ? [0.72, 1, 1] : [1, 1, 1]);

  // Точные математические контуры SVG без зазоров на стыках (viewBox 0 0 600 400)
  const greenPath =
    'M 0 18 A 18 18 0 0 1 18 0 L 200 0 L 200 59.7 C 200 65.39, 195.26 69.83, 189.9 71.74 C 178.3 75.89, 170 86.98, 170 100 C 170 113.02, 178.3 124.11, 189.9 128.26 C 195.26 130.17, 200 134.61, 200 140.3 L 200 200 L 140.3 200 C 134.61 200, 130.17 195.26, 128.26 189.9 C 124.11 178.3, 113.02 170, 100 170 C 86.98 170, 75.89 178.3, 71.74 189.9 C 69.83 195.26, 65.39 200, 59.7 200 L 18 200 A 18 18 0 0 1 0 182 L 0 18 Z';

  const photoPath =
    'M 200 0 L 382 0 A 18 18 0 0 1 400 18 L 400 182 A 18 18 0 0 1 382 200 L 340.3 200 C 334.61 200, 330.17 195.26, 328.26 189.9 C 324.11 178.3, 313.02 170, 300 170 C 286.98 170, 275.89 178.3, 271.74 189.9 C 269.83 195.26, 265.39 200, 259.7 200 L 200 200 L 200 140.3 C 200 134.61, 195.26 130.17, 189.9 128.26 C 178.3 124.11, 170 113.02, 170 100 C 170 86.98, 178.3 75.89, 189.9 71.74 C 195.26 69.83, 200 65.39, 200 59.7 L 200 0 Z';

  const peachPath =
    'M 200 200 L 259.7 200 C 265.39 200, 269.83 195.26, 271.74 189.9 C 275.89 178.3, 286.98 170, 300 170 C 313.02 170, 324.11 178.3, 328.26 189.9 C 330.17 195.26, 334.61 200, 340.3 200 L 400 200 L 400 259.7 C 400 265.39, 404.74 269.83, 410.1 271.74 C 421.7 275.89, 430 286.98, 430 300 C 430 313.02, 421.7 324.11, 410.1 328.26 C 404.74 330.17, 400 334.61, 400 340.3 L 400 400 L 218 400 A 18 18 0 0 1 200 382 L 200 200 Z';

  const pinkPath =
    'M 400 200 L 459.7 200 C 465.39 200, 469.83 195.26, 471.74 189.9 C 475.89 178.3, 486.98 170, 500 170 C 513.02 170, 524.11 178.3, 528.26 189.9 C 530.17 195.26, 534.61 200, 540.3 200 L 582 200 A 18 18 0 0 1 600 218 L 600 382 A 18 18 0 0 1 582 400 L 400 400 L 400 340.3 C 400 334.61, 404.74 330.17, 410.1 328.26 C 421.7 324.11, 430 313.02, 430 300 C 430 286.98, 421.7 275.89, 410.1 271.74 C 404.74 269.83, 400 265.39, 400 259.7 L 400 200 Z';

  return (
    <div
      ref={localRef}
      className={`w-full flex items-center justify-center select-none ${className}`}
    >
      {/* 
        Контейнер группы пазлов:
        - Задает базовый наклон всей группы (-30°)
        - Увеличенный крупный масштаб группы (до 640px)
        - Экстремальный разброс и фиксация в собранном состоянии
      */}
      <div
        className="w-full max-w-[460px] sm:max-w-[560px] lg:max-w-[640px] relative aspect-[600/400]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* 1. ЗЕЛЕНЫЙ ПАЗЛ (Верхний левый) */}
        <motion.div
          className="absolute inset-0 z-10 will-change-transform pointer-events-none"
          style={{
            x: greenX,
            y: greenY,
            rotate: greenRotate,
            scale: greenScale,
            transformOrigin: '16.7% 25%',
          }}
        >
          <svg
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-xs"
          >
            <path d={greenPath} fill="#8FE06E" />
          </svg>
        </motion.div>

        {/* 2. ПЕРСИКОВЫЙ ПАЗЛ (Нижний по центру) */}
        <motion.div
          className="absolute inset-0 z-20 will-change-transform pointer-events-none"
          style={{
            x: peachX,
            y: peachY,
            rotate: peachRotate,
            scale: peachScale,
            transformOrigin: '50% 75%',
          }}
        >
          <svg
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-xs"
          >
            <path d={peachPath} fill="#FFAD85" />
          </svg>
        </motion.div>

        {/* 3. РОЗОВЫЙ ПАЗЛ (Нижний правый) */}
        <motion.div
          className="absolute inset-0 z-20 will-change-transform pointer-events-none"
          style={{
            x: pinkX,
            y: pinkY,
            rotate: pinkRotate,
            scale: pinkScale,
            transformOrigin: '83.3% 75%',
          }}
        >
          <svg
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-xs"
          >
            <path d={pinkPath} fill="#F27A93" />
          </svg>
        </motion.div>

        {/* 4. ПАЗЛ С ФОТОГРАФИЕЙ КОМАНДЫ (Верхний по центру) */}
        <motion.div
          className="absolute inset-0 z-30 will-change-transform pointer-events-auto"
          style={{
            x: photoX,
            y: photoY,
            rotate: photoRotate,
            scale: photoScale,
            transformOrigin: '50% 25%',
          }}
        >
          <svg
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-xs"
          >
            <defs>
              <clipPath id="photoPuzzlePieceClip">
                <path d={photoPath} />
              </clipPath>
            </defs>
            <g clipPath="url(#photoPuzzlePieceClip)">
              <path d={photoPath} fill="#FAF8F5" />
              {!photoError ? (
                <image
                  href="/assets/team-selfie.jpg"
                  x="165"
                  y="0"
                  width="235"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <g transform="translate(170, 0)">
                  <rect width="230" height="200" fill="#EAE8E3" />
                  <circle cx="115" cy="90" r="30" fill="#181818" fillOpacity="0.1" />
                  <text x="115" y="96" textAnchor="middle" fontSize="26">👥</text>
                  <text x="115" y="140" textAnchor="middle" fontSize="12" fill="#737373" fontFamily="sans-serif">
                    Тьюторы ТГУ
                  </text>
                </g>
              )}
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
