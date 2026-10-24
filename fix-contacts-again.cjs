const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.contacts__line\s*\{[\s\S]*?left:\s*)calc\(100% - 1px\);/, '$1calc(100% - 4px);');

fs.writeFileSync('style.css', css);
console.log('Contacts line fixed');
