const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// 1. Fix Header padding
// The user wants the header to not touch the edges. So .header should have padding, and .header__container should take 100% of the remaining width.
css = css.replace(/(\.header\s*\{\s*padding:\s*)0;(\s*\})/g, '$116px;$2');
css = css.replace(/(\.header--sticky,\s*\.header--hiding\s*\{\s*padding:\s*)0;(\s*\})/g, '$18px 16px;$2');
css = css.replace(/(\.header__container\s*\{[\s\S]*?padding:\s*)0 16px;/g, '$10 20px;');

// 2. Fix Hero Mobile Alignments & Typography
const mobileBlockRegex = /@media\s*\(max-width:\s*639px\)\s*\{([\s\S]*?)\n\}/g;

let matches = [...css.matchAll(mobileBlockRegex)];

// We will explicitly override the mobile styles for .hero
const heroOverrides = `
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
  }

  .hero__container {
    height: 100dvh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 80px; /* space for header */
    padding-bottom: 0;
    overflow: hidden;
  }

  .hero__content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    margin-bottom: 2vh;
    padding: 0 16px;
    align-items: flex-start;
  }

  .hero__text-group {
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .hero__titles {
    align-items: flex-start;
    text-align: left;
  }

  /* Scaled down typography to fit in 100vh */
  .hero__name {
    font-size: 40px !important;
    line-height: 1.05 !important;
    text-align: left !important;
  }
  .hero__role {
    font-size: 16px !important;
    line-height: 1.3 !important;
    text-align: left !important;
    margin-bottom: 8px;
  }
  .hero__description {
    font-size: 14px !important;
    line-height: 1.35 !important;
    text-align: left !important;
  }

  /* Left-aligned buttons */
  .hero__buttons {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    margin-top: 12px;
  }
  .hero__buttons .btn {
    width: auto !important;
    justify-content: center !important;
    height: 44px !important;
    padding: 0 16px !important;
    font-size: 14px !important;
  }

  /* Centered, reduced scale silhouette */
  .hero__graphics {
    position: relative;
    top: 0;
    /* Scale down by 10-15%, original was 145vw, let's try 125vw */
    width: 125vw !important;
    /* Move left to center the silhouette, cutting off the shadow on the right */
    left: -7vw !important; 
    max-width: none !important;
    aspect-ratio: 900 / 498;
    height: auto !important;
    margin: 0 !important;
    display: block !important;
    pointer-events: none;
    /* Flex alignment */
    flex: 0 0 auto;
    margin-top: auto; /* Push to bottom */
  }

  .hero__photo {
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  .hero__line--m {
    left: calc(-68 / 900 * 100%) !important;
    top: calc(-18 / 498 * 100%) !important;
    width: calc(342 / 900 * 100%) !important;
    height: auto !important;
  }
  .hero__line--b {
    left: calc(158 / 900 * 100%) !important;
    top: calc(-37 / 498 * 100%) !important;
    width: calc(448 / 900 * 100%) !important;
    height: auto !important;
  }
}
`;

css += heroOverrides;

fs.writeFileSync('style.css', css);
console.log('Mobile hero layout perfect applied.');
