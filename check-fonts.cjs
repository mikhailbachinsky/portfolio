const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');

const regex = /([^{}]+)\{([^{}]*font-size[^{}]*)\}/g;
let match;
while ((match = regex.exec(css)) !== null) {
  const selector = match[1].trim();
  const body = match[2].trim();
  if (selector.includes('project-card__title') || selector.includes('hero__name') || selector.includes('about__title')) {
    console.log(selector.replace(/\n/g, ' '));
  }
}
