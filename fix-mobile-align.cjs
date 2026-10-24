const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
/(\.contacts__detail-item\s*\{\s*font-size:\s*14px;\s*line-height:\s*21px;\s*flex-direction:\s*column;\s*gap:\s*2px;)(\s*\})/,
'$1\n    align-items: flex-start;$2'
);

fs.writeFileSync('style.css', css);
console.log('Fixed mobile align');
