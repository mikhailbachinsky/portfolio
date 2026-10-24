const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/overflow-x:\s*clip;/g, '');

fs.writeFileSync('style.css', css);
console.log('Removed overflow-x clip');
