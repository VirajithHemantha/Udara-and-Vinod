const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Hero section height and padding
content = content.replace(
  'className="w-full relative flex items-start justify-center overflow-hidden bg-white min-h-[85vh] pt-20 md:pt-32"',
  'className="w-full relative flex items-start justify-center overflow-hidden bg-white min-h-[100svh] pt-12 md:pt-32 pb-12"'
);

// Reduce top margins and spacing
content = content.replace(
  'transition={{ delay: 0.15, duration: 0.8 }}\n                  className="mt-10"',
  'transition={{ delay: 0.15, duration: 0.8 }}\n                  className="mt-6 md:mt-10"'
);

// Gap between bride and groom
content = content.replace(
  'className="mt-6 flex items-center justify-center gap-5"',
  'className="mt-4 md:mt-6 flex items-center justify-center gap-3 md:gap-5"'
);

// Groom margin
content = content.replace(
  'className="mt-6 text-6xl sm:text-7xl',
  'className="mt-4 md:mt-6 text-6xl sm:text-7xl'
);

// Details container margin and spacing
content = content.replace(
  'transition={{ delay: 0.35, duration: 0.8 }}\n                  className="mt-12 space-y-5"',
  'transition={{ delay: 0.35, duration: 0.8 }}\n                  className="mt-8 md:mt-12 space-y-3 md:space-y-5"'
);

// Button margin
content = content.replace(
  'gap-2 mt-6 px-8 py-4',
  'gap-2 mt-4 md:mt-6 px-6 py-3 md:px-8 md:py-4'
);

// We can also reduce the font size of the main names slightly in mobile if needed, but it might be fine now.
// Let's reduce the hero title slightly to avoid wrapping and taking too much vertical space.
// `text-6xl sm:text-7xl md:text-8xl` -> `text-5xl sm:text-7xl md:text-8xl`
content = content.replace(/text-6xl sm:text-7xl md:text-8xl/g, 'text-[3.25rem] leading-none sm:text-7xl md:text-8xl');

fs.writeFileSync('./src/App.tsx', content);
console.log("Hero section mobile height adjusted.");
