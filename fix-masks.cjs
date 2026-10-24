const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The regex replaced `<g mask="url(#...)">` with `<g>`.
// Fortunately, the structure is usually:
// <mask id="XYZ" ...> ... </mask> <g>
// We can find <mask id="XYZ" and replace the next <g> with <g mask="url(#XYZ)">

let newHtml = '';
let searchIdx = 0;

while (true) {
    let maskIdx = html.indexOf('<mask id="', searchIdx);
    if (maskIdx === -1) break;
    
    let idStart = maskIdx + 10;
    let idEnd = html.indexOf('"', idStart);
    let maskId = html.substring(idStart, idEnd);
    
    let maskEnd = html.indexOf('</mask>', idEnd);
    if (maskEnd === -1) break;
    
    let nextG = html.indexOf('<g>', maskEnd);
    let nextMask = html.indexOf('<mask id="', maskEnd);
    
    // If the next <g> comes before the next mask, it's the one we need to fix
    if (nextG !== -1 && (nextMask === -1 || nextG < nextMask)) {
        html = html.substring(0, nextG) + `<g mask="url(#${maskId})">` + html.substring(nextG + 3);
    }
    
    searchIdx = maskEnd + 7;
}

fs.writeFileSync('index.html', html);
console.log('Restored masks');
