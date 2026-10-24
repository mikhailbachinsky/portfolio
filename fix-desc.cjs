const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I see ".about__desc__text" in some media query which is probably wrong, but it's not overriding `.about__desc` anyway.
// Wait, the user said: "Наличие высшего юридического образования..." больше, чем "Мой профессиональный метод...", "Опыт и менеджмент" меьше, чем основной текст, который следует после этого.
//
// My previous clamp setup:
// "Мой профессиональный метод..." (.about__method) -> 16px to 20px (Body Large)
// "Опыт и менеджмент" (.about__exp-title) -> 16px to 20px (Body Large)
// "Наличие высшего..." (.about__desc) -> 15px to 16px (Regular Body Text)
//
// So .about__desc SHOULD be smaller than .about__method. Let's make absolutely sure they are correctly applied.
// Let's remove any legacy styles for `.about__desc` that might be overriding.

css = css.replace(/\.about__desc\s*\{[^}]+\}/g, '');
css = css.replace(/\.about__exp-title\s*\{[^}]+\}/g, '');

fs.writeFileSync('style.css', css);
console.log('Fixed legacy desc');
