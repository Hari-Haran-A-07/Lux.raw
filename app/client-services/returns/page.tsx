import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Exchanges & Returns — luxury.Raw",
};

export default function ReturnsPage() {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            MAISON COURTESY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4f3ef] font-light">
            Exchanges & Returns Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            We offer complimentary returns and exchanges within 30 days of receiving your acquisition.
          </p>
        </div>

        <div className="space-y-8 bg-[#111114] border border-[#27272a] p-8 text-xs font-light leading-relaxed text-[#d4d4d8]">
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-normal flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#b59a6d]" />
              <span>30-Day Maison Return Guarantee</span>
            </h3>
            <p>
              If a creation does not meet your discerning standards, you may initiate a complimentary return or size exchange within 30 calendar days of delivery.
            </p>
          </div>

          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h4 className="font-editorial-caps text-xs text-[#b59a6d]">RETURN CONDITIONS</h4>
            <ul className="space-y-2 list-disc pl-5 text-[#a1a1aa]">
              <li>Items must be unworn, undamaged, and in pristine original condition.</li>
              <li>All original packaging, security seals, dust bags, and certificates must be intact.</li>
              <li>Made-to-Measure or bespoke personalized monogrammed creations are non-refundable.</li>
            </ul>
          </div>

          <div className="border-t border-[#27272a] pt-6 space-y-3">
            <h4 className="font-editorial-caps text-xs text-[#b59a6d]">HOW TO INITIATE A RETURN</h4>
            <p>
              Log in to your <Link href="/account/orders" className="text-[#b59a6d] underline">Client Portal</Link> or contact your dedicated concierge advisor at <strong className="text-white">concierge@luxuryraw.com</strong>. A courier pickup will be scheduled at your residence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
