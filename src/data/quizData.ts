export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  olqTrait?: string;
  category?: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name or emoji representation
  duration: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export const quizTopics: QuizTopic[] = [
  {
    id: "olq_traits",
    title: "OLQ & Psychological Evaluation",
    description: "Assess your alignment with the 15 Officer Like Qualities (OLQs) including Initiative, Cooperation, and Ability to Influence Groups, designed to match the SSB (Services Selection Board) criteria.",
    icon: "ShieldCheck",
    duration: "5 Mins",
    totalQuestions: 5,
    questions: [
      {
        id: "olq_1",
        question: "During a tactical night navigation training, your team leader gets injured and communication is lost. Which is the most appropriate action reflecting high 'Initiative' and 'Decision Making'?",
        options: [
          "Wait at the current secure position for a rescue team to find you.",
          "Assume command, administer first aid, stabilize the leader, and guide the team to the nearest rendezvous point using map coordinates.",
          "Leave the leader with one member and rush back to the base camp alone to get immediate help.",
          "Ask for a vote among the remaining team members on how to proceed."
        ],
        correctAnswer: 1,
        explanation: "In military scenarios, 'Initiative' and 'Speed of Decision' require taking immediate charge under uncertainty, prioritizing life-saving first-aid, stabilizing the casualty, and moving the group cohesively using navigational skills.",
        olqTrait: "Initiative & Sense of Responsibility"
      },
      {
        id: "olq_2",
        question: "Your team is building a rope bridge during a Group Obstacle Task (GORT). One teammate is slow and constantly making mistakes, delaying the entire group. What is the correct way to handle this?",
        options: [
          "Report the teammate's incompetence to the GTO (Group Testing Officer) so your score is not affected.",
          "Ignore him and do all the work yourself to ensure the project is completed on time.",
          "Encourage him, give him a simpler but crucial support task, and guide him through it to maintain team synergy.",
          "Tell him to stand aside and watch so that the team can complete the bridge without further delays."
        ],
        correctAnswer: 2,
        explanation: "This directly tests 'Cooperation' and 'Social Adaptability'. A true leader does not leave anyone behind or complain; instead, they adapt, encourage, and allocate roles based on capability to achieve the collective mission.",
        olqTrait: "Cooperation & Social Adaptability"
      },
      {
        id: "olq_3",
        question: "You are tasked with presenting a counter-strategy during a Group Planning Exercise (GPE). Most team members disagree with your tactical route choice. How do you respond?",
        options: [
          "Concede immediately to avoid conflict and maintain team harmony.",
          "Loudly argue that your route is the only correct path and refuse to listen to other suggestions.",
          "Present your rationale calmly with logical trade-offs, listen to their concerns, and co-create a hybrid plan that satisfies the safety criteria.",
          "Remain silent and let the group implement their flawed route without your active participation."
        ],
        correctAnswer: 2,
        explanation: "This tests 'Ability to Influence the Group' and 'Liveliness'. A candidate must be confident, logical, and persuasive while remaining open-minded and respectful of other viewpoints to reach a consensus.",
        olqTrait: "Ability to Influence the Group"
      },
      {
        id: "olq_4",
        question: "Which of the following traits is most vital for 'Effective Intelligence' (one of the core cognitive OLQs)?",
        options: [
          "Having a high academic percentage in your technical degree.",
          "The practical ability to find solutions to sudden, hands-on, and complex problems using available resources.",
          "The capacity to memorize military manuals, facts, and strategic histories.",
          "The physical stamina to run long distances under high temperature."
        ],
        correctAnswer: 1,
        explanation: "Effective Intelligence is not pure academic IQ. It is the practical, common-sense capability to cope with sudden, complex situations, and find functional solutions using whatever resources are at hand.",
        olqTrait: "Effective Intelligence"
      },
      {
        id: "olq_5",
        question: "If a commander issues a direct strategic order that you believe contains a high-risk navigational error, what is your duty?",
        options: [
          "Obey the order blindly without saying a word, as military discipline is absolute.",
          "Refuse to execute the order and lock yourself in your cabin in protest.",
          "Briefly and respectfully point out the specific risk to the commander in private with a proposed corrective alternative, but ultimately execute the final decision of the command.",
          "Complain to a higher-ranking commander immediately behind your leader's back."
        ],
        correctAnswer: 2,
        explanation: "This tests 'Moral Courage' and 'Sense of Responsibility'. Constructive feedback to avoid disaster is valued in modern professional militaries, but it must be conveyed respectfully and privately, keeping chain of command intact.",
        olqTrait: "Sense of Responsibility & Courage"
      }
    ]
  },
  {
    id: "scientific_reasoning",
    title: "Scientific Reasoning & Ballistics",
    description: "Test your analytical skills in physics, projectile mechanics, propulsion systems, and aerospace dynamics essential for DRDO, ISRO, and technological military applications.",
    icon: "Compass",
    duration: "7 Mins",
    totalQuestions: 5,
    questions: [
      {
        id: "sci_1",
        question: "To maximize the horizontal range of a ballistic missile launched on a flat terrain (neglecting air resistance), at what angle relative to the horizon should it theoretically be fired?",
        options: [
          "30 degrees",
          "45 degrees",
          "60 degrees",
          "90 degrees"
        ],
        correctAnswer: 1,
        explanation: "According to classical projectile motion, the range equation R = (u² * sin(2θ)) / g is maximized when sin(2θ) = 1, which occurs when the launch angle θ = 45°.",
        category: "Ballistic Mechanics"
      },
      {
        id: "sci_2",
        question: "Why do hypersonic missiles (flying at speeds greater than Mach 5) present an extreme thermal challenge to structural materials?",
        options: [
          "They pass close to the sun's atmospheric radiation bands.",
          "Adiabatic compression and intense friction of the air at high speed create extreme temperatures exceeding 2000°C on the leading edges.",
          "The solid propellants inside generate internal heat that radiates outwards.",
          "Hypersonic speeds trigger spontaneous nuclear fission in the surrounding nitrogen molecules."
        ],
        correctAnswer: 1,
        explanation: "At hypersonic speeds (Mach 5+), the air in front of the missile's nose cone and wings is compressed severely (adiabatic compression) and rubbed at high speeds, creating shockwaves and friction that raise temperatures to thousands of degrees Celsius.",
        category: "Thermodynamics"
      },
      {
        id: "sci_3",
        question: "What physical law explains the recoil of a heavy artillery cannon when it fires a high-velocity shell?",
        options: [
          "Newton's First Law of Motion (Inertia)",
          "Newton's Third Law of Motion (Action & Reaction)",
          "Kepler's Second Law of Planetary Motion",
          "The Law of Universal Gravitation"
        ],
        correctAnswer: 1,
        explanation: "Recoil is a direct application of Newton's Third Law (For every action, there is an equal and opposite reaction). The forward force driving the heavy shell generates an equal and opposite force pushing the cannon backwards.",
        category: "Classical Mechanics"
      },
      {
        id: "sci_4",
        question: "In orbital mechanics, what is the key characteristic of a Geostationary Earth Orbit (GEO)?",
        options: [
          "The satellite completes one orbit every 90 minutes in a polar trajectory.",
          "The satellite stays stationary in space and does not orbit at all.",
          "The orbital period matches the Earth's rotation period (24 hours), keeping the satellite locked over a fixed point on the equator.",
          "The orbit is highly elliptical, passing very close to the Earth's poles to maximize global image mapping."
        ],
        correctAnswer: 2,
        explanation: "A geostationary orbit (GEO) is a circular orbit 35,786 km directly above the Earth's equator. It rotates in the same direction as Earth with a period equal to Earth's rotation (24 hours), appearing completely stationary in the sky to ground receivers.",
        category: "Orbital Dynamics"
      },
      {
        id: "sci_5",
        question: "Which material is highly preferred for building lightweight stealth aircraft structures due to its exceptionally high strength-to-weight ratio and low radar cross-section reflectivity?",
        options: [
          "Cast Iron",
          "Carbon-Fiber Reinforced Polymer (CFRP) Composites",
          "Stainless Steel Alloys",
          "Pure Lead sheets"
        ],
        correctAnswer: 1,
        explanation: "CFRP composite materials are incredibly strong, extremely light, and have excellent radar-absorbing structural profiles, making them highly desirable for modern stealth and supersonic fighter frames.",
        category: "Materials Science"
      }
    ]
  },
  {
    id: "strategic_awareness",
    title: "Strategic Defence Awareness",
    description: "Challenge your command of the military structure, historical events, advanced assets, and defense protocols of the Indian Armed Forces.",
    icon: "Shield",
    duration: "4 Mins",
    totalQuestions: 5,
    questions: [
      {
        id: "strat_1",
        question: "Who is the supreme commander of the Indian Armed Forces under the Constitution of India?",
        options: [
          "The Chief of Defence Staff (CDS)",
          "The Prime Minister of India",
          "The President of India",
          "The Union Minister of Defence"
        ],
        correctAnswer: 2,
        explanation: "Article 53(2) of the Indian Constitution states that the supreme command of the Defence Forces of the Union shall be vested in the President of India.",
        category: "Command Structure"
      },
      {
        id: "strat_2",
        question: "What is the primary role of INS Arihant in India's nuclear triad strategy?",
        options: [
          "It is India's flagship aircraft carrier capable of launching Rafale-M fighters.",
          "It is India's indigenous nuclear-powered ballistic missile submarine (SSBN), providing an assured second-strike capability.",
          "It is a heavy-duty stealth destroyer equipped with BrahMos supersonic missiles.",
          "It is an intelligence-gathering radar station based in the Andaman and Nicobar Islands."
        ],
        correctAnswer: 1,
        explanation: "INS Arihant is India's first indigenously designed and built nuclear-powered ballistic missile submarine (SSBN). It completes India's nuclear triad, assuring a survivable retaliatory nuclear second-strike option from under the ocean.",
        category: "Naval Assets"
      },
      {
        id: "strat_3",
        question: "Which joint command is India's first and only fully operational tri-service theatre command (integrating Army, Navy, and Air Force under a single commander)?",
        options: [
          "The Southern Command",
          "The Strategic Forces Command (SFC)",
          "The Andaman and Nicobar Command (ANC)",
          "The Eastern Naval Command"
        ],
        correctAnswer: 2,
        explanation: "The Andaman and Nicobar Command (ANC), created in 2001, is India's first and only active tri-service theater command, integrating assets from the Indian Army, Navy, and Air Force to protect India's strategic interests in the Bay of Bengal and Indian Ocean.",
        category: "Joint Operations"
      },
      {
        id: "strat_4",
        question: "The indigenous LCA Tejas fighter aircraft, developed by HAL, belongs to which category of fighter generation?",
        options: [
          "3rd Generation",
          "4th to 4.5 Generation",
          "5th Generation with active stealth",
          "2nd Generation vintage"
        ],
        correctAnswer: 1,
        explanation: "LCA Tejas is an indigenously developed, single-engine, delta-wing multirole light fighter. It is classified as a 4.5 generation supersonic fighter aircraft, featuring glass cockpits, digital fly-by-wire flight control, and composite structures.",
        category: "Air Power"
      },
      {
        id: "strat_5",
        question: "What is the significance of 'Operation Meghdoot' launched by the Indian Army in 1984?",
        options: [
          "The successful liberation of Goa from Portuguese rule.",
          "The pre-emptive securing of the strategic Siachen Glacier, establishing the highest battlefield on Earth.",
          "The counter-insurgency operation in Mizoram.",
          "The naval blockade of Karachi harbor during the 1971 war."
        ],
        correctAnswer: 1,
        explanation: "Operation Meghdoot was launched on April 13, 1984, to secure control of the Siachen Glacier in Ladakh. It was a historic high-altitude success, resulting in India establishing military dominance over the entire saltoro ridge and glacier.",
        category: "Military History"
      }
    ]
  }
];
