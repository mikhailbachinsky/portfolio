const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
    'html {\n  width: 100vw;',
    'html {\n  width: 100vw;\n  overflow-y: overlay;'
);

fs.writeFileSync('style.css', css);
console.log('Scroll overflow-y: overlay added.');
