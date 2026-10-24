import React, { useState, useCallback, useRef } from 'react';

export interface ParticleItem {
  id: string;
  targetId?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  gravityY: number;
  scale: number;
  rotation: number;
  delayMs: number;
  durationMs: number;
  type: 'emoji' | 'sticker' | 'shape' | 'sparkle';
  content?: string;
  color?: string;
  size?: number;
}

interface ShockwaveItem {
  id: string;
  targetId?: string;
  x: number;
  y: number;
  color: string;
}

const BRAND_EMOJIS = ['🐿️', '🧩', '✨', '💖', '⭐', '🍃', '💬', '⚡', '🎉', '🎓', '🌟', '🎨', '🔥', '💡', '✦'];
const MERCH_EMOJIS = ['👕', '☕', '🏷️', '🧦', '🎒', '📜', '🏆', '🧩', '✨', '🐿️', '💖', '⭐️', '💡', '🎓', '🎉', '✦'];
const BRAND_COLORS = [
  '#FFAD85', // Peach
  '#8FE06E', // Green
  '#F27A93', // Pink
  '#181818', // Graphite
  '#FFE5D9', // Soft peach
  '#D8F5CC', // Soft green
  '#FFD1DC', // Soft pink
];

const STICKER_IMAGES = [
  '/assets/digital-sticker-1.webp',
  '/assets/digital-sticker-2.webp',
  '/assets/digital-sticker-3.webp',
  '/assets/digital-sticker-4.webp',
  '/assets/digital-sticker-5.webp',
  '/assets/digital-sticker-6.webp',
  '/assets/digital-sticker-7.webp',
  '/assets/digital-sticker-8.webp',
  '/assets/mascot-emotion-1.webp',
  '/assets/mascot-emotion-2.webp',
  '/assets/mascot-emotion-3.webp',
  '/assets/mascot-emotion-4.webp',
  '/assets/mascot-emotion-5.webp',
  '/assets/mascot-emotion-6.webp',
  '/assets/mascot-emotion-7.webp',
];

export const useParticleBurst = (theme: 'sticker' | 'merch' = 'sticker') => {
  const [particles, setParticles] = useState<ParticleItem[]>([]);
  const [shockwaves, setShockwaves] = useState<ShockwaveItem[]>([]);
  const idCounter = useRef(0);

  const triggerBurst = useCallback(
    (
      e?: React.MouseEvent<HTMLElement> | { x?: number; y?: number },
      targetId?: string
    ) => {
      let originX = 50;
      let originY = 50;

      if (e && 'currentTarget' in e && e.currentTarget) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          originX = ((e.clientX - rect.left) / rect.width) * 100;
          originY = ((e.clientY - rect.top) / rect.height) * 100;
        }
      } else if (e && 'x' in e && e.x !== undefined && e.y !== undefined) {
        originX = e.x;
        originY = e.y;
      }

      // Keep origin within comfortable bounds
      originX = Math.max(15, Math.min(85, originX));
      originY = Math.max(15, Math.min(85, originY));

      // Trigger a smooth expanding shockwave ring
      idCounter.current += 1;
      const waveId = `sw-${Date.now()}-${idCounter.current}`;
      const waveColor = BRAND_COLORS[Math.floor(Math.random() * 3)];
      const newWave: ShockwaveItem = {
        id: waveId,
        targetId,
        x: originX,
        y: originY,
        color: waveColor,
      };

      setShockwaves((prev) => [...prev, newWave]);
      setTimeout(() => {
        setShockwaves((prev) => prev.filter((w) => w.id !== waveId));
      }, 700);

      // Particle count: multi-layered burst with varied depth
      const particleCount = theme === 'sticker' ? 16 : 18;
      const newParticles: ParticleItem[] = [];
      const emojis = theme === 'sticker' ? BRAND_EMOJIS : MERCH_EMOJIS;

      for (let i = 0; i < particleCount; i++) {
        idCounter.current += 1;
        const pId = `p-${Date.now()}-${idCounter.current}-${Math.random().toString(36).substring(2, 6)}`;

        // Golden ratio & radial dispersion for balanced, organic spread
        const baseAngle = (i / particleCount) * Math.PI * 2;
        const angleJitter = (Math.random() - 0.5) * 0.5;
        const angle = baseAngle + angleJitter;

        // Radial distance with natural layer distribution (inner + outer burst)
        const isOuter = i % 2 === 0;
        const distance = isOuter
          ? (theme === 'sticker' ? 65 : 85) + Math.random() * (theme === 'sticker' ? 55 : 75)
          : (theme === 'sticker' ? 35 : 45) + Math.random() * (theme === 'sticker' ? 35 : 45);

        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        // Subtle gravity pull on flight
        const gravityY = 12 + Math.random() * 20;

        // Smooth staggered delays & varied durations
        const delayMs = Math.floor(Math.random() * 70);
        const durationMs = 800 + Math.floor(Math.random() * 350);

        // Rotation between -90deg and +90deg
        const rotation = (Math.random() - 0.5) * 90;
        const scale = 0.75 + Math.random() * 0.5;

        // Particle types: mini sticker, emoji, geometric diamond/circle, sparkling star
        const rand = Math.random();
        let type: ParticleItem['type'] = 'emoji';
        let content = emojis[Math.floor(Math.random() * emojis.length)];

        if (rand < 0.35) {
          type = 'sticker';
          content = STICKER_IMAGES[Math.floor(Math.random() * STICKER_IMAGES.length)];
        } else if (rand > 0.72) {
          type = 'shape';
          content = '';
        }

        const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        const size =
          type === 'sticker'
            ? 26 + Math.random() * 8
            : type === 'shape'
            ? 10 + Math.random() * 6
            : 22 + Math.random() * 4;

        newParticles.push({
          id: pId,
          targetId,
          x: originX,
          y: originY,
          dx,
          dy,
          gravityY,
          scale,
          rotation,
          delayMs,
          durationMs,
          type,
          content,
          color,
          size,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove after longest particle finishes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 1250);
    },
    [theme]
  );

  return { particles, shockwaves, triggerBurst };
};

export const ParticleBurstRenderer: React.FC<{
  particles: ParticleItem[];
  shockwaves?: ShockwaveItem[];
  targetId?: string;
  zIndexClass?: string;
}> = ({ particles, shockwaves = [], targetId, zIndexClass = 'z-0' }) => {
  const visibleParticles = targetId ? particles.filter((p) => p.targetId === targetId) : particles;
  const visibleShockwaves = targetId ? shockwaves.filter((w) => w.targetId === targetId) : shockwaves;

  if (!visibleParticles.length && !visibleShockwaves.length) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-visible ${zIndexClass}`} aria-hidden="true">
      {/* Shockwave Expanding Ring */}
      {visibleShockwaves.map((w) => (
        <div
          key={w.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-shockwave-ring"
          style={
            {
              left: `${w.x}%`,
              top: `${w.y}%`,
              '--wave-color': w.color,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floating Particles */}
      {visibleParticles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute animate-burst-particle select-none pointer-events-none flex items-center justify-center will-change-transform"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                '--burst-dx': `${p.dx}px`,
                '--burst-dy': `${p.dy}px`,
                '--burst-grav': `${p.gravityY}px`,
                '--burst-rot': `${p.rotation}deg`,
                '--burst-scale': p.scale,
                animationDelay: `${p.delayMs}ms`,
                animationDuration: `${p.durationMs}ms`,
              } as React.CSSProperties
            }
          >
            {p.type === 'sticker' && p.content ? (
              <img
                src={p.content}
                alt=""
                className="object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-full pointer-events-none"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.webp')) {
                    target.src = target.src.replace('.webp', '.png');
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            ) : p.type === 'shape' ? (
              <div
                className="rounded-full shadow-xs filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                }}
              />
            ) : (
              <span
                className="inline-block text-center filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.14)] leading-none"
                style={{ fontSize: `${p.size}px` }}
              >
                {p.content}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
