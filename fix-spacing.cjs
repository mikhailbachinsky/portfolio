const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// The mapping of weird values to standard 4/8-point grid values
const spacingMap = {
  // negatives
  '-3': '-4',
  '-6': '-8',
  '-10': '-12',
  
  // positives
  '3': '4',
  '5': '4',
  '6': '8',
  '7': '8',
  '9': '8',
  '10': '12',
  '11': '12',
  '14': '16',
  '15': '16',
  '18': '20',
  '22': '24',
  '26': '24',
  '28': '32',
  '34': '32',
  '36': '40',
  '38': '40',
  '50': '48',
  '56': '64',
  '60': '64',
  '68': '64',
  '76': '80',
  '85': '80',
  '100': '96',
  '140': '128'
};

// We only want to replace within gap, padding*, margin* properties
const propertyRegex = /((?:margin|padding|gap|row-gap|column-gap)[a-z-]*:\s*)([^;}]+)(;|\})/g;

css = css.replace(propertyRegex, (match, prefix, value, suffix) => {
  // If it's a calc or var, try not to mess with it too blindly, though we could replace px in them too.
  // Actually, just replace whole numbers followed by 'px' in the value.
  let newValue = value.replace(/(^|\s|-)(\d+)px/g, (m, space, num) => {
    let key = (space === '-' ? '-' : '') + num;
    let spaceChar = space === '-' ? '-' : space;
    if (spacingMap[key]) {
      // If the map changes sign, we need to handle it properly, 
      // but spacingMap keys include the '-' so if key is '-10', map is '-12'.
      // If we matched '-10px' -> space='-', num='10', key='-10'. spacingMap['-10'] is '-12'.
      // We should return just the replaced value with the preceding space (if space was ' ', it's in space. If it was '-', it's in key).
      if (space === '-') {
        return spacingMap[key] + 'px';
      } else {
        return space + spacingMap[key] + 'px';
      }
    }
    return m; // unchanged
  });
  
  return prefix + newValue + suffix;
});

fs.writeFileSync('style.css', css);
console.log('Spacing normalized');
