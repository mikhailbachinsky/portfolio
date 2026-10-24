const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Projects line: 1px UP, 1px RIGHT
css = css.replace(/left: calc\(100% - 10px\);\s*bottom: -3px;/, 'left: calc(100% - 9px);\n  bottom: -2px;');

// Skills line: 1px LEFT
// .skills__line { position: absolute; left: calc(100% - 2px); top: -60px;
css = css.replace(/(\.skills__line\s*\{[\s\S]*?left:\s*)calc\(100% - 2px\);/, '$1calc(100% - 3px);');

// Contacts line: 3px LEFT
// left: calc(100% + 5px);
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?left:\s*)calc\(100% \+ 5px\);/, '$1calc(100% + 2px);');

// FAQ Question weight
// .faq-item__question { font-family: var(--font-text); font-size: 20px; font-weight: 700;
css = css.replace(/(\.faq-item__question\s*\{[\s\S]*?font-weight:\s*)700;/, '$1500;');

// FAQ Number size
// .faq-item__number { ... font-size: 18px;
css = css.replace(/(\.faq-item__number\s*\{[\s\S]*?font-size:\s*)18px;/, '$124px;');
// For mobile query: font-size: 16px; -> 20px;
// We can just replace font-size: 16px; inside .faq-item__number in media queries
css = css.replace(/(\.faq-item__number\s*\{[\s\S]*?font-size:\s*)16px;/g, '$120px;');

fs.writeFileSync('style.css', css);
console.log('Fixed stuff');
