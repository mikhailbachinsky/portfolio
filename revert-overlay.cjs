const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
    'html {\n  width: 100vw;\n  overflow-y: overlay;',
    'html {\n  width: 100vw;'
);

fs.writeFileSync('style.css', css);
console.log('Reverted overflow-y: overlay');
