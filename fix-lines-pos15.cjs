const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I also noticed in the screenshot that the stroke is really thick compared to the text.
// The user uploaded an SVG with stroke-width="6", which is what it was, but let's keep it as is.
// What if we need to adjust the position again? Let's check the previous state.
// Previously I set:
// left: calc(100% - 215px); top: -65px; -> That produced the screenshot with the weird disconnected line, which is because the mask was cutting it off!
// So with the mask removed, the line is fully drawn.
// Let's ensure left and top are close to the original (before my aggressive shifting):
// left: calc(100% - 4px); top: -101px; was the ORIGINAL.
// The line starts at (1, 149) in a 155 height box.
// If it's too high up, we decrease negative top (e.g. -90px). 
// If it's too far left, we increase negative left (e.g. -20px).
// "опустить и сместить вправо" relative to original?
// The user says "В секции Контакты россчерк вообще не из засечки начинет вырисовываться, опустить и сместить вправо"
// If original was top: -101px; left: calc(100% - 4px);
// To move DOWN: top: -90px;
// To move RIGHT: left: calc(100% + 5px);
// Wait, I just set it to top: -135px; left: calc(100% - 2px); which is moving UP and LEFT!
// Okay, let's change it back:
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-135px;/, '$1-95px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 2px\);/, '$1calc(100% + 5px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 15');
