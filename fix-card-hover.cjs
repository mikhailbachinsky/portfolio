const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The card itself should not jump on hover, but we modified it to `transform: none !important;`
// We should probably just keep it as is, it's correct. 
// BUT maybe we need to remove the shadow? No, user just said "подпрыгивает вверх при наведении, убрать, сделать вензель полностью статичным"
// The card hover effect on .about-card--more was `transform: translateY(-4px)`. We removed it.
// The line hover effect is also removed.

fs.writeFileSync('style.css', css);
