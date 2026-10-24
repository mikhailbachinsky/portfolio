const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// I will look for standard selectors inside media queries (or generally) that correspond to mobile and increase their font-size and line-height.

/*
Looking at the design system:
Micro-text: 12px -> maybe 14px on mobile if it's too small? Actually, 14px is better.
Secondary: 14px -> 16px
Base text: 16px -> 18px
Lead text: 18px -> 20px
Headings: 24px -> 28px, 32px -> 36px, 48px -> 56px.
Wait, the user said everything looks tiny.
Let's make sure the base font size is large enough.

Instead of parsing CSS manually, I can replace font sizes within @media (max-width: 639px) and @media (max-width: 479px) and @media (max-width: 979px).
But it's safer to target specific classes. Let's dump all font-size declarations in the file with their context.
*/

// Let's just create a function to bump all font-sizes in mobile queries.
let result = css.replace(/(@media\s*\(max-width:\s*(?:639px|479px|979px)\)\s*\{)([\s\S]*?)(\n\s*@media|\Z)/g, (match, prefix, content, suffix) => {
  let newContent = content.replace(/font-size:\s*(\d+)px;/g, (m, sizeStr) => {
    let size = parseInt(sizeStr);
    let newSize = size;
    if (size === 12) newSize = 14;
    else if (size === 14) newSize = 16;
    else if (size === 16) newSize = 18;
    else if (size === 18) newSize = 20;
    else if (size === 20) newSize = 24; // If there are any
    else if (size === 22) newSize = 24;
    else if (size === 24) newSize = 28;
    else if (size === 32) newSize = 36;
    else if (size === 48) newSize = 56;
    
    return `font-size: ${newSize}px;`;
  });
  return prefix + newContent + suffix;
});

// Since media queries might be nested incorrectly by my regex, let's do a more robust parsing.
