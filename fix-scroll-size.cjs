const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
css = css.replace('.custom-mobile-scrollbar {\n  position: fixed;\n  right: 4px;\n  top: 64px; /* Below header + 8px */\n  bottom: 8px;\n  width: 6px;',
'.custom-mobile-scrollbar {\n  position: fixed;\n  right: 4px;\n  top: 64px; /* Below header + 8px */\n  bottom: 8px;\n  width: 12px;');
fs.writeFileSync('style.css', css);

let js = fs.readFileSync('script.js', 'utf8');
js = js.replace('canvas.width = 16 * dpr; // 16px wide canvas', 'canvas.width = 24 * dpr; // 24px wide canvas');
js = js.replace('const width = 2 + 4 * easeProgress;', 'const width = 4 + 8 * easeProgress;');
js = js.replace('ctx.arc(8, pt.y, width / 2, 0, Math.PI * 2);', 'ctx.arc(12, pt.y, width / 2, 0, Math.PI * 2);');
js = js.replace('ctx.roundRect(5, pt.y, 6, pt.height, 3);', 'ctx.roundRect(6, pt.y, 8, pt.height, 4);');
fs.writeFileSync('script.js', js);
console.log('Fixed scrollbar size');
