const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// The bloated font classes for names
const bloatedClasses = 'text-[0.8em] md:text-[0.65em] md:text-[0.65em] md:text-[0.5em]';
const cleanClasses = 'text-[0.4em] md:text-[0.35em]';

// Replace all occurrences of the bloated class string with the clean, smaller class string
content = content.replace(new RegExp(bloatedClasses.replace(/[.*+?^$\{()|[\]\\]/g, '\\$&'), 'g'), cleanClasses);

fs.writeFileSync('./src/App.tsx', content);
console.log("English name font sizes reduced and cleaned up.");
