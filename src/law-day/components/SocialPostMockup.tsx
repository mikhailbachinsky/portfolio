import React from 'react';
import { DeliverableItem } from '../types';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface SocialPostMockupProps {
  item: DeliverableItem;
  onSelect?: () => void;
}

export const SocialPostMockup: React.FC<SocialPostMockupProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer frost-card-glass border border-silver/30 hover:border-silver transition-colors duration-200 shadow-lg flex flex-col justify-between silver-contour"
    >
      {/* Top Media Preview Card */}
      <div className={`relative aspect-[4/5] w-full p-5 bg-gradient-to-br ${item.bgGradient} flex flex-col justify-between overflow-hidden border-b border-silver/20`}>
        {/* Subtle Frost Texture Overlay */}
        <div className="absolute inset-0 frost-ice-pattern opacity-20 pointer-events-none" />

        {/* Top Header inside post art */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-serif-luxury text-sm tracking-wider text-silver-bright">LSA 2024</span>
          {item.badge && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 text-white/90 border border-silver/40 silver-contour-subtle">
              {item.badge}
            </span>
          )}
        </div>

        {/* Center Artwork Simulation */}
        <div className="relative z-10 text-center my-auto px-2">
          {item.category === 'teaser' && (
            <div className="mb-2">
              <div className="text-xs uppercase tracking-widest text-white/70">
                «Только не проболтайся!»
              </div>
            </div>
          )}

          {item.category === 'sales' && (
            <div className="mb-2">
              <div className="text-xs uppercase tracking-widest text-white/70">
                FACE Club ◇ 5 Декабря
              </div>
            </div>
          )}

          {item.category === 'nominations' && (
            <div className="mb-2">
              <div className="text-xs uppercase tracking-widest text-white/70">
                Ежегодная премия
              </div>
            </div>
          )}

          <h3 className="font-serif-luxury text-xl sm:text-2xl text-white leading-tight mt-1">
            {item.highlightText || item.title}
          </h3>

          <div className="w-10 h-[1px] bg-white/30 mx-auto my-2.5" />
          <p className="text-[11px] text-white/70 line-clamp-2 px-2 font-light">
            {item.description}
          </p>
        </div>

        {/* Bottom Post Bar inside artwork */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-white/60 pt-2 border-t border-white/10">
          <span>Томск, 2024</span>
          <span className="text-white">ЮИ ТГУ</span>
        </div>
      </div>

      {/* Social Post Feed Metadata */}
      <div className="p-4 frost-card-glass">
        {/* Interaction Bar */}
        <div className="flex items-center justify-between text-white/40 mb-3">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 hover:text-white transition-colors" />
            <MessageCircle className="w-4 h-4 hover:text-white transition-colors" />
            <Share2 className="w-4 h-4 hover:text-white transition-colors" />
          </div>
          <Bookmark className="w-4 h-4 hover:text-white transition-colors" />
        </div>

        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-white/90 transition-colors truncate">
            {item.title}
          </h4>
          <span className="text-[10px] text-white/40 shrink-0">
            {item.specs.split(' ')[0]}
          </span>
        </div>

        <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3 font-light">
          {item.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1">
          {item.features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-white/5 text-white/70 border border-white/10"
            >
              {feat}
            </span>
          ))}
          {item.features.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/80 border border-white/20">
              +{item.features.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
