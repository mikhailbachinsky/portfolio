const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// Define replacements (font-size and matching line-height adjustments)
const replacements = [
  // 10px - 11.5px -> 12px
  { regex: /font-size:\s*10(\.5)?px;/g, replace: 'font-size: 12px;' },
  { regex: /font-size:\s*11(\.5)?px;/g, replace: 'font-size: 12px;' },
  
  // 12.5px -> 13px (Wait, standard tailwind has 12px and 14px, maybe I should just use 12, 14, 16, 18).
  // Let's use 12px for extra small, 14px for small, 16px for body
  { regex: /font-size:\s*12\.5px;/g, replace: 'font-size: 12px;' },
  
  // 13px, 13.5px -> 14px
  { regex: /font-size:\s*13(\.5)?px;/g, replace: 'font-size: 14px;' },
  
  // 14.5px, 15px -> 16px (often used as small/medium blend, let's bump to standard 16px for readability, or 14px if it's meant to be small)
  { regex: /font-size:\s*14\.5px;/g, replace: 'font-size: 14px;' }, // Keep 14.5 at 14 to avoid breaking layout
  { regex: /font-size:\s*15px;/g, replace: 'font-size: 16px;' },
  
  // 17px -> 18px
  { regex: /font-size:\s*17px;/g, replace: 'font-size: 18px;' },
  
  // 25.26px -> 24px
  { regex: /font-size:\s*25\.26px;/g, replace: 'font-size: 24px;' },
];

let newCss = css;
replacements.forEach(r => {
  newCss = newCss.replace(r.regex, r.replace);
});

// Now let's fix weird pixel line-heights that might be broken by font-size shifts
// e.g. line-height: 21.6px -> line-height: 1.5;
newCss = newCss.replace(/line-height:\s*21\.6px;/g, 'line-height: 1.5;');
newCss = newCss.replace(/line-height:\s*28\.8px;/g, 'line-height: 1.5;');
newCss = newCss.replace(/line-height:\s*25\.2px;/g, 'line-height: 1.4;');
newCss = newCss.replace(/line-height:\s*25\.6px;/g, 'line-height: 1.6;');

fs.writeFileSync('style.css', newCss);
console.log('Typography normalized');
