const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Match any <g mask="..."> then any whitespace then <path d="
html = html.replace(/<g mask="url\(#mask0_911_376\)">\s*<path d="/, '<g mask="url(#mask0_911_376)"><path pathLength="100" class="anim-path-6" d="');

fs.writeFileSync('index.html', html);
console.log('Fixed anim-path-6 properly 2');
