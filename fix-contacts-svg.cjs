const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const maskSvg = fs.readFileSync('assets/images/Mask group.svg', 'utf8');

// Replace the <svg> block inside contacts__line with the new SVG content
// We need to match <svg ... class="draw-line-mask-6"> ... </svg>
// and then add class="draw-line-mask-6" to the new <svg> tag

const maskSvgModified = maskSvg.replace('<svg ', '<svg class="draw-line-mask-6" ');

html = html.replace(/<svg[^>]*class="draw-line-mask-6"[\s\S]*?<\/svg>/, maskSvgModified);

fs.writeFileSync('index.html', html);
console.log('Fixed contacts svg');
