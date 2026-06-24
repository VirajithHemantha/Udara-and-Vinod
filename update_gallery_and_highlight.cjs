const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// 1. Update Gallery
const galleryImagesOld = `                  {[
                    "/pre/3Z6A3622 copy.jpg.jpeg",
                    "/pre/3Z6A3631 copy.jpg.jpeg",
                    "/pre/3Z6A3690 copy.jpg.jpeg",
                    "/pre/3Z6A3868 copy.jpg.jpeg"
                  ].map((src, idx) => (`;

const galleryImagesNew = `                  {[
                    "/pre/3Z6A3622 copy.jpg.jpeg",
                    "/pre/3Z6A3631 copy.jpg.jpeg",
                    "/pre/3Z6A3690 copy.jpg.jpeg",
                    "/pre/3Z6A3868 copy.jpg.jpeg",
                    "/pre/3Z6A3914 copy.jpg.jpeg",
                    "/pre/3Z6A4139 copy.jpg.jpeg"
                  ].map((src, idx) => (`;

content = content.replace(galleryImagesOld, galleryImagesNew);

content = content.replace(
  'grid grid-cols-1 md:grid-cols-2 gap-8',
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
);

// 2. Add Highlighted Section
const highlightSection = `
            <section className="relative py-24 md:py-32 w-full flex justify-center bg-[#fefcf5]">
              <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12 md:mb-16"
                >
                  <h2 className="text-3xl md:text-5xl text-[#8c6b2b] italic drop-shadow-sm">
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center">
                      <span className="text-[0.6em] md:text-[0.45em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">
                        A Beautiful Journey
                      </span>
                      <span className="leading-none">සුන්දර ගමනක්</span>
                    </span>
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative p-4 md:p-6 bg-white shadow-[0_20px_50px_-10px_rgba(140,107,43,0.15)] border border-[#d4af37]/30 max-w-2xl w-full"
                >
                  <div className="absolute inset-2 border-[0.5px] border-[#d4af37]/40 pointer-events-none" />
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#8c6b2b]" />
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#8c6b2b]" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#8c6b2b]" />
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#8c6b2b]" />
                  
                  <img 
                    src="/pre/Gemini_Generated_Image_s7xpors7xpors7xp (1).png" 
                    alt="Highlighted Moment"
                    className="w-full h-auto object-cover border border-[#8c6b2b]/10"
                  />
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 border border-[#d4af37]/30 shadow-lg text-[#8c6b2b]">
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center">
                      <span className="text-[0.65em] uppercase tracking-[0.3em] font-sans font-bold">Forever</span>
                      <span className="italic">සදාකාලිකයි</span>
                    </span>
                  </div>
                </motion.div>
              </div>
            </section>
`;

const gallerySectionTarget = '<section className="relative py-28 md:py-48 overflow-hidden bg-white">';

// Make sure we only replace the FIRST instance of the gallery section target, which might match the Wishes section too.
// Actually, let's use the full gallery section start.
const gallerySectionStart = `<section className="relative py-28 md:py-48 overflow-hidden bg-white">\n              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">`;

content = content.replace(gallerySectionStart, highlightSection + '\n' + gallerySectionStart);

// Also need to set the HERO image correctly to the ChatGPT image
content = content.replace(
  'const HERO_BACKGROUND_IMAGE = "/pre/Gemini_Generated_Image_s7xpors7xpors7xp.png";',
  'const HERO_BACKGROUND_IMAGE = "/ChatGPT Image May 14, 2026, 03_15_02 PM.png";'
);

fs.writeFileSync('./src/App.tsx', content);
console.log("Gallery, Highlight Section, and Hero Image updated successfully.");
