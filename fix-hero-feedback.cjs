const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// 1. Fix Header Padding on Mobile
// In @media (max-width: 639px) (and 479px just in case)
css = css.replace(/(\.header\s*\{\s*padding:\s*)0 24px;/g, '$10;');
css = css.replace(/(\.header--sticky,\s*\.header--hiding\s*\{\s*padding:\s*)0 16px;/g, '$10;');
css = css.replace(/(\.header__container\s*\{[\s\S]*?padding:\s*)0 8px;/g, '$10 16px;');


// 2. Fix Hero Buttons on Mobile
// Remove the overrides that made buttons full-width
const buttonsRegex = /\.hero__buttons\s*\{\s*flex-direction:\s*column;\s*align-items:\s*flex-start;\s*width:\s*100%;\s*\}\s*\.hero__buttons\s*\.btn\s*\{\s*width:\s*100%;\s*justify-content:\s*center;\s*\}/g;

css = css.replace(buttonsRegex, `
  .hero__buttons {
    flex-direction: row;
    align-items: center;
    width: auto;
    flex-wrap: wrap;
    gap: 12px;
  }
  .hero__buttons .btn {
    width: auto;
    justify-content: center;
  }
`);

// 3. Fix Hero Graphics Overflow & Centering on Mobile
// We need to change the .hero__graphics block in the @media (max-width: 639px)
const graphicsRegex = /\.hero__graphics\s*\{\s*position:\s*relative;\s*top:\s*0;\s*left:\s*0;\s*width:\s*calc\(100vw - 32px\);\s*aspect-ratio:\s*900 \/ 498;\s*height:\s*auto;\s*margin:\s*0 auto;\s*display:\s*block;\s*\}/g;

// To make the person centered, the graphics container needs to be wider than the screen.
// Based on tests, width: 140vw and left: -15vw seems to shift it perfectly so the shadow is cut off on the right, and the person is centered.
const newGraphics = `
  .hero__graphics {
    position: relative;
    top: 0;
    /* Move left by 10% of screen width, make it 145% wide */
    left: -15vw;
    width: 145vw;
    max-width: none;
    aspect-ratio: 900 / 498;
    height: auto;
    margin: 0;
    display: block;
    /* Ensure no overflow scroll */
    pointer-events: none;
  }
`;

if (graphicsRegex.test(css)) {
    css = css.replace(graphicsRegex, newGraphics);
    console.log('Hero graphics updated');
} else {
    console.log('Could not find .hero__graphics block to replace');
}

fs.writeFileSync('style.css', css);
console.log('CSS fixes applied.');
