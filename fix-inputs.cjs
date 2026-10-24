const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/, \.contacts-form__input, \.contacts-form__textarea, \.btn, \.btn-resume, \.contacts-form__submit, \.contacts__resume-btn, \.modal__btn-primary/, '');

css += `
/* 9. INPUTS AND BUTTONS (Min 16px for iOS anti-zoom) */
.contacts-form__input, .contacts-form__textarea, .btn, .btn-resume, .contacts-form__submit, .contacts__resume-btn, .modal__btn-primary, .menu-modal__resume {
  font-family: var(--font-text) !important;
  font-size: 16px !important;
  line-height: 1.5 !important;
}
`;

fs.writeFileSync('style.css', css);
console.log('Fixed inputs');
