const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// I will parse the CSS to find mobile breakpoints and adjust font-sizes.
// Alternatively, I can just use a regex approach to systematically increase font sizes in mobile media queries.

// Let's first dump the media queries to see what's there.
let matches = [...css.matchAll(/@media\s*\(max-width:\s*639px\)\s*\{([\s\S]*?)\}(?=\s*@media|\Z)/g)];
console.log("639px:", matches.length ? matches[0][1].substring(0, 200) : 'none');

let matches479 = [...css.matchAll(/@media\s*\(max-width:\s*479px\)\s*\{([\s\S]*?)\}(?=\s*@media|\Z)/g)];
console.log("479px:", matches479.length ? matches479[0][1].substring(0, 200) : 'none');

