const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I need to add pathLength="100" class="anim-path-6" to the path inside <g mask="url(#mask0_911_376)">
let searchStr = '<g mask="url(#mask0_911_376)"><path d="';
let replaceStr = '<g mask="url(#mask0_911_376)"><path pathLength="100" class="anim-path-6" d="';

html = html.replace(searchStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log('Fixed anim-path-6');
