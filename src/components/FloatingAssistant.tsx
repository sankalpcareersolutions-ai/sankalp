import React, { useState, useEffect } from 'react';
import aayuAvatar from '../assets/images/aayu_girl_avatar_1786025045279.jpg';
import { X, Sparkles, Send } from 'lucide-react';
import AayuChat from './AayuChat';

interface FloatingAssistantProps {
  onTabChange?: (tab: string) => void;
}

export default function FloatingAssistant({ onTabChange = () => {} }: FloatingAssistantProps) {
  const [isAayuOpen, setIsAayuOpen] = useState(false);
  const [showGreetingBadge, setShowGreetingBadge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show an inviting popup badge after 3 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isAayuOpen) {
        setShowGreetingBadge(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasInteracted, isAayuOpen]);

  const handleOpenAayu = () => {
    setHasInteracted(true);
    setShowGreetingBadge(false);
    setIsAayuOpen(true);
  };

  const handleCloseBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowGreetingBadge(false);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Floating Aayu Modal Chat when Open */}
      {isAayuOpen && (
        <AayuChat
          isFloating={true}
          isOpen={isAayuOpen}
          onClose={() => setIsAayuOpen(false)}
          onTabChange={onTabChange}
        />
      )}

      {/* Floating Action Controls in Extreme Bottom Corner */}
      <div id="floating-action-container" className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 select-none pointer-events-auto">
        
        {/* Interactive Greeting Badge */}
        {showGreetingBadge && !isAayuOpen && (
          <div
            id="aayu-greeting-badge"
            onClick={handleOpenAayu}
            className="mb-1 p-3 bg-[#0B1F3A]/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-amber-400/50 flex items-start gap-2.5 max-w-[270px] animate-in fade-in slide-in-from-bottom-2 duration-300 cursor-pointer hover:border-amber-300 transition-all group/badge"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-500 to-yellow-300 shrink-0 shadow-md">
              <img src={aayuAvatar} alt="Aayu AI" className="w-full h-full object-cover rounded-[9px]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11.5px] font-poppins font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Aayu • AI Guide
                </span>
                <button
                  id="close-aayu-greeting-btn"
                  onClick={handleCloseBadge}
                  className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
                  title="Dismiss"
                  aria-label="Close message"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11.5px] text-white/90 leading-snug mt-0.5 font-medium">
                Ask any career, stream, or exam question!
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10.5px] text-amber-400 font-bold group-hover/badge:text-amber-300">
                <span>Start Chat</span>
                <Send className="w-2.5 h-2.5 transform group-hover/badge:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* Single Dedicated Floating Action Button in bottom corner */}
        <button
          id="floating-aayu-launcher-btn"
          onClick={() => {
            if (isAayuOpen) {
              setIsAayuOpen(false);
            } else {
              handleOpenAayu();
            }
          }}
          title="Chat with Aayu AI Career Counsellor"
          className="relative h-12 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-navy-950 rounded-2xl shadow-[0_8px_25px_rgba(245,158,11,0.45)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.65)] flex items-center gap-2.5 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none font-poppins font-extrabold group cursor-pointer border border-amber-300"
          aria-label="Open Aayu AI Chatbot"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-navy-950/30 bg-navy-950 flex items-center justify-center shrink-0 shadow-sm">
            <img src={aayuAvatar} alt="Aayu" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col items-start leading-tight text-navy-950">
            <span className="text-xs sm:text-sm font-black tracking-tight">Ask Aayu</span>
            <span className="text-[9.5px] font-sans font-bold uppercase tracking-wider text-navy-900/80">AI Guide</span>
          </div>

          {/* Online Indicator */}
          <span className="w-2.5 h-2.5 bg-emerald-600 border border-white rounded-full animate-pulse ml-0.5"></span>
        </button>
      </div>
    </>
  );
}
