"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useUI } from "@/lib/store/uiStore";
import { formatCurrency } from "@/lib/utils";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    products: any[];
    categories: any[];
    collections: any[];
    stories: any[];
  }>({
    products: [],
    categories: [],
    collections: [],
    stories: [],
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults({ products: [], categories: [], collections: [], stories: [] });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults({ products: [], categories: [], collections: [], stories: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search fetch error", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#09090b]/98 backdrop-blur-2xl text-[#f4f3ef] animate-fade-in flex flex-col justify-between">
      {/* Top bar with Close */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex items-center justify-between border-b border-[#27272a]">
        <span className="font-serif tracking-[0.25em] text-lg uppercase font-light">
          luxury.<span className="italic text-[#b59a6d]">Raw</span>
        </span>
        <button
          onClick={closeSearch}
          aria-label="Close search"
          className="p-2 text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-2 text-xs font-editorial-caps"
        >
          <span>CLOSE [ESC]</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Search Input */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 flex-1">
        <div className="relative border-b-2 border-[#3f3f46] focus-within:border-[#b59a6d] transition-colors pb-4">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#b59a6d]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to explore? (e.g. Cashmere, Handbag, Greatcoat...)"
              className="w-full bg-transparent text-xl sm:text-3xl font-light text-[#f4f3ef] placeholder-[#52525b] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-[#71717a] hover:text-white font-editorial-caps"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Popular Suggestions if no query */}
        {!query && (
          <div className="mt-12 space-y-6">
            <h4 className="text-[11px] font-editorial-caps text-[#71717a]">
              SUGGESTED DISCOVERIES
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                "The Monolith Trapeze Bag",
                "Double-Faced Cashmere Coat",
                "Autumn / Winter 2026",
                "Mulberry Silk Foulard",
                "Vegetable Tanned Saddlery",
                "Lost-Wax Bronze Cuffs",
                "Goodyear Chelsea Boots",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-[#18181b] border border-[#27272a] px-4 py-2 text-xs text-[#d4d4d8] hover:border-[#b59a6d] hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="py-12 flex items-center justify-center text-xs font-editorial-caps text-[#b59a6d] gap-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>CONSULTING MAISON ARCHIVES...</span>
          </div>
        )}

        {/* Search Results Display */}
        {!loading && query && (
          <div className="mt-12 space-y-12 pb-16">
            {/* Products Results */}
            {results.products.length > 0 && (
              <div>
                <h4 className="text-xs font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2 mb-6">
                  PRODUCTS ({results.products.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={closeSearch}
                      className="group block bg-[#121214] p-2 border border-[#27272a]/50 hover:border-[#b59a6d]/50 transition-colors"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181b]">
                        <Image
                          src={p.images[0]?.url || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-3">
                        <span className="text-[9px] font-editorial-caps text-[#71717a]">{p.category?.name}</span>
                        <h5 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors truncate">
                          {p.name}
                        </h5>
                        <p className="text-xs text-[#d4d4d8] mt-0.5">{formatCurrency(p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories & Collections Matches */}
            {(results.categories.length > 0 || results.collections.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.categories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2 mb-4">
                      COLLECTIONS & METIERS
                    </h4>
                    <ul className="space-y-3">
                      {results.categories.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/women/${c.slug}`}
                            onClick={closeSearch}
                            className="flex items-center justify-between text-sm hover:text-[#b59a6d] transition-colors py-1 group"
                          >
                            <span>{c.name}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.stories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-editorial-caps text-[#b59a6d] border-b border-[#27272a] pb-2 mb-4">
                      JOURNAL CHRONICLES
                    </h4>
                    <ul className="space-y-3">
                      {results.stories.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/journal/${s.slug}`}
                            onClick={closeSearch}
                            className="block group"
                          >
                            <h6 className="text-sm font-serif group-hover:text-[#b59a6d] transition-colors">
                              {s.title}
                            </h6>
                            <p className="text-xs text-[#71717a] line-clamp-1">{s.excerpt}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* No matches */}
            {results.products.length === 0 &&
              results.categories.length === 0 &&
              results.collections.length === 0 &&
              results.stories.length === 0 && (
                <div className="text-center py-12 space-y-3">
                  <p className="font-serif text-lg text-[#a1a1aa]">
                    No creations found matching &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-[#71717a]">
                    Please refine your search query or explore our full collections catalogue.
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeSearch}
                    className="inline-block mt-4 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps px-6 py-2.5 hover:bg-[#b59a6d] transition-colors"
                  >
                    EXPLORE ALL COLLECTIONS
                  </Link>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};
