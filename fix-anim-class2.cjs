const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I reverted the class name in style.css earlier. Let's make sure it's targeting `.anim-path-6`
css = css.replace(/\.draw-line-mask-6 path \{/g, '.draw-line-mask-6 .anim-path-6 {');
css = css.replace(/\.animated-svg-container-6\.animate-start-6 \.draw-line-mask-6 path \{/g, '.animated-svg-container-6.animate-start-6 .draw-line-mask-6 .anim-path-6 {');

fs.writeFileSync('style.css', css);
