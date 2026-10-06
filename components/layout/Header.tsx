"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, Shield } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { useCart } from "@/lib/store/cartStore";
import { useWishlist } from "@/lib/store/wishlistStore";
import { useAuth } from "@/lib/store/authStore";
import { useUI } from "@/lib/store/uiStore";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"WOMEN" | "MEN" | "COLLECTIONS" | "JOURNAL" | null>(null);

  const { openCart, getTotalCount } = useCart();
  const { getCount: getWishlistCount } = useWishlist();
  const { user } = useAuth();
  const { openSearch, openMobileMenu } = useUI();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartCount = getTotalCount();
  const totalWishlistCount = getWishlistCount();

  const isSolid = isScrolled || !isHome || activeMenu !== null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isSolid
          ? "bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a]/60 shadow-lg py-4"
          : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile Menu & Desktop Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            className="lg:hidden p-1 text-[#f4f3ef] hover:text-[#b59a6d] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link
            href="/"
            className="group font-serif tracking-[0.28em] text-lg sm:text-xl lg:text-2xl font-light text-[#f4f3ef] uppercase flex items-center gap-1 transition-transform hover:opacity-90"
          >
            <span>luxury</span>
            <span className="text-[#b59a6d] font-normal italic lowercase text-base sm:text-lg">.Raw</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Categories */}
        <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-editorial-caps text-[#f4f3ef] tracking-[0.22em]">
          <button
            onMouseEnter={() => setActiveMenu("WOMEN")}
            className={`transition-colors py-2 border-b-2 ${
              activeMenu === "WOMEN" || pathname.startsWith("/women")
                ? "border-[#b59a6d] text-[#b59a6d]"
                : "border-transparent hover:text-[#b59a6d]"
            }`}
          >
            WOMEN
          </button>

          <button
            onMouseEnter={() => setActiveMenu("MEN")}
            className={`transition-colors py-2 border-b-2 ${
              activeMenu === "MEN" || pathname.startsWith("/men")
                ? "border-[#b59a6d] text-[#b59a6d]"
                : "border-transparent hover:text-[#b59a6d]"
            }`}
          >
            MEN
          </button>

          <button
            onMouseEnter={() => setActiveMenu("COLLECTIONS")}
            className={`transition-colors py-2 border-b-2 ${
              activeMenu === "COLLECTIONS" || pathname.startsWith("/collections")
                ? "border-[#b59a6d] text-[#b59a6d]"
                : "border-transparent hover:text-[#b59a6d]"
            }`}
          >
            COLLECTIONS
          </button>

          <Link
            href="/stylist"
            className={`transition-colors py-2 border-b-2 ${
              pathname.startsWith("/stylist")
                ? "border-[#b59a6d] text-[#b59a6d]"
                : "border-transparent hover:text-[#b59a6d]"
            }`}
          >
            AI STYLIST
          </Link>

          <Link
            href="/drops"
            className={`transition-colors py-2 border-b-2 flex items-center gap-1.5 ${
              pathname.startsWith("/drops")
                ? "border-[#b59a6d] text-[#b59a6d]"
                : "border-transparent hover:text-[#b59a6d]"
            }`}
          >
            <span>LIVE DROPS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          </Link>

          <Link
            href="/polyglot"
            className={`transition-colors py-2 border-b-2 text-[#b59a6d] flex items-center gap-1 ${
              pathname.startsWith("/polyglot")
                ? "border-[#b59a6d] text-white"
                : "border-transparent hover:text-white"
            }`}
          >
            <span>POLYGLOT</span>
          </Link>
        </nav>

        {/* Right: Actions (Search, Account, Wishlist, Bag) */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-[#f4f3ef]">
          {/* Admin link shortcut if logged in as Admin */}
          {user?.role === "SUPER_ADMIN" && (
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-[11px] font-editorial-caps text-[#b59a6d] border border-[#b59a6d]/40 px-2.5 py-1 hover:bg-[#b59a6d]/10 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>ADMIN</span>
            </Link>
          )}

          {/* Search Trigger */}
          <button
            onClick={openSearch}
            aria-label="Search catalog"
            className="p-1 hover:text-[#b59a6d] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Icon */}
          <Link
            href={user ? "/account" : "/account/login"}
            aria-label="Client account"
            className="p-1 hover:text-[#b59a6d] transition-colors hidden sm:block"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Wishlist Trigger */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="p-1 hover:text-[#b59a6d] transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {totalWishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#b59a6d] text-[#09090b] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalWishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag Trigger */}
          <button
            onClick={openCart}
            aria-label="Shopping bag"
            className="p-1 hover:text-[#b59a6d] transition-colors relative flex items-center gap-1.5"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="bg-[#b59a6d] text-[#09090b] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      {activeMenu && (
        <MegaMenu category={activeMenu} onClose={() => setActiveMenu(null)} />
      )}
    </header>
  );
};
