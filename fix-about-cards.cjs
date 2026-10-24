const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. In .about__content, change align-items: flex-start to align-items: stretch
css = css.replace(/(\.about__content\s*\{[\s\S]*?align-items:\s*)flex-start(;)/, '$1stretch$2');

// 2. In .about__cards, add grid-template-rows: repeat(2, 1fr);
// Make sure it doesn't already have it
if (!css.includes('grid-template-rows: repeat(2, 1fr);')) {
  css = css.replace(/(\.about__cards\s*\{)/, '$1\n  grid-template-rows: repeat(2, 1fr);');
}

// 3. In .about-card, change aspect-ratio to auto and add height: 100%
// base rule:
css = css.replace(/(\.about-card\s*\{[\s\S]*?aspect-ratio:\s*)272 \/ 301(;)/, '$1auto$2\n  height: 100%;');

// Also remove aspect-ratio from 1200px query to let it stretch
css = css.replace(/(\@media\s*\(max-width:\s*1200px\)\s*\{[\s\S]*?\.about-card\s*\{\s*)aspect-ratio:\s*210 \/ 318;/, '$1aspect-ratio: auto;');

fs.writeFileSync('style.css', css);
console.log('Fixed about cards');
