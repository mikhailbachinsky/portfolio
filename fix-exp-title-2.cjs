const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.contacts__person-name\s*\{/g, '.contacts__person-name,\n.about__exp-title {');

// Wait, the block looks like:
// .hero__role,
// .hero__description,
// .about__method,
// .skills-item__title,
// .software-item__title,
// .contacts__lead,
// .contacts__person-name {

css = css.replace(/\.contacts__person-name \{/g, '.contacts__person-name,\n.about__exp-title {');

fs.writeFileSync('style.css', css);
console.log('Fixed about__exp-title in body large');
