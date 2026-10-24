const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/html \{\n  width: 100vw;\n/g, 'html {\n');
css = css.replace(/body \{\n  width: 100vw;\n/g, 'body {\n');

fs.writeFileSync('style.css', css);
console.log('Removed width: 100vw');
