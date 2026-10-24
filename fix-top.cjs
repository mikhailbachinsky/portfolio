const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /\.header--sticky, \.header--hiding \{\n\s*top: 0 !important;\n\s*padding: 16px !important;\n\s*\}/g,
  ".header--sticky, .header--hiding {\n    padding: 16px !important;\n  }"
);
// Also .header { top: 0 !important } is fine since it's absolute.

// Let's create a mobile specific animation for top.
css = css.replace(
  /@keyframes headerSlideDown \{\n  0% \{ top: -80px; \}\n  100% \{ top: 10px; \}\n\}/g,
  "@keyframes headerSlideDown {\n  0% { top: -80px; }\n  100% { top: 10px; }\n}\n@media (max-width: 979px) {\n  @keyframes headerSlideDown {\n    0% { top: -80px; }\n    100% { top: 0px; }\n  }\n  @keyframes headerSlideUp {\n    0% { top: 0px; }\n    100% { top: -80px; }\n  }\n}"
);

// We need to also make sure .header--sticky on mobile has top: 0 explicitly without !important, or it will just be 0 by the keyframe. 
// Actually, when animation ends, it stays at the element's top. The element's top must be 0 on mobile.
css += "\n@media (max-width: 979px) { .header--sticky { top: 0; } .header--hiding { top: 0; } }\n";

fs.writeFileSync('style.css', css);
console.log('Fixed top animations');
