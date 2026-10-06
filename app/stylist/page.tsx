"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Shield, Check, RefreshCw, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/lib/store/cartStore";

export default function StylistPage() {
  const [aesthetic, setAesthetic] = useState("Architectural Brutalism");
  const [occasion, setOccasion] = useState("Milan Fashion Week Gala");
  const [budget, setBudget] = useState("$5,000 - $15,000");
  const [loading, setLoading] = useState(false);
  const [curation, setCuration] = useState<any>(null);
  const { addItem, openCart } = useCart();

  const handleCurate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aesthetic, occasion, budget })
      });
      const data = await res.json();
      setCuration(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProductFromPiece = (piece: any) => ({
    id: piece.id,
    name: piece.name,
    slug: piece.slug || "sculptural-virgin-wool-overcoat",
    price: piece.price,
    sku: piece.id,
    description: piece.name,
    categoryId: "cat-couture",
    gender: "UNISEX",
    material: "100% Virgin Wool / Cashmere",
    color: piece.palette ? piece.palette[0] : "Obsidian Black",
    origin: "Made in Italy",
    featured: true,
    newArrival: false,
    bestseller: false,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [{ id: `img-${piece.id}`, productId: piece.id, url: piece.image, isPrimary: true, order: 0 }],
    variants: []
  });

  const addAllToBag = () => {
    if (!curation?.recommended_ensemble) return;
    curation.recommended_ensemble.forEach((piece: any) => {
      addItem(
        createProductFromPiece(piece) as any,
        "M",
        piece.palette ? piece.palette[0] : "Obsidian Black",
        undefined,
        1
      );
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest">
              AI NEURAL ATELIER • PYTHON 3.11 FASTAPI
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Haute Couture <span className="text-[#b59a6d] italic font-normal">AI Stylist</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Harnessing multi-dimensional vector embeddings and luxury silhouette harmony to synthesize bespoke sartorial ensembles calibrated to your architectural taste and event occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Panel */}
          <div className="lg:col-span-4 bg-[#121214] border border-[#27272a] p-6 sm:p-8 space-y-6 rounded-sm">
            <h2 className="text-sm font-editorial-caps tracking-widest text-[#f4f3ef] flex items-center gap-2 border-b border-[#27272a] pb-3">
              <Sparkles className="w-4 h-4 text-[#b59a6d]" />
              <span>CONSULTATION PARAMETERS</span>
            </h2>

            <form onSubmit={handleCurate} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">AESTHETIC SILHOUETTE</label>
                <select
                  value={aesthetic}
                  onChange={(e) => setAesthetic(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] text-xs text-[#f4f3ef] px-3 py-2.5 rounded-sm outline-none"
                >
                  <option value="Architectural Brutalism">Architectural Brutalism</option>
                  <option value="Minimalist Monolith">Minimalist Monolith</option>
                  <option value="Avant-Garde Evening">Avant-Garde Evening</option>
                  <option value="Sartorial Italian Modernism">Sartorial Italian Modernism</option>
                  <option value="Tactile Cashmere Solitude">Tactile Cashmere Solitude</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">EVENT / OCCASION</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] text-xs text-[#f4f3ef] px-3 py-2.5 rounded-sm outline-none"
                >
                  <option value="Milan Fashion Week Gala">Milan Fashion Week Gala</option>
                  <option value="Private Art Biennale Opening">Private Art Biennale Opening</option>
                  <option value="Executive Monolith Boardroom">Executive Monolith Boardroom</option>
                  <option value="Private Alpine Chalet Retreat">Private Alpine Chalet Retreat</option>
                  <option value="Haute Couture Runway Front Row">Haute Couture Runway Front Row</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-editorial-caps text-[#a1a1aa]">CAPSULE INVESTMENT BRACKET</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#b59a6d] text-xs text-[#f4f3ef] px-3 py-2.5 rounded-sm outline-none"
                >
                  <option value="$3,000 - $6,000">$3,000 - $6,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $35,000 (Haute Tier)">$15,000 - $35,000 (Haute Tier)</option>
                  <option value="Unlimited Maison Sovereign">Unlimited Maison Sovereign</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{loading ? "SYNTHESIZING SILHOUETTE..." : "CURATE BESPOKE ENSEMBLE"}</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#27272a] text-[10px] text-[#71717a] font-mono leading-relaxed space-y-1">
              <div>Engine: Python 3.11 LuxNeuro Transformer</div>
              <div>Vector Distance: Cosine Similarity 0.984</div>
              <div>Origin: luxury.Raw AI Laboratory</div>
            </div>
          </div>

          {/* Right Curation Output */}
          <div className="lg:col-span-8 space-y-6">
            {curation ? (
              <div className="bg-[#121214] border border-[#27272a] p-6 sm:p-8 space-y-8 rounded-sm animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
                  <div>
                    <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                      CURATED BESPOKE ENSEMBLE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#f4f3ef] mt-1">
                      {curation.aesthetic}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] font-light mt-1">
                      Calibrated for <span className="text-white">{curation.occasion}</span>
                    </p>
                  </div>

                  <button
                    onClick={addAllToBag}
                    className="px-5 py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center gap-2 transition-colors self-start sm:self-auto"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ACQUIRE COMPLETE LOOK (${curation.total_investment_usd?.toLocaleString()})</span>
                  </button>
                </div>

                {/* Editorial Critique */}
                <div className="bg-[#09090b] border-l-2 border-[#b59a6d] p-4 text-xs font-light text-[#d4d4d8] leading-relaxed italic">
                  "{curation.editorial_critique}"
                </div>

                {/* Curated Pieces Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {curation.recommended_ensemble?.map((piece: any, idx: number) => (
                    <div key={idx} className="bg-[#09090b] border border-[#27272a] p-4 flex gap-4 rounded-sm hover:border-[#b59a6d]/50 transition-colors">
                      <div className="w-20 h-24 relative bg-[#18181b] flex-shrink-0 overflow-hidden">
                        <Image
                          src={piece.image}
                          alt={piece.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1 text-xs">
                        <div>
                          <span className="text-[10px] font-editorial-caps text-[#b59a6d]">{piece.category}</span>
                          <h4 className="font-serif text-sm text-[#f4f3ef] mt-0.5 line-clamp-2">{piece.name}</h4>
                          <span className="text-[11px] text-[#71717a]">{piece.palette?.join(" / ")}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#27272a]/60">
                          <span className="font-mono text-[#f4f3ef]">${piece.price?.toLocaleString()}</span>
                          <button
                            onClick={() => {
                              addItem(
                                createProductFromPiece(piece) as any,
                                "M",
                                piece.palette ? piece.palette[0] : "Obsidian Black",
                                undefined,
                                1
                              );
                              openCart();
                            }}
                            className="text-[10px] font-editorial-caps text-[#b59a6d] hover:text-white transition-colors"
                          >
                            + ADD TO BAG
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Material & Confidence Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#27272a] text-xs font-mono text-[#71717a]">
                  <div>
                    <span className="text-[10px] text-[#a1a1aa] block uppercase">Silhouette Class</span>
                    <span className="text-[#f4f3ef]">{curation.silhouette_classification}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#a1a1aa] block uppercase">Neural Confidence</span>
                    <span className="text-emerald-400">{(curation.ai_confidence_index * 100).toFixed(1)}% Match</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#a1a1aa] block uppercase">Execution Core</span>
                    <span className="text-[#b59a6d]">Python 3.11 FastAPI</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#121214] border border-[#27272a] p-12 text-center space-y-4 rounded-sm flex flex-col items-center justify-center min-h-[420px]">
                <Sparkles className="w-8 h-8 text-[#b59a6d]/40" />
                <h3 className="font-serif text-lg text-[#f4f3ef]">Awaiting Consultation Input</h3>
                <p className="text-xs text-[#71717a] font-light max-w-md">
                  Select your aesthetic preferences and click "CURATE BESPOKE ENSEMBLE" to invoke the Python AI Neural Stylist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
