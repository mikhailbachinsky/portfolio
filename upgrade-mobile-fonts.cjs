const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// We will find all @media (max-width: 479px) and @media (max-width: 639px) 
// and replace 12px -> 14px, 14px -> 16px.
function replaceSizes(block) {
  let newBlock = block.replace(/font-size:\s*12px;/g, 'font-size: 14px;');
  newBlock = newBlock.replace(/font-size:\s*14px;/g, 'font-size: 16px;');
  return newBlock;
}

const regex479 = /(@media\s*\(max-width:\s*479px\)\s*\{)([\s\S]*?)(\}(?=\s*@media|\s*$))/;
const regex639 = /(@media\s*\(max-width:\s*639px\)\s*\{)([\s\S]*?)(\}(?=\s*@media|\s*$))/;
// Wait, the regex needs to properly match the closing brace of the media query.
// This regex might fail if there are nested braces or if it's the last one.
// Let's use a simpler replace on the whole text if it's safe, but 12px/14px might be used in Desktop!
