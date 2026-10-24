const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Projects: move up by 2px (bottom: -6px -> bottom: -4px)
css = css.replace(/(\.projects__line\s*\{[^}]*?bottom:\s*)-6px;/, '$1-4px;');

// 2. Skills: move left by 3px (left: calc(100% + 5px) -> left: calc(100% + 2px))
css = css.replace(/(\.skills__line\s*\{[^}]*?left:\s*)calc\(100% \+ 5px\);/, '$1calc(100% + 2px);');

// 3. Fix contacts animation targeting
css = css.replace(/\.draw-line-mask-6 path \{/g, '.draw-line-mask-6 g path {');
css = css.replace(/\.animated-svg-container-6\.animate-start-6 \.draw-line-mask-6 path \{/g, '.animated-svg-container-6.animate-start-6 .draw-line-mask-6 g path {');

fs.writeFileSync('style.css', css);
console.log('Fixed lines and animation targeting');
