const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The block starts with /* 1. HERO SECTION */
// Let's replace it with a cleaner one.

const cleanHero = `
/* 1. HERO SECTION */
.hero__name {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(42px, 3.5vw + 31px, 72px) !important;
  line-height: 1.1 !important;
  letter-spacing: clamp(0.2px, 0.1vw + 0.1px, 0.56px) !important;
}

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

css = css.replace(/\/\* 1\. HERO SECTION \*\/[\s\S]*?\/\* 1\.5\. BODY LARGE \(Requested uniform style\) \*\/[\s\S]*?line-height: 1\.5 !important;\n\}/, cleanHero.trim());

fs.writeFileSync('style.css', css);
console.log('Fixed hero duplicate declarations');
