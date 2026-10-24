const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const marker = '@media (max-width: 979px) {\n  .hero__graphics';
const idx = css.indexOf(marker);
if (idx !== -1) {
    css = css.substring(0, idx);
} else {
    // If exact match fails, try finding the block
    const m2 = css.indexOf('@media (max-width: 979px) {\n  .hero__graphics');
    if (m2 !== -1) css = css.substring(0, m2);
}

const finalCSS = `
@media (max-width: 979px) {
  .hero__graphics {
    position: absolute;
    left: 50%;
    transform: translateX(-35%);
    top: 250px;
    width: 600px;
    height: 332px;
  }
}

@media (max-width: 860px) {
  .hero__graphics {
    position: absolute;
    left: 50%;
    transform: translateX(-35%);
    top: 280px;
    width: 500px;
    height: 276.6px;
  }
}

@media (max-width: 639px) {
  /* Header Fix */
  .header { padding: 16px; }
  .header--sticky, .header--hiding { padding: 8px 16px; }
  .header__container { padding: 0 16px; width: 100%; max-width: 100%; }

  /* Perfect 100dvh Hero */
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
    padding-top: 96px !important; 
    display: block !important; 
  }

  /* Text at the top */
  .hero__content {
    position: relative !important;
    z-index: 10 !important;
    width: 100% !important;
    padding: 0 16px !important;
  }

  .hero__text-group {
    width: 100% !important;
    max-width: 290px !important; /* Keep text strictly on the left so it doesn't overlap face */
    text-align: left !important;
  }

  .hero__titles { text-align: left !important; }

  .hero__name {
    font-size: 40px !important;
    line-height: 1.05 !important;
    text-align: left !important;
  }
  .hero__role {
    font-size: 16px !important;
    line-height: 1.3 !important;
    text-align: left !important;
    margin-bottom: 8px !important;
  }
  .hero__description {
    font-size: 15px !important;
    line-height: 1.35 !important;
    text-align: left !important;
  }

  /* Left-aligned compact buttons */
  .hero__buttons {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    margin-top: 24px !important;
  }
  .hero__buttons .btn {
    width: auto !important;
    height: 44px !important;
    padding: 0 16px !important;
    font-size: 15px !important;
  }

  /* Graphics positioned absolutely at the bottom */
  .hero__graphics {
    position: absolute !important;
    bottom: 0 !important; 
    top: auto !important;
    left: 50% !important;
    /* 
      Translate -58% centers the silhouette perfectly 
      while hiding the shadow off the right edge 
    */
    transform: translateX(-58%) !important; 
    width: 150vw !important; /* Perfect scale for mobile */
    height: calc(150vw * 498 / 900) !important;
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
console.log('Final mobile fix applied.');
