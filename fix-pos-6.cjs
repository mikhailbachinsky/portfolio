const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-135px;/, '$1-115px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 15px\);/, '$1calc(100% + 5px);');

fs.writeFileSync('style.css', css);
console.log('Fixed pos 6');
