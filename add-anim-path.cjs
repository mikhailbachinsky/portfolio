const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<g mask="url\(#mask0_911_376\)"><path d="/g, '<g mask="url(#mask0_911_376)"><path pathLength="100" class="anim-path-6" d="');

fs.writeFileSync('index.html', html);
