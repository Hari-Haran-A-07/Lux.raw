"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, MapPin, CheckCircle2, User, RefreshCw, Wine } from "lucide-react";

export default function VipSalonPage() {
  const [clientName, setClientName] = useState("Madame de Montespan");
  const [clientEmail, setClientEmail] = useState("montespan@parishautecouture.fr");
  const [city, setCity] = useState("Paris");
  const [date, setDate] = useState("2026-10-24");
  const [timeSlot, setTimeSlot] = useState("16:00");
  const [champagne, setChampagne] = useState("Dom Pérignon Vintage 2013");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, clientEmail, city, date, timeSlot, champagne })
      });
      const data = await res.json();
      setConfirmation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>VIP PRIVATE SUITES • KOTLIN 1.9 KTOR COROUTINES ENGINE</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            VIP Private <span className="text-[#b59a6d] italic font-normal">Salon Suites</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Reserve an exclusive private salon fitting suite in Paris, Milan, New York, Tokyo, or London, paired with dedicated master tailoring and champagne hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Reservation Form */}
          <div className="lg:col-span-6 bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="text-sm font-editorial-caps tracking-widest text-[#f4f3ef] flex items-center gap-2 border-b border-[#27272a] pb-3">
              <Calendar className="w-4 h-4 text-[#b59a6d]" />
              <span>PRIVATE SALON RESERVATION</span>
            </h2>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">CLIENT PATRON FULL NAME</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">CONFIDENTIAL EMAIL</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">FLAGSHIP BOUTIQUE CITY</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                  >
                    <option value="Paris">Paris (Place Vendôme)</option>
                    <option value="Milan">Milan (Via Montenapoleone)</option>
                    <option value="New York">New York (Madison Avenue)</option>
                    <option value="Tokyo">Tokyo (Ginza)</option>
                    <option value="London">London (New Bond Street)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">DATE</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">TIME SLOT</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                  >
                    <option value="11:00">11:00 AM (Morning Fitting)</option>
                    <option value="14:00">02:00 PM (Afternoon Salon)</option>
                    <option value="16:00">04:00 PM (Sunset Preview)</option>
                    <option value="19:00">07:00 PM (Nocturne Private)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">HOSPITALITY CRU</label>
                  <select
                    value={champagne}
                    onChange={(e) => setChampagne(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
                  >
                    <option value="Dom Pérignon Vintage 2013">Dom Pérignon Vintage 2013</option>
                    <option value="Krug Clos d'Ambonnay">Krug Clos d'Ambonnay</option>
                    <option value="Rare Japanese Gyokuro Tea">Rare Japanese Gyokuro Tea</option>
                    <option value="Sparkling San Pellegrino Solitude">Sparkling San Pellegrino Solitude</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                <span>{loading ? "PROVISIONING SUITE..." : "CONFIRM PRIVATE SUITE RESERVATION"}</span>
              </button>
            </form>
          </div>

          {/* Confirmation Voucher */}
          <div className="lg:col-span-6 space-y-6">
            {confirmation ? (
              <div className="bg-[#121214] border border-[#b59a6d]/40 p-6 sm:p-8 rounded-sm space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {confirmation.status}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717a]">{confirmation.appointmentId}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block">
                    RESERVED PRIVATE ATELIER SUITE
                  </span>
                  <h3 className="font-serif text-2xl text-[#f4f3ef]">{confirmation.privateSuite}</h3>
                  <p className="text-xs text-[#a1a1aa] font-light flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#b59a6d]" />
                    <span>{confirmation.boutiqueLocation}</span>
                  </p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717a]">PATRON</span>
                    <span className="text-[#f4f3ef]">{confirmation.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717a]">DATE &amp; TIME</span>
                    <span className="text-[#f4f3ef]">{confirmation.date} at {confirmation.timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717a]">MASTER STYLIST</span>
                    <span className="text-[#b59a6d]">{confirmation.dedicatedStylist}</span>
                  </div>
                  <div className="pt-2 border-t border-[#27272a] text-[11px] text-[#a1a1aa] font-sans">
                    <span className="font-mono text-[9px] uppercase block text-[#71717a]">Hospitality Package</span>
                    {confirmation.hospitalityPackage}
                  </div>
                </div>

                <div className="text-[10px] text-[#52525b] font-mono pt-2 border-t border-[#27272a] flex items-center justify-between">
                  <span>Engine: {confirmation.engine}</span>
                  <span>Latency: {confirmation.executionLatencyMs}ms</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#121214] border border-[#27272a] p-12 text-center space-y-4 rounded-sm flex flex-col items-center justify-center min-h-[420px]">
                <Wine className="w-8 h-8 text-[#b59a6d]/40" />
                <h3 className="font-serif text-lg text-[#f4f3ef]">Awaiting Suite Selection</h3>
                <p className="text-xs text-[#71717a] font-light max-w-md">
                  Choose your flagship boutique city, date, and hospitality preferences to book via the Kotlin VIP Concierge Engine.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
