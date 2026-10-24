const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const newMobileTilt = `
    if (!canHover) {
       const handleScrollTilt = () => {
         const vh = window.innerHeight;
         cards.forEach(card => {
           const rect = card.getBoundingClientRect();
           const cardCenterY = rect.top + rect.height / 2;
           const percentY = (cardCenterY - vh / 2) / (vh / 2);
           
           if (percentY > -1.5 && percentY < 1.5) {
              const clampedY = Math.max(-1, Math.min(1, percentY));
              const isAboutCard = card.classList.contains('about-card');
              const maxTilt = isAboutCard ? 8 : 6;
              const rotateX = clampedY * maxTilt;
              // Add slight rotateY for 3D feel when scrolling
              const rotateY = clampedY * (maxTilt * -0.5); 
              
              card.style.transform = \`translateY(0px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1)\`;
              
              // Move inner elements slightly
              const cardElems = card.querySelectorAll('.card-elem, .about-card__title');
              cardElems.forEach(elem => {
                 elem.style.transform = \`translateZ(20px)\`;
              });
           }
         });
       };
       window.addEventListener('scroll', handleScrollTilt, { passive: true });
       window.addEventListener('resize', handleScrollTilt, { passive: true });
       handleScrollTilt();
       return;
    }
`;

js = js.replace(/if \(!canHover\) return;/g, newMobileTilt);
fs.writeFileSync('script.js', js);
console.log('Mobile tilt added');
