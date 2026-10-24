const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

function extractMedia(query) {
    let index = css.indexOf(query);
    if (index === -1) return '';
    let openCount = 0;
    let start = css.indexOf('{', index) + 1;
    openCount = 1;
    let i = start;
    for (; i < css.length; i++) {
        if (css[i] === '{') openCount++;
        else if (css[i] === '}') openCount--;
        if (openCount === 0) break;
    }
    return css.substring(start, i);
}

let m479 = extractMedia('@media (max-width: 479px)');
const fontSizes = [...m479.matchAll(/font-size:\s*\d+px/g)];
console.log(fontSizes.map(m => m[0]));
