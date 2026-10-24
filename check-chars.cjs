const fs = require('fs');
const css = fs.readFileSync('style.css');
console.log(css.slice(0, 20));
