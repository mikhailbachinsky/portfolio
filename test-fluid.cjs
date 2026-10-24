const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

// Update HTML
const heroContainerRegex = /(<div class="hero__content">[\s\S]*?<\/div>\s*)(<!-- Анимированный росчерк «М» -->[\s\S]*?<img src="assets\/images\/hero-photo\.png" alt="Михаил Бачинский" class="hero__photo"[^>]*>)/;

if (heroContainerRegex.test(html)) {
  html = html.replace(heroContainerRegex, '$1<div class="hero__graphics">\n$2\n</div>');
  fs.writeFileSync('index.html', html);
  console.log('HTML updated');
} else {
  console.log('HTML regex failed');
}

// Update CSS
// Remove old absolute positions for desktop
css = css.replace(/(\.hero__photo\s*\{[\s\S]*?)(left: 622px;\s*top: 153px;\s*width: 900px;\s*height: 498px;)/, '$1/* wrapped */');
css = css.replace(/(\.hero__line--m\s*\{[\s\S]*?)(left: 554px;\s*top: 135px;\s*width: 342px;\s*height: 226px;)/, '$1/* wrapped */');
css = css.replace(/(\.hero__line--b\s*\{[\s\S]*?)(left: 780px;\s*top: 116px;\s*width: 448px;\s*height: 422px;)/, '$1/* wrapped */');

// Remove old mobile logic for graphics
css = css.replace(/(\.hero__photo\s*\{[^}]*?)(left:[^}]*?)(?=\})/, '$1');
css = css.replace(/(\.hero__line--m\s*\{[^}]*?)(left:[^}]*?)(?=\})/, '$1');
css = css.replace(/(\.hero__line--b\s*\{[^}]*?)(left:[^}]*?)(?=\})/, '$1');

// Inject new desktop layout
const fluidCss = `
.hero__graphics {
  position: absolute;
  left: 622px;
  top: 153px;
  width: 900px;
  height: 498px;
  pointer-events: none;
  z-index: 1;
}
.hero__photo {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.hero__line--m {
  position: absolute;
  left: calc(-68 / 900 * 100%);
  top: calc(-18 / 498 * 100%);
  width: calc(342 / 900 * 100%);
  height: auto;
}
.hero__line--b {
  position: absolute;
  left: calc(158 / 900 * 100%);
  top: calc(-37 / 498 * 100%);
  width: calc(448 / 900 * 100%);
  height: auto;
}
`;

if(!css.includes('.hero__graphics')) {
  css = css.replace('.hero__photo {', fluidCss + '\n.hero__photo {');
}

fs.writeFileSync('style.css', css);
console.log('CSS updated');
