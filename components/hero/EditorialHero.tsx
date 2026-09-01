"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";

interface EditorialHeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  title = "THE RAW ARCHITECTURE OF FORM",
  subtitle = "AUTUMN / WINTER 2026",
  image = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  ctaText = "DISCOVER COLLECTION",
  ctaLink = "/collections/autumn-winter-2026",
}) => {
  return (
    <div className="relative h-[92vh] sm:h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with subtle cinematic zoom animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-scale-subtle brightness-75 scale-105"
        />
        {/* Soft Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/30 to-black/60" />
      </div>

      {/* Content Center */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center space-y-6 animate-fade-up">
        {/* Monograph Badge */}
        <div className="inline-flex items-center gap-2 border border-white/20 backdrop-blur-md px-4 py-1 text-[10px] sm:text-[11px] font-editorial-caps tracking-[0.3em] text-[#f4f3ef]/90">
          <Sparkles className="w-3 h-3 text-[#b59a6d]" />
          <span>{subtitle}</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f4f3ef] font-light tracking-tight max-w-4xl leading-[1.15]">
          {title}
        </h1>

        <p className="text-xs sm:text-sm font-light text-[#d4d4d8] max-w-xl leading-relaxed tracking-wider">
          Monumental volume, virgin double-faced wools, and cold-molded bridle leathers sculpted by master artisans in Italy.
        </p>

        {/* Minimal Understated CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={ctaLink}
            className="group relative bg-[#f4f3ef] text-[#09090b] px-8 py-4 text-xs font-editorial-caps tracking-[0.25em] transition-all duration-500 hover:bg-[#b59a6d] hover:text-[#09090b] flex items-center gap-2"
          >
            <span>{ctaText}</span>
          </Link>
          <Link
            href="/journal/the-art-of-raw-craftsmanship"
            className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 text-xs font-editorial-caps tracking-[0.25em] transition-colors hover:border-white hover:bg-white/10"
          >
            READ ATELIER CHRONICLE
          </Link>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 z-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[9px] font-editorial-caps tracking-widest">SCROLL TO DISCOVER</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </div>
  );
};
