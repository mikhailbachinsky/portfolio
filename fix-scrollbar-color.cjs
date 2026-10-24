const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(/rgba\(115, 111, 141, 0\.55\)/g, 'rgba(115, 111, 141, 1)');
js = js.replace(/const width = 1\.5 \+ 4\.5 \* easeProgress;/g, 'const width = 2.5 + 5.5 * easeProgress;');
fs.writeFileSync('script.js', js);
console.log('Scrollbar colors fixed');
