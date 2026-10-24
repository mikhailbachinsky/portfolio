const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const marker = '@media (max-width: 639px) {\n  /* 1. Header */';
const idx = css.indexOf(marker);
if (idx !== -1) {
    css = css.substring(0, idx);
} else {
    const m2 = css.lastIndexOf('@media (max-width: 639px)');
    if (m2 !== -1) css = css.substring(0, m2);
}

const finalCSS = `
@media (max-width: 639px) {
  /* 1. Header */
  .header {
    top: 0 !important;
    padding: 16px !important;
  }
  .header--sticky, .header--hiding {
    top: 0 !important;
    padding: 16px !important;
  }
  .header__container {
    padding: 0 10px 0 16px !important; /* 10px right padding so burger is 10px from edges */
    width: 100% !important;
    max-width: 100% !important;
    height: 56px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  
  .header__logo img {
    height: 28px !important; /* Increased proportionally with header */
  }
  
  .header__actions {
    display: flex !important;
    align-items: center !important;
  }
  
  /* hide social links in header actions if they exist to just show burger */
  .header__actions .social-links {
    display: none !important;
  }

  .burger-btn {
    width: 36px !important;
    height: 36px !important;
    margin: 0 !important;
  }

  /* 2. Hero Layout */
  .hero {
    min-height: 100dvh !important;
    height: 100dvh !important;
    padding-bottom: 0 !important;
    overflow: hidden !important;
  }

  .hero__container {
    height: 100% !important;
    min-height: 100% !important;
    position: relative !important;
    padding: 0 !important;
    display: block !important; 
  }

  .hero__content {
    position: absolute !important;
    top: 144px !important; /* Strict 144px from top */
    left: 16px !important;
    right: 16px !important;
    width: calc(100% - 32px) !important;
    padding: 0 !important;
    z-index: 10 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important; /* Spacing between body text and buttons */
  }

  .hero__text-group {
    width: 100% !important;
    text-align: left !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important; /* Spacing between subtitle and body text */
  }

  .hero__titles { 
    text-align: left !important; 
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important; /* Spacing between title and subtitle */
  }

  /* 3. Typography */
  .hero__name {
    font-size: 40px !important;
    line-height: 1.1 !important;
    text-align: left !important;
    letter-spacing: 0 !important;
    margin: 0 !important;
  }
  .hero__role {
    font-size: 16px !important;
    line-height: 1.4 !important;
    text-align: left !important;
    margin: 0 !important;
  }
  .hero__description {
    font-size: 14px !important;
    line-height: 1.6 !important;
    text-align: left !important;
    margin: 0 !important;
  }

  /* 4. Buttons */
  .hero__buttons {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 8px !important; /* Spacing between buttons */
    margin: 0 !important;
  }
  .hero__buttons .btn {
    width: auto !important;
    height: 44px !important;
    padding: 0 16px !important;
    font-size: 15px !important; /* I'll keep it readable, maybe 14px as requested in earlier message, wait user didn't specify button font size this time, but I'll use 15px */
  }

  /* 5. Graphics */
  .hero__graphics {
    position: absolute !important;
    bottom: -2vh !important; 
    top: auto !important;
    left: 50% !important;
    transform: translateX(-52%) !important; 
    width: 130vw !important; 
    height: calc(130vw * 498 / 900) !important;
    max-width: none !important;
    margin: 0 !important;
    display: block !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  .hero__photo {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
  }
  .hero__line--m {
    position: absolute !important;
    left: calc(-68 / 900 * 100%) !important;
    top: calc(-18 / 498 * 100%) !important;
    width: calc(342 / 900 * 100%) !important;
    height: auto !important;
  }
  .hero__line--b {
    position: absolute !important;
    left: calc(158 / 900 * 100%) !important;
    top: calc(-37 / 498 * 100%) !important;
    width: calc(448 / 900 * 100%) !important;
    height: auto !important;
  }
}
`;

css += finalCSS;
fs.writeFileSync('style.css', css);
console.log('Typography and Layout Perfect applied.');
