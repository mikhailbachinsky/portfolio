const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Change .contacts__details on desktop
css = css.replace(
/\.contacts__details\s*\{\s*display:\s*flex;\s*align-items:\s*flex-start;\s*gap:\s*40px;\s*flex-wrap:\s*wrap;\s*\}/,
'.contacts__details {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n}'
);

// Add align-items: center to .contacts__detail-item
css = css.replace(
/\.contacts__detail-item\s*\{\s*font-family:\s*var\(--font-text\);\s*font-size:\s*18px;\s*font-weight:\s*400;\s*line-height:\s*28\.8px;\s*display:\s*inline-flex;\s*gap:\s*6px;\s*\}/,
'.contacts__detail-item {\n  font-family: var(--font-text);\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 28.8px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}'
);

fs.writeFileSync('style.css', css);
console.log('Fixed spacing');
