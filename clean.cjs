const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/ctx\.beginPath\(\);\s*ctx\.moveTo\(leftPts\[0\]\.x, leftPts\[0\]\.y\);\s*for \(let i = 1; i < TRAIL_LENGTH; i\+\+\) \{\s*ctx\.lineTo\(leftPts\[i\]\.x, leftPts\[i\]\.y\);\s*\}\s*\/\/ rounded tail tip\s*ctx\.arc\(x, trail\[TRAIL_LENGTH - 1\]\.y \+ thumbHeight \/ 2, 1\.5, Math\.PI, 0, true\);\s*for \(let i = TRAIL_LENGTH - 1; i >= 0; i--\) \{\s*ctx\.lineTo\(rightPts\[i\]\.x, rightPts\[i\]\.y\);\s*\}\s*\/\/ rounded head tip\s*\/\/ Head/m, '// Head');

fs.writeFileSync('script.js', js);
console.log('Cleaned dangling path');
