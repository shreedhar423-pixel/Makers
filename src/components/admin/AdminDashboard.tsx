import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingRequest, BookingStatus, Vendor } from '../../types';
import { DISTRICTS } from '../../data/mockData';
import { 
  SlidersHorizontal, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  FileText,
  Activity, 
  Settings, 
  Star,
  Award
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    bookings, 
    vendors, 
    updateBookingStatus, 
    triggerAdminFollowUp, 
    toggleFlagVendor, 
    slaConfigHours, 
    setSlaConfigHours
  } = useBooking();

  // Tab & Filters inside Admin
  const [adminTab, setAdminTab] = useState<'bookings' | 'analytics' | 'vendors' | 'reviews' | 'sla-config'>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [districtFilter, setDistrictFilter] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Booking Drawer/Modal
  const [activeBooking, setActiveBooking] = useState<BookingRequest | null>(null);
  const [overrideStatus, setOverrideStatus] = useState<BookingStatus>('Confirmed');
  const [overrideNotes, setOverrideNotes] = useState<string>('');

  // Calculate Metrics
  const totalBookings = bookings.length;
  const respondedBookings = bookings.filter(b => b.status !== 'Pending' && b.status !== 'Follow-up Required');
  const vendorResponseRate = totalBookings > 0 ? Math.round((respondedBookings.length / totalBookings) * 100) : 0;
  
  const acceptedBookings = bookings.filter(b => b.status === 'Vendor Responded' || b.status === 'Confirmed' || b.status === 'Completed');
  const vendorAcceptanceRate = totalBookings > 0 ? Math.round((acceptedBookings.length / Math.max(1, respondedBookings.length)) * 100) : 0;
  
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed');
  const confirmationRate = totalBookings > 0 ? Math.round((confirmedBookings.length / totalBookings) * 100) : 0;
  
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const completionRate = totalBookings > 0 ? Math.round((completedBookings.length / totalBookings) * 100) : 0;
  
  const verifiedReviewsCount = bookings.filter(b => b.reviewSubmitted).length;
  const verifiedReviewRate = completedBookings.length > 0 ? Math.round((verifiedReviewsCount / completedBookings.length) * 100) : 0;
  
  const noResponseBookings = bookings.filter(b => b.status === 'Follow-up Required' || b.isSlaBreached);
  const noResponseRate = totalBookings > 0 ? Math.round((noResponseBookings.length / totalBookings) * 100) : 0;

  // Pipeline total value in INR
  const totalPipelineValue = bookings.reduce((sum, b) => sum + ((b.budgetMin + b.budgetMax) / 2), 0);

  // Filtered bookings list
  const filteredBookings = bookings.filter(b => {
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchCat = categoryFilter === 'All Categories' || b.vendorCategory === categoryFilter;
    const matchDist = districtFilter === 'All Districts' || b.locationDistrict === districtFilter;
    const matchSearch = searchQuery === '' ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchCat && matchDist && matchSearch;
  });

  const handleManualStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;
    updateBookingStatus(activeBooking.id, overrideStatus, overrideNotes, 'MAKERS Team');
    setActiveBooking(prev => prev ? { ...prev, status: overrideStatus } : null);
    setOverrideNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen bg-[#FAF7F2]">
      {/* Admin Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
              MAKERS Operations Command
            </span>
            <span className="text-xs text-[#63796D] font-medium">Phase 1 Real-Time Oversight</span>
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-[#1D2B22] mt-1">Operations & SLA Center</h1>
          <p className="text-xs text-[#526458] mt-0.5">
            Monitor attributable leads, resolve 4-hour SLA breaches, track INR pipelines, and manage quality metrics.
          </p>
        </div>

        {/* SLA Status Indicator */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-[#EAE3D7] shadow-2xs">
          <div className="text-right text-xs">
            <div className="text-[10px] uppercase font-bold text-[#768C7E]">Configured Vendor SLA</div>
            <div className="font-serif font-bold text-[#8A5D33]">{slaConfigHours}.0 Hours Window</div>
          </div>
          <button
            onClick={() => setAdminTab('sla-config')}
            className="p-2 bg-[#FAF7F2] rounded-xl border border-[#E0D8CB] hover:bg-white text-[#324538]"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics in INR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-[#E6DFD3] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#63796D]">
            <span>Total Attributable Leads</span>
            <Activity className="w-4 h-4 text-[#7A8E82]" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#1D2B22]">{totalBookings}</div>
          <div className="text-[11px] text-[#8A5D33] font-semibold">
            Pipeline: ₹{(totalPipelineValue / 100000).toFixed(2)} Lakhs
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-[#E6DFD3] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#63796D]">
            <span>Vendor Response Rate</span>
            <Clock className="w-4 h-4 text-[#7A8E82]" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#5B7063]">{vendorResponseRate}%</div>
          <div className="text-[11px] text-[#526458]">
            Target: &gt;90% response
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-[#E6DFD3] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#63796D]">
            <span>Acceptance Rate</span>
            <TrendingUp className="w-4 h-4 text-[#7A8E82]" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#1D2B22]">{vendorAcceptanceRate}%</div>
          <div className="text-[11px] text-[#526458]">
            {acceptedBookings.length} confirmed / responded
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-[#E6DFD3] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#63796D]">
            <span>SLA Breaches / Overdue</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className={`font-serif text-2xl font-extrabold ${noResponseBookings.length > 0 ? 'text-rose-600' : 'text-[#5B7063]'}`}>
            {noResponseBookings.length}
          </div>
          <div className="text-[11px] text-[#526458]">
            {noResponseRate}% rate (&lt;5% ideal)
          </div>
        </div>
      </div>

      {/* Admin Navigation Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE3D7] pb-2 overflow-x-auto">
        <button
          onClick={() => setAdminTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'bookings'
              ? 'bg-[#7A8E82] text-white shadow-xs'
              : 'text-[#4A5D51] hover:bg-[#EFE9DD]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>All Bookings Queue ({bookings.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'analytics'
              ? 'bg-[#7A8E82] text-white shadow-xs'
              : 'text-[#4A5D51] hover:bg-[#EFE9DD]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Conversion Funnel Analytics</span>
        </button>

        <button
          onClick={() => setAdminTab('vendors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'vendors'
              ? 'bg-[#7A8E82] text-white shadow-xs'
              : 'text-[#4A5D51] hover:bg-[#EFE9DD]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Artisan Directory ({vendors.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'reviews'
              ? 'bg-[#7A8E82] text-white shadow-xs'
              : 'text-[#4A5D51] hover:bg-[#EFE9DD]'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Verified Reviews ({verifiedReviewsCount})</span>
        </button>

        <button
          onClick={() => setAdminTab('sla-config')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'sla-config'
              ? 'bg-[#7A8E82] text-white shadow-xs'
              : 'text-[#4A5D51] hover:bg-[#EFE9DD]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>SLA Engine Settings</span>
        </button>
      </div>

      {/* Tab 1: Bookings Management */}
      {adminTab === 'bookings' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E6DFD3] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search booking ID, customer, vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8E82]/20 text-[#1D2B22]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl text-[#1D2B22]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Vendor Responded">Vendor Responded</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Completed">Completed</option>
                <option value="Declined">Declined</option>
              </select>

              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl text-[#1D2B22]"
              >
                {DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-[#E6DFD3] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#55695C] border-b border-[#EAE3D7]">
                  <th className="p-3.5 font-bold uppercase text-[10px]">Booking ID</th>
                  <th className="p-3.5 font-bold uppercase text-[10px]">Customer</th>
                  <th className="p-3.5 font-bold uppercase text-[10px]">Artisan & Package</th>
                  <th className="p-3.5 font-bold uppercase text-[10px]">Event Date</th>
                  <th className="p-3.5 font-bold uppercase text-[10px]">Budget (₹)</th>
                  <th className="p-3.5 font-bold uppercase text-[10px]">Status</th>
                  <th className="p-3.5 font-bold uppercase text-[10px] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D7]">
                {filteredBookings.map((b) => {
                  const isSlaBreached = b.isSlaBreached || b.status === 'Follow-up Required';
                  return (
                    <tr key={b.id} className="hover:bg-white/90 transition">
                      <td className="p-3.5 font-mono font-bold text-[#1D2B22]">
                        {b.id}
                        {isSlaBreached && (
                          <span className="block text-[9px] text-rose-600 font-bold uppercase">⚠️ SLA Breached</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#1D2B22]">{b.customerName}</div>
                        <div className="text-[10px] text-[#63796D]">{b.customerPhoneWhatsApp}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#1D2B22]">{b.vendorName}</div>
                        <div className="text-[10px] text-[#8A5D33] font-medium">{b.servicePackageName}</div>
                      </td>
                      <td className="p-3.5">
                        <div>{b.preferredDate}</div>
                        <div className="text-[10px] text-[#63796D] truncate max-w-[120px]">{b.locationDistrict}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] text-[#8C5E33]">₹</span>
                          <span className="font-garamond text-base font-bold text-[#8C5E33] tabular-nums">
                            {b.budgetMin.toLocaleString('en-IN')} - {b.budgetMax.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          b.status === 'Confirmed' ? 'bg-[#EAF0EC] text-[#4F6357] border-[#CFDBD3]' :
                          b.status === 'Completed' ? 'bg-[#EAF0EC] text-[#4F6357] border-[#CFDBD3]' :
                          b.status === 'Declined' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          b.status === 'Follow-up Required' ? 'bg-rose-50 text-rose-800 border-rose-200 animate-pulse' :
                          'bg-[#FAF7F2] text-[#63796D] border-[#E0D8CB]'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setActiveBooking(b)}
                          className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#5B7063] font-bold text-xs rounded-xl border border-[#DDD5C7] transition shadow-2xs"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Analytics & Funnel */}
      {adminTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1D2B22]">
              Lead Stage Conversion Funnel
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>1. Booking Requests Created</span>
                  <span>{totalBookings} (100%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7A8E82] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>2. Vendor Responded on WhatsApp</span>
                  <span>{respondedBookings.length} ({vendorResponseRate}%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8A9C91] rounded-full" style={{ width: `${vendorResponseRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>3. Availability Accepted</span>
                  <span>{acceptedBookings.length} ({vendorAcceptanceRate}%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9EB0A6] rounded-full" style={{ width: `${vendorAcceptanceRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>4. Confirmed Bookings</span>
                  <span>{confirmedBookings.length} ({confirmationRate}%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A27546] rounded-full" style={{ width: `${confirmationRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>5. Completed & Reviewed</span>
                  <span>{completedBookings.length} ({completionRate}%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C5E33] rounded-full" style={{ width: `${completionRate}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1D2B22]">
              SLA Compliance & Intervention Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7]">
                <div className="text-[#63796D] text-[11px]">Avg Response Time</div>
                <div className="font-serif font-bold text-lg text-[#5B7063] mt-1">42 Minutes</div>
                <div className="text-[10px] text-[#63796D]">Within 4.0h target</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7]">
                <div className="text-[#63796D] text-[11px]">SLA Breach Incidents</div>
                <div className="font-serif font-bold text-lg text-rose-600 mt-1">{noResponseBookings.length}</div>
                <div className="text-[10px] text-[#63796D]">Automatic follow-up</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7]">
                <div className="text-[#63796D] text-[11px]">Verified Review Rate</div>
                <div className="font-serif font-bold text-lg text-[#5B7063] mt-1">{verifiedReviewRate}%</div>
                <div className="text-[10px] text-[#63796D]">Post-completion</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7]">
                <div className="text-[#63796D] text-[11px]">Pipeline Active Value</div>
                <div className="font-serif font-bold text-lg text-[#8C5E33] mt-1">
                  ₹{(totalPipelineValue / 100000).toFixed(1)}L
                </div>
                <div className="text-[10px] text-[#63796D]">INR Attributable</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Vendor Directory */}
      {adminTab === 'vendors' && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#E6DFD3] p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#1D2B22]">Verified Artisan Directory & Quality Flags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.map((v) => (
              <div key={v.id} className="p-4 bg-white rounded-2xl border border-[#EAE3D7] flex items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <img src={v.imageUrl} alt={v.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#1D2B22]">{v.name}</h4>
                    <div className="text-[11px] text-[#63796D]">{v.category} • {v.district}</div>
                    <div className="text-[10px] text-[#8A5D33] font-semibold mt-0.5">
                      Starting ₹{v.startingPrice.toLocaleString('en-IN')} | {v.responseRatePct}% response
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFlagVendor(v.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                    v.isFlaggedForAdminReview
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-white text-[#4A5D51] border-[#E0D8CB] hover:bg-[#EFE9DD]'
                  }`}
                >
                  {v.isFlaggedForAdminReview ? 'Flagged' : 'Flag Pro'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Reviews Moderation */}
      {adminTab === 'reviews' && (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#1D2B22]">Published Verified Client Reviews</h3>
          <div className="space-y-3">
            {bookings.filter(b => b.verifiedReview).map((b) => {
              const rev = b.verifiedReview!;
              return (
                <div key={rev.id} className="p-4 bg-white rounded-2xl border border-[#EAE3D7] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1D2B22]">{b.vendorName}</span>
                    <span className="text-[10px] text-[#63796D]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-[#1D2B22] ml-1">by {rev.customerName}</span>
                  </div>
                  <p className="text-xs text-[#526458] italic bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D7]">
                    "{rev.comment}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: SLA Configuration */}
      {adminTab === 'sla-config' && (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#E6DFD3] shadow-xs space-y-6 max-w-xl">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1D2B22]">Vendor Response SLA Configuration</h3>
            <p className="text-xs text-[#63796D] mt-0.5">
              Initial vendor response SLA (default: 4 hours, configurable by operations).
            </p>
          </div>

          <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#EAE3D7]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#1D2B22]">Configured SLA Threshold:</span>
              <span className="text-[#8A5D33] font-serif text-base font-extrabold">{slaConfigHours} Hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={slaConfigHours}
              onChange={(e) => setSlaConfigHours(Number(e.target.value))}
              className="w-full accent-[#7A8E82] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#768C7E]">
              <span>1 Hour (Fast Track)</span>
              <span>4 Hours (Default MAKERS)</span>
              <span>24 Hours</span>
            </div>
          </div>
        </div>
      )}

      {/* Booking Detail Drawer Modal */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className="p-5 bg-[#243128] text-white flex items-center justify-between border-b border-[#37493D]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                    {activeBooking.id}
                  </span>
                  <span className="text-xs text-[#B5C7BD]">{activeBooking.eventType}</span>
                </div>
                <h3 className="font-serif text-xl font-extrabold mt-1">{activeBooking.vendorName}</h3>
              </div>
              <button onClick={() => setActiveBooking(null)} className="text-[#9EB2A6] hover:text-white">✕</button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Customer and Vendor summary */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7] space-y-1">
                  <div className="font-serif font-bold text-[#1D2B22] mb-1">Customer Details</div>
                  <div>Name: <strong>{activeBooking.customerName}</strong></div>
                  <div>WhatsApp: <strong>{activeBooking.customerPhoneWhatsApp}</strong></div>
                  <div>Email: {activeBooking.customerEmail || 'None'}</div>
                  <div className="text-[#8A5D33] font-semibold pt-1">
                    Guests: {activeBooking.expectedGuestsLabel || (activeBooking.expectedGuests ? `${activeBooking.expectedGuests} Guests` : 'Flexible')}
                  </div>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D7] space-y-1">
                  <div className="font-serif font-bold text-[#1D2B22] mb-1">Service & Date</div>
                  <div>Package: <strong>{activeBooking.servicePackageName}</strong></div>
                  <div>Date: <strong>{activeBooking.preferredDate}</strong> ({activeBooking.locationDistrict})</div>
                  <div>Budget: ₹{activeBooking.budgetMin.toLocaleString('en-IN')} - ₹{activeBooking.budgetMax.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Customer Remarks */}
              {(activeBooking.additionalNotes || activeBooking.specialRemarks) && (
                <div className="p-4 bg-white rounded-2xl border border-[#EAE3D7] text-xs space-y-2">
                  <div className="font-bold text-[#768C7E] uppercase tracking-wider text-[10px]">
                    Customer Event Notes & Detailed Remarks
                  </div>
                  {activeBooking.additionalNotes && (
                    <p className="text-[#324538]">{activeBooking.additionalNotes}</p>
                  )}
                  {activeBooking.specialRemarks && (
                    <div className="pt-2 border-t border-[#EAE3D7] text-[#8A5D33] font-medium">
                      <strong>Special Remarks: </strong> {activeBooking.specialRemarks}
                    </div>
                  )}
                </div>
              )}

              {/* Status Synchronization Form */}
              <form onSubmit={handleManualStatusUpdate} className="p-4 bg-white rounded-2xl border border-[#EAE3D7] space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#55695C]">
                  Status Synchronization & Override
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={overrideStatus}
                    onChange={(e) => setOverrideStatus(e.target.value as BookingStatus)}
                    className="px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-[#1D2B22]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Vendor Responded">Vendor Responded</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Follow-up Required">Follow-up Required</option>
                    <option value="Completed">Completed</option>
                    <option value="Declined">Declined</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Sync note / reasoning..."
                    value={overrideNotes}
                    onChange={(e) => setOverrideNotes(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-[#1D2B22]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A8E82] text-white font-bold text-xs rounded-xl hover:bg-[#687C70] transition shadow-2xs"
                >
                  Apply Status Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
