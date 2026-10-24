const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /transition: transform 0\.45s cubic-bezier\(0\.16, 1, 0\.3, 1\), opacity 0\.3s ease;/,
  "transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;"
);

fs.writeFileSync('style.css', css);
console.log('Animation fixed to 0.5s');
