const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// We need to parse block by block to know the font-size context, or we can just replace known values.
// 72px * 1.1 = 79.2px
// 56px * 1.1 = 61.6px
// 42px * 1.1 = 46.2px
// 36px * 1.3 = 46.8px
// 32px * 1.1 = 35.2px
// 24px * 1.3 = 31.2px
// 22px * 1.4 = 30.8px
// 16px * 1.4 = 22.4px
// 14px * 1.4 = 19.6px (Wait, there's 19.2px which is 1.37)
// Let's just use exact string replacement for these Figma-exported fractional line-heights.

const lhReplacements = [
  { regex: /line-height:\s*79\.2px;/g, replace: 'line-height: 1.1;' },
  { regex: /line-height:\s*61\.6px;/g, replace: 'line-height: 1.1;' },
  { regex: /line-height:\s*46\.8px;/g, replace: 'line-height: 1.3;' },
  { regex: /line-height:\s*46\.2px;/g, replace: 'line-height: 1.1;' },
  { regex: /line-height:\s*35\.2px;/g, replace: 'line-height: 1.1;' },
  { regex: /line-height:\s*31\.2px;/g, replace: 'line-height: 1.3;' },
  { regex: /line-height:\s*30\.8px;/g, replace: 'line-height: 1.4;' },
  { regex: /line-height:\s*28\.6px;/g, replace: 'line-height: 1.3;' },
  { regex: /line-height:\s*23\.8px;/g, replace: 'line-height: 1.7;' }, // 14px * 1.7 = 23.8px
  { regex: /line-height:\s*22\.4px;/g, replace: 'line-height: 1.4;' },
  { regex: /line-height:\s*22\.5px;/g, replace: 'line-height: 1.4;' },
  { regex: /line-height:\s*20\.4px;/g, replace: 'line-height: 1.4;' },
  { regex: /line-height:\s*19\.2px;/g, replace: 'line-height: 1.37;' },
  { regex: /line-height:\s*19\.5px;/g, replace: 'line-height: 1.4;' },
];

lhReplacements.forEach(r => {
  css = css.replace(r.regex, r.replace);
});

fs.writeFileSync('style.css', css);
console.log('Line heights normalized');
