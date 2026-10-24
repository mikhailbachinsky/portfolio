const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The original mask contacts__line positioning was top: -101px; left: calc(100% - 4px);
// The original SVG had size 847x151.
// We are now at top: -50px; left: calc(100% - 240px);
// And the screenshot shows it way too far right and high.
// Oh wait... the screenshot shows it NOT EVEN STARTING. It's just a dot!
// That's because the animation is broken! The line is not drawn!
// Ah, the mask is masking everything out because the mask path isn't aligned with the stroke path properly?
// No, the original SVG had a mask. 
// "В секции Контакты россчерк вообще не из засечки начинет вырисовываться, опустить и сместить вправо"
// If the user can see it, it means it's drawing, but just starts in the wrong place.
// Wait, the screenshot shows the start of the line. It's a bit above the "ы" and too far right.
// So we need to: "опустить и сместить вправо" (lower and move right).
// Currently: top: -50px; left: calc(100% - 240px);
// To lower: top: -20px;
// To move right: left: calc(100% - 200px);
// Let's try: top: -10px; left: calc(100% - 150px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-50px;/, '$1-20px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 240px\);/, '$1calc(100% - 170px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 9');
