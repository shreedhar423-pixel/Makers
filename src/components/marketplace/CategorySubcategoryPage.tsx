import React, { useState, useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Vendor, VendorPackage } from '../../types';
import { DISTRICTS, CATEGORY_SUBCATEGORIES } from '../../data/mockData';
import { VendorCard } from './VendorCard';
import { VendorDetailModal } from './VendorDetailModal';
import { BookingRequestModal } from './BookingRequestModal';
import { MAIN_CATEGORY_LIST } from './MainCategoriesShowcase';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  Filter, 
  RotateCcw,
  X,
  ChevronDown,
  Layers,
  Star,
  Zap
} from 'lucide-react';

interface CategorySubcategoryPageProps {
  categoryName: string;
  onBackToOverview: () => void;
  onSelectOtherCategory: (catName: string) => void;
  onOpenPlannerModal: () => void;
}

export const CategorySubcategoryPage: React.FC<CategorySubcategoryPageProps> = ({
  categoryName,
  onBackToOverview,
  onSelectOtherCategory,
  onOpenPlannerModal
}) => {
  const { vendors } = useBooking();

  // Subcategory & Filter state
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All Subcategories');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(500000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [fastRespondersOnly, setFastRespondersOnly] = useState<boolean>(false);
  const [highRatingOnly, setHighRatingOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'bookings' | 'response' | 'priceAsc' | 'priceDesc'>('rating');

  // Sidebar toggle on mobile / desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modals
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<'packages' | 'testimonials'>('packages');
  const [requestVendor, setRequestVendor] = useState<Vendor | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<VendorPackage | undefined>(undefined);

  // Find metadata for current category
  const categoryMeta = useMemo(() => {
    return MAIN_CATEGORY_LIST.find(c => c.name === categoryName) || {
      id: categoryName,
      name: categoryName,
      shortTitle: categoryName,
      tagline: 'Curated luxury artisans and verified professionals across Kerala',
      imageUrl: '/src/assets/images/minimal_event_decor_1790353343323.jpg',
      startingPrice: '₹35,000',
      icon: <Sparkles className="w-5 h-5 text-amber-300" />
    };
  }, [categoryName]);

  // Subcategories list
  const subcategories = useMemo(() => {
    return CATEGORY_SUBCATEGORIES[categoryName] || ['All Subcategories'];
  }, [categoryName]);

  // Vendors in this category
  const categoryVendors = useMemo(() => {
    return vendors.filter(v => v.category === categoryName);
  }, [vendors, categoryName]);

  // Filtered vendors
  const filteredVendors = useMemo(() => {
    return categoryVendors.filter(v => {
      const matchSubcategory = selectedSubcategory === 'All Subcategories' || 
        v.subcategory === selectedSubcategory ||
        (v.tagline && v.tagline.toLowerCase().includes(selectedSubcategory.toLowerCase())) ||
        (v.description && v.description.toLowerCase().includes(selectedSubcategory.toLowerCase()));

      const matchDistrict = selectedDistrict === 'All Districts' || v.district === selectedDistrict;

      const matchSearch = searchQuery === '' || 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.subcategory && v.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBudget = v.startingPrice >= minBudget && v.startingPrice <= maxBudget;
      const matchVerified = !verifiedOnly || v.verified;
      const matchFast = !fastRespondersOnly || v.responseRatePct >= 95;
      const matchRating = !highRatingOnly || v.rating >= 4.9;

      return matchSubcategory && matchDistrict && matchSearch && matchBudget && matchVerified && matchFast && matchRating;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bookings') return b.verifiedBookingsCount - a.verifiedBookingsCount;
      if (sortBy === 'response') return b.responseRatePct - a.responseRatePct;
      if (sortBy === 'priceAsc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'priceDesc') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [categoryVendors, selectedSubcategory, selectedDistrict, searchQuery, minBudget, maxBudget, verifiedOnly, fastRespondersOnly, highRatingOnly, sortBy]);

  // Subcategory counts
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Subcategories': categoryVendors.length };
    subcategories.slice(1).forEach(sub => {
      counts[sub] = categoryVendors.filter(v => 
        v.subcategory === sub ||
        (v.tagline && v.tagline.toLowerCase().includes(sub.toLowerCase())) ||
        (v.description && v.description.toLowerCase().includes(sub.toLowerCase()))
      ).length;
    });
    return counts;
  }, [categoryVendors, subcategories]);

  const resetFilters = () => {
    setSelectedSubcategory('All Subcategories');
    setSelectedDistrict('All Districts');
    setSearchQuery('');
    setMinBudget(0);
    setMaxBudget(500000);
    setVerifiedOnly(false);
    setFastRespondersOnly(false);
    setHighRatingOnly(false);
    setSortBy('rating');
  };

  const activeFiltersCount = (selectedSubcategory !== 'All Subcategories' ? 1 : 0) +
    (selectedDistrict !== 'All Districts' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (fastRespondersOnly ? 1 : 0) +
    (highRatingOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 space-y-8">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="bg-[#FAF7F2] border-b border-[#E8E2D6] sticky top-20 z-30 shadow-2xs backdrop-blur-md bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD5C7] text-[#2D3E33] hover:text-[#17211B] hover:bg-[#EFE9DD] text-xs font-bold transition shadow-2xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#7A8E82] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Categories</span>
          </button>

          {/* Category Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-[#6B7F72] font-medium">
              Category:
            </span>
            <select
              value={categoryName}
              onChange={(e) => onSelectOtherCategory(e.target.value)}
              aria-label="Select Event Category"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#DDD5C7] text-[#1E2922] focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/30 cursor-pointer shadow-2xs"
            >
              {MAIN_CATEGORY_LIST.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {cat.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Hero Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_16px_36px_rgba(30,46,36,0.12)] border border-white/60 bg-[#1E2C22]">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={categoryMeta.imageUrl}
              alt={categoryMeta.name}
              className="w-full h-full object-cover object-center scale-105 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#142018]/95 via-[#142018]/80 to-[#142018]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142018] via-transparent to-transparent" />

            {/* Banner Text Content */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  {categoryMeta.icon}
                  <span>Kerala Verified Directory</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                  4-Hour WhatsApp SLA Guaranteed
                </span>
              </div>

              <div className="space-y-2 max-w-2xl">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {categoryMeta.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#D1E0D7] leading-relaxed">
                  {categoryMeta.tagline}. Discover certified local artisans across Kerala's 14 districts with verified pricing, authentic reviews, and instant concierge response.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 border-t border-white/15 text-xs text-[#E1ECE5]">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span className="font-bold text-white font-garamond">{categoryVendors.length} Verified Artisans</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-300" />
                  <span>Avg Response: <strong className="text-white font-garamond">~32 mins</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Avg Rating: <strong className="text-white font-garamond">4.94 / 5.0</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Pills Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-[#E8E2D6] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7A8E82]" />
              <h2 className="text-xs font-bold text-[#1E2E24] uppercase tracking-wider">
                Select Subcategory
              </h2>
            </div>
            {selectedSubcategory !== 'All Subcategories' && (
              <button
                onClick={() => setSelectedSubcategory('All Subcategories')}
                className="text-xs text-[#8C5E33] hover:underline font-semibold cursor-pointer"
              >
                Clear Subcategory
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {subcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub;
              const count = subcategoryCounts[sub] || 0;

              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-[#1F2E24] text-white shadow-sm ring-2 ring-[#8C5E33]'
                      : 'bg-[#FAF7F2] hover:bg-[#EFE9DD] text-[#425447] border border-[#DDD5C7]'
                  }`}
                >
                  <span>{sub}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-garamond font-bold ${
                    isSelected ? 'bg-[#8C5E33] text-white' : 'bg-[#E5DDD0] text-[#425447]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search, Kerala District & Filter Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-2xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              placeholder={`Search ${categoryMeta.shortTitle} by name, city, specialty...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-[#1E2922] placeholder-[#8A9C91] focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/30"
            />
            <Search className="w-4 h-4 text-[#7A8E82] absolute left-3 top-2.5 pointer-events-none" />
          </div>

          {/* Kerala District Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#7A8E82]" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter by Kerala District"
              className="px-3 py-2 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-[#1E2922] focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/30 cursor-pointer"
            >
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7F72] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort Vendors"
              className="px-3 py-2 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-[#1E2922] focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/30 cursor-pointer"
            >
              <option value="rating">Top Rated (4.9+)</option>
              <option value="bookings">Most Verified Bookings</option>
              <option value="response">Fastest WhatsApp SLA</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-[#8C5E33] text-white border-[#8C5E33]'
                : 'bg-[#FAF7F2] text-[#33463A] border-[#DDD5C7] hover:bg-[#EFE9DD]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-[#8C5E33] text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Collapsible Advanced Filters Tray */}
        {isSidebarOpen && (
          <div className="mt-3 p-5 rounded-2xl bg-white border border-[#E8E2D6] shadow-sm space-y-4 animate-in fade-in-50">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-3">
              <h3 className="text-xs font-bold text-[#1E2E24] uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#7A8E82]" />
                <span>Refine Artisan Results</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-[#8C5E33] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Verified Pro Toggle */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DAD0] cursor-pointer hover:bg-[#F2ECE1]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#7A8E82] focus:ring-[#7A8E82]"
                />
                <div className="text-xs">
                  <p className="font-bold text-[#1A261F] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    MAKERS Verified Only
                  </p>
                  <p className="text-[11px] text-[#697E71]">Vetted background & identity</p>
                </div>
              </label>

              {/* Fast SLA Toggle */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DAD0] cursor-pointer hover:bg-[#F2ECE1]">
                <input
                  type="checkbox"
                  checked={fastRespondersOnly}
                  onChange={(e) => setFastRespondersOnly(e.target.checked)}
                  className="rounded text-[#7A8E82] focus:ring-[#7A8E82]"
                />
                <div className="text-xs">
                  <p className="font-bold text-[#1A261F] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Instant WhatsApp SLA (~30m)
                  </p>
                  <p className="text-[11px] text-[#697E71]">95%+ on-time response rate</p>
                </div>
              </label>

              {/* Top Rated Toggle */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DAD0] cursor-pointer hover:bg-[#F2ECE1]">
                <input
                  type="checkbox"
                  checked={highRatingOnly}
                  onChange={(e) => setHighRatingOnly(e.target.checked)}
                  className="rounded text-[#7A8E82] focus:ring-[#7A8E82]"
                />
                <div className="text-xs">
                  <p className="font-bold text-[#1A261F] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    Elite 4.9+ Stars Only
                  </p>
                  <p className="text-[11px] text-[#697E71]">Top tier client satisfaction</p>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Main Vendor Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A261F]">
              {selectedSubcategory === 'All Subcategories' ? `${categoryMeta.shortTitle} in Kerala` : selectedSubcategory}
            </h2>
            <p className="text-xs text-[#62776A] mt-0.5">
              Showing <span className="font-bold text-[#1A261F] font-garamond">{filteredVendors.length}</span> luxury artisans matching your preferences
            </p>
          </div>

          <button
            onClick={onOpenPlannerModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F0EAE1] hover:bg-[#E7DFD4] text-[#855B32] border border-[#D8CCBD] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A67849]" />
            <span>AI Budget Estimator</span>
          </button>
        </div>

        {/* Vendors List */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor: Vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onOpenDetails={(v: Vendor, tab?: 'packages' | 'testimonials') => {
                  setDetailVendor(v);
                  setDetailInitialTab(tab || 'packages');
                }}
                onRequestBooking={(v: Vendor) => {
                  setRequestVendor(v);
                  setSelectedPackage(undefined);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2D6] shadow-2xs space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#DDD5C7] flex items-center justify-center mx-auto text-[#7A8E82]">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
                No Artisans Found in This Subcategory
              </h3>
              <p className="text-xs text-[#6B7F72]">
                Try selecting "All Subcategories" or reset district filters to discover all available verified professionals in Kerala.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#1E2E24] hover:bg-[#2A3F32] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailVendor && (
        <VendorDetailModal
          vendor={detailVendor}
          onClose={() => setDetailVendor(null)}
          onRequestBookingWithPackage={(pkg?: VendorPackage) => {
            const v = detailVendor;
            setDetailVendor(null);
            setRequestVendor(v);
            setSelectedPackage(pkg);
          }}
          initialTab={detailInitialTab}
        />
      )}

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
