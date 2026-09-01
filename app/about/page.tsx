import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Shield, Compass, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Maison Heritage & Philosophy — luxury.Raw",
  description: "Explore the architectural philosophy, unhurried Florentine leathercraft, and Biella cashmere traditions of luxury.Raw.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      {/* 1. Hero Monograph */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-20 sm:mb-28">
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
          THE MAISON ARCHITECTURE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#f4f3ef] font-light max-w-4xl mx-auto leading-tight">
          The Architecture of Quiet Luxury
        </h1>
        <p className="text-xs sm:text-base text-[#a1a1aa] font-light max-w-2xl mx-auto leading-relaxed">
          Founded on the conviction that true luxury exists at the intersection of monumental sculptural form and untamed Italian material truth.
        </p>
      </section>

      {/* 2. Full-Bleed Editorial Banner */}
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-[#141416] mb-24 border-y border-[#27272a]/60">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
          alt="luxury.Raw Atelier"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
      </div>

      {/* 3. The 4 Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Pillar 1: Form & Reduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d]">PILLAR I</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Monumental Brutalism & Radical Reduction
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              We reject transient ornamentation, overt hardware, and plastic coatings. Each garment and leather object is conceived as an architectural monument: defined by sharp silhouettes, suppressed seams, and raw volumetric weight that interacts with light.
            </p>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              By removing surface distraction, the wearer experiences the visceral purity of the garment.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141416] border border-[#27272a]">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
                alt="Architectural silhouette"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillar 2: Tuscan Tanning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d]">PILLAR II</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Arno Valley Slow Vegetable Tanning
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              In our partner tanneries along the Arno river in Tuscany, hides mature for sixty days in oak vats steeped in chestnut bark tannins, mimosa extracts, and pure river water.
            </p>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              Unlike chrome-tanned industrial leathers that degrade over time, our full-grain saddle leathers breathe and develop an exquisite amber patina that deepens with every journey.
            </p>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141416] border border-[#27272a]">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
                alt="Tuscan Leather Craft"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillar 3: Biella Cashmere & Alpine Purity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d]">PILLAR III</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Biella Cashmere & Double-Faced Sartorialism
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              Woven in the historic textile capital of Biella, our Grade-A Mongolian cashmere is washed in low-mineral glacial alpine water, allowing fibers to blossom to maximum softness.
            </p>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              Each double-faced greatcoat is unlined and finished with over twelve hours of invisible hand-split seam stitching by master Milanese tailors.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141416] border border-[#27272a]">
              <Image
                src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop"
                alt="Cashmere Tailoring"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Sustainability & Traceability */}
        <div id="sustainability" className="p-8 sm:p-16 bg-[#111114] border border-[#27272a] text-center space-y-6">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
            MAISON COMMITMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            Permanence as the Ultimate Sustainability
          </h2>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-2xl mx-auto leading-relaxed">
            The most sustainable product is one crafted so uncompromisingly that it never enters a landfill. Every luxury.Raw creation is backed by lifetime repair privileges, registered artisan provenance, and zero plastic packaging.
          </p>
          <div className="pt-4">
            <Link
              href="/stores"
              className="inline-block bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
            >
              VISIT OUR FLAGSHIP BOUTIQUES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
