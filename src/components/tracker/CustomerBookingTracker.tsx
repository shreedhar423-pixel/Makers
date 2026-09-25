import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingRequest, BookingStatus } from '../../types';
import { 
  CalendarCheck, 
  Search, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export const CustomerBookingTracker: React.FC = () => {
  const { 
    bookings, 
    selectedBookingId, 
    setSelectedBookingId, 
    submitVerifiedReview, 
    setActiveTab
  } = useBooking();

  const [searchInput, setSearchInput] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Active selected booking
  const currentBooking = bookings.find(b => b.id.toLowerCase() === (selectedBookingId || '').toLowerCase()) || bookings[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const match = bookings.find(b => b.id.toLowerCase() === searchInput.trim().toLowerCase());
    if (match) {
      setSelectedBookingId(match.id);
      setSearchInput('');
    } else {
      alert(`Booking ID "${searchInput}" not found. Try one from the list.`);
    }
  };

  const getStatusStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Vendor Responded': return 1;
      case 'Confirmed': return 2;
      case 'Completed': return 3;
      case 'Declined': return -1;
      case 'Follow-up Required': return 0;
      default: return 0;
    }
  };

  const steps = [
    { title: 'Request Dispatched', desc: '4h SLA Active' },
    { title: 'Artisan Responded', desc: 'Date Verified' },
    { title: 'Confirmed Booking', desc: 'MAKERS Protected' },
    { title: 'Completed Event', desc: 'Verified Review' }
  ];

  const currentStepIdx = currentBooking ? getStatusStepIndex(currentBooking.status) : 0;

  // Calculate remaining SLA time for pending requests
  const getSlaInfo = (booking: BookingRequest) => {
    if (booking.status !== 'Pending' && booking.status !== 'Follow-up Required') return null;
    const now = new Date().getTime();
    const deadline = new Date(booking.slaDeadline).getTime();
    const diffMins = Math.round((deadline - now) / (1000 * 60));

    if (diffMins <= 0 || booking.isSlaBreached) {
      return {
        breached: true,
        text: 'SLA Window Elapsed · THE MAKERS Concierge Intervening',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200'
      };
    }
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return {
      breached: false,
      text: `${hours}h ${mins}m remaining in vendor response window`,
      badgeColor: 'bg-[#EAF0EC] text-[#4F6357] border-[#CFDBD3]'
    };
  };

  const slaInfo = currentBooking ? getSlaInfo(currentBooking) : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBooking) return;
    submitVerifiedReview(currentBooking.id, rating, reviewComment);
    setReviewModalOpen(false);
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen bg-[#FAF7F2]">
      {/* Top Banner with Glass Backdrop */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
              Customer Booking Tracker
            </span>
            <span className="text-xs text-[#63796D] font-medium">Real-Time Lead & Booking Status</span>
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-[#1D2B22] mt-1">Live Booking Request Tracker</h1>
          <p className="text-xs text-[#526458] mt-0.5">
            Track artisan responsiveness, WhatsApp communication logs, and verified review status in Indian Rupees (₹).
          </p>
        </div>

        {/* Quick Search ID */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search ID (e.g. MK-2026-00472)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 font-mono text-[#1D2B22]"
            />
            <Search className="w-4 h-4 text-[#7A8E82] absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#7A8E82] text-white font-bold text-xs rounded-xl hover:bg-[#687C70] transition shrink-0 shadow-2xs"
          >
            Track
          </button>
        </form>
      </div>

      {/* Main Grid: Left List + Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Your Bookings List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#526458]">
              Your Booking Requests ({bookings.length})
            </h3>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-xs text-[#8A5D33] hover:underline font-bold"
            >
              + New Request
            </button>
          </div>

          <div className="space-y-3">
            {bookings.map((booking) => {
              const isSelected = currentBooking?.id === booking.id;
              const statusColor = 
                booking.status === 'Confirmed' ? 'bg-[#EAF0EC] text-[#4F6357] border-[#CFDBD3]' :
                booking.status === 'Completed' ? 'bg-[#EAF0EC] text-[#4F6357] border-[#CFDBD3]' :
                booking.status === 'Declined' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                booking.status === 'Follow-up Required' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                booking.status === 'Vendor Responded' ? 'bg-[#F5ECE1] text-[#8A5D33] border-[#DFCEBD]' :
                'bg-[#F5F0E6] text-[#63796D] border-[#E0D8CB]';

              return (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBookingId(booking.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-white/95 border-[#7A8E82] shadow-lg ring-2 ring-[#7A8E82]/20'
                      : 'bg-white/75 border-[#E6DFD3] hover:border-[#CFDEC4]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img src={booking.vendorImage} alt={booking.vendorName} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#7A8E82] block">{booking.id}</span>
                        <h4 className="font-serif font-bold text-xs text-[#1D2B22] line-clamp-1">{booking.vendorName}</h4>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${statusColor}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#526458] flex items-center justify-between pt-2 border-t border-[#F0EAE0]">
                    <span className="truncate max-w-[150px]">{booking.servicePackageName}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[10px] text-[#8C5E33]">₹</span>
                      <span className="font-garamond text-base font-bold text-[#8C5E33] tabular-nums">
                        {booking.budgetMin.toLocaleString('en-IN')} - {booking.budgetMax.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Booking Detailed View */}
        {currentBooking ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Status & SLA Alert Header on Glass */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-[#E6DFD3] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE3D7]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#7A8E82]">{currentBooking.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
                      {currentBooking.status}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-extrabold text-[#1D2B22] mt-1">
                    {currentBooking.servicePackageName}
                  </h2>
                  <p className="text-xs text-[#526458]">
                    Artisan: <strong>{currentBooking.vendorName}</strong> ({currentBooking.vendorCategory})
                  </p>
                </div>

                {slaInfo && (
                  <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${slaInfo.badgeColor}`}>
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="font-bold">{slaInfo.text}</span>
                  </div>
                )}
              </div>

              {/* Progress Stepper */}
              {currentBooking.status !== 'Declined' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {steps.map((st, idx) => {
                    const isDone = currentStepIdx >= idx;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border flex flex-col justify-between ${
                          isDone
                            ? 'bg-[#EAF0EC] border-[#CFDBD3] text-[#24332A]'
                            : 'bg-[#FAF7F2] border-[#EAE3D7] text-[#7A8E82]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone ? 'bg-[#7A8E82] text-white' : 'bg-[#DDD5C7] text-[#63796D]'
                          }`}>
                            {idx + 1}
                          </span>
                          {isDone && <CheckCircle2 className="w-4 h-4 text-[#7A8E82]" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isDone ? 'text-[#1D2B22]' : 'text-[#7A8E82]'}`}>
                            {st.title}
                          </div>
                          <div className="text-[10px] text-[#63796D]">{st.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <strong className="font-bold">Artisan Unavailable for Date: </strong>
                    {currentBooking.vendorName} declined this specific request. THE MAKERS Concierge is happy to recommend available matched artisans for your date.
                  </div>
                </div>
              )}

              {/* Booking Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D7]">
                  <div className="text-[10px] text-[#768C7E] font-semibold uppercase">Preferred Date</div>
                  <div className="font-serif font-bold text-[#1D2B22] mt-0.5">{currentBooking.preferredDate}</div>
                  <div className="text-[10px] text-[#526458]">{currentBooking.preferredTime || 'Standard Schedule'}</div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D7]">
                  <div className="text-[10px] text-[#768C7E] font-semibold uppercase">Location & Guests</div>
                  <div className="font-serif font-bold text-[#1D2B22] mt-0.5 truncate">{currentBooking.locationDistrict}</div>
                  <div className="text-[10px] text-[#8A5D33] font-bold truncate">
                    {currentBooking.expectedGuestsLabel || (currentBooking.expectedGuests ? `${currentBooking.expectedGuests} Guests` : 'Flexible count')}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D7]">
                  <div className="text-[10px] text-[#768C7E] font-semibold uppercase">Budget Scope (₹)</div>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-xs text-[#8C5E33]">₹</span>
                    <span className="font-garamond text-lg font-bold text-[#8C5E33] tabular-nums">
                      {currentBooking.budgetMin.toLocaleString('en-IN')} - {currentBooking.budgetMax.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#768C7E]">Attributable lead</div>
                </div>
              </div>

              {/* Customer Requirements & Detailed Remarks */}
              {(currentBooking.additionalNotes || currentBooking.specialRemarks) && (
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D7] text-xs space-y-2">
                  {currentBooking.additionalNotes && (
                    <div>
                      <div className="text-[10px] font-bold text-[#768C7E] uppercase tracking-wider">Your Event Vision</div>
                      <p className="text-[#324538] mt-0.5 leading-relaxed">{currentBooking.additionalNotes}</p>
                    </div>
                  )}
                  {currentBooking.specialRemarks && (
                    <div className="pt-2 border-t border-[#E5DDD0]">
                      <div className="text-[10px] font-bold text-[#8A5D33] uppercase tracking-wider">Special Customer Remarks</div>
                      <p className="text-[#1F2F24] mt-0.5 font-medium leading-relaxed">{currentBooking.specialRemarks}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Verified Review CTA if Completed */}
              {currentBooking.status === 'Completed' && (
                <div className="p-5 bg-gradient-to-r from-amber-500/10 via-[#EAF0EC] to-amber-500/10 rounded-2xl border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-[#8A5D33]">
                      <Sparkles className="w-4 h-4 text-[#A67849]" />
                      <span>Verified Review Authorization</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1D2B22]">
                      {currentBooking.reviewSubmitted ? 'Verified Review Published!' : 'Rate your experience with ' + currentBooking.vendorName}
                    </h4>
                    <p className="text-xs text-[#526458]">
                      {currentBooking.reviewSubmitted 
                        ? 'Thank you! Your verified review helps the community discover top quality.'
                        : 'Submit a verified review to help future celebration hosts.'}
                    </p>
                  </div>

                  {!currentBooking.reviewSubmitted ? (
                    <button
                      onClick={() => setReviewModalOpen(true)}
                      className="px-5 py-2.5 bg-[#7A8E82] text-white font-bold text-xs rounded-xl hover:bg-[#687C70] shadow-md transition flex items-center gap-1.5 shrink-0 active:scale-95"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>Write Verified Review</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-[#CFDBD3] text-xs font-bold text-[#5B7063]">
                      <CheckCircle2 className="w-4 h-4 text-[#7A8E82]" />
                      <span>{currentBooking.verifiedReview?.rating} ★ Review Approved</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Audit Trail & WhatsApp Sync Log */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-[#E6DFD3] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D7]">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1D2B22]">
                    Audit Log & WhatsApp Dispatch Trail
                  </h3>
                  <p className="text-xs text-[#63796D]">Tamper-evident timeline of notifications and vendor interactions</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#4F6357] font-semibold bg-[#EAF0EC] px-3 py-1 rounded-full border border-[#CFDBD3]">
                  <ShieldCheck className="w-4 h-4 text-[#7A8E82]" />
                  <span>Attributable Lead</span>
                </div>
              </div>

              <div className="space-y-3">
                {currentBooking.auditTrail.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-xs p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D7]">
                    <div className="w-2 h-2 rounded-full bg-[#7A8E82] mt-1.5 shrink-0" />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2B22] font-semibold">{log.action}</strong>
                        <span className="text-[10px] text-[#7A8E82] font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-[#526458] text-[11px]">Actor: <strong>{log.actor}</strong> {log.notes && `• ${log.notes}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Verified Review Modal */}
      {reviewModalOpen && currentBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-6 border border-white/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1D2B22]">
                Verified Review for {currentBooking.vendorName}
              </h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-[#7A8E82] hover:text-[#1D2B22]">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1.5">Rating Score</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-xl transition ${rating >= s ? 'text-amber-500' : 'text-[#DDD5C7]'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2B22] mb-1">Your Detailed Experience</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share how the vendor performed, punctuality, quality of deliverables, and communication..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#54685C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
