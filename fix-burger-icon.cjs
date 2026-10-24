const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Icon Box
css = css.replace(
  /(\.burger-icon-box\s*\{[^}]*width:\s*)20px(;[^}]*height:\s*)14px(;\s*\})/,
  "$122px$216px$3"
);

// 2. Lines Top
css = css.replace(
  /(\.burger-line--2\s*\{\s*top:\s*)6px(;\s*\})/,
  "$17px$2"
);
css = css.replace(
  /(\.burger-line--3\s*\{\s*top:\s*)12px(;\s*\})/,
  "$114px$2"
);

// 3. Active Transforms
css = css.replace(
  /(\.burger-btn\.is-active\s*\.burger-line--1\s*\{\s*transform:\s*translateY\()6px(\)\s*rotate\(45deg\);\s*\})/,
  "$17px$2"
);
css = css.replace(
  /(\.burger-btn\.is-active\s*\.burger-line--3\s*\{\s*transform:\s*translateY\()-6px(\)\s*rotate\(-45deg\);\s*\})/,
  "$1-7px$2"
);

fs.writeFileSync('style.css', css);
console.log('Burger icon lines updated');
