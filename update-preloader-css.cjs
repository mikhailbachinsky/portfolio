const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// We need to modify .preloader classes
// Currently we have:
/*
.preloader {
  ...
  background: #CFD2DA;
  ...
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.8s ease;
}
.preloader.is-hidden { ... }
.preloader.is-hidden .preloader__logo-wrap { ... }
*/

// Let's replace the whole PRELOADER section
const oldCssRegex = /\/\* ========================================= \*\/\n\/\* PRELOADER                                 \*\/\n\/\* ========================================= \*\/[\s\S]*?(?=\Z|\/\* ========================================= \*\/\n\/\* (?!PRELOADER))/;

const newCss = `/* ========================================= */
/* PRELOADER                                 */
/* ========================================= */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #CFD2DA;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease, visibility 0.3s ease;
}

/* Стадия 1: Полет логотипа и растворение фона */
.preloader.is-moving {
  background-color: rgba(207, 210, 218, 0); /* Прозрачный фон */
  pointer-events: none;
}

/* Оболочка логотипа летит к хедеру */
.preloader__logo-wrap {
  position: relative;
  width: 160px;
  height: 40px;
  transform-origin: center center;
  /* Анимация трансформации при добавлении инлайновых стилей */
  transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Стадия 2: Полное скрытие */
.preloader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
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

if (css.includes('/* PRELOADER')) {
  css = css.replace(oldCssRegex, newCss);
  fs.writeFileSync('style.css', css);
  console.log('style.css CSS updated');
} else {
  console.log('Could not find PRELOADER section in CSS');
}
