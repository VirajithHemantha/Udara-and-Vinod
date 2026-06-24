const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Replace INVITATION object
content = content.replace(/const INVITATION = {[\s\S]*?} as const;/, `const INVITATION = {
  couple: {
    bride: "මල්ෂා",
    groom: "රසික",
    brideFull: "පීරිස්ගේ මල්ෂා මධුවන්ති",
    groomFull: "එච්. කේ. ජී. රසික නුවන් රාජපක්ෂ",
  },
  date: {
    displayNumeric: "13 . 08 . 2026",
    displayLong: "13 අගෝස්තු 2026",
    countdownTarget: "2026-08-13T16:00:00+05:30",
  },
  time: {
    ceremonyStart: "ප.ව. 04:00",
    ceremonyEnd: "ප.ව. 09:30",
    registration: "ප.ව. 04:00",
    welcome: "ප.ව. 04:00",
  },
  venue: {
    name: "Senuri Grand Castello",
    city: "Divulapitiya",
    mapQuery: "Senuri Grand Castello, Divulapitiya",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Senuri+Grand+Castello+Divulapitiya",
  },
  rsvpContacts: ["රසික: 071-XXXXXXX", "මල්ෂා: 071-XXXXXXX"],
} as const;`);

// Replace background music
content = content.replace(/const backgroundMusic = "[^"]+";/, `const backgroundMusic = "/Thawtisa Lowen.mp3";`);

// Replace parents text for bride
content = content.replace('වසන්ත විජේසිරි මැතිතුමාගේ සහ එම මැතිනියගේ ආදරණීය දියණිය', 'පී. සමන්ත මැතිතුමාගේ සහ ඊ. පුෂ්පලතා මැතිනියගේ ආදරණීය දියණිය');

// Replace parents text for groom
content = content.replace('ගාමිණී රත්නසිරි මැතිතුමාගේ සහ එම මැතිනියගේ ආදරණීය පුතණුවන්', 'එච්. කේ. ජී. නිමල් රාජපක්ෂ මැතිතුමාගේ සහ ඒ. ජී. ආරියවතී මැතිනියගේ ආදරණීය පුතණුවන්');

// Add gallery section before Wishes section (which starts with id="wishes" or is WISHES_BACKGROUND_IMAGE)
const gallerySection = \`
            <section className="relative py-28 md:py-48 overflow-hidden bg-white">
              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-20"
                >
                  <h2 className="text-4xl md:text-6xl text-[#0369a1] drop-shadow-sm italic">
                    අපගේ මතකයන්
                  </h2>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    "/images/1 (1).jpg",
                    "/images/1 (2).jpg",
                    "/images/1 (3).jpg",
                    "/images/1 (4).jpg"
                  ].map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                    >
                      <img src={src} alt="Couple" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
\`;

content = content.replace(/<section className="relative py-28 md:py-48 overflow-hidden bg-white">\\s*<div\\s*className="absolute inset-0 bg-center bg-cover"\\s*style={{ backgroundImage: \`url\\("\\\${encodeURI\\(WISHES_BACKGROUND_IMAGE\\)}\\"\\)\` }}/, 
  gallerySection + '\\n            <section className="relative py-28 md:py-48 overflow-hidden bg-white">\\n              <div\\n                className="absolute inset-0 bg-center bg-cover"\\n                style={{ backgroundImage: `url("${encodeURI(WISHES_BACKGROUND_IMAGE)}")` }}');

fs.writeFileSync('./src/App.tsx', content);
console.log("Updated App.tsx");
