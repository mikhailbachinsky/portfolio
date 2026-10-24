const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I also need to make sure the animation is targeting the right element.
css = css.replace(/\.draw-line-mask-6 \.anim-path-6 \{/g, '.draw-line-mask-6 path {');
css = css.replace(/\.animated-svg-container-6\.animate-start-6 \.draw-line-mask-6 \.anim-path-6 \{/g, '.animated-svg-container-6.animate-start-6 .draw-line-mask-6 path {');

// The original position of the old 847x151 contacts svg was top: -101px; left: calc(100% - 4px);
// Let's set it slightly adjusted from the original: top: -125px; left: calc(100% - 5px);
// The user said: "опустить и сместить вправо" relative to my PREVIOUS buggy position, which was top: -90px; left: calc(100% - 195px);
// Let's set it to: top: -110px; left: calc(100% - 20px);
css = css.replace(/(\.contacts__line\s*\{[^}]*?top:\s*)-20px;/, '$1-110px;');
css = css.replace(/(\.contacts__line\s*\{[^}]*?left:\s*)calc\(100% - 170px\);/, '$1calc(100% - 20px);');

fs.writeFileSync('style.css', css);
console.log('Fixed line pos 10');
