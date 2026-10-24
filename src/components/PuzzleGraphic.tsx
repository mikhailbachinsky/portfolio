import React, { useState } from 'react';

interface PuzzleGraphicProps {
  className?: string;
}

export const PuzzleGraphic: React.FC<PuzzleGraphicProps> = ({ className = '' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 520 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[460px] drop-shadow-sm overflow-visible"
      >
        <defs>
          {/* Subtle drop shadows for layered puzzle pieces */}
          <filter id="puzzleShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.12" />
          </filter>
          <filter id="pieceShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.08" />
          </filter>

          {/* Clip path for the photo puzzle piece tilted card */}
          <clipPath id="photoPieceClip">
            <rect width="180" height="150" rx="16" />
          </clipPath>
        </defs>

        {/* 1. GREEN PUZZLE PIECE (Top Left) */}
        <g transform="translate(40, 50)" filter="url(#pieceShadow)">
          {/* Green piece with bottom jigsaw socket and authentic curves */}
          <path
            d="M 20 20
               L 160 20
               A 16 16 0 0 1 176 36
               L 176 90
               C 176 96, 172 100, 168 103
               C 152 112, 152 136, 168 145
               C 172 148, 176 152, 176 158
               L 176 170
               A 16 16 0 0 1 160 186
               L 125 186
               C 120 186, 116 182, 113 176
               C 104 156, 76 156, 67 176
               C 64 182, 60 186, 55 186
               L 20 186
               A 16 16 0 0 1 4 170
               L 4 36
               A 16 16 0 0 1 20 20 Z"
            fill="#7BC653"
          />
        </g>

        {/* 2. PHOTO PUZZLE PIECE (Top Center, tilted ~12 deg) */}
        <g transform="translate(190, 30) rotate(12 90 75)" filter="url(#puzzleShadow)">
          {/* Background & Outline */}
          <rect
            width="180"
            height="150"
            rx="16"
            fill="#FFFFFF"
            className="transition-all"
          />

          {/* Puzzle knob tab on the top-right of the card */}
          <path
            d="M 120 0
               C 120 -6, 124 -12, 132 -16
               C 148 -24, 164 -8, 156 8
               C 152 14, 146 16, 140 16
               Z"
            fill="#FFFFFF"
          />

          {/* Photo content or vector team illustration */}
          <g clipPath="url(#photoPieceClip)">
            {!imgError ? (
              <image
                href="/assets/team-puzzle.jpg"
                x="0"
                y="0"
                width="180"
                height="150"
                preserveAspectRatio="xMidYMid slice"
                onError={() => setImgError(true)}
              />
            ) : null}

            {/* High quality fallback vector illustration of tutors on couch matching screenshot */}
            {imgError && (
              <g className="select-none">
                {/* Modern studio wall & background */}
                <rect width="180" height="150" fill="#E8E8E6" />

                {/* Floor lamp in corner */}
                <line x1="158" y1="18" x2="164" y2="130" stroke="#222222" strokeWidth="1.5" />
                <path d="M 150 18 L 166 18 L 162 32 L 154 32 Z" fill="#333333" />

                {/* Plant on left */}
                <path d="M 14 65 C 22 55, 30 70, 34 85 C 24 88, 16 80, 14 65 Z" fill="#2D5A27" />
                <path d="M 22 80 C 32 72, 38 88, 36 102 C 26 102, 22 92, 22 80 Z" fill="#447A38" />

                {/* Cozy modern couch */}
                <rect x="36" y="85" width="118" height="52" rx="10" fill="#C5C3BF" />
                <rect x="30" y="96" width="18" height="38" rx="7" fill="#B3B1AD" />
                <rect x="142" y="96" width="18" height="38" rx="7" fill="#B3B1AD" />

                {/* 5 Tutors (smiling young team, dressed smart-casual) */}
                {/* Tutor 1 (left woman) */}
                <circle cx="56" cy="68" r="8" fill="#F7D3BA" />
                <path d="M 50 63 C 50 58, 62 58, 62 63 C 62 67, 50 67, 50 63 Z" fill="#4A3428" />
                <path d="M 48 78 C 48 74, 64 74, 64 78 L 62 108 L 50 108 Z" fill="#EFE8D8" />

                {/* Tutor 2 (center back man) */}
                <circle cx="82" cy="54" r="8" fill="#F5CBA7" />
                <path d="M 76 50 C 76 46, 88 46, 88 50 Z" fill="#2C3E50" />
                <path d="M 73 63 C 73 60, 91 60, 91 63 L 90 98 L 74 98 Z" fill="#1E272C" />

                {/* Tutor 3 (center woman) */}
                <circle cx="98" cy="62" r="8" fill="#FADBD8" />
                <path d="M 92 56 C 92 50, 104 50, 104 56 C 104 65, 92 65, 92 56 Z" fill="#D35400" />
                <path d="M 90 72 C 90 68, 106 68, 106 72 L 105 106 L 91 106 Z" fill="#F9EBEA" />

                {/* Tutor 4 (seated center woman) */}
                <circle cx="76" cy="74" r="7.5" fill="#FADBD8" />
                <path d="M 70 70 C 70 65, 82 65, 82 70 Z" fill="#784212" />
                <path d="M 68 83 C 68 80, 84 80, 84 83 L 83 118 L 69 118 Z" fill="#FFFFFF" />

                {/* Tutor 5 (right woman) */}
                <circle cx="120" cy="64" r="8" fill="#F5CBA7" />
                <path d="M 114 58 C 114 52, 126 52, 126 58 C 126 68, 114 68, 114 58 Z" fill="#F9E79F" />
                <path d="M 112 74 C 112 70, 128 70, 128 74 L 126 108 L 114 108 Z" fill="#E5E8E8" />
              </g>
            )}
          </g>

          {/* Border line */}
          <rect
            width="180"
            height="150"
            rx="16"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        </g>

        {/* 3. PINK PUZZLE PIECE (Right side, slightly behind peach piece) */}
        <g transform="translate(320, 125) rotate(-6 90 90)" filter="url(#pieceShadow)">
          <path
            d="M 30 20
               L 80 20
               C 85 20, 89 24, 91 30
               C 98 48, 124 48, 131 30
               C 133 24, 137 20, 142 20
               L 160 20
               A 16 16 0 0 1 176 36
               L 176 140
               A 16 16 0 0 1 160 156
               L 140 156
               C 134 156, 130 160, 128 166
               C 120 186, 94 186, 86 166
               C 84 160, 80 156, 74 156
               L 30 156
               A 16 16 0 0 1 14 140
               L 14 36
               A 16 16 0 0 1 30 20 Z"
            fill="#F2718D"
          />
        </g>

        {/* 4. PEACH PUZZLE PIECE (Center foreground, tilted ~16 deg) */}
        <g transform="translate(170, 150) rotate(16 95 95)" filter="url(#puzzleShadow)">
          <path
            d="M 24 24
               L 65 24
               C 70 24, 74 20, 76 14
               C 84 -6, 112 -6, 120 14
               C 122 20, 126 24, 131 24
               L 166 24
               A 16 16 0 0 1 182 40
               L 182 75
               C 182 80, 186 84, 192 86
               C 212 94, 212 122, 192 130
               C 186 132, 182 136, 182 141
               L 182 166
               A 16 16 0 0 1 166 182
               L 130 182
               C 125 182, 121 178, 118 172
               C 110 152, 82 152, 74 172
               C 71 178, 67 182, 62 182
               L 24 182
               A 16 16 0 0 1 8 166
               L 8 135
               C 8 130, 4 126, -2 124
               C -22 116, -22 88, -2 80
               C 4 78, 8 74, 8 69
               L 8 40
               A 16 16 0 0 1 24 24 Z"
            fill="#FFA480"
          />
        </g>
      </svg>
    </div>
  );
};
