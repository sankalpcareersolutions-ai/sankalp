const fs = require('fs');

const enFile = 'src/locales/en.ts';
let enContent = fs.readFileSync(enFile, 'utf8');

const visionContentEn = `
    vision_title: "Project Sankalp – Vision Statement",
    vision_intro: "\\"Sankalp\\" is more than a project—it's a commitment to empowering every student and aspirant with the right career guidance, reliable information, and informed decision-making. We believe that no student should choose a career based on confusion, pressure, or lack of awareness. Every dream deserves the right direction.",
    our_vision_title: "Our Vision",
    our_vision_desc: "To become India's most trusted career guidance platform, empowering every student and aspirant to discover their true potential, make informed career decisions, and build a future filled with purpose, confidence, and success through accessible, unbiased, and personalized career counselling.",
    our_mission_title: "Our Mission",
    our_mission_item1: "Guide students with accurate and unbiased career counselling.",
    our_mission_item2: "Help aspirants identify careers that match their interests, strengths, and goals.",
    our_mission_item3: "Make quality career guidance accessible to students from both urban and rural India.",
    our_mission_item4: "Specialize in Defence career guidance while providing comprehensive guidance across all career streams.",
    our_mission_item5: "Support Hindi and English medium students through bilingual resources.",
    our_mission_item6: "Build a comprehensive Career Library that enables students to explore careers, entrance examinations, eligibility, and future opportunities—all in one place.",
    motto_title: "Project Sankalp Motto",
    motto_text: "\\"Right Guidance. Right Career. Bright Future.\\"",
    tagline_text: "\\"Project Sankalp – Every Dream Deserves the Right Direction.\\"",
`;

enContent = enContent.replace('home: {', 'home: {\n' + visionContentEn);
fs.writeFileSync(enFile, enContent);

const hiFile = 'src/locales/hi.ts';
let hiContent = fs.readFileSync(hiFile, 'utf8');

const visionContentHi = `
    vision_title: "प्रोजेक्ट संकल्प - विजन स्टेटमेंट",
    vision_intro: "\\"संकल्प\\" केवल एक प्रोजेक्ट नहीं है-यह हर छात्र और उम्मीदवार को सही करियर मार्गदर्शन, विश्वसनीय जानकारी और सुविचारित निर्णय लेने में सशक्त बनाने की एक प्रतिबद्धता है। हमारा मानना है कि किसी भी छात्र को भ्रम, दबाव या जागरूकता की कमी के आधार पर करियर नहीं चुनना चाहिए। हर सपने को सही दिशा मिलनी चाहिए।",
    our_vision_title: "हमारा विजन (दृष्टिकोण)",
    our_vision_desc: "भारत का सबसे भरोसेमंद करियर मार्गदर्शन प्लेटफॉर्म बनना, जो सुलभ, निष्पक्ष और व्यक्तिगत करियर काउंसलिंग के माध्यम से हर छात्र और उम्मीदवार को उनकी वास्तविक क्षमता पहचानने, सूचित करियर निर्णय लेने और उद्देश्य, आत्मविश्वास और सफलता से भरा भविष्य बनाने के लिए सशक्त बनाता है।",
    our_mission_title: "हमारा मिशन (उद्देश्य)",
    our_mission_item1: "सटीक और निष्पक्ष करियर काउंसलिंग के साथ छात्रों का मार्गदर्शन करना।",
    our_mission_item2: "उम्मीदवारों को उनकी रुचियों, ताकत और लक्ष्यों से मेल खाने वाले करियर की पहचान करने में मदद करना।",
    our_mission_item3: "शहरी और ग्रामीण भारत दोनों के छात्रों के लिए गुणवत्तापूर्ण करियर मार्गदर्शन सुलभ बनाना।",
    our_mission_item4: "सभी करियर स्ट्रीम में व्यापक मार्गदर्शन प्रदान करते हुए रक्षा (Defence) करियर मार्गदर्शन में विशेषज्ञता प्राप्त करना।",
    our_mission_item5: "द्विभाषी (Bilingual) संसाधनों के माध्यम से हिंदी और अंग्रेजी माध्यम के छात्रों का समर्थन करना।",
    our_mission_item6: "एक व्यापक करियर लाइब्रेरी बनाना जो छात्रों को एक ही स्थान पर करियर, प्रवेश परीक्षाओं, योग्यता और भविष्य के अवसरों का पता लगाने में सक्षम बनाती है।",
    motto_title: "प्रोजेक्ट संकल्प का आदर्श वाक्य",
    motto_text: "\\"सही मार्गदर्शन। सही करियर। उज्ज्वल भविष्य।\\"",
    tagline_text: "\\"प्रोजेक्ट संकल्प - हर सपने को सही दिशा मिलनी चाहिए।\\"",
`;

hiContent = hiContent.replace('home: {', 'home: {\n' + visionContentHi);
fs.writeFileSync(hiFile, hiContent);

console.log("Updated locales");
