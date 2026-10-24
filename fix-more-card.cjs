const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// We also need to remove transform: translateY(-4px) on .about-card--more:hover
css = css.replace(/\.about-card--more:hover\s*\{\s*transform:\s*translateY\(-4px\);\s*\}/, '.about-card--more:hover { transform: none; }');

fs.writeFileSync('style.css', css);
console.log('Fixed style.css for card hover');
