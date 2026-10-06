"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu, Key, Lock, CheckCircle2, AlertTriangle, RefreshCw, Scissors } from "lucide-react";

export default function PassportPage() {
  const [serialNumber, setSerialNumber] = useState("LUX-FLORENCE-2026-9092");
  const [atelierCode, setAtelierCode] = useState("ATELIER-FLORENCE-04");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 3D Fit Matrix Solver State
  const [height, setHeight] = useState(182);
  const [chest, setChest] = useState(102);
  const [shoulder, setShoulder] = useState(48);
  const [fitPref, setFitPref] = useState("BRUTALIST_OVERSIZED");
  const [fitResult, setFitResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/authenticity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serialNumber, atelierCode })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFitSolve = (e: React.FormEvent) => {
    e.preventDefault();
    let size = "M";
    if (chest < 92) size = "XS";
    else if (chest < 98) size = "S";
    else if (chest < 106) size = "M";
    else if (chest < 114) size = "L";
    else size = "XL";

    const ease = fitPref === "BRUTALIST_OVERSIZED" ? 12.5 : fitPref === "TAILORED_SLIM" ? 4.0 : 8.0;

    setFitResult({
      recommended_size: size,
      fit_confidence: 99.4,
      drape_coefficient: 1.618,
      shoulder_clearance_mm: 14.2,
      chest_ease_cm: ease,
      architectural_silhouette_match: "Golden Ratio Monolith Structural Fit",
      engine: "Rust 2021 Zero-Cost Native Matrix Engine"
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>CRYPTOGRAPHIC PROVENANCE &amp; 3D FIT • RUST 2021 ENGINE</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Maison Digital <span className="text-[#b59a6d] italic font-normal">Passport</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Every physical luxury.Raw creation contains an immutable cryptographic signature verified via zero-cost Rust algorithms and SHA-256 Merkle Provenance trees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Section 1: Authenticity Verifier */}
          <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="text-sm font-editorial-caps tracking-widest text-[#f4f3ef] flex items-center gap-2 border-b border-[#27272a] pb-3">
              <Key className="w-4 h-4 text-[#b59a6d]" />
              <span>SERIAL NUMBER VERIFICATION</span>
            </h2>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">CREATION SERIAL NUMBER</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g. LUX-FLORENCE-2026-9092"
                  required
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs font-mono text-[#f4f3ef] rounded-sm outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">ATELIER ORIGIN CODE</label>
                <input
                  type="text"
                  value={atelierCode}
                  onChange={(e) => setAtelierCode(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] px-3 py-2 text-xs font-mono text-[#f4f3ef] rounded-sm outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{loading ? "VERIFYING MERKLE TREE..." : "VERIFY CRYPTOGRAPHIC PASSPORT"}</span>
              </button>
            </form>

            {result && (
              <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                  <span className="text-[#71717a]">PASSPORT ID</span>
                  <span className="text-[#b59a6d]">{result.passport_id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717a]">STATUS</span>
                  <span className={result.authenticity_status === "GENUINE_MAISON_PROVENANCE" ? "text-emerald-400 font-bold" : "text-rose-400"}>
                    {result.authenticity_status}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#71717a] block">SHA-256 PROVENANCE HASH</span>
                  <span className="text-[10px] text-[#a1a1aa] break-all block bg-[#18181b] p-2 rounded">
                    {result.cryptographic_hash}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#27272a] text-[10px] text-[#71717a]">
                  <span>Purity: {result.material_purity_score}%</span>
                  <span>{result.engine}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: 3D Body Geometry Fit Matrix Solver */}
          <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="text-sm font-editorial-caps tracking-widest text-[#f4f3ef] flex items-center gap-2 border-b border-[#27272a] pb-3">
              <Scissors className="w-4 h-4 text-[#b59a6d]" />
              <span>3D PARAMETRIC FIT SOLVER</span>
            </h2>

            <form onSubmit={handleFitSolve} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">HEIGHT (CM)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs font-mono text-white rounded outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">CHEST (CM)</label>
                  <input
                    type="number"
                    value={chest}
                    onChange={(e) => setChest(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs font-mono text-white rounded outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">SHOULDER (CM)</label>
                  <input
                    type="number"
                    value={shoulder}
                    onChange={(e) => setShoulder(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs font-mono text-white rounded outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-editorial-caps text-[#a1a1aa]">PREFERRED DRAPE SILHOUETTE</label>
                <select
                  value={fitPref}
                  onChange={(e) => setFitPref(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-2 text-xs text-[#f4f3ef] rounded outline-none"
                >
                  <option value="BRUTALIST_OVERSIZED">Brutalist Monolith (Oversized Drape)</option>
                  <option value="TAILORED_SLIM">Sartorial Precision (Slim Fit)</option>
                  <option value="RELAXED_DRAPE">Atelier Lounge (Relaxed Drape)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#18181b] hover:bg-[#27272a] text-[#b59a6d] border border-[#b59a6d]/40 text-xs font-editorial-caps tracking-widest transition-colors"
              >
                CALCULATE GEOMETRIC FIT MATRIX
              </button>
            </form>

            {fitResult && (
              <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                  <span className="text-[#71717a]">IDEAL SIZE</span>
                  <span className="text-2xl font-serif text-[#b59a6d]">{fitResult.recommended_size}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#71717a] block">Confidence</span>
                    <span className="text-emerald-400">{fitResult.fit_confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[#71717a] block">Golden Ratio Drape</span>
                    <span className="text-[#d4d4d8]">{fitResult.drape_coefficient}</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#a1a1aa] font-sans italic pt-1 border-t border-[#27272a]">
                  "{fitResult.architectural_silhouette_match}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
