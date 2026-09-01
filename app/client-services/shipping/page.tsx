import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Globe, Clock, Package } from "lucide-react";

export const metadata = {
  title: "Complimentary White-Glove Delivery — luxury.Raw",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            MAISON LOGISTICS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4f3ef] font-light">
            White-Glove Worldwide Delivery
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Every luxury.Raw acquisition is dispatched via private dedicated couriers in custom protective raw-linen boxes.
          </p>
        </div>

        <div className="space-y-8 bg-[#111114] border border-[#27272a] p-8 text-xs font-light leading-relaxed text-[#d4d4d8]">
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-normal flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#b59a6d]" />
              <span>Complimentary Worldwide Express Transit</span>
            </h3>
            <p>
              We provide complimentary express delivery on all orders globally. Packages are insured for their full declared value and require a mandatory adult signature upon handover.
            </p>
          </div>

          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h4 className="font-editorial-caps text-xs text-[#b59a6d]">TRANSIT TIME ESTIMATES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#18181b] border border-[#27272a]">
                <strong className="block text-white">Europe & United Kingdom</strong>
                <p className="text-[#a1a1aa]">1–2 Business Days (Dedicated Air Courier)</p>
              </div>
              <div className="p-4 bg-[#18181b] border border-[#27272a]">
                <strong className="block text-white">United States & Canada</strong>
                <p className="text-[#a1a1aa]">2–3 Business Days (White-Glove Express)</p>
              </div>
              <div className="p-4 bg-[#18181b] border border-[#27272a]">
                <strong className="block text-white">Asia-Pacific & Middle East</strong>
                <p className="text-[#a1a1aa]">2–4 Business Days (Direct Priority)</p>
              </div>
              <div className="p-4 bg-[#18181b] border border-[#27272a]">
                <strong className="block text-white">Rest of World</strong>
                <p className="text-[#a1a1aa]">3–5 Business Days (Insured Courier)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h4 className="font-editorial-caps text-xs text-[#b59a6d]">MAISON SIGNATURE PACKAGING</h4>
            <p>
              Each piece is wrapped in unbleached Italian tissue, placed in an embossed archival linen box, and accompanied by an artisan-signed certificate of origin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
