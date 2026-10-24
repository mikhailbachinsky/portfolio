const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The problematic string right now is:
// .project-card__text, .algorithm-card__text, .about-card__text, .faq-item__answer, .modal__content p, .project-details-card__text, /* 8. SMALL DETAILS / LABELS / TAGS */
// .project-card__tag, ... { ... }

// I will just replace the whole sections 7 and 8 with the correct text.

const correctSections = `
/* 7. REGULAR BODY TEXT */
.project-card__text, .algorithm-card__text, .about-card__text, .faq-item__answer, .modal__content p, .project-details-card__text, .about__desc {
  font-family: var(--font-text) !important;
  font-weight: 400 !important;
  font-size: clamp(15px, 0.2vw + 14.5px, 16px) !important;
  line-height: 1.6 !important;
}

/* 8. SMALL DETAILS / LABELS / TAGS */
.project-card__tag, .project-deliverable-item, .footer__nav-link, .contacts-form__hint, .contacts-social__name, .project-card__fluent-name, .project-card__fluent-meta {
  font-family: var(--font-text) !important;
  font-size: clamp(13px, 0.2vw + 12.5px, 16px) !important;
  line-height: 1.5 !important;
}
`;

const replaceRegex = /\/\* 7\. REGULAR BODY TEXT \*\/[\s\S]*?\/\* 9\. INPUTS AND BUTTONS/g;

css = css.replace(replaceRegex, correctSections.trim() + '\n\n/* 9. INPUTS AND BUTTONS');

fs.writeFileSync('style.css', css);
console.log('Fixed section 7 and 8');
