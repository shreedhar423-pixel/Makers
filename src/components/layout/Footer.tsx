import React from 'react';
import { ShieldCheck, MessageSquare, Clock, Sparkles, Award, FileText, Code2, SlidersHorizontal } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MakersLogo } from '../common/MakersLogo';

export const Footer: React.FC = () => {
  const { setActiveTab } = useBooking();

  return (
    <footer className="bg-[#1C2620] text-[#B8C8BF] text-xs border-t border-[#2B3B32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#2B3B32]">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-3">
            <MakersLogo variant="light" size="md" showTaglines={true} />
            <p className="text-[#96ACA0] text-xs leading-relaxed mt-2">
              Phase 1 Booking Request System: Connecting verified lifestyle & luxury event artisans with discerning clients through structured leads, protected contact numbers, and guaranteed WhatsApp SLAs.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>India's Curated Luxury Event Network</span>
            </div>
          </div>

          {/* Col 2: Marketplace Navigation */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-amber-100 uppercase text-[11px] tracking-widest">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-amber-200 transition text-left">
                  Explore Verified Artisans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-amber-200 transition text-left">
                  Customer Booking Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-amber-200 transition text-left">
                  MAKERS Operations Command
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer & Simulator Tools (Dragged to bottom as requested) */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-amber-100 uppercase text-[11px] tracking-widest">
              Simulation & Specs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setActiveTab('whatsapp-sim')} 
                  className="hover:text-amber-200 transition flex items-center gap-2 text-left"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Simulator</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('prd-roadmap')} 
                  className="hover:text-amber-200 transition flex items-center gap-2 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-300" />
                  <span>PRD Architecture Specs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('planner')} 
                  className="hover:text-amber-200 transition flex items-center gap-2 text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Budget Planner View</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Guarantees */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-amber-100 uppercase text-[11px] tracking-widest">
              MAKERS Guarantees
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-[#D2E2D7]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Phone Number Spam</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2E2D7]">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>4-Hour Artisan Response SLA</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2E2D7]">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>WhatsApp Business Routing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7A9184]">
          <div>© 2026 MAKERS Technologies. All rights reserved. People | Plans | Celebrations</div>
          <div className="flex items-center gap-4">
            <span>Payment-Free Phase 1</span>
            <span>•</span>
            <span>WhatsApp Lead Backbone</span>
            <span>•</span>
            <span>All amounts in Indian Rupee (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
