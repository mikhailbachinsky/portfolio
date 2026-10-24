const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// First, clean up the previous mentions from the typography block
css = css.replace(/\.hero__role\s*\{[^}]+\}/, '');
css = css.replace(/\.hero__description\s*\{[^}]+\}/, '');
css = css.replace(/\.skills__lead, \.algorithm__lead, \.faq__lead, \.contacts__lead/, '.skills__lead, .algorithm__lead, .faq__lead');
css = css.replace(/\.about__method, \.about__exp-title, \.skills-item__title, \.software-item__title, \.faq-item__question/, '.about__exp-title, .faq-item__question');

// Now, add the new Body Large block right before /* 2. SECTION TITLES (H2) */
const bodyLargeBlock = `
/* 1.5. BODY LARGE (Requested uniform style) */
.hero__role,
.hero__description,
.about__method,
.skills-item__title,
.software-item__title,
.contacts__lead,
.contacts__person-name {
  font-family: var(--font-text) !important;
  font-weight: 500 !important;
  font-size: clamp(16px, 0.45vw + 14.5px, 20px) !important;
  line-height: 1.5 !important;
}
`;

css = css.replace(/\/\* 2\. SECTION TITLES \(H2\) \*\//, bodyLargeBlock + '\n/* 2. SECTION TITLES (H2) */');

fs.writeFileSync('style.css', css);
console.log('Updated typography for Body Large');
