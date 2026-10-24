const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Projects (art): up 1px, right 2px
// Current: left: calc(100% - 12px); bottom: -4px;
// New: left: calc(100% - 10px); bottom: -3px;
css = css.replace(/(\.projects__line\s*\{[^}]*?left:\s*)calc\(100% - 12px\);/, '$1calc(100% - 10px);');
css = css.replace(/(\.projects__line\s*\{[^}]*?bottom:\s*)-4px;/, '$1-3px;');

// 2. Skills: left 2px
// Current: left: calc(100% + 2px); 
// New: left: calc(100% + 0px);
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)calc\(100% \+ 2px\);/, '$1100%;');

// 3. Contacts: move down and right.
// Current: top: -140px; left: calc(100% - 20px);
// Look at the screenshot: it's way above and right of "ы". It needs to move down a LOT and left a LOT.
// Let's change to: top: -98px; left: calc(100% - 175px);
// Let's do top: -95px; left: calc(100% - 180px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-140px;/, '$1-90px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 20px\);/, '$1calc(100% - 195px);');


fs.writeFileSync('style.css', css);
console.log('Fixed line pos again');
