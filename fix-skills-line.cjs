const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The skills line is currently at left: 100%; (desktop).
// The user says "В Компетенции и стек смести росчерк на 2 пикселя влево"
// Left 2 pixels means `left: calc(100% - 2px);`
// Oh wait, in an earlier prompt, it was left: calc(100% + 2px);
// Then I set it to 100%; which moved it left 2 pixels.
// Now they want to move it left ANOTHER 2 pixels.
// So let's make it `left: calc(100% - 2px);`
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)100%;/, '$1calc(100% - 2px);');

fs.writeFileSync('style.css', css);
console.log('Fixed skills line');
