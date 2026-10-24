const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The mobile overrides were added at the very end of style.css. Let's find and replace that block.
// I will replace everything from @media (max-width: 639px) { /* Header Fix */ to the end of the file.

const startIndex = css.indexOf('@media (max-width: 639px) {\n  /* Header Fix */');
if (startIndex !== -1) {
    css = css.substring(0, startIndex);
}

const newMobileCSS = `
@media (max-width: 639px) {
  /* Header Fix */
  .header {
    padding: 16px;
  }
  .header--sticky, .header--hiding {
    padding: 8px 16px;
  }
  .header__container {
    padding: 0 16px;
  }

  /* Perfect 100dvh Hero */
  .hero {
    min-height: 100dvh;
    height: 100dvh;
    padding-bottom: 0;
    overflow: hidden;
  }

  .hero__container {
    height: 100dvh;
    min-height: 100dvh;
    position: relative;
    padding-top: 100px; /* Space for header */
  }

  .hero__content {
    position: relative;
    z-index: 10;
    width: 100%;
    padding: 0 16px;
  }

  .hero__text-group {
    width: 100%;
    text-align: left;
  }

  .hero__titles {
    text-align: left;
  }

  /* Typography bumped slightly higher to ensure text clears the graphics */
  .hero__name {
    font-size: 42px !important;
    line-height: 1.05 !important;
    text-align: left !important;
  }
  .hero__role {
    font-size: 18px !important;
    line-height: 1.3 !important;
    text-align: left !important;
    margin-bottom: 8px;
  }
  .hero__description {
    font-size: 16px !important;
    line-height: 1.35 !important;
    text-align: left !important;
  }

  /* Left-aligned buttons */
  .hero__buttons {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    margin-top: 20px !important;
  }
  .hero__buttons .btn {
    width: auto !important;
    height: 48px !important;
    padding: 0 20px !important;
    font-size: 16px !important;
  }

  /* Centered, correctly scaled silhouette positioned absolutely at the bottom */
  .hero__graphics {
    position: absolute !important;
    bottom: -1vh !important; /* Touch the bottom of the screen */
    
    /* 
       The user said: 
       - Shadow on right must be hidden (so push image right)
       - Left flourish was out of bounds (so push image right)
       - Person must be centered.
       Let's use a width of 145vw, and a left offset of 15vw to push it right.
    */
    width: 145vw !important;
    left: 12vw !important; 
    
    max-width: none !important;
    aspect-ratio: 900 / 498;
    height: auto !important;
    margin: 0 !important;
    display: block !important;
    pointer-events: none;
    z-index: 1;
  }

  .hero__photo {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
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

css += newMobileCSS;
fs.writeFileSync('style.css', css);
console.log('Mobile hero completely re-done.');
