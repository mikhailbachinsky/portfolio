const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// I'll append mobile styles for .hero at the end of the file inside a media query
const mobileCSS = `

@media (max-width: 979px) {
  .hero__graphics {
    position: absolute;
    left: 450px;
    top: 250px;
    width: 600px;
    height: 332px;
  }
}

@media (max-width: 860px) {
  .hero__graphics {
    position: absolute;
    left: 400px;
    top: 280px;
    width: 500px;
    height: 276.6px;
  }
}

@media (max-width: 639px) {
  .hero__container {
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 100px;
    padding-bottom: 20px;
  }

  .hero__content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    margin-bottom: 40px;
    padding: 0 16px;
  }

  .hero__buttons {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .hero__buttons .btn {
    width: 100%;
    justify-content: center;
  }

  .hero__graphics {
    position: relative;
    top: 0;
    left: 0;
    width: calc(100vw - 32px);
    aspect-ratio: 900 / 498;
    height: auto;
    margin: 0 auto;
    display: block;
  }
  
  /* Reset previous mobile overrides for lines/photo inside the graphics container */
  .hero__photo {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .hero__line--m {
    left: calc(-68 / 900 * 100%);
    top: calc(-18 / 498 * 100%);
    width: calc(342 / 900 * 100%);
    height: auto;
  }
  .hero__line--b {
    left: calc(158 / 900 * 100%);
    top: calc(-37 / 498 * 100%);
    width: calc(448 / 900 * 100%);
    height: auto;
  }
}
`;

css += mobileCSS;

fs.writeFileSync('style.css', css);
console.log('Mobile layout CSS appended');
