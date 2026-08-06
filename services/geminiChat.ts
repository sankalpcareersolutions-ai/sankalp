import { GoogleGenAI } from "@google/genai";
import { logger } from "./logger";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp?: number;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  studentContext?: {
    currentClass?: string;
    stream?: string;
    targetExam?: string;
    careerInterest?: string;
  };
}

export interface ChatResponse {
  reply: string;
  suggestedQuestions?: string[];
  recommendedAction?: {
    type: "BOOK_APPOINTMENT" | "WHATSAPP" | "CAREER_LIBRARY" | "EXAM_ALERTS";
    label: string;
    payload?: string;
  };
}

// System Instruction defining "Aayu" - The CareerCounsellingHub AI Guide
const AAYU_SYSTEM_INSTRUCTION = `You are "Aayu" (आयु), the intelligent, encouraging, and deeply knowledgeable AI Career & Education Counsellor for "CareerCounsellingHub" (sankalpcareersolutions@gmail.com, website: www.careercounsellinghub.com).

YOUR IDENTITY & PURPOSE:
- You are a dedicated student mentor designed to empower Indian students (Classes 8th to 12th, College Undergraduates, Graduates, and Defence Aspirants) and their parents.
- You provide clear, well-structured, unbiased, and actionable career guidance, educational roadmap planning, and sovereign entrance exam advice.
- Senior Counselling Panel at CareerCounsellingHub brings decades of experience guiding youth into premier civilian careers, top universities, and the Indian Armed Forces (Army, Navy, Air Force).

CORE KNOWLEDGE DOMAINS:
1. STREAM SELECTION (After 10th):
   - Science PCM: Engineering, Architecture, Defence (NDA/TES/Navy 10+2 Cadet), Aviation/Commercial Pilot, Pure Sciences, Data Science, Cyber Security.
   - Science PCB/PCMB: MBBS, BDS, AYUSH, Nursing (MNS - Military Nursing Service), Biotechnology, Pharmacy, Allied Health, Forensic Science.
   - Commerce (with/without Maths): CA, CS, CMA, B.Com, BBA, Economics, Actuarial Science, Investment Banking, Fintech.
   - Arts & Humanities: Civil Services (UPSC CSE), Law (CLAT/AILET), Psychology, Journalism & Mass Comm, International Relations, Design (NID/UCEED), Hotel Management.

2. SOVEREIGN & COMPETITIVE EXAMS:
   - Engineering & Tech: JEE Main, JEE Advanced, BITSAT, State CETs, GATE.
   - Medical & Healthcare: NEET-UG, NEET-PG, AIIMS, NEET for MNS (Military Nursing Service).
   - University Admissions: CUET-UG & CUET-PG (Central Universities), IPMAT (IIM 5-Year Integrated Management).
   - Civil Services & Govt: UPSC CSE, State PSCs, SSC CGL.
   - Defence Entries:
     * After 10+2: NDA (National Defence Academy - Army/Navy/Air Force), TES (Technical Entry Scheme - Army), 10+2 Navy B.Tech Cadet Entry Scheme.
     * After Graduation: CDS (Combined Defence Services - IMA, INA, AFA, OTA), AFCAT (Air Force Common Admission Test), TGC (Technical Graduate Course), SSC Tech, NCC Special Entry.
     * SSB Interview (Service Selection Board): 5-Day Testing protocol including Stage-1 (OIR + PPDT) and Stage-2 (Psychological Tests, GTO Outdoor Tasks, Personal Interview, Conference) with assessment of 15 Officer Like Qualities (OLQs).

3. COLLEGE & UNIVERSITY GUIDANCE:
   - NIRF Rankings, accreditation (NAAC/NBA), cut-offs, fee structures, scholarship options, and placements.

4. CAREERCOUNSELLINGHUB PLATFORM SERVICES:
   - 1:1 Personalized Online Video Consultation (with complete psychometric assessment & roadmap report).
   - Comprehensive Career Library covering 150+ career paths in detail.
   - Sovereign Exam Tracker & Notification Alerts.
   - Direct WhatsApp Counselling Desk: +91 85283 35708.
   - Official Portal: https://www.careercounsellinghub.com.

RESPONSE STYLE & GUIDELINES:
- Greet warmly as "Aayu". Keep an encouraging, respectful, and motivating tone.
- Structure answers clearly using Markdown: bold key terms, use bullet points, steps, or numbered lists.
- For exam queries: always include Eligibility (Age, Education, Subjects), Exam Pattern, Key Stages, and Preparation Timeline.
- For defence queries: highlight eligibility, physical/medical standards, and SSB preparation focus areas.
- If a student feels confused, anxious, or overwhelmed, validate their concerns and give a step-by-step decision framework.
- Whenever appropriate, invite the student to book a personalized 1:1 session with Senior Counsellors on the platform or connect via WhatsApp (+91 85283 35708) for personalized file review.
- Language: You can respond in English or Hinglish/Hindi depending on the student's language, ensuring maximum clarity.`;

class GeminiChatService {
  private client: GoogleGenAI | null = null;
  private isInitialized = false;

  private getClient(): GoogleGenAI {
    if (!this.client) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured");
      }
      this.client = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      this.isInitialized = true;
    }
    return this.client;
  }

  /**
   * Process a student query with Aayu
   */
  async sendMessage(req: ChatRequest): Promise<ChatResponse> {
    const startTime = performance.now();
    const userMessage = req.message.trim();

    if (!userMessage) {
      return {
        reply: "Hello! I am Aayu, your AI Career Guide at CareerCounsellingHub. What career or exam questions can I help you explore today?",
        suggestedQuestions: [
          "Best career options after 12th PCM",
          "How to join Indian Army after 12th through NDA?",
          "Career roadmap for NEET & Medical Sciences",
          "Book 1:1 Career Counselling Session",
        ],
      };
    }

    try {
      const ai = this.getClient();

      // Format conversation history for multi-turn chat
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      // Append previous history if provided (limit to last 12 turns for speed & context)
      if (req.history && Array.isArray(req.history)) {
        const recentHistory = req.history.slice(-12);
        for (const msg of recentHistory) {
          if (msg.text && (msg.role === "user" || msg.role === "model")) {
            contents.push({
              role: msg.role,
              parts: [{ text: msg.text }],
            });
          }
        }
      }

      // Append contextual student profile if available
      let promptText = userMessage;
      if (req.studentContext && Object.keys(req.studentContext).length > 0) {
        const ctx = req.studentContext;
        const contextString = `[Student Profile Context: Class: ${ctx.currentClass || "N/A"}, Stream: ${ctx.stream || "N/A"}, Target Exam: ${ctx.targetExam || "N/A"}, Interest: ${ctx.careerInterest || "N/A"}]`;
        promptText = `${contextString}\n\nStudent Question: ${userMessage}`;
      }

      contents.push({
        role: "user",
        parts: [{ text: promptText }],
      });

      // Call Gemini 3.5 Flash for fast, highly articulate conversational reasoning
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: AAYU_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const replyText = response.text || "I'm here to help you with your career and academic journey. Could you please share a bit more detail about your question?";
      const duration = performance.now() - startTime;

      logger.info("CHAT", "AAYU_CHAT_SUCCESS", `Aayu answered query in ${Math.round(duration)}ms`, {
        userQuerySnippet: userMessage.slice(0, 60),
        historyLength: req.history?.length || 0,
        responseLength: replyText.length,
        durationMs: Math.round(duration),
      });

      // Generate context-aware follow-up suggestion chips
      const suggestedQuestions = this.generateSuggestions(userMessage, replyText);
      const recommendedAction = this.deriveRecommendedAction(userMessage, replyText);

      return {
        reply: replyText,
        suggestedQuestions,
        recommendedAction,
      };
    } catch (err: any) {
      const duration = performance.now() - startTime;
      logger.warn("CHAT", "AAYU_FALLBACK_TRIGGERED", "Gemini API unavailable or fallback invoked", {
        error: err.message,
        durationMs: Math.round(duration),
      });

      // Provide high-quality fallback counseling response when API key is missing or offline
      return this.generateFallbackResponse(userMessage);
    }
  }

  private generateSuggestions(query: string, reply: string): string[] {
    const q = query.toLowerCase();
    const r = reply.toLowerCase();

    if (q.includes("nda") || q.includes("army") || q.includes("navy") || q.includes("air force") || q.includes("defence") || q.includes("ssb")) {
      return [
        "What is the SSB Interview 5-day procedure?",
        "Difference between NDA and TES entry after 12th",
        "Physical & Medical fitness requirements for Defence",
        "Book 1:1 Defence Mentorship Session",
      ];
    }

    if (q.includes("10th") || q.includes("stream") || q.includes("pcm") || q.includes("pcb") || q.includes("commerce") || q.includes("arts")) {
      return [
        "What high-paying careers can I choose after PCM?",
        "Can I appear for NDA if I take Commerce or Arts?",
        "NEET vs CUET vs Biotechnology roadmap",
        "Schedule 1:1 Stream Selection Counselling",
      ];
    }

    if (q.includes("jee") || q.includes("neet") || q.includes("cuet") || q.includes("upsc") || q.includes("exam")) {
      return [
        "How to balance Board Exams with JEE/NEET prep?",
        "Top Central Universities accepting CUET score",
        "View upcoming sovereign exam dates on CareerCounsellingHub",
        "Get custom timetable & roadmap from Senior Counsellors",
      ];
    }

    return [
      "Top emerging careers in AI, Tech & Defence for 2026-2030",
      "How to choose between Engineering and Armed Forces?",
      "Can I connect with senior counsellor on WhatsApp?",
      "Book 1:1 Personalized Online Consultation",
    ];
  }

  private deriveRecommendedAction(query: string, reply: string) {
    const q = query.toLowerCase();
    if (q.includes("book") || q.includes("consult") || q.includes("mentor") || q.includes("appointment") || q.includes("session")) {
      return {
        type: "BOOK_APPOINTMENT" as const,
        label: "Book 1:1 Consultation with Senior Counsellor",
      };
    }

    if (q.includes("whatsapp") || q.includes("call") || q.includes("contact") || q.includes("phone") || q.includes("number")) {
      return {
        type: "WHATSAPP" as const,
        label: "Chat on WhatsApp (+91 85283 35708)",
        payload: "https://wa.me/918528335708?text=Hello%20Aayu,%20I%20need%20career%20guidance.",
      };
    }

    if (q.includes("library") || q.includes("roadmap") || q.includes("salary") || q.includes("courses") || q.includes("options")) {
      return {
        type: "CAREER_LIBRARY" as const,
        label: "Explore 150+ Careers in Career Library",
      };
    }

    return undefined;
  }

  private generateFallbackResponse(query: string): ChatResponse {
    const q = query.toLowerCase();
    let reply = `Namaste! I am **Aayu**, your AI Career & Education Mentor at CareerCounsellingHub.\n\n`;

    if (q.includes("nda") || q.includes("defence") || q.includes("army") || q.includes("ssb")) {
      reply += `### Defence Career Pathways (Indian Armed Forces)\n\n` +
        `Joining the Indian Armed Forces as a Commissioned Officer is one of the most prestigious paths in the nation.\n\n` +
        `**Key Entry Routes After 10+2:**\n` +
        `- **NDA (National Defence Academy):** Conducted twice a year by UPSC for Army, Navy, and Air Force wings. (Age: 16.5 - 19.5 yrs).\n` +
        `- **TES (Technical Entry Scheme - Army):** Direct SSB interview for 10+2 PCM students based on JEE Main CRL rank + 60% in PCM.\n` +
        `- **10+2 Navy B.Tech Cadet Entry Scheme:** Direct SSB interview for Naval Academy through JEE Main rank.\n\n` +
        `**After Graduation:**\n` +
        `- **CDS Exam:** For IMA, INA, AFA, and OTA (Short Service Commission).\n` +
        `- **AFCAT:** For Flying and Ground Duty branches in the Indian Air Force.\n\n` +
        `> **Expert Defence Tip:** SSB assesses 15 Officer Like Qualities (OLQs) including effective intelligence, social adaptability, initiative, and determination. Cultivating physical fitness and current affairs awareness daily is vital.\n\n` +
        `Would you like to book a 1:1 mentoring session with our Senior Counsellor or explore SSB preparation?`;
    } else if (q.includes("pcm") || q.includes("stream") || q.includes("10th") || q.includes("career")) {
      reply += `### Stream Selection & Career Guidance Framework\n\n` +
        `Choosing the right stream after 10th or degree after 12th should align with your **Aptitude, Interest, and Personality (AIP Framework)**.\n\n` +
        `**Top Paths by Stream:**\n` +
        `- **Science PCM:** Computer Science & AI, Aerospace, Robotics, Civil/Mechanical Engineering, Architecture (NATA), NDA/Armed Forces, Commercial Pilot Training, Cyber Security.\n` +
        `- **Science PCB:** Medicine (MBBS/BDS), Military Nursing Service (MNS), Biotechnology, Biomedical Sciences, Forensic Science, Pharmacy, Clinical Psychology.\n` +
        `- **Commerce:** Chartered Accountancy (CA), Company Secretary (CS), Investment Banking, Corporate Law (CLAT), Fintech, Management (IPMAT / BBA).\n` +
        `- **Humanities / Arts:** UPSC Civil Services, Corporate & Constitutional Law, International Relations, Industrial Psychology, Product & UI/UX Design, Mass Media.\n\n` +
        `Would you like to take our in-depth career evaluation or consult 1:1 with our senior counselling panel?`;
    } else {
      reply += `I can guide you across:\n\n` +
        `1. **Stream Selection** (Science, Commerce, Arts/Humanities)\n` +
        `2. **Competitive Exams** (JEE, NEET, CUET, UPSC, NDA, CDS, AFCAT, MNS)\n` +
        `3. **Defence Entry Schemes & SSB Interview Preparation**\n` +
        `4. **Top Colleges & Degree Roadmaps**\n` +
        `5. **1:1 Personalized Counselling Sessions**\n\n` +
        `Feel free to ask any specific question about exam eligibility, age limits, syllabus, or career choices!`;
    }

    return {
      reply,
      suggestedQuestions: [
        "NDA vs CDS: Which is right for me?",
        "Best careers after 12th with high growth",
        "How to prepare for CUET 2026?",
        "Book 1:1 Mentorship Session",
      ],
      recommendedAction: {
        type: "BOOK_APPOINTMENT",
        label: "Schedule 1:1 Mentorship Session",
      },
    };
  }
}

export const geminiChatService = new GeminiChatService();
