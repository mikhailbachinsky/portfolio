const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.about__exp-list\s*\{\s*gap:\s*8px;\s*\}/g, '.about__exp-list {\n    gap: 12px;\n  }');

fs.writeFileSync('style.css', css);
console.log('Fixed explist gap');
