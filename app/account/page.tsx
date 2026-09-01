"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Heart, LogOut, Shield, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/store/authStore";
import { useWishlist } from "@/lib/store/wishlistStore";

export default function AccountOverviewPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { getCount: getWishlistCount } = useWishlist();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen bg-[#09090b]" />;
  }

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#27272a] pb-6 mb-12 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                MAISON CLIENT SUITE
              </span>
              {user.role === "VIP" && (
                <span className="bg-[#b59a6d]/20 text-[#b59a6d] border border-[#b59a6d]/50 text-[9px] font-editorial-caps px-2 py-0.5">
                  VIP PATRON
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light mt-1">
              Welcome, {user.name}
            </h1>
          </div>

          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="text-xs font-editorial-caps text-[#71717a] hover:text-rose-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Orders */}
          <Link
            href="/account/orders"
            className="p-8 bg-[#111114] border border-[#27272a] hover:border-[#b59a6d]/60 transition-colors group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#27272a] flex items-center justify-center text-[#b59a6d]">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                Acquisitions & Orders
              </h3>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Review your order history, delivery tracking dossiers, and lifetime authenticity certificates.
              </p>
            </div>
            <span className="text-xs font-editorial-caps text-[#b59a6d] flex items-center gap-1">
              <span>VIEW ORDERS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Card 2: Saved Addresses */}
          <Link
            href="/account/addresses"
            className="p-8 bg-[#111114] border border-[#27272a] hover:border-[#b59a6d]/60 transition-colors group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#27272a] flex items-center justify-center text-[#b59a6d]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                Addresses & Delivery
              </h3>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Manage global residential and private salon delivery destinations.
              </p>
            </div>
            <span className="text-xs font-editorial-caps text-[#b59a6d] flex items-center gap-1">
              <span>MANAGE DESTINATIONS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Card 3: Wishlist */}
          <Link
            href="/wishlist"
            className="p-8 bg-[#111114] border border-[#27272a] hover:border-[#b59a6d]/60 transition-colors group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#27272a] flex items-center justify-center text-[#b59a6d]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors">
                Saved Wishlist ({getWishlistCount()})
              </h3>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Curate your personal collection of desired seasonal silhouettes and objets.
              </p>
            </div>
            <span className="text-xs font-editorial-caps text-[#b59a6d] flex items-center gap-1">
              <span>OPEN WISHLIST</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Profile Details Dossier */}
        <div className="mt-12 p-8 bg-[#111114] border border-[#27272a] space-y-6">
          <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
            CLIENT DOSSIER DETAILS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-light">
            <div>
              <span className="text-[#71717a] font-editorial-caps text-[10px] block mb-1">CLIENT NAME</span>
              <p className="text-[#f4f3ef] text-sm">{user.name}</p>
            </div>
            <div>
              <span className="text-[#71717a] font-editorial-caps text-[10px] block mb-1">REGISTERED EMAIL</span>
              <p className="text-[#f4f3ef] text-sm">{user.email}</p>
            </div>
            <div>
              <span className="text-[#71717a] font-editorial-caps text-[10px] block mb-1">CONTACT TELEPHONE</span>
              <p className="text-[#f4f3ef] text-sm">{user.phone || "Not recorded"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
