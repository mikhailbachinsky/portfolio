const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// I will extract everything related to .hero
let heroCss = css.match(/\.hero[\s\S]*?(?=\/\*)/)[0];
fs.writeFileSync('hero.css', heroCss);

let m639 = css.match(/@media \(max-width: 639px\) \{[\s\S]*?\}/g) || [];
fs.writeFileSync('hero-m639.css', m639.join('\n'));

let m479 = css.match(/@media \(max-width: 479px\) \{[\s\S]*?\}/g) || [];
fs.writeFileSync('hero-m479.css', m479.join('\n'));

