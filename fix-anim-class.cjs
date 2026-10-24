const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.draw-line-mask-6 g path \{/g, '.draw-line-mask-6 .anim-path-6 {');
css = css.replace(/\.animated-svg-container-6\.animate-start-6 \.draw-line-mask-6 g path \{/g, '.animated-svg-container-6.animate-start-6 .draw-line-mask-6 .anim-path-6 {');

fs.writeFileSync('style.css', css);
console.log('Fixed CSS target');
