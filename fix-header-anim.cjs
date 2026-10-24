const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /@keyframes headerSlideDown \{\n  0% \{ opacity: 0; \}\n  100% \{ opacity: 1; \}\n\}/g,
  "@keyframes headerSlideDown {\n  0% { top: -80px; }\n  100% { top: 10px; }\n}"
);

css = css.replace(
  /@keyframes headerSlideUp \{\n  0% \{ opacity: 1; \}\n  100% \{ opacity: 0; \}\n\}/g,
  "@keyframes headerSlideUp {\n  0% { top: 10px; }\n  100% { top: -80px; }\n}"
);

// We must also fix the mobile override since mobile top is 0!
css = css.replace(
  /(\.header--sticky, \.header--hiding\s*\{\s*top:)\s*0\s*(!important;)/g,
  "$1 0 $2" // Wait, we can't just use top: 0 !important if we are animating top.
);

fs.writeFileSync('style.css', css);
console.log('Fixed header anim to use top');
