"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronRight, ChevronDown, User, Heart, ShoppingBag, Search, Sparkles } from "lucide-react";
import { useUI } from "@/lib/store/uiStore";
import { useAuth } from "@/lib/store/authStore";
import { useCart } from "@/lib/store/cartStore";
import { useWishlist } from "@/lib/store/wishlistStore";

export const MobileNav: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUI();
  const { user } = useAuth();
  const { getTotalCount } = useCart();
  const { getCount: getWishlistCount } = useWishlist();

  const [expandedSection, setExpandedSection] = useState<string | null>("women");

  if (!isMobileMenuOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection((cur) => (cur === section ? null : section));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b] text-[#f4f3ef] flex flex-col justify-between overflow-y-auto animate-fade-in">
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between border-b border-[#27272a]">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="font-serif text-xl tracking-[0.25em] uppercase font-light text-white"
        >
          luxury.<span className="font-normal italic">Raw</span>
        </Link>
        <button
          onClick={closeMobileMenu}
          aria-label="Close navigation"
          className="p-2 text-[#a1a1aa] hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Search Shortcut */}
      <div className="px-6 pt-4">
        <button
          onClick={() => {
            closeMobileMenu();
            openSearch();
          }}
          className="w-full bg-[#18181b] border border-[#27272a] py-3 px-4 flex items-center gap-3 text-xs tracking-widest text-[#a1a1aa]"
        >
          <Search className="w-4 h-4 text-[#b59a6d]" />
          <span>SEARCH THE MAISON CATALOG...</span>
        </button>
      </div>

      {/* Navigation Links Accordions */}
      <div className="px-6 py-6 space-y-6 flex-1">
        {/* WOMEN */}
        <div className="border-b border-[#27272a]/70 pb-4">
          <button
            onClick={() => toggleSection("women")}
            className="w-full flex items-center justify-between font-editorial-caps text-sm tracking-widest py-2 text-left"
          >
            <span>WOMEN</span>
            {expandedSection === "women" ? (
              <ChevronDown className="w-4 h-4 text-[#b59a6d]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#71717a]" />
            )}
          </button>
          {expandedSection === "women" && (
            <ul className="mt-3 pl-3 space-y-3 text-sm font-light text-[#a1a1aa] animate-fade-in">
              <li>
                <Link
                  href="/women"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  All Women
                </Link>
              </li>
              <li>
                <Link
                  href="/women/womens-handbags"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Handbags & Leather Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/women/womens-clothing"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Ready-to-Wear & Coats
                </Link>
              </li>
              <li>
                <Link
                  href="/women/womens-shoes"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Shoes & Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/women/jewelry-objects"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Jewelry & Objets
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* MEN */}
        <div className="border-b border-[#27272a]/70 pb-4">
          <button
            onClick={() => toggleSection("men")}
            className="w-full flex items-center justify-between font-editorial-caps text-sm tracking-widest py-2 text-left"
          >
            <span>MEN</span>
            {expandedSection === "men" ? (
              <ChevronDown className="w-4 h-4 text-[#b59a6d]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#71717a]" />
            )}
          </button>
          {expandedSection === "men" && (
            <ul className="mt-3 pl-3 space-y-3 text-sm font-light text-[#a1a1aa] animate-fade-in">
              <li>
                <Link
                  href="/men"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  All Men
                </Link>
              </li>
              <li>
                <Link
                  href="/men/mens-clothing"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Tailoring & Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/men/mens-bags"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Leather Bags & Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/men/mens-shoes"
                  onClick={closeMobileMenu}
                  className="block hover:text-white transition-colors"
                >
                  Boots & Shoes
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* COLLECTIONS */}
        <div className="border-b border-[#27272a]/70 pb-4">
          <Link
            href="/collections"
            onClick={closeMobileMenu}
            className="block font-editorial-caps text-sm tracking-widest py-2"
          >
            COLLECTIONS
          </Link>
        </div>

        {/* JOURNAL */}
        <div className="border-b border-[#27272a]/70 pb-4">
          <Link
            href="/journal"
            onClick={closeMobileMenu}
            className="block font-editorial-caps text-sm tracking-widest py-2"
          >
            JOURNAL & STORIES
          </Link>
        </div>

        {/* ABOUT & STORES */}
        <div className="space-y-3 pt-2 text-xs font-editorial-caps text-[#71717a]">
          <Link
            href="/about"
            onClick={closeMobileMenu}
            className="block hover:text-white transition-colors"
          >
            THE MAISON HERITAGE
          </Link>
          <Link
            href="/stores"
            onClick={closeMobileMenu}
            className="block hover:text-white transition-colors"
          >
            STORE LOCATOR
          </Link>
          <Link
            href="/client-services/contact"
            onClick={closeMobileMenu}
            className="block hover:text-white transition-colors"
          >
            CLIENT CONCIERGE
          </Link>
        </div>
      </div>

      {/* Bottom Account & Shortcuts */}
      <div className="p-6 bg-[#121214] border-t border-[#27272a] grid grid-cols-3 gap-4 text-center">
        <Link
          href={user ? "/account" : "/account/login"}
          onClick={closeMobileMenu}
          className="flex flex-col items-center gap-1.5 text-[#a1a1aa] hover:text-white"
        >
          <User className="w-5 h-5 text-[#b59a6d]" />
          <span className="text-[10px] font-editorial-caps">{user ? "ACCOUNT" : "SIGN IN"}</span>
        </Link>
        <Link
          href="/wishlist"
          onClick={closeMobileMenu}
          className="flex flex-col items-center gap-1.5 text-[#a1a1aa] hover:text-white relative"
        >
          <Heart className="w-5 h-5 text-[#b59a6d]" />
          <span className="text-[10px] font-editorial-caps">WISHLIST ({getWishlistCount()})</span>
        </Link>
        <Link
          href="/cart"
          onClick={closeMobileMenu}
          className="flex flex-col items-center gap-1.5 text-[#a1a1aa] hover:text-white relative"
        >
          <ShoppingBag className="w-5 h-5 text-[#b59a6d]" />
          <span className="text-[10px] font-editorial-caps">BAG ({getTotalCount()})</span>
        </Link>
      </div>
    </div>
  );
};
