const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Also need to remove the mask attributes from the SVG tag itself just to be safe.
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<g mask="[^"]*">/g, '<g>');
fs.writeFileSync('index.html', html);

