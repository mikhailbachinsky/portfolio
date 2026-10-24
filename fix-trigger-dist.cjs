const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/const triggerDistance = window.innerWidth <= 640 \? 120 : 220;/, `
    let triggerDistance = window.innerWidth <= 640 ? 120 : 220;
    window.addEventListener('resize', () => { triggerDistance = window.innerWidth <= 640 ? 120 : 220; }, { passive: true });
`);
fs.writeFileSync('script.js', js);
console.log('Trigger distance made dynamic');
