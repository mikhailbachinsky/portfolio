const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldText = 'Визуальная упаковка в&nbsp;социальных сетях:<br>от&nbsp;стратегии до&nbsp;реализации';
const newText = 'Визуальная упаковка в&nbsp;социальных<br>сетях: от&nbsp;стратегии до&nbsp;реализации';

if (html.includes(oldText)) {
  html = html.replace(oldText, newText);
  fs.writeFileSync('index.html', html);
  console.log('HTML updated successfully.');
} else {
  console.log('Could not find the exact text string in index.html.');
}
