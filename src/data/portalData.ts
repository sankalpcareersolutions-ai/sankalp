import { Course, Mentor, Internship, DailyTrivia } from "../types";

export const initialCourses: Course[] = [
  {
    id: "c1",
    title: "SSB Psychological Tests & Interview Masterclass",
    provider: "Sankalp Defence Academy • Led by Retd. SSB President",
    category: "Defence Services",
    duration: "6 Weeks",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600",
    description: "Prepare systematically for thematic apperception tests (TAT), word association tests (WAT), situation reaction tests (SRT), and overall self-description profiles. Features live mock interviews and personal evaluation reports.",
    syllabus: [
      "Introduction to 15 Officer Like Qualities (OLQs)",
      "TAT (Thematic Apperception Test) Story-Writing Techniques",
      "WAT (Word Association Test) Sentence Structuring",
      "SRT (Situation Reaction Test) Quick Solutions under Pressure",
      "Group Discussion & Group Planning Exercises (GPE) Rules",
      "One-on-One Live Mock Interview and Psychological Profiling feedback"
    ],
    enrolled: true,
    progress: 75,
    lessons: 24,
    studentsCount: 1450
  },
  {
    id: "c2",
    title: "DRDO Scientist 'B' Screening Exam Prep (Electronics & Comm.)",
    provider: "Sankalp Aerospace & Scientific Wing • Led by Ex-Scientist G",
    category: "Scientific / R&D",
    duration: "12 Weeks",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    description: "Comprehensive technical syllabus mapping for DRDO RAC scientist screening exam. Master electromagnetic field theory, radar systems, microwave engineering, and defense communication protocols.",
    syllabus: [
      "Review of core Electromagnetic Fields & Waves",
      "Radar Signal Processing & Target Echo Isolation",
      "Microwave Components & Antenna System Integrations",
      "Defense Cryptography & Secure Communique Channels",
      "DRDO RAC Previous Years Question Paper Reviews",
      "Full-length Mock Exams & One-on-One Technical Board Simulation"
    ],
    enrolled: false,
    progress: 0,
    lessons: 48,
    studentsCount: 890
  },
  {
    id: "c3",
    title: "Aerospace Propulsion & Satellite Engineering Basics",
    provider: "Space Systems Faculty • Led by Ex-ISRO Division Head",
    category: "Scientific / R&D",
    duration: "8 Weeks",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=600",
    description: "Learn the core concepts of rocket science, propulsion mechanics (solid, liquid, cryogenic), and satellite orbital geometry. Excellent prep for ISRO Scientific Assistant / Scientist SC aspirants.",
    syllabus: [
      "Basics of Orbital Dynamics & Launch Trajectories",
      "Chemical Propulsion: Liquid Engines vs. Solid Motors",
      "Cryogenic Upper Stages and Low-Temp Metallurgy",
      "Satellite Payload Subsystems and Thermal Shielding",
      "ISRO ICRB Aeronautical/Aptitude Question Reviews",
      "Special Assignment: Dynamic satellite track mapping and calculations"
    ],
    enrolled: true,
    progress: 30,
    lessons: 32,
    studentsCount: 1120
  },
  {
    id: "c4",
    title: "UPSC CAPF (Assistant Commandant) GS & Security Paper Mastery",
    provider: "Sankalp Paramilitary Wing • Led by UPSC CAPF Toppers",
    category: "Paramilitary",
    duration: "10 Weeks",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600",
    description: "Specialized focus on internal security dynamics, international borders of India, infiltration controls, and essay-writing tactics for General Studies, Essay, and Comprehension Paper-II.",
    syllabus: [
      "Indian Security Forces Operations & Regional Border Mandates",
      "Internal Insurgency, Left-Wing Extremism & Counter-Strategies",
      "India's Bilateral Defense Agreements & Maritime Sovereignty",
      "Precise Essay-Drafting Frame & Vocabulary Rules for Paper-II",
      "UPSC CAPF AC Mock Review & Evaluator Feedback Loop",
      "Physical standards counseling and Medical Prep Webinar"
    ],
    enrolled: false,
    progress: 0,
    lessons: 40,
    studentsCount: 650
  },
  {
    id: "c5",
    title: "Military Engineers Services (MES) civilian entrance guide",
    provider: "Civils Division • Led by Ex-Superintending Engineer",
    category: "Civilian Jobs",
    duration: "8 Weeks",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
    description: "A comprehensive course designed for civil and mechanical engineers targeting the MES (Military Engineer Services) recruitment. Covers military cantonment codes, construction safety, and contract law.",
    syllabus: [
      "MES Administrative Structure & Engineering Work Classifications",
      "Cantt. Board Regulations & Military Spatial Planning",
      "Contract Bidding, Evaluation and Military Quality Control",
      "Structural Terrain Stabilization in Border Areas",
      "MES Mock General Aptitude & Professional Subject Tests",
      "Past interview papers and civilian integration reviews"
    ],
    enrolled: false,
    progress: 0,
    lessons: 30,
    studentsCount: 420
  },
  {
    id: "c6",
    title: "Tactical Physical Conditioning & Endurance Blueprint",
    provider: "Physical Tactics Wing • Led by Ex-Special Forces Commando",
    category: "Defence Services",
    duration: "4 Weeks",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    description: "The complete roadmap to clear physical tests for NDA/CDS/UPSC CAPF/SSC CPO. Learn breathing control during long runs, building flexibility, diet programs, and avoiding injuries.",
    syllabus: [
      "Testing Protocols: Running (1.6 km / 800m), Chin-ups, Long Jump, High Jump",
      "Cardiovascular HIIT Endurance Plan to increase Lung Output",
      "Strength conditioning using military compound workouts",
      "Optimal nutrition, calorie balance, and hydration schedules",
      "Injury prevention, warm-down practices, and shin-splint care",
      "Weekly virtual physical progress submission and rating"
    ],
    enrolled: false,
    progress: 0,
    lessons: 16,
    studentsCount: 2350
  },
  {
    id: "c7",
    title: "Google Professional Cybersecurity Certificate",
    provider: "Google Certified Partners • Integrated with Sankalp Security Wing",
    category: "Scientific / R&D",
    duration: "8 Weeks",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    description: "Learn professional cybersecurity workflows directly certified by Google. Master network socket analysis (Nmap), system logs audits with Linux commands, secure network designs, Python threat mapping automation, and cloud security frameworks (GCP Security Architecture).",
    syllabus: [
      "Foundations of Cybersecurity: Identifying Corporate and National Threats",
      "Network Defensive Diagnostics & Splunk Traffic Sniffing",
      "Linux Command Line Interface, Scripting and SSH Keys Management",
      "Python Automation script building for Real-time Intrusion Detection",
      "SIEM Event Logging, Nmap Active Port Scans and Firewall rules validation",
      "Final Capstone Project: Conducting security audits for critical communications infrastructure"
    ],
    enrolled: false,
    progress: 0,
    lessons: 32,
    studentsCount: 1420
  },
  {
    id: "c8",
    title: "Google AI & Generative Intelligence Essentials",
    provider: "Google AI Specialists • Special Focus on Defense Data Intelligence",
    category: "Civilian Jobs",
    duration: "6 Weeks",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600",
    description: "A comprehensive certified course focusing on large language models, structured generative prompting, and administrative automation with Vertex AI. Build functional skills for analysis of big technical data grids.",
    syllabus: [
      "Unveiling Generative Artificial Intelligence Protocols and Transformer Networks",
      "Google Gemini Prompt Optimization & Advanced Spatial Analytics Formulas",
      "Coding Assistance and Administrative Workflow Automation with Vertex AI Platforms",
      "Data Decryption and Large-Scale Semantic Pattern Extraction in Defense Intelligence",
      "AI Ethic Standards, Safety Guardrails and Hallucination Mitigations",
      "Dynamic Capstone: Custom threat level classification pipeline with Google Gemini Model"
    ],
    enrolled: false,
    progress: 0,
    lessons: 24,
    studentsCount: 1980
  }
];

export const mentors: Mentor[] = [
  {
    id: "m_founder",
    name: "Sankalp Founder & Lead Counselor",
    rankRole: "Indian Navy Veteran",
    experience: "More than 20 Years of Experience",
    specialty: "SSB Psychology, HR Psychometrics, Marine Architecture & Strategic Mentoring",
    organization: "Indian Navy",
    bio: "Distinguished record as an Indian Navy Veteran with more than 20 years of active operational experience in the Indian Defence Sector, marine architecture, and high-intensity mentoring commissions.",
    rating: 5.0,
    availableSlots: [
      "0500hrs - 0530hrs (Morning)",
      "0530hrs - 0600hrs (Morning)",
      "1730hrs - 1800hrs (Evening)",
      "2100hrs - 2130hrs (Evening)",
      "2130hrs - 2200hrs (Evening)"
    ]
  }
];

export const initialInternships: Internship[] = [
  {
    id: "i1",
    title: "Junior Research Fellow (JRF) - Defense Telecom",
    organization: "DRDO",
    type: "Fellowship",
    location: "Solid State Physics Laboratory (SSPL), New Delhi",
    stipend: "₹37,000 / Month + HRA",
    deadline: "June 25, 2026",
    eligibility: "B.Tech/M.Tech Electronics & Comm with valid GATE rank OR M.Sc Physics (Electronics specialization)",
    description: "Participate in designing core gallium nitride high-frequency transistor chips for army transceiver applications. Work alongside principal scientists on semiconductor micro-fabrication.",
    keySkills: ["GaAs/GaN Semiconductors", "RF Telecom", "Electromagnetism Theory", "EDA simulation tools"],
    applied: false
  },
  {
    id: "i2",
    title: "Launch Systems Trainee Associate",
    organization: "ISRO",
    type: "Internship",
    location: "Satish Dhawan Space Centre (SDSC - SHAR), Sriharikota",
    stipend: "₹25,000 / Month (Consolidated)",
    deadline: "July 12, 2026",
    eligibility: "Final Year B.Tech / M.Tech in Aerospace, Aerospace Electronics, or Mechanical Engineering",
    description: "Support integration teams working on mechanical launch rail stress validation and telemetry antennas for subsequent Polar Satellite Launch Vehicle (PSLV) launches.",
    keySkills: ["Finite Element Analysis", "Launch Trajectories", "Solid Mechanics", "SolidWorks / MATLAB"],
    applied: false
  },
  {
    id: "i3",
    title: "Radioisotope Modeling Placement Trainee",
    organization: "BARC",
    type: "Placement Trainee",
    location: "Radiological Safety Lab, Kalpakkam / Trombay Labs",
    stipend: "₹35,000 / Month + On-Campus Hostel",
    deadline: "June 30, 2026",
    eligibility: "M.Sc Physics / M.Sc Chemistry with 60%+ marks or equivalent B.Tech Engineering Physics degree",
    description: "Invaluable training assignment involving heavy water simulation grids, radiological decay tracking, and writing software routines mapping isotope thermal dissipation flows.",
    keySkills: ["Radiological Safety Basics", "Nuclear Simulation", "Python/C++ Coding", "Thermodynamics"],
    applied: false
  },
  {
    id: "i4",
    title: "Cyber Defence Analyst Trainee",
    organization: "Border Security Force",
    type: "Internship",
    location: "BSF Communication HQ, New Delhi",
    stipend: "₹20,000 / Month",
    deadline: "June 18, 2026",
    eligibility: "B.Tech Computer Science / Cybersecurity with knowledge of packet tracing, firewalls & network sniffing",
    description: "Collaborate in verifying security audits of BSF regional border command networks and designing secure Android system skins mapping border outpost geographic markers.",
    keySkills: ["Packet Capture Analysis", "Penetration Testing", "Regional Encryption", "Mobile Safety Arch"],
    applied: false
  },
  {
    id: "i5",
    title: "Armament Quality Assurance Intern",
    organization: "DGQA",
    type: "Internship",
    location: "Controllerate of Quality Assurance (Weapons) - Jabalpur",
    stipend: "₹22,000 / Month",
    deadline: "July 05, 2026",
    eligibility: "B.Tech Metallurgy / Manufacturing Engineering / Production Tech",
    description: "Assist military inspectors during high-impact testing of small caliber firearms and analyzing stress stress structural deformations of barrel components under high heat.",
    keySkills: ["Stress-Strain Testing", "Caliber Precision Check", "Defence Quality Norms", "Material Hardness"],
    applied: false
  }
];

export const dailyTriviaPool: DailyTrivia[] = [
  {
    question: "What is the highest civilian role inside the Ministry of Defence, Government of India?",
    options: [
      "Chief of Defence Staff (CDS)",
      "Defence Secretary",
      "Cabinet Secretary",
      "Defence Research and Development Chairman"
    ],
    correctAnswer: 1,
    explanation: "While the CDS is the senior-most uniformed military advisor, the Defence Secretary (an IAS Officer of Secretary Rank) is the highest civilian administrative head of the Ministry of Defence."
  },
  {
    question: "Which DRDO laboratory is primarily responsible for the development of main battle tanks like the 'Arjun'?",
    options: [
      "ARDE (Armament Research & Dev. Est.), Pune",
      "DLRL (Defence Electronics Research Lab), Hyderabad",
      "CVRDE (Combat Vehicles Research & Dev. Est.), Avadi",
      "HEMRL (High Energy Materials Research Lab), Pune"
    ],
    correctAnswer: 2,
    explanation: "CVRDE located at Avadi in Ambattur, Chennai, Tamil Nadu is the premier laboratory of DRDO tasked with the design and integration of combat vehicles and tanks."
  },
  {
    question: "Which of the following is the oldest paramilitary force in India?",
    options: [
      "Assam Rifles",
      "Border Security Force (BSF)",
      "Central Reserve Police Force (CRPF)",
      "Indo-Tibetan Border Police (ITBP)"
    ],
    correctAnswer: 0,
    explanation: "Assam Rifles is India's oldest paramilitary force, established in the year 1835 under the name 'Cachar Levy'. It is termed the 'Sentinels of the Northeast'."
  },
  {
    question: "Where is the Indian Space Research Organisation's Propulsive Liquid Engine facility (LPSC) headquartered?",
    options: [
      "Sriharikota, Andhra Pradesh",
      "Valiamala, Thiruvananthapuram",
      "Mahendragiri, Tamil Nadu",
      "Bengaluru, Karnataka"
    ],
    correctAnswer: 1,
    explanation: "LPSC has its main research center and headquarters at Valiamala in Thiruvananthapuram, Kerala, and an engine testing unit at Mahendragiri, Tamil Nadu."
  },
  {
    question: "Which organization conducts the entry scheme known as ‘OCES’ and ‘DGFS’ for engineering and physics post-graduates?",
    options: [
      "ISRO",
      "BARC",
      "DRDO",
      "Indian Air Force"
    ],
    correctAnswer: 1,
    explanation: "BARC (Bhabha Atomic Research Centre) recruits Scientific Officers Class-A through its prestigious OCES (Orientation Course for Engineering Graduates and Science Postgraduates) and DGFS (DAE Graduate Fellowship Scheme)."
  }
];
