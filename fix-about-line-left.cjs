const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The mobile width for .about__line is 260px, and bottom is 1px.
// Currently, there is no explicit `left` in the mobile media query, so it inherits `left: calc(100% - 2px)` from the 639px media query.
// To move it 1px to the left, we need to make it `left: calc(100% - 3px)`.

css = css.replace(/\.about__line\s*\{\s*width:\s*260px;\s*bottom:\s*1px;\s*\}/, '.about__line {\n    width:  260px;\n    bottom: 1px;\n    left: calc(100% - 3px);\n  }');

fs.writeFileSync('style.css', css);
console.log('Moved about__line left by 1px');
