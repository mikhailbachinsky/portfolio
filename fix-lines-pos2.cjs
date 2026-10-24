const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The user wants projects__line to move 4px down and 3px right
// Current: left: calc(100% - 19px); bottom: 0px;
// 4px down = bottom: -4px;
// 3px right = left: calc(100% - 16px);
css = css.replace(/(\.projects__line\s*\{[^}]*?left:\s*)calc\(100% - 19px\);/, '$1calc(100% - 16px);');
css = css.replace(/(\.projects__line\s*\{[^}]*?bottom:\s*)0px;/, '$1-4px;');

// The user wants skills__line to move up and right to match "и".
// Current: left: calc(100% - 15px); top: -45px;
// Let's try up more and right more: top: -55px; left: calc(100% - 10px);
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)calc\(100% - 15px\);/, '$1calc(100% - 10px);');
css = css.replace(/(\.skills__line\s*\{[^}]*?top:\s*)-45px;/, '$1-55px;');

fs.writeFileSync('style.css', css);
console.log('Fixed line positions again');
