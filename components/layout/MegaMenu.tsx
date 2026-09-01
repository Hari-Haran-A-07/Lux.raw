"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface MegaMenuProps {
  category: "WOMEN" | "MEN" | "COLLECTIONS" | "JOURNAL";
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  if (category === "WOMEN") {
    return (
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-[#27272a] shadow-2xl py-12 px-8 lg:px-16 text-[#f4f3ef] z-40 transition-all duration-300 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Column 1: Curations */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[11px] font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2">
              HIGHLIGHTS
            </h4>
            <ul className="space-y-3 text-[13px] font-light tracking-wide text-[#d4d4d8]">
              <li>
                <Link
                  href="/women?newArrival=true"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/women?bestseller=true"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Maison Icons & Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/autumn-winter-2026"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Autumn / Winter 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/atelier-silk-cashmere"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Atelier Silk & Cashmere
                </Link>
              </li>
              <li>
                <Link
                  href="/women?featured=true"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  The Monolith Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[11px] font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2">
              METIERS
            </h4>
            <ul className="space-y-3 text-[13px] font-light tracking-wide text-[#d4d4d8]">
              <li>
                <Link
                  href="/women/womens-handbags"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Leather Goods & Handbags
                </Link>
              </li>
              <li>
                <Link
                  href="/women/womens-clothing"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Ready-to-Wear & Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/women/womens-shoes"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Footwear & Mules
                </Link>
              </li>
              <li>
                <Link
                  href="/women/jewelry-objects"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Sculptural Jewelry & Objets
                </Link>
              </li>
              <li>
                <Link
                  href="/women/accessories-silk"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Silk Foulards & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 & 4: Editorial Showcases */}
          <div className="col-span-3">
            <Link
              href="/products/the-monolith-trapeze-bag"
              onClick={onClose}
              className="group block relative overflow-hidden bg-[#18181b]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
                  alt="The Monolith Trapeze Bag"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">MAISON ICON</span>
                <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                  The Monolith Trapeze Bag
                </h5>
                <p className="text-xs text-[#a1a1aa] mt-0.5">$3,450</p>
              </div>
            </Link>
          </div>

          <div className="col-span-3">
            <Link
              href="/collections/autumn-winter-2026"
              onClick={onClose}
              className="group block relative overflow-hidden bg-[#18181b]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
                  alt="Autumn Winter 2026 Collection"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">CAMPAIGN</span>
                <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors flex items-center gap-1.5">
                  Autumn / Winter 2026 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </h5>
                <p className="text-xs text-[#a1a1aa] mt-0.5">Explore the runway monograph</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (category === "MEN") {
    return (
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-[#27272a] shadow-2xl py-12 px-8 lg:px-16 text-[#f4f3ef] z-40 transition-all duration-300 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Column 1: Highlights */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[11px] font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2">
              HIGHLIGHTS
            </h4>
            <ul className="space-y-3 text-[13px] font-light tracking-wide text-[#d4d4d8]">
              <li>
                <Link
                  href="/men?newArrival=true"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/autumn-winter-2026"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  AW26 Monumental Tailoring
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/equestrian-raw-leather"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Equestrian Raw Leather
                </Link>
              </li>
              <li>
                <Link
                  href="/men?bestseller=true"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Permanent Icons
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Metiers */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[11px] font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2">
              CATEGORIES
            </h4>
            <ul className="space-y-3 text-[13px] font-light tracking-wide text-[#d4d4d8]">
              <li>
                <Link
                  href="/men/mens-clothing"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Greatcoats, Blazers & Knitwear
                </Link>
              </li>
              <li>
                <Link
                  href="/men/mens-bags"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Weekenders, Briefcases & Totes
                </Link>
              </li>
              <li>
                <Link
                  href="/men/mens-shoes"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Goodyear Boots & Derbies
                </Link>
              </li>
              <li>
                <Link
                  href="/men/jewelry-objects"
                  onClick={onClose}
                  className="hover:text-[#b59a6d] hover:translate-x-1 transition-all inline-block"
                >
                  Solid Silver Rings & Cuffs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 & 4: Visual Showcases */}
          <div className="col-span-3">
            <Link
              href="/products/the-monumental-raw-wool-greatcoat"
              onClick={onClose}
              className="group block relative overflow-hidden bg-[#18181b]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                  alt="Monumental Raw Wool Greatcoat"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">GREATCOAT</span>
                <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                  The Monumental Greatcoat
                </h5>
                <p className="text-xs text-[#a1a1aa] mt-0.5">$4,400</p>
              </div>
            </Link>
          </div>

          <div className="col-span-3">
            <Link
              href="/products/the-atelier-48-hour-raw-leather-duffle"
              onClick={onClose}
              className="group block relative overflow-hidden bg-[#18181b]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
                  alt="The Atelier 48-Hour Duffle"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">LEATHER TRAVEL</span>
                <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                  Atelier 48-Hour Duffle
                </h5>
                <p className="text-xs text-[#a1a1aa] mt-0.5">$3,850</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (category === "COLLECTIONS") {
    return (
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-[#27272a] shadow-2xl py-12 px-8 lg:px-16 text-[#f4f3ef] z-40 transition-all duration-300 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
          <Link
            href="/collections/autumn-winter-2026"
            onClick={onClose}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#18181b]">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                alt="Autumn Winter 2026"
                fill
                className="object-cover luxury-image-zoom brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-editorial-caps text-[#b59a6d]">AW 2026</span>
                <h4 className="font-serif text-lg text-white group-hover:text-[#b59a6d] transition-colors">
                  The Raw Architecture
                </h4>
              </div>
            </div>
          </Link>

          <Link
            href="/collections/sculptural-monolith"
            onClick={onClose}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#18181b]">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
                alt="Sculptural Monolith"
                fill
                className="object-cover luxury-image-zoom brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-editorial-caps text-[#b59a6d]">PERMANENT</span>
                <h4 className="font-serif text-lg text-white group-hover:text-[#b59a6d] transition-colors">
                  Sculptural Monolith
                </h4>
              </div>
            </div>
          </Link>

          <Link
            href="/collections/atelier-silk-cashmere"
            onClick={onClose}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#18181b]">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop"
                alt="Atelier Silk & Cashmere"
                fill
                className="object-cover luxury-image-zoom brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-editorial-caps text-[#b59a6d]">CAPSULE</span>
                <h4 className="font-serif text-lg text-white group-hover:text-[#b59a6d] transition-colors">
                  Silk & Pure Cashmere
                </h4>
              </div>
            </div>
          </Link>

          <Link
            href="/collections/equestrian-raw-leather"
            onClick={onClose}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#18181b]">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
                alt="Equestrian Raw Leather"
                fill
                className="object-cover luxury-image-zoom brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-editorial-caps text-[#b59a6d]">HERITAGE</span>
                <h4 className="font-serif text-lg text-white group-hover:text-[#b59a6d] transition-colors">
                  Equestrian Saddlery
                </h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "JOURNAL") {
    return (
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-[#27272a] shadow-2xl py-12 px-8 lg:px-16 text-[#f4f3ef] z-40 transition-all duration-300 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-4">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d]">MAISON CHRONICLES</span>
            <h3 className="font-serif text-2xl text-[#f4f3ef] font-light leading-snug">
              The Digital Gazette & Atelier Stories
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">
              Explorations into the alchemy of Tuscan tanneries, Biella cashmere mills, and brutalist fashion philosophy.
            </p>
            <Link
              href="/journal"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-editorial-caps text-[#b59a6d] hover:text-white transition-colors pt-2"
            >
              VIEW ALL CHRONICLES <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="col-span-4">
            <Link
              href="/journal/the-art-of-raw-craftsmanship"
              onClick={onClose}
              className="group block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181b] mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                  alt="The Raw Geometry of Form"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <span className="text-[9px] font-editorial-caps text-[#b59a6d]">ARTISANSHIP</span>
              <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors mt-0.5">
                The Raw Geometry of Form: An Atelier Chronicle
              </h5>
            </Link>
          </div>

          <div className="col-span-4">
            <Link
              href="/journal/monumental-wool-and-biella-cashmere"
              onClick={onClose}
              className="group block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181b] mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop"
                  alt="Tactile Monoliths"
                  fill
                  className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                />
              </div>
              <span className="text-[9px] font-editorial-caps text-[#b59a6d]">MATERIALS</span>
              <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors mt-0.5">
                Tactile Monoliths: The Alchemy of Biella Cashmere
              </h5>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
