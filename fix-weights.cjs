const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// Change font-weight: 600 to 500 for normal emphasis, or 700 if it's title
// Actually, let's just make them 700 for .faq-accent, and 500 for UI tags
// I will just change all 600 to 500 unless it's a heading.
css = css.replace(/font-weight:\s*600;/g, 'font-weight: 500;');

fs.writeFileSync('style.css', css);
console.log('Font weights normalized');
