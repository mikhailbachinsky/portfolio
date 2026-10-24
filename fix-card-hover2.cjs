const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/\.about-card--more:hover\s*\{[^}]*\}/g, '');
css += `\n.about-card--more:hover { transform: none !important; }\n`;
fs.writeFileSync('style.css', css);
