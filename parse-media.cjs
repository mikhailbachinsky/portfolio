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

let m639 = extractMedia('@media (max-width: 639px)');
fs.writeFileSync('m639.css', m639);

let m479 = extractMedia('@media (max-width: 479px)');
fs.writeFileSync('m479.css', m479);

let m860 = extractMedia('@media (max-width: 860px)');
fs.writeFileSync('m860.css', m860);

let m1199 = extractMedia('@media (max-width: 1199px)');
fs.writeFileSync('m1199.css', m1199);

console.log('Extracted media queries');
