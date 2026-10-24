const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Update burger border-radius to 4px
css = css.replace(
  /(\.burger-btn\s*\{[^}]*border-radius:\s*)2px(\s*!important;[^}]*\})/,
  "$14px$2"
);

// 2. Fix backdrop-filter glitch on .header__surface
// Add will-change and translateZ to force hardware acceleration during the animation
css = css.replace(
  /(\.header__surface\s*\{)([^}]+)(\})/,
  "$1$2  transform: translateZ(0);\n  will-change: transform, backdrop-filter;\n$3"
);

fs.writeFileSync('style.css', css);
console.log('Mobile burger border-radius updated to 4px. Backdrop blur hardware acceleration applied.');
