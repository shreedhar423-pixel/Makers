import React, { useState } from 'react';
import { Vendor, VendorPackage } from '../../types';
import { VendorTestimonials } from './VendorTestimonials';
import { SafeImage } from '../common/SafeImage';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Zap, 
  Lock,
  MessageSquareQuote,
  Package
} from 'lucide-react';

interface VendorDetailModalProps {
  vendor: Vendor;
  onClose: () => void;
  onRequestBookingWithPackage?: (pkg?: VendorPackage) => void;
  initialTab?: 'packages' | 'testimonials';
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  onClose,
  onRequestBookingWithPackage,
  initialTab = 'packages'
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(vendor.imageUrl);
  const [activePackageTab, setActivePackageTab] = useState<string>(vendor.packages[0]?.id || '');
  const [activeViewTab, setActiveViewTab] = useState<'packages' | 'testimonials'>(initialTab);

  const allImages = [vendor.imageUrl, ...(vendor.galleryUrls || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Glass Pop-up Window with Transparent Gradient */}
      <div className="bg-gradient-to-br from-white/95 via-white/85 to-[#F5ECE1]/70 backdrop-blur-2xl w-full max-w-4xl rounded-3xl shadow-[0_25px_70px_rgba(30,45,35,0.25)] border border-white/90 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Header Bar with Category, Verified Tag, and View Tabs */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#EAE3D7]/80 bg-white/80 backdrop-blur-md sticky top-0 z-20 gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
              {vendor.category}
            </span>
            {vendor.verified && (
              <span className="hidden xs:flex items-center gap-1.5 text-xs font-bold text-[#8A5D33] bg-[#F5ECE1] px-3 py-1 rounded-full border border-[#DFCEBD]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E6B3A]" />
                MAKERS Verified
              </span>
            )}
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex items-center gap-1.5 bg-[#ECE6DC]/80 p-1 rounded-2xl border border-[#DDD5C7]">
            <button
              onClick={() => setActiveViewTab('packages')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold min-h-[38px] transition ${
                activeViewTab === 'packages'
                  ? 'bg-white text-[#1F2C23] shadow-xs'
                  : 'text-[#63796D] hover:text-[#1F2C23]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Packages</span>
            </button>
            <button
              onClick={() => setActiveViewTab('testimonials')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold min-h-[38px] transition ${
                activeViewTab === 'testimonials'
                  ? 'bg-white text-[#1F2C23] shadow-xs'
                  : 'text-[#63796D] hover:text-[#1F2C23]'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#7A8E82]" />
              <span>Reviews ({vendor.reviewCount})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B7E73] hover:text-[#1F2923] hover:bg-white/80 transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Main Gallery & Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="h-72 w-full rounded-2xl overflow-hidden bg-[#ECE6DC] border border-white shadow-inner">
                <SafeImage 
                  src={selectedImage} 
                  alt={vendor.name} 
                  categoryHint={vendor.category}
                  className="w-full h-full object-cover"
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                        selectedImage === img ? 'border-[#7A8E82] ring-2 ring-[#7A8E82]/20' : 'border-white/80 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <SafeImage 
                        src={img} 
                        alt="thumbnail" 
                        categoryHint={vendor.category}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#6B7E73] text-xs mb-1.5">
                  <MapPin className="w-4 h-4 text-[#7A8E82] shrink-0" />
                  <span className="font-semibold text-[#2D3E33]">{vendor.district} District, Kerala</span>
                  <span className="text-[#96A69D]">•</span>
                  <span className="text-[#5B7063] font-medium">{vendor.city}</span>
                </div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1D2B22] tracking-tight leading-snug">{vendor.name}</h2>
                <p className="text-xs text-[#8A5D33] font-semibold mt-0.5">{vendor.tagline}</p>

                {/* Detailed Verified Studio Address */}
                {vendor.address && (
                  <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-[11px] text-[#4A5D52] flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8C5E33] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1E2E24]">Studio / Atelier Address: </span>
                      <span>{vendor.address}</span>
                    </div>
                  </div>
                )}

                {/* Service Districts Across Kerala */}
                {vendor.serviceDistricts && vendor.serviceDistricts.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-[10px] font-bold uppercase text-[#73887B] tracking-wider">Service Coverage:</span>
                    {vendor.serviceDistricts.map(dist => (
                      <span key={dist} className="px-2 py-0.5 rounded-md bg-[#EAF0EC] text-[#334639] border border-[#CFDBD3] font-medium text-[10px]">
                        {dist}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-[#526458] mt-3 leading-relaxed">{vendor.description}</p>
              </div>

              {/* Trust Scorecard on Glass with Garamond Numerals */}
              <div className="mt-5 p-4 bg-white/75 backdrop-blur-md rounded-2xl border border-white/90 shadow-2xs space-y-3">
                <div className="text-[11px] font-bold text-[#324538] uppercase tracking-wider flex items-center justify-between">
                  <span>Quality Scorecard</span>
                  <Award className="w-3.5 h-3.5 text-[#7A8E82]" />
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div 
                    onClick={() => setActiveViewTab('testimonials')}
                    className="bg-white/90 p-2.5 rounded-xl border border-[#EAE3D7] cursor-pointer hover:border-[#7A8E82] transition"
                  >
                    <div className="flex items-center gap-1 text-[#667A6E] text-[10px]">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Rating
                    </div>
                    <div className="font-garamond font-bold text-base text-[#1F2C23] mt-0.5 tabular-nums">
                      {vendor.rating} <span className="text-[11px] text-[#7E9386]">({vendor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-[#EAE3D7]">
                    <div className="flex items-center gap-1 text-[#667A6E] text-[10px]">
                      <Award className="w-3 h-3 text-[#7A8E82]" /> Completed
                    </div>
                    <div className="font-garamond font-bold text-base text-[#5B7063] mt-0.5 tabular-nums">
                      {vendor.verifiedBookingsCount} Events
                    </div>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-[#EAE3D7]">
                    <div className="flex items-center gap-1 text-[#667A6E] text-[10px]">
                      <Clock className="w-3 h-3 text-[#7A8E82]" /> Avg Response
                    </div>
                    <div className="font-garamond font-bold text-[#1F2C23] mt-0.5 text-xs truncate tabular-nums">
                      {vendor.responseTimeText}
                    </div>
                  </div>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-[#EAE3D7]">
                    <div className="flex items-center gap-1 text-[#667A6E] text-[10px]">
                      <Zap className="w-3 h-3 text-amber-600" /> Response Rate
                    </div>
                    <div className="font-garamond font-bold text-base text-[#5B7063] mt-0.5 tabular-nums">
                      {vendor.responseRatePct}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 1 Anti-Bypass Trust Notice on Glass */}
          <div className="p-4 rounded-2xl bg-[#EAF0EC]/90 border border-[#CFDBD3] flex items-start gap-3.5 shadow-2xs">
            <div className="p-2 rounded-xl bg-[#7A8E82] text-white shrink-0 mt-0.5 shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs text-[#24332A] leading-relaxed">
              <span className="font-bold">Phase 1 Secure Booking Request Protocol: </span>
              Your booking inquiry is dispatched to {vendor.name} through THE MAKERS WhatsApp Business router with a 4-hour response SLA guarantee and protected client contact information.
            </div>
          </div>

          {/* TAB 1: Available Service Packages with Garamond Numbers */}
          {activeViewTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#1D2B22]">Service Packages & Pricing</h3>
                <span className="text-[11px] text-[#63796D] font-medium">All rates in Indian Rupees (₹)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {vendor.packages.map((pkg) => {
                  const isSelected = activePackageTab === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setActivePackageTab(pkg.id)}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/95 border-[#7A8E82] shadow-lg ring-1 ring-[#7A8E82]/30'
                          : 'bg-gradient-to-br from-white/85 to-[#FAF7F2]/60 border-[#EAE3D7] hover:bg-white hover:border-[#CFDEC4]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="font-serif font-bold text-base text-[#1D2B22]">{pkg.name}</h4>
                          {pkg.popular && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5ECE1] text-[#8A5D33] border border-[#DFCEBD] shrink-0">
                              Popular Tier
                            </span>
                          )}
                        </div>

                        {/* Standard Garamond Pricing */}
                        <div className="flex items-baseline gap-1 my-2.5">
                          <span className="text-base font-semibold text-[#8C5E33]">₹</span>
                          <span className="font-garamond text-3xl font-bold text-[#8C5E33] leading-none tabular-nums tracking-tight">
                            {pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <p className="text-xs text-[#526458] mb-3.5 leading-relaxed">{pkg.description}</p>
                        
                        <div className="space-y-2 pt-3 border-t border-[#EAE3D7]">
                          {pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-[11px] text-[#3E5145]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8E82] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestBookingWithPackage?.(pkg);
                        }}
                        className="mt-5 w-full py-2.5 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <span>Request {pkg.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Verified Client Testimonials in Established Glassmorphism */}
          {activeViewTab === 'testimonials' && (
            <VendorTestimonials vendor={vendor} />
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-md border-t border-[#EAE3D7] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#63796D] flex items-baseline gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
            <span>Starting Package: </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-semibold text-[#8C5E33]">₹</span>
              <strong className="font-garamond text-2xl text-[#8C5E33] font-bold tabular-nums">
                {vendor.startingPrice.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
          <button
            onClick={() => {
              const matchedPkg = vendor.packages.find(p => p.id === activePackageTab) || vendor.packages[0];
              onRequestBookingWithPackage?.(matchedPkg);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#7A8E82] hover:bg-[#687C70] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <span>Proceed to Booking Request</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

