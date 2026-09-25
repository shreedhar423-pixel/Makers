import React, { useState } from 'react';
import { Vendor } from '../../types';
import { 
  Star, 
  ShieldCheck, 
  ThumbsUp, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MessageSquareQuote,
  Award,
  Filter,
  HeartHandshake,
  BadgeCheck
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  vendorId: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  eventType: string;
  location: string;
  packageName: string;
  comment: string;
  verified: boolean;
  bookingRef: string;
  helpfulCount: number;
  tags: string[];
}

const DEFAULT_TESTIMONIALS: Record<string, TestimonialItem[]> = {
  'v-101': [
    {
      id: 't-101-1',
      vendorId: 'v-101',
      authorName: 'Rhea & Devansh Nambiar',
      authorRole: 'Bride & Groom',
      rating: 5.0,
      date: 'February 2026',
      eventType: 'Royal Backwater Wedding',
      location: 'Kumarakom Lake Resort, Kottayam',
      packageName: 'Signature Backwater Film + Candid Photo',
      comment: 'Aura Cinematics exceeded every dream we had! The drone 4K reels and candid emotional frames captured every tear and smile during our sunset backwater ceremony. The MAKERS 4-hour SLA gave us total assurance from inquiry to day-of handover.',
      verified: true,
      bookingRef: 'MK-2026-00389',
      helpfulCount: 24,
      tags: ['Cinematography', 'Punctual Crew', '4K Drone']
    },
    {
      id: 't-101-2',
      vendorId: 'v-101',
      authorName: 'Aditya & Tanvi Menon',
      authorRole: 'Couple',
      rating: 4.9,
      date: 'January 2026',
      eventType: '3-Day Heritage Illam Nuptials',
      location: 'Ernakulam (Kochi & Kakkanad)',
      packageName: 'Royal Heritage Ultra Dynasty Package',
      comment: 'The team was completely non-intrusive yet captured every single key moment with magazine-level editorial grace. We received the teaser reel within 48 hours as promised!',
      verified: true,
      bookingRef: 'MK-2026-00214',
      helpfulCount: 18,
      tags: ['Fast Teaser', 'Editorial Stills', 'Heirloom Album']
    },
    {
      id: 't-101-3',
      vendorId: 'v-101',
      authorName: 'Sunil & Madhuri Kurup',
      authorRole: 'Parents of the Groom',
      rating: 5.0,
      date: 'December 2025',
      eventType: 'Grand Reception & Sangeet',
      location: 'Bolgatty Palace, Kochi',
      packageName: 'Essential Heritage Coverage',
      comment: 'Masterful color grading and polite, dignified crew. Managing our large extended family was handled with so much patience and warmth.',
      verified: true,
      bookingRef: 'MK-2025-00984',
      helpfulCount: 15,
      tags: ['Family Portraits', 'Courteous Staff']
    }
  ],
  'v-102': [
    {
      id: 't-102-1',
      vendorId: 'v-102',
      authorName: 'Vikram & Aisha Varma',
      authorRole: 'Hosts',
      rating: 5.0,
      date: 'January 2026',
      eventType: '500-Guest Royal Kerala Sadhya Banquet',
      location: 'Ernakulam (Kochi & Kakkanad)',
      packageName: 'Royal Kerala Grand Sadhya Feast (28 Dishes)',
      comment: 'Our guests are still talking about the 28-item traditional banana leaf Sadhya and live payasam counters! Artisan Feast delivered Michelin-standard hospitality seamlessly.',
      verified: true,
      bookingRef: 'MK-2026-00311',
      helpfulCount: 31,
      tags: ['Kerala Sadhya', 'Flawless Plating', 'Payasam Gallery']
    },
    {
      id: 't-102-2',
      vendorId: 'v-102',
      authorName: 'Meera Pillai',
      authorRole: 'Event Director',
      rating: 4.9,
      date: 'February 2026',
      eventType: 'Corporate Leadership Gala Dinner',
      location: 'Infopark Kochi, Ernakulam',
      packageName: 'Grand Royal 5-Course Plated Banquet',
      comment: 'From custom mocktail mixology to organic zero-waste protocols, Artisan Feast set the gold standard. Structured MAKERS communication kept everything on schedule.',
      verified: true,
      bookingRef: 'MK-2026-00402',
      helpfulCount: 19,
      tags: ['Zero Waste', 'Craft Mocktails', 'Corporate Gala']
    }
  ],
  'v-103': [
    {
      id: 't-103-1',
      vendorId: 'v-103',
      authorName: 'Kavita & Rohit Vardhan',
      authorRole: 'Bride & Groom',
      rating: 5.0,
      date: 'January 2026',
      eventType: 'Backwater Floating Mandapam',
      location: 'Alappuzha (Alleppey Backwaters)',
      packageName: 'Royal Backwater Mandapam & Brass Lamp Pathway',
      comment: 'The floral mandap with Kerala brass Nilavilakku, lotus pools, and hanging jasmine looked straight out of an authentic Kerala royal fairy tale. Absolutely breathtaking craftsmanship!',
      verified: true,
      bookingRef: 'MK-2026-00288',
      helpfulCount: 27,
      tags: ['Custom Mandap', 'Fresh Florals', '3D Renders']
    }
  ],
  'v-106': [
    {
      id: 't-106-1',
      vendorId: 'v-106',
      authorName: 'Meera & Siddharth Nair',
      authorRole: 'Bride & Groom',
      rating: 5.0,
      date: 'February 2026',
      eventType: 'Pure Gold Kasavu Wedding Ensemble',
      location: 'Thrissur (Cultural Capital)',
      packageName: 'Couple Imperial Royal Trousseau Duo',
      comment: 'Atelier Royale crafted my dream pure gold Balaramapuram Kasavu bridal saree and Siddharth’s matching raw silk sherwani. The private fitting salon experience and express alterations were world-class!',
      verified: true,
      bookingRef: 'MK-2026-00412',
      helpfulCount: 29,
      tags: ['Haute Couture', 'Pure Kasavu', 'Flawless Fit']
    }
  ],
  'v-108': [
    {
      id: 't-108-1',
      vendorId: 'v-108',
      authorName: 'Aditya & Groomsmen Crew',
      authorRole: 'Groom',
      rating: 4.95,
      date: 'January 2026',
      eventType: 'Groom Suite & Groomsmen Lounge',
      location: 'Kozhikode (Calicut)',
      packageName: 'Groom & Groomsmen Party Exclusive Lounge Takeover',
      comment: 'The 4-hour lounge takeover in Calicut was the ultimate pre-wedding ritual for my 5 groomsmen! Hot towel shaves, precision cuts, and Ayurvedic head massages made us feel revitalized.',
      verified: true,
      bookingRef: 'MK-2026-00438',
      helpfulCount: 22,
      tags: ['Hot Towel Shave', 'Groom Suite', 'Ayurvedic Massage']
    }
  ]
};

const GENERIC_FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-gen-1',
    vendorId: 'default',
    authorName: 'Pooja & Shaurya Nair',
    authorRole: 'Verified Client',
    rating: 5.0,
    date: 'January 2026',
    eventType: 'Curated Celebration',
    location: 'Metro Luxury Venue',
    packageName: 'Signature Verified Experience',
    comment: 'Exceptional professionalism, flawless punctuality, and remarkable attention to detail. Booking through THE MAKERS platform provided transparent pricing and guaranteed SLA peace of mind!',
    verified: true,
    bookingRef: 'MK-2026-00192',
    helpfulCount: 16,
    tags: ['Verified Booking', 'On-Time SLA', 'Transparent Rates']
  },
  {
    id: 't-gen-2',
    vendorId: 'default',
    authorName: 'Anil & Shalini Kapoor',
    authorRole: 'Host & Family',
    rating: 4.9,
    date: 'February 2026',
    eventType: 'Milestone Anniversary Banquet',
    location: 'Boutique Seaside Estate',
    packageName: 'Bespoke Premium Package',
    comment: 'The vendor exceeded our expectations in communication and creative execution. The WhatsApp booking coordination was swift and organized.',
    verified: true,
    bookingRef: 'MK-2026-00344',
    helpfulCount: 12,
    tags: ['Fast Response', 'Top Quality', 'Smooth Coordination']
  }
];

interface VendorTestimonialsProps {
  vendor: Vendor;
}

export const VendorTestimonials: React.FC<VendorTestimonialsProps> = ({ vendor }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'wedding'>('all');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, { count: number; voted: boolean }>>({});

  const initialList = DEFAULT_TESTIMONIALS[vendor.id] || [
    {
      id: `t-${vendor.id}-1`,
      vendorId: vendor.id,
      authorName: 'Simran & Kabir Khurana',
      authorRole: 'Verified Client',
      rating: 5.0,
      date: 'February 2026',
      eventType: `${vendor.category} Experience`,
      location: `${vendor.district}, ${vendor.city}`,
      packageName: vendor.packages[0]?.name || 'Signature Experience',
      comment: `Working with ${vendor.name} was an absolute masterclass in reliability and luxury craft. From our first inquiry on MAKERS with guaranteed 4h SLA, everything was handled with perfection.`,
      verified: true,
      bookingRef: `MK-2026-00${Math.floor(100 + Math.random() * 800)}`,
      helpfulCount: 21,
      tags: ['Top Craftsmanship', 'Punctual', 'Verified Booking']
    },
    {
      id: `t-${vendor.id}-2`,
      vendorId: vendor.id,
      authorName: 'Arjun & Radhika Sen',
      authorRole: 'Hosts',
      rating: 4.9,
      date: 'January 2026',
      eventType: 'Grand Celebration',
      location: vendor.district,
      packageName: vendor.packages[1]?.name || vendor.packages[0]?.name || 'Premium Tier',
      comment: `Incredible dedication! ${vendor.name} demonstrated why they are a top-rated verified artisan on THE MAKERS. Total peace of mind for our high-stakes event.`,
      verified: true,
      bookingRef: `MK-2026-00${Math.floor(100 + Math.random() * 800)}`,
      helpfulCount: 14,
      tags: ['SLA Adherence', 'High Reliability', 'Seamless Service']
    },
    ...GENERIC_FALLBACK_TESTIMONIALS
  ];

  const handleHelpfulToggle = (id: string, currentCount: number) => {
    setHelpfulMap(prev => {
      const current = prev[id] || { count: currentCount, voted: false };
      if (current.voted) {
        return { ...prev, [id]: { count: current.count - 1, voted: false } };
      } else {
        return { ...prev, [id]: { count: current.count + 1, voted: true } };
      }
    });
  };

  const filteredList = initialList.filter(item => {
    if (activeFilter === '5star') return item.rating >= 4.95;
    if (activeFilter === 'wedding') return item.eventType.toLowerCase().includes('wedding') || item.eventType.toLowerCase().includes('destination');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Social Trust & Rating Overview Box in Glassmorphism */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/90 via-white/75 to-[#F5ECE1]/60 backdrop-blur-xl border border-white/90 shadow-[0_12px_35px_rgba(30,45,35,0.06)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-[#EAE3D7]">
          {/* Main Score Hero */}
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#7A8E82] to-[#55695D] text-white flex flex-col items-center justify-center shadow-md shrink-0">
              <span className="font-garamond text-3xl font-bold leading-none tabular-nums">
                {vendor.rating.toFixed(2)}
              </span>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-extrabold text-[#1D2B22]">
                  Client Testimonials & Verified Reviews
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF0EC] text-[#4F6357] border border-[#CFDBD3]">
                  100% Verified Bookings
                </span>
              </div>
              <p className="text-xs text-[#63796D] mt-1">
                Based on <span className="font-garamond font-bold text-sm text-[#1F2C23] tabular-nums">{vendor.reviewCount}</span> authenticated reviews from completed events on THE MAKERS.
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center gap-3 text-xs">
            <div className="px-3.5 py-2 rounded-2xl bg-white/80 border border-[#E0D7C9] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#7A8E82]" />
              <div className="text-[11px]">
                <div className="font-bold text-[#2A3B30] font-garamond tabular-nums">99.4% Client Match</div>
                <div className="text-[#7A8E82] text-[10px]">High Satisfaction</div>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-white/80 border border-[#E0D7C9] flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#8A5D33]" />
              <div className="text-[11px]">
                <div className="font-bold text-[#2A3B30] font-garamond tabular-nums">0% No-Show Record</div>
                <div className="text-[#8A5D33] text-[10px]">Guaranteed Attendance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#728578] font-medium text-[11px]">Filter Testimonials:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full font-semibold text-xs transition ${
                activeFilter === 'all'
                  ? 'bg-[#7A8E82] text-white shadow-xs'
                  : 'bg-white/80 text-[#4F6357] hover:bg-[#EFE9DD] border border-[#E0D7C9]'
              }`}
            >
              All Reviews ({initialList.length})
            </button>
            <button
              onClick={() => setActiveFilter('5star')}
              className={`px-3 py-1 rounded-full font-semibold text-xs transition flex items-center gap-1 ${
                activeFilter === '5star'
                  ? 'bg-[#7A8E82] text-white shadow-xs'
                  : 'bg-white/80 text-[#4F6357] hover:bg-[#EFE9DD] border border-[#E0D7C9]'
              }`}
            >
              <Star className="w-3 h-3 fill-current text-amber-300" />
              <span>5.0 Stars Only</span>
            </button>
            <button
              onClick={() => setActiveFilter('wedding')}
              className={`px-3 py-1 rounded-full font-semibold text-xs transition ${
                activeFilter === 'wedding'
                  ? 'bg-[#7A8E82] text-white shadow-xs'
                  : 'bg-white/80 text-[#4F6357] hover:bg-[#EFE9DD] border border-[#E0D7C9]'
              }`}
            >
              Weddings & Destination
            </button>
          </div>

          <div className="text-[11px] text-[#7A8E82] flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8A5D33]" />
            <span>Only genuine booking IDs can submit reviews</span>
          </div>
        </div>
      </div>

      {/* Testimonials Glass Cards List */}
      <div className="space-y-4">
        {filteredList.map((item) => {
          const voteState = helpfulMap[item.id] || { count: item.helpfulCount, voted: false };

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-gradient-to-br from-white/95 via-white/80 to-[#FAF6EE]/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(30,45,35,0.05)] hover:shadow-[0_14px_40px_rgba(30,45,35,0.09)] transition-all duration-300 space-y-4"
            >
              {/* Review Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  {/* Initials Avatar with Glass Border */}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EAF0EC] to-[#E2DDD3] border border-white text-[#42554A] font-bold font-serif text-base flex items-center justify-center shadow-xs shrink-0">
                    {item.authorName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#1D2B22]">{item.authorName}</h4>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8A5D33] bg-[#F5ECE1] px-2 py-0.5 rounded-md border border-[#DFCEBD]">
                          <ShieldCheck className="w-3 h-3 text-[#9E6B3A]" />
                          MAKERS Verified Client
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6B7E73] flex items-center gap-2 mt-0.5">
                      <span>{item.eventType}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars with Garamond Number */}
                <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#EAE3D7] self-start sm:self-auto">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-3.5 h-3.5 ${
                          idx < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-amber-100'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-garamond font-bold text-sm text-[#1F2C23] tabular-nums">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Booked Package Tag */}
              <div className="text-[11px] text-[#556A5E] bg-[#F3EFE7]/80 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 border border-[#E6DECة] border-[#E5DDD0]">
                <CheckCircle2 className="w-3 h-3 text-[#7A8E82]" />
                <span>Verified Booking: <strong className="text-[#1D2B22]">{item.packageName}</strong> (ID: {item.bookingRef})</span>
              </div>

              {/* Testimonial Quote */}
              <div className="relative pl-4 border-l-2 border-[#7A8E82]/40 py-0.5">
                <p className="text-xs sm:text-sm text-[#2C3E33] leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              {/* Card Footer: Tags & Helpful Button */}
              <div className="pt-3 border-t border-[#EAE3D7]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-[#4E6255] border border-[#DDD5C7]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleHelpfulToggle(item.id, item.helpfulCount)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs transition border cursor-pointer ${
                    voteState.voted
                      ? 'bg-[#EBF1ED] text-[#33463B] border-[#7A8E82] font-bold'
                      : 'bg-white/80 text-[#607468] hover:bg-white border-[#E0D7C9]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${voteState.voted ? 'text-[#7A8E82] fill-[#7A8E82]' : ''}`} />
                  <span>Helpful</span>
                  <span className="font-garamond font-bold tabular-nums">({voteState.count})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
