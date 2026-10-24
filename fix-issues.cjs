const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const additionalMobileFixes = `
/* ADDITIONAL MOBILE FIXES */
@media (max-width: 639px) {
  /* 2) About section cards elements larger */
  .about-card__title {
    font-size: 28px !important;
  }
  .about-card__link {
    font-size: 24px !important;
  }

  /* 4) Skills H3 larger */
  .skills-group__title, 
  .skills-card-software__title {
    font-size: 28px !important;
  }

  /* 6) Algorithm final photo larger (+20%) */
  .algorithm__photo-wrap {
    max-width: 340px !important;
    width: 100% !important;
    margin: 0 auto;
  }

  /* 7) FAQ questions smaller, arrow fix */
  .faq-item__question {
    font-size: 16px !important;
    padding-right: 12px;
  }
  .faq-item__icon-wrap {
    flex-shrink: 0;
  }
  .faq-item__trigger {
    padding: 16px !important;
    align-items: flex-start;
  }
  .faq-item__number {
    font-size: 18px !important;
    min-width: 20px !important;
  }

  /* 8) Contacts hierarchy */
  .contacts__info-label {
    font-size: 14px !important;
    line-height: 1.4 !important;
  }
  .contacts__info-value {
    font-size: 16px !important;
  }
  .contacts__time-title {
    font-size: 16px !important;
    margin-bottom: 4px;
  }
  .contacts__time-desc {
    font-size: 14px !important;
    opacity: 0.8;
  }

  /* 9) Socials in a row */
  .contacts__socials {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto;
    padding-bottom: 8px;
    gap: 12px;
  }
  .social-card {
    min-width: 80px;
    flex-shrink: 0;
  }

  /* 10) 24 hours text */
  .contacts-form__note {
    font-size: 14px !important;
  }

  /* 11) Contact form spacing */
  .contacts-form {
    gap: 16px !important;
    padding: 24px !important;
  }
  .contacts-form__row {
    gap: 16px !important;
  }

  /* 12 & 13) Footer */
  .footer__logo {
    width: 60px !important; /* increased from 48 approx 20% */
  }
  .footer__nav {
    flex-wrap: wrap;
    gap: 12px;
  }
}
`;

css += '\n' + additionalMobileFixes;
fs.writeFileSync('style.css', css);
console.log('Mobile fixes applied');
