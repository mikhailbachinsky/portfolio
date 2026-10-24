const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');

// I will just print the mobile block to be sure
const idx = css.lastIndexOf('@media (max-width: 639px)');
console.log(css.substring(idx, idx + 1500));
