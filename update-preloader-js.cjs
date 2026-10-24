const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldScriptRegex = /<script>\s*\(\s*function\(\)\s*\{[\s\S]*?\}\)\(\);\s*<\/script>/;

const newScript = `<script>
    (function() {
      const startTime = performance.now();
      window.addEventListener('load', () => {
        const elapsed = performance.now() - startTime;
        const minTime = 1200; // Ждем окончания заливки логотипа
        const delay = Math.max(0, minTime - elapsed);
        
        setTimeout(() => {
          const preloader = document.getElementById('preloader');
          const preloaderWrap = document.querySelector('.preloader__logo-wrap');
          const headerLogo = document.querySelector('.header__logo img');
          
          if (!headerLogo || !preloaderWrap) {
            preloader.classList.add('is-hidden');
            return;
          }

          // Скрываем оригинальный логотип в хедере на время полета
          headerLogo.style.opacity = '0';

          // Вычисляем координаты для полета (от центра к центру)
          const pRect = preloaderWrap.getBoundingClientRect();
          const hRect = headerLogo.getBoundingClientRect();
          
          const scale = hRect.width / pRect.width;
          const deltaX = (hRect.left + hRect.width / 2) - (pRect.left + pRect.width / 2);
          const deltaY = (hRect.top + hRect.height / 2) - (pRect.top + pRect.height / 2);
          
          // Запускаем анимацию полета логотипа и растворения фона
          preloader.classList.add('is-moving');
          preloaderWrap.style.transform = \`translate(\${deltaX}px, \${deltaY}px) scale(\${scale})\`;
          
          // После завершения полета возвращаем видимость хедеру и убиваем прелоадер
          setTimeout(() => {
            headerLogo.style.opacity = '1';
            headerLogo.style.transition = 'opacity 0.3s ease';
            preloader.classList.add('is-hidden');
          }, 800); // Время должно совпадать с transition в CSS
          
        }, delay);
      });
    })();
  </script>`;

if (oldScriptRegex.test(html)) {
  html = html.replace(oldScriptRegex, newScript);
  fs.writeFileSync('index.html', html);
  console.log('index.html JS updated');
} else {
  console.log('Regex failed to match JS');
}
