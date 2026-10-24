const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Fix scrollbar top position (64px)
css = css.replace('top: 56px; /* Below header */', 'top: 64px; /* Below header + 8px */');
css = css.replace('margin-top: 56px;', 'margin-top: 64px;');

// We will also use canvas for the mobile scrollbar, so let's add styles for it
if (!css.includes('.custom-mobile-scrollbar-canvas')) {
css += `
.custom-mobile-scrollbar-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
`;
}

// Remove the HTML-based thumb since we use canvas
css = css.replace(/\.custom-mobile-scrollbar-thumb \{[\s\S]*?\}/, '');

fs.writeFileSync('style.css', css);

// 2. Update script.js to replace the old scrollbar with a Canvas-based trail scrollbar
let js = fs.readFileSync('script.js', 'utf8');

// Remove old initMobileScrollbar and replace it
const oldInitStart = js.indexOf('// --- Custom Calligraphic Mobile Scrollbar ---');
if (oldInitStart !== -1) {
  js = js.substring(0, oldInitStart);
}

const newJsLogic = `
  // --- Custom Calligraphic Mobile Scrollbar (Canvas Trail) ---
  function initMobileScrollbar() {
    const scrollbar = document.createElement('div');
    scrollbar.className = 'custom-mobile-scrollbar';
    const canvas = document.createElement('canvas');
    canvas.className = 'custom-mobile-scrollbar-canvas';
    scrollbar.appendChild(canvas);
    document.body.appendChild(scrollbar);

    const ctx = canvas.getContext('2d');
    let scrollTimeout;
    
    // Trail state
    const trail = [];
    let isScrolling = false;
    let trackHeight = 0;
    
    function resizeCanvas() {
      if (window.innerWidth >= 980) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // The track is inside .custom-mobile-scrollbar which is fixed
      trackHeight = window.innerHeight - 64 - 8; // top: 64, bottom: 8
      canvas.width = 16 * dpr; // 16px wide canvas
      canvas.height = trackHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    function draw() {
      if (window.innerWidth >= 980) {
        requestAnimationFrame(draw);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update trail ages
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        if (trail[i].age > 30) { // fading out over 30 frames
          trail.splice(i, 1);
        }
      }
      
      // Draw calligraphic trail
      if (trail.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const progress = 1 - (pt.age / 30); // 1 to 0
          const easeProgress = progress * progress; // non-linear fade
          
          // Width tapering (calligraphic ink stroke)
          const width = 2 + 4 * easeProgress; 
          
          // Draw a circle at each point to form a continuous ink stroke with varying width
          ctx.arc(8, pt.y, width / 2, 0, Math.PI * 2);
          ctx.fillStyle = \`rgba(115, 111, 141, \${easeProgress * 0.8})\`; // Accent color
          ctx.fill();
          ctx.beginPath();
        }
      } else if (trail.length === 1) {
         // Draw single thumb when stationary
         const pt = trail[0];
         ctx.beginPath();
         // Thumb gets taller to represent the view ratio, but with rounded ends
         ctx.roundRect(5, pt.y, 6, pt.height, 3);
         ctx.fillStyle = \`rgba(115, 111, 141, \${Math.max(0, 1 - pt.age/60) * 0.8})\`;
         ctx.fill();
      }
      
      requestAnimationFrame(draw);
    }
    
    let lastThumbTop = 0;
    
    function onScroll() {
      if (window.innerWidth >= 980) {
        scrollbar.classList.remove('is-active');
        return;
      }

      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (scrollHeight <= innerHeight) return;

      const minThumbHeight = 40; 
      let thumbHeight = Math.max((innerHeight / scrollHeight) * trackHeight, minThumbHeight);
      
      const maxScroll = scrollHeight - innerHeight;
      const scrollProgress = scrollTop / maxScroll;
      
      const thumbTop = scrollProgress * (trackHeight - thumbHeight);
      
      // Add current position to trail
      trail.push({ y: thumbTop, height: thumbHeight, age: 0 });
      
      scrollbar.classList.add('is-active');

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollbar.classList.remove('is-active');
      }, 1000);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      onScroll();
    }, { passive: true });
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Init
    resizeCanvas();
    draw();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileScrollbar);
  } else {
    initMobileScrollbar();
  }
`;

js += '\n' + newJsLogic;
fs.writeFileSync('script.js', js);
console.log('Done fixing scrollbar!');
