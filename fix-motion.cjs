const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/,\s*\.algorithm-card/g, '');

fs.writeFileSync('style.css', css);
console.log('Removed algorithm-card from reduced motion');
