const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. .about__subtitles gap: 8px -> 12px (in the 639px media query)
css = css.replace(/(\.about__subtitles\s*\{\s*gap:\s*)8px(;\s*\})/, '$112px$2');

// 2. .about__text gap: 16px -> 20px
css = css.replace(/(\.about__text\s*\{\s*gap:\s*)16px(;\s*\})/, '$120px$2');

// 3. .about__experience gap: 4px -> 16px
css = css.replace(/(\.about__experience\s*\{\s*gap:\s*)4px(;\s*\})/, '$116px$2');

// 4. .about__exp-list gap: 8px -> 12px
css = css.replace(/(\.about__exp-list\s*\{\s*gap:\s*)8px(;\s*\})/, '$112px$2');

// 5. Fix link
const oldLink = /\.about-card__link\s*\{\s*top:\s*30%;\s*right:\s*26%;\s*font-size:\s*20px;\s*line-height:\s*1\.13;\s*\}/;
const newLink = `.about-card__link {
    top: 30%;
    right: 26%;
    margin-top: -7px;
    font-size: 17px !important;
    font-weight: 500 !important;
    line-height: 1.4 !important;
  }`;
css = css.replace(oldLink, newLink);

fs.writeFileSync('style.css', css);
console.log('Fixed mobile gaps and link');
