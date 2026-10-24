const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Replace the root .hero__graphics
css = css.replace(
  /\.hero__graphics\s*\{\s*position:\s*absolute;\s*left:\s*622px;\s*top:\s*153px;\s*width:\s*900px;\s*height:\s*498px;\s*pointer-events:\s*none;\s*z-index:\s*1;\s*\}/g,
  '.hero__graphics {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 1;\n}'
);

// We also have two weird media queries for 979px and 860px that position .hero__graphics
// Since .hero__graphics is just a wrapper for tablets (they have their own absolute values), we should remove these media queries or reset them.
css = css.replace(
  /@media\s*\(max-width:\s*979px\)\s*\{\s*\.hero__graphics\s*\{[\s\S]*?\}\s*\}/g,
  ''
);
css = css.replace(
  /@media\s*\(max-width:\s*860px\)\s*\{\s*\.hero__graphics\s*\{[\s\S]*?\}\s*\}/g,
  ''
);

fs.writeFileSync('style.css', css);
console.log('Fixed hero__graphics desktop offset!');
