import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  GitBranch, 
  Database, 
  MessageSquare, 
  Sparkles,
  Lock,
  PieChart
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const PrdRoadmapView: React.FC = () => {
  const { setActiveTab } = useBooking();
  const [activePrdSection, setActivePrdSection] = useState<string>('sec-1');

  const prdSections = [
    {
      id: 'sec-1',
      title: '1. Phase 1 Booking Request System',
      badge: 'Core Architecture',
      points: [
        'Phase 1 remains payment-free, but customers no longer receive the vendor’s phone number directly.',
        'Every customer-vendor interaction begins as a structured Booking Request through THE MAKERS in Indian Rupees (₹).',
        'Creates a permanent booking record and attribution layer before Phase 2 online payments exist.',
        'Uses WhatsApp Business as the Phase 1 communication backbone instead of building complex in-app chat.'
      ]
    },
    {
      id: 'sec-2',
      title: '1.3 & 1.4 Structured Form & Unique Booking ID',
      badge: 'Data Integrity',
      points: [
        'Structured payload: Event/Service type, preferred date, location/district, expected guests, package required, budget range in INR (₹), customer special remarks & notes, customer name, WhatsApp phone number.',
        'Unique Booking ID (e.g. MK-2026-00472) visible to customer, vendor, and MAKERS operations team.',
        'ID enables cross-channel support tracking, SLA compliance, and verified review attribution.'
      ]
    },
    {
      id: 'sec-3',
      title: '1.5 State Machine & 1.8 SLA Engine',
      badge: 'Operational Control',
      points: [
        'State Machine: Pending → Vendor Responded → Confirmed / Declined → Follow-up Required → Completed.',
        'Initial vendor response SLA: 4 hours (configurable by admin).',
        'Automatic escalation to "Follow-up Required" if SLA expires, dispatching MAKERS field ops intervention.'
      ]
    },
    {
      id: 'sec-4',
      title: '1.7 Trust Signals & 1.9 Verified Reviews',
      badge: 'Anti-Bypass Value',
      points: [
        'MAKERS Gold Pro badge, Average response time, Verified booking count, Response rate %, and Acceptance rate % displayed on artisan profiles.',
        'Verified Booking Reviews are strictly tied to completed MAKERS booking records, eliminating fake reviews.',
        'Creates a powerful incentive for artisans to accept and complete leads on-platform.'
      ]
    },
    {
      id: 'sec-5',
      title: '3.7 Phase 1 vs Phase 2 Evolution Roadmap',
      badge: 'Evolution Matrix',
      points: [
        'Discovery: Artisan profiles & district search in INR (Phase 1 & 2)',
        'Booking: Phase 1 Structured Booking Request → Phase 2 Calendar-based direct booking',
        'Communication: Phase 1 WhatsApp Business backbone → Phase 2 In-app messaging + WhatsApp bot',
        'Payment: Phase 1 Payment-Free structured leads → Phase 2 UPI / Razorpay advance deposit',
        'Vendor Portal: Phase 1 MAKERS ops command → Phase 2 Vendor self-serve dashboard'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B2F23] via-[#244231] to-[#14221A] text-white p-8 rounded-3xl shadow-xl space-y-3 border border-[#2C4A38]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2F5740] border border-amber-400/30 text-amber-200 text-xs font-bold">
          <FileText className="w-4 h-4 text-amber-300" />
          <span>Product Requirements Document · v1.2</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-white">THE MAKERS System Architecture & PRD Compliance</h1>
        <p className="text-xs sm:text-sm text-[#D4E4DA] leading-relaxed max-w-2xl">
          Consolidated specifications for the Phase 1 Booking Request System, WhatsApp lead backbone, anti-bypass mechanisms, and evolution roadmap in Indian Rupees (₹).
        </p>
      </div>

      {/* Evolution Matrix Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E6DFD3] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-extrabold text-[#1D2B22]">Phase 1 vs Phase 2 Evolution Matrix</h2>
            <p className="text-xs text-[#526459]">How the current Phase 1 foundation scales seamlessly to Phase 2</p>
          </div>
          <span className="text-xs font-bold bg-[#EAF2EC] text-[#2F5740] px-3 py-1 rounded-full border border-[#C2DBC7]">
            Phase 1 Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#526459] border-b border-[#EAE3D7]">
                <th className="p-3 font-bold uppercase text-[10px]">Dimension</th>
                <th className="p-3 font-bold uppercase text-[10px] text-[#2F5740]">Phase 1 (Current Build)</th>
                <th className="p-3 font-bold uppercase text-[10px] text-amber-700">Phase 2 (Next Milestone)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D7]">
              <tr>
                <td className="p-3 font-bold text-[#1D2B22]">Customer Experience</td>
                <td className="p-3 bg-[#EAF2EC]/40 text-[#1F3327]">
                  Browse verified vendors, submit structured Booking Request with guests & remarks.
                </td>
                <td className="p-3 text-[#526459]">
                  Instant calendar booking, customized add-ons, dynamic package builder.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D2B22]">Payment Layer</td>
                <td className="p-3 bg-[#EAF2EC]/40 text-[#1F3327]">
                  <strong>Payment-Free</strong> (Zero transaction risk during initial marketplace launch).
                </td>
                <td className="p-3 text-[#526459]">
                  UPI / Razorpay / Card gateway with automated deposit escrow & milestone payouts.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D2B22]">Lead Routing</td>
                <td className="p-3 bg-[#EAF2EC]/40 text-[#1F3327]">
                  Automated WhatsApp Business notification with 1-tap accept/decline actions.
                </td>
                <td className="p-3 text-[#526459]">
                  In-app messaging, two-way WhatsApp AI bot, and automated calendar holds.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D2B22]">Vendor Protection</td>
                <td className="p-3 bg-[#EAF2EC]/40 text-[#1F3327]">
                  Phone numbers masked; attributable Booking IDs prevent lead bypass.
                </td>
                <td className="p-3 text-[#526459]">
                  Full vendor portal, commission billing, calendar sync & automated contracts.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PRD Sections Accordion / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prdSections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded-3xl p-6 border border-[#E6DFD3] shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {sec.badge}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D2B22] mt-1">{sec.title}</h3>
              <ul className="space-y-2 mt-3 text-xs text-[#526459]">
                {sec.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F5740] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
