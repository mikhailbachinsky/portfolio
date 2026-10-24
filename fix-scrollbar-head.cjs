const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const newArc = `
      // Head
      ctx.beginPath();
      ctx.arc(x, trail[0].y + thumbHeight / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(115, 111, 141, 0.55)\`;
      ctx.fill();

      // Tail Path
      ctx.beginPath();
      ctx.moveTo(leftPts[0].x, leftPts[0].y);
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        ctx.lineTo(leftPts[i].x, leftPts[i].y);
      }
      // rounded tail tip
      ctx.arc(x, trail[TRAIL_LENGTH - 1].y + thumbHeight / 2, 1.5, Math.PI, 0, true);
      for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
        ctx.lineTo(rightPts[i].x, rightPts[i].y);
      }
      ctx.closePath();
      ctx.fill();
`;

js = js.replace(/ctx\.arc\(x, trail\[0\]\.y \+ thumbHeight \/ 2, 6, 0, Math\.PI, true\);\s*ctx\.closePath\(\);\s*ctx\.fillStyle = `rgba\(115, 111, 141, 0\.55\)`;\s*ctx\.fill\(\);/, newArc.trim());

fs.writeFileSync('script.js', js);
console.log('Mobile scrollbar head fixed');
