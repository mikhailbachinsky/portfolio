const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

console.log(css.match(/\.about__content\s*\{[^}]*\}/)[0]);
console.log(css.match(/\.about__cards\s*\{[^}]*\}/)[0]);
console.log(css.match(/\.about-card\s*\{[^}]*\}/)[0]);
