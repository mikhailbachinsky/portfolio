const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const regex479 = /@media\s*\(max-width:\s*479px\)\s*\{([\s\S]*?)\}(?=\s*@media|\s*$)/;
const match479 = css.match(regex479);
if (match479) {
  let sizes = match479[0].match(/font-size:\s*\d+px;/g);
  console.log(sizes.join('\n'));
}
