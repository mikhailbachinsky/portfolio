const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /(\.hero__text-group\s*\{[^}]*gap:\s*)8px(\s*!important;[^}]*\})/,
  "$16px$2"
);

fs.writeFileSync('style.css', css);
console.log('Mobile hero gap updated: Role-Desc to 6px');
