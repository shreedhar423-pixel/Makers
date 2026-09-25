import React, { useState, useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Vendor, VendorPackage } from '../../types';
import { CATEGORIES, DISTRICTS } from '../../data/mockData';
import { VendorCard } from './VendorCard';
import { VendorDetailModal } from './VendorDetailModal';
import { BookingRequestModal } from './BookingRequestModal';
import { MainCategoriesShowcase } from './MainCategoriesShowcase';
import { CategorySubcategoryPage } from './CategorySubcategoryPage';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Award,
  Filter,
  ArrowRight,
  Users,
  CalendarHeart,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Star,
  Zap,
  RotateCcw,
  Layers
} from 'lucide-react';

interface MarketplaceViewProps {
  onOpenPlannerModal: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onOpenPlannerModal }) => {
  const { vendors } = useBooking();

  // Page level navigation for Category & Subcategory deep-dive page
  const [activeCategoryPage, setActiveCategoryPage] = useState<string | null>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(500000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [fastRespondersOnly, setFastRespondersOnly] = useState<boolean>(false);
  const [highRatingOnly, setHighRatingOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'bookings' | 'response' | 'priceAsc' | 'priceDesc'>('rating');

  // Collapsible Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Modal states
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<'packages' | 'testimonials'>('packages');
  const [requestVendor, setRequestVendor] = useState<Vendor | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<VendorPackage | undefined>(undefined);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Categories': vendors.length };
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = vendors.filter(v => v.category === cat).length;
    });
    return counts;
  }, [vendors]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All Categories') count++;
    if (selectedDistrict !== 'All Districts') count++;
    if (searchQuery.trim() !== '') count++;
    if (maxBudget < 500000 || minBudget > 0) count++;
    if (verifiedOnly) count++;
    if (fastRespondersOnly) count++;
    if (highRatingOnly) count++;
    if (sortBy !== 'rating') count++;
    return count;
  }, [selectedCategory, selectedDistrict, searchQuery, minBudget, maxBudget, verifiedOnly, fastRespondersOnly, highRatingOnly, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedDistrict('All Districts');
    setSearchQuery('');
    setMinBudget(0);
    setMaxBudget(500000);
    setVerifiedOnly(false);
    setFastRespondersOnly(false);
    setHighRatingOnly(false);
    setSortBy('rating');
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchCategory = selectedCategory === 'All Categories' || v.category === selectedCategory;
      const matchDistrict = selectedDistrict === 'All Districts' || v.district === selectedDistrict;
      const matchSearch = searchQuery === '' || 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBudget = v.startingPrice >= minBudget && v.startingPrice <= maxBudget;
      const matchVerified = !verifiedOnly || v.verified;
      const matchFastResponse = !fastRespondersOnly || v.responseRatePct >= 95;
      const matchHighRating = !highRatingOnly || v.rating >= 4.9;

      return matchCategory && matchDistrict && matchSearch && matchBudget && matchVerified && matchFastResponse && matchHighRating;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bookings') return b.verifiedBookingsCount - a.verifiedBookingsCount;
      if (sortBy === 'response') return b.responseRatePct - a.responseRatePct;
      if (sortBy === 'priceAsc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'priceDesc') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [vendors, selectedCategory, selectedDistrict, searchQuery, minBudget, maxBudget, verifiedOnly, fastRespondersOnly, highRatingOnly, sortBy]);

  const handleOpenBooking = (vendor: Vendor, pkg?: VendorPackage) => {
    setRequestVendor(vendor);
    setSelectedPackage(pkg);
    setDetailVendor(null);
  };

  // If a specific main category is selected, transition to the dedicated Category & Subcategory deep-dive page
  if (activeCategoryPage && activeCategoryPage !== 'All Categories') {
    return (
      <CategorySubcategoryPage
        categoryName={activeCategoryPage}
        onBackToOverview={() => {
          setActiveCategoryPage(null);
          setSelectedCategory('All Categories');
        }}
        onSelectOtherCategory={(cat) => {
          if (cat === 'All Categories') {
            setActiveCategoryPage(null);
            setSelectedCategory('All Categories');
          } else {
            setActiveCategoryPage(cat);
            setSelectedCategory(cat);
          }
        }}
        onOpenPlannerModal={onOpenPlannerModal}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 space-y-10 bg-[#FAF7F2]">
      {/* Hero Section: Celebratory people together themed background image with translucent luxury frosted gradient overlay and Creative Calligraphy PLANS in Background */}
      <section className="relative overflow-hidden min-h-[460px] flex items-center border-b border-[#E6DFD3] shadow-xs">
        {/* Background Image: Joyful people celebrating together at elegant celebration */}
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85" 
          alt="People celebrating together at luxury celebration banquet" 
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.76] contrast-[1.06]"
        />
        
        {/* Creative Calligraphy PLANS in Background Watermark Typography */}
        <div 
          className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none text-white/12 sm:text-white/16 font-calligraphy text-8xl sm:text-[140px] md:text-[190px] lg:text-[230px] font-normal italic tracking-wide leading-none -rotate-6 z-1 drop-shadow-sm transition-all"
          aria-hidden="true"
        >
          Plans
        </div>

        {/* Multi-layered soft vignette & frosted glass gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#15201A]/92 via-[#1F2E25]/75 to-transparent z-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/35 z-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#FFF5E8] text-xs font-semibold shadow-xs">
              <Users className="w-4 h-4 text-amber-300" />
              <span>Curated Event Artisans for Unforgettable Celebrations</span>
            </div>

            {/* Title featuring Creative Calligraphy Font for PLANS */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
              People, <span className="font-calligraphy font-normal text-5xl sm:text-7xl lg:text-8xl text-amber-200 tracking-wide inline-block -rotate-3 px-1">Plans</span> & <span className="italic font-editorial text-amber-100">Celebrations</span>
            </h1>

            <p className="text-sm sm:text-base text-[#E5EFE9] max-w-2xl leading-relaxed drop-shadow-xs font-normal">
              Connect with verified wedding photographers, gourmet banquets, royal floral stylists, and music artists with structured requests, protected client contacts, and guaranteed 4-hour response SLAs.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-white">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>4-Hour SLA Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Curated Verified Artisans</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <CalendarHeart className="w-4 h-4 text-emerald-300" />
                <span>Zero Payment Risk (Phase 1)</span>
              </div>

              {/* Touch trigger for Smart Budget Allocation shifted to side pop-up */}
              <button
                onClick={onOpenPlannerModal}
                className="flex items-center gap-2 bg-amber-500/30 hover:bg-amber-500/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-300/40 text-amber-100 font-bold transition shadow-xs active:scale-95 cursor-pointer"
                title="Open Smart Budget Allocation pop-up"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Smart Budget Allocation (Pop-up)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Main Categories Showcase & Collapsible Filter Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Visual Main Categories Grid before showing the vendor directly */}
        <MainCategoriesShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            if (cat !== 'All Categories') {
              setActiveCategoryPage(cat);
              setSelectedCategory(cat);
            } else {
              setActiveCategoryPage(null);
              setSelectedCategory('All Categories');
            }
          }}
          categoryCounts={categoryCounts}
        />

        {/* Marketplace Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#EAE3D7] shadow-2xs">
          {/* Toggle Sidebar Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                isSidebarOpen
                  ? 'bg-[#7A8E82] text-white'
                  : 'bg-white text-[#2C3D32] hover:bg-[#EFE9DD] border border-[#DDD5C7]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isSidebarOpen ? 'Hide Filter Sidebar' : 'Show Filter Sidebar'}</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-400 text-[#1F2C23]">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Quick Summary */}
            <div className="text-xs text-[#63796D] hidden sm:block">
              Showing <strong className="font-garamond text-base text-[#1F2C23] tabular-nums font-bold">{filteredVendors.length}</strong> of {vendors.length} curated artisans
            </div>
          </div>

          {/* Quick Search in top bar */}
          <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Quick search artisan or theme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 focus:border-[#7A8E82] text-[#1E2621] font-medium placeholder-[#8A9C91]"
              />
              <Search className="w-3.5 h-3.5 text-[#7A8E82] absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#8A9C91] hover:text-[#242E28]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="p-2 text-[#8A5D33] hover:bg-[#F5ECE1] rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs py-1">
            <span className="text-[11px] text-[#7A8D81] font-medium">Active Filters:</span>
            {selectedCategory !== 'All Categories' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0EC] text-[#33463B] border border-[#CFDBD2] font-semibold text-[11px]">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All Categories')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedDistrict !== 'All Districts' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0EC] text-[#33463B] border border-[#CFDBD2] font-semibold text-[11px]">
                <span>Location: {selectedDistrict}</span>
                <button onClick={() => setSelectedDistrict('All Districts')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxBudget < 500000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5ECE1] text-[#8A5D33] border border-[#DFCEBD] font-semibold text-[11px]">
                <span>Max: ₹{maxBudget.toLocaleString('en-IN')}</span>
                <button onClick={() => setMaxBudget(500000)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {verifiedOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5ECE1] text-[#8A5D33] border border-[#DFCEBD] font-semibold text-[11px]">
                <span>Verified Only</span>
                <button onClick={() => setVerifiedOnly(false)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {fastRespondersOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0EC] text-[#33463B] border border-[#CFDBD2] font-semibold text-[11px]">
                <span>Fast SLA Responders</span>
                <button onClick={() => setFastRespondersOnly(false)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {highRatingOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0EC] text-[#33463B] border border-[#CFDBD2] font-semibold text-[11px]">
                <span>4.9+ ★ Rated</span>
                <button onClick={() => setHighRatingOnly(false)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {sortBy !== 'rating' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4A5D52] border border-[#DDD5C7] font-semibold text-[11px]">
                <span>Sort: {sortBy}</span>
                <button onClick={() => setSortBy('rating')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* 2-Column Marketplace Grid: Collapsible Glass Sidebar + Spacious Vendor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Collapsible Filter Sidebar */}
          {isSidebarOpen && (
            <aside className="lg:col-span-4 xl:col-span-3.5 space-y-6 animate-in fade-in slide-in-from-left duration-200">
              <div className="glass-box-gradient p-6 rounded-3xl border border-white/90 shadow-[0_12px_35px_rgba(40,55,45,0.07)] space-y-6 sticky top-24">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D7]">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#7A8E82]" />
                    <h3 className="font-serif font-bold text-base text-[#1D2B22]">Refine Artisans</h3>
                  </div>
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-[#8A5D33] hover:underline font-bold"
                  >
                    Reset All
                  </button>
                </div>

                {/* 1. Sort Order Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#34463A] uppercase tracking-wider block">
                    Sort Vendors By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white/90 border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621] shadow-2xs"
                  >
                    <option value="rating">⭐ Highest Rated (Review Score)</option>
                    <option value="bookings">🏆 Most Bookings Completed</option>
                    <option value="response">⚡ Fastest WhatsApp SLA Response</option>
                    <option value="priceAsc">💰 Price: Low to High</option>
                    <option value="priceDesc">💎 Price: High to Low</option>
                  </select>
                </div>

                {/* 2. Category Filter List */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#34463A] uppercase tracking-wider">
                      Event Category
                    </label>
                    <span className="text-[10px] text-[#7A8E82]">
                      {selectedCategory === 'All Categories' ? 'All' : '1 selected'}
                    </span>
                  </div>

                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      const count = categoryCounts[cat] || 0;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#7A8E82] text-white font-bold shadow-xs'
                              : 'bg-white/60 hover:bg-white text-[#38493E] border border-transparent hover:border-[#DDD5C7]'
                          }`}
                        >
                          <span className="truncate">{cat}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-garamond tabular-nums ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE3D7] text-[#55695E]'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Location / District Filter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#34463A] uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7A8E82]" />
                      <span>District & Region</span>
                    </label>
                  </div>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white/90 border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621] shadow-2xs"
                  >
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>

                  {/* Quick Kerala District Shortcuts */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Ernakulam', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Alappuzha', 'Kottayam', 'Wayanad', 'Idukki'].map((shortcut) => {
                      const match = DISTRICTS.find(d => d.toLowerCase().includes(shortcut.toLowerCase()));
                      if (!match) return null;
                      const active = selectedDistrict === match;

                      return (
                        <button
                          key={shortcut}
                          onClick={() => setSelectedDistrict(active ? 'All Districts' : match)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg transition border cursor-pointer ${
                            active
                              ? 'bg-[#7A8E82] text-white border-[#7A8E82] font-bold'
                              : 'bg-white/70 text-[#55685D] border-[#DDD5C7] hover:bg-white'
                          }`}
                        >
                          {shortcut}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Price Range Filter in Standard Garamond Numerals */}
                <div className="space-y-3 pt-3 border-t border-[#EAE3D7]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#34463A] uppercase tracking-wider">
                      Budget Range (INR)
                    </label>
                    <span className="font-garamond font-bold text-sm text-[#8A5D33] tabular-nums">
                      Up to ₹{maxBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={25000}
                    max={500000}
                    step={25000}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full accent-[#7A8E82] cursor-pointer"
                  />

                  {/* Quick Price Tier Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
                    <button
                      onClick={() => setMaxBudget(100000)}
                      className={`p-1.5 rounded-lg text-center font-garamond tabular-nums border transition ${
                        maxBudget === 100000 ? 'bg-[#7A8E82] text-white font-bold' : 'bg-white/80 text-[#44564B] border-[#DDD5C7] hover:bg-white'
                      }`}
                    >
                      &lt; ₹1 Lakh
                    </button>
                    <button
                      onClick={() => setMaxBudget(250000)}
                      className={`p-1.5 rounded-lg text-center font-garamond tabular-nums border transition ${
                        maxBudget === 250000 ? 'bg-[#7A8E82] text-white font-bold' : 'bg-white/80 text-[#44564B] border-[#DDD5C7] hover:bg-white'
                      }`}
                    >
                      ₹2.5 Lakh
                    </button>
                    <button
                      onClick={() => setMaxBudget(500000)}
                      className={`p-1.5 rounded-lg text-center font-garamond tabular-nums border transition ${
                        maxBudget === 500000 ? 'bg-[#7A8E82] text-white font-bold' : 'bg-white/80 text-[#44564B] border-[#DDD5C7] hover:bg-white'
                      }`}
                    >
                      All Budgets
                    </button>
                  </div>
                </div>

                {/* 5. Trust & Quality Criteria Checkboxes */}
                <div className="space-y-2.5 pt-3 border-t border-[#EAE3D7]">
                  <label className="text-xs font-bold text-[#34463A] uppercase tracking-wider block">
                    Trust & Verification
                  </label>

                  <div className="space-y-2 text-xs text-[#33463B]">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="rounded text-[#7A8E82] focus:ring-[#7A8E82] accent-[#7A8E82] w-4 h-4"
                      />
                      <span className="font-medium">MAKERS Verified Artisans Only</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={fastRespondersOnly}
                        onChange={(e) => setFastRespondersOnly(e.target.checked)}
                        className="rounded text-[#7A8E82] focus:ring-[#7A8E82] accent-[#7A8E82] w-4 h-4"
                      />
                      <span className="font-medium">Fast SLA Responders (&gt;95%)</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={highRatingOnly}
                        onChange={(e) => setHighRatingOnly(e.target.checked)}
                        className="rounded text-[#7A8E82] focus:ring-[#7A8E82] accent-[#7A8E82] w-4 h-4"
                      />
                      <span className="font-medium">Top Rated (4.9+ ★)</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Vendors Grid Area */}
          <main className={`${isSidebarOpen ? 'lg:col-span-8 xl:col-span-8.5' : 'lg:col-span-12'} space-y-6`}>
            {filteredVendors.length > 0 ? (
              <div className={`grid grid-cols-1 ${isSidebarOpen ? 'md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 lg:gap-10`}>
                {filteredVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onOpenDetails={(v, tab = 'packages') => {
                      setDetailVendor(v);
                      setDetailInitialTab(tab);
                    }}
                    onRequestBooking={(v) => handleOpenBooking(v)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-box-gradient rounded-3xl p-12 text-center border border-[#EAE3D7] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF0EC] text-[#7A8E82] flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F2C23]">No artisans found matching criteria</h3>
                <p className="text-xs text-[#6B8074] max-w-sm mx-auto">
                  Try adjusting your district, budget scope slider, or resetting category filters to discover verified artisans.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-[#7A8E82] text-white text-xs font-bold rounded-xl hover:bg-[#687C70] transition shadow-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Vendor Detail Glass Modal Pop-up (Includes Verified Testimonials & Packages) */}
      {detailVendor && (
        <VendorDetailModal
          vendor={detailVendor}
          initialTab={detailInitialTab}
          onClose={() => setDetailVendor(null)}
          onRequestBookingWithPackage={(pkg) => handleOpenBooking(detailVendor, pkg)}
        />
      )}

      {/* Booking Request Modal */}
      {requestVendor && (
        <BookingRequestModal
          vendor={requestVendor}
          initialPackage={selectedPackage}
          onClose={() => {
            setRequestVendor(null);
            setSelectedPackage(undefined);
          }}
        />
      )}
    </div>
  );
};
