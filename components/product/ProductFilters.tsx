"use client";

import React, { useState } from "react";
import { Filter, Grid, LayoutGrid, SlidersHorizontal, X } from "lucide-react";

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (range: string) => void;
  gridCols: 2 | 4;
  onToggleGrid: (cols: 2 | 4) => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  selectedPriceRange,
  onSelectPriceRange,
  gridCols,
  onToggleGrid,
  totalResults,
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <div className="border-y border-[#27272a]/60 bg-[#09090b] sticky top-[72px] z-30 py-3.5 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Filter Trigger & Quick Categories */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 text-xs font-editorial-caps text-[#f4f3ef] border border-[#27272a] px-3.5 py-1.5 hover:border-[#b59a6d] transition-colors flex-shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#b59a6d]" />
            <span>FILTERS</span>
          </button>

          {/* Quick Category Pills */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onSelectCategory("ALL")}
              className={`text-xs px-3 py-1 font-editorial-caps transition-colors ${
                selectedCategory === "ALL"
                  ? "bg-[#f4f3ef] text-[#09090b]"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              ALL CREATIONS
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.slug)}
                className={`text-xs px-3 py-1 font-editorial-caps transition-colors ${
                  selectedCategory === c.slug
                    ? "bg-[#f4f3ef] text-[#09090b]"
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Results Count, Sort, Grid Switch */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden lg:inline text-xs font-editorial-caps text-[#71717a]">
            {totalResults} {totalResults === 1 ? "PIECE" : "CREATIONS"}
          </span>

          {/* Sort Dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-[#121214] border border-[#27272a] text-xs font-editorial-caps text-[#d4d4d8] py-1.5 px-3 focus:outline-none focus:border-[#b59a6d]"
          >
            <option value="featured">SORT: FEATURED</option>
            <option value="newest">SORT: NEW ARRIVALS</option>
            <option value="price_asc">PRICE: LOW TO HIGH</option>
            <option value="price_desc">PRICE: HIGH TO LOW</option>
          </select>

          {/* Grid Layout Switcher */}
          <div className="hidden sm:flex items-center border border-[#27272a]">
            <button
              onClick={() => onToggleGrid(2)}
              aria-label="2-column editorial grid"
              className={`p-1.5 ${
                gridCols === 2 ? "bg-[#27272a] text-white" : "text-[#71717a] hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleGrid(4)}
              aria-label="4-column catalog grid"
              className={`p-1.5 ${
                gridCols === 4 ? "bg-[#27272a] text-white" : "text-[#71717a] hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Side Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-sm bg-[#0d0d0f] border-r border-[#27272a] p-6 text-[#f4f3ef] flex flex-col justify-between animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                  <span className="font-editorial-caps text-xs tracking-widest text-[#b59a6d]">
                    REFINE SELECTION
                  </span>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 text-[#a1a1aa] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-editorial-caps text-xs text-[#d4d4d8] mb-3">METIER / CATEGORY</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        onSelectCategory("ALL");
                        setIsFilterDrawerOpen(false);
                      }}
                      className={`block text-xs text-left w-full py-1 ${
                        selectedCategory === "ALL" ? "text-[#b59a6d] font-medium" : "text-[#a1a1aa] hover:text-white"
                      }`}
                    >
                      All Creations
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCategory(c.slug);
                          setIsFilterDrawerOpen(false);
                        }}
                        className={`block text-xs text-left w-full py-1 ${
                          selectedCategory === c.slug ? "text-[#b59a6d] font-medium" : "text-[#a1a1aa] hover:text-white"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Bracket */}
                <div className="border-t border-[#27272a] pt-4">
                  <h4 className="font-editorial-caps text-xs text-[#d4d4d8] mb-3">PRICE BRACKET</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: "All Values", value: "ALL" },
                      { label: "Under $1,000", value: "0-1000" },
                      { label: "$1,000 – $2,500", value: "1000-2500" },
                      { label: "$2,500 – $4,000", value: "2500-4000" },
                      { label: "Over $4,000", value: "4000-999999" },
                    ].map((bracket) => (
                      <button
                        key={bracket.value}
                        onClick={() => {
                          onSelectPriceRange(bracket.value);
                          setIsFilterDrawerOpen(false);
                        }}
                        className={`block text-left w-full py-1 ${
                          selectedPriceRange === bracket.value ? "text-[#b59a6d] font-medium" : "text-[#a1a1aa] hover:text-white"
                        }`}
                      >
                        {bracket.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#27272a]">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-[#f4f3ef] text-[#09090b] py-3 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
                >
                  SHOW RESULTS ({totalResults})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
