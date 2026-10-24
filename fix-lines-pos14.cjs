const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Also, the old height/width was 847x151 for contacts. Now it's 850x155.
// Let's adjust position based on the new SVG viewport:
// The SVG path starts at y=149.682 and x=1. 
// So the stroke starts almost at the bottom-left corner of the SVG viewbox (which is 850x155).
// The text baseline of "ы" is somewhere in the middle of `.contacts__title-anchor`.
// To align the bottom-left corner of the SVG with the bottom-right of "ы", we need to position the SVG so that its bottom edge aligns with the baseline.
// top: -110px means the SVG starts 110px ABOVE the text. Since the SVG height is 155px, the bottom edge is at 155 - 110 = 45px BELOW the text baseline.
// The text size is 56px (based on standard font sizes for titles).
// So maybe we need to bring it UP. 
// Let's try top: -140px; left: calc(100% - 2px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-110px;/, '$1-135px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 20px\);/, '$1calc(100% - 2px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 14');
