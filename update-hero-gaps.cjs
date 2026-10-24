const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Update .hero__titles gap (Name to Role) from 12px to 16px
css = css.replace(
  /(\.hero__titles\s*\{[^}]*gap:\s*)12px(\s*!important;[^}]*\})/,
  "$116px$2"
);

// Update .hero__content gap (Description to Buttons) from 20px to 24px
css = css.replace(
  /(\.hero__content\s*\{[^}]*gap:\s*)20px(\s*!important;[^}]*\})/,
  "$124px$2"
);

fs.writeFileSync('style.css', css);
console.log('Mobile hero gaps updated: Name-Role to 16px, Desc-Btns to 24px');
