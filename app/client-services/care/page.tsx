import React from "react";
import { Sparkles, Shield, Droplets, Sun, Wind } from "lucide-react";

export const metadata = {
  title: "Atelier Care & Material Preservation — luxury.Raw",
};

export default function CarePage() {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            LIFETIME PRESERVATION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4f3ef] font-light">
            Artisanal Care & Maintenance Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Preserving the raw integrity of full-grain vegetable-tanned leathers, virgin Mongolian cashmere, and solid lost-wax bronze.
          </p>
        </div>

        <div className="space-y-10 bg-[#111114] border border-[#27272a] p-8 text-xs font-light leading-relaxed text-[#d4d4d8]">
          {/* Section 1: Tuscan Leather */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-normal flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#b59a6d]" />
              <span>Full-Grain Tuscan Saddlery Leather</span>
            </h3>
            <p>
              Our leathers are vegetable-tanned with natural barks and left without synthetic plastic sealants. To preserve their luster:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 text-[#a1a1aa]">
              <li>Protect from prolonged rain and intense direct midday sunlight.</li>
              <li>Should the leather become wet, pat gently with a dry microfiber cloth and allow to air dry naturally away from radiators.</li>
              <li>Apply natural beeswax or organic lanolin leather balsam once or twice yearly.</li>
            </ul>
          </div>

          {/* Section 2: Cashmere */}
          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-normal flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#b59a6d]" />
              <span>Grade-A Biella Double-Faced Cashmere</span>
            </h3>
            <p>
              Cashmere is a living natural fiber that thrives on ventilation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 text-[#a1a1aa]">
              <li>Allow coats to rest for 24 hours between wearings on wide wooden hangers.</li>
              <li>Specialist dry cleaning only. Never machine wash or tumble dry.</li>
              <li>Store with cedar blocks or natural lavender sachets during summer dormancy.</li>
            </ul>
          </div>

          {/* Section 3: Fine Jewelry */}
          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-normal flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#b59a6d]" />
              <span>Solid 925 Sterling Silver & Lost-Wax Bronze Vermeil</span>
            </h3>
            <p>
              Avoid direct exposure to chlorine, sulfur springs, and alcohol-based perfumes. Polish with a gentle jewelers cloth to preserve the sculptural satin finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
