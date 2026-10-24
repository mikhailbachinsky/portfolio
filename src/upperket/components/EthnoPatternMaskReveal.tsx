import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

export interface EthnoPatternMaskRevealRef {
  replay: () => void;
}

interface EthnoPatternMaskRevealProps {
  revealProgress: number; // Controlled directly: 0 = hidden, 1 = fully revealed
  leftPageUrl: string | null;
  rightPageUrl: string | null;
  children: React.ReactNode;
}

// Exact physical book paper boundaries from book-mask.svg
export const LEFT_PAGE_PATH = "M942.499 240V139.5L332.5 140L331.5 141.5V188C331.667 201.667 331.8 229.8 331 233C330 237 332 255 332 258C332 261 331.5 280.5 331 285C330.6 288.6 329.167 319.167 328.5 334L329.5 386.5C328.5 391 331.5 439 330.5 441.5C329.7 443.5 329.5 470.333 329.5 483.5V630.5C329.667 641.5 329.9 664.1 329.5 666.5C329 669.5 329.5 694.5 331.5 697.5C333.5 700.5 331 727.5 331 732.5C331 737.5 330 762 328.5 768C327 774 333 806.5 330 807.5C327 808.5 328.5 818.5 328.5 820C328.5 821.5 329.5 831 328.5 834C327.5 837 331.5 857 330 858.5C328.5 860 329 879.5 328.5 881C328 882.5 332 888 329 893C326.6 897 328.667 906.667 330 911L327.5 969C327.1 985.4 332 991.167 334.5 992L937 996L941 995.5V872L924 871.5C907.5 896.5 879.5 866.5 896.5 851.5C910.5 839.147 922.333 851.667 924 859L941.5 860C941.666 795.167 942 665.4 942 665C942 664.6 930 664.167 924 664C924.667 665.833 923 670.6 911 675C896 680.5 878 653.5 899 643.5C915.8 635.5 922.667 646.167 924 652.5L942 651L942.5 457.5C928.5 456.7 924.667 457.833 924.5 458.5C910.5 487 882 462.5 893.5 445C904.832 427.756 922.204 445.201 922.984 445.984L923 446C923.4 446.4 936.166 445.5 942.499 445V253C928.098 252.6 924.499 253.833 924.5 254.5C919.5 271 906.001 268 901.5 266.5C895.781 264.594 883.002 248.5 896.999 238C908.456 229.406 918.166 237.167 921.499 242C925.099 240.8 936.999 240.167 942.499 240Z";
export const RIGHT_PAGE_PATH = "M994.509 242.001C989.509 242.001 968.009 240.668 962.509 240.501C962.509 240.501 958.53 172.327 961.509 147.001C962.509 138.501 971.509 134.001 971.509 134.001C971.509 134.001 1336 135 1571.5 133.001C1577 132.955 1579.5 136.5 1580.5 142.001C1581.41 147.029 1583 699.321 1583 973.501C1583.4 989.901 1580.5 989.668 1578 990.501L984.509 992.501C984.509 992.501 963.588 993.161 961.509 984.501C958.509 972.001 961.509 871.501 961.509 871.501H993.509C1010.01 896.501 1037.01 869.001 1020.01 854.001C1006.01 841.648 994.177 854.168 992.51 861.501L961.509 860.501C961.343 795.668 964.009 664.901 964.009 664.501C964.009 664.101 986.509 664.668 992.509 664.501C994.009 666.501 994.509 672.101 1006.51 676.501C1021.51 682.001 1036.51 652.501 1017.51 646.001C1003.28 641.133 999.009 647.501 995.509 653.001H964.509V457.501C978.509 456.702 991.343 457.835 991.509 458.501C1005.51 487.001 1034.51 465.001 1023.01 447.501C1011.7 430.287 995.834 446.174 993.574 448.437L993.51 448.501C993.109 448.901 970.842 447.001 964.509 446.501L962.509 252.001C976.91 251.601 992.01 253.835 992.009 254.501C997.009 267.501 1009.01 268.001 1014.01 267.001C1019.92 265.819 1033.01 252.001 1022.01 240.501C1009.05 226.957 997.843 237.168 994.509 242.001Z";

export const EthnoPatternMaskReveal = forwardRef<EthnoPatternMaskRevealRef, EthnoPatternMaskRevealProps>(({
  revealProgress,
  leftPageUrl,
  rightPageUrl,
  children,
}, ref) => {
  // Replay animation override state
  const [replayProg, setReplayProg] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    replay: () => {
      let startTime = performance.now();
      const duration = 1200;
      setReplayProg(0);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        setReplayProg(p);
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          setReplayProg(null);
        }
      };
      requestAnimationFrame(step);
    }
  }));

  // Effective progress: if user triggered manual replay, use replayProg; otherwise strictly driven by scroll
  const effectiveProgress = replayProg !== null ? replayProg : Math.max(0, Math.min(revealProgress, 1));

  // Cubic smooth appearance
  const t = effectiveProgress < 0.5 
    ? 4 * effectiveProgress * effectiveProgress * effectiveProgress 
    : 1 - Math.pow(-2 * effectiveProgress + 2, 3) / 2;

  // Progressive Photographic Development Curves:
  // 1. Latent ink shadows appear directly from paper texture
  const contrast = 1.0 + (1 - t) * 0.75;
  const saturate = 0.35 + t * 0.65;
  const blur = Math.max(0, (1 - t) * 2.2);
  const brightness = 1.0 + (1 - t) * 0.08;
  const inkOpacity = Math.min(t * 1.15, 1);
  const fixOpacity = t > 0.65 ? (t - 0.65) / 0.35 : 0;

  // SVG Mask Coordinates
  const LEFT_PAGE = { x: 327, y: 134, width: 628, height: 860 };
  const RIGHT_PAGE = { x: 955, y: 134, width: 628, height: 860 };

  const isFullyRevealed = effectiveProgress >= 0.999;
  const isPartiallyRevealed = effectiveProgress > 0.001 && !isFullyRevealed;

  return (
    <div className="relative w-full h-full pointer-events-auto select-none">
      {/* 
        INTERACTIVE BOOK ENGINE:
        Always mounted underneath without unmounting or blinking.
        Opacity smoothly follows progress. When fully open (progress >= 1.0), receives 100% pointer events.
      */}
      <div
        className="w-full h-full relative"
        style={{
          opacity: effectiveProgress,
          pointerEvents: effectiveProgress >= 0.9 ? 'auto' : 'none',
        }}
      >
        {children}
      </div>

      {/* 
        ORGANIC LATENT DEVELOPMENT OVERLAY:
        Active ONLY while animating (effectiveProgress between 0.001 and 0.999).
        When effectiveProgress reaches 1.0, this overlay has opacity 0 and children are fully visible.
        When scrolling back down (effectiveProgress < 1.0), this overlay seamlessly tracks scroll position!
      */}
      {isPartiallyRevealed && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-30"
          viewBox="0 0 1920 1080"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="book-exact-leaves-clip">
              <path d={LEFT_PAGE_PATH} />
              <path d={RIGHT_PAGE_PATH} />
            </clipPath>
          </defs>

          <g clipPath="url(#book-exact-leaves-clip)">
            {/* Pass 1: Paper-Fiber Latent Ink (Multiply Blend) */}
            <g
              style={{
                opacity: inkOpacity,
                filter: `contrast(${contrast}) saturate(${saturate}) brightness(${brightness}) blur(${blur}px)`,
                mixBlendMode: 'multiply',
              }}
            >
              {leftPageUrl && (
                <image
                  href={leftPageUrl}
                  x={LEFT_PAGE.x}
                  y={LEFT_PAGE.y}
                  width={LEFT_PAGE.width}
                  height={LEFT_PAGE.height}
                  preserveAspectRatio="none"
                />
              )}
              {rightPageUrl && (
                <image
                  href={rightPageUrl}
                  x={RIGHT_PAGE.x}
                  y={RIGHT_PAGE.y}
                  width={RIGHT_PAGE.width}
                  height={RIGHT_PAGE.height}
                  preserveAspectRatio="none"
                />
              )}
            </g>

            {/* Pass 2: Photographic Fixation Pass (Normal Blend) */}
            {fixOpacity > 0.01 && (
              <g style={{ opacity: fixOpacity }}>
                {leftPageUrl && (
                  <image
                    href={leftPageUrl}
                    x={LEFT_PAGE.x}
                    y={LEFT_PAGE.y}
                    width={LEFT_PAGE.width}
                    height={LEFT_PAGE.height}
                    preserveAspectRatio="none"
                  />
                )}
                {rightPageUrl && (
                  <image
                    href={rightPageUrl}
                    x={RIGHT_PAGE.x}
                    y={RIGHT_PAGE.y}
                    width={RIGHT_PAGE.width}
                    height={RIGHT_PAGE.height}
                    preserveAspectRatio="none"
                  />
                )}
              </g>
            )}

            {/* Subtle central spine crease */}
            <rect
              x={955 - 15}
              y={LEFT_PAGE.y}
              width={30}
              height={LEFT_PAGE.height}
              fill="black"
              opacity="0.04"
            />
          </g>
        </svg>
      )}
    </div>
  );
});

EthnoPatternMaskReveal.displayName = 'EthnoPatternMaskReveal';
