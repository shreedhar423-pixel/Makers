import React, { useState } from 'react';
import { Vendor, VendorPackage } from '../../types';
import { DISTRICTS } from '../../data/mockData';
import { useBooking } from '../../context/BookingContext';
import { MakersLogo } from '../common/MakersLogo';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface BookingRequestModalProps {
  vendor: Vendor;
  initialPackage?: VendorPackage;
  onClose: () => void;
}

export const BookingRequestModal: React.FC<BookingRequestModalProps> = ({
  vendor,
  initialPackage,
  onClose
}) => {
  const { createBooking, setActiveTab, setSelectedBookingId } = useBooking();

  const [step, setStep] = useState<number>(1);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  // Form state
  const [eventType, setEventType] = useState<string>(vendor.category);
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState<string>('14:00');
  const [locationDistrict, setLocationDistrict] = useState<string>(vendor.district);
  const [guestOption, setGuestOption] = useState<string>('50-100');
  const [customGuestCount, setCustomGuestCount] = useState<number>(100);
  const [servicePackageName, setServicePackageName] = useState<string>(
    initialPackage?.name || vendor.packages[0]?.name || 'Standard Service Tier'
  );
  const [budgetMin, setBudgetMin] = useState<number>(
    initialPackage?.price || vendor.startingPrice
  );
  const [budgetMax, setBudgetMax] = useState<number>(
    Math.round((initialPackage?.price || vendor.startingPrice) * 1.35)
  );
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [specialRemarks, setSpecialRemarks] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhoneWhatsApp, setCustomerPhoneWhatsApp] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const GUEST_OPTIONS = [
    { id: '1-25', label: 'Up to 25 Guests (Intimate / Micro-event)', count: 25 },
    { id: '25-50', label: '25 - 50 Guests (Small Gathering)', count: 50 },
    { id: '50-100', label: '50 - 100 Guests (Medium Celebration)', count: 100 },
    { id: '100-150', label: '100 - 150 Guests (Standard Event)', count: 150 },
    { id: '150-250', label: '150 - 250 Guests (Large Reception)', count: 200 },
    { id: '250-400', label: '250 - 400 Guests (Grand Banquet / Gala)', count: 300 },
    { id: '400-600', label: '400 - 600 Guests (Mega Celebration)', count: 500 },
    { id: '600+', label: '600+ Guests (Royal Wedding / Convention)', count: 750 },
    { id: 'custom', label: 'Custom Guest Count (Specify exact number)', count: 0 },
    { id: 'flexible', label: 'Flexible / Undecided', count: 0 }
  ];

  const QUICK_REMARK_TAGS = [
    '✨ Outdoor / Garden Lawn',
    '❄️ Indoor AC Hall',
    '🍽️ Curated Veg / Jain / Halal Menu',
    '📸 4K Drone Cinematography & Reels',
    '⚡ Express 48h Teaser Delivery',
    '🎵 Custom Playlist & Live Acoustic',
    '🕒 Strict Varmala / Pheras Itinerary',
    '🕯️ Ambient Candlelight & Royal Mandap',
    '🎤 Wireless PA & Live Dhol Fusion',
    '💄 On-Site Saree Draping & Touchups'
  ];

  const handleAddRemarkTag = (tag: string) => {
    if (specialRemarks.includes(tag)) return;
    setSpecialRemarks(prev => prev ? `${prev}, ${tag}` : tag);
  };

  const handlePackageSelect = (pkg: VendorPackage) => {
    setServicePackageName(pkg.name);
    setBudgetMin(pkg.price);
    setBudgetMax(Math.round(pkg.price * 1.3));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!preferredDate) errs.preferredDate = 'Please select your preferred event date';
    if (!locationDistrict || locationDistrict === 'All Districts') errs.locationDistrict = 'Please select event district';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';
    if (!customerPhoneWhatsApp.trim() || customerPhoneWhatsApp.length < 7) {
      errs.customerPhoneWhatsApp = 'Please provide a valid WhatsApp phone number for lead updates';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getComputedGuests = () => {
    if (guestOption === 'custom') {
      return { count: customGuestCount || 50, label: `${customGuestCount || 50} Guests (Custom)` };
    }
    if (guestOption === 'flexible') {
      return { count: undefined, label: 'Flexible / Undecided' };
    }
    const matched = GUEST_OPTIONS.find(g => g.id === guestOption);
    return { count: matched?.count || 100, label: matched?.label || '100 Guests' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const computedGuestData = getComputedGuests();

    const newId = createBooking({
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorCategory: vendor.category,
      vendorDistrict: vendor.district,
      vendorImage: vendor.imageUrl,
      customerName,
      customerPhoneWhatsApp,
      customerEmail: customerEmail || undefined,
      eventType,
      preferredDate,
      preferredTime,
      locationDistrict,
      expectedGuests: computedGuestData.count,
      expectedGuestsLabel: computedGuestData.label,
      servicePackageName,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      currency: '₹',
      additionalNotes,
      specialRemarks
    });

    setSubmittedBookingId(newId);
    setStep(3);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden relative">
        {/* Top Header */}
        <div className="bg-[#243128] text-white px-6 py-4 flex items-center justify-between border-b border-[#37493D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-200 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-extrabold text-base text-white">Request Booking with {vendor.name}</h3>
                <span className="text-[10px] font-bold bg-[#7A8E82] text-white px-2.5 py-0.5 rounded-full">
                  Phase 1 Form
                </span>
              </div>
              <p className="text-xs text-[#B5C7BD]">Structured lead generation · 4-hour artisan response SLA</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#9EB2A6] hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        {step !== 3 && (
          <div className="px-6 pt-4 pb-3 border-b border-[#EAE3D7] bg-[#F4EFE6] flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#3E5245] font-bold' : 'text-[#82968B]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#7A8E82] text-white font-bold' : 'bg-[#DDD5C7]'}`}>1</span>
              <span>Event & Package Details</span>
            </div>
            <div className="w-12 h-0.5 bg-[#DDD5C7]" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#3E5245] font-bold' : 'text-[#82968B]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#7A8E82] text-white font-bold' : 'bg-[#DDD5C7]'}`}>2</span>
              <span>Your Contact & Remarks</span>
            </div>
          </div>
        )}

        {/* Step 1: Event & Package Selection */}
        {step === 1 && (
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Vendor Mini Banner */}
            <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-[#EAE3D7] shadow-2xs">
              <img src={vendor.imageUrl} alt={vendor.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1D2B22]">{vendor.name}</h4>
                <p className="text-[11px] text-[#8A5D33] font-medium">{vendor.tagline}</p>
                <div className="text-[10px] text-[#63796D] mt-0.5 flex items-center gap-2">
                  <span>Avg response: <strong>{vendor.responseTimeText}</strong></span>
                  <span>•</span>
                  <span>{vendor.verifiedBookingsCount} Verified Events</span>
                </div>
              </div>
            </div>

            {/* Select Package Tier */}
            <div>
              <label className="block text-xs font-bold text-[#1D2B22] mb-2">
                Select Service Package / Tier <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vendor.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      servicePackageName === pkg.name
                        ? 'border-[#7A8E82] bg-white ring-1 ring-[#7A8E82] shadow-2xs'
                        : 'border-[#EAE3D7] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1D2B22]">{pkg.name}</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[10px] text-[#8C5E33]">₹</span>
                        <span className="font-garamond text-lg font-bold text-[#8C5E33] tabular-nums">
                          {pkg.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#667A6F] mt-1 line-clamp-1">{pkg.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Category & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Event / Service Type <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                  />
                  <Calendar className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                </div>
                {errors.preferredDate && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>}
              </div>
            </div>

            {/* Time & Location District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Timing / Schedule
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 17:00 - 23:00 / Full Day"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                  />
                  <Clock className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Event Location District <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={locationDistrict}
                    onChange={(e) => setLocationDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                  >
                    {DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                </div>
                {errors.locationDistrict && <p className="text-[11px] text-rose-500 mt-1">{errors.locationDistrict}</p>}
              </div>
            </div>

            {/* Expected Guests Dropdown Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1D2B22]">
                Expected Guests <span className="text-[#6B8074] font-normal">(Select best bracket)</span>
              </label>
              <div className="relative">
                <select
                  value={guestOption}
                  onChange={(e) => setGuestOption(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                >
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g.id} value={g.id}>{g.label}</option>
                  ))}
                </select>
                <Users className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
              </div>

              {guestOption === 'custom' && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DDD5C7]">
                  <span className="text-xs text-[#526459] font-medium shrink-0">Exact Guest Count:</span>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={customGuestCount}
                    onChange={(e) => setCustomGuestCount(Math.max(1, Number(e.target.value)))}
                    className="w-28 px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg font-bold text-[#1D2B22]"
                  />
                  <span className="text-xs text-[#7A8E82]">attendees</span>
                </div>
              )}
            </div>

            {/* Budget Range in INR */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Min Budget (₹)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={5000}
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-bold text-[#1D2B22]"
                  />
                  <span className="text-xs font-bold text-[#7B8F82] absolute left-3 top-2.5">₹</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Max Budget (₹)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={5000}
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-bold text-[#1D2B22]"
                  />
                  <span className="text-xs font-bold text-[#7B8F82] absolute left-3 top-2.5">₹</span>
                </div>
              </div>
            </div>

            {/* Next button */}
            <div className="pt-4 border-t border-[#EAE3D7] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="px-6 py-2.5 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Info & Remarks */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#576B5F]">
                Your Contact Information (Lead Notification)
              </h4>

              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Ananya Deshmukh"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                  />
                  <User className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                </div>
                {errors.customerName && <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. +91 98201 23456"
                      value={customerPhoneWhatsApp}
                      onChange={(e) => setCustomerPhoneWhatsApp(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                    />
                    <Phone className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.customerPhoneWhatsApp && <p className="text-[11px] text-rose-500 mt-1">{errors.customerPhoneWhatsApp}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
                    />
                    <Mail className="w-4 h-4 text-[#7B8F82] absolute left-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* General Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-[#1D2B22] mb-1">
                Event Requirements & Vision
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe your event theme, schedule flow, or special preferences..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full p-3 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
              />
            </div>

            {/* Special Customer Remarks */}
            <div className="p-4 bg-white rounded-2xl border border-[#EAE3D7] space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#1D2B22]">
                  Customer Special Remarks & Nuanced Notes
                </label>
                <span className="text-[10px] text-[#5B7063] font-bold">1-Tap Quick Tags</span>
              </div>

              {/* Quick 1-tap tags */}
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REMARK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddRemarkTag(tag)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-[#FAF7F2] hover:bg-[#EAE3D7] text-[#33473B] border border-[#DDD5C7] transition active:scale-95"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                placeholder="Add special remarks, dietary needs, specific setup logistics, preferred song list, lighting requests, etc..."
                value={specialRemarks}
                onChange={(e) => setSpecialRemarks(e.target.value)}
                className="w-full p-3 text-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-medium text-[#1E2621]"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EAE3D7] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-[#54685C] hover:text-[#1D2B22] transition"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
              >
                <span>Submit Request to {vendor.name}</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && submittedBookingId && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-[#EAF0EC] text-[#5B7063] border border-[#CFDBD3] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-8 h-8 text-[#5B7063]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
                Booking Request Dispatched
              </span>
              <h3 className="font-serif text-2xl font-extrabold text-[#1D2B22] mt-2">
                Request #{submittedBookingId} Sent!
              </h3>
              <p className="text-xs text-[#526458] max-w-md mx-auto mt-2 leading-relaxed">
                Your structured booking request has been dispatched to <strong>{vendor.name}</strong> via THE MAKERS WhatsApp Business router with a 4-hour response window.
              </p>
            </div>

            {/* Summary Card */}
            <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-[#EAE3D7] text-left text-xs space-y-2 shadow-2xs">
              <div className="flex justify-between py-1 border-b border-[#F0EAE0]">
                <span className="text-[#63796D]">Booking ID:</span>
                <span className="font-mono font-bold text-[#1D2B22]">{submittedBookingId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EAE0]">
                <span className="text-[#63796D]">Artisan:</span>
                <span className="font-bold text-[#1D2B22]">{vendor.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EAE0]">
                <span className="text-[#63796D]">Selected Package:</span>
                <span className="font-bold text-[#8A5D33]">{servicePackageName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EAE0]">
                <span className="text-[#63796D]">Budget Range:</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[10px] text-[#8C5E33]">₹</span>
                  <span className="font-garamond text-base font-bold text-[#8C5E33] tabular-nums">
                    {Number(budgetMin).toLocaleString('en-IN')} - {Number(budgetMax).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#63796D]">SLA Window:</span>
                <span className="font-bold text-[#5B7063]">Within 4.0 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setSelectedBookingId(submittedBookingId);
                  setActiveTab('tracker');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#7A8E82] text-white font-bold text-xs rounded-xl hover:bg-[#687C70] shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Track Live in Customer Tracker</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#EFE9DD] text-[#33473B] font-bold text-xs rounded-xl hover:bg-[#E3DCCE] transition"
              >
                Close & Browse More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
