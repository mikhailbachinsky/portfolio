const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Also, the original svg file had some weird masks. Let's make sure it's drawing.
// The animation path length fix was overwritten! I see now!
// When I updated the SVG file initially I fixed it, but maybe I missed something. 
