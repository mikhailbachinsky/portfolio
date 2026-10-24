const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The user wants "Опыт и менеджмент" (.about__exp-title) to be Body Large
// Let's remove it from H6 block and add to Body Large

css = css.replace(/\.about__exp-title, \.faq-item__question/, '.faq-item__question');
css = css.replace(/\.contacts__person-name/, '.contacts__person-name,\n.about__exp-title');

fs.writeFileSync('style.css', css);
console.log('Fixed experience title');
