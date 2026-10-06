"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Flame, Clock, Shield, ArrowUpRight, CheckCircle2, User, RefreshCw, Activity, Layers } from "lucide-react";

interface DropLot {
  dropId: string;
  title: string;
  edition: string;
  startingPrice: number;
  currentBid: number;
  topBidder: string;
  status: string;
  engine: string;
}

export default function DropsPage() {
  const [lots, setLots] = useState<DropLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState<Record<string, number>>({});
  const [bidding, setBidding] = useState<string | null>(null);
  const [bidSuccess, setBidSuccess] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<any>(null);

  const fetchLots = async () => {
    try {
      const res = await fetch("/api/polyglot/drops");
      const data = await res.json();
      if (data.activeDrops) {
        setLots(data.activeDrops);
        const initialBids: Record<string, number> = {};
        data.activeDrops.forEach((lot: DropLot) => {
          initialBids[lot.dropId] = lot.currentBid + 250;
        });
        setBidAmount(initialBids);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
    // Simulate live telemetry pulse
    setTelemetry({
      activeClients: 1428,
      liveBagAdditions: 39,
      requestsPerSec: 360,
      boutiques: { Paris: 84, Milan: 112, NYC: 145, Tokyo: 96 }
    });
  }, []);

  const handlePlaceBid = async (dropId: string) => {
    setBidding(dropId);
    setBidSuccess(null);
    const amount = bidAmount[dropId];

    try {
      const res = await fetch("/api/polyglot/drops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dropId,
          userId: "USR-CURRENT",
          userName: "MaisonVIP_Patron",
          amount
        })
      });
      const data = await res.json();
      if (res.ok) {
        setLots(prev => prev.map(lot => lot.dropId === dropId ? { ...lot, currentBid: amount, topBidder: "MaisonVIP_Patron (You)" } : lot));
        setBidSuccess(`Bid of $${amount.toLocaleString()} placed successfully! Handled by Go Engine.`);
        setBidAmount(prev => ({ ...prev, [dropId]: amount + 250 }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBidding(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>REAL-TIME VIP RUNWAY DROPS • GO 1.22 WEBSOCKET ENGINE</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Maison Live <span className="text-[#b59a6d] italic font-normal">Flash Drops</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Ultra-limited, 1-of-1 runway prototypes and archival artifacts released via sub-millisecond real-time bidding channels powered by the Go concurrency runtime.
          </p>
        </div>

        {bidSuccess && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 p-4 rounded-sm text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{bidSuccess}</span>
          </div>
        )}

        {/* Live Lots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lots.map((lot) => (
            <div key={lot.dropId} className="bg-[#121214] border border-[#27272a] rounded-sm p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-[#b59a6d]/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 text-red-400 border border-red-800/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    LIVE AUCTION
                  </span>
                  <span className="text-[10px] font-mono text-[#71717a]">{lot.edition}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#f4f3ef]">{lot.title}</h3>
                <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                  Crafted exclusively in our Florence atelier. Authenticated via Ed25519 digital signature and assigned private delivery via bespoke armored courier.
                </p>

                {/* Pricing & Bid Box */}
                <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#71717a] block">STARTING PRICE</span>
                    <span className="text-[#a1a1aa]">${lot.startingPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#b59a6d] block">CURRENT TOP BID</span>
                    <span className="text-xl font-serif text-[#f4f3ef]">${lot.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-[11px]">
                    <span className="text-[#71717a]">High Bidder:</span>
                    <span className="text-[#b59a6d] font-semibold">{lot.topBidder}</span>
                  </div>
                </div>
              </div>

              {/* Bidding Control */}
              <div className="space-y-3 pt-4 border-t border-[#27272a]">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-[#71717a] font-mono">$</span>
                    <input
                      type="number"
                      value={bidAmount[lot.dropId] || lot.currentBid + 250}
                      onChange={(e) => setBidAmount({ ...bidAmount, [lot.dropId]: Number(e.target.value) })}
                      min={lot.currentBid + 100}
                      step="100"
                      className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] pl-7 pr-3 py-2 text-xs font-mono text-white rounded-sm outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handlePlaceBid(lot.dropId)}
                    disabled={bidding === lot.dropId || (bidAmount[lot.dropId] || 0) <= lot.currentBid}
                    className="px-6 py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {bidding === lot.dropId ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
                    <span>{bidding === lot.dropId ? "SUBMITTING..." : "PLACE BID"}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#52525b] font-mono">
                  <span>Engine: {lot.engine}</span>
                  <span>Latency: ~2ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Boutique Telemetry Hub */}
        {telemetry && (
          <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-4">
            <h3 className="text-xs font-editorial-caps tracking-widest text-[#b59a6d] flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>GLOBAL MAISON CONCURRENCY TELEMETRY (GO GOROUTINE STREAM)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-sm">
                <span className="text-[10px] text-[#71717a] block">ACTIVE VIP SESSIONS</span>
                <span className="text-base text-white">{telemetry.activeClients}</span>
              </div>
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-sm">
                <span className="text-[10px] text-[#71717a] block">REAL-TIME BAG EVENTS</span>
                <span className="text-base text-[#b59a6d]">{telemetry.liveBagAdditions} / min</span>
              </div>
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-sm">
                <span className="text-[10px] text-[#71717a] block">THROUGHPUT</span>
                <span className="text-base text-emerald-400">{telemetry.requestsPerSec} req/sec</span>
              </div>
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-sm">
                <span className="text-[10px] text-[#71717a] block">FLAGSHIP BOUTIQUE FOOTFALL</span>
                <span className="text-base text-[#d4d4d8]">Paris: {telemetry.boutiques?.Paris} | Milan: {telemetry.boutiques?.Milan}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
