const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');

let openBraces = 0;
for (let i = 0; i < css.length; i++) {
  if (css[i] === '{') openBraces++;
  if (css[i] === '}') openBraces--;
  if (openBraces < 0) {
    console.log("Found extra closing brace at index", i);
    break;
  }
}
console.log("Final brace count:", openBraces);
