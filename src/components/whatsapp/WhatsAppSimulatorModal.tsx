import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  ShieldCheck, 
  Clock, 
  Check, 
  X, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const WhatsAppSimulatorModal: React.FC = () => {
  const { 
    bookings, 
    selectedBookingId, 
    setSelectedBookingId, 
    vendorRespondWhatsApp, 
    setActiveTab,
    slaConfigHours 
  } = useBooking();

  const [customReply, setCustomReply] = useState('');

  const currentBooking = bookings.find(b => b.id.toLowerCase() === (selectedBookingId || '').toLowerCase()) || bookings[0];

  const handleActionClick = (action: 'Accept Request' | 'Decline Request' | 'Need More Details') => {
    if (!currentBooking) return;
    vendorRespondWhatsApp(currentBooking.id, action, customReply || undefined);
    setCustomReply('');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBooking || !customReply.trim()) return;
    vendorRespondWhatsApp(currentBooking.id, 'Accept Request', customReply);
    setCustomReply('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-screen bg-[#FAF7F2]">
      {/* Top Banner Explainer */}
      <div className="bg-[#1B2F23] text-amber-50 p-6 rounded-3xl border border-[#2C4A38] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#2F5740] text-amber-200 border border-amber-400/30">
              WhatsApp Business Backbone
            </span>
            <span className="text-xs text-[#D4E4DA]">Artisan Lead Router & SLA Simulator</span>
          </div>
          <h1 className="font-serif text-2xl font-extrabold mt-1 text-white">Interactive WhatsApp Lead Router</h1>
          <p className="text-xs text-[#B5CAC0] mt-0.5 max-w-xl">
            Experience how THE MAKERS dispatches structured booking requests in Indian Rupees (₹) directly to artisans and records their 1-tap availability responses instantly.
          </p>
        </div>

        {/* Quick Booking Selector */}
        <div className="flex items-center gap-2 bg-[#14221A] p-3 rounded-2xl border border-[#2B4235] text-xs">
          <span className="text-emerald-300 font-medium">Active Booking:</span>
          <select
            value={currentBooking?.id || ''}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="bg-[#1C2C23] text-amber-100 font-mono font-bold px-3 py-1.5 rounded-xl border border-[#2F5740] focus:outline-none"
          >
            {bookings.map(b => (
              <option key={b.id} value={b.id}>
                {b.id} ({b.vendorName.substring(0, 15)}... - {b.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Container: WhatsApp Mock Screen */}
      <div className="bg-[#1E2E25] rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#2C4A38] flex justify-center">
        <div className="w-full max-w-2xl bg-[#0b141a] text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 flex flex-col h-[680px]">
          {/* WhatsApp Header */}
          <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2F5740] border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold shadow-sm">
                M
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-100">THE MAKERS Business Verification</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">Official Lead Router (India) · Online</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                {currentBooking ? currentBooking.id : 'No Booking'}
              </span>
            </div>
          </div>

          {/* Chat Messages Canvas */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Encryption & Protection Notice */}
            <div className="text-center">
              <span className="inline-block bg-[#182229] text-amber-300/80 text-[10px] px-3 py-1 rounded-lg border border-amber-500/20 max-w-md shadow-xs">
                🔒 Protected by THE MAKERS: Client contact numbers and lead details are verified with end-to-end 4-hour SLA tracking.
              </span>
            </div>

            {currentBooking ? (
              <>
                {currentBooking.whatsAppMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'Vendor' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md whitespace-pre-line leading-relaxed ${
                      msg.sender === 'Vendor'
                        ? 'bg-[#005c4b] text-slate-100 rounded-tr-xs'
                        : 'bg-[#202c33] text-slate-200 rounded-tl-xs'
                    }`}>
                      <div className="text-[10px] text-emerald-300/70 font-semibold mb-1">
                        {msg.sender}
                      </div>
                      {msg.content}

                      {/* Quick Action Interactive Buttons */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-600/60 space-y-1.5">
                          <div className="text-[10px] text-slate-400 font-medium">1-Tap Artisan Action:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.quickActions.map((act) => {
                              const isSelected = msg.selectedAction === act;
                              return (
                                <button
                                  key={act}
                                  onClick={() => handleActionClick(act as any)}
                                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ${
                                    isSelected
                                      ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                                      : act === 'Accept Request'
                                      ? 'bg-[#2F5740] hover:bg-[#3D6E52] text-amber-100'
                                      : act === 'Decline Request'
                                      ? 'bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800'
                                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                                  }`}
                                >
                                  {act === 'Accept Request' && <Check className="w-3 h-3 text-amber-300" />}
                                  {act === 'Decline Request' && <X className="w-3 h-3" />}
                                  {act === 'Need More Details' && <HelpCircle className="w-3 h-3" />}
                                  <span>{act}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <CheckCheck className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-xs text-slate-500 pt-12">
                No active booking selected.
              </div>
            )}
          </div>

          {/* Quick Input Box */}
          <form onSubmit={handleCustomSend} className="bg-[#202c33] p-3 flex items-center gap-2 border-t border-slate-700/50">
            <input
              type="text"
              placeholder="Simulate custom artisan reply (e.g., 'We have confirmed the date and locked your menu!')..."
              value={customReply}
              onChange={(e) => setCustomReply(e.target.value)}
              className="flex-1 bg-[#2a3942] text-xs text-slate-100 px-4 py-2.5 rounded-2xl focus:outline-none placeholder-slate-400 font-medium"
            />
            <button
              type="submit"
              disabled={!customReply.trim()}
              className="p-2.5 bg-[#2F5740] hover:bg-[#3D6E52] text-amber-100 rounded-2xl disabled:opacity-40 transition shadow-md"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
