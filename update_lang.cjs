const fs = require('fs');

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

const replacements = {
  // Hero
  'විවාහ මංගල්‍යය': 'Wedding Ceremony | විවාහ මංගල්‍යය',
  'ආරාධනය විවෘත කරන්න': 'Open Invitation | ආරාධනය විවෘත කරන්න',
  'ආරම්භ කිරීමට ක්ලික් කරන්න': 'Click to Start | ආරම්භ කිරීමට ක්ලික් කරන්න',
  'විවාහ ආරාධනය': 'Wedding Invitation | විවාහ ආරාධනය',
  'ආරාධනයට පිවිසෙන්න': 'Enter Invitation | ආරාධනයට පිවිසෙන්න',
  'වසා දමන්න': 'Close | වසා දමන්න',

  // Details
  'අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.': 'Together with our families, we joyfully invite you to celebrate our special day. | අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.',
  'විස්තර බලන්න': 'See Details | විස්තර බලන්න',
  'පවුල් දෙකක් ආදරයෙන් එක්වන මොහොතක්': 'Two Families Uniting with Love | පවුල් දෙකක් ආදරයෙන් එක්වන මොහොතක්',
  'පී. සමන්ත මැතිතුමාගේ සහ ඊ. පුෂ්පලතා මැතිනියගේ ආදරණීය දියණිය': 'Loving daughter of Mr. P. Samantha & Mrs. E. Pushpalatha | පී. සමන්ත මැතිතුමාගේ සහ ඊ. පුෂ්පලතා මැතිනියගේ ආදරණීය දියණිය',
  'එච්. කේ. ජී. නිමල් රාජපක්ෂ මැතිතුමාගේ සහ ඒ. ජී. ආරියවතී මැතිනියගේ ආදරණීය පුතණුවන්': 'Loving son of Mr. H. K. G Nimal Rajapaksha & Mrs. A. G Ariyawathi | එච්. කේ. ජී. නිමල් රාජපක්ෂ මැතිතුමාගේ සහ ඒ. ජී. ආරියවතී මැතිනියගේ ආදරණීය පුතණුවන්',
  'අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන්': 'We warmly invite you to join the celebration of our union | අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන්',
  'ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවණීය ඇරයූමයි!': 'You are cordially invited! | ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවණීය ඇරයූමයි!',
  'විවාහ උත්සවය': 'Wedding Ceremony | විවාහ උත්සවය',

  // Timeline / Icons
  'දිනය': 'Date | දිනය',
  'වේලාව': 'Time | වේලාව',
  'ස්ථානය': 'Location | ස්ථානය',
  'පෝරු උත්සවය': 'Poruwa Ceremony | පෝරු උත්සවය',
  'උත්සවය අවසානය': 'End of Ceremony | උත්සවය අවසානය',
  'දවසේ වැඩසටහන': 'Order of Events | දවසේ වැඩසටහන',
  'කාලසටහන': 'Timeline | කාලසටහන',
  'ඔබ සමඟ බෙදා ගැනීමට බලා සිටින අපගේ විශේෂ දිනයේ සරල වැඩසටහන.': 'A simple schedule of our special day that we look forward to sharing with you. | ඔබ සමඟ බෙදා ගැනීමට බලා සිටින අපගේ විශේෂ දිනයේ සරල වැඩසටහන.',

  // Save the Date
  'සදාකාලික': 'Forever | සදාකාලික',
  'මෙම දිනය': 'Save | මෙම දිනය',
  'සුරකින්න': 'The Date | සුරකින්න',
  'ආදරයෙන් පිරුණු මොහොතකට රැඳී සිටින්න': 'Stay tuned for a moment full of love | ආදරයෙන් පිරුණු මොහොතකට රැඳී සිටින්න',

  // Venue
  'උත්සව ස්ථානය': 'Venue | උත්සව ස්ථානය',
  'සම්ප්‍රදාය, අලංකාරය සහ නව ඇරඹුමක සුන්දරත්වය එක්වන තැන': 'Where tradition, elegance, and the beauty of a new beginning unite | සම්ප්‍රදාය, අලංකාරය සහ නව ඇරඹුමක සුන්දරත්වය එක්වන තැන',
  '“අපගේ ආදර කතාවේ අලංකාරම පරිච්ඡේදය ඔබ සමඟ සැමරීමට අප සතුටින් බලා සිටිමු.”': '“We look forward to celebrating the most beautiful chapter of our love story with you.” | “අපගේ ආදර කතාවේ අලංකාරම පරිච්ඡේදය ඔබ සමඟ සැමරීමට අප සතුටින් බලා සිටිමු.”',
  'ගමනාන්තය': 'Destination | ගමනාන්තය',
  'සිතියම විවෘත කරන්න': 'Open Map | සිතියම විවෘත කරන්න',
  'බලන්න': 'View | බලන්න',

  // Gallery
  'අපගේ මතකයන්': 'Our Memories | අපගේ මතකයන්',

  // RSVP
  'පැමිණීම තහවුරු කිරීම': 'RSVP | පැමිණීම තහවුරු කිරීම',
  'ඔබ පැමිණෙන්නේද?': 'Will You Attend? | ඔබ පැමිණෙන්නේද?',
  'ඔබගේ නම මෙහි ලියන්න...': 'Write your name here... | ඔබගේ නම මෙහි ලියන්න...',
  'අපගේ විශේෂ දිනයට ඔබ පැමිණෙන්නේද?': 'Will you be attending our special day? | අපගේ විශේෂ දිනයට ඔබ පැමිණෙන්නේද?',
  'ඔව්, මම ආදරයෙන් පැමිණෙන්නම්!': 'Yes, I will joyfully attend! | ඔව්, මම ආදරයෙන් පැමිණෙන්නම්!',
  'කණගාටුයි, මට පැමිණිය නොහැක. නමුත් මගේ ආශීර්වාදය ඔබ සමඟයි.': "Sorry, I can't make it, but my blessings are with you. | කණගාටුයි, මට පැමිණිය නොහැක. නමුත් මගේ ආශීර්වාදය ඔබ සමඟයි.",
  'ඔබගේ පැමිණීම තහවුරු කිරීම සාර්ථකව යවා ඇත.': 'Your RSVP has been sent successfully. | ඔබගේ පැමිණීම තහවුරු කිරීම සාර්ථකව යවා ඇත.',
  'කරුණාකර ඔබගේ නම ඇතුළත් කර නැවත උත්සාහ කරන්න.': 'Please enter your name and try again. | කරුණාකර ඔබගේ නම ඇතුළත් කර නැවත උත්සාහ කරන්න.',
  'තහවුරු කරන්න': 'Confirm | තහවුරු කරන්න',
  'යවමින්...': 'Sending... | යවමින්...',
  'ඔබගේ ප්‍රතිචාරය පුද්ගලිකව තබා ගනු ලැබේ.': 'Your response will be kept private. | ඔබගේ ප්‍රතිචාරය පුද්ගලිකව තබා ගනු ලැබේ.',

  // Wishes
  'මිහිරි පණිවිඩ': 'Sweet Messages | මිහිරි පණිවිඩ',
  'අමුත්තන්ගේ සටහන් පොත': 'Guestbook | අමුත්තන්ගේ සටහන් පොත',
  'ආදරණීය පැතුම්': 'Warm Wishes | ආදරණීය පැතුම්',
  'ඔබගේ ආදරය සහ ආශීර්වාදය අපට ලැබෙන වටිනාම ත්‍යාගයකි. නව ජීවිතයට මතක සටහනක් තබා යන්න.': 'Your love and blessings are the most valuable gifts we receive. Leave a memorable note for our new life. | ඔබගේ ආදරය සහ ආශීර්වාදය අපට ලැබෙන වටිනාම ත්‍යාගයකි. නව ජීවිතයට මතක සටහනක් තබා යන්න.',
  'ඔබගේ නම': 'Your Name | ඔබගේ නම',
  'ඔබගේ පණිවිඩය': 'Your Message | ඔබගේ පණිවිඩය',
  'නව යුවළට ඔබගේ ආදරණීය පැතුම් ලියන්න...': 'Write your warm wishes for the new couple... | නව යුවළට ඔබගේ ආදරණීය පැතුම් ලියන්න...',
  'ඔබගේ ආදරණීය පණිවිඩය සාර්ථකව යවා ඇත': 'Your warm message has been sent successfully | ඔබගේ ආදරණීය පණිවිඩය සාර්ථකව යවා ඇත',
  'කරුණාකර නම සහ පණිවිඩය සම්පූර්ණ කරන්න': 'Please fill in both name and message | කරුණාකර නම සහ පණිවිඩය සම්පූර්ණ කරන්න',
  'පැතුම් යවන්න': 'Send Wishes | පැතුම් යවන්න',

  // Thank You
  'ස්තූතියි': 'Thank You | ස්තූතියි',
  'අපගේ විශේෂ දිනය ඔබ සමඟ ආදරයෙන් සැමරීමට අපි බලා සිටිමු.': 'We look forward to celebrating our special day with you with love. | අපගේ විශේෂ දිනය ඔබ සමඟ ආදරයෙන් සැමරීමට අපි බලා සිටිමු.',

  // Labels
  'දින': 'Days | දින',
  'පැය': 'Hours | පැය',
  'මිනිත්තු': 'Mins | මිනිත්තු',
  'තත්පර': 'Secs | තත්පර',
};

Object.entries(replacements).forEach(([sinhala, bilingual]) => {
  const regex = new RegExp(sinhala, 'g');
  content = content.replace(regex, (match) => {
    return bilingual;
  });
});

content = content.replace(/Wedding Ceremony \| Wedding Ceremony \| විවාහ මංගල්‍යය/g, 'Wedding Ceremony | විවාහ මංගල්‍යය');
content = content.replace(/Wedding Invitation \| Wedding Invitation \| විවාහ ආරාධනය/g, 'Wedding Invitation | විවාහ ආරාධනය');
content = content.replace(/Your Name \| Your Name \| ඔබගේ නම/g, 'Your Name | ඔබගේ නම');

fs.writeFileSync('./src/App.tsx', content);
console.log("Language updated to bilingual.");
