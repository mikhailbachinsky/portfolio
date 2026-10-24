const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The regex matches everything within @media (max-width: 479px) and (max-width: 639px).
// We can just use string replace since we know the class names.
const fixClasses = {
  '.project-card__tag': '12px',
  '.software-item__desc': '14px',
  '.contacts-social__name': '14px',
  '.footer__status-text': '12px',
  '.footer__location': '14px',
  '.footer__copyright': '14px',
  '.footer__disclaimer': '12px',
  '.footer__legal-btn': '12px',
  '.footer__back-to-top': '14px',
  '.modal__content h4': '14px',
  '.toast__badge': '12px'
};

for (const [cls, size] of Object.entries(fixClasses)) {
  // Regex to match the class rule and replace font-size inside it, only inside @media.
  // Actually, we can just replace globally inside these classes where font-size is 16px.
  // But be careful, we only want to change the ones in media queries if they were changed, 
  // or globally for some.
  let regex = new RegExp(`(${cls.replace('.', '\\.')}\\s*\\{[\\s\\S]*?font-size:\\s*)\\d+px;`, 'g');
  css = css.replace(regex, `$1${size};`);
}

// Ensure .btn has a good padding on mobile.
// .btn height is 48px, padding should be something like 0 24px.
css = css.replace(/(\.btn\s*\{[\s\S]*?padding:\s*)0 16px(;)/g, '$10 24px$2');

fs.writeFileSync('style.css', css);
console.log('Micro typography fixed');
