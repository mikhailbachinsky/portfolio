const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.hero__text-group\s*\{\s*width:\s*100%;\s*)max-width:\s*280px;/g, '$1max-width: none;');

fs.writeFileSync('style.css', css);
console.log('Removed 280px max-width');
