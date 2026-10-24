const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/let stickyTops = \[\d+, \d+, \d+, \d+\];\s*function updateStickyTops\(\) \{[\s\S]*?\}\s*updateStickyTops\(\);\s*window\.addEventListener\('resize', updateStickyTops, \{ passive: true \}\);/m, `
    let stickyTops = [86, 138, 190, 242];
    function updateStickyTops() {
      stickyTops = cards.map(c => parseFloat(window.getComputedStyle(c).top) || 0);
    }
    updateStickyTops();
    window.addEventListener('resize', updateStickyTops, { passive: true });
`);

fs.writeFileSync('script.js', js);
console.log('Algorithm stacking JS restored');
