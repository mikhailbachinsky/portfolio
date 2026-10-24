const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /@keyframes headerSlideDown \{\n  0% \{ opacity: 0; \}\n  100% \{ opacity: 1; \}\n\}\n  100% \{ margin-top: 0; opacity: 1; \}\n\}/g,
  "@keyframes headerSlideDown {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}"
);

css = css.replace(
  /@keyframes headerSlideUp \{\n  0% \{ opacity: 1; \}\n  100% \{ opacity: 0; \}\n\}\n  100% \{ margin-top: -20px; opacity: 0; \}\n\}/g,
  "@keyframes headerSlideUp {\n  0% { opacity: 1; }\n  100% { opacity: 0; }\n}"
);

fs.writeFileSync('style.css', css);
console.log('Keyframes fixed');
