const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const originalSvg = fs.readFileSync('assets/images/Mask group.svg', 'utf8');

// The original SVG has <mask id="mask0_911_376"...> ... </mask><g mask="url(#mask0_911_376)"><path .../></g>
// We need to add class="draw-line-mask-6" to the <svg>
// and pathLength="100" class="anim-path-6" to the <path> INSIDE the <g>

let newSvg = originalSvg.replace('<svg ', '<svg class="draw-line-mask-6" ');
newSvg = newSvg.replace(/<g mask="url\(#mask0_911_376\)"><path d="/, '<g mask="url(#mask0_911_376)"><path pathLength="100" class="anim-path-6" d="');

html = html.replace(/<svg class="draw-line-mask-6"[^>]*>[\s\S]*?<\/svg>/, newSvg);

fs.writeFileSync('index.html', html);
console.log('Restored contacts SVG mask');
