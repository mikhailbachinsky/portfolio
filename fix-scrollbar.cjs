const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const newDraw = `
    function draw() {
      if (window.innerWidth >= 980) {
        requestAnimationFrame(draw);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isVisible) {
        requestAnimationFrame(draw);
        return;
      }

      // Smoothly move head towards target
      trail[0].y += (targetY - trail[0].y) * 0.4;
      
      let totalDist = 0;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];
        const dy = prev.y - curr.y;
        totalDist += Math.abs(dy);
        curr.y += dy * 0.45; // Spring factor
      }
      
      // Calculate smooth comet outline
      const leftPts = [];
      const rightPts = [];
      const x = 12; // center x
      
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const progress = 1 - (i / (TRAIL_LENGTH - 1));
        const easeProgress = Math.pow(progress, 3); // cubic tapering
        // width tapers from ~6 down to 1
        const width = 1.5 + 4.5 * easeProgress;
        
        // Head includes thumbHeight (comet's head is elongated)
        // Wait, if we just offset Y by thumbHeight/2, it acts as a center.
        // Let's just use trail[i].y + thumbHeight / 2 as the center of the trail.
        const ty = trail[i].y + thumbHeight / 2;
        
        leftPts.push({ x: x - width, y: ty });
        rightPts.push({ x: x + width, y: ty });
      }
      
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
      // rounded head tip
      ctx.arc(x, trail[0].y + thumbHeight / 2, 6, 0, Math.PI, true);
      ctx.closePath();
      
      ctx.fillStyle = \`rgba(115, 111, 141, 0.55)\`;
      ctx.fill();
      
      requestAnimationFrame(draw);
    }
`;

js = js.replace(/function draw\(\) \{[\s\S]*?requestAnimationFrame\(draw\);\s*\}/, newDraw.trim());

fs.writeFileSync('script.js', js);
console.log('Mobile scrollbar fixed');
