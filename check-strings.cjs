const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');
let inString = false;
let stringChar = '';
for (let i = 0; i < css.length; i++) {
  const c = css[i];
  if (!inString) {
    if (c === '"' || c === "'") {
      inString = true;
      stringChar = c;
    }
  } else {
    if (c === '\\') {
      i++; // skip escaped
    } else if (c === stringChar) {
      inString = false;
    } else if (c === '\n') {
      console.log("Unclosed string at index", i);
      inString = false;
    }
  }
}
console.log("In string at end of file:", inString);
