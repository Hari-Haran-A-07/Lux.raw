"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { Product } from "@/lib/types";

interface ProductCatalogViewProps {
  initialProducts: Product[];
  categories: { id: string; name: string; slug: string }[];
  initialCategory?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: string;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  initialProducts,
  categories,
  initialCategory = "ALL",
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [gridCols, setGridCols] = useState<2 | 4>(4);

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by Category
    if (selectedCategory !== "ALL") {
      list = list.filter(
        (p) =>
          p.category?.slug === selectedCategory ||
          p.categoryId === selectedCategory
      );
    }

    // Filter by Price Range
    if (selectedPriceRange !== "ALL") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    // Sorting
    if (selectedSort === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "newest") {
      list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    } else if (selectedSort === "featured") {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [initialProducts, selectedCategory, selectedPriceRange, selectedSort]);

  return (
    <div>
      {/* Editorial Header Banner */}
      {heroTitle && (
        <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-[#27272a]/60 bg-[#0c0c0e]">
          {heroImage && (
            <div className="absolute inset-0 opacity-20 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={heroTitle}
                className="w-full h-full object-cover filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
            </div>
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {heroSubtitle && (
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em] block">
                {heroSubtitle}
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f4f3ef] font-light max-w-3xl mx-auto leading-tight">
              {heroTitle}
            </h1>
            {heroDescription && (
              <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
                {heroDescription}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Filter Control Bar */}
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={setSelectedPriceRange}
        gridCols={gridCols}
        onToggleGrid={setGridCols}
        totalResults={filteredProducts.length}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <h3 className="font-serif text-xl text-[#f4f3ef] font-light">
              No creations matching the selected criteria
            </h3>
            <p className="text-xs text-[#71717a]">
              Please reset your filters to discover other pieces from the maison.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedPriceRange("ALL");
              }}
              className="mt-2 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps px-6 py-2.5 hover:bg-[#b59a6d] transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-x-6 gap-y-12 ${
              gridCols === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
