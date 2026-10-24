import React, { useEffect, useRef } from 'react';

/**
 * SiberianFrostFog - Visible, Serene Winter Breath Atmospheric Simulation (Зимнее дыхание на морозе).
 * 
 * Tuned with:
 * 1. CLEAR VISIBILITY & DEPTH:
 *    - Tangible, silky silver-cyan frost steam clearly visible against the dark emerald background.
 *    - Balanced opacity (~35-50% peak core density) so the effect is prominent yet refined.
 * 2. NATURAL LAMINAR BREATH DYNAMICS (No spinning):
 *    - Puffs do NOT spin or whirl like a cyclone.
 *    - They waft smoothly upward with gentle thermal buoyancy and soft lateral undulating sway.
 *    - Natural expansion: puffs expand and softly disperse as they rise into the freezing air.
 * 3. FULL-HEIGHT COVERAGE:
 *    - Wisps are distributed across the entire screen height on both left and right flanks.
 * 4. SILKY OPTICAL DIFFUSION:
 *    - 10px atmospheric blur provides soft, organic cloud borders without washing away the vapor volume.
 * 5. CRISP DIAMOND DUST:
 *    - Sharp, sparkling sub-zero micro-crystals catching the silver light.
 */
export const SiberianFrostFog: React.FC = () => {
  const fogCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const crystalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fogCanvas = fogCanvasRef.current;
    const crystalCanvas = crystalCanvasRef.current;
    if (!fogCanvas || !crystalCanvas) return;

    const fCtx = fogCanvas.getContext('2d');
    const cCtx = crystalCanvas.getContext('2d');
    if (!fCtx || !cCtx) return;

    let animId: number;
    let width = (fogCanvas.width = crystalCanvas.width = window.innerWidth);
    let height = (fogCanvas.height = crystalCanvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (prevMouseX !== -1000) {
        mouseVx = (e.clientX - prevMouseX) * 0.12;
        mouseVy = (e.clientY - prevMouseY) * 0.12;
      }
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onResize = () => {
      if (!fogCanvas || !crystalCanvas) return;
      width = fogCanvas.width = crystalCanvas.width = window.innerWidth;
      height = fogCanvas.height = crystalCanvas.height = window.innerHeight;
      initAtmosphere();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // --- PROCEDURAL ORGANIC VOLUMETRIC STEAM PUFF SPRITES ---
    // Creates organic cloud-like puffs with visible silver-white condensation cores
    const createBreathSprite = (radius: number, seed: number) => {
      const offCanvas = document.createElement('canvas');
      const size = Math.ceil(radius * 2.8);
      offCanvas.width = size;
      offCanvas.height = size;
      const oCtx = offCanvas.getContext('2d');
      if (!oCtx) return offCanvas;

      const center = size / 2;

      // 1. Tangible condensation core (visible silver-white frost vapor)
      const coreGrad = oCtx.createRadialGradient(center, center, 0, center, center, radius);
      coreGrad.addColorStop(0, 'rgba(244, 250, 255, 0.65)');
      coreGrad.addColorStop(0.35, 'rgba(224, 242, 252, 0.40)');
      coreGrad.addColorStop(0.7, 'rgba(190, 222, 238, 0.14)');
      coreGrad.addColorStop(0.92, 'rgba(165, 205, 225, 0.03)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      oCtx.fillStyle = coreGrad;
      oCtx.beginPath();
      oCtx.arc(center, center, radius, 0, Math.PI * 2);
      oCtx.fill();

      // 2. Secondary soft organic cloud lobes for natural cumulus puff contours
      const lobes = 4;
      for (let i = 0; i < lobes; i++) {
        const angle = (i / lobes) * Math.PI * 2 + seed * 1.6;
        const dist = radius * 0.38;
        const lx = center + Math.cos(angle) * dist;
        const ly = center + Math.sin(angle) * dist;
        const lr = radius * 0.65;

        const lobeGrad = oCtx.createRadialGradient(lx, ly, 0, lx, ly, lr);
        lobeGrad.addColorStop(0, 'rgba(238, 248, 255, 0.42)');
        lobeGrad.addColorStop(0.4, 'rgba(215, 238, 250, 0.22)');
        lobeGrad.addColorStop(0.8, 'rgba(185, 218, 235, 0.05)');
        lobeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        oCtx.fillStyle = lobeGrad;
        oCtx.beginPath();
        oCtx.arc(lx, ly, lr, 0, Math.PI * 2);
        oCtx.fill();
      }

      return offCanvas;
    };

    const breathSprites = [
      createBreathSprite(95, 1.2),  // Large billowing breath cloud
      createBreathSprite(70, 3.4),  // Medium curling wisp
      createBreathSprite(50, 5.1),  // Compact fresh vapor puff
    ];

    interface BreathPuff {
      x: number;
      y: number;
      baseX: number;
      vy: number;
      scale: number;
      baseScale: number;
      maxScale: number;
      scaleGrowth: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
      side: 'left' | 'right';
      spriteIndex: number;
      swayPhase: number;
      swayAmp: number;
    }

    interface IceCrystal {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      side: 'left' | 'right';
      twinkle: number;
      twinkleSpeed: number;
    }

    let breathPuffs: BreathPuff[] = [];
    let iceCrystals: IceCrystal[] = [];

    const initAtmosphere = () => {
      breathPuffs = [];
      iceCrystals = [];

      // Determine flank width and background spread
      const flankZone = Math.max(Math.min((width - 1100) / 2, 260), 120);

      const isMobile = width < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

      // Balanced count for visible, rich background atmosphere without GPU scroll lag
      const puffCount = isMobile ? 10 : Math.floor(Math.min(Math.max(width * 0.02, 18), 35));
      const crystalCount = isMobile ? 12 : Math.floor(Math.min(Math.max(width * 0.022, 16), 36));

      const spawnPuff = (isInitial: boolean = false, sideChoice?: 'left' | 'right' | 'center'): BreathPuff => {
        const side: 'left' | 'right' | 'center' = sideChoice || (Math.random() < 0.45 ? 'left' : (Math.random() < 0.9 ? 'right' : 'center'));
        const maxLife = 260 + Math.random() * 260; // 4 to 9 seconds life cycle
        const initialLife = isInitial ? Math.random() * maxLife : 0;

        // Position across background: flanks have denser steam, center has gentle ambient vapor
        let x: number;
        if (side === 'left') {
          x = Math.random() * (flankZone + 120);
        } else if (side === 'right') {
          x = width - Math.random() * (flankZone + 120);
        } else {
          x = flankZone + Math.random() * (width - flankZone * 2);
        }

        const y = Math.random() * (height + 160) - 80;

        // Gentle upward buoyancy (serene drifting)
        const vy = -0.30 - Math.random() * 0.40;
        const baseScale = 0.75 + Math.random() * 0.45;
        const maxScale = baseScale * (1.7 + Math.random() * 0.6);

        return {
          x,
          y,
          baseX: x,
          vy,
          scale: baseScale,
          baseScale,
          maxScale,
          scaleGrowth: (maxScale - baseScale) / maxLife,
          alpha: 0,
          // Prominently visible silver-frost vapor opacity: 0.35 - 0.60
          maxAlpha: 0.35 + Math.random() * 0.25,
          life: initialLife,
          maxLife,
          side: side === 'center' ? (Math.random() < 0.5 ? 'left' : 'right') : side,
          spriteIndex: Math.floor(Math.random() * breathSprites.length),
          swayPhase: Math.random() * Math.PI * 2,
          swayAmp: 16 + Math.random() * 22,
        };
      };

      for (let i = 0; i < puffCount; i++) {
        breathPuffs.push(spawnPuff(true, i % 3 === 0 ? 'left' : (i % 3 === 1 ? 'right' : 'center')));
      }

      for (let i = 0; i < crystalCount; i++) {
        const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
        const offset = 10 + Math.random() * (flankZone + 80);
        iceCrystals.push({
          x: side === 'left' ? offset : width - offset,
          y: Math.random() * height,
          size: 0.8 + Math.random() * 1.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: 0.22 + Math.random() * 0.40,
          side,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.03 + Math.random() * 0.04,
        });
      }
    };

    initAtmosphere();

    let time = 0;

    const render = () => {
      time += 0.016;
      mouseVx *= 0.9;
      mouseVy *= 0.9;

      fCtx.clearRect(0, 0, width, height);
      cCtx.clearRect(0, 0, width, height);

      const flankZone = Math.max(Math.min((width - 1100) / 2, 240), 90);

      // --- 1. RENDER VISIBLE WINTER BREATH PUFFS (No spinning, calm drifting) ---
      for (let i = 0; i < breathPuffs.length; i++) {
        const puff = breathPuffs[i];
        puff.life += 1;

        // Respawn when life ends or drifted off top
        if (puff.life >= puff.maxLife || puff.y < -120) {
          puff.life = 0;
          puff.y = height + 10 + Math.random() * 60;
          const offset = 15 + Math.random() * (flankZone - 20);
          puff.x = puff.side === 'left' ? offset : width - offset;
          puff.baseX = puff.x;
          puff.alpha = 0;
          puff.scale = puff.baseScale;
          puff.vy = -0.35 - Math.random() * 0.45;
          puff.swayPhase = Math.random() * Math.PI * 2;
          puff.maxAlpha = 0.40 + Math.random() * 0.25;
        }

        // Natural breath condensation envelope:
        // Condenses in (0 -> 25%), billows comfortably (25% -> 60%), dissolves into frost air (60% -> 100%)
        const progress = puff.life / puff.maxLife;
        if (progress < 0.25) {
          puff.alpha = (progress / 0.25) * puff.maxAlpha;
        } else if (progress < 0.60) {
          puff.alpha = puff.maxAlpha;
        } else {
          puff.alpha = (1 - (progress - 0.60) / 0.40) * puff.maxAlpha;
        }

        // Natural expansion as warm breath expands into cold air
        if (puff.scale < puff.maxScale) {
          puff.scale += puff.scaleGrowth;
        }

        // Calm, soothing lateral wafting (sinusoidal sway, zero angular spinning)
        const sway = Math.sin(time * 0.75 + puff.swayPhase) * puff.swayAmp;
        puff.x = puff.baseX + sway;
        puff.y += puff.vy;

        // Gentle cursor interaction (mist parts and drifts aside smoothly)
        const isNearEdge = mouseX > -100 && (mouseX < flankZone + 100 || mouseX > width - flankZone - 100);
        if (isNearEdge) {
          const dx = puff.x - mouseX;
          const dy = puff.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400 && distSq > 0) { // 180px radius
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 180) * 1.2;
            puff.x += (dx / dist) * force * 1.2 + mouseVx * 0.2;
            puff.y += (dy / dist) * force * 1.2 + mouseVy * 0.2;
          }
        }

        const sprite = breathSprites[puff.spriteIndex];
        const halfSize = sprite.width / 2;

        fCtx.save();
        fCtx.globalAlpha = Math.max(0, Math.min(1, puff.alpha));
        fCtx.translate(puff.x, puff.y);
        fCtx.scale(puff.scale, puff.scale);
        fCtx.drawImage(sprite, -halfSize, -halfSize);
        fCtx.restore();
      }

      // --- 2. RENDER SHARP SCINTILLATING DIAMOND DUST (АЛМАЗНАЯ ПЫЛЬ) ---
      for (let i = 0; i < iceCrystals.length; i++) {
        const crystal = iceCrystals[i];
        crystal.y += crystal.vy;
        crystal.twinkle += crystal.twinkleSpeed;
        crystal.x += crystal.vx + Math.sin(time * 0.9 + i) * 0.2;

        if (crystal.y > height + 8) {
          crystal.y = -8;
          const offset = 10 + Math.random() * flankZone;
          crystal.x = crystal.side === 'left' ? offset : width - offset;
        }

        const brightness = 0.35 + 0.65 * Math.abs(Math.sin(crystal.twinkle));
        cCtx.fillStyle = `rgba(242, 250, 255, ${brightness * 0.9})`;
        cCtx.beginPath();
        cCtx.arc(crystal.x, crystal.y, crystal.size, 0, Math.PI * 2);
        cCtx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-14 sm:top-16 bottom-0 z-0 overflow-hidden select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0px, black 32px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 32px, black 100%)',
      }}
      aria-hidden="true"
    >
      {/* 1. Volumetric Winter Breath Canvas (Ощутимый, бархатистый морозный пар) */}
      <canvas
        ref={fogCanvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          transform: 'translateZ(0)',
        }}
      />

      {/* 2. Crisp Scintillating Diamond Dust (Резкие искрящиеся кристаллики льда) */}
      <canvas
        ref={crystalCanvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 3. Subtle Hoarfrost Window Edge Fringe (Тонкая морозная кромка) */}
      <div 
        className="absolute inset-y-0 left-0 w-6 sm:w-10 opacity-20 frost-ice-pattern pointer-events-none mix-blend-screen"
        style={{
          maskImage: 'linear-gradient(to right, black 15%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 15%, transparent 100%)',
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-6 sm:w-10 opacity-20 frost-ice-pattern pointer-events-none mix-blend-screen"
        style={{
          maskImage: 'linear-gradient(to left, black 15%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 15%, transparent 100%)',
        }}
      />
    </div>
  );
};
