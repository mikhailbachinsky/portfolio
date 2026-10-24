const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');
let inComment = false;
for (let i = 0; i < css.length; i++) {
  if (!inComment && css[i] === '/' && css[i+1] === '*') {
    inComment = true;
    i++;
  } else if (inComment && css[i] === '*' && css[i+1] === '/') {
    inComment = false;
    i++;
  }
}
console.log("In comment at end of file:", inComment);
