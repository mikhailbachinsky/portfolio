const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The user wants:
// 1) "Копирайтинг, графдизайн и фотопродакшен" (about-card__title) -> H1 size (or very big). 
// Currently it's in the Card Titles (H5) block of the typography system, making it clamp(20px, ..., 24px) - too small.
// Let's remove .about-card__title* from the H5 block.
css = css.replace(/\.about-card__title, \.about-card__title--left, \.about-card__title--right, \.about-card__title--bottom, /, '');

// 2) "Узнать больше" (about-card__link) -> currently has some crazy overrides or font-size 24px!important.
// Let's clean it up.

// 3) Create a specific block for these.

const specificTypography = `
/* ==========================================================================
   ABOUT SECTION CUSTOM TYPOGRAPHY
   ========================================================================== */

/* The user requested these to be "as large as H1" (Hero name size) */
.about-card__title, 
.about-card__title--left, 
.about-card__title--right, 
.about-card__title--bottom {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(32px, 3.5vw + 24px, 44px) !important;
  line-height: 1.1 !important;
  letter-spacing: clamp(0.25px, 0.1vw + 0.1px, 0.44px) !important;
}

/* "Узнать больше" button inside the card */
.about-card__link {
  font-family: var(--font-text) !important;
  font-weight: 500 !important;
  font-size: clamp(14px, 0.45vw + 13.5px, 16px) !important;
  line-height: 1.4 !important;
  text-decoration: none !important;
}
`;

css += '\n' + specificTypography;

fs.writeFileSync('style.css', css);
console.log('Fixed about typography');
