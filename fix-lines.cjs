const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove algorithm__line
html = html.replace(/<span id="svg-anim-trigger-wf" class="animated-svg-container-wf algorithm__line">[\s\S]*?<\/span><\/span>/, '</span>');
// Remove faq__line
html = html.replace(/<span id="svg-anim-trigger-faq" class="animated-svg-container-faq faq__line">[\s\S]*?<\/span><\/span>/, '</span>');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
