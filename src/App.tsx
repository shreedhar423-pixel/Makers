import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { CustomerBookingTracker } from './components/tracker/CustomerBookingTracker';
import { AIBudgetPlanner } from './components/planner/AIBudgetPlanner';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WhatsAppSimulatorModal } from './components/whatsapp/WhatsAppSimulatorModal';
import { PrdRoadmapView } from './components/prd/PrdRoadmapView';
import { BookingRequestModal } from './components/marketplace/BookingRequestModal';
import { FloatingPlannerTab } from './components/planner/FloatingPlannerTab';

const MainAppContent: React.FC = () => {
  const { 
    activeTab, 
    selectedVendor, 
    setSelectedVendor, 
    bookingModalOpen, 
    setBookingModalOpen 
  } = useBooking();

  const [plannerModalOpen, setPlannerModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#242E28] font-sans relative selection:bg-[#7A8E82] selection:text-white">
      {/* Navbar with 3-dot settings modal and clean front tabs */}
      <Navbar onOpenPlannerModal={() => setPlannerModalOpen(true)} />

      {/* Main Pages */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <MarketplaceView onOpenPlannerModal={() => setPlannerModalOpen(true)} />
        )}
        {activeTab === 'tracker' && <CustomerBookingTracker />}
        {activeTab === 'planner' && <AIBudgetPlanner />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'whatsapp-sim' && <WhatsAppSimulatorModal />}
        {activeTab === 'prd-roadmap' && <PrdRoadmapView />}
      </main>

      {/* Floating Side Tab for AI Budget Planner Pop-up (Touches to Open) */}
      <FloatingPlannerTab onClick={() => setPlannerModalOpen(true)} />

      {/* AI Budget Planner Pop-up Modal */}
      {plannerModalOpen && (
        <AIBudgetPlanner 
          isModal={true} 
          onClose={() => setPlannerModalOpen(false)} 
        />
      )}

      {/* Global Booking Request Modal */}
      {bookingModalOpen && selectedVendor && (
        <BookingRequestModal
          vendor={selectedVendor}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedVendor(null);
          }}
        />
      )}

      {/* Footer containing simulation & PRD links */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <MainAppContent />
    </BookingProvider>
  );
}
