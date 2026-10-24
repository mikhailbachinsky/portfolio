const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.about-card__more-line\s*\{[\s\S]*?transition:\s*transform[^;]*;)\}/, '$1\n  transform: none !important;\n}');

fs.writeFileSync('style.css', css);
console.log('Fixed style.css for more-line');
