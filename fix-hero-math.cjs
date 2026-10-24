const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/left:\s*-15vw;/g, 'left: 3vw;');

fs.writeFileSync('style.css', css);
console.log('Math updated for hero centering.');
