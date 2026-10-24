const fs = require('fs');

// 1. Fix Contacts line
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?left:\s*)calc\(100% \+ 2px\);/, '$1calc(100% - 1px);');
fs.writeFileSync('style.css', css);
console.log('style.css updated');

// 2. Fix FAQ open state
let html = fs.readFileSync('index.html', 'utf8');
// Remove is-open from the first faq-item
html = html.replace(/<div class="faq-item is-open" id="faq-item-1">/, '<div class="faq-item" id="faq-item-1">');
// Set aria-expanded to false for the first faq-btn
html = html.replace(/id="faq-btn-1" aria-expanded="true"/, 'id="faq-btn-1" aria-expanded="false"');
fs.writeFileSync('index.html', html);
console.log('index.html updated');
