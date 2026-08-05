import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const whatsappNumber = '+91 85283 35708';
  const whatsappUrl = 'https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance.';

  // Show an inviting popup badge 3 seconds after page load if user hasn't closed it
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleCloseBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowTooltip(false);
    setHasInteracted(true);
  };

  const handleOpenWhatsApp = () => {
    setHasInteracted(true);
    setShowTooltip(false);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end group select-none">
      {/* Interactive Tooltip / Chat Peek Badge */}
      {showTooltip && (
        <div 
          id="whatsapp-greeting-badge"
          onClick={handleOpenWhatsApp}
          className="mb-3 p-3.5 bg-[#0B1F3A] text-white rounded-2xl shadow-2xl border border-secondary/40 flex items-start gap-3 max-w-[260px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300 cursor-pointer hover:border-secondary transition-all group/badge"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#25D366]/40">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] font-poppins font-bold text-secondary flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Career Counsellor
              </span>
              <button 
                id="close-whatsapp-tooltip-btn"
                onClick={handleCloseBadge} 
                className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
                title="Dismiss"
                aria-label="Close message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[13px] text-white/95 leading-snug mt-1 font-medium">
              Need immediate career guidance or defence exam mentoring?
            </p>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-[#25D366] font-semibold">
              <span>Chat on WhatsApp</span>
              <Send className="w-2.5 h-2.5 transform translate-x-0 group-hover/badge:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative flex items-center">
        {/* Hover Tooltip (When badge is not showing) */}
        {!showTooltip && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#071224] text-white text-xs font-poppins font-semibold px-3 py-2 rounded-lg shadow-xl border border-[#25D366]/30 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              Chat with a Career Expert
            </span>
          </div>
        )}

        {/* Pulse Waves radiating outward */}
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none duration-1000"></span>
        <span className="absolute -inset-3 rounded-full bg-[#25D366] opacity-15 pointer-events-none animate-pulse"></span>

        {/* Main Floating Button */}
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHasInteracted(true)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.65)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Chat with a Career Expert on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white/20 stroke-[2.2]" />
          
          {/* Online Indicator Dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full"></span>
        </a>
      </div>
    </div>
  );
}
