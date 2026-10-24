const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
let spacingRegex = /(?:padding|margin|gap)[a-z-]*:\s*([^;}]+)/g;

let match;
let values = new Set();
let exactCounts = {};

while ((match = spacingRegex.exec(css)) !== null) {
  let valStr = match[1].trim();
  // split by spaces to handle things like "10px 20px 15px 5px"
  let parts = valStr.split(/\s+/);
  parts.forEach(p => {
    if (p.endsWith('px') && !p.startsWith('calc') && !p.startsWith('var')) {
      let num = parseFloat(p);
      if (num !== 0) {
        values.add(num);
        exactCounts[num] = (exactCounts[num] || 0) + 1;
      }
    }
  });
}

let sorted = Array.from(values).sort((a, b) => a - b);
sorted.forEach(v => {
  console.log(`${v}px : ${exactCounts[v]} times`);
});
