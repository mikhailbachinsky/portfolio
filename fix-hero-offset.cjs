const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const startIndex = css.lastIndexOf('@media (max-width: 639px)');
const graphicsIndex = css.indexOf('.hero__graphics {', startIndex);

if (graphicsIndex !== -1) {
    const transformOld = 'transform: translateX(-50%) !important;';
    const transformNew = 'transform: translateX(calc(-50% + 128px)) !important;';
    
    // Scoped replace within the graphics block
    const blockEnd = css.indexOf('}', graphicsIndex);
    let block = css.substring(graphicsIndex, blockEnd);
    block = block.replace(transformOld, transformNew);
    
    css = css.substring(0, graphicsIndex) + block + css.substring(blockEnd);
    fs.writeFileSync('style.css', css);
    console.log('Offset applied: 128px right.');
} else {
    console.log('Could not find .hero__graphics block.');
}
