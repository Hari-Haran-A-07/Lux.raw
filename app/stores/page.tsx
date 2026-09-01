"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Calendar, Check, Sparkles } from "lucide-react";
import { Store } from "@/lib/types";

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedCity, setSelectedCity] = useState("ALL");
  const [appointmentStore, setAppointmentStore] = useState<Store | null>(null);
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  useEffect(() => {
    async function loadStores() {
      try {
        const res = await fetch("/api/stores");
        if (res.ok) {
          const data = await res.json();
          setStores(data.stores || []);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadStores();
  }, []);

  const filteredStores =
    selectedCity === "ALL"
      ? stores
      : stores.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSuccess(true);
    setTimeout(() => {
      setAppointmentSuccess(false);
      setAppointmentStore(null);
      setAppointmentName("");
      setAppointmentEmail("");
      setAppointmentDate("");
    }, 3000);
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            GLOBAL SANCTUARIES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#f4f3ef] font-light">
            Flagship Boutiques & Salons
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Experience our physical digital showrooms, reserve private viewing suites, or consult with resident master tailors.
          </p>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {["ALL", "Paris", "Milan", "New York", "Tokyo", "London"].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-4 py-1.5 font-editorial-caps border transition-colors ${
                  selectedCity === city
                    ? "bg-[#f4f3ef] text-[#09090b] border-white font-medium"
                    : "border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#52525b]"
                }`}
              >
                {city.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        <div className="space-y-16">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111114] border border-[#27272a] p-6 sm:p-10"
            >
              {/* Store Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18181b]">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover brightness-85 hover:scale-105 transition-transform duration-700"
                  />
                  {store.isFlagship && (
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-[#b59a6d]/50 text-[#b59a6d] text-[9px] font-editorial-caps px-3 py-1">
                      GLOBAL MAISON FLAGSHIP
                    </div>
                  )}
                </div>
              </div>

              {/* Store Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-editorial-caps text-[#b59a6d]">
                    {store.city}, {store.country}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4f3ef] font-light">
                    {store.name}
                  </h3>
                </div>

                <div className="space-y-3 text-xs font-light text-[#a1a1aa]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#b59a6d] flex-shrink-0 mt-0.5" />
                    <span>
                      {store.address} {store.postalCode && `• ${store.postalCode}`}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#b59a6d] flex-shrink-0 mt-0.5" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#b59a6d] flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#b59a6d] flex-shrink-0" />
                    <span>{store.email}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="pt-2 border-t border-[#27272a] text-xs">
                  <span className="font-editorial-caps text-[10px] text-[#71717a] block mb-1">
                    EXCLUSIVE SALON SERVICES:
                  </span>
                  <p className="text-[#d4d4d8] font-light leading-relaxed">{store.services}</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setAppointmentStore(store)}
                    className="bg-[#f4f3ef] text-[#09090b] px-6 py-3 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
                  >
                    BOOK PRIVATE SALON APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      {appointmentStore && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0d0f] border border-[#27272a] max-w-lg w-full p-8 text-[#f4f3ef] relative animate-fade-in space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-editorial-caps text-[#b59a6d]">
                PRIVATE SALON RESERVATION
              </span>
              <h3 className="font-serif text-2xl font-light">{appointmentStore.name}</h3>
              <p className="text-xs text-[#a1a1aa] font-light">
                Our concierge team will reserve private viewing suites with tailored Champagne service.
              </p>
            </div>

            {appointmentSuccess ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-800 text-center space-y-2 text-xs text-emerald-300">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-base text-white">Appointment Reserved</h4>
                <p>A confirmation email and private salon pass have been dispatched.</p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PATRON NAME</label>
                  <input
                    type="text"
                    required
                    value={appointmentName}
                    onChange={(e) => setAppointmentName(e.target.value)}
                    placeholder="Madame Laurent"
                    className="w-full bg-[#141416] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={appointmentEmail}
                    onChange={(e) => setAppointmentEmail(e.target.value)}
                    placeholder="laurent@maison.com"
                    className="w-full bg-[#141416] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PREFERRED DATE & TIME</label>
                  <input
                    type="datetime-local"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-[#141416] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAppointmentStore(null)}
                    className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-3 hover:border-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps py-3 hover:bg-[#b59a6d] transition-colors"
                  >
                    CONFIRM RESERVATION
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
