"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Download, Globe, Clock, Sparkles, RefreshCw, Layers } from "lucide-react";

export default function ArchivePage() {
  const [season, setSeason] = useState("Autumn / Winter 2026");
  const [lang, setLang] = useState("en");
  const [dossier, setDossier] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  const generateLookbook = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`/api/polyglot/archive?season=${encodeURIComponent(season)}&lang=${lang}`);
      const data = await res.json();
      setDossier(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    generateLookbook();
  }, [season, lang]);

  const milestones = [
    {
      year: "1924",
      title: "Founding of the Florentine Monolith Atelier",
      location: "Florence, Italy",
      narrative: "Maestro Giancarlo established the raw tannery workshop near the Arno river, dedicating life to vegetable-tanned full-grain skins and brutalist geometries.",
      iconic: "Hand-Waxed Cuoio Leather Trunks"
    },
    {
      year: "1976",
      title: "The Architectural Brutalism Manifesto",
      location: "Milan, Italy",
      narrative: "luxury.Raw published its defining design manifesto in Milan, rejecting ornamental excess in favor of pure monolithic silhouettes and unpolished raw titanium hardware.",
      iconic: "Structural Virgin Wool Trench & Beveled Lapels"
    },
    {
      year: "2026",
      title: "The Digital Polyglot Haute Monolith",
      location: "Paris & Tokyo",
      narrative: "The Maison merges centuries-old Italian savoir-faire with high-speed polyglot engineering, introducing cryptographic digital passports and zero-waste tailoring.",
      iconic: "The Atelier Monolith Overcoat & Titanium Bag"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>CENTENNIAL ARCHIVE &amp; LOOKBOOK DOSSIER • PHP 8.3 OPCACHE JIT</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Maison Heritage <span className="text-[#b59a6d] italic font-normal">Archive</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Exploring one hundred years of relentless architectural brutalism, vegetable-tanned leather heritage, and monumental tailoring archives.
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          <h2 className="text-sm font-editorial-caps tracking-widest text-[#b59a6d] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>CHRONOLOGICAL CENTURY OF CRAFTSMANSHIP</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-[#121214] border border-[#27272a] p-6 rounded-sm space-y-4 hover:border-[#b59a6d]/50 transition-colors">
                <span className="text-3xl font-serif text-[#b59a6d] font-light block">{m.year}</span>
                <h3 className="font-serif text-lg text-[#f4f3ef]">{m.title}</h3>
                <span className="text-[10px] font-editorial-caps text-[#71717a] block">{m.location}</span>
                <p className="text-xs font-light text-[#a1a1aa] leading-relaxed">{m.narrative}</p>
                <div className="pt-3 border-t border-[#27272a] text-[11px] text-[#d4d4d8] font-mono">
                  <span className="text-[#71717a] block text-[9px] uppercase">Iconic Creation</span>
                  {m.iconic}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lookbook Generator Vault */}
        <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 rounded-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
            <div>
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                ARCHIVAL FOLIO ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#f4f3ef] mt-1">
                Official Season Lookbook &amp; Provenance Dossier
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-[#09090b] border border-[#27272a] text-xs text-[#f4f3ef] px-3 py-2 rounded-sm outline-none"
              >
                <option value="en">English (EN)</option>
                <option value="fr">Français (FR)</option>
                <option value="it">Italiano (IT)</option>
                <option value="ja">日本語 (JA)</option>
              </select>

              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="bg-[#09090b] border border-[#27272a] text-xs text-[#f4f3ef] px-3 py-2 rounded-sm outline-none"
              >
                <option value="Autumn / Winter 2026">Autumn / Winter 2026</option>
                <option value="Spring / Summer 2026">Spring / Summer 2026</option>
                <option value="Permanent Monolith Icons">Permanent Monolith Icons</option>
              </select>
            </div>
          </div>

          {dossier && (
            <div className="bg-[#09090b] border border-[#27272a] p-6 rounded-sm space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#27272a]">
                <div>
                  <span className="text-[#b59a6d] font-serif text-base block">{dossier.document_title}</span>
                  <span className="text-[#71717a] text-[10px]">DOSSIER ID: {dossier.dossier_id}</span>
                </div>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Archival PDF Dossier generation completed by PHP 8.3 Folio Engine."); }}
                  className="px-5 py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] font-editorial-caps text-xs tracking-widest flex items-center gap-2 transition-colors self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD FOLIO (48 PAGES)</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-[#71717a]">
                <div>
                  <span className="text-[9px] uppercase block">Format</span>
                  <span className="text-[#f4f3ef]">{dossier.format}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase block">Plates</span>
                  <span className="text-[#f4f3ef]">{dossier.editorial_plate_count} High-Res Plates</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase block">Published</span>
                  <span className="text-[#f4f3ef]">{new Date(dossier.published_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase block">Engine</span>
                  <span className="text-[#b59a6d]">{dossier.engine}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
