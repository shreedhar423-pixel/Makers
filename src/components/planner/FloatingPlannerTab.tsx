import React, { useState } from 'react';
import { Wand2, Sparkles } from 'lucide-react';

interface FloatingPlannerTabProps {
  onClick: () => void;
}

export const FloatingPlannerTab: React.FC<FloatingPlannerTabProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="AI Event Planner & Magic Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] pointer-events-auto select-none"
      style={{ isolation: 'isolate' }}
    >
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 max-w-[calc(100vw-24px)]">
        {/* Playful Floating Speech Pill ("Touch me to see the magic ✨") */}
        <button
          type="button"
          onClick={onClick}
          aria-label="Touch me to see the magic - Open AI Planner"
          className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-[#192A20] text-[11px] sm:text-xs font-serif font-bold shadow-[0_8px_24px_rgba(20,35,26,0.25)] border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-[#FAF7F2] active:scale-95 transition-all duration-200 cursor-pointer animate-bounce"
          style={{ animationDuration: '2.5s' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
          <span className="whitespace-nowrap font-bold text-[#192A20]">
            Touch me to see the magic <span className="text-amber-500">✨</span>
          </span>
        </button>

        {/* Circular Magic Wand Floating Action Button */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Open AI Event Planner Magic Stick"
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#14261B] via-[#223B2A] to-[#365A42] hover:from-[#1A3123] hover:to-[#426E51] text-white shadow-[0_12px_36px_rgba(10,25,16,0.55)] border-2 border-[#E5C158] ring-4 ring-black/10 active:scale-90 transition-all duration-200 cursor-pointer shrink-0"
          style={{ width: '56px', height: '56px' }}
        >
          {/* Pulsing Status Ping Badge */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border-2 border-white shadow-xs" />
          </span>

          {/* Golden Magic Wand Icon */}
          <div className="relative flex items-center justify-center text-[#FFDF79] group-hover:rotate-45 group-hover:scale-115 transition-transform duration-300">
            <Wand2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFDF79] drop-shadow-[0_2px_10px_rgba(230,175,40,0.65)]" />
          </div>
        </button>
      </div>
    </aside>
  );
};
