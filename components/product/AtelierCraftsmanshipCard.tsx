"use client";

import React, { useState } from "react";

export interface CraftsmanshipDossier {
  artisanTitle: string;
  atelierRegion: string;
  hoursHandcrafted: number;
  leatherGrade?: string;
  threadType?: string;
  tanneryProvenance: string;
  environmentalCertification: string;
}

interface AtelierCraftsmanshipCardProps {
  dossier?: CraftsmanshipDossier;
  className?: string;
}

const DEFAULT_DOSSIER: CraftsmanshipDossier = {
  artisanTitle: "Maître Maroquinier de Paris",
  atelierRegion: "Place Vendôme Atelier, Paris",
  hoursHandcrafted: 18.5,
  leatherGrade: "Full-Grain Saddle Calfskin (Grade 1)",
  threadType: "Waxed Linen Fil au Chinois",
  tanneryProvenance: "Tuscany Vegetable-Tanned Heritage",
  environmentalCertification: "LWG Gold Certified (Zero Harm)",
};

export function AtelierCraftsmanshipCard({
  dossier = DEFAULT_DOSSIER,
  className = "",
}: AtelierCraftsmanshipCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={`rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 backdrop-blur-sm ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90">
              Artisan Dossier &bull; Savoir-Faire
            </span>
          </div>
          <h4 className="text-sm font-serif uppercase tracking-wider text-neutral-100">
            {dossier.artisanTitle}
          </h4>
          <p className="text-xs text-neutral-400 font-sans">
            Crafted at {dossier.atelierRegion}
          </p>
        </div>

        <div className="text-right">
          <span className="block font-serif text-lg font-bold text-amber-300">
            {dossier.hoursHandcrafted}h
          </span>
          <span className="block text-[9px] font-mono uppercase tracking-widest text-neutral-500">
            Hand-Stitched
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-800/80 pt-3">
        <div>
          <span className="block text-[9px] font-mono uppercase tracking-widest text-neutral-500">
            Material Sourcing
          </span>
          <span className="text-xs text-neutral-300 font-serif">
            {dossier.tanneryProvenance}
          </span>
        </div>
        <div>
          <span className="block text-[9px] font-mono uppercase tracking-widest text-neutral-500">
            Leather Grade
          </span>
          <span className="text-xs text-neutral-300 font-serif truncate block">
            {dossier.leatherGrade}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3 border-t border-neutral-800/80 pt-3 text-xs text-neutral-400 animate-fadeIn">
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-widest text-neutral-500">
              Couture Thread
            </span>
            <span className="text-neutral-200">{dossier.threadType}</span>
          </div>
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-widest text-neutral-500">
              Sustainability & Compliance
            </span>
            <span className="text-neutral-200">{dossier.environmentalCertification}</span>
          </div>
          <p className="text-[11px] leading-relaxed italic text-neutral-500">
            Each creation is inspected under polarized luminescence and cataloged in the Maison Heritage Ledger with a unique cryptographic provenance sequence.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 w-full rounded border border-neutral-800/80 bg-neutral-900/40 py-1.5 text-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
      >
        {isExpanded ? "Collapse Dossier ↑" : "Inspect Complete Provenance ↓"}
      </button>
    </div>
  );
}
