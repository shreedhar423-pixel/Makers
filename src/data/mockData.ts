import { Vendor, BookingRequest, VerifiedReview } from '../types';

export const KERALA_14_DISTRICTS = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad'
] as const;

export const DISTRICTS = [
  'All Districts',
  ...KERALA_14_DISTRICTS
];

export const KERALA_DISTRICT_HUBS: Record<string, string[]> = {
  'Alappuzha': ['Alappuzha City', 'Kumarakom Backwaters', 'Marari Beach', 'Cherthala', 'Kayamkulam'],
  'Ernakulam': ['Kochi (Marine Drive)', 'Kakkanad (Infopark)', 'Fort Kochi & Mattancherry', 'Aluva', 'Tripunithura Heritage'],
  'Idukki': ['Munnar Hill Station', 'Thekkady (Periyar)', 'Thodupuzha', 'Kattappana', 'Vagamon Pines'],
  'Kannur': ['Kannur Town', 'Thalassery Heritage', 'Payyanur', 'Mattannur Airport Corridor'],
  'Kasaragod': ['Kasaragod Town', 'Bekal Fort Coast', 'Kanhangad', 'Nileshwar'],
  'Kollam': ['Kollam City', 'Ashtamudi Lakefront', 'Paravur', 'Karunagappally'],
  'Kottayam': ['Kottayam Town', 'Kumarakom Lakefront', 'Pala', 'Changanassery', 'Vaikom'],
  'Kozhikode': ['Kozhikode Beach', 'Mavoor Road', 'Beypore Port', 'Vadakara', 'Feroke'],
  'Malappuram': ['Malappuram Town', 'Manjeri', 'Tirur', 'Perinthalmanna', 'Kottakkal Arya Vaidya Sala'],
  'Palakkad': ['Palakkad Fort Area', 'Ottapalam', 'Chittur', 'Mannarkkad', 'Shoranur'],
  'Pathanamthitta': ['Pathanamthitta Town', 'Thiruvalla Heritage', 'Adoor', 'Ranni', 'Aranmula Metal Mirror Hub'],
  'Thiruvananthapuram': ['Thiruvananthapuram (Kowdiar)', 'Kovalam Beachfront', 'Varkala Cliff', 'Technopark Kazhakkoottam', 'Statue Junction'],
  'Thrissur': ['Thrissur (Swaraj Round)', 'Guruvayur Temple Area', 'Irinjalakuda', 'Chalakudy', 'Kodungallur'],
  'Wayanad': ['Vythiri Rainforest', 'Kalpetta', 'Sultan Bathery', 'Mananthavady', 'Meppadi Hills']
};

export const CATEGORIES = [
  'All Categories',
  'Wedding Photography',
  'Catering & Dining',
  'Venues & Luxury Decor',
  'Salon, Spa & Bridal Makeup',
  'Fashion Designers & Couture',
  'DJ, Music & Entertainment',
  'Event Coordination & Planning',
  "Men's Grooming & Styling"
];

export const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  'Wedding Photography': [
    'All Subcategories',
    'Candid Wedding Photojournalism',
    'Cinematic 4K Films & Drone',
    'Traditional Kerala Nuptials',
    'Pre-Wedding & Destination Backwater Shoots'
  ],
  'Catering & Dining': [
    'All Subcategories',
    'Traditional Kerala Sadhya Banquets',
    'Artisanal Live Counters & Continental',
    'Royal Multi-Cuisine Wedding Feasts',
    'Cocktail Grazing & Appetizers'
  ],
  'Venues & Luxury Decor': [
    'All Subcategories',
    'Backwater & Beachfront Resorts',
    'Traditional Heritage Mandapam & Illam',
    'Lush Floral Stage & Ceiling Decor',
    'Lighting & Architectural Spatial Design'
  ],
  'Salon, Spa & Bridal Makeup': [
    'All Subcategories',
    'Airbrush HD Bridal Glam',
    'Traditional Kerala Bridal Art & Draping',
    'Pre-Bridal Ayurvedic Glow Spa',
    'Mehendi & Henna Artistry'
  ],
  'Fashion Designers & Couture': [
    'All Subcategories',
    'Handwoven Kasavu & Bridal Sarees',
    'Custom Wedding Lehengas & Gowns',
    'Bespoke Groom Sherwanis & Suits',
    'Bridal Party & Trousseau Styling'
  ],
  'DJ, Music & Entertainment': [
    'All Subcategories',
    'Chenda Melam & Fusion Percussion',
    'Live Acoustic Bands & Gazals',
    'DJ, Intelligent Moving Lights & Sound',
    'Traditional Classical Dance & Music'
  ],
  'Event Coordination & Planning': [
    'All Subcategories',
    'Complete Destination Wedding Planning',
    'Day-Of Coordination & Itinerary Management',
    'Backwater Houseboat & Resort Logistics',
    'Hospitality & VIP Guest Management'
  ],
  "Men's Grooming & Styling": [
    'All Subcategories',
    'Royal Groom Beard Sculpting & Hair',
    'Hot Towel Shave & Scalp Therapy',
    'Groomsmen Party Lounge Packages',
    'Ayurvedic Relaxing Groom Facials'
  ]
};

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v-101',
    name: 'Aura Cinematics & Royal Stills',
    slug: 'aura-cinematics',
    category: 'Wedding Photography',
    subcategory: 'Candid Wedding Photojournalism',
    district: 'Ernakulam',
    city: 'Kochi (Marine Drive)',
    address: 'Panampilly Nagar & Marine Drive, Ernakulam, Kerala 682036',
    serviceDistricts: ['Ernakulam', 'Alappuzha', 'Kottayam', 'Thrissur', 'Thiruvananthapuram'],
    tagline: 'Kerala candid wedding photojournalism, backwater drone films & royal storytelling',
    description: 'Specializing in timeless, editorial-style wedding photojournalism, heritage Illam nuptials, and backwater drone cinematography across Kochi, Kumarakom, and Alleppey.',
    startingPrice: 85000,
    currency: '₹',
    imageUrl: '/images/minimal_wedding_1790353374044.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.96,
    reviewCount: 48,
    verifiedBookingsCount: 142,
    responseTimeText: 'Usually responds in ~35 mins',
    responseRatePct: 98,
    acceptanceRatePct: 92,
    lastActiveText: 'Active 10 mins ago',
    phoneWhatsApp: '+91 98201 48210',
    badges: ['Top Rated 2026', 'Fast Responder', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-1',
        name: 'Essential Heritage Coverage',
        price: 85000,
        description: 'Single day comprehensive photojournalism by 1 lead senior photographer.',
        features: ['400+ color-graded high-res master photos', 'Private heirloom online gallery', 'Full print rights included', 'Express teaser delivery in 72 hours']
      },
      {
        id: 'p-2',
        name: 'Signature Backwater Film + Candid Photo',
        price: 175000,
        popular: true,
        description: 'Multi-day wedding weekend coverage with 2 lead photographers and 1 licensed drone cinematographer.',
        features: ['1,000+ hand-edited photographs', '5-minute 4K royal highlight cinematic film', 'Licensed 4K drone aerial footage', 'Sneak peek reel in 48 hours', 'Custom handcrafted Italian leather album']
      },
      {
        id: 'p-3',
        name: 'Royal Heritage Ultra Dynasty Package',
        price: 350000,
        description: 'Comprehensive 3-day royal palace celebration coverage with dedicated 5-person production crew.',
        features: ['Unlimited hours across 3 days', 'Full ceremony, Sangeet & speeches documentary cut', 'Handmade Italian leather photo albums for couple & parents', 'Pre-wedding concept shoot included']
      }
    ]
  },
  {
    id: 'v-102',
    name: 'Artisan Feast Gourmet Banquets',
    slug: 'artisan-feast-caterers',
    category: 'Catering & Dining',
    subcategory: 'Traditional Kerala Sadhya Banquets',
    district: 'Ernakulam',
    city: 'Kochi (Kakkanad)',
    address: 'Infopark Expressway, Kakkanad, Ernakulam, Kerala 682030',
    serviceDistricts: ['Ernakulam', 'Thrissur', 'Kottayam', 'Alappuzha', 'Kozhikode'],
    tagline: 'Authentic 28-dish royal Kerala Sadhya feasts, live sea-grill counters & multi-cuisine banquets',
    description: 'We curate bespoke culinary journeys tailored for lavish destination weddings, backwater banquets, and private celebrations with locally-sourced organic ingredients and Michelin-trained executive chefs.',
    startingPrice: 120000,
    currency: '₹',
    imageUrl: '/images/minimal_culinary_1790353359572.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.91,
    reviewCount: 64,
    verifiedBookingsCount: 210,
    responseTimeText: 'Usually responds in ~1 hour',
    responseRatePct: 96,
    acceptanceRatePct: 89,
    lastActiveText: 'Active today',
    phoneWhatsApp: '+91 98205 99201',
    badges: ['Chef Curated', 'Artisanal Bar', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-4',
        name: 'Royal Kerala Grand Sadhya Feast (28 Dishes)',
        price: 120000,
        description: 'Authentic pure banana leaf Sadhya for up to 100 guests with 4 varieties of Payasam and traditional white-glove servers.',
        features: ['28 traditional delicacies on plantain leaves', '4 handcrafted artisanal payasams', 'Traditional service staff in Kasavu attire', 'Custom dietary and vegan accommodations']
      },
      {
        id: 'p-5',
        name: 'Grand Royal 5-Course Plated Banquet',
        price: 280000,
        popular: true,
        description: 'Refined multi-course royal feast for up to 200 guests with bespoke regional live counters.',
        features: ['Choice of 4 curated regional & international mains', 'Artisanal dessert & mithai gallery', 'Private chef tasting session for 6 guests', 'Custom floral linen and porcelain tableware']
      }
    ]
  },
  {
    id: 'v-103',
    name: 'Botanica & Velvet Floral Decor',
    slug: 'botanica-velvet-decor',
    category: 'Venues & Luxury Decor',
    subcategory: 'Traditional Heritage Mandapam & Illam',
    district: 'Alappuzha',
    city: 'Alappuzha (Punnamada Lakefront)',
    address: 'Punnamada Road, Alappuzha, Kerala 688006',
    serviceDistricts: ['Alappuzha', 'Kottayam', 'Kollam', 'Ernakulam', 'Pathanamthitta'],
    tagline: 'Backwater floating mandapams, Kerala brass lamp pathways & botanical floral installations',
    description: 'Transforming backwater lakefront resorts, traditional Illams, and beach lawns into ethereal wonderlands with Kerala brass Nilavilakku, temple jasmine, and bespoke structural backdrops.',
    startingPrice: 150000,
    currency: '₹',
    imageUrl: '/images/minimal_event_decor_1790353343323.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.94,
    reviewCount: 39,
    verifiedBookingsCount: 97,
    responseTimeText: 'Usually responds in ~1.5 hours',
    responseRatePct: 95,
    acceptanceRatePct: 87,
    lastActiveText: 'Active today',
    phoneWhatsApp: '+91 98112 34820',
    badges: ['Master Florist', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-6',
        name: 'Royal Backwater Mandapam & Brass Lamp Pathway',
        price: 150000,
        description: 'Lush seasonal flora, jasmine bells, candlelit aisles & sacred wedding mandap styling.',
        features: ['Grand floral mandap / ceremony archway', '100ft candlelit aisle arrangements', 'Full setup & teardown structural crew', 'Custom palette & moodboard alignment']
      },
      {
        id: 'p-7',
        name: 'Complete Royal Palace & Ballroom Transformation',
        price: 390000,
        popular: true,
        description: 'Complete venue styling including 20 luxury guest tables, grand stage, fairy-light canopy & photo lounges.',
        features: ['20 bespoke floral centerpieces & chandeliers', 'Fairy-light & wisteria overhead canopy', 'Grand personalized entry archway & photo lounge', 'Dedicated on-site production manager']
      }
    ]
  },
  {
    id: 'v-104',
    name: 'Luxe Glow Bridal Lounge & Spa',
    slug: 'luxe-glow-bridal-spa',
    category: 'Salon, Spa & Bridal Makeup',
    subcategory: 'Airbrush HD Bridal Glam',
    district: 'Thiruvananthapuram',
    city: 'Thiruvananthapuram (Kowdiar)',
    address: 'Kowdiar Palace Road, Thiruvananthapuram, Kerala 695003',
    serviceDistricts: ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha'],
    tagline: 'Kerala Christian & Hindu bridal glam, Ayurvedic radiance facials & silk saree pleating',
    description: 'Celebrity bridal glam artists bringing on-location luxury salon services, waterproof airbrush makeup, traditional Kerala temple jewelry setting, and relaxing Ayurvedic therapies.',
    startingPrice: 35000,
    currency: '₹',
    imageUrl: '/images/minimal_makeup_1790353405201.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.98,
    reviewCount: 72,
    verifiedBookingsCount: 184,
    responseTimeText: 'Usually responds in ~25 mins',
    responseRatePct: 99,
    acceptanceRatePct: 94,
    lastActiveText: 'Active 5 mins ago',
    phoneWhatsApp: '+91 98450 77440',
    badges: ['Celebrity Artist', 'Instant Quote', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-8',
        name: 'Kerala Royal Bridal Radiance HD Glam',
        price: 35000,
        description: 'Premium on-location bridal makeup and hair styling with touch-up kit and saree/dupatta draping.',
        features: ['Airbrush waterproof HD makeup', 'Couture hair styling & intricate Kasavu draping', 'Premium lashes & hair extensions', 'Full touch-up emergency kit']
      },
      {
        id: 'p-9',
        name: 'Bridal Queen & Bridal Party Deluxe (3 Functions)',
        price: 85000,
        popular: true,
        description: 'Master bridal styling for Mehendi, Sangeet, and Wedding + 3 bridal party members.',
        features: ['Bride (3 main ceremonies) + 3 family members', 'Pre-wedding trial session included', '24K gold luminosity skin facial', 'On-site lead artist throughout the events']
      }
    ]
  },
  {
    id: 'v-105',
    name: 'Pulse Sound & Electric Beats DJ',
    slug: 'pulse-sound-dj',
    category: 'DJ, Music & Entertainment',
    subcategory: 'Chenda Melam & Fusion Percussion',
    district: 'Kozhikode',
    city: 'Kozhikode (Beach Road)',
    address: 'Beach Road & Silk Street, Kozhikode, Kerala 673032',
    serviceDistricts: ['Kozhikode', 'Malappuram', 'Wayanad', 'Kannur', 'Palakkad'],
    tagline: 'Fusion Chenda Melam, live saxophone ensembles, intelligent moving lasers & wedding DJ',
    description: 'Providing world-class DJ entertainment, live fusion Chenda Melam, wireless mics, and state-of-the-art concert acoustic setups that keep dance floors buzzing across Kerala resorts.',
    startingPrice: 65000,
    currency: '₹',
    imageUrl: '/images/minimal_acoustic_1790353433222.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.90,
    reviewCount: 51,
    verifiedBookingsCount: 128,
    responseTimeText: 'Usually responds in ~45 mins',
    responseRatePct: 97,
    acceptanceRatePct: 91,
    lastActiveText: 'Active 15 mins ago',
    phoneWhatsApp: '+91 98221 66770',
    badges: ['Concert Grade', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-10',
        name: 'Sangeet & Afterparty DJ + Club Lighting',
        price: 65000,
        description: '5 hours of high-energy DJing, MCing, and moving head intelligent dance lighting.',
        features: ['5 hours party set', 'JBL/RCF concert sound & wireless mics', 'Moving-head beam lighting truss', 'Custom Bollywood & Malayalam fusion playlist']
      },
      {
        id: 'p-11',
        name: 'The Ultimate Kerala Fusion Festival Experience',
        price: 145000,
        popular: true,
        description: 'Full day sound, ceremony audio, cold-spark fireworks, low-fog cloud effects & live Chenda percussionists.',
        features: ['Ceremony + Reception + Afterparty audio', '6 Cold sparkler pyro machines', '4 Live Fusion Chenda Melam artists', 'Low-fog dry ice cloud for first dance']
      }
    ]
  },
  {
    id: 'v-106',
    name: 'Atelier Royale Bridal & Menswear Couture',
    slug: 'atelier-royale-couture',
    category: 'Fashion Designers & Couture',
    subcategory: 'Handwoven Kasavu & Bridal Sarees',
    district: 'Thrissur',
    city: 'Thrissur (Swaraj Round)',
    address: 'Swaraj Round North, Thrissur, Kerala 680001',
    serviceDistricts: ['Thrissur', 'Ernakulam', 'Palakkad', 'Malappuram'],
    tagline: 'Authentic Balaramapuram gold Kasavu bridal sarees, Zardozi lehengas & bespoke silk sherwanis',
    description: 'Master couturiers crafting heirloom wedding trousseaux, pure gold thread Kasavu bridal sarees, and tailored Italian wool sherwanis with dedicated private salon trials in Thrissur and Kochi.',
    startingPrice: 95000,
    currency: '₹',
    imageUrl: '/images/minimal_fashion_1790353392679.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.97,
    reviewCount: 42,
    verifiedBookingsCount: 118,
    responseTimeText: 'Usually responds in ~30 mins',
    responseRatePct: 99,
    acceptanceRatePct: 93,
    lastActiveText: 'Active now',
    phoneWhatsApp: '+91 98110 55432',
    badges: ['Haute Couture', 'Royal Atelier', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-12',
        name: 'Pure Gold Kasavu Bridal Saree & Blouse',
        price: 95000,
        description: 'Bespoke hand-embroidered raw silk & pure Kasavu weave with customized blouse embroidery.',
        features: ['Authentic Balaramapuram pure gold zari weave', 'Private styling suite fittings for bride', 'Matching veil / customized belt accessory', 'Express alterations within 48 hours']
      },
      {
        id: 'p-13',
        name: 'Couple Imperial Royal Trousseau Duo',
        price: 240000,
        popular: true,
        description: 'Coordinated designer bridal lehenga/saree and bespoke groom royal silk sherwani with ceremonial stoles.',
        features: ['Color-harmonized bride & groom royal ensembles', 'Imported silk & gold thread embroidery', 'Handcrafted royal footwear & stole accessories', 'Dedicated master designer trial session']
      }
    ]
  },
  {
    id: 'v-107',
    name: 'Elysian Royal Events & Luxury Coordination',
    slug: 'elysian-luxury-events',
    category: 'Event Coordination & Planning',
    subcategory: 'Complete Destination Wedding Planning',
    district: 'Kottayam',
    city: 'Kumarakom (Lakefront)',
    address: 'Kumarakom Lakefront Road, Kottayam, Kerala 686563',
    serviceDistricts: ['Kottayam', 'Alappuzha', 'Ernakulam', 'Idukki', 'Pathanamthitta'],
    tagline: 'Kerala luxury backwater wedding coordination, houseboat fleet management & destination logistics',
    description: 'Flawless execution from concept to conclusion. We handle vendor timelines, backwater houseboat fleets, airport transfers from Kochi & Trivandrum, and day-of execution across Kumarakom resorts and heritage properties.',
    startingPrice: 180000,
    currency: '₹',
    imageUrl: '/images/minimal_courtyard_1790353448035.jpg',
    galleryUrls: [
      '/images/minimal_event_decor_1790353343323.jpg',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.99,
    reviewCount: 56,
    verifiedBookingsCount: 165,
    responseTimeText: 'Usually responds in ~30 mins',
    responseRatePct: 99,
    acceptanceRatePct: 95,
    lastActiveText: 'Active 2 mins ago',
    phoneWhatsApp: '+91 98290 11223',
    badges: ['Master Planner', 'Backwater Specialist', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-14',
        name: 'Month-Of Coordination & Day Logistics',
        price: 180000,
        description: '6 weeks out vendor handover, minute-by-minute itinerary & 14h on-site crew of 4 coordinators.',
        features: ['Minute-by-minute master production itinerary', 'Complete vendor liaison and load-in management', '4 dedicated on-site event managers', 'Guest hospitality & shadow coordination']
      },
      {
        id: 'p-15',
        name: 'Full Backwater Destination Wedding Production',
        price: 450000,
        popular: true,
        description: 'From 3D spatial floorplans to complete vendor curation, houseboat cruises and 3-day full production.',
        features: ['End-to-end vendor negotiation & contracting', '3D spatial decor renderings & walkthroughs', 'Dedicated 8-person on-ground management team', 'Guest RSVP & luxury fleet hospitality desk']
      }
    ]
  },
  {
    id: 'v-108',
    name: 'The Heritage Grooming Club & Barber',
    slug: 'heritage-grooming-club',
    category: "Men's Grooming & Styling",
    subcategory: 'Royal Groom Beard Sculpting & Hair',
    district: 'Kozhikode',
    city: 'Kozhikode (Mavoor Road)',
    address: 'Mavoor Road Junction, Kozhikode, Kerala 673004',
    serviceDistricts: ['Kozhikode', 'Malappuram', 'Kannur', 'Wayanad'],
    tagline: 'Precision beard sculpting, hot towel shaves, Kerala Ayurvedic scalp massage & groom suites',
    description: 'An oasis of gentlemanly refinement offering classic straight-razor hot towel treatments, precision beard sculpting, scalp rejuvenation therapies, and complete pre-wedding groom suites in Calicut & Kochi.',
    startingPrice: 22000,
    currency: '₹',
    imageUrl: '/images/minimal_barber_1790353419510.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.93,
    reviewCount: 38,
    verifiedBookingsCount: 89,
    responseTimeText: 'Usually responds in ~20 mins',
    responseRatePct: 98,
    acceptanceRatePct: 96,
    lastActiveText: 'Active now',
    phoneWhatsApp: '+91 98455 33211',
    badges: ['Master Barber', 'Groom Suite', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-16',
        name: 'The Royal Groom Pre-Wedding Ritual',
        price: 22000,
        description: 'Complete 3-hour private chair session including precision haircut, beard sculpting, Ayurvedic head massage & hot towel therapy.',
        features: ['Bespoke precision scissor cut & styling', 'Straight-razor hot towel shave & conditioning', 'Revitalizing deep-pore botanical facial', 'Complimentary single-malt / espresso hospitality']
      },
      {
        id: 'p-17',
        name: 'Groom & Groomsmen Party Exclusive Lounge Takeover',
        price: 60000,
        popular: true,
        description: 'Private 4-hour lounge takeover for groom + 5 groomsmen with master barbers, styling, and refreshments.',
        features: ['Up to 6 gentlemen full haircut & styling', 'Hot towel straight-razor shaves for all', 'Mini express facials & head massages', 'Dedicated lounge bar with gourmet finger food']
      }
    ]
  },
  {
    id: 'v-109',
    name: 'Misty Pines Hilltop Venues & Staging',
    slug: 'misty-pines-munnar',
    category: 'Venues & Luxury Decor',
    subcategory: 'Backwater & Beachfront Resorts',
    district: 'Idukki',
    city: 'Munnar (Tea Hills)',
    address: 'Tea Estate Valley Road, Munnar, Idukki, Kerala 685612',
    serviceDistricts: ['Idukki', 'Ernakulam', 'Kottayam'],
    tagline: 'Misty hilltop tea estate wedding amphitheaters, pine canopy lighting & luxury tents',
    description: 'Creating breathtaking panoramic mountain and tea plantation nuptial setups in Munnar and Vagamon with architectural floral arches and cozy ambient campfires.',
    startingPrice: 140000,
    currency: '₹',
    imageUrl: '/images/minimal_courtyard_1790353448035.jpg',
    galleryUrls: [
      '/images/minimal_event_decor_1790353343323.jpg'
    ],
    verified: true,
    rating: 4.95,
    reviewCount: 31,
    verifiedBookingsCount: 76,
    responseTimeText: 'Usually responds in ~40 mins',
    responseRatePct: 97,
    acceptanceRatePct: 94,
    lastActiveText: 'Active today',
    phoneWhatsApp: '+91 98471 99112',
    badges: ['Hilltop Specialist', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-18',
        name: 'Hilltop Pine Gazebo & Fog Stage',
        price: 140000,
        description: 'Custom wooden ceremonial gazebo overlooking Munnar tea hills with ambient string lighting.',
        features: ['Custom timber ceremony pergola', 'Fairy-light and hanging lantern forest canopy', 'Heating & firepit setup for evening reception']
      }
    ]
  },
  {
    id: 'v-110',
    name: 'Rainforest Echoes Acoustic & Fusion Melodies',
    slug: 'rainforest-echoes-wayanad',
    category: 'DJ, Music & Entertainment',
    subcategory: 'Live Acoustic Bands & Gazals',
    district: 'Wayanad',
    city: 'Vythiri (Rainforest)',
    address: 'Lakkidi Pass & Vythiri, Wayanad, Kerala 673576',
    serviceDistricts: ['Wayanad', 'Kozhikode', 'Kannur', 'Malappuram'],
    tagline: 'Soulful live acoustic strings, bamboo flute serenades & forest lounge DJ sets',
    description: 'Curating organic acoustic music sessions, Indian classical violin fusion, and subtle evening lounge soundscapes tailored for serene resort celebrations.',
    startingPrice: 55000,
    currency: '₹',
    imageUrl: '/images/minimal_acoustic_1790353433222.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.92,
    reviewCount: 26,
    verifiedBookingsCount: 64,
    responseTimeText: 'Usually responds in ~30 mins',
    responseRatePct: 98,
    acceptanceRatePct: 92,
    lastActiveText: 'Active now',
    phoneWhatsApp: '+91 98472 88221',
    badges: ['Live Acoustic', 'MAKERS Verified'],
    packages: [
      {
        id: 'p-19',
        name: 'Acoustic Sunset String & Flute Quintet',
        price: 55000,
        description: '3-hour live acoustic ensemble featuring violin, bamboo flute, acoustic guitar & subtle percussion.',
        features: ['3 hours continuous live performance', 'Custom ceremony walk-in melodies', 'Wireless instrument microphones and PA setup']
      }
    ]
  },
  {
    id: 'v-111',
    name: 'Malabar Spice Royal Banquet Masters',
    slug: 'malabar-spice-masters',
    category: 'Catering & Dining',
    subcategory: 'Royal Multi-Cuisine Wedding Feasts',
    district: 'Kannur',
    city: 'Thalassery Heritage',
    address: 'Old Port Heritage Road, Thalassery, Kannur, Kerala 670101',
    serviceDistricts: ['Kannur', 'Kasaragod', 'Kozhikode', 'Wayanad'],
    tagline: 'Legendary Thalassery dum biryani, heirloom Moplah culinary platters & coastal grills',
    description: 'Heritage Malabar culinary artisans specializing in slow-cooked Thalassery dum biryani, live coastal fish tawa fry, and multi-course royal feasts with antique copper serving ware.',
    startingPrice: 110000,
    currency: '₹',
    imageUrl: '/images/minimal_culinary_1790353359572.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    rating: 4.96,
    reviewCount: 44,
    verifiedBookingsCount: 112,
    responseTimeText: 'Usually responds in ~20 mins',
    responseRatePct: 99,
    acceptanceRatePct: 95,
    lastActiveText: 'Active today',
    phoneWhatsApp: '+91 98473 77332',
    badges: ['Heritage Recipe', 'MAKERS Gold Pro'],
    packages: [
      {
        id: 'p-20',
        name: 'Royal Thalassery Heritage Feast (150 Guests)',
        price: 110000,
        description: 'Authentic Thalassery mutton/chicken dum biryani with 6 regional side delicacies and dessert station.',
        features: ['Heirloom slow-cooked Dum Biryani', 'Live coastal appetizer counter', 'Sulaimani tea & dessert bar', 'Heritage copper ware presentation']
      }
    ]
  },
  {
    id: 'v-112',
    name: 'Ashtamudi Palm Haven Wedding Planners',
    slug: 'ashtamudi-palm-haven',
    category: 'Event Coordination & Planning',
    subcategory: 'Complete Destination Wedding Planning',
    district: 'Kollam',
    city: 'Kollam (Ashtamudi Lakefront)',
    address: 'Thevally Palace Road, Ashtamudi, Kollam, Kerala 691009',
    serviceDistricts: ['Kollam', 'Thiruvananthapuram', 'Pathanamthitta', 'Alappuzha'],
    tagline: 'Serene lakeside resort wedding planning, boat processions & backwater guest hospitality',
    description: 'Curating seamless lakeside wedding experiences with ceremonial boat arrivals, waterside mandap setups, and comprehensive guest concierge logistics across South Kerala.',
    startingPrice: 165000,
    currency: '₹',
    imageUrl: '/images/minimal_event_decor_1790353343323.jpg',
    galleryUrls: [
      '/images/minimal_courtyard_1790353448035.jpg'
    ],
    verified: true,
    rating: 4.94,
    reviewCount: 33,
    verifiedBookingsCount: 82,
    responseTimeText: 'Usually responds in ~35 mins',
    responseRatePct: 97,
    acceptanceRatePct: 93,
    lastActiveText: 'Active 20 mins ago',
    phoneWhatsApp: '+91 98474 66443',
    badges: ['Lakefront Specialist', 'MAKERS Verified'],
    packages: [
      {
        id: 'p-21',
        name: 'Lakefront Nuptial Coordination & Boat Logistics',
        price: 165000,
        description: 'Full day-of coordination with waterside production management and guest boat shuttle liaisons.',
        features: ['Ceremonial boat procession management', 'On-site team of 4 coordinators', 'Vendor timeline supervision']
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'MK-2026-00472',
    vendorId: 'v-101',
    vendorName: 'Aura Cinematics & Royal Stills',
    vendorCategory: 'Wedding Photography',
    vendorDistrict: 'Ernakulam',
    vendorImage: '/images/minimal_wedding_1790353374044.jpg',
    customerName: 'Ananya Menon',
    customerPhoneWhatsApp: '+91 98471 23456',
    customerEmail: 'ananya.menon@example.com',
    eventType: 'Wedding Photography',
    preferredDate: '2026-11-14',
    preferredTime: '13:00 - 23:00',
    locationDistrict: 'Alappuzha',
    expectedGuests: 150,
    expectedGuestsLabel: '150 - 250 Guests (Large Reception)',
    servicePackageName: 'Signature Backwater Film + Candid Photo',
    budgetMin: 160000,
    budgetMax: 200000,
    currency: '₹',
    additionalNotes: 'Sunset backwater resort ceremony in Alleppey followed by lakeside reception. Interested in 4K drone cinematics along the backwaters.',
    specialRemarks: '✨ Outdoor / Garden Lawn, 📸 Drone & 4K Raw Footage Needed, 🕯️ Ambient Candlelight & Floral Arch',
    status: 'Pending',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 195 * 60 * 1000).toISOString(),
    isSlaBreached: false,
    makersFollowUpStatus: 'None',
    auditTrail: [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        actor: 'Customer',
        action: 'Booking request created through THE MAKERS app',
        notes: 'Lead initiated without exposing vendor direct contact number.'
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 44 * 60 * 1000).toISOString(),
        actor: 'System',
        action: 'Structured WhatsApp Business notification dispatched to vendor',
        notes: 'SLA timer initialized (4.0 hours threshold).'
      }
    ],
    whatsAppMessages: [
      {
        id: 'wa-1',
        sender: 'MAKERS System',
        timestamp: new Date(Date.now() - 44 * 60 * 1000).toISOString(),
        content: `*New THE MAKERS Booking Request*\nBooking ID: MK-2026-00472\nCustomer: Ananya Menon\nService: Wedding Photography\nDate: 2026-11-14 (13:00)\nLocation: Alappuzha\nGuests: 150 - 250 Guests\nBudget: ₹1,60,000 - ₹2,00,000\nRequirements: Sunset backwater ceremony & reception.\nSpecial Remarks: Drone 4K footage & outdoor lawn setup.\n\n_Reply with one of the quick actions below:_`,
        type: 'incoming_request',
        quickActions: ['Accept Request', 'Decline Request', 'Need More Details']
      }
    ]
  },
  {
    id: 'MK-2026-00469',
    vendorId: 'v-102',
    vendorName: 'Artisan Feast Gourmet Banquets',
    vendorCategory: 'Catering & Dining',
    vendorDistrict: 'Ernakulam',
    vendorImage: '/images/minimal_culinary_1790353359572.jpg',
    customerName: 'Raghav Pillai',
    customerPhoneWhatsApp: '+91 98470 34567',
    customerEmail: 'raghav.p@keralainvest.in',
    eventType: 'Catering & Dining',
    preferredDate: '2026-10-28',
    preferredTime: '18:30',
    locationDistrict: 'Ernakulam',
    expectedGuests: 120,
    expectedGuestsLabel: '100 - 150 Guests (Standard Event)',
    servicePackageName: 'Royal Kerala Grand Sadhya Feast (28 Dishes)',
    budgetMin: 260000,
    budgetMax: 320000,
    currency: '₹',
    additionalNotes: 'Annual summit dinner at Bolgatty Palace, Kochi. Need traditional banana leaf sadhya with live payasam counters and vegan options.',
    specialRemarks: '🍽️ Dietary / Vegan / Halal Options, ❄️ Indoor Air-Conditioned Venue, ⚡ Fast Turnaround Required',
    status: 'Vendor Responded',
    createdAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    isSlaBreached: false,
    lastVendorResponse: 'Vendor confirmed date availability for Oct 28. Prepared to host tasting session for Raghav Pillai team.',
    lastVendorResponseTime: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    makersFollowUpStatus: 'None',
    auditTrail: [
      {
        id: 'log-3',
        timestamp: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
        actor: 'Customer',
        action: 'Booking request created',
        notes: 'Corporate Banquet lead'
      },
      {
        id: 'log-4',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        actor: 'Vendor',
        action: 'Vendor accepted via WhatsApp Business',
        notes: 'Response received in 60 minutes (well within 4h SLA)'
      }
    ],
    whatsAppMessages: [
      {
        id: 'wa-2',
        sender: 'MAKERS System',
        timestamp: new Date(Date.now() - 149 * 60 * 1000).toISOString(),
        content: `*New THE MAKERS Booking Request*\nBooking ID: MK-2026-00469\nCustomer: Raghav Pillai\nService/Event: Catering & Dining\nDate: 2026-10-28\nGuests: 100 - 150 Guests\nBudget: ₹2,60,000 - ₹3,20,000`,
        type: 'incoming_request',
        quickActions: ['Accept Request', 'Decline Request', 'Need More Details'],
        selectedAction: 'Accept Request'
      },
      {
        id: 'wa-3',
        sender: 'Vendor',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        content: `Delighted to accept! We have the date open and would love to accommodate the leadership dinner. We have curated special vegan & gluten-free regional tasting menus ready.`,
        type: 'vendor_response'
      }
    ]
  },
  {
    id: 'MK-2026-00455',
    vendorId: 'v-103',
    vendorName: 'Botanica & Velvet Floral Decor',
    vendorCategory: 'Venues & Luxury Decor',
    vendorDistrict: 'Alappuzha',
    vendorImage: '/images/minimal_event_decor_1790353343323.jpg',
    customerName: 'Dr. Radhika Kurup',
    customerPhoneWhatsApp: '+91 98471 78901',
    customerEmail: 'dr.radhika@kurupmed.com',
    eventType: 'Venues & Luxury Decor',
    preferredDate: '2026-12-05',
    preferredTime: '10:00',
    locationDistrict: 'Alappuzha',
    expectedGuests: 250,
    expectedGuestsLabel: '250 - 400 Guests (Grand Banquet / Gala)',
    servicePackageName: 'Complete Royal Palace & Ballroom Transformation',
    budgetMin: 350000,
    budgetMax: 420000,
    currency: '₹',
    additionalNotes: 'Lakeside backwater wedding mandap with brass lamps, lotus pools, emerald foliage, and hanging jasmine strings.',
    specialRemarks: '🕯️ Ambient Candlelight & Floral Arch, ✨ Outdoor / Garden Lawn',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    slaDeadline: new Date(Date.now() - 86400000 * 2 + 14400000).toISOString(),
    isSlaBreached: false,
    lastVendorResponse: 'All floral structures approved and decor timeline locked in via THE MAKERS.',
    lastVendorResponseTime: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    makersFollowUpStatus: 'Intervention Resolved',
    auditTrail: [
      {
        id: 'log-5',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        actor: 'Customer',
        action: 'Booking request created'
      },
      {
        id: 'log-6',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        actor: 'MAKERS Team',
        action: 'Status advanced to Confirmed after client & decor alignment'
      }
    ],
    whatsAppMessages: []
  },
  {
    id: 'MK-2026-00438',
    vendorId: 'v-105',
    vendorName: 'Pulse Sound & Electric Beats DJ',
    vendorCategory: 'DJ, Music & Entertainment',
    vendorDistrict: 'Kozhikode',
    vendorImage: '/images/minimal_acoustic_1790353433222.jpg',
    customerName: 'Kiran & Sneha Varma',
    customerPhoneWhatsApp: '+91 98470 89012',
    customerEmail: 'varma.celebrations@gmail.com',
    eventType: 'DJ, Music & Entertainment',
    preferredDate: '2026-09-18',
    preferredTime: '19:00',
    locationDistrict: 'Kozhikode',
    expectedGuests: 120,
    expectedGuestsLabel: '100 - 150 Guests (Standard Event)',
    servicePackageName: 'The Ultimate Kerala Fusion Festival Experience',
    budgetMin: 140000,
    budgetMax: 160000,
    currency: '₹',
    additionalNotes: 'Destination beach Sangeet in Calicut Beach resort. Need live fusion Chenda Melam, cold sparklers, and retro Malayalam/Bollywood mixes.',
    specialRemarks: '🎵 Acoustic & Custom Playlist, 🎤 Wireless Microphones & PA System',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    slaDeadline: new Date(Date.now() - 86400000 * 6 + 14400000).toISOString(),
    isSlaBreached: false,
    makersFollowUpStatus: 'Intervention Resolved',
    reviewSubmitted: true,
    verifiedReview: {
      id: 'rev-1',
      bookingId: 'MK-2026-00438',
      customerName: 'Kiran & Sneha Varma',
      rating: 5,
      date: '2026-09-20',
      eventType: 'DJ, Music & Entertainment',
      comment: 'Pulse Sound in Calicut was extraordinary! The fusion Chenda Melam + DJ created immense energy, and the cold sparklers looked unreal for our entry. Booking through THE MAKERS gave us complete peace of mind!',
      verified: true,
      status: 'Published'
    },
    auditTrail: [
      {
        id: 'log-7',
        timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
        actor: 'Customer',
        action: 'Booking request created'
      },
      {
        id: 'log-8',
        timestamp: new Date(Date.now() - 86400000 * 5.8).toISOString(),
        actor: 'Vendor',
        action: 'Vendor accepted through WhatsApp'
      },
      {
        id: 'log-9',
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
        actor: 'MAKERS Team',
        action: 'Marked as Completed post-event'
      },
      {
        id: 'log-10',
        timestamp: new Date(Date.now() - 86400000 * 3.5).toISOString(),
        actor: 'Customer',
        action: 'Verified review submitted and approved'
      }
    ],
    whatsAppMessages: []
  },
  {
    id: 'MK-2026-00481',
    vendorId: 'v-107',
    vendorName: 'Elysian Royal Events & Luxury Coordination',
    vendorCategory: 'Event Coordination & Planning',
    vendorDistrict: 'Kottayam',
    vendorImage: '/images/minimal_courtyard_1790353448035.jpg',
    customerName: 'Priyanka Nambiar',
    customerPhoneWhatsApp: '+91 98480 43287',
    customerEmail: 'priyanka.n@mindtech.co',
    eventType: 'Event Coordination & Planning',
    preferredDate: '2026-10-05',
    preferredTime: '08:30',
    locationDistrict: 'Kottayam',
    expectedGuests: 80,
    expectedGuestsLabel: '50 - 100 Guests (Executive Summit)',
    servicePackageName: 'Month-Of Coordination & Day Logistics',
    budgetMin: 180000,
    budgetMax: 220000,
    currency: '₹',
    additionalNotes: 'Destination wedding coordination at Kumarakom Lake Resort with houseboat transfers and guest hospitality.',
    specialRemarks: '✨ Outdoor / Garden Lawn, ⚡ Fast Turnaround Required',
    status: 'Follow-up Required',
    createdAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
    isSlaBreached: true,
    makersFollowUpStatus: 'Follow-up Scheduled',
    makersInternalNotes: 'Vendor did not respond within 4 hours. MAKERS Concierge team initiated priority follow-up.',
    auditTrail: [
      {
        id: 'log-11',
        timestamp: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
        actor: 'Customer',
        action: 'Booking request created'
      },
      {
        id: 'log-12',
        timestamp: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
        actor: 'System',
        action: 'SLA threshold (4.0 hrs) breached -> Marked as Follow-up Required'
      }
    ],
    whatsAppMessages: [
      {
        id: 'wa-4',
        sender: 'MAKERS System',
        timestamp: new Date(Date.now() - 319 * 60 * 1000).toISOString(),
        content: `*New THE MAKERS Booking Request*\nBooking ID: MK-2026-00481\nCustomer: Priyanka Nambiar\nService: Event Coordination & Logistics\nDate: 2026-10-05\nGuests: 80 Guests`,
        type: 'incoming_request',
        quickActions: ['Accept Request', 'Decline Request', 'Need More Details']
      }
    ]
  }
];
