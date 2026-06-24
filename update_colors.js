const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Replace blue colors with gold colors
// #0369a1 -> #8c6b2b (Darker gold)
// #0284c7 -> #d4af37 (Gold)
// #bae6fd -> #fef08a (Light gold)
// #38bdf8 -> #fde047 (Yellow gold)
// #7dd3fc -> #fef08a (Light gold)

content = content.replace(/#0369a1/g, '#8c6b2b');
content = content.replace(/#0284c7/g, '#d4af37');
content = content.replace(/#bae6fd/g, '#fef08a');
content = content.replace(/#38bdf8/g, '#fde047');
content = content.replace(/#7dd3fc/g, '#fef08a');

// Change hover states in some cases if needed, but hex codes are direct
fs.writeFileSync('./src/App.tsx', content);
console.log("Updated Colors in App.tsx");
