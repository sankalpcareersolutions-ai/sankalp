const fs = require('fs');
let content = fs.readFileSync('src/data/hindiRoadmaps.ts', 'utf-8');

content = content.replace(
  'export const hindiCareers: Record<string, HindiCareerDetails> = {',
  `export const hindiCareers: Record<string, HindiCareerDetails> = {
  sainik: {
    title: "सैनिक स्कूल प्रवेश (AISSEE)",
    category: "स्कूल प्रवेश (School Entrances)",
    shortDesc: "युवा कैडेटों के लिए प्रतिष्ठित सैनिक स्कूलों में प्रवेश।",
    stream: "कक्षा 5वीं, 8वीं, 9वीं के छात्र",
    qualification: "स्कूल स्तर"
  },
  rms: {
    title: "राष्ट्रीय मिलिट्री स्कूल (RMS)",
    category: "स्कूल प्रवेश (School Entrances)",
    shortDesc: "भविष्य के अधिकारियों को विकसित करने वाले शीर्ष सैन्य कॉलेज।",
    stream: "कक्षा 5वीं, 8वीं, 9वीं के छात्र",
    qualification: "स्कूल स्तर"
  },
  rimc: {
    title: "राष्ट्रीय भारतीय सैन्य कॉलेज (RIMC)",
    category: "स्कूल प्रवेश (School Entrances)",
    shortDesc: "एनडीए के लिए प्रमुख फीडर संस्थान।",
    stream: "कक्षा 7वीं के छात्र",
    qualification: "स्कूल स्तर"
  },`
);

content = content.replace(
  'export const hindiRoadmaps: Record<string, HindiRoadmapStep[]> = {',
  `export const hindiRoadmaps: Record<string, HindiRoadmapStep[]> = {
  sainik: [
    { number: 1, title: 'प्रारंभिक तैयारी', duration: 'कक्षा 4 और 5', description: 'गणित, अंग्रेजी, बुद्धिमत्ता और सामान्य ज्ञान में बुनियादी तैयारी शुरू करें।', tip: 'विशेष रूप से सैनिक स्कूल के लिए फाउंडेशन कोर्स में दाखिला लें।', milestone: 'मॉक टेस्ट की तैयारी' },
    { number: 2, title: 'AISSEE परीक्षा', duration: 'जनवरी', description: 'अखिल भारतीय सैनिक स्कूल प्रवेश परीक्षा पास करें।', tip: 'OMR भरने और समय प्रबंधन का अभ्यास करें।', milestone: 'लिखित परीक्षा पास' },
    { number: 3, title: 'मेडिकल और साक्षात्कार', duration: 'मार्च-अप्रैल', description: 'मेडिकल बोर्ड फिटनेस टेस्ट और व्यक्तिगत साक्षात्कार पास करें।', tip: 'शारीरिक फिटनेस और आत्मविश्वासी संचार बनाए रखें।', milestone: 'अंतिम मेरिट सूची' }
  ],
  rms: [
    { number: 1, title: 'प्रारंभिक तैयारी', duration: 'कक्षा 4 और 5', description: 'गणित, अंग्रेजी, बुद्धिमत्ता और सामान्य ज्ञान में बुनियादी तैयारी शुरू करें।', tip: 'विशेष रूप से RMS के लिए फाउंडेशन कोर्स में दाखिला लें।', milestone: 'मॉक टेस्ट की तैयारी' },
    { number: 2, title: 'CET परीक्षा', duration: 'दिसंबर', description: 'RMS के लिए कॉमन एंट्रेंस टेस्ट पास करें।', tip: 'इंटेलिजेंस सेक्शन में उच्च सटीकता पर ध्यान दें।', milestone: 'लिखित परीक्षा पास' },
    { number: 3, title: 'साक्षात्कार और मेडिकल', duration: 'फरवरी-मार्च', description: 'अंतिम साक्षात्कार और चिकित्सा परीक्षा पास करें।', tip: 'अच्छी सामान्य जागरूकता विकसित करें।', milestone: 'अंतिम मेरिट सूची' }
  ],
  rimc: [
    { number: 1, title: 'गहन तैयारी', duration: 'कक्षा 6 और 7', description: 'अंग्रेजी, गणित और सामान्य ज्ञान में महारत हासिल करें।', tip: 'RIMC व्यक्तिपरक अंग्रेजी और गणित के लिए कठोर लेखन अभ्यास की आवश्यकता होती है।', milestone: 'विषयपरक तैयारी' },
    { number: 2, title: 'लिखित परीक्षा', duration: 'जून/दिसंबर', description: 'RIMC के लिए अखिल भारतीय प्रवेश परीक्षा पास करें।', tip: 'गति और साफ लिखावट महत्वपूर्ण हैं।', milestone: 'लिखित परीक्षा पास' },
    { number: 3, title: 'वाइवा-वॉयस और मेडिकल', duration: 'लिखित परीक्षा के बाद', description: 'कठोर वाइवा-वॉयस और मेडिकल चेकअप पास करें।', tip: 'शुरुआत में ही अधिकारी जैसे गुण प्रदर्शित करें।', milestone: 'अंतिम मेरिट सूची' }
  ],`
);

fs.writeFileSync('src/data/hindiRoadmaps.ts', content);
