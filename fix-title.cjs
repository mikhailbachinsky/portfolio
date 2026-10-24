const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /(\@media\s*\(\s*max-width:\s*479px\s*\)\s*\{[\s\S]*?\.menu-modal__title\s*\{\s*font-size:\s*)22px(;)/g,
  "$122px !important$2"
);

fs.writeFileSync('style.css', css);
console.log('Fixed !important');
