const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The media query `.about-card__link { font-size: 24px !important; }` is overriding the clamp rule!
css = css.replace(/\.about-card__link\s*\{\s*font-size:\s*24px\s*!important;\s*\}/, '');

fs.writeFileSync('style.css', css);
console.log('Fixed link override');
