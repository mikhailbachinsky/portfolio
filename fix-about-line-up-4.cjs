const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.about__line\s*\{\s*width:\s*260px;\s*bottom:\s*0px;\s*\}/, '.about__line {\n    width:  260px;\n    bottom: 1px;\n  }');

fs.writeFileSync('style.css', css);
console.log('Moved about__line up by another 1px');
