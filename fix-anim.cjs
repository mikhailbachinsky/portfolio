const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /transition:\s*transform\s*0\.34s\s*cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\),\s*opacity\s*0\.22s\s*ease;/,
  "transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;"
);

fs.writeFileSync('style.css', css);
console.log('Animation fixed');
