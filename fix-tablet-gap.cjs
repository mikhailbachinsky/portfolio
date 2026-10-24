const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Find the .contacts__details inside the media queries.
css = css.replace(
/(\@media\s*\(max-width:\s*992px\)\s*\{[\s\S]*?\.contacts__details\s*\{\s*)gap:\s*24px;(\s*\})/,
'$1gap: 12px;$2'
);

fs.writeFileSync('style.css', css);
console.log('Fixed tablet gap');
