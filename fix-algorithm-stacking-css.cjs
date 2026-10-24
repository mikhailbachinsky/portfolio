const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css += `\n/* Fix algorithm steps height on mobile for sticky stacking */\n@media (max-width: 979px) {\n  .algorithm__steps {\n    padding-bottom: 300px;\n  }\n}\n`;
css += `\n@media (max-width: 639px) {\n  .algorithm__steps {\n    padding-bottom: 400px;\n  }\n}\n`;

fs.writeFileSync('style.css', css);
console.log('Algorithm steps padding added');
