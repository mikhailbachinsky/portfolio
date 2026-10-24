const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Update dimensions and position for .contacts__line to match the new 850x155 SVG
// Current: width: 847px; height: 151px; top: -101px; left: calc(100% - 4px);
// Let's position it to come out of the 'ы'. 
// We will set: top: -140px; left: calc(100% - 20px); width: 850px; height: 155px;
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?left:\s*)calc\(100% - 4px\);/, '$1calc(100% - 20px);');
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?top:\s*)-101px;/, '$1-140px;');
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?width:\s*)847px;/, '$1850px;');
css = css.replace(/(\.contacts__line\s*\{[\s\S]*?height:\s*)151px;/, '$1155px;');

fs.writeFileSync('style.css', css);
console.log('Fixed contacts animation');
