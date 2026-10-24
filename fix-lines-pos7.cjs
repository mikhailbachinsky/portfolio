const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I will just move it even further to make sure it's visible. 
// top: -50px; left: calc(100% - 240px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-65px;/, '$1-50px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 215px\);/, '$1calc(100% - 240px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 7');
