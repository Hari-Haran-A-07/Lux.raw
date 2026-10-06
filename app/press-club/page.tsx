"use client";

import React, { useState } from "react";
import { Newspaper, Send, Shield, Crown, CheckCircle2, RefreshCw, Lock } from "lucide-react";

export default function PressClubPage() {
  const [title, setTitle] = useState("Autumn/Winter 2026 Architectural Monolith Monograph");
  const [collectionCode, setCollectionCode] = useState("AW26-MONOLITH");
  const [loading, setLoading] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, collectionCode })
      });
      const data = await res.json();
      setDispatchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tiers = [
    {
      name: "Obsidian Salon Member",
      spend: "$15,000 / year",
      privileges: ["Private Salon Keycard", "48-Hour Runway Advance Order", "Chauffeur Service"]
    },
    {
      name: "Titanium Haute Member",
      spend: "$50,000 / year",
      privileges: ["Custom 1-of-1 Bespoke Tailoring", "Milan Fashion Week Front-Row Passes", "Dedicated Master Artisan"]
    },
    {
      name: "Sovereign Maison Patron",
      spend: "$150,000 / year",
      privileges: ["Annual Private Flight to Florence Atelier", "Archival Monolith Vault Access", "Lifetime Private Concierge"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>VIP SECRET SALON &amp; PRESS DISPATCH • RUBY 3.3 YJIT ENGINE</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            VIP Press &amp; <span className="text-[#b59a6d] italic font-normal">Patron Club</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Encrypted monograph dispatch wires for global fashion publications, alongside exclusive patron tier management powered by the Ruby EventMachine engine.
          </p>
        </div>

        {/* VIP Tiers */}
        <div className="space-y-6">
          <h2 className="text-sm font-editorial-caps tracking-widest text-[#b59a6d] flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <span>MAISON PATRON MEMBERSHIP TIERS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className="bg-[#121214] border border-[#27272a] p-6 rounded-sm space-y-4 hover:border-[#b59a6d]/50 transition-colors">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 inline-block">
                  TIER 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-[#f4f3ef]">{tier.name}</h3>
                <span className="text-xs font-mono text-[#a1a1aa] block">{tier.spend}</span>
                <ul className="space-y-2 text-xs font-light text-[#71717a] pt-3 border-t border-[#27272a]">
                  {tier.privileges.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b59a6d]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Press Dispatch Wire */}
        <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-6">
          <h2 className="text-sm font-editorial-caps tracking-widest text-[#f4f3ef] flex items-center gap-2 border-b border-[#27272a] pb-3">
            <Send className="w-4 h-4 text-[#b59a6d]" />
            <span>EMBARGOED EDITORIAL DISPATCH WIRE</span>
          </h2>

          <form onSubmit={handleDispatch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">MONOGRAPH TITLE</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs text-[#f4f3ef] rounded-sm outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">COLLECTION CODE</label>
              <input
                type="text"
                value={collectionCode}
                onChange={(e) => setCollectionCode(e.target.value)}
                required
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs font-mono text-[#f4f3ef] rounded-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-3 py-3 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{loading ? "TRANSMITTING ENCRYPTED WIRE..." : "DISPATCH EMBARGOED PRESS RELEASE"}</span>
            </button>
          </form>

          {dispatchResult && (
            <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                <span className="text-[#71717a]">DISPATCH REFERENCE</span>
                <span className="text-[#b59a6d]">{dispatchResult.dispatch_id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717a]">WIRE STATUS</span>
                <span className="text-emerald-400">{dispatchResult.status}</span>
              </div>
              <div className="text-[11px] text-[#a1a1aa]">
                <span className="text-[9px] uppercase block text-[#71717a] mb-1">Authenticated Global Press Outlets ({dispatchResult.recipients_count})</span>
                <div className="flex flex-wrap gap-2">
                  {dispatchResult.press_outlets?.map((outlet: any, idx: number) => (
                    <span key={idx} className="bg-[#18181b] px-2 py-1 rounded text-[10px] text-white border border-[#27272a]">
                      {outlet.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a]">
                <span>Engine: {dispatchResult.engine}</span>
                <span>Latency: {dispatchResult.executionLatencyMs}ms</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
