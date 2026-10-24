const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The mobile width for .about__line is currently 200px.
// 200px * 1.3 = 260px.
// Lower by 5 pixels -> bottom was not specified in the max-width: 479px media query, so it was inheriting.
// The previous one (639px) had bottom: 5px. Lowering by 5px would mean bottom: 0px.
// But let's just make it explict in the mobile section.

css = css.replace(/(\.about__line\s*\{\s*\n\s*width:\s*)200px;(\s*\n\s*\})/, '$1 260px;\n    bottom: -5px;$2');

// Just to be sure, let's do a more robust replace using a regex.
css = css.replace(/\.about__line\s*\{\s*width:\s*200px;\s*\}/, '.about__line {\n    width: 260px;\n    bottom: -5px;\n  }');

fs.writeFileSync('style.css', css);
console.log('Fixed about__line');
