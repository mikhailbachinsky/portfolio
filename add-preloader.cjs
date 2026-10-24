const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const preloaderHTML = `
  <div id="preloader" class="preloader">
    <div class="preloader__logo-wrap">
      <img src="assets/icons/logo.svg" class="preloader__logo-base" alt="">
      <img src="assets/icons/logo.svg" class="preloader__logo-fill" alt="">
    </div>
  </div>
  <script>
    (function() {
      const startTime = performance.now();
      window.addEventListener('load', () => {
        const elapsed = performance.now() - startTime;
        const minTime = 1200; 
        const delay = Math.max(0, minTime - elapsed);
        setTimeout(() => {
          document.getElementById('preloader').classList.add('is-hidden');
        }, delay);
      });
    })();
  </script>
`;

if (!html.includes('id="preloader"')) {
  html = html.replace('<body>', '<body>\n' + preloaderHTML);
  fs.writeFileSync('index.html', html);
  console.log('index.html updated');
}

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

const preloaderCSS = `
/* ========================================= */
/* PRELOADER                                 */
/* ========================================= */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* background-color: var(--bg-main); */
  background: #CFD2DA; /* Use exact color to avoid any variable rendering issues before load */
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.8s ease;
}

.preloader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.preloader__logo-wrap {
  position: relative;
  width: 160px;
  height: 40px;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease;
}

.preloader.is-hidden .preloader__logo-wrap {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.preloader__logo-base,
.preloader__logo-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preloader__logo-base {
  opacity: 0.15;
  filter: grayscale(100%);
}

.preloader__logo-fill {
  clip-path: inset(0 100% 0 0);
  animation: preloaderFill 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes preloaderFill {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}
`;

if (!css.includes('.preloader {')) {
  css = css + '\n' + preloaderCSS;
  fs.writeFileSync('style.css', css);
  console.log('style.css updated');
}
