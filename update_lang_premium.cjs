const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

function bCenter(en, si) {
  return `<span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.55em] uppercase tracking-[0.2em] font-sans opacity-70 leading-none mt-1 mb-1">${en}</span><span className="leading-none">${si}</span></span>`;
}

function bLeft(en, si) {
  return `<span className="inline-flex flex-col items-start gap-1"><span className="text-[0.55em] uppercase tracking-[0.2em] font-sans opacity-70 leading-none mt-1 mb-1">${en}</span><span className="leading-none">${si}</span></span>`;
}

const replacements = {
  // Hero
  'විවාහ මංගල්‍යය': bCenter('Wedding Ceremony', 'විවාහ මංගල්‍යය'),
  '>ආරාධනය විවෘත කරන්න<': `>${bCenter('Open Invitation', 'ආරාධනය විවෘත කරන්න')}<`,
  '>ආරම්භ කිරීමට ක්ලික් කරන්න<': `>${bCenter('Click to Start', 'ආරම්භ කිරීමට ක්ලික් කරන්න')}<`,
  '>විවාහ ආරාධනය<': `>${bCenter('Wedding Invitation', 'විවාහ ආරාධනය')}<`,
  '>ආරාධනයට පිවිසෙන්න<': `>${bCenter('Enter Invitation', 'ආරාධනයට පිවිසෙන්න')}<`,
  '>වසා දමන්න<': `>${bCenter('Close', 'වසා දමන්න')}<`,

  // Details
  '>අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.<': `>${bCenter('Together with our families, we joyfully invite you to celebrate our special day.', 'අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.')}<`,
  'විස්තර බලන්න': bCenter('See Details', 'විස්තර බලන්න'),
  '>පවුල් දෙකක් ආදරයෙන් එක්වන මොහොතක්<': `>${bCenter('Two Families Uniting with Love', 'පවුල් දෙකක් ආදරයෙන් එක්වන මොහොතක්')}<`,
  '>පී. සමන්ත මැතිතුමාගේ සහ ඊ. පුෂ්පලතා මැතිනියගේ ආදරණීය දියණිය<': `>${bCenter('Loving daughter of Mr. P. Samantha & Mrs. E. Pushpalatha', 'පී. සමන්ත මැතිතුමාගේ සහ ඊ. පුෂ්පලතා මැතිනියගේ ආදරණීය දියණිය')}<`,
  '>එච්. කේ. ජී. නිමල් රාජපක්ෂ මැතිතුමාගේ සහ ඒ. ජී. ආරියවතී මැතිනියගේ ආදරණීය පුතණුවන්<': `>${bCenter('Loving son of Mr. H. K. G Nimal Rajapaksha & Mrs. A. G Ariyawathi', 'එච්. කේ. ජී. නිමල් රාජපක්ෂ මැතිතුමාගේ සහ ඒ. ජී. ආරියවතී මැතිනියගේ ආදරණීය පුතණුවන්')}<`,
  '>අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන්<': `>${bCenter('We warmly invite you to join the celebration of our union', 'අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන්')}<`,
  '>ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවණීය ඇරයූමයි!<': `>${bCenter('You are cordially invited!', 'ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවණීය ඇරයූමයි!')}<`,
  '>විවාහ උත්සවය<': `>${bCenter('Wedding Ceremony', 'විවාහ උත්සවය')}<`,

  // Timeline / Icons
  '>දිනය<': `>${bLeft('Date', 'දිනය')}<`,
  '>වේලාව<': `>${bLeft('Time', 'වේලාව')}<`,
  '>ස්ථානය<': `>${bLeft('Location', 'ස්ථානය')}<`,
  // >පෝරු උත්සවය< appears in some places. Wait, the array uses ["පෝරු උත්සවය", INVITATION.time.ceremonyStart]
  // We can't replace the array string with JSX directly without changing the map render.
  // Wait, let's look at App.tsx map for timeline: `{[["පෝරු උත්සවය", INVITATION.time.ceremonyStart], ["උත්සවය අවසානය", INVITATION.time.ceremonyEnd]].map(([title, time])`
  // We can change `title` to `[title_en, title_si]`
};

Object.entries(replacements).forEach(([key, val]) => {
  content = content.replace(new RegExp(key, 'g'), val);
});

// For timeline map:
content = content.replace(
  /\["පෝරු උත්සවය", INVITATION\.time\.ceremonyStart\],\s*\["උත්සවය අවසානය", INVITATION\.time\.ceremonyEnd\]/,
  `[${bLeft('Poruwa Ceremony', 'පෝරු උත්සවය')}, INVITATION.time.ceremonyStart], [${bLeft('End of Ceremony', 'උත්සවය අවසානය')}, INVITATION.time.ceremonyEnd]`
);
// Wait, the map parameter expects strings if it is typed, but JSX is fine in a React map if not typed strongly or if typed as ReactNode. Let's wrap it in <>:
content = content.replace(
  /\["පෝරු උත්සවය", INVITATION\.time\.ceremonyStart\],\s*\["උත්සවය අවසානය", INVITATION\.time\.ceremonyEnd\]/,
  `[<>` + bLeft('Poruwa Ceremony', 'පෝරු උත්සවය') + `</>, INVITATION.time.ceremonyStart], [<>` + bLeft('End of Ceremony', 'උත්සවය අවසානය') + `</>, INVITATION.time.ceremonyEnd]`
);

// Timeline headers
content = content.replace('>දවසේ වැඩසටහන<', `>${bCenter('Order of Events', 'දවසේ වැඩසටහන')}<`);
content = content.replace('>කාලසටහන<', `>${bCenter('Timeline', 'කාලසටහන')}<`);
content = content.replace('ඔබ සමඟ බෙදා ගැනීමට බලා සිටින අපගේ විශේෂ දිනයේ සරල වැඩසටහන.', bCenter('A simple schedule of our special day that we look forward to sharing with you.', 'ඔබ සමඟ බෙදා ගැනීමට බලා සිටින අපගේ විශේෂ දිනයේ සරල වැඩසටහන.'));

// Save the Date
// "සදාකාලික" is in a big text background text-[18vw]. Let's leave it as Sinhala only because it's a watermark.
// "මෙම දිනය <span ...>සුරකින්න</span>"
content = content.replace(
  /මෙම දිනය <span className="mx-2 md:mx-4 text-\[#fef08a\]">සුරකින්න<\/span>/g,
  `<span className="inline-flex flex-col items-center"><span className="text-[0.45em] uppercase font-sans tracking-widest opacity-80 mb-2">Save the Date</span><span>මෙම දිනය <span className="mx-2 md:mx-4 text-[#fef08a]">සුරකින්න</span></span></span>`
);
content = content.replace('>ආදරයෙන් පිරුණු මොහොතකට රැඳී සිටින්න<', `>${bCenter('Stay tuned for a moment full of love', 'ආදරයෙන් පිරුණු මොහොතකට රැඳී සිටින්න')}<`);

// Venue
content = content.replace('>උත්සව ස්ථානය<', `>${bCenter('Venue', 'උත්සව ස්ථානය')}<`);
content = content.replace('>සම්ප්‍රදාය, අලංකාරය සහ නව ඇරඹුමක සුන්දරත්වය එක්වන තැන<', `>${bCenter('Where tradition, elegance, and the beauty of a new beginning unite', 'සම්ප්‍රදාය, අලංකාරය සහ නව ඇරඹුමක සුන්දරත්වය එක්වන තැන')}<`);
content = content.replace('>“අපගේ ආදර කතාවේ අලංකාරම පරිච්ඡේදය ඔබ සමඟ සැමරීමට අප සතුටින් බලා සිටිමු.”<', `>${bLeft('“We look forward to celebrating the most beautiful chapter of our love story with you.”', '“අපගේ ආදර කතාවේ අලංකාරම පරිච්ඡේදය ඔබ සමඟ සැමරීමට අප සතුටින් බලා සිටිමු.”')}<`);
content = content.replace('>ගමනාන්තය<', `>${bLeft('Destination', 'ගමනාන්තය')}<`);
content = content.replace('>සිතියම විවෘත කරන්න<', `>${bCenter('Open Map', 'සිතියම විවෘත කරන්න')}<`);
content = content.replace('>බලන්න<', `>${bCenter('View', 'බලන්න')}<`);

// Gallery
content = content.replace('>අපගේ මතකයන්<', `>${bCenter('Our Memories', 'අපගේ මතකයන්')}<`);

// RSVP
content = content.replace('>පැමිණීම තහවුරු කිරීම<', `>${bCenter('RSVP', 'පැමිණීම තහවුරු කිරීම')}<`);
content = content.replace('>ඔබ පැමිණෙන්නේද?<', `>${bCenter('Will You Attend?', 'ඔබ පැමිණෙන්නේද?')}<`);
content = content.replace('>ඔබගේ නම<', `>${bLeft('Your Name', 'ඔබගේ නම')}<`);
content = content.replace('placeholder="ඔබගේ නම මෙහි ලියන්න..."', 'placeholder="Your Name / ඔබගේ නම මෙහි ලියන්න..."');
content = content.replace('>අපගේ විශේෂ දිනයට ඔබ පැමිණෙන්නේද?<', `>${bLeft('Will you be attending our special day?', 'අපගේ විශේෂ දිනයට ඔබ පැමිණෙන්නේද?')}<`);
content = content.replace('>ඔව්, මම ආදරයෙන් පැමිණෙන්නම්!<', `>${bCenter('Yes, I will joyfully attend!', 'ඔව්, මම ආදරයෙන් පැමිණෙන්නම්!')}<`);
content = content.replace('>කණගාටුයි, මට පැමිණිය නොහැක. නමුත් මගේ ආශීර්වාදය ඔබ සමඟයි.<', `>${bCenter("Sorry, I can't make it, but my blessings are with you.", 'කණගාටුයි, මට පැමිණිය නොහැක. නමුත් මගේ ආශීර්වාදය ඔබ සමඟයි.')}<`);
content = content.replace('>ඔබගේ පැමිණීම තහවුරු කිරීම සාර්ථකව යවා ඇත.<', `>${bCenter('Your RSVP has been sent successfully.', 'ඔබගේ පැමිණීම තහවුරු කිරීම සාර්ථකව යවා ඇත.')}<`);
content = content.replace('>කරුණාකර ඔබගේ නම ඇතුළත් කර නැවත උත්සාහ කරන්න.<', `>${bCenter('Please enter your name and try again.', 'කරුණාකර ඔබගේ නම ඇතුළත් කර නැවත උත්සාහ කරන්න.')}<`);
content = content.replace('>තහවුරු කරන්න<', `>${bCenter('Confirm', 'තහවුරු කරන්න')}<`);
content = content.replace('>යවමින්...<', `>${bCenter('Sending...', 'යවමින්...')}<`);
content = content.replace('>ඔබගේ ප්‍රතිචාරය පුද්ගලිකව තබා ගනු ලැබේ.<', `>${bCenter('Your response will be kept private.', 'ඔබගේ ප්‍රතිචාරය පුද්ගලිකව තබා ගනු ලැබේ.')}<`);

// Wishes
content = content.replace('>මිහිරි පණිවිඩ<', `>${bCenter('Sweet Messages', 'මිහිරි පණිවිඩ')}<`);
content = content.replace('>අමුත්තන්ගේ සටහන් පොත<', `>${bCenter('Guestbook', 'අමුත්තන්ගේ සටහන් පොත')}<`);
content = content.replace('>ආදරණීය පැතුම්<', `>${bCenter('Warm Wishes', 'ආදරණීය පැතුම්')}<`);
content = content.replace('ඔබගේ ආදරය සහ ආශීර්වාදය අපට ලැබෙන වටිනාම ත්‍යාගයකි. නව ජීවිතයට මතක සටහනක් තබා යන්න.', bCenter('Your love and blessings are the most valuable gifts we receive. Leave a memorable note for our new life.', 'ඔබගේ ආදරය සහ ආශීර්වාදය අපට ලැබෙන වටිනාම ත්‍යාගයකි. නව ජීවිතයට මතක සටහනක් තබා යන්න.'));
content = content.replace('>ඔබගේ පණිවිඩය<', `>${bLeft('Your Message', 'ඔබගේ පණිවිඩය')}<`);
content = content.replace('placeholder="නව යුවළට ඔබගේ ආදරණීය පැතුම් ලියන්න..."', 'placeholder="Your warm wishes / නව යුවළට ඔබගේ ආදරණීය පැතුම් ලියන්න..."');
content = content.replace('>ඔබගේ ආදරණීය පණිවිඩය සාර්ථකව යවා ඇත<', `>${bCenter('Your warm message has been sent successfully', 'ඔබගේ ආදරණීය පණිවිඩය සාර්ථකව යවා ඇත')}<`);
content = content.replace('>කරුණාකර නම සහ පණිවිඩය සම්පූර්ණ කරන්න<', `>${bCenter('Please fill in both name and message', 'කරුණාකර නම සහ පණිවිඩය සම්පූර්ණ කරන්න')}<`);
content = content.replace('>පැතුම් යවන්න<', `>${bCenter('Send Wishes', 'පැතුම් යවන්න')}<`);

// Thank You
content = content.replace('>ස්තූතියි<', `>${bCenter('Thank You', 'ස්තූතියි')}<`);
content = content.replace('අපගේ විශේෂ දිනය ඔබ සමඟ ආදරයෙන් සැමරීමට අපි බලා සිටිමු.', bCenter('We look forward to celebrating our special day with you with love.', 'අපගේ විශේෂ දිනය ඔබ සමඟ ආදරයෙන් සැමරීමට අපි බලා සිටිමු.'));

fs.writeFileSync('./src/App.tsx', content);
console.log("Language updated to premium bilingual format.");
