import React from 'react';
import { SafeImage } from '../common/SafeImage';
import { 
  Camera, 
  UtensilsCrossed, 
  Sparkles, 
  Palette, 
  Scissors, 
  Music, 
  CalendarRange, 
  UserCheck, 
  Check,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export interface CategoryInfo {
  id: string;
  name: string;
  shortTitle: string;
  tagline: string;
  imageUrl: string;
  startingPrice: string;
  icon: React.ReactNode;
  popular?: boolean;
}

export const MAIN_CATEGORY_LIST: CategoryInfo[] = [
  {
    id: 'Wedding Photography',
    name: 'Wedding Photography',
    shortTitle: 'Photographers & Films',
    tagline: 'Authentic candid photojournalism, natural golden light & heirloom albums',
    imageUrl: '/images/minimal_wedding_1790353374044.jpg',
    startingPrice: '₹85,000',
    icon: <Camera className="w-4 h-4 text-amber-300" />,
    popular: true
  },
  {
    id: 'Catering & Dining',
    name: 'Catering & Dining',
    shortTitle: 'Catering & Culinary',
    tagline: 'Artisanal plated gastronomy, organic regional ingredients & chef tastings',
    imageUrl: '/images/minimal_culinary_1790353359572.jpg',
    startingPrice: '₹1,20,000',
    icon: <UtensilsCrossed className="w-4 h-4 text-amber-300" />,
    popular: true
  },
  {
    id: 'Venues & Luxury Decor',
    name: 'Venues & Luxury Decor',
    shortTitle: 'Event Decor & Venues',
    tagline: 'Neutral linen tablescapes, olive branch florals & understated spatial design',
    imageUrl: '/images/minimal_event_decor_1790353343323.jpg',
    startingPrice: '₹1,50,000',
    icon: <Sparkles className="w-4 h-4 text-amber-300" />
  },
  {
    id: 'Salon, Spa & Bridal Makeup',
    name: 'Salon, Spa & Bridal Makeup',
    shortTitle: 'Makeup & Bridal Spa',
    tagline: 'Minimal glowing skin rituals, botanical hair artistry & bridal radiance',
    imageUrl: '/images/minimal_makeup_1790353405201.jpg',
    startingPrice: '₹35,000',
    icon: <Palette className="w-4 h-4 text-amber-300" />,
    popular: true
  },
  {
    id: 'Fashion Designers & Couture',
    name: 'Fashion Designers & Couture',
    shortTitle: 'Fashion & Couture',
    tagline: 'Bespoke hand-tailored linen, silk lehengas & private studio fitting trials',
    imageUrl: '/images/minimal_fashion_1790353392679.jpg',
    startingPrice: '₹95,000',
    icon: <Scissors className="w-4 h-4 text-amber-300" />
  },
  {
    id: 'DJ, Music & Entertainment',
    name: 'DJ, Music & Entertainment',
    shortTitle: 'DJ, Music & Sound',
    tagline: 'Acoustic warm lounge sound, live percussionists & refined evening sets',
    imageUrl: '/images/minimal_acoustic_1790353433222.jpg',
    startingPrice: '₹65,000',
    icon: <Music className="w-4 h-4 text-amber-300" />
  },
  {
    id: 'Event Coordination & Planning',
    name: 'Event Coordination & Planning',
    shortTitle: 'Event Management',
    tagline: 'Tranquil destination venues, precision timelines & seamless hospitality',
    imageUrl: '/images/minimal_courtyard_1790353448035.jpg',
    startingPrice: '₹1,80,000',
    icon: <CalendarRange className="w-4 h-4 text-amber-300" />
  },
  {
    id: "Men's Grooming & Styling",
    name: "Men's Grooming & Styling",
    shortTitle: "Men's Barber & Grooming",
    tagline: 'Traditional hot towel shaves, precision scissor cuts & calm grooming suites',
    imageUrl: '/images/minimal_barber_1790353419510.jpg',
    startingPrice: '₹22,000',
    icon: <UserCheck className="w-4 h-4 text-amber-300" />
  }
];

interface MainCategoriesShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
  categoryCounts: Record<string, number>;
}

export const MainCategoriesShowcase: React.FC<MainCategoriesShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <section className="space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#EAE2D5]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0EC] border border-[#C5D8CC] text-[#34483B] text-[11px] font-bold tracking-wide uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-[#7A8E82]" />
            <span>Discover Curated Artisans</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A261F] tracking-tight">
            Explore Main Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6F62] mt-1">
            Select a category to view dedicated subcategories and verified artisans across Kerala's 14 districts
          </p>
        </div>

        {/* Quick Filter Bar Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
          <button
            onClick={() => onSelectCategory('All Categories')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'All Categories'
                ? 'bg-[#1E2E24] text-white shadow-sm ring-2 ring-amber-400/40'
                : 'bg-white/80 hover:bg-white text-[#4D6054] border border-[#DCD3C5]'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-80 font-garamond font-bold">
              ({categoryCounts['All Categories'] || 0})
            </span>
          </button>
        </div>
      </div>

      {/* Visual Category Grid - Mobile-First (1-2 cols mobile, 2-3 cols tablet, 4 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
        {MAIN_CATEGORY_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = categoryCounts[cat.name] || 0;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'All Categories' : cat.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${
                isSelected 
                  ? 'ring-3 ring-[#8C5E33] shadow-[0_18px_40px_rgba(140,94,51,0.22)] scale-[1.01]' 
                  : 'border border-white/80 shadow-[0_10px_28px_rgba(35,50,40,0.08)] hover:shadow-[0_18px_38px_rgba(35,50,40,0.15)]'
              }`}
            >
              {/* Background Image */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#ECE6DC]">
                <SafeImage
                  src={cat.imageUrl}
                  alt={cat.name}
                  categoryHint={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

                {/* Top Badge: Icon + Active state */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-xs">
                    {cat.icon}
                  </div>

                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#8C5E33] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs animate-in zoom-in-90">
                      <Check className="w-3 h-3" />
                      <span>Active Filter</span>
                    </span>
                  ) : cat.popular ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-[#1F2C23] text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      Popular
                    </span>
                  ) : null}
                </div>

                {/* Bottom Text Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg font-bold leading-tight group-hover:text-amber-200 transition">
                      {cat.shortTitle}
                    </h3>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-[#DCE7DF] line-clamp-1 leading-snug">
                    {cat.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/20 text-[10px]">
                    <span className="text-amber-300 font-semibold font-garamond">
                      From {cat.startingPrice}
                    </span>
                    <span className="text-[#C5D7CC] font-garamond tabular-nums">
                      {count} {count === 1 ? 'Artisan' : 'Artisans'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
