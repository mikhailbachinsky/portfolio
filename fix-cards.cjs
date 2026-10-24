const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Inside mobile queries, height: 280px for .project-card
css = css.replace(/(\.project-card\s*\{[\s\S]*?height:\s*)280px(;)/g, '$1320px$2');

// Inside mobile queries, project-card__title is 20px, let's make it 24px
css = css.replace(/(\.project-card__title\s*\{[\s\S]*?font-size:\s*)20px;/g, '$124px;');
css = css.replace(/(\.project-card__title\s*\{[\s\S]*?line-height:\s*)26px;/g, '$130px;');

fs.writeFileSync('style.css', css);
console.log('Project cards fixed');
