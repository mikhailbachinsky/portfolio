const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css += `
/* ========================================================= */
/* FINAL MOBILE TWEAKS */
/* ========================================================= */
@media (max-width: 639px) {
  /* 1. Project Card Elements Enlarge (roughly 25-30% larger) */
  .card-elem--tutor-mascot { height: 230px !important; right: -5px !important; }
  .card-elem--tutor-puzzle { width: 330px !important; left: 10px !important; bottom: -15px !important; }
  .card-elem--tutor-logo { width: 45px !important; }

  .card-elem--iniciativa-dogs { height: 210px !important; }
  .card-elem--iniciativa-stickers { left: 10px !important; width: 140px !important; }

  .card-elem--law-com-girl { right: -5px !important; height: 350px !important; }
  .card-elem--law-com-lines { width: 180px !important; }

  .card-elem--law-day-balloon { height: 240px !important; }
  .card-elem--law-day-gift { left: 60px !important; width: 110px !important; }

  /* 2. FAQ Alignment Fix */
  .faq-item__trigger {
    align-items: center !important;
  }
  .faq-item__number {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 3. Contacts Socials Single Horizontal Line */
  .contacts__socials-title {
    font-size: 26px !important;
  }
  .contacts__socials-list {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    justify-content: flex-start !important;
    padding-bottom: 8px !important;
    gap: 12px !important;
    -webkit-overflow-scrolling: touch;
    width: 100%;
  }
  /* Hide scrollbar for socials */
  .contacts__socials-list::-webkit-scrollbar {
    display: none;
  }
  .contacts__socials-list {
    scrollbar-width: none;
  }
  .contacts-social {
    width: auto !important;
    min-width: 100px !important;
    flex: 0 0 auto !important;
    padding: 12px 16px;
    background: var(--bg-about);
    border-radius: 12px;
    border: 1px solid rgba(115, 111, 141, 0.12);
  }
  .contacts-social__icon-box {
    width: 40px !important;
    height: 40px !important;
  }
  .contacts-social__name {
    font-size: 14px !important;
  }

  /* 4. Footer Logo Enlarge Again (20% more) */
  .footer__logo img {
    width: 187px !important;
    height: auto !important;
  }

  /* 5. Contact Form Topics Chips - ensure they are small enough */
  .contacts-form__topic-chip {
    padding: 6px 12px !important;
    font-size: 13px !important;
  }
}

@media (max-width: 479px) {
  /* Enlarge for smaller phones too */
  .card-elem--tutor-mascot { height: 190px !important; }
  .card-elem--tutor-puzzle { width: 260px !important; }
  .card-elem--iniciativa-dogs { height: 180px !important; }
  .card-elem--law-com-girl { height: 300px !important; }
  .card-elem--law-day-balloon { height: 210px !important; }
  
  .footer__logo img {
    width: 170px !important;
    height: auto !important;
  }
}
`;

fs.writeFileSync('style.css', css);
console.log('Final fixes applied');
