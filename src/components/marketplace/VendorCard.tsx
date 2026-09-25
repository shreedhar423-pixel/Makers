import React from 'react';
import { Vendor } from '../../types';
import { VendorCardReview } from './VendorCardReview';
import { 
  Star, 
  Clock, 
  MapPin, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  onOpenDetails: (vendor: Vendor, initialTab?: 'packages' | 'testimonials') => void;
  onRequestBooking: (vendor: Vendor) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onOpenDetails,
  onRequestBooking
}) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between bg-gradient-to-br from-white/90 via-white/70 to-[#F5EDE1]/50 backdrop-blur-xl border border-white/90 shadow-[0_14px_38px_rgba(40,55,45,0.07)] hover:shadow-[0_24px_55px_rgba(40,55,45,0.14)] hover:border-white">
      {/* Flagged warning if applicable */}
      {vendor.isFlaggedForAdminReview && (
        <div className="bg-amber-600/90 text-white text-[10px] font-bold px-3 py-1 flex items-center gap-1 backdrop-blur-xs">
          <span>⚠️ Under MAKERS Quality Monitoring</span>
        </div>
      )}

      {/* Top Image (Clean image without verified badge) */}
      <div 
        className="relative h-60 w-full overflow-hidden bg-[#ECE6DC] cursor-pointer" 
        onClick={() => onOpenDetails(vendor, 'packages')}
      >
        <img 
          src={vendor.imageUrl} 
          alt={vendor.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Category Pill with Frosted Glass */}
        <div className="absolute top-3.5 left-3.5 bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#324338] border border-white/70 shadow-xs">
          {vendor.category}
        </div>

        {/* Rating & Event Count on Glass Pill (Numbers in Garamond) */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(vendor, 'testimonials');
            }}
            className="flex items-center gap-1.5 bg-black/45 hover:bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 transition cursor-pointer"
            title="Click to view verified client reviews"
          >
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span className="font-garamond font-bold text-sm text-white tabular-nums">{vendor.rating.toFixed(2)}</span>
            <span className="text-[#D3DDD7] text-[11px] font-garamond tabular-nums">({vendor.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#202E26]/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-[#E5EFE9] text-[11px] font-medium border border-white/15">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-garamond font-bold tabular-nums">{vendor.verifiedBookingsCount} Events</span>
          </div>
        </div>
      </div>

      {/* Glass Body Content with Transparent Gradient */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* District Location with Kerala District & City */}
          <div className="flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#7A8E82] shrink-0" />
            <span className="font-semibold text-[#2D3E33] truncate">{vendor.district}</span>
            <span className="text-[#8B9C91]">•</span>
            <span className="text-[#5B7063] font-medium truncate">{vendor.city}</span>
          </div>

          {/* Vendor Name */}
          <h3 
            className="font-serif text-xl font-bold text-[#1F2923] group-hover:text-[#5B7063] transition cursor-pointer leading-snug"
            onClick={() => onOpenDetails(vendor, 'packages')}
          >
            {vendor.name}
          </h3>

          <p className="text-xs text-[#526458] line-clamp-2 leading-relaxed">
            {vendor.tagline}
          </p>

          {/* Dedicated Vendor Review and Star-Rating Component */}
          <VendorCardReview
            vendor={vendor}
            onOpenReviews={(v) => onOpenDetails(v, 'testimonials')}
          />

          {/* Trust Signals Grid on Translucent Glass & Subtle Gradient */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 text-[11px] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#4A5D52]">
              <Clock className="w-3.5 h-3.5 text-[#7A8E82] shrink-0" />
              <span className="truncate font-garamond font-medium tabular-nums">{vendor.responseTimeText}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4A5D52]">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-[#5B7063] font-bold font-garamond tabular-nums">{vendor.responseRatePct}% response</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4A5D52]">
              <TrendingUp className="w-3.5 h-3.5 text-[#7A8E82] shrink-0" />
              <span className="font-garamond tabular-nums">{vendor.acceptanceRatePct}% accept rate</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#667A6E]">
              <div className="w-2 h-2 rounded-full bg-[#7A8E82] animate-pulse" />
              <span className="truncate">{vendor.lastActiveText}</span>
            </div>
          </div>
        </div>

        {/* Pricing in Standard Garamond Numerals & Action Buttons */}
        <div className="pt-3.5 border-t border-[#EAE3D7] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#7E8F84] uppercase tracking-wider font-semibold block">
              Starting From
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-semibold text-[#8C5E33]">₹</span>
              {/* Standard Garamond font for numbers */}
              <span className="font-garamond text-3xl font-bold text-[#8C5E33] leading-none tabular-nums tracking-tight">
                {vendor.startingPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(vendor, 'packages')}
              className="px-3.5 py-2 text-xs font-semibold text-[#44564B] bg-white/90 hover:bg-white rounded-xl border border-[#DDD5C7] transition shadow-2xs cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => onRequestBooking(vendor)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#7A8E82] hover:bg-[#687C70] active:scale-95 shadow-md shadow-[#7A8E82]/20 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Request</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
