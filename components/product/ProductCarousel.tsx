"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-b border-[#27272a]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            {subtitle && (
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f4f3ef] font-light">
                {title}
              </h2>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {viewAllLink && (
              <a
                href={viewAllLink}
                className="hidden sm:inline-block text-xs font-editorial-caps text-[#a1a1aa] hover:text-white transition-colors mr-4"
              >
                VIEW ALL
              </a>
            )}
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#b59a6d] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#b59a6d] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
