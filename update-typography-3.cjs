const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Replace Body Large
css = css.replace(/font-size:\s*clamp\(16px,\s*0\.45vw\s*\+\s*14\.5px,\s*20px\)\s*!important;/g, 'font-size: clamp(18px, 0.25vw + 17px, 20px) !important;');

// Replace Regular Body Text
css = css.replace(/font-size:\s*clamp\(15px,\s*0\.2vw\s*\+\s*14\.5px,\s*16px\)\s*!important;/g, 'font-size: 16px !important;');

fs.writeFileSync('style.css', css);
console.log('Updated font sizes');
