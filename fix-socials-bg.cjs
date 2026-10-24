const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/background: var\(--bg-about\);\s*border-radius: 12px;\s*border: 1px solid rgba\(115, 111, 141, 0\.12\);/, '');

fs.writeFileSync('style.css', css);
console.log('Removed socials bg');
