const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Fix Burger Icon Size (Lines to 8px gap)
css = css.replace(
  /(\.burger-icon-box\s*\{\s*position:\s*relative;\s*width:\s*)20px(;\s*height:\s*)14px(;\s*display:\s*block;\s*\})/,
  "$124px$218px$3"
);

// Smooth out the animation transition
css = css.replace(
  /(\.burger-line\s*\{[^}]*transition:\s*transform\s+)0\.34s(\s+cubic-bezier\([^}]*\},\s*opacity\s+)0\.22s(\s+ease;)/,
  "$10.45s$20.35s$3"
);

fs.writeFileSync('style.css', css);
console.log('Burger box size and transition updated');
