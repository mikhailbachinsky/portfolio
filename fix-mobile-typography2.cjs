const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/(\.hero__name\s*\{[^}]*?font-size:\s*)40px(\s*!important;)/, '$144px$2');
css = css.replace(/(\.hero__role\s*\{[^}]*?font-size:\s*)16px(\s*!important;)/, '$120px$2');
css = css.replace(/(\.hero__description\s*\{[^}]*?font-size:\s*)14px(\s*!important;)/, '$116px$2');
css = css.replace(/(\.hero__buttons\s+\.btn\s*\{[^}]*?font-size:\s*)14px(\s*!important;)/, '$116px$2');

fs.writeFileSync('style.css', css);
console.log('Mobile typography updated');
