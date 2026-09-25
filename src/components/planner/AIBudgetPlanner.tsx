import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Vendor, EventCategory } from '../../types';
import { DISTRICTS } from '../../data/mockData';
import { 
  Sparkles, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Award,
  X,
  Coins
} from 'lucide-react';

interface EventPreset {
  id: string;
  name: string;
  description: string;
  defaultBudget: number;
  defaultGuests: number;
  allocations: { category: EventCategory; percentage: number; tips: string }[];
}

const EVENT_PRESETS: EventPreset[] = [
  {
    id: 'wedding',
    name: 'Luxury Wedding Celebration',
    description: 'Balanced allocation for high-end photography, gourmet banquet, floral styling, and premier music in Indian Rupees.',
    defaultBudget: 1500000,
    defaultGuests: 150,
    allocations: [
      { category: 'Wedding Photography', percentage: 22, tips: 'Full-day photo + 4K cinematic highlight drone films.' },
      { category: 'Catering & Dining', percentage: 38, tips: 'Multi-course plated dinner and live appetizer stations.' },
      { category: 'Venues & Luxury Decor', percentage: 22, tips: 'Royal mandap, table centerpieces & ambient canopy lighting.' },
      { category: 'DJ, Music & Entertainment', percentage: 10, tips: '5h Sangeet set, wireless mics, moving head party lights.' },
      { category: 'Salon, Spa & Bridal Makeup', percentage: 8, tips: 'On-location HD bridal glam + bridal party styling.' }
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Summit & Awards Night',
    description: 'Tailored for executive summits, company annual banquets, keynote staging, and acoustic sound setups.',
    defaultBudget: 600000,
    defaultGuests: 80,
    allocations: [
      { category: 'Catering & Dining', percentage: 45, tips: 'Premium pass-around hors d’oeuvres and curated dinner bar.' },
      { category: 'Event Coordination & Planning', percentage: 25, tips: 'Timeline coordination, AV logistics, and run-of-show.' },
      { category: 'DJ, Music & Entertainment', percentage: 18, tips: 'Keynote audio, presenter mics, and dinner background jazz/DJ set.' },
      { category: 'Wedding Photography', percentage: 12, tips: 'Event documentary photographer for PR and corporate socials.' }
    ]
  },
  {
    id: 'birthday-milestone',
    name: 'Milestone Celebration & Party',
    description: 'High-energy celebration focusing on experiential catering, festival-grade sound lighting, and photo styling.',
    defaultBudget: 250000,
    defaultGuests: 50,
    allocations: [
      { category: 'DJ, Music & Entertainment', percentage: 30, tips: 'Top DJ, laser effects, and custom party playlist.' },
      { category: 'Catering & Dining', percentage: 40, tips: 'Gourmet street food stations & craft mixology.' },
      { category: 'Venues & Luxury Decor', percentage: 18, tips: 'Custom photo backdrop, neon signs & balloon arch.' },
      { category: 'Wedding Photography', percentage: 12, tips: '3 hours party portrait and candid coverage.' }
    ]
  },
  {
    id: 'cocktail-reception',
    name: 'Bespoke Cocktail & Bridal Soirée',
    description: 'Focus on artisanal dining, live acoustic entertainment, bridal glam styling, and atmospheric luxury decor.',
    defaultBudget: 350000,
    defaultGuests: 45,
    allocations: [
      { category: 'Catering & Dining', percentage: 42, tips: 'Artisanal grazing boards, chef live skewers & craft mixology.' },
      { category: 'DJ, Music & Entertainment', percentage: 24, tips: 'Acoustic live duo and warm cocktail lounge ambient lighting.' },
      { category: 'Salon, Spa & Bridal Makeup', percentage: 18, tips: 'On-location radiant glam makeup & pre-event skin prep.' },
      { category: 'Venues & Luxury Decor', percentage: 16, tips: 'Intimate candlelight tablescapes and floral photo corners.' }
    ]
  }
];

interface AIBudgetPlannerProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const AIBudgetPlanner: React.FC<AIBudgetPlannerProps> = ({ isModal = false, onClose }) => {
  const { vendors, setSelectedVendor, setBookingModalOpen } = useBooking();

  const [selectedPresetId, setSelectedPresetId] = useState<string>('wedding');
  const [totalBudget, setTotalBudget] = useState<number>(1500000);
  const [guestCount, setGuestCount] = useState<number>(150);
  const [guestBracket, setGuestBracket] = useState<string>('150-250');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');

  const currentPreset = EVENT_PRESETS.find(p => p.id === selectedPresetId) || EVENT_PRESETS[0];

  const handleSelectPreset = (p: EventPreset) => {
    setSelectedPresetId(p.id);
    setTotalBudget(p.defaultBudget);
    setGuestCount(p.defaultGuests);
  };

  const GUEST_BRACKETS = [
    { id: '1-25', label: 'Up to 25 Guests', count: 25 },
    { id: '25-50', label: '25 - 50 Guests', count: 50 },
    { id: '50-100', label: '50 - 100 Guests', count: 100 },
    { id: '100-150', label: '100 - 150 Guests', count: 150 },
    { id: '150-250', label: '150 - 250 Guests', count: 200 },
    { id: '250-400', label: '250 - 400 Guests', count: 300 },
    { id: '400-600', label: '400 - 600 Guests', count: 500 },
    { id: '600+', label: '600+ Guests', count: 750 }
  ];

  const handleGuestBracketChange = (bracketId: string) => {
    setGuestBracket(bracketId);
    const matched = GUEST_BRACKETS.find(b => b.id === bracketId);
    if (matched) setGuestCount(matched.count);
  };

  const getMatchedVendors = (category: EventCategory, allocatedBudget: number) => {
    return vendors
      .filter(v => v.category === category)
      .filter(v => selectedDistrict === 'All Districts' || v.district === selectedDistrict)
      .filter(v => v.startingPrice <= allocatedBudget * 1.35)
      .sort((a, b) => b.rating - a.rating);
  };

  const costPerGuest = guestCount > 0 ? Math.round(totalBudget / guestCount) : 0;

  const content = (
    <div className="space-y-6">
      {/* Top Banner with Glass Gradient */}
      <div className="bg-gradient-to-br from-[#1E2C23] via-[#2A3B30] to-[#17221C] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#485B50]">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-amber-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>THE MAKERS · Smart Budget Allocation & AI Matcher (₹)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
            Smart Budget Allocation & Verified Artisan Matching
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E4DC] leading-relaxed">
            Intelligent category allocation mapped against real MAKERS verified vendor pricing packages with Garamond standard pricing in Indian Rupees (₹).
          </p>
        </div>
      </div>

      {/* Preset Selector & Sliders with Glass Panel */}
      <div className="bg-gradient-to-br from-white/95 via-white/85 to-[#F7F2EB]/60 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E6DFD3] shadow-xs space-y-6">
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-[#5C7063]">
            1. Select Event Style Preset
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {EVENT_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#EAF0EC] border-[#7A8E82] ring-2 ring-[#7A8E82]/25 shadow-xs'
                      : 'bg-white/80 border-[#EAE3D7] hover:border-[#CFDEC4] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1D2B22]">{preset.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#7A8E82]" />}
                    </div>
                    <p className="text-[11px] text-[#55695C] mt-1 leading-relaxed">{preset.description}</p>
                  </div>
                  <div className="mt-3.5 pt-2 border-t border-[#EAE3D7] flex items-center justify-between text-[11px]">
                    <span className="text-[#6D8275] font-medium">Preset Spend:</span>
                    <span className="font-garamond text-base font-bold text-[#8C5E33] tabular-nums">
                      ₹{preset.defaultBudget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sliders and Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-[#EAE3D7]">
          {/* Total Budget Slider in INR with Garamond Numbers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1D2B22]">
              <span>Total Target Budget (₹)</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[#8C5E33] font-semibold">₹</span>
                <span className="font-garamond text-2xl font-bold text-[#8C5E33] leading-none tabular-nums">
                  {totalBudget.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={25000}
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full accent-[#7A8E82] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#768C7E] font-garamond tabular-nums">
              <span>₹50,000</span>
              <span>₹25,00,000</span>
              <span>₹50,00,000+</span>
            </div>
          </div>

          {/* Expected Guests Dropdown List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1D2B22]">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#7A8E82]" />
                <span>Expected Guests Bracket</span>
              </span>
              <span className="text-xs text-[#5B7063] font-bold font-garamond tabular-nums">~{guestCount} Guests</span>
            </div>
            <select
              value={guestBracket}
              onChange={(e) => handleGuestBracketChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1D2B22]"
            >
              {GUEST_BRACKETS.map((b) => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
            <div className="text-[10px] text-[#768C7E] flex justify-between">
              <span>Avg estimated cost:</span>
              <strong className="text-[#8C5E33] font-garamond text-xs tabular-nums">₹{costPerGuest.toLocaleString('en-IN')} / guest</strong>
            </div>
          </div>

          {/* Location District */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1D2B22]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#7A8E82]" />
                <span>Target District Hub</span>
              </span>
            </div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1D2B22]"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <span className="text-[10px] text-[#768C7E] block">
              Matches verified artisans in this region
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Allocations Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1D2B22]">
              Category Allocations & Matched Artisans
            </h3>
            <p className="text-xs text-[#526458]">
              Target spend for {currentPreset.name} (~₹{costPerGuest.toLocaleString('en-IN')} per guest).
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E0D7C9] text-xs font-medium text-[#5B7063] shadow-2xs">
            <Award className="w-4 h-4 text-[#8C5E33]" />
            <span>Guaranteed 4h WhatsApp SLA</span>
          </div>
        </div>

        <div className="space-y-4">
          {currentPreset.allocations.map((alloc, idx) => {
            const allocatedAmount = Math.round((totalBudget * alloc.percentage) / 100);
            const matched = getMatchedVendors(alloc.category, allocatedAmount);

            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/90 to-[#FAF7F2]/60 backdrop-blur-md rounded-3xl p-6 border border-[#E6DFD3] shadow-xs space-y-4"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE3D7]">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#EAF0EC] text-[#4F6357] font-garamond font-bold text-sm flex items-center justify-center tabular-nums">
                      {alloc.percentage}%
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1D2B22]">{alloc.category}</h4>
                      <p className="text-xs text-[#526458]">{alloc.tips}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-[#768C7E] block">Allocated Target</span>
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xs text-[#8C5E33] font-semibold">₹</span>
                      <span className="font-garamond text-2xl font-bold text-[#8C5E33] leading-none tabular-nums">
                        {allocatedAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Matched Vendors Horizontal Rail */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold text-[#55695C] uppercase tracking-wider">
                      Matched Verified Artisans ({matched.length})
                    </span>
                    {matched.length === 0 && (
                      <span className="text-[11px] text-amber-700">
                        Adjust budget or district to reveal available pros
                      </span>
                    )}
                  </div>

                  {matched.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {matched.map((v) => (
                        <div
                          key={v.id}
                          className="p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EAE3D7] hover:border-[#7A8E82] hover:bg-white transition flex flex-col justify-between space-y-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <img src={v.imageUrl} alt={v.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-serif text-xs font-bold text-[#1D2B22] truncate">{v.name}</h5>
                              <div className="flex items-center gap-1 text-[10px] text-[#63796D] mt-0.5">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-[#1D2B22] font-garamond tabular-nums">{v.rating}</span>
                                <span>•</span>
                                <span className="font-garamond tabular-nums">{v.responseTimeText}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-[#EAE3D7] text-xs">
                            <div>
                              <span className="text-[10px] text-[#768C7E] block">Starting at</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-[10px] text-[#8C5E33]">₹</span>
                                <span className="font-garamond text-lg font-bold text-[#8C5E33] tabular-nums">
                                  {v.startingPrice.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (onClose) onClose();
                                setSelectedVendor(v);
                                setBookingModalOpen(true);
                              }}
                              className="px-3.5 py-1.5 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>Request</span>
                              <ArrowRight className="w-3 h-3 text-amber-200" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-white/60 rounded-2xl border border-dashed border-[#DDD5C7] text-center text-xs text-[#6B8074]">
                      No verified vendors currently match within ₹{allocatedAmount.toLocaleString('en-IN')} in {selectedDistrict}. Try switching district to "All Districts" or increasing budget.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div 
        onClick={onClose}
        className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-white/98 via-[#FAF7F2] to-[#F5EDE1]/85 backdrop-blur-2xl w-full max-w-5xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden relative flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE3D7] bg-white/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#EAF0EC] rounded-xl text-[#586B60]">
                <Sparkles className="w-4 h-4 text-[#8C5E33]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D2B22]">Smart Budget Allocation & AI Planner (₹)</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6B7E73] hover:text-[#1F2923] hover:bg-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {content}
    </div>
  );
};
