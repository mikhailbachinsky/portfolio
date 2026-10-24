const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The replacement accidentally changed the inputs to 17px as well.
// Revert inputs to 16px to prevent iOS zoom issues.
css = css.replace(/\/\* 9\. INPUTS AND BUTTONS \([^)]+\) \*\/\n\.contacts-form__input, [^\{]+\{\n  font-family: var\(--font-text\) !important;\n  font-size: 17px !important;/g, 
  '/* 9. INPUTS AND BUTTONS (Min 16px for iOS anti-zoom) */\n.contacts-form__input, .contacts-form__textarea, .btn, .btn-resume, .contacts-form__submit, .contacts__resume-btn, .modal__btn-primary, .menu-modal__resume {\n  font-family: var(--font-text) !important;\n  font-size: 16px !important;');

fs.writeFileSync('style.css', css);
console.log('Fixed inputs size');
