"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Instagram, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setErrorMsg(data.error || "Subscription failed");
      }
    } catch {
      setErrorMsg("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#09090b] text-[#a1a1aa] border-t border-[#27272a] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Maison Monograph & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#27272a]/70">
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="font-serif tracking-[0.3em] text-2xl font-light text-[#f4f3ef] uppercase inline-block"
            >
              luxury.<span className="font-normal italic text-[#b59a6d]">Raw</span>
            </Link>
            <p className="text-xs font-light leading-relaxed max-w-md text-[#71717a]">
              A digital luxury maison exploring the tension between monumental architectural brutalism and untamed Italian craftsmanship. Handcrafted in Florence, Milan, and Biella.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d]">MAISON PRIVATE GAZETTE</span>
            <p className="text-xs text-[#d4d4d8] font-light">
              Receive private invitations to runway monographs, seasonal capsules, and bespoke atelier appointments.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#b59a6d] font-editorial-caps py-3">
                <Check className="w-4 h-4" />
                <span>You have been subscribed to luxury.Raw private communications.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md items-center border-b border-[#3f3f46] focus-within:border-[#b59a6d] transition-colors pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="bg-transparent text-xs text-[#f4f3ef] placeholder-[#71717a] focus:outline-none flex-1 py-1 font-light"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe"
                  className="text-xs font-editorial-caps text-[#b59a6d] hover:text-white transition-colors flex items-center gap-1 pl-2"
                >
                  <span>{loading ? "ENROLLING..." : "JOIN"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            {errorMsg && <p className="text-[11px] text-rose-400">{errorMsg}</p>}
          </div>
        </div>

        {/* Middle: Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-[#27272a]/70 text-xs">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="font-editorial-caps text-[11px] text-[#f4f3ef]">CLIENT CONCIERGE</h4>
            <ul className="space-y-2.5 font-light text-[#71717a]">
              <li>
                <Link href="/client-services/contact" className="hover:text-[#f4f3ef] transition-colors">
                  Contact Atelier Concierge
                </Link>
              </li>
              <li>
                <Link href="/vip-salon" className="hover:text-[#b59a6d] transition-colors">
                  VIP Private Salon Suites
                </Link>
              </li>
              <li>
                <Link href="/stylist" className="hover:text-[#b59a6d] transition-colors">
                  AI Haute Couture Stylist
                </Link>
              </li>
              <li>
                <Link href="/passport" className="hover:text-[#b59a6d] transition-colors">
                  Digital Passport &amp; 3D Fit
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-[#f4f3ef] transition-colors">
                  Flagship Boutiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="font-editorial-caps text-[11px] text-[#f4f3ef]">THE MAISON</h4>
            <ul className="space-y-2.5 font-light text-[#71717a]">
              <li>
                <Link href="/about" className="hover:text-[#f4f3ef] transition-colors">
                  Architectural Philosophy
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#b59a6d] transition-colors">
                  Centennial Heritage Archive
                </Link>
              </li>
              <li>
                <Link href="/press-club" className="hover:text-[#b59a6d] transition-colors">
                  VIP Press &amp; Patron Club
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#f4f3ef] transition-colors">
                  Atelier Journal &amp; Chronicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="font-editorial-caps text-[11px] text-[#f4f3ef]">COLLECTIONS</h4>
            <ul className="space-y-2.5 font-light text-[#71717a]">
              <li>
                <Link href="/women" className="hover:text-[#f4f3ef] transition-colors">
                  Women's Runway
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-[#f4f3ef] transition-colors">
                  Men's Monolith
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-[#b59a6d] transition-colors flex items-center gap-1.5">
                  <span>Live Runway Drops</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                </Link>
              </li>
              <li>
                <Link href="/collections/autumn-winter-2026" className="hover:text-[#f4f3ef] transition-colors">
                  Autumn / Winter 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="font-editorial-caps text-[11px] text-[#f4f3ef]">POLYGLOT MESH</h4>
            <ul className="space-y-2.5 font-light text-[#71717a]">
              <li>
                <Link href="/polyglot" className="hover:text-[#b59a6d] transition-colors font-medium text-[#b59a6d]">
                  11-Engine Command Center
                </Link>
              </li>
              <li>
                <Link href="/admin/sql-analytics" className="hover:text-[#f4f3ef] transition-colors">
                  Executive SQL Intelligence
                </Link>
              </li>
              <li>
                <Link href="/passport" className="hover:text-[#f4f3ef] transition-colors">
                  Rust SHA-256 Provenance
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-[#f4f3ef] transition-colors">
                  Go Concurrency Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-4">
            <h4 className="font-editorial-caps text-[11px] text-[#f4f3ef]">LEGAL &amp; REPUTATION</h4>
            <ul className="space-y-2.5 font-light text-[#71717a]">
              <li>
                <Link href="/legal/privacy" className="hover:text-[#f4f3ef] transition-colors">
                  Privacy Policy &amp; Cookies
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-[#f4f3ef] transition-colors">
                  Terms of Acquisition
                </Link>
              </li>
              <li>
                <Link href="/legal/authenticity" className="hover:text-[#f4f3ef] transition-colors">
                  Certificate of Authenticity
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#b59a6d] transition-colors">
                  Maison Atelier Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-light text-[#52525b]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#a1a1aa]">
              <Globe className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>International / USD ($)</span>
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} luxury.Raw Maison S.r.l. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-editorial-caps text-[10px] text-[#71717a]">
            <span className="hover:text-[#f4f3ef] cursor-pointer">FLORENCE</span>
            <span className="hover:text-[#f4f3ef] cursor-pointer">MILAN</span>
            <span className="hover:text-[#f4f3ef] cursor-pointer">PARIS</span>
            <span className="hover:text-[#f4f3ef] cursor-pointer">NEW YORK</span>
            <span className="hover:text-[#f4f3ef] cursor-pointer">TOKYO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
