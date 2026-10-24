const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// I need to adjust projects__line: 
// We are at: left: calc(100% - 10px); bottom: -3px;
// We need to move left: calc(100% - 10px) to left: calc(100% - 10px);
// wait, the previous instructions were: "Росчерк "art" поднять вверх на 1 пиксель и сместить вправо на 2 пикселя"
// So it was: left: calc(100% - 12px); bottom: -4px;
// Up 1px = bottom: -3px; 
// Right 2px = left: calc(100% - 10px); 
// Which I DID!
// "Росчерк в секции Компетенции и стек сдвинуть влево на 2 пикселя"
// It was left: calc(100% + 2px);
// Left 2px = left: 100%;
// Which I DID!

// So the only thing broken was Contacts.
