const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// A safer way is to split the CSS by "}" and if it's inside a max-width: 639px or 479px or 860px or 979px query, bump the fonts.
// Actually, media queries can contain multiple rules. 
// Let's use a regex that finds media queries and replaces font-size inside them.

const mediaRegex = /(@media\s*\([^)]+\)\s*\{)([\s\S]*?)(\n\})(-\s)?/g; // Not perfect

// Let's just do a global bump for mobile-specific classes or all font sizes in media queries that are max-width: something less than 1000px.

function bump(size) {
    if (size === 12) return 14;
    if (size === 14) return 16;
    if (size === 16) return 18;
    if (size === 18) return 20;
    if (size === 20) return 22;
    if (size === 22) return 24;
    if (size === 24) return 28;
    if (size === 32) return 36;
    if (size === 48) return 56;
    return size;
}

let inMedia = false;
let mediaValid = false;

let lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('@media') && lines[i].includes('max-width')) {
        let match = lines[i].match(/max-width:\s*(\d+)px/);
        if (match && parseInt(match[1]) < 1000) {
            mediaValid = true;
        } else {
            mediaValid = false;
        }
    }
    
    if (lines[i].trim() === '}') {
        // We might be exiting a rule or a media query. 
        // This is too fragile.
    }
}

// Let's use postcss if available, but it's not.
