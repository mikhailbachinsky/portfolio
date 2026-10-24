const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

function processQuery(maxWidth) {
  let startIndex = css.indexOf(`@media (max-width: ${maxWidth}px)`);
  if (startIndex === -1) return;
  
  let braceCount = 0;
  let inQuery = false;
  let endIndex = -1;
  
  for (let i = startIndex; i < css.length; i++) {
    if (css[i] === '{') {
      braceCount++;
      inQuery = true;
    } else if (css[i] === '}') {
      braceCount--;
      if (inQuery && braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex !== -1) {
    let block = css.substring(startIndex, endIndex + 1);
    let newBlock = block.replace(/font-size:\s*12px;/g, 'font-size: 14px;');
    newBlock = newBlock.replace(/font-size:\s*14px;/g, 'font-size: 16px;');
    // let's also upgrade 16px to 18px for body text? No, 16px is fine for body.
    
    // We also want to scale line-heights if they are fixed, but most are relative (e.g. 1.4).
    // Let's also check buttons that might still be 14px.
    
    css = css.substring(0, startIndex) + newBlock + css.substring(endIndex + 1);
  }
}

processQuery(639);
processQuery(479);

// Fix form inputs in base CSS to be 16px so Safari doesn't zoom
css = css.replace(/(\.contacts-form__input,\s*\.contacts-form__textarea\s*\{[\s\S]*?font-size:\s*)14px;/g, '$116px;');
css = css.replace(/(\.contacts-form__submit\s*\{[\s\S]*?font-size:\s*)14px;/g, '$116px;');

fs.writeFileSync('style.css', css);
console.log('Fonts upgraded');
