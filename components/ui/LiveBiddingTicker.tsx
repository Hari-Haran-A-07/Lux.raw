"use client";

import React from "react";

interface BiddingTickerProps {
  currentBidEur: number;
  lotName: string;
}

export function LiveBiddingTicker({ currentBidEur, lotName }: BiddingTickerProps) {
  const usdApprox = Math.round(currentBidEur * 1.08);

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/90 border border-neutral-800">
      <div>
        <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Live Lot</p>
        <p className="text-sm font-serif text-white">{lotName}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-mono text-amber-400">CURRENT BID</p>
        <p className="text-base font-mono font-bold text-white">€{currentBidEur.toLocaleString()}</p>
        <p className="text-[10px] text-neutral-500 font-mono">≈ ${usdApprox.toLocaleString()} USD</p>
      </div>
    </div>
  );
}
