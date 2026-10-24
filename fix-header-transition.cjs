const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /(\.header__surface\s*\{[^}]*z-index:\s*1;\s*\n)/,
  "$1  transition: background-color 0.35s ease, box-shadow 0.35s ease;\n"
);

fs.writeFileSync('style.css', css);
console.log('Header surface transition added');
