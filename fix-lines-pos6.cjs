const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Contacts: moving it even more left and down based on the screenshot
// Current: top: -90px; left: calc(100% - 195px);
// Let's try: top: -65px; left: calc(100% - 215px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-90px;/, '$1-65px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 195px\);/, '$1calc(100% - 215px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 6');
