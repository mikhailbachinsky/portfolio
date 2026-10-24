const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The function to scale up mobile typography
function processMediaQuery(content) {
  // First, convert line-heights in px to relative (based on adjacent font-size if possible, 
  // but it's hard if they are not together). 
  // Let's just remove px from line-heights and calculate an approximate relative value, or simply strip px.
  // Actually, many line-heights are already something like "line-height: 1.4;".
  // For the ones in px:
  content = content.replace(/font-size:\s*(\d+)px;\s*line-height:\s*(\d+)px;/g, (match, fsStr, lhStr) => {
    let f = parseInt(fsStr);
    let l = parseInt(lhStr);
    let rel = (l / f).toFixed(2);
    // clean up like 1.50 -> 1.5
    rel = parseFloat(rel);
    return `font-size: ${f}px;\n    line-height: ${rel};`;
  });

  // Now bump font-sizes
  content = content.replace(/font-size:\s*(\d+)px;/g, (match, sizeStr) => {
    let size = parseInt(sizeStr);
    if (size === 12) return 'font-size: 14px;';
    if (size === 14) return 'font-size: 16px;';
    if (size === 16) return 'font-size: 18px;';
    if (size === 18) return 'font-size: 20px;';
    if (size === 20) return 'font-size: 22px;';
    if (size === 22) return 'font-size: 24px;';
    if (size === 24) return 'font-size: 28px;';
    if (size === 28) return 'font-size: 32px;';
    if (size === 32) return 'font-size: 36px;'; // 36px for section headings on mobile
    if (size === 48) return 'font-size: 56px;'; // hero title on mobile
    return match;
  });

  return content;
}

// Target the mobile media queries
css = css.replace(/(@media\s*\(max-width:\s*(?:639px|600px|479px|860px)\)\s*\{)([\s\S]*?)(\n\s*@media|\Z)/g, (match, prefix, content, suffix) => {
  return prefix + processMediaQuery(content) + suffix;
});

// Write it back
fs.writeFileSync('style.css', css);
console.log('Mobile typography scaled up.');
