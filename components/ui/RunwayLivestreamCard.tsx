"use client";

import React, { useState } from "react";

interface RunwayLivestreamCardProps {
  collectionTitle?: string;
  season?: string;
  venue?: string;
  countdownHours?: number;
  className?: string;
}

export function RunwayLivestreamCard({
  collectionTitle = "Monolith & Void: Architecture of Form",
  season = "Autumn / Winter 2026",
  venue = "Grand Palais Éphémère, Paris",
  countdownHours = 48,
  className = "",
}: RunwayLivestreamCardProps) {
  const [rsvpd, setRsvpd] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 sm:p-8 ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Live Runway Broadcast
          </div>

          <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-widest text-neutral-100">
            {collectionTitle}
          </h3>

          <p className="text-xs font-mono text-neutral-400">
            {season} &bull; {venue}
          </p>

          <p className="text-xs text-neutral-400 leading-relaxed pt-1">
            Experience the Maison Autumn/Winter 2026 defilé live in 4K spatial audio. Front-row digital seats feature instant runway look reservation and live creative director dispatches.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              Time Until Runway Lights
            </span>
            <div className="flex items-center gap-2 font-mono text-xl font-bold text-amber-300">
              <span>{countdownHours}h</span>
              <span className="text-neutral-600">:</span>
              <span>00m</span>
              <span className="text-neutral-600">:</span>
              <span>00s</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRsvpd(!rsvpd)}
            className={`w-full md:w-auto px-6 py-2.5 rounded font-serif text-xs uppercase tracking-widest transition-all ${
              rsvpd
                ? "bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20"
                : "bg-neutral-100 text-neutral-950 font-semibold hover:bg-white"
            }`}
          >
            {rsvpd ? "✓ Front-Row Access Confirmed" : "RSVP For VIP Front-Row Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
