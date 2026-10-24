const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The regex might not have matched if it didn't find the exact transition line.
// Let's just add `transform: none !important;` unconditionally to the block.

css = css.replace(/(\.about-card__more-line\s*\{[\s\S]*?)(\})/, '$1  transform: none !important;\n$2');

fs.writeFileSync('style.css', css);
console.log('Fixed style.css for more-line-2');
