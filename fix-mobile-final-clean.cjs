const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const marker = '@media (max-width: 639px) {\n  /* Header Fix */';
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
    padding: 0 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 48px !important;
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
    padding-top: 88px !important; /* 16px + 48px + 24px */
    display: flex !important; 
    flex-direction: column !important;
    justify-content: flex-start !important;
  }

  .hero__content {
    position: relative !important;
    z-index: 10 !important;
    width: 100% !important;
    padding: 0 16px !important;
  }

  .hero__text-group {
    width: 100% !important;
    text-align: left !important;
  }

  .hero__titles { 
    text-align: left !important; 
    gap: 4px !important;
  }

  /* 3. Typography */
  .hero__name {
    font-size: 44px !important;
    line-height: 1.05 !important;
    text-align: left !important;
    letter-spacing: 0 !important;
  }
  .hero__role {
    font-size: 16px !important;
    line-height: 1.3 !important;
    text-align: left !important;
    margin-bottom: 12px !important;
  }
  .hero__description {
    font-size: 14px !important;
    line-height: 1.35 !important;
    text-align: left !important;
  }

  /* 4. Buttons */
  .hero__buttons {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    margin-top: 20px !important;
  }
  .hero__buttons .btn {
    width: auto !important;
    height: 40px !important;
    padding: 0 16px !important;
    font-size: 14px !important;
  }

  /* 5. Graphics */
  .hero__graphics {
    position: absolute !important;
    bottom: -2vh !important; 
    top: auto !important;
    left: 50% !important;
    transform: translateX(-52%) !important; 
    /* 
       To match Image 2, the scale needs to be smaller than 150vw,
       maybe 125vw, so the head clears the buttons and the swirl is visible.
    */
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
console.log('Final mobile clean applied.');
