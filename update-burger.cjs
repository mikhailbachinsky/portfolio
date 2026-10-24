const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Update header padding for uniform 8px gap
css = css.replace(
  /(\.header__container\s*\{[^}]*padding:\s*0\s+)10px(\s+0\s+16px\s*!important;)/,
  "$18px$2"
);

// 2. Update burger button size and border-radius
css = css.replace(
  /(\.burger-btn\s*\{[^}]*width:\s*)36px(\s*!important;\s*height:\s*)36px(\s*!important;[^}]*margin:\s*0\s*!important;)/,
  "$140px$240px$3\n    border-radius: 2px !important;"
);

fs.writeFileSync('style.css', css);
console.log('Mobile burger updated');
