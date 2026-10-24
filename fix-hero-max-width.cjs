const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.hero__text-group\s*\{[^}]*?width:\s*100%\s*!important;)/, '$1\n    max-width: none !important;');

fs.writeFileSync('style.css', css);
console.log('Fixed max-width on hero__text-group');
