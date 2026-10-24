const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add pathLength="100" to the path inside <g mask="url(#mask0_911_376)"> so our css stroke-dasharray animation works perfectly.
html = html.replace(/<g mask="url\(#mask0_911_376\)"><path d="M1 149\.682C97\.3606/, '<g mask="url(#mask0_911_376)"><path pathLength="100" d="M1 149.682C97.3606');

fs.writeFileSync('index.html', html);
console.log('Fixed path length');
