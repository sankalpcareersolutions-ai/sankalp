import React, { useState, useEffect, useRef } from "react";
import aayuAvatar from "../assets/images/aayu_girl_avatar_1786025045279.jpg";
import { 
  Bot, Send, Sparkles, User, RefreshCw, Copy, Check, Volume2, VolumeX, 
  ExternalLink, Calendar, MessageCircle, BookOpen, FileText, ChevronRight,
  Maximize2, Minimize2, X, Compass, Shield, ArrowUpRight, HelpCircle, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface AayuMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  suggestedQuestions?: string[];
  recommendedAction?: {
    type: "BOOK_APPOINTMENT" | "WHATSAPP" | "CAREER_LIBRARY" | "EXAM_ALERTS";
    label: string;
    payload?: string;
  };
}

interface AayuChatProps {
  onTabChange?: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  {
    icon: "🎯",
    title: "Stream Selection",
    subtitle: "After 10th (PCM vs PCB vs Commerce vs Arts)",
    prompt: "I am confused about choosing a stream after 10th. Can you explain PCM, PCB, Commerce, and Arts career scopes?",
  },
  {
    icon: "⚔️",
    title: "NDA & Defence Entries",
    subtitle: "Army, Navy, Air Force & SSB Testing",
    prompt: "How can I join the Indian Armed Forces as an Officer after 12th? Explain NDA, TES, and SSB preparation.",
  },
  {
    icon: "🩺",
    title: "Medical & Bio Sciences",
    subtitle: "NEET, MNS & Allied Health Careers",
    prompt: "What are the best career options for biology students through NEET, Military Nursing (MNS), and Biotechnology?",
  },
  {
    icon: "🚀",
    title: "Engineering & Tech",
    subtitle: "JEE, CS, AI & emerging fields",
    prompt: "What are high-growth tech careers for 2026-2030 and how to balance Board exams with JEE prep?",
  },
  {
    icon: "📅",
    title: "1:1 Expert Mentorship",
    subtitle: "With Senior Career Counsellors",
    prompt: "How does 1:1 career counselling with Senior Counsellors work and how can I book a personalized slot?",
  },
];

export default function AayuChat({
  onTabChange = () => {},
  isOpen = true,
  onClose,
  isFloating = false,
  initialPrompt,
}: AayuChatProps) {
  const [messages, setMessages] = useState<AayuMessage[]>(() => {
    const saved = localStorage.getItem("aayu_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial greeting
      }
    }
    return [
      {
        id: "msg_welcome",
        role: "model",
        text: `**Namaste! I am Aayu (आयु)**, your personal AI Career & Education Mentor at **CareerCounsellingHub**.\n\n` +
          `I am here to guide you with:\n` +
          `• **Stream Selection Guidance** (Science PCM/PCB, Commerce, Arts/Humanities)\n` +
          `• **Sovereign Exams Roadmaps** (JEE, NEET, CUET, NDA, CDS, AFCAT, UPSC, MNS)\n` +
          `• **Defence Career Pathways & SSB Interview Guidance**\n` +
          `• **Top College Admissions, Cutoffs & Timetables**\n` +
          `• **Booking 1:1 Live Counselling Sessions** with Senior Counsellors\n\n` +
          `What career question or exam dilemma can I help you solve today?`,
        timestamp: Date.now(),
        suggestedQuestions: [
          "Best career options after 12th PCM",
          "How to join NDA after 12th?",
          "Career roadmap for NEET & Medical Sciences",
          "Book 1:1 Career Mentorship Session",
        ],
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem("aayu_chat_history", JSON.stringify(messages));
    } catch (e) {
      // ignore storage quota
    }
  }, [messages, isLoading]);

  // Handle initial prompt if passed
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: AayuMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // Prepare history payload for multi-turn chat
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      const modelMessage: AayuMessage = {
        id: `model_${Date.now()}`,
        role: "model",
        text: data.reply || "I am here to guide you. Please ask any career or exam question!",
        timestamp: Date.now(),
        suggestedQuestions: data.suggestedQuestions || [],
        recommendedAction: data.recommendedAction,
      };

      setMessages((prev) => [...prev, modelMessage]);

      // Voice readout if enabled
      if (voiceEnabled && "speechSynthesis" in window && data.reply) {
        speakResponse(data.reply);
      }
    } catch (err: any) {
      const errorMessage: AayuMessage = {
        id: `error_${Date.now()}`,
        role: "model",
        text: `I had trouble connecting to the server. You can also reach our senior counselling desk directly via **Phone (+91 85283 35708)** or book a **1:1 Video Consultation**.`,
        timestamp: Date.now(),
        recommendedAction: {
          type: "BOOK_APPOINTMENT",
          label: "Book 1:1 Consultation with Senior Mentor",
        },
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown characters for pleasant speech
    const cleanText = text
      .replace(/[#*_`~>-]/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .slice(0, 300); // Read first 300 chars for concise audio

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your conversation with Aayu?")) {
      stopSpeaking();
      const freshWelcome: AayuMessage[] = [
        {
          id: "msg_welcome_fresh",
          role: "model",
          text: `**Conversation reset.** Hello! I am **Aayu**, your AI Career Counsellor at CareerCounsellingHub. What questions can I answer for you?`,
          timestamp: Date.now(),
          suggestedQuestions: [
            "Best career options after 12th PCM",
            "How to join NDA after 12th?",
            "Top high-paying careers in Commerce",
            "Book 1:1 Career Mentorship Session",
          ],
        },
      ];
      setMessages(freshWelcome);
      localStorage.removeItem("aayu_chat_history");
    }
  };

  const handleActionClick = (action: AayuMessage["recommendedAction"]) => {
    if (!action) return;
    if (action.type === "BOOK_APPOINTMENT") {
      onTabChange("appointment");
      if (isFloating && onClose) onClose();
    } else if (action.type === "WHATSAPP") {
      window.open(
        action.payload || "https://wa.me/918528335708?text=Hello%20Aayu,%20I%20need%20career%20guidance.",
        "_blank",
        "noopener,noreferrer"
      );
    } else if (action.type === "CAREER_LIBRARY") {
      onTabChange("career-library");
      if (isFloating && onClose) onClose();
    } else if (action.type === "EXAM_ALERTS") {
      onTabChange("exams");
      if (isFloating && onClose) onClose();
    }
  };

  // Helper to format simple markdown elements (bold, lists, blockquotes, headings)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-sm font-bold text-amber-300 mt-3 mb-1 font-poppins">
            {parseInlineStyles(trimmed.replace("### ", ""))}
          </h4>
        );
      }

      // Heading 2 / 1
      if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-amber-400 mt-3.5 mb-1.5 font-poppins">
            {parseInlineStyles(trimmed.replace(/^#+\s/, ""))}
          </h3>
        );
      }

      // Blockquote / Pro-tip
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-2 border-amber-400/70 bg-amber-400/10 pl-3 py-1.5 my-2 text-xs rounded-r-lg text-amber-200">
            {parseInlineStyles(trimmed.replace("> ", ""))}
          </blockquote>
        );
      }

      // Bullet points
      if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-white/90 my-1 pl-1">
            <span className="text-amber-400 mt-1 shrink-0 font-bold">•</span>
            <div className="flex-1 leading-relaxed">
              {parseInlineStyles(trimmed.replace(/^[•\-*]\s/, ""))}
            </div>
          </div>
        );
      }

      // Numbered points
      const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-white/90 my-1 pl-1">
            <span className="text-amber-400 font-mono font-bold text-[11px] mt-0.5 shrink-0 px-1 py-0.2 bg-amber-400/15 rounded">
              {numMatch[1]}
            </span>
            <div className="flex-1 leading-relaxed">
              {parseInlineStyles(numMatch[2])}
            </div>
          </div>
        );
      }

      // Empty line
      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      // Normal paragraph
      return (
        <p key={idx} className="text-xs sm:text-[13px] text-white/90 leading-relaxed my-1">
          {parseInlineStyles(trimmed)}
        </p>
      );
    });
  };

  const parseInlineStyles = (text: string) => {
    // Split on **bold** text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-amber-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div
      id="aayu_ai_chat_root"
      className={`flex flex-col bg-[#071224] text-white overflow-hidden shadow-2xl transition-all duration-300 border border-amber-500/25 ${
        isFloating
          ? isExpanded
            ? "fixed inset-4 sm:inset-10 z-50 rounded-3xl"
            : "fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] rounded-3xl"
          : "w-full max-w-5xl mx-auto rounded-3xl min-h-[680px] my-6"
      }`}
    >
      {/* Header Bar */}
      <div className="px-5 py-4 bg-[#0B1F3A] border-b border-amber-500/20 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#071224] rounded-[14px] overflow-hidden flex items-center justify-center">
                <img src={aayuAvatar} alt="Aayu Virtual Assistant" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0B1F3A] rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-poppins font-extrabold text-white tracking-tight flex items-center gap-1.5">
                Aayu <span className="text-amber-400 text-xs font-mono font-bold bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">AI Guide</span>
              </h3>
            </div>
            <p className="text-[11px] text-white/70 font-sans flex items-center gap-1">
              <span>Career & Defence Counsellor</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-emerald-400 font-semibold">Online 24x7</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 text-white/70">
          <button
            id="aayu_voice_toggle_btn"
            onClick={() => {
              if (isSpeaking) stopSpeaking();
              setVoiceEnabled(!voiceEnabled);
            }}
            title={voiceEnabled ? "Voice Readout Enabled" : "Voice Muted"}
            className={`p-2 rounded-xl transition ${voiceEnabled ? "text-amber-400 hover:bg-amber-400/10" : "text-white/40 hover:bg-white/5"}`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            id="aayu_clear_chat_btn"
            onClick={handleClearHistory}
            title="Reset Conversation"
            className="p-2 hover:bg-white/10 rounded-xl transition text-white/70 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {isFloating && (
            <button
              id="aayu_expand_toggle_btn"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Minimize View" : "Expand View"}
              className="p-2 hover:bg-white/10 rounded-xl transition text-white/70 hover:text-white hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {isFloating && onClose && (
            <button
              id="aayu_close_chat_btn"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              title="Close Chat"
              className="p-2 hover:bg-white/10 rounded-xl transition text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scrollable Thread */}
      <div 
        id="aayu_messages_thread"
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#071224] to-[#0B1F3A]/60 scroll-smooth"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "model" && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shrink-0 mt-1 shadow-md">
                <div className="w-full h-full bg-[#071224] rounded-[10px] overflow-hidden flex items-center justify-center">
                  <img src={aayuAvatar} alt="Aayu" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className={`max-w-[88%] sm:max-w-[80%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-3.5 sm:p-4 rounded-2xl shadow-lg relative group transition-all ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-medium rounded-tr-sm text-xs sm:text-[13px] font-sans"
                    : "bg-[#0B1F3A] border border-amber-500/20 text-white rounded-tl-sm text-xs sm:text-[13px]"
                }`}
              >
                {msg.role === "model" ? (
                  <div>{renderFormattedText(msg.text)}</div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                )}

                {/* Footer Toolbar on Model Messages */}
                {msg.role === "model" && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-[10px] text-white/50">
                    <span className="font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-amber-300 transition flex items-center gap-1 p-1 rounded hover:bg-white/5 cursor-pointer"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {voiceEnabled && (
                        <button
                          onClick={() => speakResponse(msg.text)}
                          className="hover:text-amber-300 transition flex items-center gap-1 p-1 rounded hover:bg-white/5 cursor-pointer"
                          title="Listen to Advice"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Listen</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Recommended Action Pill (if any) */}
              {msg.recommendedAction && (
                <div className="mt-2.5 w-full">
                  <button
                    onClick={() => handleActionClick(msg.recommendedAction)}
                    className="w-full py-2.5 px-3.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-400/40 rounded-xl text-amber-300 hover:text-amber-200 text-xs font-poppins font-bold flex items-center justify-between gap-2 transition shadow-md group/action cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {msg.recommendedAction.type === "BOOK_APPOINTMENT" && <Calendar className="w-4 h-4 text-amber-400" />}
                      {msg.recommendedAction.type === "WHATSAPP" && <MessageCircle className="w-4 h-4 text-emerald-400" />}
                      {msg.recommendedAction.type === "CAREER_LIBRARY" && <BookOpen className="w-4 h-4 text-blue-400" />}
                      {msg.recommendedAction.type === "EXAM_ALERTS" && <FileText className="w-4 h-4 text-purple-400" />}
                      <span>{msg.recommendedAction.label}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 transform group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {/* Suggested Follow-up Prompts */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] font-sans font-medium px-2.5 py-1 rounded-lg bg-[#0B1F3A]/80 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-white/80 hover:text-amber-300 transition-all text-left flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-amber-400" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start items-center"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shrink-0 shadow-md">
              <div className="w-full h-full bg-[#071224] rounded-[10px] overflow-hidden flex items-center justify-center">
                <img src={aayuAvatar} alt="Aayu" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B1F3A] border border-amber-500/20 text-amber-300 text-xs font-mono flex items-center gap-2.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Aayu is analyzing your career question...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Grid (When only 1 welcome message exists) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 py-3 bg-[#0B1F3A]/40 border-t border-white/5">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Quick Exploration Prompts
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STARTER_PROMPTS.slice(0, 4).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.prompt)}
                className="p-2.5 rounded-xl bg-[#0B1F3A] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-left transition-all group flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 font-poppins truncate">
                    {p.title}
                  </div>
                  <div className="text-[10.5px] text-white/60 truncate">{p.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Bar */}
      <div className="p-3.5 sm:p-4 bg-[#0B1F3A] border-t border-amber-500/20 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aayu anything (e.g. NDA vs CDS, PCM vs PCB, 1:1 session)..."
            disabled={isLoading}
            className="flex-1 bg-[#071224] border border-amber-500/30 focus:border-amber-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-50 transition-all font-sans"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-40 disabled:hover:from-amber-500 disabled:hover:to-yellow-400 text-navy-950 flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            aria-label="Send query to Aayu"
          >
            <Send className="w-4 h-4 text-navy-950 fill-navy-950 font-bold" />
          </button>
        </form>

        {/* Quick Footer Links */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/50 px-1">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Aayu AI • CareerCounsellingHub</span>
          </div>
          <button
            onClick={() => {
              onTabChange("appointment");
              if (isFloating && onClose) onClose();
            }}
            className="text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <span>Book 1:1 Counselling</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
