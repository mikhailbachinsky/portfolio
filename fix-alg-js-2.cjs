const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/function updateStickyTops\(\) \{[\s\S]*?\}\s*updateStickyTops\(\);/, `
    function updateStickyTops() {
      if (window.innerWidth <= 640) {
        stickyTops = [86, 126, 166, 206];
      } else {
        stickyTops = [86, 138, 190, 242];
      }
      
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]) cards[i].style.top = stickyTops[i] + 'px';
      }
    }
    updateStickyTops();
`);

fs.writeFileSync('script.js', js);
console.log('Restored explicit style.top in JS');
