const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const newLogic = `
    let stickyTops = [86, 138, 190, 242];
    function updateStickyTops() {
      if (window.innerWidth <= 640) {
        stickyTops = [86, 126, 166, 206]; // Smaller gaps on mobile
        cards[0].style.top = '86px';
        cards[1].style.top = '126px';
        cards[2].style.top = '166px';
        cards[3].style.top = '206px';
      } else {
        stickyTops = [86, 138, 190, 242];
        cards[0].style.top = '86px';
        cards[1].style.top = '138px';
        cards[2].style.top = '190px';
        cards[3].style.top = '242px';
      }
    }
    
    updateStickyTops();
    window.addEventListener('resize', updateStickyTops, { passive: true });

    const triggerDistance = window.innerWidth <= 640 ? 120 : 220; // Дистанция доезда карточки для плавного сжатия
`;

js = js.replace(/let stickyTops = \[86, 138, 190, 242\];\s*function updateStickyTops\(\) \{\s*stickyTops = cards\.map\(c => parseFloat\(window\.getComputedStyle\(c\)\.top\) \|\| 0\);\s*\}\s*updateStickyTops\(\);\s*const triggerDistance = 220;/s, newLogic);
fs.writeFileSync('script.js', js);
console.log('Algorithm stacking logic fixed');
