import React from 'react';
import { Vendor } from '../../types';
import { 
  Star, 
  ShieldCheck, 
  MessageSquareQuote, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface VendorCardReviewProps {
  vendor: Vendor;
  onOpenReviews: (vendor: Vendor) => void;
  featuredSnippet?: {
    authorName: string;
    eventType: string;
    comment: string;
    rating: number;
  };
}

const DEFAULT_SNIPPETS: Record<string, { authorName: string; eventType: string; comment: string; rating: number }> = {
  'v-101': {
    authorName: 'Rhea Singhania',
    eventType: 'Udaipur Palace Wedding',
    comment: 'Exceeded every dream! Drone 4K reels and candid frames captured every royal moment flawlessly.',
    rating: 5.0
  },
  'v-102': {
    authorName: 'Vikram Merchant',
    eventType: '500-Guest Gala Banquet',
    comment: 'Guests are still raving about the live truffle burrata and Awadhi feast. Michelin hospitality!',
    rating: 5.0
  },
  'v-103': {
    authorName: 'Kavita Vardhan',
    eventType: 'Chhatarpur Royal Mandap',
    comment: '10,000 fresh tuberose and chandeliers looked straight out of a royal fairy tale.',
    rating: 5.0
  },
  'v-104': {
    authorName: 'Meera & Siddharth',
    eventType: 'Bridal HD Glam & Spa',
    comment: 'Punctual, calming presence. The HD airbrush bridal makeup lasted 14 hours flawlessly!',
    rating: 4.95
  },
  'v-105': {
    authorName: 'Kunal Oberoi',
    eventType: 'Goa Sangeet & Beach DJ',
    comment: 'Electrifying sound and Dhol artists! The cold sparkler first dance was unforgettable.',
    rating: 5.0
  },
  'v-106': {
    authorName: 'Meera & Siddharth',
    eventType: 'Couture Bridal Trousseau',
    comment: 'Crafted my dream Zardozi bridal lehenga & matching sherwani. Royal private fitting salon!',
    rating: 5.0
  },
  'v-107': {
    authorName: 'Ananya & Kabir',
    eventType: 'Palatial Wedding Logistics',
    comment: 'Minute-by-minute execution was effortless. Handled 350 VIP guests with absolute grace.',
    rating: 5.0
  },
  'v-108': {
    authorName: 'Aditya & Groomsmen',
    eventType: "Groom Suite & Hot Towel Shave",
    comment: 'The private lounge takeover with straight-razor shaves made our wedding morning unforgettable!',
    rating: 4.95
  }
};

export const VendorCardReview: React.FC<VendorCardReviewProps> = ({
  vendor,
  onOpenReviews,
  featuredSnippet
}) => {
  const snippet = featuredSnippet || DEFAULT_SNIPPETS[vendor.id] || {
    authorName: 'Verified Client',
    eventType: `${vendor.category}`,
    comment: `Remarkable craftsmanship and punctual 4-hour SLA response. Booking through MAKERS provided total peace of mind.`,
    rating: vendor.rating
  };

  // Star render helper (5 stars)
  const renderStars = () => {
    return (
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${vendor.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = vendor.rating >= starIndex;
          const isHalf = !isFull && vendor.rating >= starIndex - 0.5;

          return (
            <Star
              key={starIndex}
              className={`w-3.5 h-3.5 ${
                isFull
                  ? 'text-amber-400 fill-amber-400'
                  : isHalf
                  ? 'text-amber-400 fill-amber-200'
                  : 'text-amber-200 fill-amber-50'
              } drop-shadow-2xs`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3 pt-2">
      {/* 1. Primary Rating & Trust Scorecard */}
      <div 
        onClick={() => onOpenReviews(vendor)}
        className="group/review cursor-pointer p-3 rounded-2xl bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/90 hover:border-[#7A8E82]/40 transition-all shadow-2xs hover:shadow-xs"
      >
        <div className="flex items-center justify-between gap-2">
          {/* Rating Stars & Numeric Score */}
          <div className="flex items-center gap-2">
            {renderStars()}
            <span className="font-garamond text-base font-bold text-[#1F2C23] tabular-nums">
              {vendor.rating.toFixed(2)}
            </span>
          </div>

          {/* Review Count Link */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#65796E] group-hover/review:text-[#28382F] transition">
            <span className="font-garamond tabular-nums">({vendor.reviewCount} reviews)</span>
            <ChevronRight className="w-3 h-3 text-[#7A8E82] group-hover/review:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Social Proof Badges */}
        <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#EAE3D7]/70 text-[10px]">
          <span className="inline-flex items-center gap-1 text-[#8A5D33] font-bold">
            <ShieldCheck className="w-3 h-3 text-[#9E6B3A]" />
            <span>100% Verified Clients</span>
          </span>

          <span className="text-[#526458] font-medium font-garamond tabular-nums">
            {vendor.verifiedBookingsCount}+ Events Completed
          </span>
        </div>
      </div>

      {/* 2. Featured Verified Review Snippet Quote */}
      <div 
        onClick={() => onOpenReviews(vendor)}
        className="relative group/snippet cursor-pointer p-3 rounded-2xl bg-gradient-to-br from-white/80 to-[#FAF6EE]/60 hover:from-white/95 hover:to-[#FAF6EE]/90 backdrop-blur-sm border border-white/80 hover:border-[#7A8E82]/30 transition-all shadow-2xs space-y-1.5"
      >
        <div className="flex items-start gap-2">
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#7A8E82] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#2F4136] leading-relaxed italic line-clamp-2">
            "{snippet.comment}"
          </p>
        </div>

        {/* Reviewer Signature */}
        <div className="flex items-center justify-between pt-1 text-[10px] text-[#697C71]">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#E2DDD3] text-[#33463B] font-serif font-bold text-[8px] flex items-center justify-center">
              {snippet.authorName[0]}
            </div>
            <span className="font-semibold text-[#1F2C23] truncate max-w-[120px]">
              {snippet.authorName}
            </span>
            <span>•</span>
            <span className="truncate max-w-[130px]">{snippet.eventType}</span>
          </div>

          <span className="text-[9px] font-bold text-[#7A8E82] uppercase tracking-wider group-hover/snippet:underline shrink-0">
            Read Review →
          </span>
        </div>
      </div>
    </div>
  );
};
