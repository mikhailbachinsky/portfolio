const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Hide mobile native scrollbar
const hideScrollCSS = `
/* Custom Mobile Scrollbar */
@media (max-width: 979px) {
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;
    width: 0;
  }
  html {
    scrollbar-width: none;
  }
}

.custom-mobile-scrollbar {
  position: fixed;
  right: 4px;
  top: 56px; /* Below header */
  bottom: 8px;
  width: 6px;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  display: none;
}
@media (max-width: 979px) {
  .custom-mobile-scrollbar {
    display: block;
  }
}
.custom-mobile-scrollbar.is-active {
  opacity: 1;
}
.custom-mobile-scrollbar-thumb {
  position: absolute;
  width: 100%;
  background: var(--text-accent);
  border-radius: 100px;
  /* Calligraphic tapered effect */
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  border-bottom-left-radius: 50% 100%;
  border-bottom-right-radius: 50% 100%;
  box-shadow: 0 0 6px rgba(100, 92, 187, 0.4);
}
`;

css += '\n' + hideScrollCSS;

// Also make desktop scrollbar track transparent
css = css.replace('::-webkit-scrollbar-track {\n  background: var(--bg-about);\n}', '::-webkit-scrollbar-track {\n  background: transparent;\n  margin-top: 56px;\n}');

fs.writeFileSync('style.css', css);

// 2. Update script.js
let js = fs.readFileSync('script.js', 'utf8');
const jsLogic = `
  // --- Custom Calligraphic Mobile Scrollbar ---
  function initMobileScrollbar() {
    const scrollbar = document.createElement('div');
    scrollbar.className = 'custom-mobile-scrollbar';
    const thumb = document.createElement('div');
    thumb.className = 'custom-mobile-scrollbar-thumb';
    scrollbar.appendChild(thumb);
    document.body.appendChild(scrollbar);

    let scrollTimeout;

    function updateScrollbar() {
      if (window.innerWidth >= 980) {
        scrollbar.classList.remove('is-active');
        return;
      }

      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (scrollHeight <= innerHeight) return;

      const trackHeight = scrollbar.clientHeight;
      // Minimum thumb height for visibility
      const minThumbHeight = 40; 
      let thumbHeight = Math.max((innerHeight / scrollHeight) * trackHeight, minThumbHeight);
      
      const maxScroll = scrollHeight - innerHeight;
      const scrollProgress = scrollTop / maxScroll;
      
      const thumbTop = scrollProgress * (trackHeight - thumbHeight);

      thumb.style.height = thumbHeight + 'px';
      thumb.style.transform = \`translateY(\${thumbTop}px)\`;

      scrollbar.classList.add('is-active');

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollbar.classList.remove('is-active');
      }, 1000);
    }

    window.addEventListener('scroll', updateScrollbar, { passive: true });
    window.addEventListener('resize', updateScrollbar, { passive: true });
  }
  initMobileScrollbar();
`;

// Append JS logic to the end of the script (or inside a DOMContentLoaded block if needed)
// Looking at script.js, it usually runs at bottom or has event listeners.
js += '\n' + jsLogic;
fs.writeFileSync('script.js', js);

console.log('Mobile scrollbar added.');
