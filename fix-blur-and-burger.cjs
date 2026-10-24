const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Fix Burger Icon Size (Lines to 8px gap)
css = css.replace(
  /(\.burger-icon-box\s*\{[^}]*width:\s*)22px(;[^}]*height:\s*)16px(;\s*\})/,
  "$124px$218px$3"
);

css = css.replace(
  /(\.burger-line--2\s*\{\s*top:\s*)7px(;\s*\})/,
  "$18px$2"
);
css = css.replace(
  /(\.burger-line--3\s*\{\s*top:\s*)14px(;\s*\})/,
  "$116px$2"
);

css = css.replace(
  /(\.burger-btn\.is-active\s*\.burger-line--1\s*\{\s*transform:\s*translateY\()7px(\)\s*rotate\(45deg\);\s*\})/,
  "$18px$2"
);
css = css.replace(
  /(\.burger-btn\.is-active\s*\.burger-line--3\s*\{\s*transform:\s*translateY\()-7px(\)\s*rotate\(-45deg\);\s*\})/,
  "$1-8px$2"
);

// 2. Fix iOS Safari Blur Bug (Change slide to fade)
css = css.replace(
  /@keyframes headerSlideDown \{[^}]+\}/,
  "@keyframes headerSlideDown {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}"
);

css = css.replace(
  /@keyframes headerSlideUp \{[^}]+\}/,
  "@keyframes headerSlideUp {\n  0% { opacity: 1; }\n  100% { opacity: 0; }\n}"
);

// Remove the will-change and translateZ that I added previously, they don't help
css = css.replace(
  /\s*transform:\s*translateZ\(0\);\s*will-change:\s*transform,\s*backdrop-filter;/g,
  ""
);

fs.writeFileSync('style.css', css);
console.log('Burger icon and blur bug fixed');
