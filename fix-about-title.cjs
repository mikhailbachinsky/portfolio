const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// There are several!
css = css.replace(/\.about-card__title\s*\{\s*font-size:\s*28px\s*!important;\s*\}/, '');
css = css.replace(/\.about-card__title,\s*\.faq-item__number,\s*\.project-modal__title\s*\{[^}]+\}/, '.faq-item__number, .project-modal__title { font-size: 22px !important; line-height: 1.3 !important; }');
css = css.replace(/\.about__lead,\s*\.project-card__title,\s*\.skills-group__title,\s*\.skills-card-software__title__title,\s*\.about-card__title,\s*\.faq-item__number,\s*\.project-modal__title\s*\{[^}]+\}/, '.about__lead, .project-card__title, .skills-group__title, .skills-card-software__title__title, .faq-item__number, .project-modal__title { font-size: 20px !important; }');

fs.writeFileSync('style.css', css);
console.log('Fixed title overrides');
