const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The mobile width for .about__line is 260px, and bottom is -5px.
// Raising by 2 pixels means bottom should be -3px.

css = css.replace(/\.about__line\s*\{\s*width:\s*260px;\s*bottom:\s*-5px;\s*\}/, '.about__line {\n    width:  260px;\n    bottom: -3px;\n  }');

fs.writeFileSync('style.css', css);
console.log('Moved about__line up by 2px');
