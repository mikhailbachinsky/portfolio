const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const transformOld = 'transform: translateX(calc(-50% + 128px)) !important;';
const transformNew = 'transform: translateX(calc(-50% + 80px)) !important;';

if (css.includes(transformOld)) {
    css = css.replace(transformOld, transformNew);
    fs.writeFileSync('style.css', css);
    console.log('Offset updated to 80px right.');
} else {
    console.log('Could not find the exact transform string.');
}
