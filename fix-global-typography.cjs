const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const typographyOverrides = `
/* ==========================================================================
   GLOBAL MOBILE TYPOGRAPHY HIERARCHY OVERRIDE (Based on Hero 44/20/16)
   ========================================================================== */
@media (max-width: 639px) {
  /* H2: Main Section Titles */
  .about__title, .projects__title, .skills__title, .algorithm__title, .faq__title, .contacts__title {
    font-size: 36px !important;
    line-height: 1.1 !important;
    letter-spacing: 0.2px !important;
  }

  /* H3 / Large Cards / Leads */
  .about__lead, 
  .project-card__title, 
  .skills-group__title, 
  .skills-card-software__title, 
  .algorithm-card__title, 
  .about-card__title,
  .faq-item__number,
  .project-modal__title {
    font-size: 22px !important;
    line-height: 1.3 !important;
  }

  /* Subtitles / Medium Accents */
  .about__method, 
  .about__exp-title, 
  .skills-item__title,
  .faq-item__question {
    font-size: 18px !important;
    line-height: 1.4 !important;
  }

  /* Body Text / Small Cards / Primary Descriptions (matches Hero Desc: 16px) */
  .about__desc, 
  .algorithm-card__text, 
  .project-details-card__title, 
  .text-body,
  .menu-modal__link,
  .faq-item__answer,
  .contacts-form__input,
  .contacts-form__textarea {
    font-size: 16px !important;
    line-height: 1.5 !important;
  }

  /* Small Details / Labels */
  .project-details-card__text, 
  .footer__link, 
  .footer__copy,
  .about__exp-list li,
  .header__nav-link,
  .header__actions .btn-resume {
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  /* Buttons */
  .btn, .btn-resume, .contacts-form__submit, .contacts__resume-btn, .modal__btn-primary, .menu-modal__resume {
    font-size: 16px !important;
  }
}

@media (max-width: 479px) {
  .about__title, .projects__title, .skills__title, .algorithm__title, .faq__title, .contacts__title {
    font-size: 32px !important;
  }
  .about__lead, .project-card__title, .skills-group__title, .skills-card-software__title, .algorithm-card__title, .about-card__title, .faq-item__number, .project-modal__title {
    font-size: 20px !important;
  }
}
`;

css += '\n' + typographyOverrides;
fs.writeFileSync('style.css', css);
console.log('Mobile typography hierarchy applied.');
