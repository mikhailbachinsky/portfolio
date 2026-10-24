const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Just split and join to guarantee replacement
let parts = html.split('<g mask="url(#mask0_911_376)"><path d="');
if (parts.length > 1) {
    html = parts.join('<g mask="url(#mask0_911_376)"><path pathLength="100" class="anim-path-6" d="');
    fs.writeFileSync('index.html', html);
    console.log('Fixed anim-path-6 using split/join');
} else {
    console.log('String not found?');
}
