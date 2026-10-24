const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const marker = '/* 5. Graphics */';
const startIndex = css.lastIndexOf('@media (max-width: 639px)');
const idx = css.indexOf(marker, startIndex);

if (idx !== -1) {
    const endIdx = css.indexOf('.hero__photo {', idx);
    const newGraphics = `/* 5. Graphics */
  .hero__graphics {
    position: absolute !important;
    bottom: 0 !important; 
    top: auto !important;
    left: 50% !important;
    transform: translateX(-50%) !important; 
    width: 123.25vw !important; /* Reduced scale by 15% from 145vw */
    height: calc(123.25vw * 498 / 900) !important;
    max-width: none !important;
    margin: 0 !important;
    display: block !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  `;
    css = css.substring(0, idx) + newGraphics + css.substring(endIdx);
    fs.writeFileSync('style.css', css);
    console.log('Hero graphics centered and scaled down by 15%.');
} else {
    console.log('Could not find the Graphics block.');
}
