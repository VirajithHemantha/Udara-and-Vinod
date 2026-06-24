const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

function bCenter(en, si) {
  return `<span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.55em] uppercase tracking-[0.2em] font-sans opacity-70 leading-none mt-1 mb-1">${en}</span><span className="leading-none">${si}</span></span>`;
}

function bLeft(en, si) {
  return `<span className="inline-flex flex-col items-start gap-1"><span className="text-[0.55em] uppercase tracking-[0.2em] font-sans opacity-70 leading-none mt-1 mb-1">${en}</span><span className="leading-none">${si}</span></span>`;
}

const whitespaceReplacements = {
  'විවාහ ආරාධනය': bCenter('Wedding Invitation', 'විවාහ ආරාධනය'),
  'අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.': bCenter('Together with our families, we joyfully invite you to celebrate our special day.', 'අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.'),
  'සහ': bCenter('&', 'සහ'),
  'සමඟ': bCenter('With', 'සමඟ'),
};

Object.entries(whitespaceReplacements).forEach(([key, val]) => {
  // Replace only if it's not already inside a tag we injected, we can look for it surrounded by newlines/spaces
  // Or just replace it safely
  const regex = new RegExp(`>\\s*${key}\\s*<`, 'g');
  content = content.replace(regex, `>${val}<`);
});

// Update couple names in the Hero and Details to be bilingual
// "Malsha" and "Rasika"
content = content.replace(/{INVITATION\.couple\.bride}/g, `{INVITATION.couple.bride} <span className="block text-[0.4em] font-sans uppercase tracking-widest opacity-60 mt-2">Malsha</span>`);
content = content.replace(/{INVITATION\.couple\.groom}/g, `{INVITATION.couple.groom} <span className="block text-[0.4em] font-sans uppercase tracking-widest opacity-60 mt-2">Rasika</span>`);
// Wait, the above will replace {INVITATION.couple.bride} everywhere. In the hero section, it's inside an <h1>. It works well.
// In the intro video screen, it's inside a <p>. The <span block> will put English on the next line.
// But we want English first for consistency!
content = content.replace(/{INVITATION\.couple\.bride} <span className="block text-\[0\.4em\] font-sans uppercase tracking-widest opacity-60 mt-2">Malsha<\/span>/g, `<span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] font-sans uppercase tracking-[0.2em] opacity-70 mb-2 leading-none">Malsha</span><span>{INVITATION.couple.bride}</span></span>`);
content = content.replace(/{INVITATION\.couple\.groom} <span className="block text-\[0\.4em\] font-sans uppercase tracking-widest opacity-60 mt-2">Rasika<\/span>/g, `<span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] font-sans uppercase tracking-[0.2em] opacity-70 mb-2 leading-none">Rasika</span><span>{INVITATION.couple.groom}</span></span>`);

// In Timeline, the INVITATION.time.ceremonyStart isn't translated.
content = content.replace(/{INVITATION\.time\.ceremonyStart}/g, `<span className="inline-flex flex-col items-center"><span className="text-[0.6em] font-sans uppercase opacity-70">04:00 PM</span><span>{INVITATION.time.ceremonyStart}</span></span>`);
content = content.replace(/{INVITATION\.time\.ceremonyEnd}/g, `<span className="inline-flex flex-col items-center"><span className="text-[0.6em] font-sans uppercase opacity-70">09:30 PM</span><span>{INVITATION.time.ceremonyEnd}</span></span>`);

// Update Date in the hero/details: {INVITATION.date.displayLong}
content = content.replace(/{INVITATION\.date\.displayLong}/g, `<span className="inline-flex flex-col items-center"><span className="text-[0.6em] font-sans uppercase opacity-70">13 August 2026</span><span>{INVITATION.date.displayLong}</span></span>`);

// Fix Countdown
content = content.replace(/{ label: "දින", value: days }/g, `{ label: "දින", value: days, en: "DAYS" }`);
content = content.replace(/{ label: "පැය", value: hours }/g, `{ label: "පැය", value: hours, en: "HOURS" }`);
content = content.replace(/{ label: "මිනිත්තු", value: minutes }/g, `{ label: "මිනිත්තු", value: minutes, en: "MINS" }`);
content = content.replace(/{ label: "තත්පර", value: seconds }/g, `{ label: "තත්පර", value: seconds, en: "SECS" }`);

// In countdown render, we need to show stat.en and stat.label
content = content.replace(
  /{stat\.label}/g,
  `<span className="inline-flex flex-col items-center gap-0.5"><span className="text-[0.6em] uppercase opacity-80">{stat.en}</span><span>{stat.label}</span></span>`
);

fs.writeFileSync('./src/App.tsx', content);
console.log("Remaining main things updated.");
