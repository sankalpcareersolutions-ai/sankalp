export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  sector: "Defence Services" | "Paramilitary" | "Scientific / R&D" | "Defence Civilian";
  subSector: string; // e.g. "Indian Army", "ISRO", "DRDO", "BSF"
  content: string;
  achievement: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Lt. Aniket Sharma",
    role: "Commissioned Combat Officer",
    location: "Dehradun, Uttarakhand",
    sector: "Defence Services",
    subSector: "Indian Army",
    achievement: "Cleared CDS & SSB (21 SSB Bhopal)",
    content: "Sankalp's SSB prep module turned my dream into reality. The simulated psychological tests and mock interview sessions with seasoned army veterans gave me the confidence to stand out and earn my recommendation.",
    rating: 5
  },
  {
    id: "t2",
    name: "Dr. Priyadarshini Iyer",
    role: "Scientist SC",
    location: "Sricharan, Bengaluru",
    sector: "Scientific / R&D",
    subSector: "ISRO",
    achievement: "Passed ISRO ICRB Exam & Technical Panel Interview",
    content: "Transitioning into space technology requires a very specific skillset. The Rocket Propulsion and Satellite Systems courses on Sankalp bridged the gap between my engineering syllabus and ISRO’s exact screening requirements.",
    rating: 5
  },
  {
    id: "t3",
    name: "Saurabh Deshmukh",
    role: "Technical Officer B",
    location: "Mumbai, Maharashtra",
    sector: "Scientific / R&D",
    subSector: "BARC",
    achievement: "Cleared BARC OCES Chemical Engineering Entry",
    content: "Sankalp’s intensive nuclear physics concepts and sample mock interviews with retired BARC Panel members helped me demystify the rigorous technical interview. Truly a consolidated solution for national security careers.",
    rating: 5
  },
  {
    id: "t4",
    name: "Asst. Comdt. Rajesh Kripalani",
    role: "Assistant Commandant",
    location: "Jaisalmer, Rajasthan",
    sector: "Paramilitary",
    subSector: "BSF",
    achievement: "Cleared UPSC CAPF (AC) Exam & Medical/Physical Board",
    content: "CAPF is distinct from the regular army in terms of security dynamics. SANKALP provided localized material on internal security, border management, and physical conditioning that was crucial for my interview stage.",
    rating: 5
  },
  {
    id: "t5",
    name: "Shreya Singh",
    role: "Senior Scientific Assistant (SSA)",
    location: "Pune, Maharashtra",
    sector: "Defence Civilian",
    subSector: "DRDO",
    achievement: "Cleared DRDO CEPTAM Entry & Tech Assessment",
    content: "The dedicated lectures on RADAR systems and defense electronics on SANKALP prepared me flawlessly for the CEPTAM exams. SANKALP is an absolute boon for civilian entrants looking to serve in DRDO labs.",
    rating: 5
  },
  {
    id: "t6",
    name: "Squadron Leader Varun Malhotra",
    role: "Fighter Pilot",
    location: "Ambala, Haryana",
    sector: "Defence Services",
    subSector: "Indian Air Force",
    achievement: "Cleared AFCAT & AFSB (1 AFSB Dehradun)",
    content: "Sankalp's CPSS (Computerised Pilot Selection System) guidance was the closest representation of the actual assessment I found anywhere. Their mentorship program is top-notch and highly accurate.",
    rating: 5
  },
  {
    id: "t7",
    name: "Sub-Inspector Megha Yadav",
    role: "Platoon Commander",
    location: "Ranchi, Jharkhand",
    sector: "Paramilitary",
    subSector: "CRPF",
    achievement: "Cleared SSC CPO (Sub-Inspector Rank 14)",
    content: "In paramilitary entries, physical endurance is evaluated of the same order as written aptitude. Sankalp's diet planning and physical evaluation frameworks saved me months of directionless training.",
    rating: 4
  },
  {
    id: "t8",
    name: "Akash Nair",
    role: "Junior Research Fellow (JRF)",
    location: "Kochi, Kerala",
    sector: "Scientific / R&D",
    subSector: "NPOL (DRDO Lab)",
    achievement: "Secured Internship & Research Fellowship at NPOL",
    content: "The Oceanography and Sonar fundamentals module here are extremely rare, professional, and well-researched. This was vital in clearing the selection process for my DRDO NPOL internship project.",
    rating: 5
  },
  {
    id: "t9",
    name: "Karan Johar (Advocate)",
    role: "Assistant Military Legal Advisor",
    location: "New Delhi",
    sector: "Defence Civilian",
    subSector: "Military Engineer Services (MES)",
    achievement: "Cleared MES Officer Recruitment Scheme",
    content: "Civilian roles like MES don't have the standard SSB, but the technical legal round evaluates knowledge of military contracts and real estate laws. Sankalp's structured courses cover these niche areas perfectly.",
    rating: 5
  },
  {
    id: "t10",
    name: "Lieutenant Commander Sneha Roy",
    role: "Logistics Officer",
    location: "Visakhapatnam, Andhra Pradesh",
    sector: "Defence Services",
    subSector: "Indian Navy",
    achievement: "Selected in Navy Executive (Logistics) Direct Entry",
    content: "Sankalp's mock personality interviews mapped closely with actual Navy requirements in Bangalore. The mentors are retired commanders themselves, ensuring simulated evaluations are authentic.",
    rating: 5
  },
  {
    id: "t11",
    name: "Amit Deswal",
    role: "Assistant Commandant",
    location: "Srinagar, Jammu & Kashmir",
    sector: "Paramilitary",
    subSector: "CRPF",
    achievement: "Cleared UPSC CAPF with Rank 8",
    content: "SANKALP’s current affairs analysis for security-related issues is the best. The essay writing corrections from experienced mentors helped me secure high marks in general studies Paper-II.",
    rating: 5
  },
  {
    id: "t12",
    name: "Dr. Himanshu Sekhar",
    role: "Scientist B",
    location: "Chandipur, Odisha",
    sector: "Scientific / R&D",
    subSector: "PXE (DRDO Lab)",
    achievement: "Cleared RAC DRDO Direct Recruitment",
    content: "DRDO’s Recruitment & Assessment Centre (RAC) expects high-level Core Metallurgical knowledge. The metallurgy-focused modules and test series on SANKALP helped me brush up on exact industry and defence application concepts.",
    rating: 5
  },
  {
    id: "t13",
    name: "Gaurav Sen",
    role: "Scientific Assistant B",
    location: "Tarapur, Maharashtra",
    sector: "Scientific / R&D",
    subSector: "BARC",
    achievement: "Cleared BARC Diploma in Radiological Physics Entry",
    content: "The radiation physics course on Sankalp is exceptional. I spent months searching for decent preparation resources online, but SANKALP had a curated repository and active Q&A forum that sorted everything.",
    rating: 4
  },
  {
    id: "t14",
    name: "Pooja Hegde",
    role: "Project Associate",
    location: "Trivandrum, Kerala",
    sector: "Scientific / R&D",
    subSector: "VSSC (ISRO Lab)",
    achievement: "Placed in Avionics & Navigation Internship",
    content: "I landed an internship at Vikram Sarabhai Space Centre through guidance from SANKALP. The application template reviews and guidance from former ISRO directors on my CV were game changers.",
    rating: 5
  },
  {
    id: "t15",
    name: "Rohan Bhardwaj",
    role: "Sub-Inspector",
    location: "Imphal, Manipur",
    sector: "Paramilitary",
    subSector: "Assam Rifles",
    achievement: "Cleared SSC CPO - Assam Rifles Sub-Division",
    content: "Sankalp's specific strategy webinars on insurgency in Northeast India and physical preparedness rules for high-altitude fitness levels were the major factors in my successful selection.",
    rating: 5
  },
  {
    id: "t16",
    name: "Lt. Divya Teja",
    role: "Signals Officer",
    location: "Mhow, Madhya Pradesh",
    sector: "Defence Services",
    subSector: "Indian Army",
    achievement: "Cleared TGC (Technical Graduate Course) & SSB",
    content: "As an engineering graduate, SSB can feel overwhelmingly psychological. SANKALP showed me how to pitch my technical projects under Officer-Like Qualities (OLQs) during the interview board.",
    rating: 4
  },
  {
    id: "t17",
    name: "Tarun Chhabra",
    role: "Senior Scientific Officer",
    location: "Kanpur, Uttar Pradesh",
    sector: "Defence Civilian",
    subSector: "Directorate General of Quality Assurance (DGQA)",
    achievement: "Cleared UPSC DGQA Direct Entry exam",
    content: "DGQA civilian roles require expertise in engineering materials testing and ballistic standards. SANKALP provided precise notes on military quality assurance protocols, making the preparation highly targeted.",
    rating: 5
  },
  {
    id: "t18",
    name: "Nikita Nair",
    role: "Scientist SC",
    location: "Mahendragiri, Tamil Nadu",
    sector: "Scientific / R&D",
    subSector: "IPRC (ISRO Lab)",
    achievement: "Cleared ISRO Propulsion Complex selection",
    content: "My technical interview focused deeply on cryogenic propellants. SANKALP’s aerospace engineering concepts masterclass taught by ex-ISRO scientists was critical in preparing me for these questions.",
    rating: 5
  },
  {
    id: "t19",
    name: "Manpreet Singh",
    role: "Sub-Inspector",
    location: "Firozpur, Punjab",
    sector: "Paramilitary",
    subSector: "BSF",
    achievement: "Cleared BSF SI (Tech/Water Wing) Examination",
    content: "Water Wing exams of BSF are extremely niche. The marine diesel engine and navigation fundamentals course on SANKALP was a hidden gem, absolutely perfect for this selection process.",
    rating: 5
  },
  {
    id: "t20",
    name: "Vikramjit Banerjee",
    role: "Scientific Officer C",
    location: "Kolkata, West Bengal",
    sector: "Scientific / R&D",
    subSector: "VECC (BARC Division)",
    achievement: "Selected in Variable Energy Cyclotron Centre",
    content: "Thanks to SANKALP's particle accelerators courses and technical advisory forums, I was able to successfully clear the VECC examination and technical panel interview without any external coaching.",
    rating: 5
  },
  {
    id: "t21",
    name: "Lieutenant Rahul Kashyap",
    role: "Artillery Officer",
    location: "Srinagar, Jammu & Kashmir",
    sector: "Defence Services",
    subSector: "Indian Army",
    achievement: "Cleared NDA & SSB (NDA 149 Course)",
    content: "Entering NDA right after school can be incredibly daunting. SANKALP's foundation course on NDA math, general studies, and OLQ personality grooming built exactly the profile SSB was searching for.",
    rating: 5
  },
  {
    id: "t22",
    name: "Anjali Deshpande",
    role: "Technical Officer",
    location: "Deharadun, Uttarakhand",
    sector: "Defence Civilian",
    subSector: "DRDO",
    achievement: "Cleared CEPTAM Technical Division Recruitment",
    content: "With SANKALP, I was able to streamline my preparation for the computer science screening test. The dynamic practice portal on SANKALP lets you gauge performance against hundreds of other aspirants.",
    rating: 4
  },
  {
    id: "t23",
    name: "Abhinav Pandey",
    role: "Assistant Commandant",
    location: "Guwahati, Assam",
    sector: "Paramilitary",
    subSector: "SSB",
    achievement: "Rank 19 in UPSC CAPF 2024 Exam",
    content: "A major part of the Assistant Commandant preparation is expressing clear strategic positions in the physical interview. Sankalp’s personality sessions under former IPS officers made raw confidence natural.",
    rating: 5
  },
  {
    id: "t24",
    name: "Komalpreet Kaur",
    role: "Executive Officer",
    location: "Chandigarh",
    sector: "Defence Civilian",
    subSector: "Cantonment Boards (Defence Estates)",
    achievement: "Cleared IDES Junior Group-A Recruitment",
    content: "Civilian administration in Cantonment boards involves complex land laws and city planning codes. Sankalp’s IDES preparatory course is the only one in India covering this with such rich clarity.",
    rating: 5
  },
  {
    id: "t25",
    name: "Dr. Sandeep Jha",
    role: "Scientist B",
    location: "Hyderabad, Telangana",
    sector: "Scientific / R&D",
    subSector: "DLRL (DRDO Lab)",
    achievement: "Direct PhD R&D Entry in Electronics",
    content: "Sankalp’s webinars with electronics and telemetry heads helped me structure my PhD defense thesis in a way that aligned with DLRL's active electronic warfare research mandates.",
    rating: 4
  },
  {
    id: "t26",
    name: "Saurav Patnaik",
    role: "Sub-Inspector",
    location: "Bhubaneswar, Odisha",
    sector: "Paramilitary",
    subSector: "CISF",
    achievement: "SSC CPO Central Industrial Security Force Select",
    content: "Airport and industrial asset protection profiles are different from border security. Sankalp's webinars on modern security architecture and physical screening tactics were extremely helpful.",
    rating: 5
  },
  {
    id: "t27",
    name: "Subaltern Pranav Joshi",
    role: "Commissioned Infantry Officer",
    location: "Jammu, J&K",
    sector: "Defence Services",
    subSector: "Indian Army",
    achievement: "Cleared NCC Special Entry to SSB Recommendation",
    content: "NCC entry has no written exam, meaning SSB is the sole deciding factor. I practiced thematic apperception tests and group planning exercises daily on SANKALP under continuous mentor review.",
    rating: 5
  },
  {
    id: "t28",
    name: "Nisha Rawat",
    role: "Technical Assistant SC",
    location: "Dehradun, Uttarakhand",
    sector: "Defence Civilian",
    subSector: "Ordnance Factory Board (OFB)",
    achievement: "Cleared OFB Technical Cadre Entrance",
    content: "I prepared manufacturing tech and ballistics mechanics through SANKALP. The interactive tests provided detailed feedback on weak areas, ensuring I cleared OFB with great scores.",
    rating: 4
  },
  {
    id: "t29",
    name: "Rahul Mohanty",
    role: "Scientist SC",
    location: "Balasore, Odisha",
    sector: "Scientific / R&D",
    subSector: "ITR (ISRO/DRDO Range)",
    achievement: "Selected as Range Telemetry Operator",
    content: "Working at Integrated Test Range (ITR) requires real-time signal processing proficiency. The mentorship group of SANKALP with retired DRDO scientists was directly instrumental in clearing the interview.",
    rating: 5
  },
  {
    id: "t30",
    name: "Lieutenant Karanveer Sodhi",
    role: "Navy Executive (Pilot)",
    location: "Lonavala, Maharashtra",
    sector: "Defence Services",
    subSector: "Indian Navy",
    achievement: "Selected in INET Naval Aviator Selection",
    content: "Personalized mentorship sessions at SANKALP helped me realize where my spatial awareness answers fell short. The corrective techniques taught by former pilots on the portal are golden.",
    rating: 5
  },
  {
    id: "t31",
    name: "Meenakshi Sundaram",
    role: "Scientific Officer C",
    location: "Kalpakkam, Tamil Nadu",
    sector: "Scientific / R&D",
    subSector: "BARC (IGCAR)",
    achievement: "Cleared BARC Scientific Officer Selection",
    content: "Fast Breeder Reactor physics has complex fundamentals that are skipped in generic college. SANKALP’s reactor technology lectures with retired BARC directors prepared me for the core technical board.",
    rating: 5
  },
  {
    id: "t32",
    name: "Inspector Vinayak Patil",
    role: "Commanding Legal Sub-Officer",
    location: "Srinagar, J&K",
    sector: "Paramilitary",
    subSector: "ITBP",
    achievement: "Cleared ITBP SI (GD) and Physical Assessment",
    content: "ITBP is deployed in extremely cold environments, and preparation under SANKALP's High Altitude physical conditioning routines made sure I was fit enough to pass the grueling training standards.",
    rating: 4
  },
  {
    id: "t33",
    name: "Prakash Khatri",
    role: "Civilian Construction Engineer",
    location: "Shillong, Meghalaya",
    sector: "Defence Civilian",
    subSector: "Military Engineer Services (MES)",
    achievement: "Cleared UPSC Assistant Director (Civil)",
    content: "Military structural guidelines and terrain engineering are rare topics. SANKALP had accurate, organized learning pathways that gave me an early advantage in this highly selective examination.",
    rating: 5
  },
  {
    id: "t34",
    name: "Dr. Swati Kelkar",
    role: "Scientist C",
    location: "Bengaluru, Karnataka",
    sector: "Scientific / R&D",
    subSector: "ISRO (URSC)",
    achievement: "U R Rao Satellite Centre R&D Direct Intake",
    content: "Getting into satellite integration requires advanced knowledge of thermal controls and electromagnetics. SANKALP’s technical test Series replicated URSC's screening perfectly.",
    rating: 5
  },
  {
    id: "t35",
    name: "Sub-Inspector Jaswant Singh",
    role: "Radio Sub-Inspector",
    location: "Amritsar, Punjab",
    sector: "Paramilitary",
    subSector: "BSF",
    achievement: "Cleared SSC CPO BSF Radio Telecom Select",
    content: "I recommend SANKALP's telecom physics course to anyone preparing for the telecom divisions in paramilitary forces. The conceptual lessons and short formula sheets are incredibly useful.",
    rating: 5
  },
  {
    id: "t36",
    name: "Wing Commander (Retd.) Ajay Grewal",
    role: "Air Force Veteran & Mentor",
    location: "Gurugram, Haryana",
    sector: "Defence Services",
    subSector: "Indian Air Force",
    achievement: "Former AFSB President - now SANKALP Advisor",
    content: "As a mentor, I have watched SANKALP curate high-fidelity preparation materials that capture actual testing standards. The students trained on this platform demonstrate superior planning and spatial awareness skills.",
    rating: 5
  },
  {
    id: "t37",
    name: "Snehashish Majumdar",
    role: "Principal Technical Assistant",
    location: "Kolkata, West Bengal",
    sector: "Defence Civilian",
    subSector: "Defence Research & Development Service (DRDS)",
    achievement: "Cleared DRDS Senior Tech Officer Entry",
    content: "Navigating civilian service exams inside the defense network can be highly unstructured. SANKALP brought a clean timeline and organized mock tests that turned the tide for me.",
    rating: 4
  },
  {
    id: "t38",
    name: "Asst. Comdt. Richa Chandel",
    role: "Assistant Commandant",
    location: "Nabha, Punjab",
    sector: "Paramilitary",
    subSector: "CISF",
    achievement: "Rank 12 in CAPF (AC) Women Category",
    content: "Sankalp’s focused physical masterclasses and mock interview schedules with senior security specialists gave me the exact insights required to score 100+ marks in physical viva.",
    rating: 5
  },
  {
    id: "t39",
    name: "Deepak Rawal",
    role: "Junior Scientific Officer",
    location: "Gwalior, Madhya Pradesh",
    sector: "Defence Civilian",
    subSector: "DRDO (DRDE Lab)",
    achievement: "Direct JSO Recruitment Exam Cleared",
    content: "The specific bio-defense and toxicology notes on SANKALP were exceptionally helpful for the DRDE laboratory screening. A highly consolidated and useful platform.",
    rating: 5
  },
  {
    id: "t40",
    name: "Dr. Rohit Deshpande",
    role: "Scientist SC",
    location: "Ahmedabad, Gujarat",
    sector: "Scientific / R&D",
    subSector: "ISRO (SAC)",
    achievement: "Space Applications Centre Specialist (SAC)",
    content: "Remote sensing and synthetic aperture radar technologies are complex topics. Sankalp’s Space Tech syllabus is compiled by retired SAC veterans, which makes it unmatched in depth.",
    rating: 5
  },
  {
    id: "t41",
    name: "Officer Cadet Tanmay Verma",
    role: "Officer Cadet",
    location: "Chennai, Tamil Nadu",
    sector: "Defence Services",
    subSector: "Indian Army (OTA)",
    achievement: "Selected in OTA Chennai via CDS Entry",
    content: "The CDS general knowledge course on SANKALP is unbelievably effective. Their subject matter experts analyze past trends with surgical precision, reducing prep time by half.",
    rating: 5
  },
  {
    id: "t42",
    name: "Shruti Ranjan",
    role: "Research Intern",
    location: "Kanpur, Uttar Pradesh",
    sector: "Scientific / R&D",
    subSector: "DRDO (DMSRDE Lab)",
    achievement: "Secured Project Internship in Polymers & Ballistics",
    content: "Landing a material science internship at DMSRDE was made possible by Sankalp's technical CV reviews. The platform connects you with active civilian scientists who guide you through every process.",
    rating: 5
  },
  {
    id: "t43",
    name: "Ravi Shankar Prasad",
    role: "Technical Trainee",
    location: "Munger, Bihar",
    sector: "Defence Civilian",
    subSector: "Ordnance Factory Board (Gun Carriage Factory)",
    achievement: "Passed OFB Special Apprentices Group",
    content: "Sankalp's mechanical blueprint readings and metallurgy video lectures made complex engineering problems clear. Safe to say, SANKALP is the absolute top platform for defense civilian jobs.",
    rating: 4
  },
  {
    id: "t44",
    name: "Inspector Amitosh Rawal",
    role: "Tactical Trainer",
    location: "Dehradun, Uttarakhand",
    sector: "Paramilitary",
    subSector: "ITBP",
    achievement: "Cleared SSC CPO ITBP Command selection",
    content: "I recommend SANKALP to all young jawans and direct entrants who want to clear departmental exams. The mock tests and current security situation summaries are incredibly accurate.",
    rating: 5
  },
  {
    id: "t45",
    name: "Lieutenant Kavita Bisht",
    role: "Air Defense Officer",
    location: "Gopalpur, Odisha",
    sector: "Defence Services",
    subSector: "Indian Army",
    achievement: "Cleared SSB (31 SSB Kapurthala)",
    content: "The psychological tests (TAT, WAT, SRT) on SANKALP have timed timers that simulate the exact stress of SSB. Knowing how to write short, positive responses under time limits made all the difference.",
    rating: 5
  },
  {
    id: "t46",
    name: "Prasenjit Sen",
    role: "Scientific Assistant B",
    location: "Kalpakkam, Tamil Nadu",
    sector: "Scientific / R&D",
    subSector: "BARC",
    achievement: "Direct entry exam cleared for Reactor Diagnostics",
    content: "Nuclear instrumentation modules on SANKALP are stellar. Navigating the selection syllabus was simplified because everything is placed in beautiful, responsive video formats.",
    rating: 5
  },
  {
    id: "t47",
    name: "Sub-Inspector Sandeep Negi",
    role: "Internal Security Analyst",
    location: "Agartala, Tripura",
    sector: "Paramilitary",
    subSector: "Assam Rifles",
    achievement: "Cleared Sub-Inspector Departmental Exams",
    content: "Sankalp’s courses outline border security and narcotics challenges beautifully. The lessons are relevant both for direct recruitment and internal departmental screening exams.",
    rating: 4
  },
  {
    id: "t48",
    name: "Ayush Saxena",
    role: "Trainee Software Analyst",
    location: "Delhi NCR",
    sector: "Defence Civilian",
    subSector: "Joint Cipher Bureau (JCB)",
    achievement: "Appointed in Cryptography & Cybersecurity Internship",
    content: "Sankalp’s defensive coding and military network security lectures are of world-class standard. The course material directly lined up with the interview panel's technical expectations.",
    rating: 5
  },
  {
    id: "t49",
    name: "Lieutenant Akhil Choudhary",
    role: "Technical Officer",
    location: "Jamnagar, Gujarat",
    sector: "Defence Services",
    subSector: "Indian Air Force (Aeronautical Branch)",
    achievement: "Cleared AFCAT Engineering Knowledge Test (EKT)",
    content: "Preparing EKT electronics can be frustrating as reference books are dry. SANKALP's communication and radar masterclasses with animated physics layouts made the exam layout incredibly simple to ace.",
    rating: 5
  },
  {
    id: "t50",
    name: "Rituja Salunkhe",
    role: "Project Intern",
    location: "Bengaluru, Karnataka",
    sector: "Scientific / R&D",
    subSector: "ISRO (LEOS Lab)",
    achievement: "Secured Lunar Optics Research Internship",
    content: "My dream of working with planetary payloads came alive through SANKALP. The optical sensor engineering study guide and direct guidance sessions from ex-LEOS staff helped me secure this rare opportunity.",
    rating: 5
  }
];
