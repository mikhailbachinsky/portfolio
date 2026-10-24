const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Move .hero__description from BODY LARGE to REGULAR BODY TEXT
css = css.replace(
  /\/\* 1\.5\. BODY LARGE \(Requested uniform style\) \*\/\n\.hero__role,\n\.hero__description,/,
  "/* 1.5. BODY LARGE (Requested uniform style) */\n.hero__role,"
);

css = css.replace(
  /\/\* 7\. REGULAR BODY TEXT \*\/\n\.project-card__text/,
  "/* 7. REGULAR BODY TEXT */\n.hero__description, .project-card__text"
);

// 2. Fix Mobile Spacing
// .hero__content gap: 16px -> 20px
css = css.replace(
  /(\.hero__content\s*\{[^}]*gap:\s*)16px(\s*!important;[^}]*\})/,
  "$120px$2"
);

// .hero__titles gap: 6px -> 12px
css = css.replace(
  /(\.hero__titles\s*\{[^}]*gap:\s*)6px(\s*!important;[^}]*\})/,
  "$112px$2"
);

// .hero__buttons gap: 8px -> 12px
css = css.replace(
  /(\.hero__buttons\s*\{[^}]*gap:\s*)8px(\s*!important;[^}]*\})/,
  "$112px$2"
);

fs.writeFileSync('style.css', css);
console.log('Mobile hero spacing and typography updated.');
