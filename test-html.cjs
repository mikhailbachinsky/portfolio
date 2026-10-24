const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I am going to remove the mask completely from the contacts SVG, because it is causing rendering bugs.
// The user's uploaded SVG uses a mask that creates that weird dotted look in the screenshot.
// Just a simple path is better.

let newSvg = `<svg class="draw-line-mask-6" width="850" height="155" viewBox="0 0 850 155" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path pathLength="100" class="anim-path-6" d="M1 149.682C97.3606 160.798 125.237 67.0649 178.011 112.377C263.127 185.459 411.853 83.814 365.121 45.858C345.872 30.223 386.64 13.6937 395.426 34.2887C407.201 61.8889 377.957 165.786 342 149.68C303.33 132.36 487.144 67.3354 457.953 26.4516C423.738 -21.468 437.126 220.041 535.11 103.309C604.341 20.8305 521.949 36.1647 544.197 15.6419C593.947 -30.2522 445.204 191.805 648.874 116.954C711.331 94.0007 733.938 55.9614 847.862 0.999985" stroke="url(#paint0_linear_911_376_6)" stroke-width="6" stroke-linecap="round"/>
  <defs>
    <linearGradient id="paint0_linear_911_376_6" x1="-4.75805" y1="100.632" x2="580.498" y2="-311.875" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1A1A1A"/>
      <stop offset="0.198712" stop-color="#635F7D"/>
      <stop offset="0.746713" stop-color="#E9E8F0"/>
    </linearGradient>
  </defs>
</svg>`;

html = html.replace(/<svg class="draw-line-mask-6"[^>]*>[\s\S]*?<\/svg>/, newSvg);
fs.writeFileSync('index.html', html);
console.log('Fixed SVG');
