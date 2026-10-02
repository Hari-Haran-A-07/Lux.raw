"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("Private Client Inquiry");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#f4f3ef] font-light">
            Contact the Maison
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Our atelier concierge advisors are at your service for product recommendations, Made-to-Measure orders, and private salon appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8 bg-[#111114] border border-[#27272a] p-8">
            <h3 className="font-serif text-2xl font-light text-[#f4f3ef]">Direct Concierge</h3>

            <div className="space-y-4 text-xs font-light text-[#a1a1aa]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#b59a6d] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Telephone Assistance</strong>
                  <span>+33 1 42 68 00 24 (Europe)</span>
                  <br />
                  <span>+1 212 555 0192 (Americas)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#b59a6d] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Digital Mail & Company Recovery</strong>
                  <a href="mailto:suryaharan786@gmail.com" className="text-[#b59a6d] hover:underline font-mono">
                    suryaharan786@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#b59a6d] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Central Atelier</strong>
                  <span>24 Place Vendôme, 75001 Paris, France</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#27272a] text-[11px] text-[#71717a]">
              <span>Concierge operating hours: Monday – Saturday: 08:00 – 21:00 CET.</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#111114] border border-[#27272a] p-8">
            {submitted ? (
              <div className="py-16 text-center space-y-4 text-xs">
                <Check className="w-10 h-10 text-[#b59a6d] mx-auto" />
                <h3 className="font-serif text-2xl text-white">Message Transmitted</h3>
                <p className="text-[#a1a1aa] max-w-sm mx-auto">
                  A personal client advisor will review your dossier and respond within four business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PATRON NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Madame Vivienne Laurent"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="laurent@maison.com"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">INQUIRY PURPOSE</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  >
                    <option value="Private Client Inquiry">Private Client Inquiry</option>
                    <option value="Account & Order Recovery / Security">Account & Order Recovery / Security</option>
                    <option value="Made-to-Measure Sizing Advice">Made-to-Measure Sizing Advice</option>
                    <option value="Special Order / Leather Monogramming">Special Order / Leather Monogramming</option>
                    <option value="Atelier Lifetime Care Request">Atelier Lifetime Care Request</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">MESSAGE / REQUEST *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f4f3ef] text-[#09090b] py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
