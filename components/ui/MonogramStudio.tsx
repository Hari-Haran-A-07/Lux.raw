"use client";

import React, { useState } from "react";

export type FoilFinish = "GOLD_LEAF" | "SILVER_PALLADIUM" | "BLIND_DEBOSS" | "ROSE_GOLD";
export type MonogramFont = "SERIF_ROMAN" | "BAUHAUS_SANS" | "MODERN_SCRIPT";

interface MonogramStudioProps {
  productName?: string;
  onApply?: (config: { text: string; foil: FoilFinish; font: MonogramFont }) => void;
  className?: string;
}

const FOIL_STYLES: Record<FoilFinish, { label: string; textClass: string; bgClass: string }> = {
  GOLD_LEAF: {
    label: "24K Gold Leaf",
    textClass: "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)]",
    bgClass: "from-amber-200 via-yellow-500 to-amber-200",
  },
  SILVER_PALLADIUM: {
    label: "Palladium Silver",
    textClass: "bg-gradient-to-r from-slate-200 via-gray-300 to-zinc-100 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(203,213,225,0.3)]",
    bgClass: "from-slate-200 via-gray-400 to-zinc-200",
  },
  ROSE_GOLD: {
    label: "Rose Gold",
    textClass: "bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(244,63,94,0.3)]",
    bgClass: "from-rose-200 via-rose-400 to-amber-200",
  },
  BLIND_DEBOSS: {
    label: "Blind Deboss (Raw)",
    textClass: "text-neutral-900 font-bold drop-shadow-[inset_0_2px_3px_rgba(0,0,0,0.8)] [text-shadow:_0_1px_1px_rgba(255,255,255,0.08)]",
    bgClass: "from-neutral-800 to-neutral-900",
  },
};

const FONT_CLASSES: Record<MonogramFont, string> = {
  SERIF_ROMAN: "font-serif tracking-[0.25em]",
  BAUHAUS_SANS: "font-sans font-black tracking-[0.35em]",
  MODERN_SCRIPT: "italic font-serif tracking-[0.15em]",
};

export function MonogramStudio({ productName = "Leather Creation", onApply, className = "" }: MonogramStudioProps) {
  const [initials, setInitials] = useState<string>("LR");
  const [foil, setFoil] = useState<FoilFinish>("GOLD_LEAF");
  const [font, setFont] = useState<MonogramFont>("SERIF_ROMAN");
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
    setInitials(val);
    setConfirmed(false);
  };

  const handleApply = () => {
    setConfirmed(true);
    if (onApply) {
      onApply({ text: initials, foil, font });
    }
  };

  return (
    <div className={`rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80">Atelier Raw</span>
          <h3 className="text-sm font-serif uppercase tracking-widest text-neutral-100">Bespoke Monogramming Studio</h3>
        </div>
        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-300">
          Complimentary
        </span>
      </div>

      <p className="mt-2 text-xs text-neutral-400">
        Personalize your {productName} with hot-stamp foil debossing crafted by our master Parisian leather artisans.
      </p>

      {/* Live Preview Canvas */}
      <div className="relative my-6 flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-800/80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black p-4 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
        <div className="relative text-center">
          <div className={`text-4xl md:text-5xl select-none transition-all duration-300 ${FONT_CLASSES[font]} ${FOIL_STYLES[foil].textClass}`}>
            {initials || "••"}
          </div>
          <span className="mt-2 block text-[9px] font-mono tracking-widest uppercase text-neutral-500">
            {FOIL_STYLES[foil].label} &bull; Hand-Pressed
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 text-xs">
        <div>
          <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1">
            Initials (Max 4 Characters)
          </label>
          <input
            type="text"
            value={initials}
            onChange={handleInitialsChange}
            placeholder="e.g. LR"
            maxLength={4}
            className="w-full rounded-md border border-neutral-800 bg-neutral-900/90 px-3 py-2 text-center font-mono text-base uppercase tracking-widest text-white focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1">
            Foil Stamping Finish
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(FOIL_STYLES) as FoilFinish[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => { setFoil(f); setConfirmed(false); }}
                className={`flex flex-col items-center gap-1 rounded-md border p-2 text-[10px] transition-all ${
                  foil === f
                    ? "border-amber-400/80 bg-neutral-900 text-white shadow-sm"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${FOIL_STYLES[f].bgClass}`} />
                <span className="truncate">{FOIL_STYLES[f].label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1">
            Typography Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["SERIF_ROMAN", "BAUHAUS_SANS", "MODERN_SCRIPT"] as MonogramFont[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => { setFont(f); setConfirmed(false); }}
                className={`rounded-md border p-2 text-center text-[10px] uppercase tracking-wider transition-all ${
                  font === f
                    ? "border-amber-400/80 bg-neutral-900 text-white"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          disabled={!initials}
          className="w-full mt-2 rounded-md bg-neutral-100 py-2.5 text-xs font-serif uppercase tracking-widest text-neutral-950 font-semibold transition hover:bg-white disabled:opacity-50"
        >
          {confirmed ? "✓ Monogram Saved to Atelier" : "Apply Bespoke Monogram"}
        </button>
      </div>
    </div>
  );
}
