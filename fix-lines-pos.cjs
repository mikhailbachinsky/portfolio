const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Projects: 4px lower, 3px right. Current was left: calc(100% - 22px); bottom: 4px;
// So left: calc(100% - 19px); bottom: 0px;
css = css.replace(/(\.projects__line\s*\{[^}]*?left:\s*)calc\(100% - 22px\);/, '$1calc(100% - 19px);');
css = css.replace(/(\.projects__line\s*\{[^}]*?bottom:\s*)4px;/, '$10px;');

// Skills: move up and right to match "и". Current was left: calc(100% - 22px); top: -20px;
// Let's try top: -45px; left: calc(100% - 15px);
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)calc\(100% - 22px\);/, '$1calc(100% - 15px);');
css = css.replace(/(\.skills__line\s*\{[^}]*?top:\s*)-20px;/, '$1-45px;');


fs.writeFileSync('style.css', css);
console.log('Fixed line positions');
