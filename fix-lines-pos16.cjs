const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I also noticed in the original SVG, there was `maskUnits="userSpaceOnUse"`. 
// Because I removed the mask, the path renders at its full extent.
// Let's just make sure the left and top are well-aligned. 
// "опустить и сместить вправо"
// The stroke path starts exactly at `M1 149.682`.
// So it touches the very bottom-left corner of its 850x155 container.
// To align this bottom-left corner with the bottom-right of the letter "ы":
// "ы" is inside a <span> which is inline.
// The span `.contacts__title-anchor` has `position: relative`.
// `.contacts__line` is absolute inside it.
// `left: 100%` means the left edge of the SVG aligns with the right edge of "ы".
// `top: 0` means the top edge of the SVG aligns with the top edge of "ы".
// Since the SVG stroke starts at the BOTTOM of the SVG (y=150), we need to shift the SVG UP by almost its full height to align the start of the stroke with the bottom of the text!
// If the SVG height is 155px, and we want its bottom edge (y=150) to align with the text baseline (which is roughly near the bottom of the span, say 10px from the bottom of a 50px high span).
// To shift it UP by its height, we use negative top.
// E.g. `top: -140px;` (SVG is 155px tall, so 155 - 140 = 15px, meaning the bottom of the SVG is 15px below the top of the span).
// So my previous `top: -135px;` was actually ALMOST CORRECT!
// And `left: 100%` is perfectly aligned with the right edge of the text.
// If the user wants it to start INSIDE the serif (засечка), we need to shift it LEFT slightly. E.g. `left: calc(100% - 15px);`

css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-95px;/, '$1-135px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% \+ 5px\);/, '$1calc(100% - 15px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 16');
