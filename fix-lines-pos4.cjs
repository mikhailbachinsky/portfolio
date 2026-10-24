const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.projects__line\s*\{[^}]*?left:\s*)calc\(100% - 16px\);/, '$1calc(100% - 12px);');
css = css.replace(/(\.projects__line\s*\{[^}]*?bottom:\s*)-4px;/, '$1-6px;');

fs.writeFileSync('style.css', css);
console.log('Adjusted projects');
