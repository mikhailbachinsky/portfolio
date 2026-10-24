const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.about__exp-title')) {
  console.log('MISSING about__exp-title!');
}
