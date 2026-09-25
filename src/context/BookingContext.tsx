import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vendor, BookingRequest, BookingStatus, VerifiedReview, EventCategory } from '../types';
import { INITIAL_VENDORS, INITIAL_BOOKINGS } from '../data/mockData';

export type NavigationTab = 'marketplace' | 'tracker' | 'planner' | 'admin' | 'whatsapp-sim' | 'prd-roadmap';

interface BookingContextType {
  vendors: Vendor[];
  bookings: BookingRequest[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedVendor: Vendor | null;
  setSelectedVendor: (vendor: Vendor | null) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  activeRole: 'customer' | 'admin' | 'vendor';
  setActiveRole: (role: 'customer' | 'admin' | 'vendor') => void;
  slaConfigHours: number;
  setSlaConfigHours: (hours: number) => void;
  
  // Actions
  createBooking: (bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt' | 'slaDeadline' | 'isSlaBreached' | 'auditTrail' | 'whatsAppMessages'>) => string;
  updateBookingStatus: (bookingId: string, status: BookingStatus, notes?: string, actor?: 'Customer' | 'Vendor' | 'MAKERS Team' | 'System') => void;
  vendorRespondWhatsApp: (bookingId: string, actionType: 'Accept Request' | 'Decline Request' | 'Need More Details', customNote?: string) => void;
  triggerAdminFollowUp: (bookingId: string, followUpNotes: string) => void;
  submitVerifiedReview: (bookingId: string, rating: number, comment: string) => void;
  toggleFlagVendor: (vendorId: string, reason?: string) => void;
  resetAllData: () => void;
  
  // Quick helpers
  getBookingById: (id: string) => BookingRequest | undefined;
  getVendorById: (id: string) => Vendor | undefined;
  unreadAdminAlertsCount: number;
  slaBreachedBookingsCount: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const VENDORS_STORAGE_KEY = 'makers_vendors_v8_kerala_14_districts';
const BOOKINGS_STORAGE_KEY = 'makers_bookings_v8_kerala_14_districts';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem(VENDORS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Vendor[] = JSON.parse(saved);
        // Ensure no fitness vendor and ensure images are fresh
        const cleaned = parsed.filter(v => (v.category as string) !== 'Fitness & Personal Trainers');
        if (cleaned.length >= 6) return cleaned;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_VENDORS;
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: BookingRequest[] = JSON.parse(saved);
        const cleaned = parsed.filter(b => (b.vendorCategory as string) !== 'Fitness & Personal Trainers');
        if (cleaned.length > 0) return cleaned;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_BOOKINGS;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('marketplace');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('MK-2026-00472');
  const [activeRole, setActiveRole] = useState<'customer' | 'admin' | 'vendor'>('customer');
  const [slaConfigHours, setSlaConfigHours] = useState<number>(4);

  useEffect(() => {
    localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  // SLA background check
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBookings(prev => prev.map(b => {
        if (b.status === 'Pending' && new Date(b.slaDeadline) < now && !b.isSlaBreached) {
          return {
            ...b,
            status: 'Follow-up Required' as BookingStatus,
            isSlaBreached: true,
            makersFollowUpStatus: 'Follow-up Scheduled',
            auditTrail: [
              ...b.auditTrail,
              {
                id: `log-sla-${Date.now()}`,
                timestamp: now.toISOString(),
                actor: 'System',
                action: `SLA breach (${slaConfigHours}h exceeded). Auto-transitioned to Follow-up Required.`,
                notes: 'Alert dispatched to MAKERS operations team queue.'
              }
            ]
          };
        }
        return b;
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, [slaConfigHours]);

  const generateBookingId = (): string => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `MK-2026-${randomNum}`;
  };

  const createBooking = (bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt' | 'slaDeadline' | 'isSlaBreached' | 'auditTrail' | 'whatsAppMessages'>): string => {
    const newId = generateBookingId();
    const now = new Date();
    const slaDeadline = new Date(now.getTime() + slaConfigHours * 60 * 60 * 1000).toISOString();

    const initialAudit = [
      {
        id: `log-${Date.now()}-1`,
        timestamp: now.toISOString(),
        actor: 'Customer' as const,
        action: `Booking Request ${newId} initiated`,
        notes: `Service: ${bookingData.servicePackageName} on ${bookingData.preferredDate} (${bookingData.locationDistrict})`
      },
      {
        id: `log-${Date.now()}-2`,
        timestamp: now.toISOString(),
        actor: 'System' as const,
        action: 'Structured WhatsApp Business notification triggered to vendor',
        notes: `Initial vendor response SLA target set to ${slaConfigHours} hours.`
      }
    ];

    const remarksFormatted = [
      bookingData.additionalNotes ? `• Notes: ${bookingData.additionalNotes}` : '',
      bookingData.specialRemarks ? `• Detailed Remarks: ${bookingData.specialRemarks}` : ''
    ].filter(Boolean).join('\n');

    const guestsDisplay = bookingData.expectedGuestsLabel || (bookingData.expectedGuests ? `${bookingData.expectedGuests} Guests` : 'Flexible / To be confirmed');

    const initialWhatsAppMsg = {
      id: `wa-${Date.now()}`,
      sender: 'MAKERS System' as const,
      timestamp: now.toISOString(),
      content: `*New THE MAKERS Booking Request*\nBooking ID: ${newId}\nCustomer: ${bookingData.customerName}\nService/Event: ${bookingData.eventType} (${bookingData.servicePackageName})\nDate: ${bookingData.preferredDate}${bookingData.preferredTime ? ` at ${bookingData.preferredTime}` : ''}\nLocation: ${bookingData.locationDistrict}\nGuests: ${guestsDisplay}\nBudget: ${bookingData.currency}${bookingData.budgetMin.toLocaleString('en-IN')} - ${bookingData.currency}${bookingData.budgetMax.toLocaleString('en-IN')}\n${remarksFormatted ? `Requirements & Remarks:\n${remarksFormatted}` : 'Requirements: Standard requirements'}`,
      type: 'incoming_request' as const,
      quickActions: ['Accept Request', 'Decline Request', 'Need More Details']
    };

    const newBooking: BookingRequest = {
      ...bookingData,
      id: newId,
      status: 'Pending',
      createdAt: now.toISOString(),
      slaDeadline,
      isSlaBreached: false,
      makersFollowUpStatus: 'None',
      auditTrail: initialAudit,
      whatsAppMessages: [initialWhatsAppMsg]
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedBookingId(newId);
    return newId;
  };

  const updateBookingStatus = (
    bookingId: string, 
    status: BookingStatus, 
    notes?: string, 
    actor: 'Customer' | 'Vendor' | 'MAKERS Team' | 'System' = 'MAKERS Team'
  ) => {
    const now = new Date().toISOString();
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      
      const newAudit = [
        ...b.auditTrail,
        {
          id: `log-${Date.now()}`,
          timestamp: now,
          actor,
          action: `Status updated from ${b.status} to ${status}`,
          notes: notes || `Manual status synchronization by ${actor}`
        }
      ];

      // If completing, mark eligible for review
      return {
        ...b,
        status,
        auditTrail: newAudit
      };
    }));
  };

  const vendorRespondWhatsApp = (
    bookingId: string, 
    actionType: 'Accept Request' | 'Decline Request' | 'Need More Details',
    customNote?: string
  ) => {
    const now = new Date().toISOString();
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      let newStatus: BookingStatus = b.status;
      let responseText = '';

      if (actionType === 'Accept Request') {
        newStatus = 'Vendor Responded';
        responseText = customNote || 'We have received your booking details and are delighted to confirm our availability for this date!';
      } else if (actionType === 'Decline Request') {
        newStatus = 'Declined';
        responseText = customNote || 'Thank you for reaching out. Unfortunately, we are fully booked on this requested date and cannot accept this assignment.';
      } else {
        newStatus = 'Vendor Responded';
        responseText = customNote || 'We are interested in your booking request. Could we clarify the venue setup time and specific requirements?';
      }

      const updatedWhatsApp = b.whatsAppMessages.map(msg => {
        if (msg.type === 'incoming_request') {
          return { ...msg, selectedAction: actionType };
        }
        return msg;
      });

      const vendorMsg = {
        id: `wa-resp-${Date.now()}`,
        sender: 'Vendor' as const,
        timestamp: now,
        content: `[${actionType.toUpperCase()}] ${responseText}`,
        type: 'vendor_response' as const
      };

      const newAudit = [
        ...b.auditTrail,
        {
          id: `log-${Date.now()}`,
          timestamp: now,
          actor: 'Vendor' as const,
          action: `Vendor responded via WhatsApp: "${actionType}"`,
          notes: responseText
        }
      ];

      return {
        ...b,
        status: newStatus,
        lastVendorResponse: responseText,
        lastVendorResponseTime: now,
        whatsAppMessages: [...updatedWhatsApp, vendorMsg],
        auditTrail: newAudit
      };
    }));
  };

  const triggerAdminFollowUp = (bookingId: string, followUpNotes: string) => {
    const now = new Date().toISOString();
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      const newAudit = [
        ...b.auditTrail,
        {
          id: `log-${Date.now()}`,
          timestamp: now,
          actor: 'MAKERS Team' as const,
          action: 'MAKERS Support Team conducted vendor follow-up intervention',
          notes: followUpNotes
        }
      ];

      const supportMsg = {
        id: `wa-support-${Date.now()}`,
        sender: 'MAKERS Support' as const,
        timestamp: now,
        content: `*MAKERS Operations SLA Follow-up*: Reached out to ${b.vendorName} team regarding pending request #${b.id}. Note: ${followUpNotes}`,
        type: 'makers_followup' as const
      };

      return {
        ...b,
        makersFollowUpStatus: 'MAKERS Contacted Vendor',
        makersFollowUpTimestamp: now,
        makersInternalNotes: followUpNotes,
        auditTrail: newAudit,
        whatsAppMessages: [...b.whatsAppMessages, supportMsg]
      };
    }));
  };

  const submitVerifiedReview = (bookingId: string, rating: number, comment: string) => {
    const now = new Date().toISOString().split('T')[0];
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const newReview: VerifiedReview = {
      id: `rev-${Date.now()}`,
      bookingId,
      customerName: booking.customerName,
      rating,
      date: now,
      eventType: booking.eventType,
      comment,
      verified: true,
      status: 'Published'
    };

    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      return {
        ...b,
        reviewSubmitted: true,
        verifiedReview: newReview,
        auditTrail: [
          ...b.auditTrail,
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Customer',
            action: `Verified Review (${rating} Stars) submitted by customer`,
            notes: 'Verified badge successfully attributed to vendor profile.'
          }
        ]
      };
    }));

    // Update vendor review stats
    setVendors(prev => prev.map(v => {
      if (v.id === booking.vendorId) {
        const newReviewCount = v.reviewCount + 1;
        const newRating = Number(((v.rating * v.reviewCount + rating) / newReviewCount).toFixed(2));
        const newVerifiedBookings = v.verifiedBookingsCount + 1;
        return {
          ...v,
          rating: newRating,
          reviewCount: newReviewCount,
          verifiedBookingsCount: newVerifiedBookings
        };
      }
      return v;
    }));
  };

  const toggleFlagVendor = (vendorId: string, reason?: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        const nextFlag = !v.isFlaggedForAdminReview;
        return {
          ...v,
          isFlaggedForAdminReview: nextFlag,
          flagReason: nextFlag ? (reason || 'High decline or non-response rate exceeding threshold.') : undefined
        };
      }
      return v;
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem('makers_vendors_v1');
    localStorage.removeItem('makers_bookings_v1');
    localStorage.removeItem('makers_vendors_v2_inr');
    localStorage.removeItem('makers_bookings_v2_inr');
    setVendors(INITIAL_VENDORS);
    setBookings(INITIAL_BOOKINGS);
    setSelectedBookingId('MK-2026-00472');
  };

  const getBookingById = (id: string) => bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
  const getVendorById = (id: string) => vendors.find(v => v.id === id);

  const slaBreachedBookingsCount = bookings.filter(b => b.status === 'Follow-up Required' || b.isSlaBreached).length;
  const unreadAdminAlertsCount = slaBreachedBookingsCount + bookings.filter(b => b.status === 'Pending').length;

  return (
    <BookingContext.Provider
      value={{
        vendors,
        bookings,
        activeTab,
        setActiveTab,
        selectedVendor,
        setSelectedVendor,
        bookingModalOpen,
        setBookingModalOpen,
        selectedBookingId,
        setSelectedBookingId,
        activeRole,
        setActiveRole,
        slaConfigHours,
        setSlaConfigHours,
        createBooking,
        updateBookingStatus,
        vendorRespondWhatsApp,
        triggerAdminFollowUp,
        submitVerifiedReview,
        toggleFlagVendor,
        resetAllData,
        getBookingById,
        getVendorById,
        unreadAdminAlertsCount,
        slaBreachedBookingsCount
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
