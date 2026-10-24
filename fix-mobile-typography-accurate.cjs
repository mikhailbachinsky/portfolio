const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

function extractMediaRange(query) {
    let index = css.indexOf(query);
    if (index === -1) return null;
    let openCount = 0;
    let start = css.indexOf('{', index) + 1;
    openCount = 1;
    let i = start;
    for (; i < css.length; i++) {
        if (css[i] === '{') openCount++;
        else if (css[i] === '}') openCount--;
        if (openCount === 0) break;
    }
    return { start: index, innerStart: start, end: i };
}

function processMediaQuery(content) {
  content = content.replace(/font-size:\s*(\d+)px;\s*line-height:\s*(\d+)px;/g, (match, fsStr, lhStr) => {
    let f = parseInt(fsStr);
    let l = parseInt(lhStr);
    let rel = (l / f).toFixed(2);
    rel = parseFloat(rel);
    return `font-size: ${f}px;\n    line-height: ${rel};`;
  });

  content = content.replace(/font-size:\s*(\d+)px;/g, (match, sizeStr) => {
    let size = parseInt(sizeStr);
    if (size === 12) return 'font-size: 14px;';
    if (size === 14) return 'font-size: 16px;';
    if (size === 16) return 'font-size: 18px;';
    if (size === 18) return 'font-size: 20px;';
    if (size === 20) return 'font-size: 24px;';
    if (size === 22) return 'font-size: 24px;';
    if (size === 24) return 'font-size: 28px;';
    if (size === 28) return 'font-size: 32px;';
    if (size === 32) return 'font-size: 36px;'; 
    if (size === 48) return 'font-size: 56px;';
    return match;
  });
  return content;
}

const queries = ['@media (max-width: 639px)', '@media (max-width: 479px)', '@media (max-width: 860px)'];

queries.forEach(q => {
    let range = extractMediaRange(q);
    if (range) {
        let content = css.substring(range.innerStart, range.end);
        let newContent = processMediaQuery(content);
        css = css.substring(0, range.innerStart) + newContent + css.substring(range.end);
    }
});

fs.writeFileSync('style.css', css);
console.log('Mobile typography scaled up accurately.');
