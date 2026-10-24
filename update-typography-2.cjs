const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I need to add .about__exp-title to Body Large. The previous script didn't work because of comma placement
css = css.replace(/\.contacts__person-name/, '.contacts__person-name,\n.about__exp-title');

// Fix button: User said "Узнать больше это кнопка, но в ней почему-то огромный размер сейчас и узкий интерлиньяж"
// The button is .about-card__link. I created ABOUT SECTION CUSTOM TYPOGRAPHY for it.
// Let's check it.

fs.writeFileSync('style.css', css);
console.log('Fixed body large');
