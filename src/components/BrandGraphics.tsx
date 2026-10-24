import React from 'react';

/**
 * Authentic SVG vector representations of the brand system elements
 */

export const TsuClassicShield: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 15C10 15 50 5 50 5C50 5 90 15 90 15V65C90 95 50 115 50 115C50 115 10 95 10 65V15Z"
      fill="#1C3F6E"
      stroke="#B8904D"
      strokeWidth="4"
    />
    <path
      d="M20 22C20 22 50 14 50 14C50 14 80 22 80 22V63C80 88 50 105 50 105C50 105 20 88 20 63V22Z"
      fill="#132B4F"
    />
    <circle cx="50" cy="50" r="18" fill="#B8904D" />
    <text x="50" y="55" fill="#132B4F" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Geologica, sans-serif">U</text>
    <text x="50" y="80" fill="#B8904D" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">TOMSK • 1878</text>
    <path d="M40 90H60" stroke="#B8904D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const LighthouseTutorLogo: React.FC<{
  className?: string;
  theme?: 'dark' | 'light' | 'peach' | 'accent';
  showText?: boolean;
}> = ({ className = 'w-16 h-16', theme = 'dark', showText = false }) => {
  const bgFill = theme === 'dark' ? '#181818' : theme === 'peach' ? '#FFAD85' : '#FFFFFF';
  const strokeColor = theme === 'dark' ? '#FFAD85' : theme === 'peach' ? '#181818' : '#181818';
  const beamFill = theme === 'dark' ? '#8FE06E' : '#8FE06E';
  const lightColor = '#FFFFFF';

  return (
    <div className="inline-flex items-center gap-3">
      <svg viewBox="0 0 100 115" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer shield frame with rounded corners */}
        <path
          d="M12 18C12 14.6863 14.6863 12 18 12H82C85.3137 12 88 14.6863 88 18V64C88 88.5 54 105 50 106.5C46 105 12 88.5 12 64V18Z"
          fill={bgFill}
          stroke={strokeColor}
          strokeWidth="4"
        />
        {/* Lighthouse rays forming Letter T top bar */}
        <path
          d="M24 34L50 24L76 34L68 44L50 36L32 44L24 34Z"
          fill={beamFill}
        />
        {/* Lighthouse tower & Letter T vertical stem */}
        <path
          d="M44 38H56L54 78H46L44 38Z"
          fill={strokeColor}
        />
        {/* Glowing lantern room at top */}
        <circle cx="50" cy="30" r="5" fill={lightColor} />
        {/* Accent horizontal crossbands */}
        <line x1="45" y1="52" x2="55" y2="52" stroke={bgFill} strokeWidth="2.5" />
        <line x1="45.5" y1="64" x2="54.5" y2="64" stroke={bgFill} strokeWidth="2.5" />
        {/* Subtle base rocks */}
        <path d="M38 84C42 82 58 82 62 84L66 89H34L38 84Z" fill={strokeColor} opacity="0.4" />
        {/* Tiny TSU tag */}
        <text x="50" y="99" fill={strokeColor} fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1.2">ТГУ</text>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight text-lg text-[#181818] leading-tight">
            Тьюторская служба
          </span>
          <span className="text-xs text-[#181818]/60 font-normal">
            Томский государственный университет
          </span>
        </div>
      )}
    </div>
  );
};

export const SquirrelMascot: React.FC<{ className?: string; mood?: 'greeting' | 'reading' | 'music' | 'gaming' }> = ({
  className = 'w-32 h-32',
  mood = 'greeting'
}) => (
  <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Squirrel Big Fluffy Tail */}
    <path
      d="M85 110C105 110 125 95 125 65C125 35 105 15 85 20C75 22.5 82 40 88 50C95 62 90 85 75 95C68 100 75 110 85 110Z"
      fill="#E7844B"
      stroke="#181818"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M92 35C108 42 112 60 110 75"
      stroke="#FFC59E"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Body in Green Hoodie */}
    <path
      d="M38 78C38 68 50 64 62 64C74 64 86 68 86 78L88 115C88 122 80 126 62 126C44 126 36 122 36 115L38 78Z"
      fill="#8FE06E"
      stroke="#181818"
      strokeWidth="3.5"
    />
    {/* Hoodie pocket */}
    <path
      d="M48 95H76C76 95 72 110 62 110C52 110 48 95 48 95Z"
      fill="#77C758"
      stroke="#181818"
      strokeWidth="2.5"
    />
    {/* Backpack strap */}
    <path d="M44 70L40 95" stroke="#F27A93" strokeWidth="4" strokeLinecap="round" />
    <path d="M80 70L84 95" stroke="#F27A93" strokeWidth="4" strokeLinecap="round" />

    {/* Head */}
    <ellipse cx="62" cy="50" rx="26" ry="22" fill="#FFA566" stroke="#181818" strokeWidth="3.5" />
    
    {/* Ears with tufts */}
    <path
      d="M42 36C40 22 46 16 48 14C50 16 52 24 50 34"
      fill="#FFA566"
      stroke="#181818"
      strokeWidth="3"
    />
    <path d="M47 14L49 10" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" />
    
    <path
      d="M82 36C84 22 78 16 76 14C74 16 72 24 74 34"
      fill="#FFA566"
      stroke="#181818"
      strokeWidth="3"
    />
    <path d="M77 14L75 10" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" />

    {/* Cheeks & Snout */}
    <ellipse cx="53" cy="55" rx="8" ry="6" fill="#FFF0E5" />
    <ellipse cx="71" cy="55" rx="8" ry="6" fill="#FFF0E5" />
    <polygon points="62,54 59,51 65,51" fill="#181818" />

    {/* Happy Eyes */}
    <path d="M50 48C52 44 56 44 58 48" stroke="#181818" strokeWidth="3" strokeLinecap="round" />
    <path d="M66 48C68 44 72 44 74 48" stroke="#181818" strokeWidth="3" strokeLinecap="round" />

    {/* Blush */}
    <circle cx="46" cy="54" r="3.5" fill="#F27A93" opacity="0.8" />
    <circle cx="78" cy="54" r="3.5" fill="#F27A93" opacity="0.8" />

    {/* Hands / Prop depending on mood */}
    {mood === 'reading' && (
      <g>
        {/* Book */}
        <rect x="48" y="85" width="28" height="20" rx="3" fill="#FFAD85" stroke="#181818" strokeWidth="2.5" />
        <line x1="62" y1="85" x2="62" y2="105" stroke="#181818" strokeWidth="2" />
        <circle cx="45" cy="94" r="5" fill="#FFA566" stroke="#181818" strokeWidth="2.5" />
        <circle cx="79" cy="94" r="5" fill="#FFA566" stroke="#181818" strokeWidth="2.5" />
      </g>
    )}
    {mood === 'music' && (
      <g>
        {/* Headphones */}
        <path d="M38 48C38 30 86 30 86 48" stroke="#F27A93" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="34" y="44" width="6" height="12" rx="3" fill="#181818" />
        <rect x="84" y="44" width="6" height="12" rx="3" fill="#181818" />
      </g>
    )}
    {mood === 'greeting' && (
      <g>
        {/* Waving Paw */}
        <circle cx="28" cy="65" r="6" fill="#FFA566" stroke="#181818" strokeWidth="3" />
        <path d="M22 62C20 60 22 56 25 58" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right paw on chest */}
        <circle cx="78" cy="85" r="5.5" fill="#FFA566" stroke="#181818" strokeWidth="3" />
      </g>
    )}
  </svg>
);

export const PuzzlePatternSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 600 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Seamless interlocking puzzle outlines in brand colors */}
    {/* Piece 1 - Peach */}
    <path
      d="M30 40H80C80 40 85 25 95 25C105 25 110 40 110 40H160V90C160 90 175 95 175 105C175 115 160 120 160 120V150H110C110 150 105 135 95 135C85 135 80 150 80 150H30V100C30 100 45 95 45 85C45 75 30 70 30 70V40Z"
      stroke="#FFAD85"
      strokeWidth="3.5"
      fill="#FFAD85"
      fillOpacity="0.12"
      strokeLinejoin="round"
    />
    {/* Piece 2 - Green */}
    <path
      d="M160 40H210C210 40 215 55 225 55C235 55 240 40 240 40H290V90C290 90 305 95 305 105C305 115 290 120 290 120V150H240C240 150 235 135 225 135C215 135 210 150 210 150H160V120C160 120 175 115 175 105C175 95 160 90 160 90V40Z"
      stroke="#8FE06E"
      strokeWidth="3.5"
      fill="#8FE06E"
      fillOpacity="0.15"
      strokeLinejoin="round"
    />
    {/* Piece 3 - Pink */}
    <path
      d="M290 40H340C340 40 345 25 355 25C365 25 370 40 370 40H420V90C420 90 405 95 405 105C405 115 420 120 420 120V150H370C370 150 365 165 355 165C345 165 340 150 340 150H290V120C290 120 305 115 305 105C305 95 290 90 290 90V40Z"
      stroke="#F27A93"
      strokeWidth="3.5"
      fill="#F27A93"
      fillOpacity="0.12"
      strokeLinejoin="round"
    />
    {/* Floating accent stars and dots */}
    <circle cx="100" cy="80" r="4" fill="#FFAD85" />
    <circle cx="230" cy="95" r="4" fill="#8FE06E" />
    <circle cx="360" cy="85" r="4" fill="#F27A93" />
    <path d="M470 50L474 62L486 66L474 70L470 82L466 70L454 66L466 62L470 50Z" fill="#FFAD85" />
    <path d="M540 100L543 110L553 113L543 116L540 126L537 116L527 113L537 110L540 100Z" fill="#8FE06E" />
  </svg>
);

export const TutorBoyWithPencil: React.FC<{ className?: string }> = ({ className = 'w-64 h-64' }) => (
  <svg viewBox="0 0 240 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Giant tilted pencil drawn across the scene */}
    <g transform="rotate(-28 140 130)">
      {/* Pencil body with faceted stripes */}
      <rect x="20" y="115" width="170" height="24" rx="2" fill="#FFAD85" stroke="#181818" strokeWidth="3" />
      <line x1="20" y1="123" x2="190" y2="123" stroke="#FFA170" strokeWidth="2.5" />
      <line x1="20" y1="131" x2="190" y2="131" stroke="#FFA170" strokeWidth="2.5" />
      {/* Ferrule & Eraser */}
      <rect x="180" y="115" width="25" height="24" rx="2" fill="#E2E2E2" stroke="#181818" strokeWidth="3" />
      <rect x="205" y="116" width="18" height="22" rx="4" fill="#F27A93" stroke="#181818" strokeWidth="2.5" />
      {/* Sharpened wood cone & graphite tip */}
      <polygon points="20,115 20,139 -6,127" fill="#FCEBD6" stroke="#181818" strokeWidth="3" />
      <polygon points="4,122 4,132 -6,127" fill="#181818" />
    </g>

    {/* Drawn ink swirl line created by pencil */}
    <path
      d="M25 185C60 215 130 205 180 185C215 170 230 135 220 105"
      stroke="#181818"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeDasharray="4 6"
    />

    {/* The Student / Tutor Character */}
    {/* Legs in green trousers */}
    <path d="M125 140L120 210H108L112 140" fill="#8FE06E" stroke="#181818" strokeWidth="3" />
    <path d="M142 140L148 210H160L150 140" fill="#8FE06E" stroke="#181818" strokeWidth="3" />
    {/* White sneakers */}
    <rect x="100" y="208" width="24" height="12" rx="5" fill="#FFFFFF" stroke="#181818" strokeWidth="2.5" />
    <rect x="146" y="208" width="24" height="12" rx="5" fill="#FFFFFF" stroke="#181818" strokeWidth="2.5" />

    {/* Torso in dotted pink long sleeve */}
    <rect x="110" y="85" width="46" height="58" rx="10" fill="#FDE6EC" stroke="#181818" strokeWidth="3" />
    <circle cx="120" cy="98" r="2" fill="#F27A93" />
    <circle cx="132" cy="110" r="2" fill="#F27A93" />
    <circle cx="144" cy="98" r="2" fill="#F27A93" />
    <circle cx="124" cy="125" r="2" fill="#F27A93" />
    <circle cx="140" cy="128" r="2" fill="#F27A93" />

    {/* Arms holding pencil */}
    <path d="M112 95L95 125L108 135" stroke="#181818" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M152 95L165 125L152 135" stroke="#181818" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Head & Face */}
    <ellipse cx="133" cy="56" rx="18" ry="20" fill="#FCEBD6" stroke="#181818" strokeWidth="3" />
    {/* Cool haircut */}
    <path
      d="M115 52C115 36 126 32 138 32C150 32 154 40 154 48C150 48 145 42 136 44C128 46 122 52 115 52Z"
      fill="#181818"
    />
    {/* Glasses */}
    <circle cx="127" cy="56" r="6" stroke="#181818" strokeWidth="2.5" fill="none" />
    <circle cx="141" cy="56" r="6" stroke="#181818" strokeWidth="2.5" fill="none" />
    <line x1="133" y1="56" x2="135" y2="56" stroke="#181818" strokeWidth="2.5" />
    {/* Smile */}
    <path d="M130 66C133 69 137 69 140 66" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HelloDoodleVector: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 420 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background doodle sparkles & stars */}
    {/* Flower top left */}
    <g transform="translate(30, 25)">
      <circle cx="10" cy="10" r="3" fill="#181818" />
      <ellipse cx="10" cy="3" rx="2.5" ry="4" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="10" cy="17" rx="2.5" ry="4" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="3" cy="10" rx="4" ry="2.5" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="17" cy="10" rx="4" ry="2.5" stroke="#181818" strokeWidth="1.8" />
    </g>

    {/* Sparkle crosses */}
    <path d="M95 25V33M91 29H99" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
    <path d="M165 35V43M161 39H169" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
    <path d="M165 140V148M161 144H169" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
    <path d="M335 30V38M331 34H339" stroke="#181818" strokeWidth="2" strokeLinecap="round" />

    {/* 4-point stars */}
    <path d="M75 145L77 151L83 153L77 155L75 161L73 155L67 153L73 151Z" fill="#181818" />
    <path d="M195 152L197 158L203 160L197 162L195 168L193 162L187 160L193 158Z" fill="#181818" />
    <path d="M245 35L247 41L253 43L247 45L245 51L243 45L237 43L243 41Z" fill="#181818" />
    <path d="M305 150L307 156L313 158L307 160L305 166L303 160L297 158L303 156Z" fill="#181818" />

    {/* Small doodle bubbles */}
    <circle cx="50" cy="155" r="3" stroke="#181818" strokeWidth="1.8" />
    <circle cx="120" cy="160" r="2.5" stroke="#181818" strokeWidth="1.8" />
    <circle cx="150" cy="38" r="3" stroke="#181818" strokeWidth="1.8" />
    <circle cx="280" cy="155" r="2" stroke="#181818" strokeWidth="1.8" />

    {/* Cute speech bubble with smile top right */}
    <g transform="translate(355, 30)">
      <path
        d="M5 2C15 2 25 8 25 18C25 25 18 30 10 30L4 35L5 28C2 26 0 22 0 18C0 8 5 2 5 2Z"
        fill="white"
        stroke="#181818"
        strokeWidth="2"
      />
      {/* Eyes & smile */}
      <circle cx="10" cy="15" r="1.5" fill="#181818" />
      <circle cx="17" cy="15" r="1.5" fill="#181818" />
      <path d="M11 20C13 22 15 22 17 20" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Clover / flower bottom right */}
    <g transform="translate(345, 140)">
      <circle cx="8" cy="8" r="2" fill="#181818" />
      <ellipse cx="8" cy="3" rx="3" ry="4" fill="#8FE06E" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="8" cy="13" rx="3" ry="4" fill="#8FE06E" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="3" cy="8" rx="4" ry="3" fill="#8FE06E" stroke="#181818" strokeWidth="1.8" />
      <ellipse cx="13" cy="8" rx="4" ry="3" fill="#8FE06E" stroke="#181818" strokeWidth="1.8" />
    </g>

    {/* LETTERS: H E L O ! */}

    {/* LETTER H (Green #8FE06E) */}
    <g id="letter-H">
      {/* 3D Depth bottom-right in Pink #F27A93 */}
      <path
        d="M26 62H42V88H68V62H84V136H68V110H42V136H26V62Z"
        transform="translate(6, 6)"
        fill="#F27A93"
        stroke="#181818"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Front Face */}
      <path
        d="M26 62H42V88H68V62H84V136H68V110H42V136H26V62Z"
        fill="#8FE06E"
        stroke="#181818"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Texture: Polka dots */}
      <circle cx="34" cy="72" r="2" fill="#181818" />
      <circle cx="34" cy="84" r="2" fill="#181818" />
      <circle cx="34" cy="118" r="2" fill="#181818" />
      <circle cx="34" cy="128" r="2" fill="#181818" />
      <circle cx="55" cy="99" r="2" fill="#181818" />
      <circle cx="76" cy="72" r="2" fill="#181818" />
      <circle cx="76" cy="84" r="2" fill="#181818" />
      <circle cx="76" cy="118" r="2" fill="#181818" />
      <circle cx="76" cy="128" r="2" fill="#181818" />
    </g>

    {/* LETTER E (Green #8FE06E) */}
    <g id="letter-E">
      {/* 3D Depth */}
      <path
        d="M102 75C102 60 120 54 135 54C150 54 158 64 158 82V96H118C118 115 125 122 136 122C144 122 150 118 154 112L162 120C155 130 146 136 133 136C112 136 102 122 102 96V75ZM134 68C124 68 118 74 118 85H144C144 75 140 68 134 68Z"
        transform="translate(6, 6)"
        fill="#181818"
      />
      {/* Front Face */}
      <path
        d="M102 75C102 60 120 54 135 54C150 54 158 64 158 82V96H118C118 115 125 122 136 122C144 122 150 118 154 112L162 120C155 130 146 136 133 136C112 136 102 122 102 96V75ZM134 68C124 68 118 74 118 85H144C144 75 140 68 134 68Z"
        fill="#8FE06E"
        stroke="#181818"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Hatching texture */}
      <line x1="120" y1="102" x2="126" y2="108" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="108" x2="130" y2="114" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="114" x2="136" y2="120" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
      <circle cx="130" cy="76" r="2" fill="#181818" />
    </g>

    {/* LETTER L (Pink #F27A93) */}
    <g id="letter-L">
      {/* 3D Depth in green or dark */}
      <path
        d="M180 50H200V120H230V136H180V50Z"
        transform="translate(6, 6)"
        fill="#8FE06E"
        stroke="#181818"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Front Face */}
      <path
        d="M180 50H200V120H230V136H180V50Z"
        fill="#F27A93"
        stroke="#181818"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Vertical Hatch Lines */}
      <line x1="187" y1="60" x2="187" y2="110" stroke="#181818" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <line x1="193" y1="65" x2="193" y2="115" stroke="#181818" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <circle cx="210" cy="128" r="2" fill="#181818" />
      <circle cx="220" cy="128" r="2" fill="#181818" />
    </g>

    {/* LETTER O (Green #8FE06E) */}
    <g id="letter-O">
      {/* 3D Depth */}
      <ellipse cx="270" cy="98" rx="26" ry="34" transform="translate(6, 6)" fill="#F27A93" stroke="#181818" strokeWidth="3.5" />
      {/* Front Face */}
      <ellipse cx="270" cy="98" rx="26" ry="34" fill="#8FE06E" stroke="#181818" strokeWidth="3.5" />
      {/* Inner Hole */}
      <ellipse cx="270" cy="98" rx="10" ry="16" fill="white" stroke="#181818" strokeWidth="3" />
      {/* Texture: dots and short rays */}
      <circle cx="258" cy="80" r="2" fill="#181818" />
      <circle cx="282" cy="80" r="2" fill="#181818" />
      <circle cx="258" cy="116" r="2" fill="#181818" />
      <circle cx="282" cy="116" r="2" fill="#181818" />
    </g>

    {/* EXCLAMATION MARK ! (Pink #F27A93) */}
    <g id="letter-Exclamation">
      {/* 3D Depth */}
      <polygon points="325,52 343,52 337,112 331,112" transform="translate(5, 5)" fill="#181818" />
      <circle cx="334" cy="130" r="7" transform="translate(5, 5)" fill="#181818" />

      {/* Front Stem */}
      <polygon points="325,52 343,52 337,112 331,112" fill="#F27A93" stroke="#181818" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Lines inside */}
      <line x1="331" y1="62" x2="333" y2="102" stroke="#181818" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <line x1="337" y1="62" x2="335" y2="102" stroke="#181818" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />

      {/* Dot */}
      <circle cx="334" cy="130" r="7" fill="#F27A93" stroke="#181818" strokeWidth="3.5" />
    </g>
  </svg>
);

