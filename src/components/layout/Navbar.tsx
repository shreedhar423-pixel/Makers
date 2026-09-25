import React, { useState, useRef, useEffect } from 'react';
import { useBooking, NavigationTab } from '../../context/BookingContext';
import { MakersLogo } from '../common/MakersLogo';
import { 
  Search, 
  CalendarCheck, 
  Sparkles, 
  MoreVertical, 
  UserCheck, 
  ShieldAlert, 
  MessageSquare, 
  RotateCcw, 
  SlidersHorizontal,
  FileText,
  X,
  Menu,
  ChevronRight,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  onOpenPlannerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlannerModal }) => {
  const { 
    activeTab, 
    setActiveTab, 
    bookings, 
    activeRole, 
    setActiveRole, 
    slaBreachedBookingsCount,
    setSelectedBookingId,
    resetAllData
  } = useBooking();

  const [searchIdInput, setSearchIdInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const pendingCustomerCount = bookings.filter(b => b.status === 'Pending' || b.status === 'Vendor Responded' || b.status === 'Confirmed').length;

  // Close 3-dot dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchIdInput.trim()) return;
    const found = bookings.find(b => b.id.toLowerCase() === searchIdInput.trim().toLowerCase());
    if (found) {
      setSelectedBookingId(found.id);
      setActiveTab('tracker');
      setSearchIdInput('');
    } else {
      alert(`Booking ID "${searchIdInput}" not found. Try one like MK-2026-00472`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D6] shadow-xs w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo pinned to the top-left corner */}
          <div 
            className="cursor-pointer py-1 shrink-0 flex items-center" 
            onClick={() => setActiveTab('marketplace')}
          >
            <MakersLogo variant="original" size="md" showTaglines={true} />
          </div>

          {/* Right Aligned Navigation Group (Professional standard layout) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
            {/* Quick Track ID Search */}
            <form onSubmit={handleIdSearch} className="hidden xl:flex items-center relative w-56">
              <input
                type="text"
                placeholder="Track ID (e.g. MK-2026-00472)"
                value={searchIdInput}
                onChange={(e) => setSearchIdInput(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white/90 border border-[#DDD5C7] rounded-full text-[#242E28] placeholder-[#8A9C91] focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 focus:border-[#7A8E82] transition shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-[#7A8E82] absolute left-3 pointer-events-none" />
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketplace'
                    ? 'bg-[#7A8E82] text-white shadow-xs'
                    : 'text-[#4A5D52] hover:text-[#1E2621] hover:bg-[#EFE9DD]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explore Marketplace</span>
              </button>

              <button
                onClick={() => setActiveTab('tracker')}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'tracker'
                    ? 'bg-[#7A8E82] text-white shadow-xs'
                    : 'text-[#4A5D52] hover:text-[#1E2621] hover:bg-[#EFE9DD]'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Booking Tracker</span>
                {pendingCustomerCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === 'tracker' ? 'bg-[#966E46] text-white' : 'bg-[#7A8E82] text-white'
                  }`}>
                    {pendingCustomerCount}
                  </span>
                )}
              </button>

              {/* Quick Pop-up trigger for AI Budget Planner */}
              <button
                onClick={onOpenPlannerModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#F0EAE1] hover:bg-[#E7DFD4] text-[#855B32] border border-[#D8CCBD] transition shadow-2xs group cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A67849] group-hover:rotate-12 transition-transform" />
                <span>AI Budget Planner</span>
              </button>
            </nav>

            {/* Medium screens navigation (tablet) */}
            <nav className="hidden md:flex lg:hidden items-center space-x-1.5">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'marketplace' ? 'bg-[#7A8E82] text-white' : 'text-[#4A5D52] hover:bg-[#EFE9DD]'
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'tracker' ? 'bg-[#7A8E82] text-white' : 'text-[#4A5D52] hover:bg-[#EFE9DD]'
                }`}
              >
                Tracker
              </button>
              <button
                onClick={onOpenPlannerModal}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#F0EAE1] text-[#855B32] border border-[#D8CCBD] cursor-pointer"
              >
                AI Planner
              </button>
            </nav>

            {/* 3-Dot Options Button pinned right */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                title="Account, Portals & System Settings"
                className="p-2.5 rounded-full text-[#5B6D62] hover:text-[#1F2923] hover:bg-[#EFE9DD] transition border border-[#E2DAD0] bg-white/80 shadow-2xs cursor-pointer"
                aria-label="Settings and Portals Menu"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* 3-Dot Dropdown / Portal Selector */}
              {settingsMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E0D7C9] py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-[#F0EBE1]">
                    <div className="text-[10px] uppercase font-bold text-[#8A9B90] tracking-wider">
                      Portal & Account Access
                    </div>
                    <p className="text-[11px] text-[#526458] mt-0.5">
                      Switch interface view or login role
                    </p>
                  </div>

                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        setActiveRole('customer');
                        setActiveTab('marketplace');
                        setSettingsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${
                        activeRole === 'customer'
                          ? 'bg-[#EBF0EC] text-[#2F3D35] font-bold border border-[#CFDBD2]'
                          : 'hover:bg-[#FAF7F2] text-[#425449]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <UserCheck className="w-4 h-4 text-[#7A8E82]" />
                        <div>
                          <div>Customer Portal</div>
                          <div className="text-[10px] text-[#7A8D81] font-normal">Browse & track bookings</div>
                        </div>
                      </div>
                      {activeRole === 'customer' && <span className="text-[10px] bg-[#7A8E82] text-white px-1.5 py-0.5 rounded-md">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        setActiveRole('admin');
                        setActiveTab('admin');
                        setSettingsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${
                        activeRole === 'admin'
                          ? 'bg-[#EBF0EC] text-[#2F3D35] font-bold border border-[#CFDBD2]'
                          : 'hover:bg-[#FAF7F2] text-[#425449]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <SlidersHorizontal className="w-4 h-4 text-[#966E46]" />
                        <div>
                          <div>MAKERS Operations Command</div>
                          <div className="text-[10px] text-[#7A8D81] font-normal">SLA management & queue</div>
                        </div>
                      </div>
                      {activeRole === 'admin' && <span className="text-[10px] bg-[#966E46] text-white px-1.5 py-0.5 rounded-md">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        setActiveRole('vendor');
                        setActiveTab('whatsapp-sim');
                        setSettingsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${
                        activeRole === 'vendor'
                          ? 'bg-[#EBF0EC] text-[#2F3D35] font-bold border border-[#CFDBD2]'
                          : 'hover:bg-[#FAF7F2] text-[#425449]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4 text-[#5A7C6B]" />
                        <div>
                          <div>Vendor WhatsApp Gateway</div>
                          <div className="text-[10px] text-[#7A8D81] font-normal">Incoming structured leads</div>
                        </div>
                      </div>
                      {activeRole === 'vendor' && <span className="text-[10px] bg-[#5A7C6B] text-white px-1.5 py-0.5 rounded-md">Active</span>}
                    </button>
                  </div>

                  <div className="p-1.5 border-t border-[#F0EBE1] space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('prd-roadmap');
                        setSettingsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#FAF7F2] text-[#4E6155]"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#8A9C91]" />
                      <span>PRD Architecture Specs</span>
                    </button>

                    <button
                      onClick={() => {
                        resetAllData();
                        setSettingsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#FAF7F2] text-[#8C5D33]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Mock Data (INR ₹)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile / Tablet Quick Magic Wand Button & Menu Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={onOpenPlannerModal}
                title="Touch to see magic"
                aria-label="Magic Wand AI Planner"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#182B1F] to-[#2E4837] text-[#FFDF79] text-xs font-bold border border-[#D4AF37]/50 shadow-xs active:scale-95 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[11px] font-serif">Magic</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#4A5D52] hover:text-[#1E2621] hover:bg-[#EFE9DD] rounded-xl cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D6] bg-[#FAF7F2] px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <form onSubmit={handleIdSearch} className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Track Booking ID..."
                value={searchIdInput}
                onChange={(e) => setSearchIdInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl text-[#242E28]"
              />
              <Search className="w-4 h-4 text-[#7A8E82] absolute left-3 top-2.5" />
            </div>
          </form>

          <button
            onClick={() => {
              setActiveTab('marketplace');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activeTab === 'marketplace' ? 'bg-[#7A8E82] text-white' : 'text-[#4A5D52] hover:bg-[#EFE9DD]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('tracker');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
              activeTab === 'tracker' ? 'bg-[#7A8E82] text-white' : 'text-[#4A5D52] hover:bg-[#EFE9DD]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4" />
              <span>Booking Tracker</span>
            </div>
            {pendingCustomerCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#966E46] text-white">
                {pendingCustomerCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onOpenPlannerModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#F0EAE1] text-[#855B32]"
          >
            <Sparkles className="w-4 h-4 text-[#A67849]" />
            <span>Open AI Budget Planner</span>
          </button>
        </div>
      )}
    </header>
  );
};
