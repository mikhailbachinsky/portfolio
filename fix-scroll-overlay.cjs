const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Find html { block and add width: 100vw; overflow-x: hidden;
css = css.replace(
    'html {\n  scroll-behavior: smooth;',
    'html {\n  width: 100vw;\n  overflow-x: hidden;\n  scroll-behavior: smooth;'
);

// Body already has overflow-x: hidden, let's add width: 100vw;
css = css.replace(
    'body {\n  background-color: var(--bg-main);',
    'body {\n  width: 100vw;\n  background-color: var(--bg-main);'
);

fs.writeFileSync('style.css', css);
console.log('Scroll overlay fix applied.');
