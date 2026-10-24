const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /(\.hero__content\s*\{[^}]*gap:\s*)24px(\s*!important;[^}]*\})/,
  "$132px$2"
);

fs.writeFileSync('style.css', css);
console.log('Mobile hero gap updated: Desc-Btns to 32px');
