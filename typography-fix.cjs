const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// We will append a massive typography block at the end of the file.
const typographyBlock = `
/* ==========================================================================
   UNIFIED TYPOGRAPHY SYSTEM (AUTO-SCALING)
   ========================================================================== */

/* 1. HERO SECTION */
.hero__name {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(42px, 3.5vw + 31px, 72px) !important;
  line-height: 1.1 !important;
  letter-spacing: clamp(0.2px, 0.1vw + 0.1px, 0.56px) !important;
}
.hero__role {
  font-family: var(--font-text) !important;
  font-weight: 500 !important;
  font-size: clamp(18px, 0.5vw + 16px, 22px) !important;
  line-height: 1.4 !important;
}
.hero__description {
  font-family: var(--font-text) !important;
  font-weight: 400 !important;
  font-size: clamp(16px, 0.5vw + 14px, 18px) !important;
  line-height: 1.5 !important;
}

/* 2. SECTION TITLES (H2) */
.about__title, .projects__title, .skills__title, .algorithm__title, .faq__title, .contacts__title {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(36px, 2.3vw + 28px, 56px) !important;
  line-height: 1.1 !important;
  letter-spacing: clamp(0.2px, 0.1vw + 0.1px, 0.56px) !important;
}

/* 3. SECTION SUBTITLES / LARGE LEADS (H3) */
.about__lead, .contacts__subtitle {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(24px, 1.4vw + 19px, 36px) !important;
  line-height: 1.25 !important;
  letter-spacing: clamp(0.1px, 0.05vw + 0.1px, 0.36px) !important;
}

/* 4. STANDARD SECTION LEADS (H4) */
.skills__lead, .algorithm__lead, .faq__lead, .contacts__lead {
  font-family: var(--font-text) !important;
  font-weight: 500 !important;
  font-size: clamp(16px, 0.7vw + 14px, 22px) !important;
  line-height: 1.5 !important;
}

/* 5. CARD TITLES (H5) */
.project-card__title, .skills-group__title, .skills-card-software__title, .algorithm-card__title, .about-card__title, .about-card__title--left, .about-card__title--right, .about-card__title--bottom, .project-modal__title, .faq-item__number, .contacts__socials-title, .menu-modal__title {
  font-family: var(--font-title) !important;
  font-weight: 700 !important;
  font-size: clamp(20px, 0.5vw + 18px, 24px) !important;
  line-height: 1.3 !important;
}

/* 6. SMALL CARD TITLES / MEDIUM TEXT (H6) */
.about__method, .about__exp-title, .skills-item__title, .software-item__title, .faq-item__question {
  font-family: var(--font-text) !important;
  font-weight: 500 !important;
  font-size: clamp(16px, 0.5vw + 14.5px, 20px) !important;
  line-height: 1.4 !important;
}

/* 7. REGULAR BODY TEXT */
.project-card__text, .algorithm-card__text, .about-card__text, .faq-item__answer, .modal__content p, .project-details-card__text, .about__exp-text {
  font-family: var(--font-text) !important;
  font-weight: 400 !important;
  font-size: clamp(15px, 0.2vw + 14.5px, 16px) !important;
  line-height: 1.6 !important;
}

/* 8. SMALL DETAILS / LABELS / TAGS */
.project-card__tag, .project-deliverable-item, .footer__nav-link, .contacts-form__hint, .contacts-social__name, .project-card__fluent-name, .project-card__fluent-meta, .contacts-form__input, .contacts-form__textarea, .btn, .btn-resume, .contacts-form__submit, .contacts__resume-btn, .modal__btn-primary {
  font-family: var(--font-text) !important;
  font-size: clamp(13px, 0.2vw + 12.5px, 16px) !important;
  line-height: 1.5 !important;
}
`;

css += '\n' + typographyBlock;
fs.writeFileSync('style.css', css);
console.log('Typography block added');
