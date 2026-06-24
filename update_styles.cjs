const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Replace font sizes
// 0.55em -> larger on mobile, same on md
content = content.replace(/text-\[0\.55em\]/g, 'text-[0.75em] md:text-[0.6em]');

// 0.4em -> used for couple names
content = content.replace(/text-\[0\.4em\]/g, 'text-[0.6em] md:text-[0.45em]');

// 0.45em -> used for "Save the date"
content = content.replace(/text-\[0\.45em\]/g, 'text-[0.65em] md:text-[0.5em]');

// 0.6em -> used for date / time
content = content.replace(/text-\[0\.6em\]/g, 'text-[0.8em] md:text-[0.65em]');

// Replace opacities specifically within our font-sans classes
// "font-sans opacity-70"
content = content.replace(/font-sans opacity-70/g, 'font-sans opacity-100');

// "font-sans uppercase opacity-70"
content = content.replace(/font-sans uppercase opacity-70/g, 'font-sans uppercase opacity-100');

// "font-sans uppercase tracking-[0.2em] opacity-70"
content = content.replace(/font-sans uppercase tracking-\[0\.2em\] opacity-70/g, 'font-sans uppercase tracking-[0.2em] opacity-100');

// "font-sans uppercase tracking-widest opacity-80"
content = content.replace(/font-sans uppercase tracking-widest opacity-80/g, 'font-sans uppercase tracking-widest opacity-100');

// Just in case we missed any other 'font-sans' with opacity 70 or 80
content = content.replace(/opacity-70 mb-2/g, 'opacity-100 mb-2');
content = content.replace(/opacity-70 leading-none/g, 'opacity-100 leading-none');
content = content.replace(/opacity-80 mb-2/g, 'opacity-100 mb-2');

// Update countdown labels (DAYS, HOURS, MINS, SECS) opacities as well
// <span className="text-[0.6em] uppercase opacity-80">
content = content.replace(/text-\[0\.6em\] uppercase opacity-80/g, 'text-[0.8em] md:text-[0.65em] uppercase opacity-100 font-bold');

fs.writeFileSync('./src/App.tsx', content);
console.log("Styles updated for premium bilingual text.");
