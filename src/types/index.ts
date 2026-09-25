export type BookingStatus = 
  | 'Pending'
  | 'Vendor Responded'
  | 'Confirmed'
  | 'Declined'
  | 'Follow-up Required'
  | 'Completed';

export type EventCategory = 
  | 'Wedding Photography'
  | 'Catering & Dining'
  | 'Venues & Luxury Decor'
  | 'Salon, Spa & Bridal Makeup'
  | 'Fashion Designers & Couture'
  | 'DJ, Music & Entertainment'
  | 'Event Coordination & Planning'
  | "Men's Grooming & Styling";

export interface VendorPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface VerifiedReview {
  id: string;
  bookingId: string;
  customerName: string;
  rating: number;
  date: string;
  eventType: string;
  comment: string;
  verified: boolean;
  status: 'Published' | 'Pending_Moderation' | 'Rejected';
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  category: EventCategory;
  subcategory?: string;
  district: string;
  city: string;
  address?: string;
  serviceDistricts?: string[];
  tagline: string;
  description: string;
  startingPrice: number;
  currency: string;
  imageUrl: string;
  galleryUrls: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  verifiedBookingsCount: number;
  responseTimeText: string;
  responseRatePct: number;
  acceptanceRatePct: number;
  lastActiveText: string;
  packages: VendorPackage[];
  phoneWhatsApp: string; // Internal, masked from customer in Phase 1
  isFlaggedForAdminReview?: boolean;
  flagReason?: string;
  badges: string[];
}

export interface BookingAuditLog {
  id: string;
  timestamp: string;
  actor: 'Customer' | 'Vendor' | 'MAKERS Team' | 'System';
  action: string;
  notes?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'MAKERS System' | 'Vendor' | 'Customer' | 'MAKERS Support';
  timestamp: string;
  content: string;
  type: 'incoming_request' | 'vendor_response' | 'makers_followup' | 'system_notice';
  quickActions?: string[];
  selectedAction?: string;
}

export interface BookingRequest {
  id: string; // e.g. "MK-2026-00472"
  vendorId: string;
  vendorName: string;
  vendorCategory: EventCategory;
  vendorDistrict: string;
  vendorImage: string;
  
  customerName: string;
  customerPhoneWhatsApp: string;
  customerEmail?: string;
  
  eventType: string;
  preferredDate: string;
  preferredTime?: string;
  locationDistrict: string;
  expectedGuests?: number;
  expectedGuestsLabel?: string;
  servicePackageName: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  additionalNotes: string;
  specialRemarks?: string;
  
  status: BookingStatus;
  createdAt: string;
  slaDeadline: string; // ISO String (e.g. 4 hours from creation)
  isSlaBreached: boolean;
  
  lastVendorResponse?: string;
  lastVendorResponseTime?: string;
  makersFollowUpStatus?: 'None' | 'Follow-up Scheduled' | 'MAKERS Contacted Vendor' | 'Intervention Resolved';
  makersFollowUpTimestamp?: string;
  makersInternalNotes?: string;
  
  auditTrail: BookingAuditLog[];
  whatsAppMessages: WhatsAppMessage[];
  
  reviewSubmitted?: boolean;
  verifiedReview?: VerifiedReview;
}

export interface BudgetCategoryAllocation {
  category: EventCategory;
  percentage: number;
  estimatedAmount: number;
  suggestedVendorCount: number;
  description: string;
}
