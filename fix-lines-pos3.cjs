const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I need to adjust projects__line again if it's not perfect.
// Let's make it exactly as asked: "опустить его на 4 пикселя ниже и на 3 пикселя вправо"
// The original was left: calc(100% - 22px); bottom: 4px;
// We changed it to left: calc(100% - 19px); bottom: 0px; 
// Then left: calc(100% - 16px); bottom: -4px;
// If the user means from the original screenshot position:
// It should probably be left: calc(100% - 13px); bottom: -4px;
// Let's use left: calc(100% - 10px); bottom: -5px; just in case it needs to go further right.

// And for skills, let's move it even more right and up:
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)calc\(100% - 10px\);/, '$1calc(100% + 5px);');
css = css.replace(/(\.skills__line\s*\{[^}]*?top:\s*)-55px;/, '$1-60px;');

fs.writeFileSync('style.css', css);
console.log('Adjusted again');
