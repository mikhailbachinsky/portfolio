const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// We need to remove the scale on .about-card__more-line completely during hover
// and make sure .about__line doesn't jump.
css = css.replace(/(\.about-card--more:hover\s*\{\s*)transform:\s*none;(\s*\})/, '$1transform: none !important;$2');
css = css.replace(/(\.about-card__more-line\s*\{\s*[\s\S]*?transform:\s*)none !important;/, '$1none !important;'); // Already there

// Ensure .about__line is completely static on hover
// There's no specific hover for .about__line but just in case:
css += `\n.about-card--more:hover .about__line { transform: none !important; }\n`;

fs.writeFileSync('style.css', css);
console.log('Fixed hover anim');
