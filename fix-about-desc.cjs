const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Ensure .about__desc is in the Body Text group
// Right now 7. REGULAR BODY TEXT has .about__exp-text (which doesn't exist, it's .about__desc)
css = css.replace(/\.about__exp-text/, '.about__desc');

fs.writeFileSync('style.css', css);
console.log('Fixed about desc');
